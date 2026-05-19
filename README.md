# lumo-ui Claude Code Skill

A [Claude Code skill](https://docs.anthropic.com/en/docs/claude-code/skills) that gives Claude deep knowledge of **lumo-ui** — a Gradle plugin that generates Jetpack Compose UI components directly into your Android or Kotlin Multiplatform project.

**Official site:** https://www.lumoui.com  
**GitHub:** https://github.com/nomanr/lumo-ui

---

## What is lumo-ui?

lumo-ui is a **Gradle plugin**, not a runtime library. It copies ready-to-use Kotlin source files into your project. You own every generated file and can edit it freely. The plugin is only needed at development time — nothing extra ships in your APK.

---

## What this skill covers

When this skill is active, Claude can help you with:

- **Plugin setup** — applying the plugin, running `--init`, configuring `lumo.properties`
- **Theme generation** — `--setup` command, `AppTheme`, `Colors`, `Typography` usage
- **Component generation** — `--add <Component>` for any of the 24 components
- **Component APIs** — parameters, variants, usage examples for every component
- **Kotlin Multiplatform (KMP)** — platform-split file structure, KMP-specific configuration
- **Customization** — editing generated files directly (no re-run needed)

---

## Skill activation

Claude activates this skill automatically when you ask about:

- Setting up or configuring the lumo-ui plugin
- Running `./gradlew lumo` commands
- Generating or customizing Compose components
- `lumo.properties` configuration
- `AppTheme`, `Colors`, or `Typography` from a lumo-ui setup
- Any of the 24 lumo-ui components by name

---

## Installing the skill

### Method 1 — npx installer (recommended)

```bash
npx lumo-ui-skill
```

Installs the skill into `.claude/skills/lumo-ui/` in your current project. Claude Code picks it up automatically.

**Options:**

```bash
npx lumo-ui-skill install --agent cursor    # install for Cursor
npx lumo-ui-skill install --agent windsurf  # install for Windsurf
npx lumo-ui-skill install --dir /my/project # install to a specific directory
npx lumo-ui-skill install --force           # overwrite existing installation
npx lumo-ui-skill uninstall                 # remove the skill
```

### Method 2 — skills CLI

```bash
npx skills add burkido/lumo-ui-skills
```

### Method 3 — Claude Code plugin marketplace

Run inside Claude Code:

```
/plugin marketplace add burkido/lumo-ui-skills
/plugin install lumo-ui-skills@lumo-ui-skills
```

### Method 4 — Manual clone

**Single project** (skill applies only to this project):

```bash
git clone https://github.com/burkido/lumo-ui-skills .claude/skills/lumo-ui
```

**All projects** (global install):

```bash
git clone https://github.com/burkido/lumo-ui-skills ~/.claude/skills/lumo-ui
```

Claude Code discovers skills automatically from `.claude/skills/` — no further config needed.

**To update later:**

```bash
cd .claude/skills/lumo-ui   # or ~/.claude/skills/lumo-ui for global
git pull
```

---

## lumo-ui quick start

### 1. Apply the plugin

```kotlin
// root build.gradle.kts
plugins {
    id("com.nomanr.plugin.lumo") version "LATEST"
}
```

Latest version: https://search.maven.org/artifact/com.nomanr/lumo

### 2. Initialize

```bash
./gradlew lumo --init
```

### 3. Configure `lumo.properties`

```properties
ThemeName=AppTheme
ComponentsDir=ui-components/src/main/java/com/example/ui
PackageName=com.example.ui
KotlinMultiplatform=false
```

### 4. Generate theme files

```bash
./gradlew lumo --setup
```

### 5. Add components

```bash
./gradlew lumo --add Button
./gradlew lumo --add TextField
./gradlew lumo --add NavigationBar
# ... any of the 24 components
```

---

## CLI reference

| Command | Purpose |
|---------|---------|
| `./gradlew lumo --plugin-help` | Show all available commands |
| `./gradlew lumo --init` | Initialize project, generate `lumo.properties` |
| `./gradlew lumo --setup` | Generate theme files |
| `./gradlew lumo --add <Component>` | Generate a component |
| `./gradlew lumo --required-deps` | Print required `build.gradle.kts` dependencies |

---

## 24 available components

| Component | CLI command |
|-----------|-------------|
| Accordion | `--add Accordion` |
| Alert Dialog | `--add AlertDialog` |
| Badge | `--add Badge` |
| Button | `--add Button` |
| Card | `--add Card` |
| Checkbox | `--add Checkbox` |
| Chip | `--add Chip` |
| Divider | `--add Divider` |
| Icon | `--add Icon` |
| Icon Button | `--add IconButton` |
| Modal Bottom Sheet | `--add ModalBottomSheet` |
| Navigation Bar | `--add NavigationBar` |
| OTP Text Field | `--add OTPTextField` |
| Progress Indicators | `--add ProgressIndicator` |
| Radio Button | `--add RadioButton` |
| Scaffold | `--add Scaffold` |
| Slider | `--add Slider` |
| Snackbar | `--add Snackbar` |
| Surface | `--add Surface` |
| Switch | `--add Switch` |
| Text | `--add Text` |
| Text Field | `--add TextField` |
| Tooltip | `--add Tooltip` |
| Top Bar | `--add TopBar` |

---

## Skill structure

```
lumo-ui-skills/
├── SKILL.md                        ← skill entry point (routing logic)
├── skill.json                      ← skills ecosystem metadata
├── .claude-plugin/
│   ├── plugin.json                 ← Claude Code plugin manifest
│   └── marketplace.json            ← Claude Code marketplace listing
├── .github/workflows/
│   ├── create-release.yml          ← bundles zip + creates GitHub release
│   └── claude.yml                  ← @claude mention support in issues/PRs
├── cli/                            ← npx lumo-ui-skill installer
│   └── src/index.ts
├── components/                     ← one file per component (API, variants, examples)
│   ├── button.md
│   ├── text-field.md
│   └── ...
└── knowledge/                      ← shared knowledge files
    ├── plugin-setup.md             ← full plugin setup walkthrough
    ├── theming.md                  ← AppTheme, Colors, Typography usage
    └── platform-kmp.md             ← Kotlin Multiplatform specifics
```

---

## More resources

- Docs: https://www.lumoui.com
- Each component has its own docs page at `https://www.lumoui.com/<component-slug>`  
  e.g. https://www.lumoui.com/button, https://www.lumoui.com/modal-bottomsheet
