# 模块与职责

## 目录结构

```text
/quizzes                题库 JSON（运行时扫描）
/src
  /core                 领域核心（类型、校验、引擎、插件）
  /composables          组合式状态（答题/主题/i18n）
  /views                页面（Home/Quiz/Result）
  /components           UI 组件（卡片/题目/结果/进度条等）
  App.vue               根组件（全局 CSS 变量、暗色覆盖）
  main.ts               应用入口（createApp + router + UnoCSS）
  router.ts             路由配置
/tests                  Vitest 测试
```

## Core（领域核心）

### types.ts

- 题库与结果的领域模型（`QuizSchema`, `Question`, `Dimension`, `QuizResultDef`, `QuizResult` 等）
- 插件协议（`QuizPlugin`）：
  - `customQuestionRenderers?: Record<string, any>`
  - `customResultRenderers?: Record<string, any>`
  - `customScoringStrategies?: Record<string, (answers, quizData) => QuizResultDef>`
  - 生命周期钩子：`onQuizLoad` / `onAnswerSubmit` / `onResultShow`

参考：[types.ts](./src/core/types.ts)

### schema.ts

- 基于 Zod 的运行时校验器：
  - `quizSchema`：顶层 schema
  - `validateQuiz(input)`：返回 `{ success, data?, errors }`

参考：[schema.ts](./src/core/schema.ts)

### engine.ts

- `QuizEngine`：框架无关测验引擎，实现：
  - `loadQuiz(quizData)`：加载题库并重置状态
  - `answerQuestion(questionId, selectedOptionIndices)`：记录答案
  - `getDimensionScores()`：生成各维度得分（正反向 + 百分比）
  - `getResult()`：依据题库的 `scoringStrategy` 计算结果并触发插件钩子
  - `use(plugin)`：插件注入（可覆盖计分策略、监听生命周期）

参考：[engine.ts](./src/core/engine.ts)

### plugins.ts

- `pluginRegistry`：全局插件注册中心（单例）
  - `use(plugin)` 注册插件
  - `getPlugins()` 获取所有插件

参考：[plugins.ts](./src/core/plugins.ts)

## Composables（状态/交互）

### useQuizState

- 将 `QuizEngine` 包装成 Vue 响应式状态：
  - 输入：题库 `QuizSchema`
  - 输出：`currentQuestion`、`selectedOptions`、`result`、`dimensionScores` 等
  - 动作：`selectOption` / `nextQuestion` / `prevQuestion` / `retake`
  - 持久化：`saveProgress` / `restoreProgress`（localStorage）
- 自动将 `pluginRegistry` 插件注入引擎

参考：[useQuizState.ts](./src/composables/useQuizState.ts)

### useTheme

- 全局单例主题状态（`light | dark`），变更时同步：
  - localStorage（key: `quizlight-theme`）
  - `document.documentElement` 的 `.dark/.light` class

参考：[useTheme.ts](./src/composables/useTheme.ts)

### useI18n

- 轻量 i18n（`zh/en`），变更时同步 localStorage（key: `quizlight-locale`）
- `t(key, params?)`：支持 `{id}` 这类占位符替换

参考：[useI18n.ts](./src/composables/useI18n.ts)

## Views（页面）

- 首页：[HomeView.vue](./src/views/HomeView.vue)
  - 扫描题库并展示列表
- 答题页：[QuizView.vue](./src/views/QuizView.vue)
  - 加载题库、恢复进度、驱动答题流程
- 结果页：[ResultView.vue](./src/views/ResultView.vue)
  - 从作答记录恢复、计算结果、提供重测/回首页

## Components（组件）

- 题库卡片：[QuizCard.vue](./src/components/QuizCard.vue)
- 进度条：[ProgressBar.vue](./src/components/ProgressBar.vue)
- 题目渲染（可被插件替换）：[Question.vue](./src/components/Question.vue)
- 结果渲染（可被插件替换）：[ResultCard.vue](./src/components/ResultCard.vue)
- 维度条形图：[ScoreBar.vue](./src/components/ScoreBar.vue)
- 主题/语言切换：[ThemeToggle.vue](./src/components/ThemeToggle.vue), [LanguageToggle.vue](./src/components/LanguageToggle.vue)

