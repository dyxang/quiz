# Tasks
- [x] Task 1: 进度保存 (localStorage)
  - [x] SubTask 1.1: 在 `useQuizState.ts` 中实现答题进度的实时保存逻辑。
  - [x] SubTask 1.2: 在进入答题页 (`QuizView.vue`) 时，检查 localStorage 并恢复未完成的答题记录，而不是重新开始。
- [x] Task 2: 深色模式
  - [x] SubTask 2.1: 在 CSS 中配置深色模式的变量（如 `--bg`, `--fg`, `--border` 的暗色值），响应系统偏好 (`prefers-color-scheme`)。
  - [x] SubTask 2.2: 提供手动切换深浅模式的状态和控件，并在页面（如 `HomeView.vue` 和 答题页顶部）添加切换按钮。
- [x] Task 3: 多语言 (i18n)
  - [x] SubTask 3.1: 实现轻量级的多语言 composable，或引入 `vue-i18n`。
  - [x] SubTask 3.2: 提取应用中的硬编码中文（如按钮文案、提示信息），并提供中英双语词典支持。
  - [x] SubTask 3.3: 在界面头部区域添加语言切换控件。
- [x] Task 4: PWA 离线支持
  - [x] SubTask 4.1: 安装并在 `vite.config.ts` 中引入 `vite-plugin-pwa`。
  - [x] SubTask 4.2: 配置 Service Worker 的缓存策略，确保核心资源及 JSON 题库可以被缓存。
  - [x] SubTask 4.3: 添加 PWA 离线状态和更新提示逻辑。
- [x] Task 5: 插件扩展系统
  - [x] SubTask 5.1: 在 `src/core/types.ts` 定义插件接口 (Plugin API)，支持自定义题型渲染器、结果渲染器、计分策略及生命周期钩子。
  - [x] SubTask 5.2: 在 `QuizEngine` 中实现插件注册与执行逻辑 (`QuizLight.use(plugin)` 机制)。
  - [x] SubTask 5.3: 重构题目渲染组件 (`Question.vue`) 和 结果渲染组件 (`ResultCard.vue`)，支持通过插件提供自定义渲染内容。

# Task Dependencies
- [Task 2] depends on [Task 1]
- [Task 3] depends on [Task 2]
- [Task 4] depends on [Task 3]
- [Task 5] depends on [Task 4]
