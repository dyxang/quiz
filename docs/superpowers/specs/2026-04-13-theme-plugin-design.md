# Theme Plugin System Design Spec

## 1. Overview
Introduce a theme system for QuizLight based on the existing plugin architecture. 
The themes will provide alternative visual styles (Plain Draft, Graphite Calm, Monochrome Sharp) and will be applied on a per-quiz basis to ensure an immersive experience. The theme is specified entirely by the quiz JSON data.

## 2. Architecture & Data Flow

### 2.1 Schema Extension
To allow quizzes to specify their theme, the `quizSchema` in `src/core/schema.ts` will be extended with an optional `themeId` field.
```typescript
themeId: z.string().optional(),
```

### 2.2 Theme Plugin Definition
A new plugin `ThemeManagerPlugin` will be created. It implements the `QuizPlugin` interface.
- It registers available themes (the 3 default themes).
- It hooks into `onQuizLoad(quizData)` to read `quizData.themeId`.
- If `themeId` is present and valid, it applies the theme's CSS variables to the document root (or a specific wrapper).
- If `themeId` is missing or invalid, it falls back to the default theme (no extra variables applied, or reset to base).
- When exiting the quiz (e.g., returning to home), the theme should be cleaned up. Since the plugin system currently lacks an `onQuizUnload` hook, we will manage cleanup within the `QuizView.vue` and `ResultView.vue` lifecycle hooks (`onUnmounted`), or by extending the `QuizEngine` with a `reset`/`unload` mechanism.

### 2.3 CSS Variables & UnoCSS Integration
Currently, `primary` and `muted` colors in `uno.config.ts` are hardcoded hex values. To allow themes to override them, we will update `uno.config.ts` to use CSS variables for these colors, similar to how grayscale colors are handled.

```typescript
// uno.config.ts snippet
primary: {
  DEFAULT: 'rgba(var(--c-primary), %alpha)',
  light: 'rgba(var(--c-primary-light), %alpha)',
  dark: 'rgba(var(--c-primary-dark), %alpha)',
},
muted: 'rgba(var(--c-muted), %alpha)',
```

The base `App.vue` will define these default variables:
```css
:root {
  --c-primary: 99, 102, 241; /* #6366f1 */
  /* ... */
}
```

### 2.4 Theme Tokens
Each theme will define a set of CSS variable overrides (both light and dark modes).

#### Theme 1: Plain Draft (无印草稿纸)
- **Vibe:** Minimalist, straight lines, almost no shadows, cold white background, restrained accent colors.
- **Tokens:** High lightness background, very subtle borders, desaturated primary (e.g., slate/cool gray), sharp corners (`--radius: 0`).

#### Theme 2: Graphite Calm (自然石墨)
- **Vibe:** Low saturation dark gray with blue-gray accents. Quiet and rational.
- **Tokens:** Background is light gray/off-white (in light mode) or deep graphite (in dark mode). Primary is a calm steel blue or slate.

#### Theme 3: Monochrome Sharp (黑白硬边)
- **Vibe:** High contrast black and white, sharp edges, hard shadows. Cold and clean.
- **Tokens:** Pure white and pure black. Primary is black (or white in dark mode). Hard borders, no border radius.

## 3. Implementation Steps
1. **Update UnoCSS & App.vue:** Refactor `primary` and `muted` colors to use CSS variables.
2. **Update Schema:** Add `themeId` to `QuizSchema`.
3. **Create Themes:** Define the CSS variables for the 3 new themes.
4. **Create Theme Plugin:** Implement the `ThemeManagerPlugin` with `onQuizLoad` hook to apply the theme.
5. **Apply/Cleanup Logic:** Ensure the theme is applied when entering a quiz and removed when leaving (e.g., returning to home).
6. **Update Mocks:** Add `themeId` to some mock quizzes to test the themes.

## 4. Testing Strategy
- Verify that opening a quiz with a specific `themeId` correctly updates the CSS variables and UI colors.
- Verify that leaving the quiz resets the theme to the global default.
- Verify that dark mode toggling still works correctly within the applied theme.
