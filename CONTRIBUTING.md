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
    ├── SKILL.md          # required
    └── references/       # optional, loaded on demand
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
```

CI runs both on every pull request.

## Releases

Releases are automated with [release-please](https://github.com/googleapis/release-please), so don't edit version numbers by hand.

1. Write commit messages (or squash-merge PR titles) as [Conventional Commits](https://www.conventionalcommits.org): `fix:` releases a patch, `feat:` a minor version, and `feat!:` or a `BREAKING CHANGE:` footer a major version. `docs:` and `chore:` don't trigger a release.
2. On each push to `main`, release-please opens or updates a release PR that bumps the version in every manifest and in `SKILL.md`, and updates `CHANGELOG.md`.
3. Merging the release PR tags `vX.Y.Z`, publishes the GitHub release, and attaches a zip of each skill.

Agents only fetch a new copy when the version changes, so changes reach users when the release PR is merged.

### Checklist

- [ ] Skill name follows the `lumo-<category>-<functional-name>` convention
- [ ] `node scripts/validate.mjs` passes
- [ ] Description clearly explains when the skill should be triggered
- [ ] Guidance is practical and includes examples
- [ ] No sensitive or private information included
