// src/composables/useQuizState.ts
import { ref, computed } from 'vue'
import { QuizEngine } from '@/core'
import type { QuizSchema, QuizResult, DimensionScore, Question } from '@/core'

/**
 * 答题状态管理 composable
 * 封装 QuizEngine，提供 Vue 响应式状态和方法。
 */
export function useQuizState() {
  const engine = new QuizEngine()
  const quizData = ref<QuizSchema | null>(null)
  const currentQuestionIndex = ref(0)
  const selectedOptions = ref<number[]>([])
  const result = ref<QuizResult | null>(null)

  /** 加载测验 */
  function loadQuiz(data: QuizSchema) {
    quizData.value = data
    engine.loadQuiz(data)
    currentQuestionIndex.value = 0
    selectedOptions.value = []
    result.value = null
  }

  /** 当前题目 */
  const currentQuestion = computed<Question | null>(() => {
    if (!quizData.value) return null
    return quizData.value.questions[currentQuestionIndex.value] ?? null
  })

  /** 总题数 */
  const totalQuestions = computed(() => quizData.value?.questions.length ?? 0)

  /** 是否为第一题 */
  const isFirstQuestion = computed(() => currentQuestionIndex.value === 0)

  /** 是否为最后一题 */
  const isLastQuestion = computed(() => currentQuestionIndex.value >= totalQuestions.value - 1)

  /** 是否所有题目已回答 */
  const isComplete = computed(() => engine.isComplete())

  /** 各维度分数 */
  const dimensionScores = computed<DimensionScore[]>(() => engine.getDimensionScores())

  /** 选择选项 */
  function selectOption(optionIndex: number) {
    if (!currentQuestion.value) return

    if (currentQuestion.value.type === 'single') {
      selectedOptions.value = [optionIndex]
    } else {
      // multiple
      const index = selectedOptions.value.indexOf(optionIndex)
      if (index >= 0) {
        selectedOptions.value.splice(index, 1)
      } else {
        selectedOptions.value.push(optionIndex)
      }
    }
  }

  /** 确认当前题目答案并进入下一题 */
  function nextQuestion() {
    if (!currentQuestion.value || selectedOptions.value.length === 0) return

    engine.answerQuestion(currentQuestion.value.id, [...selectedOptions.value])

    if (currentQuestionIndex.value < totalQuestions.value - 1) {
      currentQuestionIndex.value++
      const nextQ = quizData.value?.questions[currentQuestionIndex.value]
      if (nextQ) {
        const nextAnswer = engine.getAnswers().get(nextQ.id)
        selectedOptions.value = nextAnswer ? [...nextAnswer] : []
      } else {
        selectedOptions.value = []
      }
    } else {
      // 所有题目已回答完毕，计算结果
      result.value = engine.getResult()
    }
  }

  /** 返回上一题 */
  function prevQuestion() {
    if (currentQuestionIndex.value > 0) {
      // 恢复上一题的已选答案
      currentQuestionIndex.value--
      const prevQuestion = quizData.value?.questions[currentQuestionIndex.value]
      if (prevQuestion) {
        const prevAnswer = engine.getAnswers().get(prevQuestion.id)
        selectedOptions.value = prevAnswer ? [...prevAnswer] : []
      }
    }
  }

  /** 重新测试 */
  function retake() {
    if (quizData.value) {
      engine.reset()
      currentQuestionIndex.value = 0
      selectedOptions.value = []
      result.value = null
    }
  }

  /** 获取所有已回答题目的答案映射（用于持久化） */
  function getAnswersMap(): Record<string, number[]> {
    const answers = engine.getAnswers()
    const map: Record<string, number[]> = {}
    for (const [questionId, indices] of answers) {
      map[questionId] = indices
    }
    return map
  }

  return {
    quizData,
    currentQuestionIndex,
    currentQuestion,
    totalQuestions,
    selectedOptions,
    result,
    isFirstQuestion,
    isLastQuestion,
    isComplete,
    dimensionScores,
    loadQuiz,
    selectOption,
    nextQuestion,
    prevQuestion,
    retake,
    getAnswersMap,
  }
}
