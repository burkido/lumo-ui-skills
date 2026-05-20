# Contributing

## Adding a new skill

Before submitting a pull request, please open an issue to describe the proposed skill and get feedback.

### Naming convention

Skills follow the pattern `lumo-<category>-<functional-name>` using kebab-case.

`<category>` must be one of the predefined categories in [CATEGORIES](./CATEGORIES):
- `components` — skills for specific lumo-ui Compose components

`<functional-name>` should be a short, descriptive name for the skill (e.g. `lumo-components-button`).

### Skill structure

Each skill lives in its own folder under `skills/`:

```
skills/
└── lumo-<category>-<name>/
    └── SKILL.md
```

`SKILL.md` must have YAML frontmatter with these required fields:

```yaml
---
name: lumo-<category>-<name>
description: >
  One or two sentences describing when the agent should activate this skill.
license: MIT
metadata:
  author: your-github-username
  version: "1.0.0"
---
```

The body of `SKILL.md` contains the guidance the AI agent follows while the skill is active. Include practical examples and clear instructions.

### Checklist

- [ ] Skill name follows the `lumo-<category>-<functional-name>` convention
- [ ] `SKILL.md` has valid YAML frontmatter with all required fields
- [ ] Description clearly explains when the skill should be triggered
- [ ] Guidance is practical and includes examples
- [ ] No sensitive or private information included
