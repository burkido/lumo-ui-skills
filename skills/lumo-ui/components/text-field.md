# Text Field

**CLI**: `./gradlew lumo --add TextField`  
**Docs**: https://www.lumoui.com/textfield

## Description

Full-featured text input with three surface styles. Supports labels,
placeholders, leading/trailing icons, error state, and keyboard options.

## Variants

| Variant | Style |
|---------|-------|
| `TextField` | Filled background |
| `OutlinedTextField` | Outlined border |
| `UnderlinedTextField` | Bottom border only |

## Parameters (all variants share these)

| Parameter | Type | Purpose |
|-----------|------|---------|
| `value` | `String` | Current input value |
| `onValueChange` | `(String) -> Unit` | Text change callback |
| `modifier` | `Modifier` | Standard |
| `enabled` | `Boolean` | Enable/disable (default `true`) |
| `readOnly` | `Boolean` | Display-only, not editable |
| `label` | `@Composable (() -> Unit)?` | Floating label |
| `placeholder` | `@Composable (() -> Unit)?` | Hint text when empty |
| `leadingIcon` | `@Composable (() -> Unit)?` | Icon before input |
| `trailingIcon` | `@Composable (() -> Unit)?` | Icon after input (e.g. clear, visibility) |
| `supportingText` | `@Composable (() -> Unit)?` | Helper / error text below |
| `isError` | `Boolean` | Show error styling (default `false`) |
| `singleLine` | `Boolean` | Single vs multiline (default `false`) |
| `maxLines` | `Int` | Max visible lines |
| `keyboardOptions` | `KeyboardOptions` | Keyboard type, IME action |
| `keyboardActions` | `KeyboardActions` | IME action callbacks |
| `colors` | `TextFieldColors` | Via `TextFieldDefaults.colors()` |

## Example

```kotlin
// Email field with validation
var email by remember { mutableStateOf("") }
val isError = email.isNotEmpty() && !email.contains("@")

OutlinedTextField(
    value = email,
    onValueChange = { email = it },
    label = { Text("Email") },
    placeholder = { Text("name@example.com") },
    leadingIcon = { Icon(Icons.Default.Email, contentDescription = null) },
    trailingIcon = if (email.isNotEmpty()) {
        { IconButton(onClick = { email = "" }) { Icon(Icons.Default.Clear, null) } }
    } else null,
    supportingText = if (isError) {
        { Text("Enter a valid email address") }
    } else null,
    isError = isError,
    singleLine = true,
    keyboardOptions = KeyboardOptions(
        keyboardType = KeyboardType.Email,
        imeAction = ImeAction.Next
    ),
    modifier = Modifier.fillMaxWidth()
)
```

## Sample App Snippet (Android)

```kotlin
@Composable
fun TextFieldSample() {
    Column(modifier = Modifier.verticalScroll(rememberScrollState()).fillMaxWidth().padding(16.dp).imePadding()) {

        // Interactive demo with toggles
        var textFieldType by remember { mutableStateOf("TextField") }
        var phone by remember { mutableStateOf("") }
        var supportingTextEnabled by remember { mutableStateOf(false) }
        var leadingIconEnabled by remember { mutableStateOf(false) }
        var trailingIconEnabled by remember { mutableStateOf(false) }
        var errorEnabled by remember { mutableStateOf(false) }

        Text("TextField Demo", style = AppTheme.typography.h4)
        // Render selected TextField type
        when (textFieldType) {
            "TextField" -> TextField(value = phone, onValueChange = { if (it.all { c -> c.isDigit() }) phone = it }, modifier = Modifier.fillMaxWidth(),
                label = { Text("Phone") }, placeholder = { Text("Enter your phone number") },
                supportingText = if (supportingTextEnabled) { { Text("Enter your phone number") } } else null,
                leadingIcon = if (leadingIconEnabled) { { Icon(Icons.Filled.Phone, contentDescription = null) } } else null,
                trailingIcon = if (trailingIconEnabled) { { Icon(if (phone.length >= 10) Icons.Outlined.Check else Icons.Outlined.Close, contentDescription = null) } } else null,
                isError = errorEnabled, maxLines = 1, keyboardOptions = KeyboardOptions.Default.copy(keyboardType = KeyboardType.Number))
            "OutlinedTextField" -> OutlinedTextField(value = phone, onValueChange = { if (it.all { c -> c.isDigit() }) phone = it }, modifier = Modifier.fillMaxWidth(),
                label = { Text("Phone") }, placeholder = { Text("Enter your phone number") }, maxLines = 1,
                keyboardOptions = KeyboardOptions.Default.copy(keyboardType = KeyboardType.Number))
            "UnderlinedTextField" -> UnderlinedTextField(value = phone, onValueChange = { if (it.all { c -> c.isDigit() }) phone = it }, modifier = Modifier.fillMaxWidth(),
                label = { Text("Phone") }, placeholder = { Text("Enter your phone number") }, maxLines = 1,
                keyboardOptions = KeyboardOptions.Default.copy(keyboardType = KeyboardType.Number))
        }

        // Type selector
        FlowRow(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            RadioButton(selected = textFieldType == "TextField", onClick = { textFieldType = "TextField" }) { Text("Filled") }
            RadioButton(selected = textFieldType == "OutlinedTextField", onClick = { textFieldType = "OutlinedTextField" }) { Text("Outlined") }
            RadioButton(selected = textFieldType == "UnderlinedTextField", onClick = { textFieldType = "UnderlinedTextField" }) { Text("Underlined") }
        }

        Spacer(modifier = Modifier.height(32.dp))

        // Example variations
        var phone2 by remember { mutableStateOf("") }
        Text("With supporting text", style = AppTheme.typography.h4)
        OutlinedTextField(value = phone2, onValueChange = { phone2 = it }, modifier = Modifier.fillMaxWidth(),
            label = { Text("Phone") }, supportingText = { Text("Enter your phone number") },
            placeholder = { Text("000-000-0000") }, maxLines = 1,
            keyboardOptions = KeyboardOptions.Default.copy(keyboardType = KeyboardType.Number))

        var phone3 by remember { mutableStateOf("") }
        Text("With prefix and suffix", style = AppTheme.typography.h4)
        TextField(value = phone3, onValueChange = { phone3 = it }, modifier = Modifier.fillMaxWidth(),
            label = { Text("Phone") }, prefix = { Text("+44") },
            suffix = { Text("${phone3.length}/10", style = AppTheme.typography.label3) },
            placeholder = { Text("000-000-0000") }, maxLines = 1,
            keyboardOptions = KeyboardOptions.Default.copy(keyboardType = KeyboardType.Number))

        var phone4 by remember { mutableStateOf("") }
        Text("With leading and trailing icons + error state", style = AppTheme.typography.h4)
        TextField(value = phone4, onValueChange = { phone4 = it }, modifier = Modifier.fillMaxWidth(),
            label = { Text("Phone") },
            leadingIcon = { Icon(Icons.Filled.Phone, contentDescription = null) },
            trailingIcon = { Icon(if (phone4.length >= 10) Icons.Outlined.Check else Icons.Outlined.Close, contentDescription = null,
                tint = if (phone4.length >= 10) Color.Green else Color.Red) },
            isError = phone4.length < 10 && phone4.isNotEmpty(), maxLines = 1,
            keyboardOptions = KeyboardOptions.Default.copy(keyboardType = KeyboardType.Number))

        // Date of birth — three fields
        var day by remember { mutableStateOf("") }
        var month by remember { mutableStateOf("") }
        var year by remember { mutableStateOf("") }
        Text("Date of birth", style = AppTheme.typography.h4)
        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            OutlinedTextField(modifier = Modifier.weight(1f), value = day, onValueChange = { day = it }, label = { Text("Day") },
                placeholder = { Text("DD") }, supportingText = { Text("DD") }, keyboardOptions = KeyboardOptions.Default.copy(keyboardType = KeyboardType.Number))
            OutlinedTextField(modifier = Modifier.weight(1f), value = month, onValueChange = { month = it }, label = { Text("Month") },
                placeholder = { Text("MM") }, supportingText = { Text("MM") }, keyboardOptions = KeyboardOptions.Default.copy(keyboardType = KeyboardType.Number))
            OutlinedTextField(modifier = Modifier.weight(1f), value = year, onValueChange = { year = it }, label = { Text("Year") },
                placeholder = { Text("YYYY") }, supportingText = { Text("YYYY") }, keyboardOptions = KeyboardOptions.Default.copy(keyboardType = KeyboardType.Number))
        }
    }
}
```

## Sample App Snippet (Multiplatform)

> Same usage pattern as Android. Uses `<PackageName>.components.textfield.*` imports.
