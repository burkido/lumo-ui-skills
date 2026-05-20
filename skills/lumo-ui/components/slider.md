# Slider

**CLI**: `./gradlew lumo --add Slider`  
**Docs**: https://www.lumoui.com/slider

## Description

Draggable track for selecting a value within a range. `Slider` for single
values, `RangeSlider` for selecting a range (start..end).

## Variants

| Variant | Use |
|---------|-----|
| `Slider` | Single float value |
| `RangeSlider` | Float range (`ClosedFloatingPointRange<Float>`) |

## Parameters — Slider

| Parameter | Type | Purpose |
|-----------|------|---------|
| `value` | `Float` | Current value |
| `onValueChange` | `(Float) -> Unit` | Live value update |
| `onValueChangeFinished` | `(() -> Unit)?` | Called after drag ends |
| `valueRange` | `ClosedFloatingPointRange<Float>` | Valid range (default `0f..1f`) |
| `steps` | `Int` | Discrete steps (0 = continuous) |
| `enabled` | `Boolean` | Enable/disable |
| `colors` | `SliderColors` | Via `SliderDefaults.colors()` |
| `modifier` | `Modifier` | Standard |

## Parameters — RangeSlider

| Parameter | Type | Purpose |
|-----------|------|---------|
| `value` | `ClosedFloatingPointRange<Float>` | Current range |
| `onValueChange` | `(ClosedFloatingPointRange<Float>) -> Unit` | Live update |
| `onValueChangeFinished` | `(() -> Unit)?` | After drag ends |
| `valueRange` | `ClosedFloatingPointRange<Float>` | Valid range (default `0f..1f`) |
| `steps` | `Int` | Discrete steps |
| `enabled` | `Boolean` | Enable/disable |
| `colors` | `SliderColors` | Via `SliderDefaults.colors()` |
| `modifier` | `Modifier` | Standard |

## Example

```kotlin
// Continuous volume slider
var volume by remember { mutableFloatStateOf(0.5f) }

Slider(
    value = volume,
    onValueChange = { volume = it },
    valueRange = 0f..1f,
    modifier = Modifier.fillMaxWidth()
)
Text("Volume: ${(volume * 100).toInt()}%")

// Price range slider
var priceRange by remember { mutableStateOf(20f..80f) }

RangeSlider(
    value = priceRange,
    onValueChange = { priceRange = it },
    valueRange = 0f..100f
)
Text("$${priceRange.start.toInt()} – $${priceRange.endInclusive.toInt()}")
```

## Sample App Snippet (Android)

```kotlin
@Composable
fun SliderSample() {
    Column(modifier = Modifier.verticalScroll(rememberScrollState()).padding(16.dp), verticalArrangement = Arrangement.spacedBy(24.dp)) {

        // Basic slider (0-1)
        var value1 by remember { mutableFloatStateOf(0.5f) }
        Column {
            Text("Basic Slider (0-1): ${"%.2f".format(value1)}", style = AppTheme.typography.label1)
            Slider(value = value1, onValueChange = { value1 = it }, modifier = Modifier.fillMaxWidth())
        }

        // Custom range slider (1-10)
        var value2 by remember { mutableFloatStateOf(5f) }
        Column {
            Text("Custom Range (1-10): ${"%.2f".format(value2)}", style = AppTheme.typography.label1)
            Slider(value = value2, onValueChange = { value2 = it }, valueRange = 1f..10f, modifier = Modifier.fillMaxWidth())
        }

        // Stepped slider
        var value3 by remember { mutableFloatStateOf(0f) }
        Column {
            Text("Stepped (8 steps): ${"%.2f".format(value3)}", style = AppTheme.typography.label1)
            Slider(value = value3, onValueChange = { value3 = it }, steps = 8, modifier = Modifier.fillMaxWidth())
        }

        // Custom error color
        var value4 by remember { mutableFloatStateOf(0.5f) }
        Column {
            Text("Custom Color: ${"%.2f".format(value4)}", style = AppTheme.typography.label1)
            Slider(
                value = value4,
                onValueChange = { value4 = it },
                colors = SliderDefaults.colors(thumbColor = AppTheme.colors.error, activeTrackColor = AppTheme.colors.error),
                modifier = Modifier.fillMaxWidth(),
            )
        }

        // Range slider examples
        var range1 by remember { mutableStateOf(0f..1f) }
        Column {
            Text("Range Slider: ${"%.2f".format(range1.start)} – ${"%.2f".format(range1.endInclusive)}", style = AppTheme.typography.label1)
            RangeSlider(value = range1, onValueChange = { range1 = it }, modifier = Modifier.fillMaxWidth())
        }

        var range2 by remember { mutableStateOf(0f..100f) }
        Column {
            Text("Range (0-100): ${range2.start.toInt()} – ${range2.endInclusive.toInt()}", style = AppTheme.typography.label1)
            RangeSlider(value = range2, onValueChange = { range2 = it }, valueRange = 0f..100f, modifier = Modifier.fillMaxWidth())
        }

        // Disabled range slider
        Column {
            Text("Disabled Range Slider", style = AppTheme.typography.label1)
            RangeSlider(value = 0.2f..0.8f, onValueChange = {}, enabled = false, modifier = Modifier.fillMaxWidth())
        }
    }
}
```

## Sample App Snippet (Multiplatform)

> Same usage pattern as Android. Uses `com.nomanr.lumo.multiplatform.ui.components.*` imports.
