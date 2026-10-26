#!/usr/bin/env node
// Checks the skill's API references against a checkout of lumo-ui's plugin templates, so
// docs can't name variants, parameters or components that the generated code doesn't have.
// Usage: node scripts/check-upstream.mjs <path-to-lumo-ui-checkout>
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';

const ROOT = resolve(dirname(new URL(import.meta.url).pathname), '..');
const SKILLS_DIR = join(ROOT, 'skills');
const upstream = process.argv[2];
if (!upstream) {
  console.error('usage: node scripts/check-upstream.mjs <path-to-lumo-ui-checkout>');
  process.exit(2);
}
const PLUGIN = join(upstream, 'lumo-ui/plugin/src/main');
const TEMPLATES = join(PLUGIN, 'resources/templates');
const SUPPORTED = join(PLUGIN, 'java/com/nomanr/lumo/plugin/template/templateregistry/SupportedComponents.kt');
if (!existsSync(TEMPLATES) || !existsSync(SUPPORTED)) {
  console.error(`${upstream}: not a lumo-ui checkout (missing plugin templates)`);
  process.exit(2);
}

const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

// Returns the text between the bracket at `start` and its matching close.
function balanced(text, start) {
  const open = text[start];
  const close = { '(': ')', '{': '}' }[open];
  let depth = 0;
  for (let i = start; i < text.length; i++) {
    if (text[i] === open) depth++;
    else if (text[i] === close && --depth === 0) return text.slice(start + 1, i);
  }
  return '';
}

// Top-level parameter names of a Kotlin parameter list, ignoring nested lambda types.
function paramNames(list) {
  const names = [];
  let depth = 0;
  let current = '';
  let prev = '';
  for (const ch of list + ',') {
    if ('(<{['.includes(ch)) depth++;
    // The ">" of a lambda arrow "->" doesn't close a generic.
    if (')}]'.includes(ch) || (ch === '>' && prev !== '-')) depth--;
    prev = ch;
    if (ch === ',' && depth === 0) {
      const m = current.replace(/@\w+(\([^)]*\))?/g, '').match(/^\s*(?:vararg\s+)?(\w+)\s*:/);
      if (m) names.push(m[1]);
      current = '';
    } else current += ch;
  }
  return names;
}

// Named arguments at the top level of a call's argument list: "a = 1, b = { x(c = 2) }" -> [a, b].
function topLevelNamedArgs(args) {
  const names = [];
  let depth = 0;
  for (let i = 0; i < args.length; i++) {
    const ch = args[i];
    if ('({['.includes(ch)) depth++;
    else if (')}]'.includes(ch)) depth--;
    else if (depth === 0 && (i === 0 || args[i - 1] === ',' || /\s/.test(args[i - 1]))) {
      const m = args.slice(i).match(/^(\w+)\s*=(?!=)/);
      const before = args.slice(0, i).trimEnd();
      if (m && (before === '' || before.endsWith(','))) names.push(m[1]);
    }
  }
  return names;
}

const functions = new Map(); // function name -> union of parameter names across overloads
const enums = new Map(); // enum class name -> constants
const defaults = new Map(); // XxxDefaults object -> members
for (const file of walk(TEMPLATES)) {
  const src = readFileSync(file, 'utf8');
  for (const m of src.matchAll(/\bobject (\w+Defaults)\s*\{/g)) {
    const members = [...balanced(src, m.index + m[0].length - 1).matchAll(/\b(?:val|fun)\s+(?:[\w.]+\.)?(\w+)/g)].map((v) => v[1]);
    defaults.set(m[1], new Set([...(defaults.get(m[1]) ?? []), ...members]));
  }
  for (const m of src.matchAll(/\bfun\s+(?:<[^>]*>\s*)?(?:[\w.]+\.)?(\w+)\s*\(/g)) {
    const params = paramNames(balanced(src, m.index + m[0].length - 1));
    functions.set(m[1], new Set([...(functions.get(m[1]) ?? []), ...params]));
  }
  for (const m of src.matchAll(/\benum class (\w+)[^{]*\{/g)) {
    const body = balanced(src, m.index + m[0].length - 1).split(';')[0];
    const constants = body.split(',').map((c) => c.trim().match(/^(\w+)/)?.[1]).filter(Boolean);
    enums.set(m[1], new Set([...(enums.get(m[1]) ?? []), ...constants]));
  }
}
const components = new Set(
  balanced(readFileSync(SUPPORTED, 'utf8'), readFileSync(SUPPORTED, 'utf8').indexOf('{'))
    .split(',')
    .map((c) => c.trim())
    .filter(Boolean),
);

const errors = new Set();
for (const file of walk(SKILLS_DIR).filter((f) => f.endsWith('.md'))) {
  const where = file.slice(ROOT.length + 1);
  // Lines marked ✗ are deliberate counter-examples (see "Common mistakes" in SKILL.md).
  const text = readFileSync(file, 'utf8')
    .split('\n')
    .filter((line) => !line.includes('✗'))
    .join('\n');

  for (const [, name] of text.matchAll(/--add (\w+)/g)) {
    if (!components.has(name)) errors.add(`${where}: --add ${name} is not a lumo-ui component`);
  }

  for (const [ref, type, constant] of new Set(text.matchAll(/\b(\w+)\.(\w+)\b/g)).values()) {
    const known = enums.get(type) ?? defaults.get(type);
    if (known && !known.has(constant)) {
      errors.add(`${where}: ${ref} does not exist (${type}: ${[...known].join(', ')})`);
    }
  }

  // Named arguments in Kotlin examples, e.g. TopBar(title = ...).
  for (const [, block] of text.matchAll(/```kotlin\n([\s\S]*?)```/g)) {
    for (const call of block.matchAll(/(?<![\w.])([A-Z]\w*)\(/g)) {
      const params = functions.get(call[1]);
      if (!params) continue;
      const args = balanced(block, call.index + call[0].length - 1);
      for (const name of topLevelNamedArgs(args)) {
        if (!params.has(name)) errors.add(`${where}: example calls ${call[1]}(${name} = ...), which isn't a parameter`);
      }
    }
  }

  // Parameter tables belong to the function named in the closest heading above them,
  // e.g. "## Parameters — LinearProgressIndicator (determinate)", falling back to "# Top Bar".
  let fn = null;
  let inParams = false;
  for (const line of text.split('\n')) {
    const heading = line.match(/^(#{1,3})\s+(.*)$/);
    if (heading) {
      const words = heading[2].replace(/\(.*?\)|`/g, '').match(/\w+/g) ?? [];
      const match = [words.join(''), ...words.reverse()].find((w) => functions.has(w));
      if (match) fn = match;
      else if (heading[1] === '#') fn = null;
      continue;
    }
    if (!line.startsWith('|')) inParams = false;
    else if (/^\|\s*Parameter\s*\|/.test(line)) inParams = true;
    const row = line.match(/^\|\s*`(\w+)`\s*\|/);
    if (inParams && row && fn && !functions.get(fn).has(row[1])) {
      errors.add(`${where}: ${fn}() has no parameter "${row[1]}" (has: ${[...functions.get(fn)].join(', ')})`);
    }
  }
}

if (errors.size) {
  for (const e of errors) console.error(`✖ ${e}`);
  process.exit(1);
}
console.log(`✔ skill matches lumo-ui templates (${components.size} components, ${functions.size} functions, ${enums.size} enums)`);
