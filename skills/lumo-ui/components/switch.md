# Switch

**CLI**: `./gradlew lumo --add Switch`  
**Docs**: https://www.lumoui.com/switch

## Description

Toggle control for boolean settings. Optionally shows an icon inside the thumb
for on/off state feedback.

## Parameters

| Parameter | Type | Purpose |
|-----------|------|---------|
| `checked` | `Boolean` | Current on/off state |
| `onCheckedChange` | `((Boolean) -> Unit)?` | Toggle callback; `null` for read-only |
| `enabled` | `Boolean` | Enable/disable (default `true`) |
| `thumbContent` | `@Composable (() -> Unit)?` | Icon inside the switch thumb |
| `colors` | `SwitchColors` | Via `SwitchDefaults.colors()` |
| `modifier` | `Modifier` | Standard |
| `interactionSource` | `MutableInteractionSource` | Custom interaction tracking |

## Example

```kotlin
// Simple switch
var enabled by remember { mutableStateOf(false) }

Switch(
    checked = enabled,
    onCheckedChange = { enabled = it }
)

// With icon in thumb
Switch(
    checked = enabled,
    onCheckedChange = { enabled = it },
    thumbContent = if (enabled) {
        {
            Icon(
                imageVector = Icons.Default.Check,
                contentDescription = null,
                modifier = Modifier.size(SwitchDefaults.ThumbSize)
            )
        }
    } else null
)
```

## Sample App Snippet (Android)

```kotlin
@Composable
fun SwitchSample() {
    Column(modifier = Modifier.fillMaxSize().verticalScroll(rememberScrollState()).padding(16.dp)) {
        val checked = remember { mutableStateOf(false) }

        Text(text = "Switch", style = AppTheme.typography.h4)

        // Basic and disabled states
        Row(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
            Switch(checked = checked.value, onCheckedChange = { checked.value = it })
            Switch(checked = checked.value, enabled = false, onCheckedChange = { checked.value = it })
        }

        // With dot thumb content
        Row(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
            Switch(checked = checked.value, thumbContent = {
                Box(modifier = Modifier.size(5.dp).clip(CircleShape).background(LocalContentColor.current))
            }, onCheckedChange = { checked.value = it })
            Switch(checked = checked.value, enabled = false, thumbContent = {
                Box(modifier = Modifier.size(5.dp).clip(CircleShape).background(LocalContentColor.current))
            }, onCheckedChange = { checked.value = it })
        }

        // With checkmark icon thumb
        Row(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
            Switch(checked = checked.value, thumbContent = {
                Icon(modifier = Modifier.size(12.dp), imageVector = Icons.Default.Check, contentDescription = "Checked")
            }, onCheckedChange = { checked.value = it })
        }

        Spacer(modifier = Modifier.height(24.dp))

        // Card with switch — border highlights when on
        var checkedState1 by remember { mutableStateOf(false) }
        val selectedBorder = BorderStroke(3.dp, AppTheme.colors.primary)

        OutlinedCard(
            border = if (checkedState1) selectedBorder else CardDefaults.outlinedCardBorder(),
            onClick = { checkedState1 = !checkedState1 },
        ) {
            Row(modifier = Modifier.fillMaxWidth().padding(16.dp), verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.SpaceBetween) {
                Text("Weekly Discount", style = AppTheme.typography.h4)
                Switch(checked = checkedState1, onCheckedChange = { checkedState1 = it })
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Difficulty settings card
        var easy by remember { mutableStateOf(true) }
        var medium by remember { mutableStateOf(false) }
        var hard by remember { mutableStateOf(false) }

        OutlinedCard {
            Column {
                Row(modifier = Modifier.fillMaxWidth().padding(16.dp), verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.SpaceBetween) {
                    Text("Difficulty", style = AppTheme.typography.h4)
                }
                HorizontalDivider()
                Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(16.dp)) {
                    listOf("Easy" to easy, "Medium" to medium, "Hard" to hard).forEach { (label, state) ->
                        Row(modifier = Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.SpaceBetween) {
                            Text(label)
                            Switch(checked = state, onCheckedChange = { when (label) { "Easy" -> easy = it; "Medium" -> medium = it; "Hard" -> hard = it } })
                        }
                    }
                }
            }
        }
    }
}
```

## Sample App Snippet (Multiplatform)

> Same usage pattern as Android. Uses `<PackageName>.components.*` imports.
