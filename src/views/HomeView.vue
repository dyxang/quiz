<!-- src/views/HomeView.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { validateQuiz } from '@/core'
import type { QuizMeta, QuizSchema } from '@/core'
import QuizCard from '@/components/QuizCard.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

/** 测试列表数据 */
const quizList = ref<QuizMeta[]>([])

/** 加载错误信息 */
const loadError = ref<string | null>(null)

onMounted(async () => {
  try {
    // 使用 import.meta.glob 扫描 quizzes/ 目录下的所有 JSON 文件
    const quizModules = import.meta.glob('/quizzes/*.json', { eager: true })

    for (const [path, module] of Object.entries(quizModules)) {
      // 获取 JSON 的默认导出
      const rawData = (module as Record<string, unknown>).default
      if (!rawData) continue

      // 使用 Zod 校验数据格式
      const validation = validateQuiz(rawData)
      if (!validation.success) {
        console.warn(`题库校验失败 [${path}]:`, validation.errors)
        continue
      }

      // 提取元信息
      const data = validation.data as QuizSchema
      quizList.value.push({
        id: data.id,
        title: data.title,
        description: data.description,
        questionCount: data.questions.length,
        version: data.version,
        author: data.author,
      })
    }
  } catch (error) {
    console.error('加载题库失败:', error)
    loadError.value = '加载题库失败，请刷新重试'
  }
})

/** 处理卡片点击，跳转到答题页 */
function handleCardClick(quizId: string) {
  router.push(`/quiz/${quizId}`)
}

function reload() {
  window.location.reload()
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 顶部导航 -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div class="max-w-640px mx-auto px-4 py-4">
        <h1 class="text-xl font-bold text-gray-900">QuizLight</h1>
        <p class="text-sm text-gray-500 mt-1">选择一个测试开始吧</p>
      </div>
    </header>

    <!-- 测试列表 -->
    <main class="max-w-640px mx-auto px-4 py-6">
      <!-- 加载错误提示 -->
      <div v-if="loadError" class="text-center py-12">
        <p class="text-red-500 mb-2">{{ loadError }}</p>
        <button
          class="text-primary hover:text-primary-dark text-sm underline"
          @click="reload"
        >
          刷新重试
        </button>
      </div>

      <!-- 空状态 -->
      <div v-else-if="quizList.length === 0" class="text-center py-12">
        <p class="text-gray-400">暂无可用测试</p>
      </div>

      <!-- 卡片列表 -->
      <div v-else class="space-y-4">
        <QuizCard
          v-for="quiz in quizList"
          :key="quiz.id"
          :quiz="quiz"
          @click="handleCardClick"
        />
      </div>
    </main>
  </div>
</template>
