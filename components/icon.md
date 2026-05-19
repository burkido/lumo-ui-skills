# Icon

**CLI**: `./gradlew lumo --add Icon`  
**Docs**: https://www.lumoui.com/icon

## Description

Renders vector icons from multiple sources: `ImageVector` (Material icons),
drawable resource IDs, `ImageBitmap`, or `Painter`. Tint is applied by default.

## Variants / Sources

| Source | Type |
|--------|------|
| Material / vector | `ImageVector` |
| Drawable resource | `@DrawableRes Int` |
| Bitmap | `ImageBitmap` |
| Painter | `Painter` |

## Parameters (all overloads share these)

| Parameter | Type | Purpose |
|-----------|------|---------|
| `contentDescription` | `String?` | Accessibility label; `null` for decorative icons |
| `modifier` | `Modifier` | Standard; use `Modifier.size()` to resize |
| `tint` | `Color` | Icon tint (default `LocalContentColor.current`) |

## Example

```kotlin
// Material icon
Icon(
    imageVector = Icons.Default.Favorite,
    contentDescription = "Favourite",
    tint = AppTheme.colors.primary
)

// Drawable resource
Icon(
    painter = painterResource(R.drawable.ic_custom),
    contentDescription = "Custom",
    modifier = Modifier.size(24.dp)
)

// No tint (for colored images)
Icon(
    imageVector = Icons.Default.Star,
    contentDescription = null,
    tint = Color.Unspecified
)
```

## Sample App Snippet (Android)

```kotlin
@Composable
fun IconSample() {
    Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(16.dp)) {
        Text("Icons — Material vector icons", style = AppTheme.typography.h4)

        // Various sizes
        FlowRow(verticalArrangement = Arrangement.spacedBy(8.dp), horizontalArrangement = Arrangement.spacedBy(16.dp)) {
            Icon(imageVector = Icons.Default.Home, contentDescription = "Home", modifier = Modifier.size(16.dp))
            Icon(imageVector = Icons.Default.Star, contentDescription = "Star", modifier = Modifier.size(24.dp))
            Icon(imageVector = Icons.Default.Favorite, contentDescription = "Favorite", modifier = Modifier.size(32.dp))
            Icon(imageVector = Icons.Default.Check, contentDescription = "Check", modifier = Modifier.size(48.dp))
            Icon(imageVector = Icons.Default.Add, contentDescription = "Add", modifier = Modifier.size(64.dp))
        }

        Spacer(modifier = Modifier.height(8.dp))

        // Various tint colors
        FlowRow(verticalArrangement = Arrangement.spacedBy(8.dp), horizontalArrangement = Arrangement.spacedBy(16.dp)) {
            Icon(imageVector = Icons.Default.Star, contentDescription = null, tint = AppTheme.colors.primary)
            Icon(imageVector = Icons.Default.Star, contentDescription = null, tint = AppTheme.colors.secondary)
            Icon(imageVector = Icons.Default.Star, contentDescription = null, tint = AppTheme.colors.error)
            Icon(imageVector = Icons.Default.Star, contentDescription = null, tint = AppTheme.colors.onSurface)
        }

        Spacer(modifier = Modifier.height(8.dp))

        // Drawable resource icon (Android only)
        FlowRow(verticalArrangement = Arrangement.spacedBy(8.dp), horizontalArrangement = Arrangement.spacedBy(16.dp)) {
            Icon(painter = painterResource(R.drawable.ic_your_icon), contentDescription = "Custom icon", modifier = Modifier.size(24.dp))
        }
    }
}
```

## Sample App Snippet (Multiplatform)

```kotlin
// Multiplatform — no painterResource for drawables; use ImageVector only
@Composable
fun IconSample() {
    Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(16.dp)) {
        Text("Icons", style = AppTheme.typography.h4)

        FlowRow(verticalArrangement = Arrangement.spacedBy(8.dp), horizontalArrangement = Arrangement.spacedBy(16.dp)) {
            Icon(imageVector = Icons.Default.Home, contentDescription = "Home", modifier = Modifier.size(16.dp))
            Icon(imageVector = Icons.Default.Star, contentDescription = "Star", modifier = Modifier.size(24.dp))
            Icon(imageVector = Icons.Default.Favorite, contentDescription = "Favorite", modifier = Modifier.size(32.dp))
            Icon(imageVector = Icons.Default.Check, contentDescription = "Check", modifier = Modifier.size(48.dp))
        }

        FlowRow(verticalArrangement = Arrangement.spacedBy(8.dp), horizontalArrangement = Arrangement.spacedBy(16.dp)) {
            Icon(imageVector = Icons.Default.Star, contentDescription = null, tint = AppTheme.colors.primary)
            Icon(imageVector = Icons.Default.Star, contentDescription = null, tint = AppTheme.colors.secondary)
            Icon(imageVector = Icons.Default.Star, contentDescription = null, tint = AppTheme.colors.error)
        }
    }
}
```
