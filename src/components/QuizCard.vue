<!-- src/components/QuizCard.vue -->
<script setup lang="ts">
import type { QuizMeta } from '@/core'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()

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
    class="bg-[rgb(var(--bg))] rounded-[var(--radius)] p-5 cursor-pointer
           border border-[rgb(var(--border))] transition-all duration-200"
    :style="{ boxShadow: 'var(--card-shadow)' }"
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
        {{ quiz.questionCount }} {{ t('common.questions') }}
      </span>
    </div>
  </div>
</template>
