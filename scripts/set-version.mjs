#!/usr/bin/env node
// Sets the release version everywhere it's declared: every agent manifest, the
// release-please manifest, and metadata.version in each SKILL.md.
// Usage: node scripts/set-version.mjs 1.2.0
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';

const ROOT = resolve(dirname(new URL(import.meta.url).pathname), '..');
const version = process.argv[2];
if (!/^\d+\.\d+\.\d+$/.test(version ?? '')) {
  console.error('usage: node scripts/set-version.mjs <major.minor.patch>');
  process.exit(2);
}

const MANIFESTS = ['.claude-plugin/plugin.json', '.cursor-plugin/plugin.json', 'plugin.json', 'gemini-extension.json'];
for (const file of MANIFESTS) {
  const path = join(ROOT, file);
  const json = JSON.parse(readFileSync(path, 'utf8'));
  json.version = version;
  writeFileSync(path, `${JSON.stringify(json, null, 2)}\n`);
}

const releaseManifest = join(ROOT, '.release-please-manifest.json');
writeFileSync(releaseManifest, `${JSON.stringify({ '.': version }, null, 2)}\n`);

for (const skill of readdirSync(join(ROOT, 'skills'))) {
  const path = join(ROOT, 'skills', skill, 'SKILL.md');
  if (!existsSync(path)) continue;
  const text = readFileSync(path, 'utf8');
  writeFileSync(path, text.replace(/^(\s+version: )"[^"]*"( # x-release-please-version)$/m, `$1"${version}"$2`));
}

console.log(`✔ set version ${version}`);
