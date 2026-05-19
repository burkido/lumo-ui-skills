# Badge

**CLI**: `./gradlew lumo --add Badge`  
**Docs**: https://www.lumoui.com/badge

## Description

Small indicator overlaid on another element. Three forms: dot (presence
indicator), count/content badge, and `BadgedBox` (positions the badge
automatically at the top-end corner of wrapped content).

## Variants

| Variant | Use case |
|---------|---------|
| `Badge` (no content) | Dot — unread / presence indicator |
| `Badge` (with content) | Show a count or short text |
| `BadgedBox` | Wrap any composable; badge auto-positions top-end |

## Parameters — Badge

| Parameter | Type | Purpose |
|-----------|------|---------|
| `modifier` | `Modifier` | Standard |
| `containerColor` | `Color` | Badge background color |
| `contentColor` | `Color` | Text/icon color inside badge |
| `content` | `@Composable (RowScope.() -> Unit)?` | Badge content; omit for dot form |

## Parameters — BadgedBox

| Parameter | Type | Purpose |
|-----------|------|---------|
| `badge` | `@Composable BoxScope.() -> Unit` | The `Badge` to overlay |
| `modifier` | `Modifier` | Applied to the bounding box |
| `content` | `@Composable BoxScope.() -> Unit` | The content being badged |

## Example

```kotlin
// Dot badge
Badge()

// Count badge
Badge {
    Text("3")
}

// BadgedBox wrapping a nav icon
BadgedBox(
    badge = {
        Badge { Text("12") }
    }
) {
    Icon(Icons.Default.Notifications, contentDescription = "Notifications")
}
```

## Sample App Snippet (Android)

```kotlin
// BadgedBox in a top bar with a chat icon
Scaffold(topBar = {
    TopBar {
        Row(modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp), horizontalArrangement = Arrangement.SpaceBetween) {
            Text("Badges", style = AppTheme.typography.h3)
            BadgedBox(badge = { Badge(containerColor = AppTheme.colors.error) { Text("9+") } }) {
                Icon(Icons.AutoMirrored.Filled.Chat, contentDescription = "Chat")
            }
        }
    }
}) { padding ->
    Column(modifier = Modifier.padding(padding).verticalScroll(rememberScrollState()).padding(16.dp)) {

        // Badges in various colors with different content
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            Badge(containerColor = AppTheme.colors.primary) { Text("New") }
            Badge(containerColor = AppTheme.colors.secondary) { Text("9+") }
            Badge(containerColor = AppTheme.colors.error) { Text("!") }
            Badge(containerColor = AppTheme.colors.success) { Text("OK") }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Navigation bar with badges on items
        NavigationBar {
            NavigationBarItem(
                selected = true,
                onClick = {},
                icon = {
                    BadgedBox(badge = { Badge() }) {
                        Icon(Icons.Default.Home, contentDescription = "Home")
                    }
                },
                label = { Text("Home") }
            )
            NavigationBarItem(
                selected = false,
                onClick = {},
                icon = {
                    BadgedBox(badge = { Badge(containerColor = AppTheme.colors.error) { Text("3") } }) {
                        Icon(Icons.AutoMirrored.Filled.Chat, contentDescription = "Chat")
                    }
                },
                label = { Text("Chat") }
            )
        }
    }
}
```

## Sample App Snippet (Multiplatform)

> Same usage pattern as Android. Uses `com.nomanr.lumo.multiplatform.ui.components.*` imports.
