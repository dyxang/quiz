# 架构与数据流

## 分层结构

QuizLight 按职责可分为四层：

1. **应用壳（App Shell）**
   - 入口：[main.ts](./src/main.ts)
   - 根组件：[App.vue](./src/App.vue)
   - 路由：[router.ts](./src/router.ts)

2. **UI 展示层（Views/Components）**
   - 页面：[src/views](./src/views)
   - 组件：[src/components](./src/components)

3. **状态/交互层（Composables）**
   - 答题状态：[useQuizState](./src/composables/useQuizState.ts)
   - 主题：[useTheme](./src/composables/useTheme.ts)
   - 多语言：[useI18n](./src/composables/useI18n.ts)

4. **领域核心层（Core，引擎无关 UI）**
   - 类型：[types.ts](./src/core/types.ts)
   - JSON 校验：[schema.ts](./src/core/schema.ts)
   - 插件注册中心：[plugins.ts](./src/core/plugins.ts)
   - 引擎：[engine.ts](./src/core/engine.ts)

## 运行时数据流（从题库到结果）

### A. 首页：发现题库 → 展示列表

1. [HomeView.vue](./src/views/HomeView.vue) 使用 `import.meta.glob('/quizzes/*.json', { eager: true })` 扫描题库。
2. 对每个 JSON 执行 [validateQuiz](./src/core/schema.ts#L169-L190)：
   - 校验通过：提取 `QuizMeta`（id/title/description/questions.length/version/author）
   - 校验失败：跳过该题库
3. 使用 [QuizCard](./src/components/QuizCard.vue) 渲染卡片列表；点击跳转 `/quiz/:id`。

### B. 答题页：加载题库 → 记录答案 → 保存进度 → 跳转结果

1. [QuizView.vue](./src/views/QuizView.vue) 根据 `:id` 找到匹配题库并调用 `loadQuiz(quizData)`。
2. `loadQuiz` 来自 [useQuizState](./src/composables/useQuizState.ts#L10-L31)：
   - 创建 [QuizEngine](./src/core/engine.ts)
   - 自动注入全局插件（[pluginRegistry](./src/core/plugins.ts)）
   - 引擎 `loadQuiz` 会清空答案并触发插件 `onQuizLoad`
3. 用户每次点击“下一题”会触发 `nextQuestion()`：
   - `engine.answerQuestion(questionId, indices)` 记录答案并触发插件 `onAnswerSubmit`
   - `saveProgress()` 将答案映射写入 localStorage（key: `quizlight-<quizId>`）
4. 当 `engine.isComplete()` 成立时，`engine.getResult()` 产出结果，答题页 watcher 将答案再次写入 localStorage 并跳转 `/result/:id`。

### C. 结果页：恢复答案 → 重建引擎 → 计算结果 → 渲染

1. [ResultView.vue](./src/views/ResultView.vue) 从 localStorage 读取 `quizlight-<quizId>`。
2. 重新创建 [QuizEngine](./src/core/engine.ts) 并注入 `pluginRegistry` 插件。
3. `engine.loadQuiz(foundQuiz)` 后按题目顺序逐一 `answerQuestion` 回放作答。
4. 调用 `engine.getResult()` 计算结果，并用 [ResultCard](./src/components/ResultCard.vue) 展示：
   - 若题库定义了 `resultLayout`，则优先尝试插件自定义结果渲染器。

## 依赖关系概览（重要方向）

- Views → Composables → Core
- Components → Core（插件注册中心 + 类型）
- Core 不依赖 Vue，仅通过 `any` 类型承载“自定义渲染器”这一 UI 扩展点

