# Tasks

- [x] Task 1: 清理 UI 并修复重复的切换按钮
  - [x] SubTask 1.1: 移除 `QuizView.vue`（`ProgressBar` 右侧插槽）中重复的 `LanguageToggle` 和 `ThemeToggle` 组件。
  - [x] SubTask 1.2: 调整 `HomeView.vue`、`QuizView.vue` 和 `ResultView.vue` 的页面边距（margin/padding），确保与顶部的 `GlobalHeader` 布局协调一致且无遮挡。

- [x] Task 2: 扩展主题插件接口 (Design Tokens)
  - [x] SubTask 2.1: 更新 `src/plugins/theme/index.ts` 中的 `ThemeTokens` 接口，包含更丰富的变量（例如 `c-surface`、`c-text-primary`、`border-width`、`font-body`、`font-display`、`radius-sm`、`radius-md`、`radius-lg`、`shadow-glow`）。
  - [x] SubTask 2.2: 在 `src/App.vue`（全局 CSS）中为新 Tokens 设置合理的默认值（Fallback）。

- [x] Task 3: 重新设计内置主题 (应用 frontend-design 规范)
  - [x] SubTask 3.1: 重新设计 `themeNeoBrutalism`（新粗野主义）：粗黑边框、偏移的实体阴影、高对比度荧光色、等宽或粗黑体排版。
  - [x] SubTask 3.2: 重新设计 `themeMinimalistSpace`（极简留白）：优雅的衬线体与无衬线体搭配、极致的留白、柔和的弥散阴影和背景。
  - [x] SubTask 3.3: 重新设计 `themeRetroMac`（拟物复古）：经典的 90 年代系统字体、内嵌式 3D 边框、经典的灰蓝配色。

- [x] Task 4: 将新 Tokens 应用于全局组件
  - [x] SubTask 4.1: 修改 `QuizCard.vue`、`Question.vue`、`ProgressBar.vue` 和 `ResultCard.vue` 等组件，使其深度使用新的 CSS 变量（如 `bg-[rgb(var(--c-surface))]`、`border-[length:var(--border-width)]`、`rounded-[var(--radius-md)]` 等），替换硬编码的 Tailwind 类。
  - [x] SubTask 4.2: 确保标题元素使用 `font-display`，正文元素使用 `font-body`，并应用适当的过渡动画变量（`transition-speed`）。
