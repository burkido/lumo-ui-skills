# Navigation Bar

**CLI**: `./gradlew lumo --add NavigationBar`  
**Docs**: https://www.lumoui.com/navigation-bar

## Description

Bottom navigation bar with 2–5 destinations. Composed of a `NavigationBar`
container and individual `NavigationBarItem` composables.

## Components

- `NavigationBar` — the bar container (goes in Scaffold's `bottomBar`)
- `NavigationBarItem` — individual destination item

## Parameters — NavigationBar

| Parameter | Type | Purpose |
|-----------|------|---------|
| `modifier` | `Modifier` | Standard |
| `containerColor` | `Color` | Bar background color |
| `contentColor` | `Color` | Default icon/label color |
| `tonalElevation` | `Dp` | Tonal elevation for Material3 color role |
| `windowInsets` | `WindowInsets` | Handle nav bar insets (edge-to-edge) |
| `content` | `@Composable RowScope.() -> Unit` | `NavigationBarItem` children |

## Parameters — NavigationBarItem

| Parameter | Type | Purpose |
|-----------|------|---------|
| `selected` | `Boolean` | Whether this destination is active |
| `onClick` | `() -> Unit` | Destination switch handler |
| `icon` | `@Composable () -> Unit` | Icon for the item |
| `label` | `@Composable (() -> Unit)?` | Text label (optional) |
| `enabled` | `Boolean` | Enable/disable (default `true`) |
| `alwaysShowLabel` | `Boolean` | Show label even when unselected (default `true`) |
| `colors` | `NavigationBarItemColors` | Via `NavigationBarItemDefaults.colors()` |
| `modifier` | `Modifier` | Standard |

## Example

```kotlin
val destinations = listOf("Home", "Search", "Profile")
val icons = listOf(Icons.Default.Home, Icons.Default.Search, Icons.Default.Person)
var selectedIndex by remember { mutableIntStateOf(0) }

Scaffold(
    bottomBar = {
        NavigationBar {
            destinations.forEachIndexed { index, label ->
                NavigationBarItem(
                    selected = selectedIndex == index,
                    onClick = { selectedIndex = index },
                    icon = { Icon(icons[index], contentDescription = label) },
                    label = { Text(label) }
                )
            }
        }
    }
) { padding ->
    // screen content
}
```

## Sample App Snippet (Android)

```kotlin
@Composable
fun NavigationBarSample(navigateUp: (() -> Unit)?) {
    var selectedScreen by remember { mutableStateOf("Home") }
    var showLabels by remember { mutableStateOf(true) }
    var items by remember { mutableIntStateOf(3) }

    Scaffold(
        topBar = { SampleScreenTopBar(title = "Navigation Bar", onBack = { navigateUp?.invoke() }) },
        bottomBar = {
            val screens = mutableListOf(
                listOf("Home", Icons.Default.Home),
                listOf("Search", Icons.Default.Search),
                listOf("Profile", Icons.Default.Person),
            ).apply {
                if (items >= 4) add(listOf("Settings", Icons.Default.Settings))
                if (items == 5) add(listOf("Chat", Icons.AutoMirrored.Default.Chat))
            }

            Column {
                HorizontalDivider()
                NavigationBar {
                    screens.forEach { screen ->
                        val label = screen[0].toString()
                        NavigationBarItem(
                            selected = label == selectedScreen,
                            onClick = { selectedScreen = label },
                            label = if (showLabels) { { Text(text = label, style = AppTheme.typography.label2, maxLines = 1) } } else null,
                            icon = { Icon(screen[1] as ImageVector, contentDescription = "nav bar item") },
                        )
                    }
                }
            }
        }
    ) { padding ->
        Column(modifier = Modifier.padding(padding).padding(horizontal = 16.dp).fillMaxWidth()) {
            // Controls for show labels and item count
            OutlinedCard {
                Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(16.dp)) {
                    Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
                        Text("Show labels", style = AppTheme.typography.label2)
                        Checkbox(checked = showLabels, onCheckedChange = { showLabels = it })
                    }
                    Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
                        Text("Items")
                        Row {
                            listOf(3, 4, 5).forEach { count ->
                                RadioButton(selected = items == count, onClick = { items = count }) {
                                    Text("$count", style = AppTheme.typography.label2)
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
```

## Sample App Snippet (Multiplatform)

> Same usage pattern as Android. Uses `com.nomanr.lumo.multiplatform.ui.components.*` imports.
