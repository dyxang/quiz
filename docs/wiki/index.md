# QuizLight Code Wiki

## 目录

- [1. 项目概览](file:///workspace/docs/wiki/index.md#1-%E9%A1%B9%E7%9B%AE%E6%A6%82%E8%A7%88)
- [2. 架构与数据流](file:///workspace/docs/wiki/architecture.md)
- [3. 模块与职责](file:///workspace/docs/wiki/modules.md)
- [4. 核心 API（类/函数）](file:///workspace/docs/wiki/api.md)
- [5. 题库 Schema（JSON）](file:///workspace/docs/wiki/quiz-schema.md)
- [6. 插件系统](file:///workspace/docs/wiki/plugins.md)
- [7. 开发、构建与部署](file:///workspace/docs/wiki/operations.md)

## 1. 项目概览

QuizLight 是一个“题库驱动”的测评应用：应用运行时扫描 `quizzes/*.json`，在首页展示可用测评；用户进入答题页完成作答后，结果页根据保存的作答记录重建引擎并计算结果。

核心特点是把业务逻辑与 UI 解耦：

- **引擎层**：纯 TypeScript 的 [QuizEngine](file:///workspace/src/core/engine.ts) 负责“加载题库 / 记录答案 / 计分出结果”，可独立复用。
- **UI 层**：Vue 组件与页面，负责渲染与交互（路由、进度条、题目、结果卡片等）。
- **扩展层**：插件协议 + 全局注册中心，允许替换题型渲染、结果渲染与计分策略。

快速导航（关键入口）：

- 应用入口：[main.ts](file:///workspace/src/main.ts)
- 路由定义：[router.ts](file:///workspace/src/router.ts)
- 首页题库扫描：[HomeView.vue](file:///workspace/src/views/HomeView.vue)
- 状态管理（答题过程）：[useQuizState](file:///workspace/src/composables/useQuizState.ts)
- 结果页重建引擎：[ResultView.vue](file:///workspace/src/views/ResultView.vue)

