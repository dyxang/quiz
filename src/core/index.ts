// src/core/index.ts
export type {
  QuestionType,
  ScoringStrategy,
  TieBreak,
  QuestionOption,
  ScaleConfig,
  Question,
  QuestionSection,
  Dimension,
  MatchRule,
  QuizResultDef,
  QuizSchema,
  DimensionScore,
  QuizResult,
  QuizMeta,
} from './types'

export { quizSchema, validateQuiz } from './schema'
export type { ValidateResult } from './schema'
export { pluginRegistry } from './plugins'
export type { QuizPlugin } from './types'
export { QuizEngine } from './engine'
