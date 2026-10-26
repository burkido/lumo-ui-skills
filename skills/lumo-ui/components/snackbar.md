# Snackbar

**CLI**: `./gradlew lumo --add Snackbar`  
**Docs**: https://www.lumoui.com/snackbar

## Description

Transient feedback message at the bottom of the screen. Shown imperatively
via `SnackbarHostState.showSnackbar()`. Wire into `Scaffold`'s `snackbarHost` slot.

## Setup

```kotlin
val snackbarHostState = remember { SnackbarHostState() }
val scope = rememberCoroutineScope()

Scaffold(
    snackbarHost = { SnackbarHost(hostState = snackbarHostState) }
) { padding ->
    // content
}
```

## Show a snackbar

```kotlin
scope.launch {
    snackbarHostState.showSnackbar(
        message = "Changes saved",
        actionLabel = "Undo",          // optional action button label
        withDismissAction = true,      // show ✕ button
        duration = SnackbarDuration.Short
    )
}
```

## Parameters — showSnackbar

| Parameter | Type | Purpose |
|-----------|------|---------|
| `message` | `String` | Main message text |
| `actionLabel` | `String?` | Action button label (e.g. "Undo") |
| `withDismissAction` | `Boolean` | Show dismiss (×) button (default `false`) |
| `duration` | `SnackbarDuration` | How long it shows |

## SnackbarDuration values

| Value | Duration |
|-------|---------|
| `SnackbarDuration.Short` | ~4 seconds |
| `SnackbarDuration.Long` | ~10 seconds |
| `SnackbarDuration.Indefinite` | Until dismissed manually |

## Handling the result

```kotlin
val result = snackbarHostState.showSnackbar(
    message = "Item deleted",
    actionLabel = "Undo"
)
when (result) {
    SnackbarResult.ActionPerformed -> { /* restore item */ }
    SnackbarResult.Dismissed -> { /* nothing */ }
}
```

## Example (full)

```kotlin
val snackbarHostState = remember { SnackbarHostState() }
val scope = rememberCoroutineScope()

Scaffold(
    snackbarHost = { SnackbarHost(hostState = snackbarHostState) }
) { padding ->
    Column(modifier = Modifier.padding(padding).padding(16.dp)) {
        Button(text = "Delete item", variant = ButtonVariant.DestructiveOutlined, onClick = {
            scope.launch {
                val result = snackbarHostState.showSnackbar(
                    message = "Item deleted",
                    actionLabel = "Undo",
                    duration = SnackbarDuration.Long
                )
                if (result == SnackbarResult.ActionPerformed) {
                    // restore item
                }
            }
        })
    }
}
```

## Sample App Snippet (Android)

```kotlin
@Composable
fun SnackbarSample() {
    val snackbarHostState = remember { SnackbarHostState() }
    val scope = rememberCoroutineScope()
    var snackbarType by remember { mutableStateOf(SnackbarType.Primary) }
    var message by remember { mutableStateOf<SampleSnackbarMessage?>(null) }

    LaunchedEffect(message) {
        message?.let { msg ->
            snackbarHostState.showSnackbar(message = msg.text, actionLabel = msg.actionLabel, withDismissAction = msg.withDismissAction)
            message = null
        }
    }

    Scaffold(
        snackbarHost = {
            SnackbarHost(hostState = snackbarHostState) { data ->
                val containerColor = when (snackbarType) {
                    SnackbarType.Error -> AppTheme.colors.error
                    SnackbarType.Success -> AppTheme.colors.success
                    else -> AppTheme.colors.primary
                }
                Snackbar(snackbarData = data, containerColor = containerColor)
            }
        }
    ) { padding ->
        Column(modifier = Modifier.padding(padding).padding(16.dp), verticalArrangement = Arrangement.spacedBy(16.dp)) {

            // Type selector
            Row {
                listOf(SnackbarType.Primary, SnackbarType.Error, SnackbarType.Success).forEach { type ->
                    RadioButton(selected = snackbarType == type, onClick = { snackbarType = type }) {
                        Text(type.name, style = AppTheme.typography.body2)
                    }
                }
            }

            // Trigger buttons
            Button(modifier = Modifier.fillMaxWidth(), text = "Basic Snackbar", variant = ButtonVariant.PrimaryOutlined, onClick = {
                scope.launch { message = SampleSnackbarMessage("This is a snackbar message", withDismissAction = true) }
            })
            Button(modifier = Modifier.fillMaxWidth(), text = "With Action", variant = ButtonVariant.PrimaryOutlined, onClick = {
                scope.launch { message = SampleSnackbarMessage("Item deleted", actionLabel = "Undo") }
            })
            Button(modifier = Modifier.fillMaxWidth(), text = "Two-line Snackbar", variant = ButtonVariant.PrimaryOutlined, onClick = {
                scope.launch { message = SampleSnackbarMessage("This is a longer message that spans two lines.", withDismissAction = true) }
            })
        }
    }
}

enum class SnackbarType { Primary, Error, Success }
data class SampleSnackbarMessage(val text: String, val actionLabel: String? = null, val withDismissAction: Boolean = false)
```

## Sample App Snippet (Multiplatform)

> Same usage pattern as Android. Uses `<PackageName>.components.*` imports.
