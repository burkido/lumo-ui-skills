# Chip

**CLI**: `./gradlew lumo --add Chip`  
**Docs**: https://www.lumoui.com/chip

## Description

Compact filter/selection element with optional leading and trailing icons.
Three surface styles. Often used in filter bars and tag lists.

## Variants

| Variant | Style |
|---------|-------|
| `Chip` | Flat filled |
| `ElevatedChip` | Drop shadow |
| `OutlinedChip` | Border stroke |

## Parameters

| Parameter | Type | Purpose |
|-----------|------|---------|
| `selected` | `Boolean` | Selected/active state |
| `onClick` | `() -> Unit` | Toggle handler |
| `label` | `@Composable () -> Unit` | Chip label content |
| `enabled` | `Boolean` | Enable/disable (default `true`) |
| `leadingIcon` | `@Composable (() -> Unit)?` | Icon before label |
| `trailingIcon` | `@Composable (() -> Unit)?` | Icon after label (e.g. remove ×) |
| `colors` | `ChipColors` | Via `ChipDefaults.chipColors()` |
| `border` | `BorderStroke?` | Stroke for outlined variant |
| `modifier` | `Modifier` | Standard |

## Example

```kotlin
var selected by remember { mutableStateOf(false) }

Chip(
    selected = selected,
    onClick = { selected = !selected },
    label = { Text("Kotlin") },
    leadingIcon = if (selected) {
        { Icon(Icons.Default.Check, contentDescription = null, modifier = Modifier.size(16.dp)) }
    } else null
)
```

## Sample App Snippet (Android)

```kotlin
// Chip variant showcase — Normal, Selected, Disabled for each style
FlowRow(modifier = Modifier.fillMaxWidth(), verticalArrangement = Arrangement.spacedBy(8.dp), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
    Chip { Text("Normal", style = AppTheme.typography.label3) }
    Chip(selected = true) { Text("Selected", style = AppTheme.typography.label3) }
    Chip(enabled = false) { Text("Disabled", style = AppTheme.typography.label3) }
    ElevatedChip { Text("Normal", style = AppTheme.typography.label3) }
    ElevatedChip(selected = true) { Text("Selected", style = AppTheme.typography.label3) }
    OutlinedChip { Text("Normal", style = AppTheme.typography.label3) }
    OutlinedChip(selected = true) { Text("Selected", style = AppTheme.typography.label3) }
}

// FavoriteActivity example — multi-select with checkmark icon
var selectedActivities by remember { mutableStateOf<Set<String>>(emptySet()) }
val activities = listOf("Hiking", "Cycling", "Swimming", "Running", "Gym")

FlowRow(modifier = Modifier.fillMaxWidth(), verticalArrangement = Arrangement.spacedBy(8.dp), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
    activities.forEach { activity ->
        val isSelected = selectedActivities.contains(activity)
        Chip(
            selected = isSelected,
            onClick = {
                if (isSelected) selectedActivities -= activity else selectedActivities += activity
            },
            leadingIcon = if (isSelected) {
                { Icon(modifier = Modifier.size(16.dp), imageVector = Icons.Default.Check, contentDescription = "Selected") }
            } else null,
        ) {
            Text(text = activity, style = AppTheme.typography.label2)
        }
    }
}

// Snacks example — dual-list selection with CircleShape OutlinedChip
var selectedSnacks by remember { mutableStateOf<Set<String>>(emptySet()) }
val snacks = listOf("Chips", "Cookies", "Candy", "Chocolate", "Popcorn")

// Selected snacks row (with remove icon)
FlowRow(modifier = Modifier.fillMaxWidth(), verticalArrangement = Arrangement.spacedBy(8.dp), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
    selectedSnacks.forEach { snack ->
        OutlinedChip(
            selected = true,
            onClick = { selectedSnacks -= snack },
            trailingIcon = { Icon(modifier = Modifier.size(16.dp), imageVector = Icons.Default.Close, contentDescription = "Remove") },
            shape = CircleShape,
        ) {
            Text(snack, style = AppTheme.typography.label2)
        }
    }
}

// Available snacks row
FlowRow(modifier = Modifier.fillMaxWidth(), verticalArrangement = Arrangement.spacedBy(8.dp), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
    snacks.filter { it !in selectedSnacks }.forEach { snack ->
        OutlinedChip(onClick = { selectedSnacks += snack }, shape = CircleShape) {
            Text(snack, style = AppTheme.typography.label2)
        }
    }
}
```

## Sample App Snippet (Multiplatform)

> Same usage pattern as Android. Uses `com.nomanr.lumo.multiplatform.ui.components.*` imports.
