# 核心 API（类 / 函数）

## QuizEngine（核心类）

源码：[engine.ts](file:///workspace/src/core/engine.ts)

### 构造与状态

- `private quizData: QuizSchema | null`
- `private answers = new Map<string, number[]>()`
- `private currentQuestionIndex = 0`
- `private plugins: QuizPlugin[] = []`

### use(plugin)

- 位置：[QuizEngine.use](file:///workspace/src/core/engine.ts#L23-L29)
- 行为：
  - 若插件提供 `install(engine)`，会先调用 `install`
  - 插件实例会被加入内部列表，供后续钩子/计分策略使用

### loadQuiz(quizData)

- 位置：[QuizEngine.loadQuiz](file:///workspace/src/core/engine.ts#L31-L41)
- 行为：
  - 重置答案、题号索引
  - 触发所有插件的 `onQuizLoad(quizData)`

### answerQuestion(questionId, selectedOptionIndices)

- 位置：[QuizEngine.answerQuestion](file:///workspace/src/core/engine.ts#L43-L52)
- 行为：
  - 将作答记录写入 `answers` Map
  - 触发所有插件的 `onAnswerSubmit(questionId, selectedOptionIndices)`

### getDimensionScores()

- 位置：[QuizEngine.getDimensionScores](file:///workspace/src/core/engine.ts#L87-L106)
- 逻辑：
  - 调用内部 `accumulateScores()` 汇总维度分数
  - 对每个 `dimension` 计算：
    - `positiveScore = scores[dimension.id]`
    - `oppositeScore = scores[dimension.opposite]`
    - `percentage = positive / (positive + opposite)`
  - 注意：当总分为 0 时返回 50%

### getResult()

- 位置：[QuizEngine.getResult](file:///workspace/src/core/engine.ts#L108-L152)
- 前置条件：
  - 未加载题库或未答完（`isComplete=false`）返回 `null`
- 计分策略选择：
  1. 优先查找插件 `customScoringStrategies[scoringStrategy]`
  2. 否则回退到内置策略：
     - `dimension-max` → `calculateDimensionMax`
     - `total-score` → `calculateTotalScore`
     - `weighted` 当前暂回退到 `total-score` 逻辑
- 结果返回前会触发所有插件的 `onResultShow(finalResult)`

### calculateDimensionMax(scores)

- 位置：[QuizEngine.calculateDimensionMax](file:///workspace/src/core/engine.ts#L183-L227)
- 逻辑：
  1. 对每个 `dimension` 比较正反向分数，选出赢家字符（`dimension.id` 或 `dimension.opposite`）
  2. 把赢家字符按 `dimensions` 的顺序拼接成 `resultId`
  3. 先尝试 `results.find(r => r.id === resultId)` 的精确匹配
  4. 若精确匹配失败，再尝试逐条 `matchRule` 匹配：
     - `matchRule.dimension` 必须能在 `dimensions` 中找到对应维度（通过 `dimension.id` 查找）
     - 再用该维度在 `dimensions` 的索引位置，从 `resultId` 中取字符与 `matchRule.value` 对比
  5. 都失败则返回 `defaultResult`

### calculateTotalScore(scores)

- 位置：[QuizEngine.calculateTotalScore](file:///workspace/src/core/engine.ts#L229-L255)
- 逻辑：
  - 对每个 `result.matchRule`，把 `scores.get(rule.value)` 叠加作为该结果的总分
  - 返回总分最大的结果；若平分且 `tieBreak=random` 则随机选择
  - 若所有结果 `matchRule` 都为空，则返回 `defaultResult`

## validateQuiz（题库校验）

源码：[schema.ts](file:///workspace/src/core/schema.ts)

- `validateQuiz(input: unknown): ValidateResult`
  - success: `true` 时返回 `data`（Zod 解析后的对象）
  - success: `false` 时返回 `errors: string[]`（人类可读的 path + message）

重要使用点：

- 首页题库发现：[HomeView.vue](file:///workspace/src/views/HomeView.vue#L23-L55)
- 答题页加载题库：[QuizView.vue](file:///workspace/src/views/QuizView.vue#L41-L78)
- 结果页加载题库：[ResultView.vue](file:///workspace/src/views/ResultView.vue#L28-L97)

## useQuizState（答题状态管理）

源码：[useQuizState.ts](file:///workspace/src/composables/useQuizState.ts)

核心返回值：

- 状态：
  - `quizData`, `currentQuestionIndex`, `selectedOptions`, `result`
- 派生：
  - `currentQuestion`, `totalQuestions`, `isFirstQuestion`, `isLastQuestion`, `isComplete`, `dimensionScores`
- 动作：
  - `loadQuiz(data)`：加载题库并重置 UI 状态
  - `selectOption(index)`：单选替换，多选切换
  - `nextQuestion()`：提交当前题答案、保存进度、推进到下一题/计算结果
  - `prevQuestion()`：回退并恢复上一题已选答案
  - `restoreProgress()`：从 localStorage 回放答案并定位到下一题

调用链（答题页）：

- [QuizView.vue](file:///workspace/src/views/QuizView.vue) → `useQuizState()` → `loadQuiz()` → `restoreProgress()` → `nextQuestion()` → `engine.getResult()` → watcher 跳转结果页

