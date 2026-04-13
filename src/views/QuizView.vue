<!-- src/views/QuizView.vue -->
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { validateQuiz } from '@/core'
import type { QuizSchema } from '@/core'
import { useQuizState } from '@/composables/useQuizState'
import ProgressBar from '@/components/ProgressBar.vue'
import Question from '@/components/Question.vue'

const route = useRoute()
const router = useRouter()
const quizId = route.params.id as string

/** 加载状态 */
const loading = ref(true)
const loadError = ref<string | null>(null)

/** 使用状态管理 composable */
const {
  currentQuestion,
  currentQuestionIndex,
  totalQuestions,
  selectedOptions,
  result,
  isFirstQuestion,
  isLastQuestion,
  loadQuiz,
  selectOption,
  nextQuestion,
  prevQuestion,
  getAnswersMap,
} = useQuizState()

/** 加载题库数据 */
onMounted(async () => {
  try {
    // 动态加载对应 ID 的题库 JSON
    const quizModules = import.meta.glob('/quizzes/*.json', { eager: true })

    // 查找匹配的题库文件
    let quizData: QuizSchema | null = null

    for (const [path, module] of Object.entries(quizModules)) {
      const rawData = (module as Record<string, unknown>).default
      if (!rawData) continue

      const validation = validateQuiz(rawData)
      if (!validation.success) continue

      const data = validation.data as QuizSchema
      if (data.id === quizId) {
        quizData = data
        break
      }
    }

    if (!quizData) {
      loadError.value = `未找到测试: ${quizId}`
      return
    }

    // 加载测验到状态管理
    loadQuiz(quizData)
  } catch (error) {
    console.error('加载题库失败:', error)
    loadError.value = '加载题库失败，请刷新重试'
  } finally {
    loading.value = false
  }
})

/** 监听结果变化，答完后保存答案并跳转到结果页 */
watch(result, (newResult) => {
  if (newResult) {
    // 将答案保存到 localStorage
    const storageKey = `quizlight-${quizId}`
    const answersMap = getAnswersMap()
    localStorage.setItem(storageKey, JSON.stringify(answersMap))
    router.push(`/result/${quizId}`)
  }
})

/** 处理下一题 */
function handleNext() {
  nextQuestion()
}

/** 处理上一题 */
function handlePrev() {
  prevQuestion()
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 加载中 -->
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <p class="text-gray-400">加载中...</p>
    </div>

    <!-- 加载错误 -->
    <div v-else-if="loadError" class="flex flex-col items-center justify-center min-h-screen">
      <p class="text-red-500 mb-4">{{ loadError }}</p>
      <router-link
        to="/"
        class="text-primary hover:text-primary-dark text-sm underline"
      >
        返回首页
      </router-link>
    </div>

    <!-- 答题界面 -->
    <div v-else-if="currentQuestion" class="max-w-640px mx-auto">
      <!-- 进度条 -->
      <ProgressBar
        :current="currentQuestionIndex + 1"
        :total="totalQuestions"
      />

      <!-- 题目区域 -->
      <div class="px-4 pb-32">
        <Question
          :question="currentQuestion"
          v-model="selectedOptions"
          :question-number="currentQuestionIndex + 1"
          :total-questions="totalQuestions"
        />
      </div>

      <!-- 底部操作栏 -->
      <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4">
        <div class="max-w-640px mx-auto flex items-center justify-between gap-3">
          <!-- 上一题按钮 -->
          <button
            class="flex-1 py-3 px-4 rounded-xl border-2 border-gray-200 text-gray-600
                   font-medium transition-colors duration-200
                   hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            :disabled="isFirstQuestion"
            @click="handlePrev"
          >
            上一题
          </button>

          <!-- 下一题 / 查看结果按钮 -->
          <button
            class="flex-1 py-3 px-4 rounded-xl text-white font-medium
                   transition-colors duration-200
                   disabled:opacity-40 disabled:cursor-not-allowed"
            :style="{
              backgroundColor: selectedOptions.length > 0 ? 'var(--primary)' : 'var(--muted)',
            }"
            :disabled="selectedOptions.length === 0"
            @click="handleNext"
          >
            {{ isLastQuestion ? '查看结果' : '下一题' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
