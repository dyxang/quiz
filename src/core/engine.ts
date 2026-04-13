// src/core/engine.ts
import type {
  QuizSchema,
  Question,
  QuizResult,
  QuizResultDef,
  DimensionScore,
  Dimension,
  TieBreak,
  QuizPlugin,
} from './types'

/**
 * QuizEngine — 测验引擎核心类
 * 框架无关的纯 TypeScript 实现，负责加载题库、记录答案、计算结果。
 */
export class QuizEngine {
  private quizData: QuizSchema | null = null
  private answers = new Map<string, number[]>()
  private currentQuestionIndex = 0
  private plugins: QuizPlugin[] = []

  /** 注册插件 */
  use(plugin: QuizPlugin): void {
    if (plugin.install) {
      plugin.install(this)
    }
    this.plugins.push(plugin)
  }

  /** 加载测验数据 */
  loadQuiz(quizData: QuizSchema): void {
    this.quizData = quizData
    this.answers.clear()
    this.currentQuestionIndex = 0

    // 触发插件钩子
    for (const plugin of this.plugins) {
      plugin.onQuizLoad?.(quizData)
    }
  }

  /** 记录对某道题的回答 */
  answerQuestion(questionId: string, selectedOptionIndices: number[]): void {
    if (!this.quizData) return
    this.answers.set(questionId, selectedOptionIndices)

    // 触发插件钩子
    for (const plugin of this.plugins) {
      plugin.onAnswerSubmit?.(questionId, selectedOptionIndices)
    }
  }

  /** 跳转到指定索引的题目 */
  goToQuestion(index: number): void {
    if (!this.quizData) return
    this.currentQuestionIndex = Math.max(0, Math.min(index, this.quizData.questions.length - 1))
  }

  /** 获取当前题目索引 */
  getCurrentQuestionIndex(): number {
    return this.currentQuestionIndex
  }

  /** 获取当前题目 */
  getCurrentQuestion(): Question | null {
    if (!this.quizData) return null
    return this.quizData.questions[this.currentQuestionIndex] ?? null
  }

  /** 获取总题目数 */
  getTotalQuestions(): number {
    return this.quizData?.questions.length ?? 0
  }

  /** 获取所有已回答的题目及其选择 */
  getAnswers(): Map<string, number[]> {
    return new Map(this.answers)
  }

  /** 是否所有题目都已回答 */
  isComplete(): boolean {
    if (!this.quizData) return false
    return this.answers.size === this.quizData.questions.length
  }

  /** 获取各维度得分 */
  getDimensionScores(): DimensionScore[] {
    if (!this.quizData) return []

    const scores = this.accumulateScores()
    return this.quizData.dimensions.map((dimension) => {
      const positiveScore = scores.get(dimension.id) ?? 0
      const oppositeScore = scores.get(dimension.opposite) ?? 0
      const total = positiveScore + oppositeScore
      const percentage = total === 0 ? 50 : Math.round((positiveScore / total) * 100)

      return {
        dimensionId: dimension.id,
        name: dimension.name,
        score: positiveScore,
        oppositeScore,
        percentage,
      }
    })
  }

  /** 获取测验结果 */
  getResult(): QuizResult | null {
    if (!this.quizData || !this.isComplete()) return null

    const scores = this.accumulateScores()
    const strategy = this.quizData.scoringStrategy

    let matchedResult: QuizResultDef | undefined

    // 优先尝试插件注册的自定义计分策略
    for (const plugin of this.plugins) {
      if (plugin.customScoringStrategies?.[strategy]) {
        matchedResult = plugin.customScoringStrategies[strategy](this.answers, this.quizData)
        break
      }
    }

    // 回退到内置策略
    if (!matchedResult) {
      if (strategy === 'dimension-max') {
        matchedResult = this.calculateDimensionMax(scores)
      } else if (strategy === 'total-score') {
        matchedResult = this.calculateTotalScore(scores)
      } else {
        matchedResult = this.calculateTotalScore(scores) // weighted 暂用 total-score 逻辑
      }
    }

    const dimensionScores = this.getDimensionScores()

    const finalResult: QuizResult = {
      resultId: matchedResult.id,
      result: matchedResult,
      dimensionScores,
      totalQuestions: this.quizData.questions.length,
      answeredQuestions: this.answers.size,
    }

    // 触发插件钩子
    for (const plugin of this.plugins) {
      plugin.onResultShow?.(finalResult)
    }

    return finalResult
  }

  /** 重置测验状态 */
  reset(): void {
    this.answers.clear()
    this.currentQuestionIndex = 0
  }

  /** 累加各维度分数 */
  private accumulateScores(): Map<string, number> {
    const scores = new Map<string, number>()
    if (!this.quizData) return scores

    for (const [questionId, selectedIndices] of this.answers) {
      const question = this.quizData.questions.find((q) => q.id === questionId)
      if (!question) continue

      for (const optionIndex of selectedIndices) {
        const option = question.options[optionIndex]
        if (!option) continue

        for (const [dimensionId, score] of Object.entries(option.scores)) {
          const current = scores.get(dimensionId) ?? 0
          scores.set(dimensionId, current + score)
        }
      }
    }

    return scores
  }

  /** dimension-max 策略：每个维度取分数较高的一端，组合成结果 ID */
  private calculateDimensionMax(scores: Map<string, number>): QuizResultDef {
    if (!this.quizData) return { id: 'unknown', name: '未知', emoji: '❓', description: '', matchRule: [], color: '#9ca3af', advice: '' }

    const winners: string[] = []

    for (const dimension of this.quizData.dimensions) {
      const positiveScore = scores.get(dimension.id) ?? 0
      const oppositeScore = scores.get(dimension.opposite) ?? 0

      if (positiveScore > oppositeScore) {
        winners.push(dimension.id)
      } else if (oppositeScore > positiveScore) {
        winners.push(dimension.opposite)
      } else {
        // 平局处理
        if (this.quizData.tieBreak === 'first') {
          winners.push(dimension.id)
        } else {
          winners.push(Math.random() < 0.5 ? dimension.id : dimension.opposite)
        }
      }
    }

    const resultId = winners.join('')
    
    // 先尝试精确匹配 id
    const exactMatch = this.quizData.results.find((r) => r.id === resultId)
    if (exactMatch) return exactMatch

    // 再尝试通过 matchRule 逐条匹配
    const matched = this.quizData.results.find((result) => {
      if (result.matchRule.length === 0) return false

      return result.matchRule.every((rule) => {
        const dimension = this.quizData!.dimensions.find((d) => d.id === rule.dimension)
        if (!dimension) return false
        
        const dimensionIndex = this.quizData!.dimensions.indexOf(dimension)
        return resultId[dimensionIndex] === rule.value
      })
    })

    return matched ?? this.quizData.defaultResult
  }

  /** total-score 策略：计算每个结果的维度分数之和，取最高分 */
  private calculateTotalScore(scores: Map<string, number>): QuizResultDef {
    if (!this.quizData) return { id: 'unknown', name: '未知', emoji: '❓', description: '', matchRule: [], color: '#9ca3af', advice: '' }

    let maxScore = -Infinity
    let bestResult: QuizResultDef = this.quizData.defaultResult

    for (const result of this.quizData.results) {
      if (result.matchRule.length === 0) continue

      let total = 0
      for (const rule of result.matchRule) {
        total += scores.get(rule.value) ?? 0
      }

      if (total > maxScore) {
        maxScore = total
        bestResult = result
      } else if (total === maxScore && this.quizData.tieBreak === 'random') {
        if (Math.random() < 0.5) {
          bestResult = result
        }
      }
    }

    return maxScore === -Infinity ? this.quizData.defaultResult : bestResult
  }
}
