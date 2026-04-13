# 插件系统

QuizLight 的插件系统目标是：在不修改核心引擎与默认 UI 的情况下，扩展“题型渲染 / 结果展示 / 计分策略 / 生命周期行为”。

## 1. 插件协议（QuizPlugin）

定义见 [QuizPlugin](file:///workspace/src/core/types.ts#L206-L228)：

- `name: string`
- `install?(engine)`：引擎侧初始化入口（在 `engine.use(plugin)` 时调用）
- 生命周期钩子：
  - `onQuizLoad?(quizData)`
  - `onAnswerSubmit?(questionId, selectedIndices)`
  - `onResultShow?(result)`
- 可扩展点：
  - `customQuestionRenderers?: Record<QuestionType, VueComponent>`
  - `customResultRenderers?: Record<layout, VueComponent>`
  - `customScoringStrategies?: Record<strategy, (answers, quizData) => QuizResultDef>`

## 2. 注册方式（pluginRegistry）

全局注册中心： [pluginRegistry](file:///workspace/src/core/plugins.ts)

- `pluginRegistry.use(plugin)` 注册插件
- `pluginRegistry.getPlugins()` 获取插件列表

插件会在两个关键路径被“自动注入”：

- 答题态： [useQuizState](file:///workspace/src/composables/useQuizState.ts#L10-L17)
- 结果页重建引擎： [ResultView.vue](file:///workspace/src/views/ResultView.vue#L68-L73)

## 3. UI 侧的渲染替换点

### 题型渲染替换（Question.vue）

[Question.vue](file:///workspace/src/components/Question.vue#L25-L34) 会按 `question.type` 从插件中查找 `customQuestionRenderers[type]`：

- 命中：直接 `<component :is="customRenderer" ... />`
- 未命中：走默认“单选/多选”UI

### 结果渲染替换（ResultCard.vue）

[ResultCard.vue](file:///workspace/src/components/ResultCard.vue#L29-L38) 会按 `layout` 从插件中查找 `customResultRenderers[layout]`：

- `layout` 由题库字段 `resultLayout` 提供（见 [QuizSchema.resultLayout](file:///workspace/src/core/types.ts#L126-L133)）
- 命中：直接 `<component :is="customRenderer" ... />`
- 未命中：走默认结果卡片 UI

## 4. 计分策略扩展点

引擎 [getResult](file:///workspace/src/core/engine.ts#L108-L134) 会优先尝试插件的 `customScoringStrategies[strategy]`，其中：

- `strategy` 来自题库字段 `scoringStrategy`
- 插件函数收到：
  - `answers: Map<string, number[]>`
  - `quizData: QuizSchema`
- 返回 `QuizResultDef`（最终结果定义）

## 5. 最小插件示例

下面示例展示一个插件的基本形态（需要在你自己的文件中实现并注册到 `pluginRegistry`）：

```ts
import type { QuizPlugin } from '@/core'

export const myPlugin: QuizPlugin = {
  name: 'my-plugin',
  onQuizLoad(quiz) {
    // side effects (analytics, etc.)
  },
  customScoringStrategies: {
    'my-strategy': (answers, quizData) => {
      return quizData.defaultResult
    },
  },
}
```

注册（示意）：

```ts
import { pluginRegistry } from '@/core'
import { myPlugin } from './my-plugin'

pluginRegistry.use(myPlugin)
```

