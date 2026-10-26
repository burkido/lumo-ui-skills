# Accordion

**CLI**: `./gradlew lumo --add Accordion`  
**Docs**: https://www.lumoui.com/accordion

## Description

Expandable/collapsible content panels. Supports single accordion or grouped
accordions with optional single-open enforcement.

## Variants

| Variant | How |
|---------|-----|
| Basic | Single `Accordion` with its own `AccordionState` |
| Grouped | Multiple accordions sharing `AccordionGroupState` |

## State

```kotlin
// Single accordion
val state = rememberAccordionState()

// Group — enforce only one open at a time
val groupState = rememberAccordionGroupState(
    count = 3,
    allowMultipleOpen = false
)
val itemState = groupState.accordionStates[index]
```

State methods:
- `state.toggle()`
- `state.collapse()`
- `state.expand()`
- `groupState.collapseAll()`

## Parameters

| Parameter | Type | Purpose |
|-----------|------|---------|
| `state` | `AccordionState` | Controls open/closed |
| `headerContent` | `@Composable () -> Unit` | Always-visible header |
| `bodyContent` | `@Composable () -> Unit` | Revealed content |
| `animate` | `Boolean` | Animate expand/collapse (default `true`) |
| `modifier` | `Modifier` | Standard |

## Example

```kotlin
val state = rememberAccordionState()

Accordion(
    state = state,
    headerContent = {
        Text("Section Title", style = AppTheme.typography.body1)
    },
    bodyContent = {
        Text("Expanded content goes here.", modifier = Modifier.padding(16.dp))
    }
)
```

## Sample App Snippet (Android)

```kotlin
// ExpandClickingHeader — clicking the header toggles expand/collapse
ElevatedCard {
    Accordion(headerContent = {
        Row(
            modifier = Modifier.fillMaxWidth().padding(16.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically,
        ) {
            Text("Click the header to expand and collapse", style = AppTheme.typography.body1)
            Icon(imageVector = Icons.Outlined.KeyboardArrowDown, contentDescription = "Expand")
        }
    }, bodyContent = {
        HorizontalDivider()
        Column(modifier = Modifier.fillMaxWidth().padding(16.dp), verticalArrangement = Arrangement.spacedBy(16.dp)) {
            Skeleton(modifier = Modifier.fillMaxWidth().height(50.dp))
            Skeleton(modifier = Modifier.fillMaxWidth().height(50.dp))
        }
    })
}

// AnimateArrowWithExpandCollapse — arrow rotates with animation progress
val state = rememberAccordionState(clickable = false)

ElevatedCard {
    Accordion(state = state, headerContent = {
        Row(
            modifier = Modifier.fillMaxWidth().padding(16.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically,
        ) {
            Text("Animate the button with accordion transitions", style = AppTheme.typography.body1)
            IconButton(variant = IconButtonVariant.Ghost, onClick = { state.toggle() }) {
                Icon(
                    modifier = Modifier.rotate(state.animationProgress * 180),
                    imageVector = Icons.Outlined.KeyboardArrowDown,
                    contentDescription = "Expand",
                )
            }
        }
    }, bodyContent = {
        HorizontalDivider()
        Column(modifier = Modifier.fillMaxWidth().padding(16.dp), verticalArrangement = Arrangement.spacedBy(16.dp)) {
            Skeleton(modifier = Modifier.fillMaxWidth().height(50.dp))
        }
    })
}

// OnlyOneShouldOpenAtATime — grouped accordions
val accordionGroupState = rememberAccordionGroupState(count = 3)

Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
    listOf("Question 1", "Question 2", "Question 3").forEachIndexed { index, text ->
        val itemState = accordionGroupState.getState(index)
        ElevatedCard {
            Accordion(state = itemState, headerContent = {
                Row(
                    modifier = Modifier.fillMaxWidth().padding(16.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically,
                ) {
                    Text(text, style = AppTheme.typography.body1)
                    Icon(
                        modifier = Modifier.rotate(itemState.animationProgress * 180),
                        imageVector = Icons.Outlined.KeyboardArrowDown,
                        contentDescription = "Expand",
                    )
                }
            }, bodyContent = {
                HorizontalDivider()
                Column(modifier = Modifier.fillMaxWidth().padding(16.dp)) {
                    Text("Answer content for $text", style = AppTheme.typography.body1)
                }
            })
        }
    }
}
```

## Sample App Snippet (Multiplatform)

```kotlin
// Same pattern — uses <PackageName>.components.* imports
// ExpandClickingHeader
ElevatedCard {
    Accordion(headerContent = {
        Row(
            modifier = Modifier.fillMaxWidth().padding(16.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically,
        ) {
            Text("Click the header to expand and collapse", style = AppTheme.typography.body1)
            Icon(imageVector = Icons.Outlined.KeyboardArrowDown, contentDescription = "Expand")
        }
    }, bodyContent = {
        HorizontalDivider()
        Column(modifier = Modifier.fillMaxWidth().padding(16.dp), verticalArrangement = Arrangement.spacedBy(16.dp)) {
            Skeleton(modifier = Modifier.fillMaxWidth().height(50.dp))
        }
    })
}

// OnlyOneShouldOpenAtATime
val accordionGroupState = rememberAccordionGroupState(count = accordionTexts.size)

accordionTexts.forEachIndexed { index, text ->
    val state = accordionGroupState.getState(index)
    ElevatedCard {
        Accordion(state = state, headerContent = {
            Row(
                modifier = Modifier.fillMaxWidth().padding(16.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically,
            ) {
                Text(text.first, style = AppTheme.typography.body1)
                Icon(
                    modifier = Modifier.rotate(state.animationProgress * 180),
                    imageVector = Icons.Outlined.KeyboardArrowDown,
                    contentDescription = "Expand",
                )
            }
        }, bodyContent = {
            HorizontalDivider()
            Column(modifier = Modifier.fillMaxWidth().padding(16.dp)) {
                Text(text.second, style = AppTheme.typography.body1)
            }
        })
    }
}
```
