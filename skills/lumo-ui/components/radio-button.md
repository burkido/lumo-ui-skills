# Radio Button

**CLI**: `./gradlew lumo --add RadioButton`  
**Docs**: https://www.lumoui.com/radio-button

## Description

Single-select option within a mutually exclusive group. Can be used standalone,
with a label via the `content` slot, or in a managed radio group.

## Parameters

| Parameter | Type | Purpose |
|-----------|------|---------|
| `selected` | `Boolean` | Whether this option is selected |
| `onClick` | `(() -> Unit)?` | Selection handler; `null` for read-only |
| `enabled` | `Boolean` | Enable/disable (default `true`) |
| `colors` | `RadioButtonColors` | Via `RadioButtonDefaults.colors()` |
| `modifier` | `Modifier` | Standard |
| `content` | `@Composable (() -> Unit)?` | Label / content next to the radio dot |

## Example

```kotlin
// With label via content slot
var selected by remember { mutableStateOf(false) }

RadioButton(
    selected = selected,
    onClick = { selected = true }
) {
    Text("Option A", modifier = Modifier.padding(start = 8.dp))
}
```

## Sample App Snippet (Android)

```kotlin
@Composable
fun RadioButtonSample() {
    Column(modifier = Modifier.fillMaxSize().verticalScroll(rememberScrollState()).padding(16.dp)) {

        // Basic showcase — enabled and disabled states
        Text(text = "Radio Button", style = AppTheme.typography.h4)
        var selected1 by remember { mutableIntStateOf(0) }
        Row {
            RadioButton(selected = selected1 == 0, onClick = { selected1 = 0 })
            RadioButton(selected = selected1 == 1, onClick = { selected1 = 1 })
        }
        Row {
            RadioButton(selected = selected1 == 0, enabled = false, onClick = {})
            RadioButton(selected = selected1 == 1, enabled = false, onClick = {})
        }

        Spacer(modifier = Modifier.height(24.dp))

        // Card-based selection with border highlighting
        var selectedDiscount by remember { mutableIntStateOf(-1) }
        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            listOf("Weekly Discount", "Monthly Discount").forEachIndexed { index, label ->
                OutlinedCard(
                    border = if (selectedDiscount == index) BorderStroke(3.dp, AppTheme.colors.primary) else CardDefaults.outlinedCardBorder(),
                ) {
                    Row(modifier = Modifier.fillMaxWidth().padding(16.dp), verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.SpaceBetween) {
                        Text(label, style = AppTheme.typography.h4)
                        RadioButton(selected = selectedDiscount == index, onClick = { selectedDiscount = index })
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Difficulty selector
        var difficulty by remember { mutableIntStateOf(0) }
        OutlinedCard {
            Column {
                Row(modifier = Modifier.fillMaxWidth().padding(16.dp), verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.SpaceBetween) {
                    Text("Difficulty", style = AppTheme.typography.h4)
                }
                HorizontalDivider()
                Column(modifier = Modifier.padding(16.dp)) {
                    listOf("Easy", "Medium", "Hard").forEachIndexed { index, label ->
                        Row(modifier = Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.SpaceBetween) {
                            Text(label)
                            RadioButton(selected = difficulty == index, onClick = { difficulty = index })
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

## Note on grouping

lumo-ui doesn't have a `RadioGroup` container — manage group state manually
with a single `selectedOption` variable and compare it per item (as shown above).
