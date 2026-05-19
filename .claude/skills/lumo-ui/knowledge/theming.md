# lumo-ui Theming

## Generate theme files

```bash
./gradlew lumo --setup
```

Generates into `ComponentsDir` (set in `lumo.properties`):

| File | Purpose |
|------|---------|
| `Theme.kt` | `AppTheme` composable — wraps your entire app |
| `Colors.kt` | `LightColors` / `DarkColors` data objects + `contentColorFor()` |
| `Typography.kt` | `Typography` data class with the full type scale |
| `Ripple.kt` | Ripple effect configuration |
| `foundation/` | Elevation, button styling, system bar utilities |

---

## Wrapping your app

```kotlin
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            AppTheme {
                // your app content here
            }
        }
    }
}
```

For dark mode:
```kotlin
AppTheme(darkTheme = isSystemInDarkTheme()) {
    // content
}
```

---

## Accessing colors

```kotlin
// Inside any composable within AppTheme {}
AppTheme.colors.primary
AppTheme.colors.onPrimary
AppTheme.colors.primaryContainer
AppTheme.colors.onPrimaryContainer
AppTheme.colors.secondary
AppTheme.colors.onSecondary
AppTheme.colors.background
AppTheme.colors.onBackground
AppTheme.colors.surface
AppTheme.colors.onSurface
AppTheme.colors.error
AppTheme.colors.onError
AppTheme.colors.outline
```

Customizing: edit `Colors.kt` — modify `LightColors` and `DarkColors` data objects directly.

---

## Accessing typography

```kotlin
AppTheme.typography.h1         // Large display heading
AppTheme.typography.h2
AppTheme.typography.h3
AppTheme.typography.body1      // Primary body text
AppTheme.typography.body2      // Secondary body text
AppTheme.typography.label1     // Small label (buttons, chips)
AppTheme.typography.label2     // Smaller label
```

Usage in a component:
```kotlin
Text(
    text = "Hello",
    style = AppTheme.typography.h2,
    color = AppTheme.colors.onBackground
)
```

Customizing: edit `Typography.kt` — change `fontFamily`, `fontSize`, `fontWeight`,
`lineHeight` per style.

---

## Colors.kt structure (generated)

```kotlin
val LightColors = Colors(
    primary = Color(0xFF...),
    onPrimary = Color(0xFF...),
    // ...all tokens
)

val DarkColors = Colors(
    primary = Color(0xFF...),
    // ...all tokens
)

@Composable
fun contentColorFor(backgroundColor: Color): Color { ... }
```

---

## Typography.kt structure (generated)

```kotlin
data class Typography(
    val h1: TextStyle = TextStyle(fontSize = 32.sp, fontWeight = FontWeight.Bold, ...),
    val h2: TextStyle = TextStyle(fontSize = 24.sp, ...),
    val h3: TextStyle = TextStyle(fontSize = 20.sp, ...),
    val body1: TextStyle = TextStyle(fontSize = 16.sp, ...),
    val body2: TextStyle = TextStyle(fontSize = 14.sp, ...),
    val label1: TextStyle = TextStyle(fontSize = 12.sp, ...),
    val label2: TextStyle = TextStyle(fontSize = 10.sp, ...),
)
```

---

## Foundation utilities

Generated in `foundation/` alongside your components:

- **`Ripple.kt`** — custom ripple color/bounded configuration
- **`ButtonElevation.kt`** — elevation tokens used by Button variants
- System bar utilities for edge-to-edge layouts

These are referenced by generated components automatically — don't delete them.

---

## Tip: ThemeName customization

Change `ThemeName` in `lumo.properties` before running `--setup`:
```properties
ThemeName=MyDesignSystemTheme
```

This renames the generated composable from `AppTheme {}` to `MyDesignSystemTheme {}`.
All generated components will reference your custom theme name.
