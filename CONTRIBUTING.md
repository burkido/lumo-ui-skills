# Contributing

## Adding a new skill

Before submitting a pull request, please open an issue to describe the proposed skill and get feedback.

### Naming convention

New skills follow the pattern `lumo-<category>-<functional-name>` using kebab-case. The core `lumo-ui` skill predates this convention and keeps its name, because renaming a published skill breaks existing installs.

`<category>` must be one of the predefined categories in [CATEGORIES](./CATEGORIES):
- `components`: skills for specific lumo-ui Compose components

`<functional-name>` should be a short, descriptive name for the skill (e.g. `lumo-components-button`).

### Skill structure

Each skill lives in its own folder under `skills/`. Every agent manifest in this repository points at `skills/`, so a new folder there is picked up by Claude Code, Codex, Cursor and Gemini CLI with no manifest changes.

```
skills/
└── lumo-<category>-<name>/
    ├── SKILL.md            # required
    ├── references/         # optional, loaded on demand
    ├── evals/evals.json    # test prompts and expectations
    └── agents/openai.yaml  # optional Codex display name and default prompt
```

`SKILL.md` must start with YAML frontmatter:

```yaml
---
name: lumo-<category>-<name>      # must match the folder name
description: >
  What the skill does and when the agent should use it. Max 1024 characters.
license: MIT
metadata:
  author: your-github-username
---
```

Keep `SKILL.md` under 500 lines and move detailed reference material into separate files linked from it.

### Validate locally

```bash
node scripts/validate.mjs
claude plugin validate --strict .   # if you have Claude Code installed

# Check docs against the lumo-ui release in SKILL.md's metadata.lumo-version
git clone --depth 1 --branch v1.2.5 https://github.com/nomanr/lumo-ui.git /tmp/lumo-ui
node scripts/check-upstream.mjs /tmp/lumo-ui
```

CI runs all three on every pull request. `check-upstream.mjs` fails when a doc names a
component, enum value, `*Defaults` member, parameter or parameter type that lumo-ui's
plugin templates don't have. Mark deliberate wrong examples with `✗` on the same line.

## Editing component docs

Start new component files from [`components/_template.md`](./skills/lumo-ui/components/_template.md).
Take names and types from the plugin templates in
[`lumo-ui/plugin/src/main/resources/templates`](https://github.com/nomanr/lumo-ui/tree/main/lumo-ui/plugin/src/main/resources/templates),
not from Material3: lumo-ui's components look similar but their APIs differ.

## Evals

[`evals/evals.json`](./skills/lumo-ui/evals/evals.json) lists prompts with the behaviour we
expect. When you fix a mistake agents make, add a case for it. Run them with the
[skill-creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator) skill
to compare answers with and without your change.

## Keeping up with lumo-ui

lumo-ui is maintained in [nomanr/lumo-ui](https://github.com/nomanr/lumo-ui). Every Monday
the [Upstream drift](./.github/workflows/upstream.yml) workflow checks for a newer release
on Maven Central, runs `check-upstream.mjs` against it, and checks every lumoui.com link.
Findings go into a single issue titled "Skill is out of date with lumo-ui".

To document a new release, update `metadata.lumo-version` in `SKILL.md`, then fix what
`check-upstream.mjs` reports against the new tag.

## Releases

Releases are automated with [release-please](https://github.com/googleapis/release-please), so don't edit version numbers by hand.

1. Write commit messages (or squash-merge PR titles) as [Conventional Commits](https://www.conventionalcommits.org): `fix:` releases a patch, `feat:` a minor version, and `feat!:` or a `BREAKING CHANGE:` footer a major version. `docs:` and `chore:` don't trigger a release.
2. On each push to `main`, release-please opens or updates a release PR that bumps the version in every manifest and in `SKILL.md`, and updates `CHANGELOG.md`.
3. Merging the release PR tags `vX.Y.Z`, publishes the GitHub release, and attaches a zip of each skill.

Agents only fetch a new copy when the version changes, so changes reach users when the release PR is merged.

### Checklist

- [ ] Skill name follows the `lumo-<category>-<functional-name>` convention
- [ ] `node scripts/validate.mjs` and `node scripts/check-upstream.mjs` pass
- [ ] APIs match the lumo-ui plugin templates, not Material3
- [ ] New agent mistakes have an eval case
- [ ] Description clearly explains when the skill should be triggered
- [ ] Guidance is practical and includes examples
- [ ] No sensitive or private information included
