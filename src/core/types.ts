// src/core/types.ts

/** 题目类型 */
export type QuestionType = 'single' | 'multiple' | 'scale'

/** 计分策略 */
export type ScoringStrategy = 'dimension-max' | 'total-score' | 'weighted'

/** 平局处理方式 */
export type TieBreak = 'first' | 'random'

/** 题目选项 */
export interface QuestionOption {
  /** 选项显示文本 */
  label: string
  /** 维度ID → 分数映射 */
  scores: Record<string, number>
}

/** 量表配置（仅 type=scale 时使用） */
export interface ScaleConfig {
  /** 量表最小值 */
  min: number
  /** 量表最大值 */
  max: number
  /** 最小值标签（如"非常不同意"） */
  minLabel: string
  /** 最大值标签（如"非常同意"） */
  maxLabel: string
}

/** 题目定义 */
export interface Question {
  /** 题目唯一标识 */
  id: string
  /** 题目文本 */
  text: string
  /** 题目类型 */
  type: QuestionType
  /** 题目配图 URL，无配图时为 null */
  image: string | null
  /** 选项列表 */
  options: QuestionOption[]
  /** 是否随机打乱选项顺序 */
  shuffleOptions: boolean
  /** 量表配置，仅 type=scale 时使用 */
  scaleConfig?: ScaleConfig
}

/** 题目分组 */
export interface QuestionSection {
  /** 分组唯一标识 */
  id: string
  /** 分组标题 */
  title: string
  /** 分组描述 */
  description: string
  /** 该分组包含的题目 ID 列表 */
  questionIds: string[]
}

/** 维度定义 */
export interface Dimension {
  /** 维度唯一标识（如 "E"） */
  id: string
  /** 维度名称（如 "外倾"） */
  name: string
  /** 对立维度标识（如 "I"） */
  opposite: string
  /** 对立维度名称（如 "内倾"） */
  oppositeName: string
}

/** 结果匹配规则 */
export interface MatchRule {
  /** 维度 ID */
  dimension: string
  /** 该维度应匹配的值 */
  value: string
}

/** 结果定义 */
export interface QuizResultDef {
  /** 结果唯一标识（如 "INTJ"） */
  id: string
  /** 结果名称（如 "独立思考者"） */
  name: string
  /** 结果 emoji 图标 */
  emoji: string
  /** 结果描述文本 */
  description: string
  /** 匹配规则列表 */
  matchRule: MatchRule[]
  /** 结果主题色（十六进制颜色值） */
  color: string
  /** 给用户的建议 */
  advice: string
}

/** Quiz Schema 完整定义 */
export interface QuizSchema {
  /** JSON Schema 引用路径 */
  $schema: string
  /** 测验唯一标识 */
  id: string
  /** 测验标题 */
  title: string
  /** 测验描述 */
  description: string
  /** 测验版本号（语义化版本） */
  version: string
  /** 测验作者 */
  author: string
  /** 测验封面图 URL */
  cover?: string
  /** 所有题目列表 */
  questions: Question[]
  /** 题目分组（可选） */
  sections?: QuestionSection[]
  /** 维度定义列表 */
  dimensions: Dimension[]
  /** 所有结果定义列表 */
  results: QuizResultDef[]
  /** 默认结果（无法匹配时使用） */
  defaultResult: QuizResultDef
  /** 计分策略 */
  scoringStrategy: ScoringStrategy
  /** 平局处理方式 */
  tieBreak: TieBreak
  /** 是否在结果页展示各维度得分 */
  showDimensions: boolean
}

/** 维度分数 */
export interface DimensionScore {
  /** 维度 ID */
  dimensionId: string
  /** 维度名称 */
  name: string
  /** 该维度正向累计分数 */
  score: number
  /** 该维度反向累计分数 */
  oppositeScore: number
  /** 正向百分比（0-100） */
  percentage: number
}

/** 测验结果 */
export interface QuizResult {
  /** 匹配到的结果 ID */
  resultId: string
  /** 匹配到的结果定义 */
  result: QuizResultDef
  /** 各维度得分明细 */
  dimensionScores: DimensionScore[]
  /** 总题目数 */
  totalQuestions: number
  /** 已回答题目数 */
  answeredQuestions: number
}

/** 测验引擎接口 */
export interface QuizEngine {
  /** 加载测验数据 */
  loadQuiz(quizData: QuizSchema): void
  /** 记录对某道题的回答 */
  answerQuestion(questionId: string, selectedOptionIndices: number[]): void
  /** 跳转到指定索引的题目 */
  goToQuestion(index: number): void
  /** 获取当前题目索引 */
  getCurrentQuestionIndex(): number
  /** 获取当前题目 */
  getCurrentQuestion(): Question | null
  /** 获取总题目数 */
  getTotalQuestions(): number
  /** 获取所有已回答的题目及其选择 */
  getAnswers(): Map<string, number[]>
  /** 是否所有题目都已回答 */
  isComplete(): boolean
  /** 获取测验结果（未完成时返回 null） */
  getResult(): QuizResult | null
  /** 获取各维度得分 */
  getDimensionScores(): DimensionScore[]
  /** 重置测验状态 */
  reset(): void
}

/** 测试列表中的测试元信息（从 QuizSchema 提取） */
export interface QuizMeta {
  /** 测验唯一标识 */
  id: string
  /** 测验标题 */
  title: string
  /** 测验描述 */
  description: string
  /** 题目数量 */
  questionCount: number
  /** 测验版本号 */
  version: string
  /** 测验作者 */
  author: string
}
