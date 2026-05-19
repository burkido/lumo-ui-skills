# lumo-ui Kotlin Multiplatform (KMP)

## Enable KMP mode

One property change in `lumo.properties`:
```properties
KotlinMultiplatform=true
```

Then run setup and add components exactly as with Android-only:
```bash
./gradlew lumo --setup
./gradlew lumo --add Button
./gradlew lumo --add Tooltip
```

---

## Supported platforms

The `sample-multiplatform` project covers:

| Platform | Source set | Entry point |
|----------|-----------|-------------|
| Android | `androidMain` | `ComponentActivity` + `setContent {}` |
| iOS | `iosMain` | `ComposeUIViewController` |
| Desktop (JVM) | `desktopMain` | `singleWindowApplication {}` |
| Web (Wasm) | `wasmJsMain` | Browser canvas |
| Shared logic | `commonMain` | Platform-agnostic composables |

---

## Generated file structure in KMP mode

Platform-agnostic components go into `commonMain`. Components that require
platform-specific APIs are split:

```
src/
├── commonMain/
│   └── kotlin/com/example/ui/
│       ├── Theme.kt
│       ├── Colors.kt
│       ├── Typography.kt
│       └── components/
│           ├── Button.kt          ← same on all platforms
│           ├── TextField.kt
│           └── ...
├── androidMain/
│   └── kotlin/com/example/ui/
│       └── components/
│           └── Tooltip.android.kt  ← Android-specific implementation
└── iosMain/
    └── kotlin/com/example/ui/
        └── components/
            └── Tooltip.ios.kt      ← iOS-specific implementation
```

---

## Which components have platform splits

Only components that rely on platform-specific APIs get split files.
Currently: **Tooltip** (popup positioning differs per platform).

Most components (Button, TextField, Card, etc.) live entirely in `commonMain`
and work identically on all platforms.

---

## Theme initialization per platform

Each platform wraps its entry point in `AppTheme {}`:

### Android
```kotlin
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            AppTheme { App() }
        }
    }
}
```

### iOS
```swift
// SwiftUI host
struct ContentView: View {
    var body: some View {
        ComposeView()
    }
}
```
```kotlin
// iosMain
fun MainViewController() = ComposeUIViewController {
    AppTheme { App() }
}
```

### Desktop
```kotlin
fun main() = singleWindowApplication(title = "App") {
    AppTheme { App() }
}
```

### Web
```kotlin
fun main() {
    onWasmReady {
        CanvasBasedWindow { AppTheme { App() } }
    }
}
```

---

## Plugin module placement

In a KMP project, apply the plugin to the **shared** module (the one with
`commonMain`), not to platform-specific modules:

```kotlin
// shared/build.gradle.kts
plugins {
    kotlin("multiplatform")
    id("com.nomanr.plugin.lumo")
}
```

---

## KMP-specific tips

- Run `./gradlew lumo --required-deps` after init — deps differ from Android-only
  (includes `compose-multiplatform` instead of `compose-bom`)
- `lumo.properties` `ComponentsDir` should point into the shared module's
  `commonMain` source root
- After generating, verify `iosMain`/`androidMain` split files appear for Tooltip
- Desktop and Web targets don't need additional plugin configuration — they pick up
  from `commonMain` automatically
