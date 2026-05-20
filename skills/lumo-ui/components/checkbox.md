# Checkbox

**CLI**: `./gradlew lumo --add Checkbox`  
**Docs**: https://www.lumoui.com/checkbox

## Description

Standard two-state checkbox and a three-state (`TriStateCheckbox`) variant for
parent/child selection groups (checked / unchecked / indeterminate).

## Variants

| Variant | States |
|---------|--------|
| `Checkbox` | Checked / Unchecked |
| `TriStateCheckbox` | `ToggleableState.On` / `Off` / `Indeterminate` |

## Parameters — Checkbox

| Parameter | Type | Purpose |
|-----------|------|---------|
| `checked` | `Boolean` | Current state |
| `onCheckedChange` | `((Boolean) -> Unit)?` | State change callback; `null` for read-only |
| `enabled` | `Boolean` | Enable/disable (default `true`) |
| `colors` | `CheckboxColors` | Via `CheckboxDefaults.colors()` |
| `modifier` | `Modifier` | Standard |

## Parameters — TriStateCheckbox

| Parameter | Type | Purpose |
|-----------|------|---------|
| `state` | `ToggleableState` | `On`, `Off`, or `Indeterminate` |
| `onClick` | `(() -> Unit)?` | Toggle callback |
| `enabled` | `Boolean` | Enable/disable (default `true`) |
| `colors` | `CheckboxColors` | Via `CheckboxDefaults.colors()` |
| `modifier` | `Modifier` | Standard |

## Example

```kotlin
// Simple checkbox with label
var checked by remember { mutableStateOf(false) }

Row(
    verticalAlignment = Alignment.CenterVertically,
    modifier = Modifier.clickable { checked = !checked }
) {
    Checkbox(
        checked = checked,
        onCheckedChange = { checked = it }
    )
    Spacer(Modifier.width(8.dp))
    Text("Enable notifications")
}
```

## Sample App Snippet (Android)

```kotlin
@Composable
fun CheckboxSample() {
    Column(modifier = Modifier.fillMaxSize().verticalScroll(rememberScrollState()).padding(16.dp)) {
        // Basic checkboxes — enabled and disabled states
        var checkbox1A by remember { mutableStateOf(false) }
        var checkbox1B by remember { mutableStateOf(true) }

        Text(text = "Checkbox", style = AppTheme.typography.h4)
        Row(verticalAlignment = Alignment.CenterVertically) {
            Checkbox(checked = checkbox1A, onCheckedChange = { checkbox1A = it })
            Checkbox(checked = checkbox1B, onCheckedChange = { checkbox1B = it })
        }
        Row(verticalAlignment = Alignment.CenterVertically) {
            Checkbox(checked = checkbox1A, enabled = false, onCheckedChange = { checkbox1A = it })
            Checkbox(checked = checkbox1B, enabled = false, onCheckedChange = { checkbox1B = it })
        }

        Spacer(modifier = Modifier.height(24.dp))

        // Card with checkbox — border highlights when selected
        val checkedState1 = remember { mutableStateOf(false) }
        val border1 = if (checkedState1.value) BorderStroke(3.dp, AppTheme.colors.primary) else CardDefaults.outlinedCardBorder()

        OutlinedCard(border = border1) {
            Row(modifier = Modifier.fillMaxWidth().padding(16.dp), verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.SpaceBetween) {
                Text("Weekly Discount", style = AppTheme.typography.h4)
                Checkbox(checked = checkedState1.value, onCheckedChange = { checkedState1.value = it })
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // TriStateCheckbox group (Difficulty example)
        var all by remember { mutableStateOf(ToggleableState.Indeterminate) }
        var easy by remember { mutableStateOf(true) }
        var medium by remember { mutableStateOf(false) }
        var hard by remember { mutableStateOf(false) }

        LaunchedEffect(easy, medium, hard) {
            all = when {
                easy && medium && hard -> ToggleableState.On
                !easy && !medium && !hard -> ToggleableState.Off
                else -> ToggleableState.Indeterminate
            }
        }

        OutlinedCard {
            Column {
                Row(modifier = Modifier.fillMaxWidth().padding(16.dp), verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.SpaceBetween) {
                    Text("Difficulty", style = AppTheme.typography.h4)
                    TriStateCheckbox(state = all, onClick = {
                        if (all == ToggleableState.On) { easy = false; medium = false; hard = false }
                        else { easy = true; medium = true; hard = true }
                    })
                }
                HorizontalDivider()
                Column(modifier = Modifier.padding(16.dp)) {
                    listOf("Easy" to easy, "Medium" to medium, "Hard" to hard).forEach { (label, checked) ->
                        Row(modifier = Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.SpaceBetween) {
                            Text(label)
                            Checkbox(checked = checked, onCheckedChange = { when (label) { "Easy" -> easy = it; "Medium" -> medium = it; "Hard" -> hard = it } })
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
