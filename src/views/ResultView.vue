<!-- src/views/ResultView.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { validateQuiz } from '@/core'
import type { QuizSchema, QuizResult } from '@/core'
import { QuizEngine } from '@/core'
import ResultCard from '@/components/ResultCard.vue'

const route = useRoute()
const router = useRouter()
const quizId = route.params.id as string

/** 加载状态 */
const loading = ref(true)
const loadError = ref<string | null>(null)

/** 测验结果 */
const quizResult = ref<QuizResult | null>(null)

/** 测验数据（用于维度信息展示） */
const quizData = ref<QuizSchema | null>(null)

onMounted(async () => {
  try {
    // 动态加载题库 JSON
    const quizModules = import.meta.glob('/quizzes/*.json', { eager: true })
    let foundQuiz: QuizSchema | null = null

    for (const [, module] of Object.entries(quizModules)) {
      const rawData = (module as Record<string, unknown>).default
      if (!rawData) continue

      const validation = validateQuiz(rawData)
      if (!validation.success) continue

      const data = validation.data as QuizSchema
      if (data.id === quizId) {
        foundQuiz = data
        break
      }
    }

    if (!foundQuiz) {
      loadError.value = `未找到测试: ${quizId}`
      return
    }

    quizData.value = foundQuiz

    // 从 localStorage 恢复答题数据
    const storageKey = `quizlight-${quizId}`
    const storedAnswers = localStorage.getItem(storageKey)

    if (!storedAnswers) {
      loadError.value = '未找到答题记录，请重新测试'
      return
    }

    // 解析存储的答案数据
    const answersData = JSON.parse(storedAnswers) as Record<string, number[]>

    // 重建引擎状态并计算结果
    const engine = new QuizEngine()
    engine.loadQuiz(foundQuiz)

    // 按题目顺序逐一录入答案
    for (const question of foundQuiz.questions) {
      const selectedIndices = answersData[question.id]
      if (selectedIndices && selectedIndices.length > 0) {
        engine.answerQuestion(question.id, selectedIndices)
      }
    }

    // 计算结果
    const result = engine.getResult()
    if (!result) {
      loadError.value = '答案不完整，请重新完成测试'
      return
    }

    quizResult.value = result
  } catch (error) {
    console.error('加载结果失败:', error)
    loadError.value = '加载结果失败，请刷新重试'
  } finally {
    loading.value = false
  }
})

/** 重新测试 */
function handleRetake() {
  // 清除 localStorage 中的答题记录
  const storageKey = `quizlight-${quizId}`
  localStorage.removeItem(storageKey)
  router.push(`/quiz/${quizId}`)
}

/** 返回首页 */
function handleGoHome() {
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 加载中 -->
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <p class="text-gray-400">加载中...</p>
    </div>

    <!-- 加载错误 -->
    <div v-else-if="loadError" class="flex flex-col items-center justify-center min-h-screen px-4">
      <p class="text-red-500 mb-4 text-center">{{ loadError }}</p>
      <div class="flex gap-3">
        <router-link
          to="/"
          class="text-primary hover:text-primary-dark text-sm underline"
        >
          返回首页
        </router-link>
      </div>
    </div>

    <!-- 结果展示 -->
    <div v-else-if="quizResult" class="py-8 px-4">
      <ResultCard
        :result="quizResult.result"
        :dimension-scores="quizResult.dimensionScores"
        @retake="handleRetake"
        @go-home="handleGoHome"
      />
    </div>
  </div>
</template>
