# OTP Text Field

**CLI**: `./gradlew lumo --add OTPTextField`  
**Docs**: https://www.lumoui.com/otp-textfield

## Description

One-time password input with individual digit cells. Three surface styles.
Auto-advances focus between cells. Supports error state and custom transforms.

## Variants

| Variant | Style |
|---------|-------|
| `OTPTextField` | Filled cells |
| `OutlinedOTPTextField` | Outlined cells |
| `UnderlinedOTPTextField` | Underline per cell |

## State

```kotlin
val otpState = rememberOtpState(length = 4)  // 4-digit OTP (adjust as needed)
```

`OTPState` exposes:
- `otpState.otp` — current string value
- `otpState.isComplete` — `true` when all cells filled

## Parameters

| Parameter | Type | Purpose |
|-----------|------|---------|
| `state` | `OTPState` | From `rememberOtpState()` |
| `onComplete` | `(String) -> Unit` | Called when all cells are filled |
| `modifier` | `Modifier` | Standard |
| `enabled` | `Boolean` | Enable/disable (default `true`) |
| `isError` | `Boolean` | Show error styling (default `false`) |
| `autoFocus` | `Boolean` | Auto-focus first cell on composition (default `true`) |
| `visualTransformation` | `VisualTransformation` | E.g. `PasswordVisualTransformation()` to mask digits |
| `colors` | `OTPTextFieldColors` | `OTPTextFieldDefaults.filledColors()`, `outlinedColors()` or `underlinedColors()` (default matches the variant) |

## Example

```kotlin
val otpState = rememberOtpState(length = 6)
var isError by remember { mutableStateOf(false) }

OutlinedOTPTextField(
    state = otpState,
    isError = isError,
    onComplete = { otp ->
        isError = otp != "123456"  // validate
    }
)

if (isError) {
    Text(
        "Invalid code. Try again.",
        color = AppTheme.colors.error,
        style = AppTheme.typography.label1
    )
}
```

## Sample App Snippet (Android)

```kotlin
@Composable
fun OTPTextFieldSample() {
    // Interactive demo with type/length/state toggles
    var otpFieldType by remember { mutableStateOf("OTPTextField") }
    var otpLength by remember { mutableIntStateOf(4) }
    var isError by remember { mutableStateOf(false) }
    var isDisabled by remember { mutableStateOf(false) }
    var isReadOnly by remember { mutableStateOf(false) }

    Column(modifier = Modifier.verticalScroll(rememberScrollState()).padding(16.dp).imePadding(), verticalArrangement = Arrangement.spacedBy(16.dp)) {

        // Render the selected OTP field type
        val otpState = rememberOtpState(otpLength)
        when (otpFieldType) {
            "OTPTextField" -> OTPTextField(state = otpState, isError = isError, enabled = !isDisabled, readOnly = isReadOnly, onComplete = {})
            "OutlinedOTPTextField" -> OutlinedOTPTextField(state = otpState, isError = isError, enabled = !isDisabled, readOnly = isReadOnly, onComplete = {})
            "UnderlinedOTPTextField" -> UnderlinedOTPTextField(state = otpState, isError = isError, enabled = !isDisabled, readOnly = isReadOnly, onComplete = {})
        }

        // Type selector
        FlowRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            listOf("OTPTextField", "OutlinedOTPTextField", "UnderlinedOTPTextField").forEach { type ->
                RadioButton(selected = otpFieldType == type, onClick = { otpFieldType = type }) {
                    Text(type.removePrefix("OTP").removeSuffix("TextField").ifEmpty { "Filled" }, style = AppTheme.typography.body2)
                }
            }
        }

        // Length selector
        FlowRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            listOf(4, 6, 8).forEach { length ->
                RadioButton(selected = otpLength == length, onClick = { otpLength = length }) {
                    Text("$length digits", style = AppTheme.typography.body2)
                }
            }
        }

        // Usage examples
        Text("Examples", style = AppTheme.typography.h4)
        Text("Enter the 4-digit code sent to your number", style = AppTheme.typography.body2)
        OTPTextField(state = rememberOtpState(4), onComplete = {})

        Text("Enter 6-digit verification code", style = AppTheme.typography.body2)
        OutlinedOTPTextField(state = rememberOtpState(6), onComplete = {})

        Text("Underlined style", style = AppTheme.typography.body2)
        UnderlinedOTPTextField(state = rememberOtpState(4), onComplete = {})
    }
}
```

## Sample App Snippet (Multiplatform)

> Same usage pattern as Android. Uses `<PackageName>.components.*` imports.
