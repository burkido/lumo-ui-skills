# Alert Dialog

**CLI**: `./gradlew lumo --add AlertDialog`  
**Docs**: https://www.lumoui.com/alert-dialog

## Description

Modal dialog for confirmations, alerts, and decisions. Two variants:
`AlertDialog` (pre-structured) and `BasicAlertDialog` (fully custom content).

## Variants

| Variant | Use case |
|---------|---------|
| `AlertDialog` | Standard layout: icon, title, text, confirm/dismiss buttons |
| `BasicAlertDialog` | Bring your own layout inside the dialog surface |

## Parameters — AlertDialog

| Parameter | Type | Purpose |
|-----------|------|---------|
| `onDismissRequest` | `() -> Unit` | Called when dismissed (back press, outside tap) |
| `onConfirmClick` | `() -> Unit` | Confirm button action |
| `title` | `String` | Dialog title (required) |
| `text` | `String` | Body message (required) |
| `confirmButtonText` | `String` | Label for confirm button (default `"OK"`) |
| `dismissButtonText` | `String?` | Label for dismiss button (default `"Cancel"`; `null` hides it) |
| `icon` | `(@Composable () -> Unit)?` | Optional icon above title |
| `content` | `(@Composable () -> Unit)?` | Extra content below the text, e.g. an input field |
| `shape`, `containerColor`, `iconContentColor`, `titleContentColor`, `textContentColor`, `elevation` | | Styling overrides |
| `properties` | `DialogProperties` | Dismiss behavior |

`AlertDialog` has no `modifier` parameter.

## Parameters — BasicAlertDialog

| Parameter | Type | Purpose |
|-----------|------|---------|
| `onDismissRequest` | `() -> Unit` | Called on dismiss |
| `content` | `@Composable () -> Unit` | Fully custom dialog content |
| `modifier` | `Modifier` | Standard |
| `properties` | `DialogProperties` | Dismiss behavior |

## Example

```kotlin
var showDialog by remember { mutableStateOf(false) }

Button(text = "Delete", onClick = { showDialog = true })

if (showDialog) {
    AlertDialog(
        onDismissRequest = { showDialog = false },
        onConfirmClick = {
            // perform delete
            showDialog = false
        },
        title = "Delete item?",
        text = "This action cannot be undone.",
        confirmButtonText = "Delete",
        dismissButtonText = "Cancel",
        icon = {
            Icon(Icons.Default.Warning, contentDescription = null)
        }
    )
}
```

## Sample App Snippet (Android)

```kotlin
@Composable
fun AlertDialogSample() {
    var showSimpleDialog by remember { mutableStateOf(false) }
    var showSingleButtonDialog by remember { mutableStateOf(false) }
    var showCustomIconDialog by remember { mutableStateOf(false) }
    var showInputDialog by remember { mutableStateOf(false) }
    var showCustomContentDialog by remember { mutableStateOf(false) }

    Column(
        modifier = Modifier.fillMaxWidth().verticalScroll(rememberScrollState()).padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp),
    ) {
        Button(modifier = Modifier.fillMaxWidth(), text = "Simple Dialog", variant = ButtonVariant.PrimaryOutlined, onClick = { showSimpleDialog = true })
        Button(modifier = Modifier.fillMaxWidth(), text = "Single Button Dialog", variant = ButtonVariant.PrimaryOutlined, onClick = { showSingleButtonDialog = true })
        Button(modifier = Modifier.fillMaxWidth(), text = "Custom Icon Dialog", variant = ButtonVariant.PrimaryOutlined, onClick = { showCustomIconDialog = true })
        Button(modifier = Modifier.fillMaxWidth(), text = "Input Dialog", variant = ButtonVariant.PrimaryOutlined, onClick = { showInputDialog = true })
        Button(modifier = Modifier.fillMaxWidth(), text = "Custom Content Dialog", variant = ButtonVariant.PrimaryOutlined, onClick = { showCustomContentDialog = true })
    }

    if (showSimpleDialog) {
        AlertDialog(
            onDismissRequest = { showSimpleDialog = false },
            onConfirmClick = { showSimpleDialog = false },
            title = "Simple Dialog",
            text = "This is a simple dialog with default confirm and dismiss buttons.",
            confirmButtonText = "OK",
            dismissButtonText = "Cancel",
        )
    }

    if (showSingleButtonDialog) {
        AlertDialog(
            onDismissRequest = { showSingleButtonDialog = false },
            onConfirmClick = { showSingleButtonDialog = false },
            title = "Information",
            text = "This dialog only has a confirm button.",
            confirmButtonText = "Got it",
            dismissButtonText = null,
        )
    }

    if (showCustomIconDialog) {
        AlertDialog(
            onDismissRequest = { showCustomIconDialog = false },
            onConfirmClick = { showCustomIconDialog = false },
            title = "Custom Icon",
            text = "This dialog features a custom icon.",
            confirmButtonText = "OK",
            dismissButtonText = "Cancel",
            icon = {
                Icon(modifier = Modifier.size(50.dp), imageVector = Icons.Default.Warning, contentDescription = "Warning")
            },
        )
    }

    if (showInputDialog) {
        var inputText by remember { mutableStateOf("") }
        BasicAlertDialog(onDismissRequest = { showInputDialog = false }) {
            Column(
                modifier = Modifier.background(AppTheme.colors.success).padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(16.dp),
            ) {
                Text("Enter your email", style = AppTheme.typography.h4)
                TextField(value = inputText, onValueChange = { inputText = it }, label = { Text("Email") },
                    leadingIcon = { Icon(Icons.Default.Email, contentDescription = "Email") },
                    placeholder = { Text("abc@xyz.com") })
                Button(text = "Submit", variant = ButtonVariant.Primary, onClick = { showInputDialog = false }, modifier = Modifier.fillMaxWidth())
            }
        }
    }

    if (showCustomContentDialog) {
        BasicAlertDialog(onDismissRequest = { showCustomContentDialog = false }) {
            Column(
                modifier = Modifier.background(AppTheme.colors.success).padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(16.dp),
            ) {
                CompositionLocalProvider(LocalContentColor provides AppTheme.colors.onPrimary) {
                    Text("Custom Content", style = AppTheme.typography.h4)
                    Text("This dialog allows for fully customizable content.")
                    Button(text = "Close", variant = ButtonVariant.Secondary, onClick = { showCustomContentDialog = false }, modifier = Modifier.fillMaxWidth())
                }
            }
        }
    }
}
```

## Sample App Snippet (Multiplatform)

> Same usage pattern as Android. Uses `<PackageName>.components.*` imports.
