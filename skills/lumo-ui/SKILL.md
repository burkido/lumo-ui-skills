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
  Snackbar, Surface, Switch, Text, Tooltip).
license: MIT
metadata:
  author: burkido
  version: "1.0.0"
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

---

## When this skill is active

### Step 1 — Establish platform context first
Ask "Is this an Android-only project or Kotlin Multiplatform?" if not already clear.
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

### Step 3 — Component doc URL pattern
Every component has an official docs page:
```
https://www.lumoui.com/<slug>
```
Examples: `/button`, `/accordion`, `/modal-bottomsheet`, `/otp-textfield`, `/topbar`

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
| Progress Indicators | `--add ProgressIndicator` | `components/progress-indicators.md` |
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
