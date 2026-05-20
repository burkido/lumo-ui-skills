# Text

**CLI**: `./gradlew lumo --add Text`  
**Docs**: https://www.lumoui.com/text

## Description

Extended `Text` composable that adds a `textRes` parameter for `@StringRes Int`
support alongside the standard string overload. Pair with `AppTheme.typography`
for consistent type scale.

## Overloads

| Overload | When to use |
|----------|-------------|
| `Text(text = "...")` | Literal or runtime string |
| `Text(textRes = R.string.hello)` | String resource ID |

## Parameters

| Parameter | Type | Purpose |
|-----------|------|---------|
| `text` | `String` | Text content (use this OR `textRes`) |
| `textRes` | `Int` | `@StringRes` ID (use this OR `text`) |
| `modifier` | `Modifier` | Standard |
| `color` | `Color` | Text color (default `Color.Unspecified` → inherits) |
| `style` | `TextStyle` | Typography style — use `AppTheme.typography.*` |
| `textAlign` | `TextAlign?` | Alignment |
| `overflow` | `TextOverflow` | `Clip`, `Ellipsis`, `Visible` |
| `softWrap` | `Boolean` | Wrap on soft line breaks |
| `maxLines` | `Int` | Max lines before truncation |
| `minLines` | `Int` | Min lines (expands to fill) |
| `onTextLayout` | `((TextLayoutResult) -> Unit)?` | Layout callback |

## Example

```kotlin
// Standard heading
Text(
    text = "Welcome back",
    style = AppTheme.typography.h2,
    color = AppTheme.colors.onBackground
)

// Body with ellipsis
Text(
    text = longDescription,
    style = AppTheme.typography.body2,
    maxLines = 3,
    overflow = TextOverflow.Ellipsis
)

// From string resource
Text(
    textRes = R.string.app_name,
    style = AppTheme.typography.h1
)

// Centered label
Text(
    text = "No results",
    style = AppTheme.typography.body1,
    color = AppTheme.colors.onSurface.copy(alpha = 0.5f),
    textAlign = TextAlign.Center,
    modifier = Modifier.fillMaxWidth()
)
```

## Sample App Snippet (Android)

```kotlin
@Composable
fun TextSample() {
    val typography = LocalTypography.current

    Column(
        modifier = Modifier.verticalScroll(rememberScrollState()).fillMaxSize().padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp),
    ) {
        Text(text = "H1 Heading", style = typography.h1)
        Text(text = "H2 Heading", style = typography.h2)
        Text(text = "H3 Heading", style = typography.h3)
        Text(text = "H4 Heading", style = typography.h4)

        Spacer(modifier = Modifier.height(16.dp))

        Text(text = "This is body1 text.", style = typography.body1)
        Text(text = "This is body2 text.", style = typography.body2)
        Text(text = "Body3 text for fine print.", style = typography.body3)

        Spacer(modifier = Modifier.height(16.dp))

        Text(text = "Label1: Form Label", style = typography.label1)
        Text(text = "Label2: Secondary Info", style = typography.label2)
        Text(text = "Label3: Tiny Details", style = typography.label3)

        Spacer(modifier = Modifier.height(16.dp))
    }
}
```

## Sample App Snippet (Multiplatform)

```kotlin
// Identical — uses com.nomanr.lumo.multiplatform.ui.LocalTypography
@Composable
fun TextSample() {
    val typography = LocalTypography.current

    Column(
        modifier = Modifier.verticalScroll(rememberScrollState()).fillMaxSize().padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp),
    ) {
        Text(text = "H1 Heading", style = typography.h1)
        Text(text = "H2 Heading", style = typography.h2)
        Text(text = "H3 Heading", style = typography.h3)
        Text(text = "H4 Heading", style = typography.h4)

        Spacer(modifier = Modifier.height(16.dp))

        Text(text = "This is body1 text.", style = typography.body1)
        Text(text = "This is body2 text.", style = typography.body2)
        Text(text = "Body3 text for fine print.", style = typography.body3)

        Spacer(modifier = Modifier.height(16.dp))

        Text(text = "Label1: Form Label", style = typography.label1)
        Text(text = "Label2: Secondary Info", style = typography.label2)
        Text(text = "Label3: Tiny Details", style = typography.label3)

        Spacer(modifier = Modifier.height(16.dp))
    }
}
```
