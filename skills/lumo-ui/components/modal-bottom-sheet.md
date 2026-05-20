# Modal Bottom Sheet

**CLI**: `./gradlew lumo --add ModalBottomSheet`  
**Docs**: https://www.lumoui.com/modal-bottomsheet

## Description

Slide-up overlay sheet for contextual actions, pickers, and secondary flows.
Controlled via `SheetState` and an `isVisible` boolean.

## State

```kotlin
val sheetState = rememberModalBottomSheetState(
    skipPartiallyExpanded = true   // skip half-expanded, go directly to full
)
var isVisible by remember { mutableStateOf(false) }
```

## Parameters

| Parameter | Type | Purpose |
|-----------|------|---------|
| `isVisible` | `Boolean` | Show/hide the sheet |
| `onDismissRequest` | `() -> Unit` | Called on swipe-down or scrim tap |
| `sheetState` | `SheetState` | From `rememberModalBottomSheetState()` |
| `sheetGesturesEnabled` | `Boolean` | Allow drag-to-dismiss (default `true`) |
| `dragHandle` | `@Composable (() -> Unit)?` | Custom drag handle; use `null` to hide |
| `shape` | `Shape` | Sheet top corner shape |
| `containerColor` | `Color` | Sheet background |
| `scrimColor` | `Color` | Background scrim overlay color |
| `windowInsets` | `WindowInsets` | Insets for edge-to-edge |
| `modifier` | `Modifier` | Standard |
| `content` | `@Composable ColumnScope.() -> Unit` | Sheet body |

## Example

```kotlin
val sheetState = rememberModalBottomSheetState()
var showSheet by remember { mutableStateOf(false) }

Button(text = "Open Sheet", onClick = { showSheet = true })

if (showSheet) {
    ModalBottomSheet(
        isVisible = showSheet,
        onDismissRequest = { showSheet = false },
        sheetState = sheetState
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text("Sheet Title", style = AppTheme.typography.h3)
            Spacer(Modifier.height(8.dp))
            Text("Sheet content goes here.")
            Spacer(Modifier.height(24.dp))
            Button(
                text = "Close",
                modifier = Modifier.fillMaxWidth(),
                onClick = { showSheet = false }
            )
            Spacer(Modifier.height(16.dp))
        }
    }
}
```

## Sample App Snippet (Android)

```kotlin
@Composable
fun ModalBottomSheetSample() {
    var showSimpleSheet by remember { mutableStateOf(false) }
    var showScrollableSheet by remember { mutableStateOf(false) }
    var showCustomDragHandleSheet by remember { mutableStateOf(false) }
    var showProgressSheet by remember { mutableStateOf(false) }

    Column(modifier = Modifier.fillMaxWidth().verticalScroll(rememberScrollState()).padding(16.dp), verticalArrangement = Arrangement.spacedBy(16.dp)) {
        Button(modifier = Modifier.fillMaxWidth(), text = "Simple Bottom Sheet", variant = ButtonVariant.PrimaryOutlined, onClick = { showSimpleSheet = true })
        Button(modifier = Modifier.fillMaxWidth(), text = "Scrollable Content", variant = ButtonVariant.PrimaryOutlined, onClick = { showScrollableSheet = true })
        Button(modifier = Modifier.fillMaxWidth(), text = "Custom Handle", variant = ButtonVariant.PrimaryOutlined, onClick = { showCustomDragHandleSheet = true })
        Button(modifier = Modifier.fillMaxWidth(), text = "Sheet Progress", variant = ButtonVariant.PrimaryOutlined, onClick = { showProgressSheet = true })
    }

    // Simple sheet
    ModalBottomSheet(isVisible = showSimpleSheet, onDismissRequest = { showSimpleSheet = false }) {
        Column(modifier = Modifier.fillMaxWidth().padding(16.dp), verticalArrangement = Arrangement.spacedBy(16.dp)) {
            Text("This is a simple bottom sheet.", style = AppTheme.typography.h4)
            Button(text = "Close", variant = ButtonVariant.Primary, onClick = { showSimpleSheet = false }, modifier = Modifier.fillMaxWidth())
        }
    }

    // Scrollable content sheet
    ModalBottomSheet(modifier = Modifier.padding(top = 100.dp), isVisible = showScrollableSheet, onDismissRequest = { showScrollableSheet = false }) {
        Column(modifier = Modifier.fillMaxWidth().padding(16.dp).verticalScroll(rememberScrollState()), verticalArrangement = Arrangement.spacedBy(8.dp)) {
            repeat(30) { Skeleton(modifier = Modifier.fillMaxWidth().height(30.dp)) }
            Button(text = "Close", variant = ButtonVariant.Primary, onClick = { showScrollableSheet = false }, modifier = Modifier.fillMaxWidth())
        }
    }

    // Sheet with custom drag handle and progress tracking
    val sheetState = rememberModalBottomSheetState()
    val sheetProgress = sheetState.calculateSheetProgress()

    ModalBottomSheet(
        sheetState = sheetState,
        isVisible = showProgressSheet,
        onDismissRequest = { showProgressSheet = false },
        dragHandle = {
            // Animate drag handle width based on sheet progress
            Box(
                modifier = Modifier.width(100.dp).padding(12.dp).height(6.dp).clip(RoundedCornerShape(50)).background(AppTheme.colors.secondary),
            ) {
                Box(modifier = Modifier.fillMaxWidth(sheetProgress).height(6.dp).clip(RoundedCornerShape(50)).background(AppTheme.colors.primary))
            }
        },
    ) {
        Column(modifier = Modifier.fillMaxWidth().padding(16.dp)) {
            Text("Progress: $sheetProgress", style = AppTheme.typography.body2)
            repeat(50) { Skeleton(modifier = Modifier.fillMaxWidth().height(30.dp).padding(vertical = 4.dp)) }
        }
    }
}
```

## Sample App Snippet (Multiplatform)

> Same usage pattern as Android. Uses `com.nomanr.lumo.multiplatform.ui.components.*` imports.

## Note on dismiss animation

To animate dismiss, use `scope.launch { sheetState.hide() }` before setting
`isVisible = false`, otherwise the sheet disappears instantly:
```kotlin
val scope = rememberCoroutineScope()

Button(text = "Close", onClick = {
    scope.launch { sheetState.hide() }.invokeOnCompletion {
        showSheet = false
    }
})
```
