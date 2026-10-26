---
name: lumo-ui
description: >
  Use this skill when the user is working with lumo-ui — a Gradle plugin that generates
  Jetpack Compose UI components via CLI into their project. Trigger on: setting up the
  lumo-ui plugin, running `./gradlew lumo` commands, configuring lumo.properties, generating
  or customizing Compose components, asking about lumo-ui component APIs or variants,
  theming with AppTheme / Colors / Typography, Android vs Kotlin Multiplatform component
  generation, or any question about the 24 lumo-ui components (Button, TextField, Scaffold,
  NavigationBar, ModalBottomSheet, TopBar, Accordion, AlertDialog, Badge, Card, Checkbox,
  Chip, Divider, Icon, IconButton, OTPTextField, ProgressIndicator, RadioButton, Slider,
  Snackbar, Surface, Switch, Text, Tooltip). Also applies in any project that has a
  lumo.properties file or applies the com.nomanr.plugin.lumo Gradle plugin.
license: MIT
metadata:
  author: burkido
  version: "1.1.0" # x-release-please-version
  lumo-version: "1.2.5"
---

# lumo-ui Skill

## What lumo-ui is

lumo-ui is a **Gradle plugin** — NOT a runtime library dependency. It generates Jetpack
Compose component source code directly into the user's project. They own every generated
file and can edit it freely. The plugin is only needed at development time to add new
components; it does not ship in the final APK.

Official docs: https://www.lumoui.com  
GitHub: https://github.com/nomanr/lumo-ui  
Latest version: https://search.maven.org/artifact/com.nomanr/lumo

This skill describes **lumo-ui 1.2.5**. If the project uses a newer plugin version, prefer
the generated code and the official docs over the files in this skill.

---

## When this skill is active

### Step 0 — The generated code is the source of truth
Read `lumo.properties` at the project root for `ComponentsDir`, `PackageName`,
`ThemeName` and `KotlinMultiplatform`. Then, before writing code that uses a component,
read its generated file (e.g. `<ComponentsDir>/components/Button.kt`). The user owns
that file and may have changed it, so its signature beats anything in `components/*.md`.
Use the docs in this skill when the component hasn't been generated yet.

Import components from the user's `PackageName` (e.g. `com.example.ui.components.Button`),
and use their `ThemeName` wherever this skill writes `AppTheme`.

### Step 1 — Establish platform context
Check `KotlinMultiplatform` in `lumo.properties`. If there is no `lumo.properties` yet,
ask "Is this an Android-only project or Kotlin Multiplatform?" if not already clear.
This determines:
- Whether `KotlinMultiplatform=true` goes in `lumo.properties`
- Whether generated components will have platform-split files (e.g. `Tooltip.android.kt`)
- Which sample patterns apply

### Step 2 — Route to the right knowledge file

| User intent | Go to |
|-------------|-------|
| Set up the plugin from scratch | `knowledge/plugin-setup.md` |
| Generate theme files | `knowledge/theming.md` |
| KMP-specific setup or questions | `knowledge/platform-kmp.md` |
| Any specific component (API, variants, examples) | `components/<name>.md` |
| Add a component they haven't generated yet | `components/<name>.md` → run the `--add` command |
| Customize a component | Remind them: they own the generated code — edit it directly |

### Step 3 — Official docs
Every component file links its official page (`https://www.lumoui.com/<slug>`). Slugs
don't always match component names: `/modal-bottomsheet`, `/otp-textfield`,
`/textfield`, `/topbar`, `/progress-indicators`. General pages: `/setup`, `/cli`,
`/kmp-support`.

---

## Common mistakes

These come up repeatedly. Each shows what an agent tends to write and what lumo-ui needs.

**lumo-ui is a plugin, not a dependency.**
```kotlin
implementation("com.nomanr:lumo:1.2.5")      // ✗ there is no runtime library
id("com.nomanr.plugin.lumo") version "1.2.5"  // ✓ in plugins { }
```

**Use the generated components and theme, not Material3.**
```kotlin
import androidx.compose.material3.Button      // ✗
MaterialTheme.colorScheme.primaryContainer    // ✗ no *Container colors in lumo-ui
import com.example.ui.components.Button       // ✓ from the user's PackageName
AppTheme.colors.primary                       // ✓
```

**lumo-ui APIs aren't Material3 APIs.** Don't carry over Material3 parameter names.
```kotlin
TopBar(title = { Text("Home") })              // ✗ TopBar has a single content slot
TopBar { Text(text = "Home", style = AppTheme.typography.h3) }   // ✓
ButtonVariant.PrimaryFilled                   // ✗
ButtonVariant.Primary                         // ✓ filled is the unsuffixed name
```

**`--add` takes the exact component name and never overwrites.**
```bash
./gradlew lumo --add ProgressIndicator        # ✗ unknown component
./gradlew lumo --add ProgressIndicators       # ✓ names are case-sensitive
```
If a generated file already exists, `--add` skips it. To regenerate a component, the
user must delete the file first, which discards their edits, so confirm before suggesting it.

**Customize by editing the generated file.** Don't wrap a component just to change its
colors or shape: edit `Button.kt`, `Color.kt` or `Typography.kt` directly.

---

## Common task walkthroughs

### New Android project setup
1. Apply plugin → `knowledge/plugin-setup.md`
2. Run `./gradlew lumo --init` → configure `lumo.properties`
3. Run `./gradlew lumo --setup` → generate theme files (`knowledge/theming.md`)
4. Wrap app in `AppTheme {}` → `knowledge/theming.md`
5. Run `./gradlew lumo --add <Component>` per needed component

### New KMP project setup
Same as above, but set `KotlinMultiplatform=true` in `lumo.properties` first.
See `knowledge/platform-kmp.md` for source-set structure.

### "How do I use the Button component?"
→ `components/button.md` — variants, params, examples, sample app snippet

### "I want to show a bottom sheet"
→ `components/modal-bottom-sheet.md` — `ModalBottomSheet` with `rememberModalBottomSheetState()`

### "My component needs customization"
→ They already own the generated Kotlin file. Point them to the file and edit it directly.
No plugin re-run needed after customization.

---

## Component index (24 components)

| Component | CLI add command | File |
|-----------|----------------|------|
| Accordion | `--add Accordion` | `components/accordion.md` |
| Alert Dialog | `--add AlertDialog` | `components/alert-dialog.md` |
| Badge | `--add Badge` | `components/badge.md` |
| Button | `--add Button` | `components/button.md` |
| Card | `--add Card` | `components/card.md` |
| Checkbox | `--add Checkbox` | `components/checkbox.md` |
| Chip | `--add Chip` | `components/chip.md` |
| Divider | `--add Divider` | `components/divider.md` |
| Icon | `--add Icon` | `components/icon.md` |
| Icon Button | `--add IconButton` | `components/icon-button.md` |
| Modal Bottom Sheet | `--add ModalBottomSheet` | `components/modal-bottom-sheet.md` |
| Navigation Bar | `--add NavigationBar` | `components/navigation-bar.md` |
| OTP Text Field | `--add OTPTextField` | `components/otp-text-field.md` |
| Progress Indicators | `--add ProgressIndicators` | `components/progress-indicators.md` |
| Radio Button | `--add RadioButton` | `components/radio-button.md` |
| Scaffold | `--add Scaffold` | `components/scaffold.md` |
| Slider | `--add Slider` | `components/slider.md` |
| Snackbar | `--add Snackbar` | `components/snackbar.md` |
| Surface | `--add Surface` | `components/surface.md` |
| Switch | `--add Switch` | `components/switch.md` |
| Text | `--add Text` | `components/text.md` |
| Text Field | `--add TextField` | `components/text-field.md` |
| Tooltip | `--add Tooltip` | `components/tooltip.md` |
| Top Bar | `--add TopBar` | `components/top-bar.md` |
