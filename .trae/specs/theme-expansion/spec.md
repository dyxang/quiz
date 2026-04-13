# Theme System Expansion Spec

## Why
现有主题系统的自定义能力有限，无法支持进度条样式的深度定制（如彩虹、动态海浪）、无法灵活替换特定组件的字体（如非商用中文古字或更现代的字体）、无法根据主题自定义全局的 Logo 文本（如 QUIZLIGHT）以及页脚（Footer）的内容与样式。同时，需要引入更具代表性和设计感的内置主题：Notion、Dracula 和 Github，来展示框架的定制潜力。

## What Changes
- **BREAKING**: 扩展 `ThemeTokens` 接口，增加对 Logo 文本/字体、页脚内容/样式、进度条背景/动画样式的支持。
- **BREAKING**: 移除原有的三个内置主题，重写为 `Notion`、`Dracula` 和 `Github` 三大经典配色与排版风格主题。
- 更新 `GlobalHeader.vue`，使其 Logo 文本可通过 CSS 变量动态注入（如使用 `::before` 和 `content: var(--logo-text)`）。
- 新增 `GlobalFooter.vue` 组件，支持多主题内容定制。
- 更新 `ProgressBar.vue`，支持复杂的背景变量和动画变量（如渐变、海浪动画等）。
- 更新工作流文件 `AGENTS.md` 和 `LIST.md`，并在完成后执行 `git gc` 和打包，最后将所有变更提交到 `main` 分支。

## Impact
- Affected specs: 主题插件接口 (`ThemeTokens` 定义)
- Affected code: 
  - `src/plugins/theme/index.ts` 及 `themes.ts`
  - `src/App.vue` (全局样式与默认值，增加全局页脚)
  - `src/components/GlobalHeader.vue`
  - `src/components/ProgressBar.vue`
  - `src/components/GlobalFooter.vue` (新建)
  - 工作流文档与 Git 历史

## ADDED Requirements
### Requirement: Component-Specific Customization
The system SHALL provide specific tokens for:
- `logo-text`: 全局 Logo 文字内容（如 `'QUIZLIGHT'`）
- `logo-font`: 全局 Logo 的特殊字体
- `footer-text`: 页脚的文本内容
- `progress-bg`: 进度条的背景填充样式（支持渐变、纯色）
- `progress-animation`: 进度条的动态效果（如波浪、闪烁等）

### Requirement: Classic Themes
The system SHALL implement three distinctive themes:
1. Notion: 极致黑白、优雅的 Serif 衬线体标题、清晰的层次、类似笔记的排版体验。
2. Dracula: 著名的吸血鬼暗黑配色（紫、粉、绿、黄等高对比度霓虹色），进度条和 Logo 支持彩色动态效果。
3. Github: 经典的蓝白灰（Light）与深灰蓝（Dark）配色，程序员熟悉的等宽字体与严谨的边框设计。

## MODIFIED Requirements
### Requirement: Workflow & CI/CD
变更完成后，系统 SHALL 验证主题变更实际生效，更新 `AGENTS.md` 和 `LIST.md`，并在提交到 `main` 之前运行 `git gc` 清理冗余对象，并执行 `pnpm build`（或 `npm run build`）确保打包无误。