# Surface

**CLI**: `./gradlew lumo --add Surface`  
**Docs**: https://www.lumoui.com/surface

## Description

Fundamental material surface container. Handles color, elevation/shadow,
shape, and optional click/toggle/selection semantics. Most other components
(Card, Button, Chip, etc.) are built on Surface.

## Variants / Overloads

| Overload | Use |
|----------|-----|
| Static | Container with no interaction |
| Clickable | `onClick` — tappable surface |
| Selectable | `selected` + `onClick` — toggle between selected/unselected |
| Checkable | `checked` + `onCheckedChange` — checked/unchecked |

## Parameters (common)

| Parameter | Type | Purpose |
|-----------|------|---------|
| `modifier` | `Modifier` | Standard |
| `shape` | `Shape` | Corner shape |
| `color` | `Color` | Background color |
| `contentColor` | `Color` | Default content color for children |
| `shadowElevation` | `Dp` | Drop shadow depth |
| `border` | `BorderStroke?` | Outline stroke |
| `content` | `@Composable BoxScope.() -> Unit` | Surface body |

## Additional parameters for clickable overload

| Parameter | Type | Purpose |
|-----------|------|---------|
| `onClick` | `() -> Unit` | Tap handler |
| `enabled` | `Boolean` | Enable/disable |
| `interactionSource` | `MutableInteractionSource` | For custom ripple tracking |

## Example

```kotlin
// Static surface — custom card-like container
Surface(
    shape = RoundedCornerShape(16.dp),
    color = AppTheme.colors.surface,
    shadowElevation = 4.dp,
    modifier = Modifier.fillMaxWidth()
) {
    Column(modifier = Modifier.padding(16.dp)) {
        Text("Card title", style = AppTheme.typography.h3)
        Text("Details...", style = AppTheme.typography.body2)
    }
}

// Clickable surface
Surface(
    onClick = { /* navigate */ },
    shape = RoundedCornerShape(12.dp),
    color = AppTheme.colors.primaryContainer
) {
    Text("Tap me", modifier = Modifier.padding(16.dp))
}
```

## Sample App Snippet (Android)

```kotlin
@Composable
fun SurfaceSample() {
    Column(modifier = Modifier.verticalScroll(rememberScrollState()).padding(16.dp), verticalArrangement = Arrangement.spacedBy(16.dp)) {

        // Basic surface — content layer separation
        Surface(modifier = Modifier.fillMaxWidth()) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text("Basic Surface", style = AppTheme.typography.h4)
                Text("Surface visually separates content layers and establishes clear spatial hierarchy.", style = AppTheme.typography.body2)
            }
        }

        // Color variations
        listOf(
            AppTheme.colors.primary,
            AppTheme.colors.secondary,
            AppTheme.colors.success,
            AppTheme.colors.error,
            AppTheme.colors.tertiary,
        ).forEach { color ->
            Surface(modifier = Modifier.fillMaxWidth(), color = color) {
                Row(modifier = Modifier.padding(16.dp), horizontalArrangement = Arrangement.spacedBy(8.dp), verticalAlignment = Alignment.CenterVertically) {
                    Icon(imageVector = Icons.Default.Favorite, contentDescription = null)
                    Text("Surface with custom color", style = AppTheme.typography.body2)
                }
            }
        }

        // Shape variations
        Row(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
            Surface(modifier = Modifier.size(80.dp), shape = CircleShape, color = AppTheme.colors.primary) {
                Box(contentAlignment = Alignment.Center) { Icon(imageVector = Icons.Default.Star, contentDescription = null) }
            }
            Surface(modifier = Modifier.size(80.dp), shape = RoundedCornerShape(8.dp), color = AppTheme.colors.secondary) {
                Box(contentAlignment = Alignment.Center) { Icon(imageVector = Icons.Default.Home, contentDescription = null) }
            }
        }

        // Elevation
        Surface(modifier = Modifier.fillMaxWidth(), shadowElevation = 8.dp) {
            Text("Surface with 8dp shadow elevation", style = AppTheme.typography.body2, modifier = Modifier.padding(16.dp))
        }
    }
}
```

## Sample App Snippet (Multiplatform)

> Same usage pattern as Android. Uses `<PackageName>.components.*` imports.
