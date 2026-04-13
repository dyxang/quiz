# 题库 Schema（JSON）

题库文件放置在 [quizzes/](file:///workspace/quizzes) 目录，应用运行时自动扫描 `*.json` 并通过 [validateQuiz](file:///workspace/src/core/schema.ts#L169-L190) 做校验。

TypeScript 领域模型见 [QuizSchema](file:///workspace/src/core/types.ts#L100-L134)。

## 顶层字段（QuizSchema）

- `$schema`: string（示例中为 `./schema/quiz.schema.json`，仅作为标识/工具提示）
- `id`: string（路由与 localStorage key 的核心标识）
- `title`, `description`, `version`, `author`: string
- `cover?`: string（可选）
- `questions`: Question[]
- `sections?`: QuestionSection[]（可选，用于分组信息；当前 UI 未强依赖）
- `dimensions`: Dimension[]
- `results`: QuizResultDef[]
- `defaultResult`: QuizResultDef（无法匹配时回退）
- `resultLayout?`: string（可选；供插件选择结果渲染器）
- `scoringStrategy`: `'dimension-max' | 'total-score' | 'weighted' | string`
- `tieBreak`: `'first' | 'random'`
- `showDimensions`: boolean（是否在结果页展示维度分析；当前默认 UI 会在 `dimensionScores.length > 0` 时展示）

## Question（题目）

定义见 [Question](file:///workspace/src/core/types.ts#L32-L48)。

- `id`: string（唯一）
- `text`: string
- `type`: `'single' | 'multiple' | 'scale' | string`
- `image`: string | null
- `options`: `{ label: string; scores: Record<string, number> }[]`
- `shuffleOptions`: boolean（当前默认 UI 未实现随机；可由插件题型渲染器实现）
- `scaleConfig?`: 仅 `type=scale` 时使用（默认 UI 未实现；建议用插件渲染器承接）

### scores 的含义

`scores` 是一个“维度ID → 分数”的增量映射，最终会在引擎中汇总为维度总分：

- 汇总逻辑：[accumulateScores](file:///workspace/src/core/engine.ts#L160-L181)
- 维度对立（正反向）：由 `dimensions[].opposite` 指定

## Dimension（维度）

定义见 [Dimension](file:///workspace/src/core/types.ts#L62-L72)。

- `id`: string（维度正向标识，比如 `E`、`N`）
- `opposite`: string（维度反向标识，比如 `I`、`S`）
- `name`, `oppositeName`: string（展示用）

引擎的 `dimension-max` 会按 `dimensions` 的顺序拼接赢家字符生成 `resultId`：

- 参考：[calculateDimensionMax](file:///workspace/src/core/engine.ts#L183-L227)

## QuizResultDef（结果）

定义见 [QuizResultDef](file:///workspace/src/core/types.ts#L82-L98)。

- `id`: string（建议与 `dimension-max` 拼接出来的 `resultId` 精确一致，以获得最快匹配）
- `name`, `emoji`, `description`, `advice`: string
- `color`: `#RRGGBB`（用于 UI 主题色）
- `matchRule`: MatchRule[]

### matchRule 的使用建议

在当前引擎实现中：

- `dimension-max` 先做 `id` 精确匹配；失败才会尝试 `matchRule`
- `matchRule.dimension` 会按 `dimensions[].id` 查找维度；建议填写维度正向 `id`（而不是 opposite）
- `matchRule.value` 应该是该维度在 `resultId` 中可能出现的字符（即 `dimension.id` 或 `dimension.opposite`）

示例题库见 [sample-test.json](file:///workspace/quizzes/sample-test.json)。

