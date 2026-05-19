# lumo-ui-skill CLI

Install the [lumo-ui](https://www.lumoui.com) skill for Claude Code and other AI coding assistants.

## Usage

```bash
# Install into current project (Claude Code, default)
npx lumo-ui-skill

# Install for a specific agent
npx lumo-ui-skill install --agent claude
npx lumo-ui-skill install --agent cursor
npx lumo-ui-skill install --agent windsurf

# Install to a specific directory
npx lumo-ui-skill install --dir /path/to/project

# Force overwrite existing installation
npx lumo-ui-skill install --force

# Remove the skill
npx lumo-ui-skill uninstall
```

## What it installs

The CLI copies the lumo-ui skill files into your project:

```
.claude/skills/lumo-ui/
  SKILL.md          # Skill entry point
  components/       # 24 Compose component docs
  knowledge/        # Setup, theming, KMP guides
```

## Alternatively: install with the skills CLI

```bash
npx skills add burkido/lumo-ui-skills
```

## What is lumo-ui?

[lumo-ui](https://github.com/nomanr/lumo-ui) is a Gradle plugin that generates Jetpack Compose UI components directly into your Android or KMP project. You own every generated file and can customize it freely.
