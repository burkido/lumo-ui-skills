# Tooltip

**CLI**: `./gradlew lumo --add Tooltip`  
**Docs**: https://www.lumoui.com/tooltip

## Description

Floating label shown on long-press (Android) or hover (Desktop/iOS). Uses a
two-component pattern: `TooltipBox` wraps the anchor, `Tooltip` renders the popup.

## KMP Notes

Tooltip is the only lumo-ui component with platform-specific generated files:
- `Tooltip.android.kt` — long-press triggered, `TooltipBox` with gesture handling
- `Tooltip.ios.kt` — hover-triggered implementation

Set `KotlinMultiplatform=true` in `lumo.properties` to get both files.

## State

```kotlin
// Transient (auto-dismisses)
val tooltipState = rememberTooltipState()

// Persistent (stays until dismissed)
val tooltipState = rememberTooltipState(isPersistent = true)
```

## Parameters — TooltipBox

| Parameter | Type | Purpose |
|-----------|------|---------|
| `positionProvider` | `PopupPositionProvider` | Where the popup appears relative to anchor |
| `tooltip` | `@Composable () -> Unit` | The `Tooltip` content composable |
| `state` | `TooltipState` | From `rememberTooltipState()` |
| `modifier` | `Modifier` | Standard |
| `focusable` | `Boolean` | Whether tooltip is focusable |
| `enableUserInput` | `Boolean` | Enable long-press/hover trigger (default `true`) |
| `content` | `@Composable () -> Unit` | The anchor element |

## Parameters — Tooltip

| Parameter | Type | Purpose |
|-----------|------|---------|
| `modifier` | `Modifier` | Standard |
| `shape` | `Shape` | Tooltip bubble shape |
| `containerColor` | `Color` | Tooltip background |
| `contentColor` | `Color` | Text/icon color inside |
| `content` | `@Composable () -> Unit` | Tooltip text/content |

## Example

```kotlin
val tooltipState = rememberTooltipState()

TooltipBox(
    positionProvider = TooltipDefaults.rememberPlainTooltipPositionProvider(),
    tooltip = {
        Tooltip {
            Text("This is a tooltip")
        }
    },
    state = tooltipState
) {
    IconButton(
        variant = IconButtonVariant.SecondaryGhost,
        onClick = {}
    ) {
        Icon(Icons.Default.Info, contentDescription = "More info")
    }
}
```

## Sample App Snippet (Android)

```kotlin
@Composable
fun TooltipSample() {
    Column(modifier = Modifier.verticalScroll(rememberScrollState()).padding(horizontal = 16.dp), horizontalAlignment = Alignment.CenterHorizontally) {

        // Basic tooltip — auto-dismisses
        Box(modifier = Modifier.padding(top = 100.dp)) {
            TooltipBox(
                positionProvider = TooltipDefaults.rememberPlainTooltipPositionProvider(),
                tooltip = { Tooltip { Text("Auto-dismisses") } },
                state = rememberTooltipState(),
            ) {
                Button(text = "Basic Tooltip", variant = ButtonVariant.PrimaryOutlined, onClick = {})
            }
        }

        // Tooltip without caret
        Box(modifier = Modifier.padding(top = 100.dp)) {
            TooltipBox(
                positionProvider = TooltipDefaults.rememberPlainTooltipPositionProvider(),
                tooltip = { Tooltip(caretProperties = null) { Text("No caret") } },
                state = rememberTooltipState(),
            ) {
                Button(text = "No Caret Tooltip", variant = ButtonVariant.PrimaryOutlined, onClick = {})
            }
        }

        // Persistent tooltip
        Box(modifier = Modifier.padding(top = 100.dp)) {
            TooltipBox(
                positionProvider = TooltipDefaults.rememberPlainTooltipPositionProvider(),
                tooltip = { Tooltip { Text("Stays until tapped outside") } },
                state = rememberTooltipState(isPersistent = true),
            ) {
                Button(text = "Persistent Tooltip", variant = ButtonVariant.PrimaryOutlined, onClick = {})
            }
        }

        // Complex tooltip with icon + close button
        Box(modifier = Modifier.padding(top = 100.dp)) {
            val state = rememberTooltipState(isPersistent = true)
            val scope = rememberCoroutineScope()
            TooltipBox(
                positionProvider = TooltipDefaults.rememberPlainTooltipPositionProvider(),
                tooltip = {
                    Tooltip {
                        Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                            Icon(imageVector = Icons.Default.Warning, contentDescription = null, modifier = Modifier.size(16.dp))
                            Text("Complex tooltip with close button")
                            IconButton(variant = IconButtonVariant.Ghost, onClick = { scope.launch { state.dismiss() } }) {
                                Icon(imageVector = Icons.Default.Close, contentDescription = "Close", modifier = Modifier.size(16.dp))
                            }
                        }
                    }
                },
                state = state,
            ) {
                Button(text = "Complex Tooltip", variant = ButtonVariant.PrimaryOutlined, onClick = {})
            }
        }
    }
}
```

## Sample App Snippet (Multiplatform)

```kotlin
// Same pattern — uses com.nomanr.lumo.multiplatform.ui.components.* imports
@Composable
fun TooltipSample() {
    Column(modifier = Modifier.verticalScroll(rememberScrollState()).padding(horizontal = 16.dp), horizontalAlignment = Alignment.CenterHorizontally) {

        Box(modifier = Modifier.padding(top = 100.dp)) {
            TooltipBox(
                positionProvider = TooltipDefaults.rememberPlainTooltipPositionProvider(),
                tooltip = { Tooltip { Text("Auto-dismisses") } },
                state = rememberTooltipState(),
            ) {
                Button(text = "Basic Tooltip", variant = ButtonVariant.PrimaryOutlined, onClick = {})
            }
        }

        Box(modifier = Modifier.padding(top = 100.dp)) {
            val state = rememberTooltipState(isPersistent = true)
            val scope = rememberCoroutineScope()
            TooltipBox(
                positionProvider = TooltipDefaults.rememberPlainTooltipPositionProvider(),
                tooltip = {
                    Tooltip {
                        Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                            Icon(imageVector = Icons.Default.Warning, contentDescription = null, modifier = Modifier.size(16.dp))
                            Text("Persistent tooltip — tap close to dismiss")
                            IconButton(variant = IconButtonVariant.Ghost, onClick = { scope.launch { state.dismiss() } }) {
                                Icon(imageVector = Icons.Default.Close, contentDescription = "Close", modifier = Modifier.size(16.dp))
                            }
                        }
                    }
                },
                state = state,
            ) {
                Button(text = "Persistent Tooltip", variant = ButtonVariant.PrimaryOutlined, onClick = {})
            }
        }
    }
}
```
