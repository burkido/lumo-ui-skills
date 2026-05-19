# lumo-ui Plugin Setup

## What gets generated

lumo-ui copies Kotlin source files into your project. You own every file.
The plugin runs at dev time only — nothing ships in the APK.

---

## 1. Apply the plugin

### Option A — Root-level (simpler, single-module projects)
```kotlin
// root build.gradle.kts
plugins {
    id("com.nomanr.plugin.lumo") version "LATEST"
}
```

### Option B — Module-level (recommended for multi-module)
```kotlin
// root build.gradle.kts
plugins {
    id("com.nomanr.plugin.lumo") version "LATEST" apply false
}

// ui-components/build.gradle.kts
plugins {
    id("com.nomanr.plugin.lumo")
}
```

Latest version: https://search.maven.org/artifact/com.nomanr/lumo

---

## 2. Verify installation

After syncing Gradle:
```bash
./gradlew lumo --plugin-help
```

---

## 3. Initialize

```bash
./gradlew lumo --init
# → Creates lumo.properties at project root
# → Prints required dependencies to add to build.gradle.kts
```

If you get Gradle cache errors:
```bash
./gradlew lumo --init --no-configuration-cache
```

---

## 4. Configure lumo.properties

```properties
ThemeName=AppTheme
ComponentsDir=ui-components/src/main/java/com/example/ui
PackageName=com.example.ui
KotlinMultiplatform=false
```

| Key | Description | Example |
|-----|-------------|---------|
| `ThemeName` | Name of the generated theme class | `AppTheme` |
| `ComponentsDir` | Output directory, relative to project root | `ui-components/src/main/java/com/example/ui` |
| `PackageName` | Package for all generated files | `com.example.ui` |
| `KotlinMultiplatform` | Set `true` for KMP projects | `false` |

---

## 5. Add required dependencies

Run to see what to add to your `build.gradle.kts`:
```bash
./gradlew lumo --required-deps
```

---

## 6. Generate theme files

```bash
./gradlew lumo --setup
```

See `knowledge/theming.md` for what gets generated and how to use it.

---

## 7. Add your first component

```bash
./gradlew lumo --add Button
```

This copies `Button.kt` (and any auto-resolved dependencies like `Surface.kt`) into
`ComponentsDir/components/`.

---

## Full CLI reference

| Command | Purpose |
|---------|---------|
| `./gradlew lumo --plugin-help` | Show all available commands |
| `./gradlew lumo --init` | Initialize project, generate `lumo.properties` |
| `./gradlew lumo --setup` | Generate theme files |
| `./gradlew lumo --add <Component>` | Generate a component (e.g. `--add Button`) |
| `./gradlew lumo --required-deps` | Print dependencies needed in `build.gradle.kts` |

---

## Generated file structure (after `--setup` + `--add Button`)

```
ui-components/
├── Theme.kt                    ← AppTheme composable
├── Colors.kt                   ← LightColors, DarkColors
├── Typography.kt               ← Typography scale
├── components/
│   ├── Button.kt
│   └── Surface.kt              ← auto-added (Button depends on Surface)
└── foundation/
    ├── ButtonElevation.kt
    └── Ripple.kt
```

### Dependency auto-resolution
Running `--add Button` automatically pulls in `Surface` (and any other transitive
dependencies) without prompting. You'll see which extra files were added in the
console output.

---

## Typical project layout after full setup

```
app/
ui-components/
├── build.gradle.kts            ← plugin applied here (Option B)
└── src/main/java/com/example/ui/
    ├── Theme.kt
    ├── Colors.kt
    ├── Typography.kt
    ├── components/
    │   └── *.kt                ← generated components
    └── foundation/
        └── *.kt                ← generated utilities
```
