// src/core/schema.ts

import { z } from 'zod'

// ==================== 基础枚举 ====================

/** 题目类型枚举 */
const QuestionTypeSchema = z.enum(['single', 'multiple', 'scale'])

/** 计分策略枚举 */
const ScoringStrategySchema = z.enum(['dimension-max', 'total-score', 'weighted'])

/** 平局处理方式枚举 */
const TieBreakSchema = z.enum(['first', 'random'])

// ==================== 嵌套对象 ====================

/** 题目选项 */
const QuestionOptionSchema = z.object({
  /** 选项显示文本 */
  label: z.string().min(1, '选项文本不能为空'),
  /** 维度ID → 分数映射 */
  scores: z.record(z.string(), z.number()),
})

/** 量表配置（仅 type=scale 时使用） */
const ScaleConfigSchema = z.object({
  /** 量表最小值 */
  min: z.number(),
  /** 量表最大值 */
  max: z.number(),
  /** 最小值标签 */
  minLabel: z.string().min(1, '最小值标签不能为空'),
  /** 最大值标签 */
  maxLabel: z.string().min(1, '最大值标签不能为空'),
})

/** 题目定义 */
const QuestionSchema = z.object({
  /** 题目唯一标识 */
  id: z.string().min(1, '题目 ID 不能为空'),
  /** 题目文本 */
  text: z.string().min(1, '题目文本不能为空'),
  /** 题目类型 */
  type: QuestionTypeSchema,
  /** 题目配图 URL，无配图时为 null */
  image: z.string().nullable(),
  /** 选项列表 */
  options: z
    .array(QuestionOptionSchema)
    .min(2, '每道题至少需要 2 个选项'),
  /** 是否随机打乱选项顺序 */
  shuffleOptions: z.boolean(),
  /** 量表配置，仅 type=scale 时使用 */
  scaleConfig: ScaleConfigSchema.optional(),
})

/** 题目分组 */
const QuestionSectionSchema = z.object({
  /** 分组唯一标识 */
  id: z.string().min(1, '分组 ID 不能为空'),
  /** 分组标题 */
  title: z.string().min(1, '分组标题不能为空'),
  /** 分组描述 */
  description: z.string(),
  /** 该分组包含的题目 ID 列表 */
  questionIds: z.array(z.string()).min(1, '分组至少需要包含 1 道题'),
})

/** 维度定义 */
const DimensionSchema = z.object({
  /** 维度唯一标识 */
  id: z.string().min(1, '维度 ID 不能为空'),
  /** 维度名称 */
  name: z.string().min(1, '维度名称不能为空'),
  /** 对立维度标识 */
  opposite: z.string().min(1, '对立维度 ID 不能为空'),
  /** 对立维度名称 */
  oppositeName: z.string().min(1, '对立维度名称不能为空'),
})

/** 结果匹配规则 */
const MatchRuleSchema = z.object({
  /** 维度 ID */
  dimension: z.string().min(1, '维度 ID 不能为空'),
  /** 该维度应匹配的值 */
  value: z.string().min(1, '匹配值不能为空'),
})

/** 结果定义 */
const QuizResultDefSchema = z.object({
  /** 结果唯一标识 */
  id: z.string().min(1, '结果 ID 不能为空'),
  /** 结果名称 */
  name: z.string().min(1, '结果名称不能为空'),
  /** 结果 emoji 图标 */
  emoji: z.string().min(1, 'emoji 不能为空'),
  /** 结果描述文本 */
  description: z.string().min(1, '结果描述不能为空'),
  /** 匹配规则列表 */
  matchRule: z.array(MatchRuleSchema),
  /** 结果主题色（十六进制颜色值） */
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/, '颜色格式应为 #RRGGBB'),
  /** 给用户的建议 */
  advice: z.string().min(1, '建议不能为空'),
})

// ==================== 顶层 Schema ====================

/** Quiz Schema 完整定义 */
export const quizSchema = z.object({
  /** JSON Schema 引用路径 */
  $schema: z.string(),
  /** 测验唯一标识 */
  id: z.string().min(1, '测验 ID 不能为空'),
  /** 测验标题 */
  title: z.string().min(1, '测验标题不能为空'),
  /** 测验描述 */
  description: z.string().min(1, '测验描述不能为空'),
  /** 测验版本号 */
  version: z.string().min(1, '版本号不能为空'),
  /** 测验作者 */
  author: z.string().min(1, '作者不能为空'),
  /** 测验封面图 URL（可选） */
  cover: z.string().optional(),
  /** 所有题目列表 */
  questions: z
    .array(QuestionSchema)
    .min(1, '至少需要 1 道题目'),
  /** 题目分组（可选） */
  sections: z.array(QuestionSectionSchema).optional(),
  /** 维度定义列表 */
  dimensions: z
    .array(DimensionSchema)
    .min(1, '至少需要 1 个维度'),
  /** 所有结果定义列表 */
  results: z
    .array(QuizResultDefSchema)
    .min(1, '至少需要 1 个结果定义'),
  /** 默认结果 */
  defaultResult: QuizResultDefSchema,
  /** 计分策略 */
  scoringStrategy: ScoringStrategySchema,
  /** 平局处理方式 */
  tieBreak: TieBreakSchema,
  /** 是否在结果页展示各维度得分 */
  showDimensions: z.boolean(),
})

// ==================== 校验函数 ====================

/** 校验结果类型 */
export interface ValidateResult {
  /** 是否校验通过 */
  success: boolean
  /** 校验通过时的解析数据 */
  data?: z.infer<typeof quizSchema>
  /** 校验失败时的错误信息列表 */
  errors: string[]
}

/**
 * 校验测验数据
 * @param input - 待校验的未知类型数据
 * @returns 校验结果，包含 success、data（成功时）、errors（失败时）
 */
export function validateQuiz(input: unknown): ValidateResult {
  const result = quizSchema.safeParse(input)

  if (result.success) {
    return {
      success: true,
      data: result.data,
      errors: [],
    }
  }

  // 将 Zod 的错误信息转换为可读的字符串列表
  const errors = result.error.errors.map((err) => {
    const path = err.path.join('.')
    return path ? `${path}: ${err.message}` : err.message
  })

  return {
    success: false,
    errors,
  }
}

// ==================== 类型导出 ====================

/** 从 Zod Schema 推导出的 TypeScript 类型 */
export type QuizSchemaType = z.infer<typeof quizSchema>
