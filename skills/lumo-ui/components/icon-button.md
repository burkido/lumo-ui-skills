# Icon Button

**CLI**: `./gradlew lumo --add IconButton`  
**Docs**: https://www.lumoui.com/icon-button

## Description

Clickable icon with the same 13 semantic variants as Button. Useful for
toolbar actions, FABs, and inline actions. Supports circle shape shorthand.

## Variants

Same 13 `IconButtonVariant` values mirroring `ButtonVariant`:

| Variant | Style |
|---------|-------|
| `IconButtonVariant.Primary` | Filled, primary |
| `IconButtonVariant.PrimaryOutlined` | Outlined, primary |
| `IconButtonVariant.PrimaryElevated` | Elevated, primary |
| `IconButtonVariant.PrimaryGhost` | Ghost, primary |
| `IconButtonVariant.Secondary` | Filled, secondary |
| `IconButtonVariant.SecondaryOutlined` | Outlined, secondary |
| `IconButtonVariant.SecondaryElevated` | Elevated, secondary |
| `IconButtonVariant.SecondaryGhost` | Ghost, secondary |
| `IconButtonVariant.Destructive` | Filled, destructive |
| `IconButtonVariant.DestructiveOutlined` | Outlined, destructive |
| `IconButtonVariant.DestructiveElevated` | Elevated, destructive |
| `IconButtonVariant.DestructiveGhost` | Ghost, destructive |
| `IconButtonVariant.Ghost` | Neutral ghost |

## Parameters

| Parameter | Type | Purpose |
|-----------|------|---------|
| `onClick` | `() -> Unit` | Click handler |
| `variant` | `IconButtonVariant` | Visual style (default: `Primary`) |
| `enabled` | `Boolean` | Enable/disable (default `true`) |
| `shape` | `Shape` | Button shape (default: rounded square) |
| `modifier` | `Modifier` | Standard |
| `content` | `@Composable () -> Unit` | Icon content |

## Circle shape shorthand

```kotlin
IconButton(
    shape = IconButtonDefaults.ButtonCircleShape,
    onClick = {},
    variant = IconButtonVariant.Primary
) {
    Icon(Icons.Default.Add, contentDescription = "Add")
}
```

## Example

```kotlin
// Toolbar back button
IconButton(
    variant = IconButtonVariant.SecondaryGhost,
    onClick = { navController.popBackStack() }
) {
    Icon(Icons.Default.ArrowBack, contentDescription = "Back")
}

// FAB-style circle button
IconButton(
    shape = IconButtonDefaults.ButtonCircleShape,
    variant = IconButtonVariant.Primary,
    modifier = Modifier.size(56.dp),
    onClick = { /* create new */ }
) {
    Icon(Icons.Default.Add, contentDescription = "New")
}
```

## Sample App Snippet (Android)

```kotlin
// Real-world icon button examples
Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(16.dp)) {
    Text(text = "Icon Button Examples", style = AppTheme.typography.h4)

    FlowRow(verticalArrangement = Arrangement.spacedBy(8.dp), horizontalArrangement = Arrangement.spacedBy(16.dp)) {
        IconButton(variant = IconButtonVariant.Primary) { Icon(Icons.Default.Star, contentDescription = "Favorite") }
        IconButton(variant = IconButtonVariant.SecondaryOutlined) { Icon(Icons.Default.Check, contentDescription = "Done") }
        IconButton(variant = IconButtonVariant.Primary) { CircularProgressIndicator(modifier = Modifier.size(24.dp)) }
        IconButton(variant = IconButtonVariant.PrimaryElevated) { Icon(Icons.Default.Email, contentDescription = "Email") }
        IconButton(variant = IconButtonVariant.Destructive) { Icon(Icons.Default.Delete, contentDescription = "Delete") }
    }

    // Custom shapes
    Row(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
        IconButton(variant = IconButtonVariant.Primary, shape = CircleShape) { Icon(Icons.Default.PhotoCamera, contentDescription = null) }
        IconButton(variant = IconButtonVariant.Secondary, shape = RoundedCornerShape(8.dp)) { Icon(Icons.Default.PhotoCamera, contentDescription = null) }
        IconButton(variant = IconButtonVariant.Destructive, shape = RoundedCornerShape(0.dp)) { Icon(Icons.Default.PhotoCamera, contentDescription = null) }
    }

    // Primary variants
    Text(text = "Primary Icon Buttons", style = AppTheme.typography.h4)
    FlowRow(verticalArrangement = Arrangement.spacedBy(8.dp), horizontalArrangement = Arrangement.spacedBy(16.dp)) {
        IconButton(variant = IconButtonVariant.Primary) { Icon(Icons.Default.Star, contentDescription = "PrimaryFilled") }
        IconButton(variant = IconButtonVariant.PrimaryOutlined) { Icon(Icons.Default.Star, contentDescription = "PrimaryOutlined") }
        IconButton(variant = IconButtonVariant.PrimaryElevated) { Icon(Icons.Default.Star, contentDescription = "PrimaryElevated") }
        IconButton(variant = IconButtonVariant.PrimaryGhost) { Icon(Icons.Default.Star, contentDescription = "PrimaryGhost") }
        IconButton(variant = IconButtonVariant.Primary, enabled = false) { Icon(Icons.Default.Star, contentDescription = null) }
    }

    // Destructive variants
    Text(text = "Destructive Icon Buttons", style = AppTheme.typography.h4)
    FlowRow(verticalArrangement = Arrangement.spacedBy(8.dp), horizontalArrangement = Arrangement.spacedBy(16.dp)) {
        IconButton(variant = IconButtonVariant.Destructive) { Icon(Icons.Default.Delete, contentDescription = "DestructiveFilled") }
        IconButton(variant = IconButtonVariant.DestructiveOutlined) { Icon(Icons.Default.Delete, contentDescription = "DestructiveOutlined") }
        IconButton(variant = IconButtonVariant.DestructiveElevated) { Icon(Icons.Default.Delete, contentDescription = "DestructiveElevated") }
        IconButton(variant = IconButtonVariant.DestructiveGhost) { Icon(Icons.Default.Delete, contentDescription = "DestructiveGhost") }
    }
}
```

## Sample App Snippet (Multiplatform)

> Same usage pattern as Android. Uses `<PackageName>.components.*` imports.
