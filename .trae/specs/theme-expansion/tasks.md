# Tasks

- [x] Task 1: 扩展主题插件的 Tokens
  - [x] SubTask 1.1: 在 `src/plugins/theme/index.ts` 的 `ThemeTokenKey` 中添加 `logo-text`、`logo-font`、`footer-text`、`progress-bg`、`progress-animation` 等。
  - [x] SubTask 1.2: 在 `src/App.vue`（全局 CSS）中为这些新增 Tokens 设置合理的默认值（例如 `--logo-text: "QUIZLIGHT"`，默认无动画等）。

- [x] Task 2: 重构全局与局部组件
  - [x] SubTask 2.1: 更新 `GlobalHeader.vue`，利用 `::before { content: var(--logo-text); font-family: var(--logo-font); }` 替换原有的硬编码 "QUIZLIGHT"，并清理相关旧样式。
  - [x] SubTask 2.2: 新增 `GlobalFooter.vue` 组件，使用 `::before { content: var(--footer-text); }` 渲染页脚内容，并引入到 `App.vue` 的底部。
  - [x] SubTask 2.3: 更新 `ProgressBar.vue` 的核心进度条样式，应用 `background: var(--progress-bg)` 和 `animation: var(--progress-animation)`，支持复杂的彩虹渐变和海浪动画。

- [x] Task 3: 实现三大经典内置主题
  - [x] SubTask 3.1: 设计 `themeNotion` (Notion 风格)，使用优雅的 Serif 衬线体、极简的黑白灰、柔和的阴影。
  - [x] SubTask 3.2: 设计 `themeDracula` (Dracula 配色)，使用著名的暗黑紫/粉/绿色调，Logo 字体采用非商用中文古风或现代特殊字体，进度条设计为霓虹渐变（彩虹色）或动态波浪（波浪动画通过在 `index.html` 或全局注入 `@keyframes` 实现，并在 Tokens 中调用）。
  - [x] SubTask 3.3: 设计 `themeGithub` (Github 配色)，使用蓝灰经典色、严谨的程序员等宽/无衬线排版，进度条呈现类似 Github 贡献图的绿色或蓝色的纯净质感。

- [x] Task 4: 验证主题应用效果
  - [x] SubTask 4.1: 启动本地开发服务器并验证所有主题切换，确保 ProgressBar 样式、Logo 和 Footer 内容及字体均随主题动态变更。若发现异常，及时修复代码逻辑直至满足需求。

- [x] Task 5: 遵循工作流更新文档
  - [x] SubTask 5.1: 按照工作流约定，更新 `AGENTS.md` 和 `LIST.md` 中的状态、进度和日志记录。

- [x] Task 6: 垃圾回收与代码提交
  - [x] SubTask 6.1: 运行 `pnpm build` 或 `npm run build`，确保重构无打包错误。
  - [x] SubTask 6.2: 运行 `git gc` 清理本地仓库冗余。
  - [x] SubTask 6.3: 将所有变更通过 `git add .` 和 `git commit -m "..."` 提交至 `main` 分支。