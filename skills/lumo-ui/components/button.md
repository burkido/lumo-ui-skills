# Button

**CLI**: `./gradlew lumo --add Button`  
**Docs**: https://www.lumoui.com/button

## Description

Full-featured button with 13 semantic variants covering primary, secondary,
and destructive intents across filled, outlined, elevated, and ghost styles.
Supports loading state and custom content slots.

## Variants

| Variant enum | Style |
|-------------|-------|
| `ButtonVariant.Primary` | Filled, primary color (default) |
| `ButtonVariant.PrimaryOutlined` | Outlined, primary color |
| `ButtonVariant.PrimaryElevated` | Elevated/shadow, primary color |
| `ButtonVariant.PrimaryGhost` | No border/fill, primary color |
| `ButtonVariant.Secondary` | Filled, secondary color |
| `ButtonVariant.SecondaryOutlined` | Outlined, secondary color |
| `ButtonVariant.SecondaryElevated` | Elevated, secondary color |
| `ButtonVariant.SecondaryGhost` | No border/fill, secondary color |
| `ButtonVariant.Destructive` | Filled, error/red color |
| `ButtonVariant.DestructiveOutlined` | Outlined, error/red color |
| `ButtonVariant.DestructiveElevated` | Elevated, error/red color |
| `ButtonVariant.DestructiveGhost` | No border/fill, error/red color |
| `ButtonVariant.Ghost` | Neutral ghost (no intent color) |

## Parameters

| Parameter | Type | Purpose |
|-----------|------|---------|
| `onClick` | `() -> Unit` | Click handler |
| `text` | `String?` | Button label (use `text` OR `content`, not both) |
| `variant` | `ButtonVariant` | Visual style (default: `Primary`) |
| `enabled` | `Boolean` | Enable/disable (default `true`) |
| `loading` | `Boolean` | Shows spinner, disables click (default `false`) |
| `modifier` | `Modifier` | Standard |
| `content` | `(@Composable () -> Unit)?` | Custom content slot |

## Example

```kotlin
// Simple text button
Button(
    text = "Save",
    onClick = { /* save */ }
)

// Outlined destructive with loading
var saving by remember { mutableStateOf(false) }

Button(
    text = "Delete Account",
    variant = ButtonVariant.DestructiveOutlined,
    loading = saving,
    onClick = {
        saving = true
        // async operation
    }
)

// Custom content (icon + text)
Button(
    variant = ButtonVariant.Secondary,
    onClick = { /* share */ }
) {
    Icon(Icons.Default.Share, contentDescription = null)
    Spacer(Modifier.width(8.dp))
    Text("Share")
}
```

## Sample App Snippet (Android)

```kotlin
// Real-world examples with icons and loading states
@Composable
fun ButtonRealWorldExamples() {
    Column(modifier = Modifier.background(AppTheme.colors.background).padding(16.dp), verticalArrangement = Arrangement.spacedBy(16.dp)) {
        Text(text = "Button Examples", style = AppTheme.typography.h4)

        FlowRow(verticalArrangement = Arrangement.spacedBy(8.dp), horizontalArrangement = Arrangement.spacedBy(16.dp)) {
            Button(variant = ButtonVariant.Primary, onClick = {}) {
                Icon(Icons.Default.Star, contentDescription = null)
                Spacer(Modifier.width(4.dp))
                Text("Add to favorites")
            }
            Button(variant = ButtonVariant.SecondaryOutlined, onClick = {}) {
                Icon(Icons.Default.Check, contentDescription = null)
                Spacer(Modifier.width(4.dp))
                Text("Done")
            }
            Button(variant = ButtonVariant.PrimaryElevated, onClick = {}) {
                Icon(Icons.Default.Email, contentDescription = null)
                Spacer(Modifier.width(4.dp))
                Text("Email")
            }
            Button(variant = ButtonVariant.Destructive, onClick = {}) {
                Icon(Icons.Default.Delete, contentDescription = null)
                Spacer(Modifier.width(4.dp))
                Text("Delete")
            }
        }

        // Primary variants
        Text(text = "Primary Buttons", style = AppTheme.typography.h4)
        FlowRow(verticalArrangement = Arrangement.spacedBy(8.dp), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            Button(text = "Filled", variant = ButtonVariant.Primary, onClick = {})
            Button(text = "Outlined", variant = ButtonVariant.PrimaryOutlined, onClick = {})
            Button(text = "Elevated", variant = ButtonVariant.PrimaryElevated, onClick = {})
            Button(text = "Ghost", variant = ButtonVariant.PrimaryGhost, onClick = {})
            Button(text = "Disabled", variant = ButtonVariant.Primary, enabled = false, onClick = {})
        }

        // Destructive variants
        Text(text = "Destructive Buttons", style = AppTheme.typography.h4)
        FlowRow(verticalArrangement = Arrangement.spacedBy(8.dp), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            Button(text = "Filled", variant = ButtonVariant.Destructive, onClick = {})
            Button(text = "Outlined", variant = ButtonVariant.DestructiveOutlined, onClick = {})
            Button(text = "Elevated", variant = ButtonVariant.DestructiveElevated, onClick = {})
            Button(text = "Ghost", variant = ButtonVariant.DestructiveGhost, onClick = {})
        }
    }
}
```

## Sample App Snippet (Multiplatform)

> Same usage pattern as Android. Uses `<PackageName>.components.*` imports.
