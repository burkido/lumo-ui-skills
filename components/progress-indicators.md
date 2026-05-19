# Progress Indicators

**CLI**: `./gradlew lumo --add ProgressIndicator`  
**Docs**: https://www.lumoui.com/progress-indicator

## Description

Linear and circular progress indicators. Both support determinate (known
progress) and indeterminate (unknown duration) modes.

## Variants

| Variant | Mode | How |
|---------|------|-----|
| `LinearProgressIndicator` | Determinate | Pass `progress: () -> Float` |
| `LinearProgressIndicator` | Indeterminate | Omit `progress` parameter |
| `CircularProgressIndicator` | Determinate | Pass `progress: () -> Float` |
| `CircularProgressIndicator` | Indeterminate | Omit `progress` parameter |

## Parameters — LinearProgressIndicator (determinate)

| Parameter | Type | Purpose |
|-----------|------|---------|
| `progress` | `() -> Float` | Value 0f–1f |
| `modifier` | `Modifier` | Use `fillMaxWidth()` for full-width |
| `color` | `Color` | Track fill color |
| `trackColor` | `Color` | Background track color |
| `strokeCap` | `StrokeCap` | `StrokeCap.Round` or `Butt` |

## Parameters — LinearProgressIndicator (indeterminate)

Same as determinate but without `progress`.

## Parameters — CircularProgressIndicator

| Parameter | Type | Purpose |
|-----------|------|---------|
| `progress` | `() -> Float` | Determinate: 0f–1f. Omit for indeterminate |
| `modifier` | `Modifier` | Use `Modifier.size()` to resize |
| `color` | `Color` | Arc color |
| `trackColor` | `Color` | Background ring color |
| `strokeWidth` | `Dp` | Arc thickness (default `4.dp`) |
| `strokeCap` | `StrokeCap` | End cap style |

## Example

```kotlin
// Indeterminate — loading state
CircularProgressIndicator(
    modifier = Modifier.size(48.dp),
    color = AppTheme.colors.primary
)

// Determinate — file upload progress
var progress by remember { mutableFloatStateOf(0f) }

LinearProgressIndicator(
    progress = { progress },
    modifier = Modifier.fillMaxWidth()
)

// Animate progress
LaunchedEffect(Unit) {
    while (progress < 1f) {
        delay(50)
        progress += 0.01f
    }
}
```

## Sample App Snippet (Android)

```kotlin
@Composable
fun ProgressIndicatorSample() {
    var progress by remember { mutableFloatStateOf(0f) }
    val animatedProgress by animateFloatAsState(targetValue = progress, animationSpec = tween(durationMillis = 5000), label = "progress")

    LaunchedEffect(Unit) { progress = 1f }

    Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(16.dp)) {

        // Linear progress indicators
        Text("Linear", style = AppTheme.typography.h4)
        LinearProgressIndicator(modifier = Modifier.fillMaxWidth())
        LinearProgressIndicator(progress = { animatedProgress }, modifier = Modifier.fillMaxWidth())
        Text("${(animatedProgress * 100).toInt()}%", style = AppTheme.typography.body2)

        // Circular progress indicators
        Text("Circular", style = AppTheme.typography.h4)
        Row(horizontalArrangement = Arrangement.spacedBy(16.dp), verticalAlignment = Alignment.CenterVertically) {
            CircularProgressIndicator()
            CircularProgressIndicator(modifier = Modifier.size(48.dp))
            Box(contentAlignment = Alignment.Center) {
                CircularProgressIndicator(progress = { animatedProgress }, modifier = Modifier.size(64.dp))
                Text("${(animatedProgress * 100).toInt()}%", style = AppTheme.typography.label2)
            }
        }

        // Practical examples
        Text("Examples", style = AppTheme.typography.h4)

        // Loading button
        Button(variant = ButtonVariant.Primary, onClick = {}, modifier = Modifier.fillMaxWidth()) {
            CircularProgressIndicator(modifier = Modifier.size(18.dp), strokeWidth = 2.dp)
            Spacer(Modifier.width(8.dp))
            Text("Loading...")
        }

        // File download card
        ElevatedCard(modifier = Modifier.fillMaxWidth()) {
            Row(modifier = Modifier.padding(16.dp), verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                Icon(imageVector = Icons.Default.VideoFile, contentDescription = "Video", modifier = Modifier.size(40.dp))
                Column(modifier = Modifier.weight(1f)) {
                    Text("video.mp4", style = AppTheme.typography.label1)
                    Spacer(Modifier.height(4.dp))
                    LinearProgressIndicator(progress = { animatedProgress }, modifier = Modifier.fillMaxWidth())
                }
            }
        }
    }
}
```

## Sample App Snippet (Multiplatform)

> Same usage pattern as Android. Uses `com.nomanr.lumo.multiplatform.ui.components.*` imports.
