# AGENTS.md

Guidance for AI coding agents working in this repository. `CLAUDE.md` is a symlink to this file.

This repo publishes the `lumo-ui` agent skill. It doesn't contain lumo-ui itself: lumo-ui
is a Gradle plugin maintained at https://github.com/nomanr/lumo-ui that generates Jetpack
Compose source into apps.

## Layout

- `skills/lumo-ui/` is the skill. `SKILL.md` routes to `knowledge/` (setup, theming, KMP)
  and `components/` (one file per component; `_template.md` for new ones).
- `skills/lumo-ui/evals/evals.json` has test prompts and expectations for the skill.
- The JSON manifests at the root and in `.claude-plugin/`, `.cursor-plugin/` and
  `.agents/plugins/` publish the skill to each agent. They all point at `skills/`.

## Before finishing a change

```bash
node scripts/validate.mjs
git clone --depth 1 --branch v1.2.5 https://github.com/nomanr/lumo-ui.git /tmp/lumo-ui
node scripts/check-upstream.mjs /tmp/lumo-ui
```

Use the version in `metadata.lumo-version` of `skills/lumo-ui/SKILL.md` as the tag. CI runs
both checks on every pull request.

## Rules

- Take API names and types from the plugin templates in
  `lumo-ui/plugin/src/main/resources/templates/`, never from Material3. lumo-ui looks like
  Material3 but differs: `TopBar` has one content slot, filled variants are `Primary` not
  `PrimaryFilled`, the theme file is `Color.kt`, and component names for `--add` come from
  `SupportedComponents.kt`.
- Write deliberate wrong examples on lines marked `✗`; `check-upstream.mjs` skips them.
- Keep `SKILL.md` under 500 lines. Put detail in `knowledge/` or `components/`.
- Don't edit version numbers. release-please bumps them from Conventional Commit PR titles
  (`fix:`, `feat:`), or the Manual release workflow does. See `CONTRIBUTING.md`.
- When documenting a new lumo-ui release, update `metadata.lumo-version` and fix whatever
  `check-upstream.mjs` reports against the new tag.
