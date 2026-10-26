# Scaffold

**CLI**: `./gradlew lumo --add Scaffold`  
**Docs**: https://www.lumoui.com/scaffold

## Description

Full-screen layout structure that coordinates top bar, bottom bar, FAB,
snackbar, and main content with proper padding and inset handling.

## Parameters

| Parameter | Type | Purpose |
|-----------|------|---------|
| `topBar` | `@Composable () -> Unit` | Slot for `TopBar` |
| `bottomBar` | `@Composable () -> Unit` | Slot for `NavigationBar` |
| `snackbarHost` | `@Composable () -> Unit` | Slot for `SnackbarHost` |
| `floatingActionButton` | `@Composable () -> Unit` | FAB slot |
| `floatingActionButtonPosition` | `FabPosition` | `FabPosition.End` (default) or `Center` |
| `containerColor` | `Color` | Screen background color |
| `contentColor` | `Color` | Default content color |
| `contentWindowInsets` | `WindowInsets` | Override insets for edge-to-edge |
| `modifier` | `Modifier` | Standard |
| `content` | `@Composable (PaddingValues) -> Unit` | Main content — **must apply padding** |

## Example

```kotlin
val snackbarHostState = remember { SnackbarHostState() }
val scope = rememberCoroutineScope()

Scaffold(
    topBar = {
        TopBar { Text(text = "My Screen", style = AppTheme.typography.h3) }
    },
    bottomBar = {
        NavigationBar { /* items */ }
    },
    snackbarHost = {
        SnackbarHost(hostState = snackbarHostState)
    },
    floatingActionButton = {
        IconButton(
            shape = IconButtonDefaults.ButtonCircleShape,
            onClick = { scope.launch { snackbarHostState.showSnackbar("Created!") } }
        ) {
            Icon(Icons.Default.Add, contentDescription = "Add")
        }
    }
) { paddingValues ->
    // IMPORTANT: always consume paddingValues
    LazyColumn(contentPadding = paddingValues) {
        items(100) { Text("Item $it", modifier = Modifier.padding(16.dp)) }
    }
}
```

## Sample App Snippet (Android)

```kotlin
@Composable
fun ScaffoldSample() {
    val snackbarHostState = remember { SnackbarHostState() }
    val scope = rememberCoroutineScope()
    var selectedScreen by remember { mutableStateOf("Home") }
    var snackBarMessage by remember { mutableStateOf<String?>(null) }

    LaunchedEffect(snackBarMessage) {
        snackBarMessage?.let {
            snackbarHostState.showSnackbar(it)
            snackBarMessage = null
        }
    }

    Scaffold(
        topBar = {
            TopBar { Box(modifier = Modifier.padding(horizontal = 16.dp)) { Text("Scaffold Sample", style = AppTheme.typography.h3) } }
        },
        bottomBar = {
            Column {
                HorizontalDivider()
                NavigationBar {
                    listOf("Home" to Icons.Default.Home, "Search" to Icons.Default.Search, "Profile" to Icons.Default.Person).forEach { (label, icon) ->
                        NavigationBarItem(
                            selected = selectedScreen == label,
                            onClick = { selectedScreen = label },
                            icon = { Icon(icon, contentDescription = label) },
                            label = { Text(label) },
                        )
                    }
                }
            }
        },
        snackbarHost = { SnackbarHost(hostState = snackbarHostState) },
        floatingActionButton = {
            IconButton(shape = CircleShape, variant = IconButtonVariant.Primary, onClick = {
                scope.launch { snackbarHostState.showSnackbar("FAB clicked!") }
            }) {
                Icon(Icons.Default.Add, contentDescription = "Add")
            }
        },
    ) { padding ->
        Column(modifier = Modifier.padding(padding).padding(horizontal = 16.dp).verticalScroll(rememberScrollState())) {
            Spacer(modifier = Modifier.height(16.dp))
            Text("Current screen: $selectedScreen", style = AppTheme.typography.body1)
            Spacer(modifier = Modifier.height(16.dp))
            repeat(5) { Skeleton(modifier = Modifier.fillMaxWidth().height(60.dp).padding(vertical = 4.dp)) }
        }
    }
}
```

## Sample App Snippet (Multiplatform)

> Same usage pattern as Android. Uses `<PackageName>.components.*` imports.

## Important: always use padding

Forgetting to apply `paddingValues` from `content` is the most common mistake.
Content will render behind the top/bottom bar without it.
