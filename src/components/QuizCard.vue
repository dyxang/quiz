<!-- src/components/QuizCard.vue -->
<script setup lang="ts">
import type { QuizMeta } from '@/core'

/** 组件 Props */
const props = defineProps<{
  /** 测试元信息对象 */
  quiz: QuizMeta
}>()

/** 组件事件 */
const emit = defineEmits<{
  /** 点击卡片时触发，传递测试 ID */
  click: [quizId: string]
}>()

/** 处理卡片点击 */
function handleClick() {
  emit('click', props.quiz.id)
}
</script>

<template>
  <div
    class="bg-white rounded-xl shadow-md p-5 cursor-pointer
           hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
    @click="handleClick"
  >
    <!-- 标题 -->
    <h3 class="text-xl font-bold text-gray-900 mb-2">{{ quiz.title }}</h3>
    <!-- 描述 -->
    <p class="text-sm text-gray-500 line-clamp-2 mb-3">{{ quiz.description }}</p>
    <!-- 底部信息 -->
    <div class="flex items-center justify-between">
      <span class="text-xs text-gray-400">{{ quiz.author }}</span>
      <span class="bg-primary/10 text-primary px-2.5 py-0.5 rounded-full text-xs font-medium">
        {{ quiz.questionCount }} 题
      </span>
    </div>
  </div>
</template>
