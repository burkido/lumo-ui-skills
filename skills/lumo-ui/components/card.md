# Card

**CLI**: `./gradlew lumo --add Card`  
**Docs**: https://www.lumoui.com/card

## Description

Surface container with three elevation styles. Optionally clickable.
Use for grouping related content visually.

## Variants

| Variant | Style |
|---------|-------|
| `Card` | Flat, filled surface |
| `ElevatedCard` | Drop shadow |
| `OutlinedCard` | Border stroke, no shadow |

## Parameters

| Parameter | Type | Purpose |
|-----------|------|---------|
| `modifier` | `Modifier` | Standard |
| `onClick` | `(() -> Unit)?` | Makes card clickable; omit for static card |
| `enabled` | `Boolean` | When `onClick` is set, enables/disables (default `true`) |
| `shape` | `Shape` | Corner shape (default `RoundedCornerShape(12.dp)`) |
| `colors` | `CardColors` | Container/content colors via `CardDefaults.cardColors()` |
| `elevation` | `CardElevation` | Shadow elevation via `CardDefaults.cardElevation()` |
| `border` | `BorderStroke?` | Outline stroke (used by `OutlinedCard`) |
| `content` | `@Composable ColumnScope.() -> Unit` | Card body |

## Example

```kotlin
// Static card
Card(modifier = Modifier.fillMaxWidth()) {
    Column(modifier = Modifier.padding(16.dp)) {
        Text("Title", style = AppTheme.typography.h3)
        Spacer(Modifier.height(4.dp))
        Text("Subtitle", style = AppTheme.typography.body2, color = AppTheme.colors.onSurface)
    }
}

// Clickable elevated card
ElevatedCard(
    onClick = { navController.navigate("detail") },
    modifier = Modifier.fillMaxWidth()
) {
    ListItem(headlineContent = { Text("Tap to open") })
}

// Outlined card
OutlinedCard(modifier = Modifier.fillMaxWidth()) {
    Text("Outlined content", modifier = Modifier.padding(16.dp))
}
```

## Sample App Snippet (Android)

```kotlin
@Composable
fun CardSample() {
    Column(
        modifier = Modifier.fillMaxSize().verticalScroll(rememberScrollState()).padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp),
    ) {
        // Full-width outlined card with skeleton content
        OutlinedCard(modifier = Modifier.fillMaxWidth()) {
            Column(modifier = Modifier.padding(12.dp)) {
                Skeleton(modifier = Modifier.fillMaxWidth().height(180.dp))
                Spacer(modifier = Modifier.height(12.dp))
                Skeleton(modifier = Modifier.width(260.dp).height(24.dp))
            }
        }

        // Two cards side by side
        Row(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
            Card(modifier = Modifier.weight(1f)) {
                Column(modifier = Modifier.padding(12.dp)) {
                    Skeleton(modifier = Modifier.fillMaxWidth().height(100.dp))
                    Spacer(modifier = Modifier.height(8.dp))
                    Text("Filled Card", style = AppTheme.typography.label1)
                }
            }
            ElevatedCard(modifier = Modifier.weight(1f)) {
                Column(modifier = Modifier.padding(12.dp)) {
                    Skeleton(modifier = Modifier.fillMaxWidth().height(100.dp))
                    Spacer(modifier = Modifier.height(8.dp))
                    Text("Elevated Card", style = AppTheme.typography.label1)
                }
            }
        }

        // Clickable cards
        Row(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
            Card(modifier = Modifier.weight(1f), onClick = {}) {
                Column(modifier = Modifier.padding(12.dp), horizontalAlignment = Alignment.CenterHorizontally) {
                    Skeleton(modifier = Modifier.fillMaxWidth().height(80.dp))
                    Spacer(modifier = Modifier.height(8.dp))
                    Text("Click me")
                }
            }
            ElevatedCard(modifier = Modifier.weight(1f), onClick = {}) {
                Column(modifier = Modifier.padding(12.dp), horizontalAlignment = Alignment.CenterHorizontally) {
                    Skeleton(modifier = Modifier.fillMaxWidth().height(80.dp))
                    Spacer(modifier = Modifier.height(8.dp))
                    Text("Click me")
                }
            }
            OutlinedCard(modifier = Modifier.weight(1f), onClick = {}) {
                Column(modifier = Modifier.padding(12.dp), horizontalAlignment = Alignment.CenterHorizontally) {
                    Skeleton(modifier = Modifier.fillMaxWidth().height(80.dp))
                    Spacer(modifier = Modifier.height(8.dp))
                    Text("Click me")
                }
            }
        }
    }
}
```

## Sample App Snippet (Multiplatform)

> Same usage pattern as Android. Uses `<PackageName>.components.card.*` imports.
