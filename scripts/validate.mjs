#!/usr/bin/env node
// Validates skills against the Agent Skills spec (https://agentskills.io/specification)
// and checks that every agent manifest declares the same plugin name and version.
// No dependencies: run with `node scripts/validate.mjs`.
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';

const ROOT = resolve(dirname(new URL(import.meta.url).pathname), '..');
const SKILLS_DIR = join(ROOT, 'skills');
const NAME_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const MAX_SKILL_LINES = 500;

const errors = [];
const fail = (msg) => errors.push(msg);
const rel = (p) => p.slice(ROOT.length + 1);

// Minimal frontmatter reader: top-level scalar keys, folded/literal blocks, and one-level maps.
function parseFrontmatter(text, path) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!match) {
    fail(`${path}: missing YAML frontmatter delimited by ---`);
    return null;
  }
  const fields = {};
  const lines = match[1].split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^([A-Za-z][\w-]*):\s*(.*)$/);
    if (!m) continue;
    const [, key, rawValue] = m;
    const block = [];
    while (i + 1 < lines.length && /^\s+\S|^\s*$/.test(lines[i + 1])) block.push(lines[++i]);
    if (/^[>|][+-]?$/.test(rawValue)) {
      fields[key] = block.map((l) => l.trim()).join(rawValue.startsWith('>') ? ' ' : '\n').trim();
    } else if (rawValue === '') {
      fields[key] = Object.fromEntries(
        block
          .map((l) => l.trim().match(/^([\w-]+):\s*(.*)$/))
          .filter(Boolean)
          .map(([, k, v]) => [k, unquote(v)]),
      );
    } else {
      fields[key] = unquote(rawValue);
    }
  }
  return { fields, body: text.slice(match[0].length) };
}

function unquote(value) {
  const v = value.replace(/\s+#.*$/, '').trim();
  return /^(["']).*\1$/.test(v) ? v.slice(1, -1) : v;
}

function validateSkill(skillDir) {
  const name = skillDir.split('/').pop();
  const skillFile = join(skillDir, 'SKILL.md');
  if (!existsSync(skillFile)) return fail(`${rel(skillDir)}: missing SKILL.md`);

  const text = readFileSync(skillFile, 'utf8');
  const parsed = parseFrontmatter(text, rel(skillFile));
  if (!parsed) return;
  const { fields, body } = parsed;

  if (!fields.name) fail(`${rel(skillFile)}: "name" is required`);
  else {
    if (fields.name.length > 64) fail(`${rel(skillFile)}: "name" exceeds 64 characters`);
    if (!NAME_PATTERN.test(fields.name)) fail(`${rel(skillFile)}: "name" must be lowercase letters, numbers and single hyphens`);
    if (fields.name !== name) fail(`${rel(skillFile)}: "name" (${fields.name}) must match its directory (${name})`);
  }

  if (!fields.description) fail(`${rel(skillFile)}: "description" is required`);
  else if (fields.description.length > 1024) fail(`${rel(skillFile)}: "description" is ${fields.description.length} characters (max 1024)`);

  if (fields.compatibility && fields.compatibility.length > 500) fail(`${rel(skillFile)}: "compatibility" exceeds 500 characters`);

  const lineCount = text.split('\n').length;
  if (lineCount > MAX_SKILL_LINES) fail(`${rel(skillFile)}: ${lineCount} lines (keep under ${MAX_SKILL_LINES}; move detail into referenced files)`);

  // Every relative markdown link in SKILL.md must resolve inside the skill folder.
  for (const [, target] of body.matchAll(/\]\(([^)#\s]+)(?:#[^)]*)?\)/g)) {
    if (/^[a-z]+:/i.test(target)) continue;
    if (!existsSync(join(skillDir, target))) fail(`${rel(skillFile)}: broken link to ${target}`);
  }

  return fields;
}

function validateManifests(skillVersions) {
  const manifests = ['.claude-plugin/plugin.json', '.cursor-plugin/plugin.json', 'plugin.json', 'gemini-extension.json'];
  const versions = new Map();
  const names = new Set();
  for (const file of manifests) {
    const path = join(ROOT, file);
    if (!existsSync(path)) {
      fail(`${file}: missing`);
      continue;
    }
    let json;
    try {
      json = JSON.parse(readFileSync(path, 'utf8'));
    } catch (e) {
      fail(`${file}: invalid JSON (${e.message})`);
      continue;
    }
    names.add(json.name);
    versions.set(file, json.version);
  }

  const release = JSON.parse(readFileSync(join(ROOT, '.release-please-manifest.json'), 'utf8'))['.'];
  for (const [file, version] of versions) {
    if (version !== release) fail(`${file}: version ${version} does not match .release-please-manifest.json (${release})`);
  }
  for (const [skill, version] of skillVersions) {
    if (version && version !== release) fail(`skills/${skill}/SKILL.md: metadata.version ${version} does not match ${release}`);
  }
  if (names.size > 1) fail(`manifests disagree on plugin name: ${[...names].join(', ')}`);

  for (const file of ['.claude-plugin/marketplace.json', '.cursor-plugin/marketplace.json', '.agents/plugins/marketplace.json']) {
    const json = JSON.parse(readFileSync(join(ROOT, file), 'utf8'));
    for (const entry of json.plugins ?? []) {
      if (!names.has(entry.name)) fail(`${file}: entry "${entry.name}" does not match the plugin name`);
      if ('version' in entry) fail(`${file}: entry "${entry.name}" sets a version; keep versions in plugin manifests only`);
    }
  }
}

const skillDirs = readdirSync(SKILLS_DIR)
  .map((d) => join(SKILLS_DIR, d))
  .filter((d) => statSync(d).isDirectory());

// Finding no skills means discovery broke, not that everything is valid.
if (skillDirs.length === 0) fail('skills/: no skill folders found');

const skillVersions = new Map();
for (const dir of skillDirs) {
  const fields = validateSkill(dir);
  if (fields) skillVersions.set(fields.name, fields.metadata?.version);
}
validateManifests(skillVersions);

if (errors.length) {
  for (const e of errors) console.error(`✖ ${e}`);
  process.exit(1);
}
console.log(`✔ ${skillDirs.length} skill(s) and all manifests valid`);
