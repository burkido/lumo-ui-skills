# Component Name

<!-- Copy this file to components/<kebab-name>.md, add a row to the component index in
SKILL.md, and delete these comments. Take every name below from the plugin template
(lumo-ui/plugin/src/main/resources/templates/android/components/), not from Material3:
scripts/check-upstream.mjs fails CI on parameters, enum values and Defaults members
that the template doesn't have. -->

**CLI**: `./gradlew lumo --add ComponentName`  
**Docs**: https://www.lumoui.com/slug

## Description

What the component is for and when to pick it over similar components. Mention the
generated package if it isn't `components` (e.g. `components.topbar`).

## Variants

| Variant | Use case |
|---------|----------|
| `ComponentName` | Default style |

## Parameters

| Parameter | Type | Purpose |
|-----------|------|---------|
| `modifier` | `Modifier` | Standard |
| `content` | `@Composable () -> Unit` | Copy the type exactly as the template declares it |

If a Material3 parameter is missing here (colors, shape, ...), say where it's set in the
generated file instead, so agents edit that file rather than invent the parameter.

## Example

```kotlin
// The smallest realistic usage, with named arguments.
```

## Sample App Snippet (Android)

```kotlin
// Optional: adapted from lumo-ui's sample-android catalogue.
```

## Sample App Snippet (Multiplatform)

> Same usage pattern as Android. Uses `<PackageName>.components.*` imports.
