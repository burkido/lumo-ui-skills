# Top Bar

**CLI**: `./gradlew lumo --add TopBar`  
**Docs**: https://www.lumoui.com/topbar

## Description

Screen-level app bar with title, navigation icon, and action icons. Supports
scroll-aware behaviors (pinned, enter-always, exit-until-collapsed) via
`TopBarScrollBehavior`. Goes in Scaffold's `topBar` slot.

## Scroll behaviors

| Behavior | Effect |
|----------|--------|
| None / `null` | Pinned — always visible |
| `TopBarDefaults.enterAlwaysScrollBehavior()` | Hides on scroll down, shows on scroll up |
| `TopBarDefaults.exitUntilCollapsedScrollBehavior()` | Collapses to small bar, never fully hides |
| `TopBarDefaults.pinnedScrollBehavior()` | Pinned with tonal color shift |

## Parameters

| Parameter | Type | Purpose |
|-----------|------|---------|
| `title` | `@Composable () -> Unit` | Title slot |
| `modifier` | `Modifier` | Standard |
| `navigationIcon` | `@Composable () -> Unit` | Leading icon (back, menu) |
| `actions` | `@Composable RowScope.() -> Unit` | Trailing action icons |
| `scrollBehavior` | `TopBarScrollBehavior?` | Scroll-aware animation |
| `colors` | `TopBarColors` | Via `TopBarDefaults.topBarColors()` |
| `windowInsets` | `WindowInsets` | For edge-to-edge |

## Example

```kotlin
// Pinned top bar
Scaffold(
    topBar = {
        TopBar(
            title = { Text("Home") },
            navigationIcon = {
                IconButton(
                    variant = IconButtonVariant.SecondaryGhost,
                    onClick = { navController.popBackStack() }
                ) {
                    Icon(Icons.Default.ArrowBack, contentDescription = "Back")
                }
            },
            actions = {
                IconButton(
                    variant = IconButtonVariant.SecondaryGhost,
                    onClick = { /* search */ }
                ) {
                    Icon(Icons.Default.Search, contentDescription = "Search")
                }
            }
        )
    }
) { padding -> /* content */ }
```

## Example with scroll behavior

```kotlin
// Hides on scroll down, reappears on scroll up
val scrollBehavior = TopBarDefaults.enterAlwaysScrollBehavior()

Scaffold(
    topBar = {
        TopBar(
            title = { Text("Feed") },
            scrollBehavior = scrollBehavior
        )
    },
    modifier = Modifier.nestedScroll(scrollBehavior.nestedScrollConnection)
) { padding ->
    LazyColumn(contentPadding = padding) {
        items(100) { index ->
            Text("Item $index", modifier = Modifier.padding(16.dp))
        }
    }
}
```

## Sample App Snippet (Android)

```kotlin
@Composable
fun TopBarSample(navigateUp: (() -> Unit)? = null) {
    val navController = rememberNavController()
    var topbarColor by remember { mutableStateOf(Color.Unspecified) }

    NavHost(navController = navController, startDestination = "initial") {
        composable("initial") {
            Scaffold(topBar = { SampleScreenTopBar(title = "TopBar Sample", onBack = { navigateUp?.invoke() }) }) { padding ->
                Column(modifier = Modifier.padding(padding).verticalScroll(rememberScrollState()).padding(horizontal = 16.dp, vertical = 60.dp)) {
                    Button(modifier = Modifier.fillMaxWidth(), text = "Example with insets", variant = ButtonVariant.PrimaryOutlined, onClick = { navController.navigate("with_insets") })
                    Spacer(Modifier.height(16.dp))
                    Button(modifier = Modifier.fillMaxWidth(), text = "Change color on scroll", variant = ButtonVariant.PrimaryOutlined, onClick = { navController.navigate("change_color") })
                    Spacer(Modifier.height(16.dp))
                    Button(modifier = Modifier.fillMaxWidth(), text = "Enter always scroll behavior", variant = ButtonVariant.PrimaryOutlined, onClick = { navController.navigate("enter_always") })
                    Spacer(Modifier.height(16.dp))
                    Button(modifier = Modifier.fillMaxWidth(), text = "Exit until collapsed", variant = ButtonVariant.PrimaryOutlined, onClick = { navController.navigate("exit_collapsed") })
                }
            }
        }

        // TopBar with custom content and insets
        composable("with_insets") {
            val containerColor = LocalColors.current.primary
            Scaffold(topBar = {
                TopBar(colors = TopBarColors(containerColor = containerColor, scrolledContainerColor = containerColor)) {
                    Box(modifier = Modifier.padding(horizontal = 16.dp)) {
                        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
                            Row(horizontalArrangement = Arrangement.spacedBy(12.dp), verticalAlignment = Alignment.CenterVertically) {
                                IconButton(variant = IconButtonVariant.Ghost, onClick = { navController.navigateUp() }) {
                                    Icon(imageVector = Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "back")
                                }
                                Text(text = "Hello.", style = AppTheme.typography.h3)
                            }
                            IconButton(variant = IconButtonVariant.Ghost) {
                                Icon(imageVector = Icons.Filled.MoreVert, contentDescription = "More options")
                            }
                        }
                    }
                }
            }) { padding -> LazyColumn(modifier = Modifier.padding(padding).padding(horizontal = 16.dp)) { items(30) { Spacer(Modifier.height(60.dp)) } } }
        }

        // TopBar that changes color on scroll
        composable("change_color") {
            val scrollBehavior = TopBarDefaults.pinnedScrollBehavior()
            val colors = LocalColors.current
            Scaffold(
                topBar = {
                    TopBar(scrollBehavior = scrollBehavior, colors = TopBarColors(containerColor = colors.background, scrolledContainerColor = colors.primary)) {
                        Box(modifier = Modifier.fillMaxWidth(), contentAlignment = Alignment.Center) {
                            Row(modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
                                IconButton(variant = IconButtonVariant.Ghost, onClick = { navController.navigateUp() }) { Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "back") }
                                IconButton(variant = IconButtonVariant.Ghost) { Icon(Icons.Filled.MoreVert, contentDescription = null) }
                            }
                            Text(text = "Hello.", style = AppTheme.typography.h3, textAlign = TextAlign.Center)
                        }
                    }
                }
            ) { padding -> LazyColumn(modifier = Modifier.fillMaxWidth().nestedScroll(scrollBehavior.nestedScrollConnection).padding(horizontal = 16.dp), contentPadding = padding) { items(30) { Spacer(Modifier.height(60.dp)) } } }
        }

        // Enter-always scroll behavior
        composable("enter_always") {
            val scrollBehavior = TopBarDefaults.enterAlwaysScrollBehavior()
            val containerColor = LocalColors.current.primary
            Scaffold(topBar = {
                TopBar(colors = TopBarColors(containerColor = containerColor, scrolledContainerColor = containerColor), scrollBehavior = scrollBehavior) {
                    Row(modifier = Modifier.padding(horizontal = 16.dp).fillMaxSize(), verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                        IconButton(variant = IconButtonVariant.Ghost, onClick = { navController.navigateUp() }) { Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "back") }
                        Text(text = "topbar", style = AppTheme.typography.h3)
                    }
                }
            }) { padding -> LazyColumn(modifier = Modifier.fillMaxWidth().nestedScroll(scrollBehavior.nestedScrollConnection).padding(horizontal = 16.dp), contentPadding = padding) { items(30) { Spacer(Modifier.height(60.dp)) } } }
        }
    }
}
```

## Sample App Snippet (Multiplatform)

> Same usage pattern as Android. Uses `com.nomanr.lumo.multiplatform.ui.components.topbar.*` imports.

## Important: nestedScroll

When using any scroll behavior other than `null`, you **must** add
`Modifier.nestedScroll(scrollBehavior.nestedScrollConnection)` to the `Scaffold`.
Without it, the bar won't respond to scroll events.
