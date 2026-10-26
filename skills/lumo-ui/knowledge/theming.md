# lumo-ui Theming

## Generate theme files

```bash
./gradlew lumo --setup
```

Generates into `ComponentsDir` (set in `lumo.properties`):

| File | Purpose |
|------|---------|
| `Theme.kt` | `AppTheme` composable and object, plus `contentColorFor()` |
| `Color.kt` | `Colors` class and the `LightColors` / `DarkColors` instances |
| `Typography.kt` | `Typography` class with the full type scale |
| `foundation/Ripple.kt` | Ripple effect configuration |
| `foundation/Elevation.kt` | Elevation tokens |

The file is `Color.kt` (singular), even though the class inside is `Colors`.

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
AppTheme(isDarkTheme = isSystemInDarkTheme()) {  // this is also the default
    // content
}
```

---

## Accessing colors

```kotlin
// Inside any composable within AppTheme {}
AppTheme.colors.primary
AppTheme.colors.onPrimary
AppTheme.colors.secondary
AppTheme.colors.onSecondary
AppTheme.colors.background
AppTheme.colors.onBackground
AppTheme.colors.surface
AppTheme.colors.onSurface
AppTheme.colors.error
AppTheme.colors.onError
AppTheme.colors.outline
// also: tertiary, success, disabled (each with an on* pair), text, textSecondary,
// textDisabled, scrim, elevation, transparent, white, black
```

There are no Material3-style `*Container` colors.

Customizing: edit `Color.kt` — modify the `LightColors` and `DarkColors` values directly.

---

## Accessing typography

```kotlin
AppTheme.typography.h1         // Large display heading
AppTheme.typography.h2
AppTheme.typography.h3
AppTheme.typography.h4
AppTheme.typography.body1      // Primary body text
AppTheme.typography.body2      // Secondary body text
AppTheme.typography.body3
AppTheme.typography.label1     // Small label (buttons, chips)
AppTheme.typography.label2     // Smaller label
AppTheme.typography.label3
AppTheme.typography.button     // Button text
AppTheme.typography.input      // Text field input
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

## Color.kt structure (generated)

```kotlin
internal val LightColors = Colors(
    primary = Color(0xFF...),
    onPrimary = Color(0xFF...),
    // ...all tokens
)

internal val DarkColors = Colors(
    primary = Color(0xFF...),
    // ...all tokens
)
```

`contentColorFor(color)` lives in `Theme.kt` and returns the matching `on*` color.

---

## Typography.kt structure (generated)

```kotlin
data class Typography(
    val h1: TextStyle,
    val h2: TextStyle,
    val h3: TextStyle,
    val h4: TextStyle,
    val body1: TextStyle,
    val body2: TextStyle,
    val body3: TextStyle,
    val label1: TextStyle,
    val label2: TextStyle,
    val label3: TextStyle,
    val button: TextStyle,
    val input: TextStyle,
)
```

The values are built in `provideTypography()` in the same file, using `fontFamily()`;
change those to restyle text app-wide.

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
