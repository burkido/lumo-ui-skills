#!/usr/bin/env bash
# Zips each skill in skills/ into dist/<skill>.zip, for manual install and claude.ai upload.
set -euo pipefail
cd "$(dirname "$0")/.."
rm -rf dist
mkdir dist
for dir in skills/*/; do
  skill="$(basename "$dir")"
  (cd skills && zip -qr "../dist/${skill}.zip" "$skill" -x "${skill}/evals/*")
done
ls dist
