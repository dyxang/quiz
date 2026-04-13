# Theme System Redesign Spec

## Why
当前主题设计（包括新粗野主义、极简留白、拟物复古）视觉表现较为丑陋，因为现有的主题插件配置项（Design Tokens）不够丰富，无法实现复杂的排版、阴影、背景及交互效果。此外，界面元素存在错乱（例如各视图的内外边距不统一），且 `QuizView` 中的语言切换和黑夜模式按钮与全局 `GlobalHeader` 中的按钮重复。

## What Changes
- **BREAKING**: 重构主题系统（`ThemeTokens`），引入更丰富的设计变量（如 `bg-surface`、`border-width`、`font-body`、`font-display`、`radius-sm`、`radius-md`、`radius-lg`、`transition-speed` 等）。
- 移除 `QuizView` (进度条右侧) 中重复的 `<LanguageToggle />` 和 `<ThemeToggle />`。
- 修复 `HomeView`、`QuizView`、`ResultView` 等页面的内外边距（padding/margin）和布局错乱问题，统一配合 `GlobalHeader`。
- 重新设计内置的三个主题（新粗野主义、极简留白、拟物复古），使用更具辨识度、更符合 `frontend-design` 审美标准的高级样式组合。

## Impact
- Affected specs: 主题插件接口 (`ThemeTokens` 定义)
- Affected code: 
  - `src/plugins/theme/index.ts` 及 `themes.ts`
  - `src/App.vue` (全局样式)
  - `src/views/*.vue` (页面布局修复)
  - `src/components/*.vue` (适配新的主题 Tokens)

## ADDED Requirements
### Requirement: Rich Design Tokens
The system SHALL provide extended design tokens including:
- Colors: `c-surface`, `c-border`, `c-text-primary`, `c-text-secondary`
- Typography: `font-display`, `font-body`
- Borders: `radius-sm`, `radius-md`, `radius-lg`, `border-width`
- Effects: `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-glow`

### Requirement: Distinctive Themes
The system SHALL implement three highly distinctive, production-grade themes using the rich tokens:
1. Neo Brutalism (新粗野主义): Bold typography, thick black borders, hard shadows, high contrast colors.
2. Minimalist Space (极简留白): Elegant serif/sans-serif pairing, generous whitespace, subtle blur/shadows, soft colors.
3. Retro Mac (拟物复古): Classic system fonts, inset 3D borders, pixelated details, classic gray/blue palette.

## MODIFIED Requirements
### Requirement: Layout & Duplicate Toggles
The UI SHALL NOT have duplicate language/dark mode toggles. GlobalHeader handles them exclusively. Page layouts SHALL NOT overlap with GlobalHeader and SHALL have consistent spacing.
