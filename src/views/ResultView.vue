<!-- src/views/ResultView.vue -->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { validateQuiz } from '@/core'
import type { QuizSchema, QuizResult } from '@/core'
import { QuizEngine, pluginRegistry } from '@/core'
import ResultCard from '@/components/ResultCard.vue'
import { useI18n } from '@/composables/useI18n'
import { themeManager } from '@/plugins/theme'

const route = useRoute()
const router = useRouter()
const quizId = route.params.id as string
const { t } = useI18n()

/** 加载状态 */
const loading = ref(true)
const loadError = ref<string | null>(null)

/** 测验结果 */
const quizResult = ref<QuizResult | null>(null)

/** 测验数据（用于维度信息展示） */
const quizData = ref<QuizSchema | null>(null)

// 页面卸载时清理主题
onUnmounted(() => {
  themeManager.clearTheme()
})

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
      loadError.value = t.value('error.quizNotFound', { id: quizId })
      return
    }

    quizData.value = foundQuiz

    // 从 localStorage 恢复答题数据
    const storageKey = `quizlight-${quizId}`
    const storedAnswers = localStorage.getItem(storageKey)

    if (!storedAnswers) {
      loadError.value = t.value('error.noRecord')
      return
    }

    // 解析存储的答案数据
    const answersData = JSON.parse(storedAnswers) as Record<string, number[]>

    // 重建引擎状态并计算结果
    const engine = new QuizEngine()
    // 自动注册全局插件
    pluginRegistry.getPlugins().forEach(plugin => {
      engine.use(plugin)
    })
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
      loadError.value = t.value('error.incomplete')
      return
    }

    quizResult.value = result
  } catch (error) {
    console.error('加载结果失败:', error)
    loadError.value = t.value('error.loadResultFailed')
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
  <div class="min-h-screen bg-[rgb(var(--c-gray-50))] pb-32 pt-6">
    <!-- Main Content -->
    <div v-if="loading" class="max-w-640px mx-auto px-4 space-y-6">
      <p class="text-gray-400">{{ t('common.loading') }}</p>
    </div>

    <!-- 加载错误 -->
    <div v-else-if="loadError" class="max-w-640px mx-auto px-4 space-y-6 flex flex-col items-center justify-center min-h-screen">
      <p class="text-red-500 mb-4 text-center">{{ loadError }}</p>
      <div class="flex gap-3">
        <router-link
          to="/"
          class="text-primary hover:text-primary-dark text-sm underline"
        >
          {{ t('common.home') }}
        </router-link>
      </div>
    </div>

    <!-- 结果展示 -->
    <div v-else-if="quizResult && quizData" class="max-w-640px mx-auto px-4 space-y-6">
      <ResultCard
        :result="quizResult.result"
        :dimension-scores="quizResult.dimensionScores"
        :layout="quizData.resultLayout"
        @retake="handleRetake"
        @go-home="handleGoHome"
      />
    </div>
  </div>
</template>
