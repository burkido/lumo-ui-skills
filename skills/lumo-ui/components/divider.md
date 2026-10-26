# Divider

**CLI**: `./gradlew lumo --add Divider`  
**Docs**: https://www.lumoui.com/divider

## Description

Thin separator line. Horizontal for between rows, vertical for within rows.

## Variants

| Variant | Use |
|---------|-----|
| `HorizontalDivider` | Between vertical items |
| `VerticalDivider` | Between horizontal items |

## Parameters — HorizontalDivider

| Parameter | Type | Purpose |
|-----------|------|---------|
| `modifier` | `Modifier` | Standard; use to control width |
| `thickness` | `Dp` | Line thickness (default `1.dp`) |
| `color` | `Color` | Line color (default `AppTheme.colors.outline`) |

## Parameters — VerticalDivider

| Parameter | Type | Purpose |
|-----------|------|---------|
| `modifier` | `Modifier` | Standard; use to control height |
| `thickness` | `Dp` | Line thickness (default `1.dp`) |
| `color` | `Color` | Line color |

## Example

```kotlin
// Between list items
Column {
    Text("Item 1", modifier = Modifier.padding(16.dp))
    HorizontalDivider()
    Text("Item 2", modifier = Modifier.padding(16.dp))
}

// Between tabs in a row
Row(
    verticalAlignment = Alignment.CenterVertically,
    modifier = Modifier.height(48.dp)
) {
    Text("Tab 1", modifier = Modifier.padding(horizontal = 16.dp))
    VerticalDivider(modifier = Modifier.height(24.dp))
    Text("Tab 2", modifier = Modifier.padding(horizontal = 16.dp))
}
```

## Sample App Snippet (Android)

```kotlin
@Composable
fun DividerSample() {
    Column(modifier = Modifier.fillMaxSize().padding(16.dp)) {
        Text(text = "Two type of dividers are available: \n- Horizontal\n- Vertical", style = AppTheme.typography.h4)

        Spacer(modifier = Modifier.height(24.dp))

        HorizontalDivider()
        Row(modifier = Modifier.fillMaxWidth().height(IntrinsicSize.Min), horizontalArrangement = Arrangement.SpaceBetween) {
            Text(modifier = Modifier.padding(16.dp), text = "Start")
            VerticalDivider(modifier = Modifier.fillMaxHeight())
            Text(modifier = Modifier.padding(16.dp), text = "End")
        }
        HorizontalDivider()

        Spacer(modifier = Modifier.height(24.dp))

        Text(text = "Different thickness", style = AppTheme.typography.label1)
        Spacer(modifier = Modifier.height(8.dp))

        HorizontalDivider(thickness = 4.dp)
        Row(modifier = Modifier.fillMaxWidth().height(IntrinsicSize.Min), horizontalArrangement = Arrangement.SpaceBetween) {
            Text(modifier = Modifier.padding(16.dp), text = "Start")
            VerticalDivider(modifier = Modifier.fillMaxHeight(), thickness = 4.dp)
            Text(modifier = Modifier.padding(16.dp), text = "End")
        }
        HorizontalDivider(thickness = 4.dp)
    }
}
```

## Sample App Snippet (Multiplatform)

> Same usage pattern as Android. Uses `<PackageName>.components.*` imports.
