<!-- src/components/Question.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import type { Question as QuestionType } from '@/core'
import { pluginRegistry } from '@/core'

/** 组件 Props */
const props = defineProps<{
  /** 当前题目对象 */
  question: QuestionType
  /** 当前选中的选项索引数组（v-model 绑定） */
  modelValue: number[]
  /** 当前题号（从 1 开始） */
  questionNumber: number
  /** 总题数 */
  totalQuestions: number
}>()

/** 组件事件 */
const emit = defineEmits<{
  /** v-model 更新事件 */
  'update:modelValue': [value: number[]]
}>()

/** 查找是否有匹配的自定义题型渲染器 */
const customRenderer = computed(() => {
  const type = props.question.type
  for (const plugin of pluginRegistry.getPlugins()) {
    if (plugin.customQuestionRenderers && plugin.customQuestionRenderers[type]) {
      return plugin.customQuestionRenderers[type]
    }
  }
  return null
})

/** 处理选项点击 */
function handleOptionClick(optionIndex: number) {
  if (props.question.type === 'single') {
    // 单选题：直接替换
    emit('update:modelValue', [optionIndex])
  } else {
    // 多选题：切换选中状态
    const newValue = [...props.modelValue]
    const existingIndex = newValue.indexOf(optionIndex)
    if (existingIndex >= 0) {
      newValue.splice(existingIndex, 1)
    } else {
      newValue.push(optionIndex)
    }
    emit('update:modelValue', newValue)
  }
}

/** 判断选项是否被选中 */
function isSelected(optionIndex: number): boolean {
  return props.modelValue.includes(optionIndex)
}
</script>

<template>
  <div class="py-4">
    <!-- 如果有自定义渲染器，直接渲染 -->
    <component
      v-if="customRenderer"
      :is="customRenderer"
      :question="question"
      :modelValue="modelValue"
      :questionNumber="questionNumber"
      :totalQuestions="totalQuestions"
      @update:modelValue="(val: number[]) => emit('update:modelValue', val)"
    />
    
    <!-- 否则使用默认渲染 -->
    <template v-else>
      <!-- 题号 -->
      <p class="text-sm text-[rgb(var(--c-muted))] font-[family:var(--font-body)] mb-2">{{ questionNumber }} / {{ totalQuestions }}</p>

      <!-- 题目图片（如果有） -->
      <img
        v-if="question.image"
        :src="question.image"
        :alt="question.text"
        class="w-full rounded-[length:var(--radius-md)] mb-4 object-cover max-h-48"
      />

      <!-- 题目文本 -->
      <h2 class="text-lg font-semibold text-[rgb(var(--c-text-primary))] font-[family:var(--font-display)] mb-6 leading-relaxed">
        {{ question.text }}
      </h2>

      <!-- 选项列表 -->
      <div class="space-y-3">
        <button
          v-for="(option, index) in question.options"
          :key="index"
          class="w-full text-left p-4 rounded-[length:var(--radius-md)] border-[length:var(--border-width)] transition-all duration-[var(--transition-speed,200ms)]
                 flex items-center gap-3 cursor-pointer font-[family:var(--font-body)]
                 hover:bg-[rgb(var(--c-gray-50))] bg-[rgb(var(--c-surface))]"
          :class="{
            'border-primary bg-primary/10 text-primary': isSelected(index),
            'border-[rgb(var(--border))] text-[rgb(var(--c-text-primary))]': !isSelected(index),
          }"
          :style="{ boxShadow: 'var(--btn-shadow)' }"
          @click="handleOptionClick(index)"
        >
          <!-- 单选指示器 -->
          <span
            v-if="question.type === 'single'"
            class="flex-shrink-0 w-5 h-5 rounded-full border-[length:var(--border-width)] flex items-center justify-center transition-colors"
            :class="{
              'border-primary': isSelected(index),
              'border-[rgb(var(--border))]': !isSelected(index),
            }"
          >
            <span
              v-if="isSelected(index)"
              class="w-2.5 h-2.5 rounded-full bg-primary"
            />
          </span>

          <!-- 多选指示器 -->
          <span
            v-else
            class="flex-shrink-0 w-5 h-5 rounded-[length:var(--radius-sm)] border-[length:var(--border-width)] flex items-center justify-center transition-colors"
            :class="{
              'border-primary bg-primary': isSelected(index),
              'border-[rgb(var(--border))]': !isSelected(index),
            }"
          >
            <svg
              v-if="isSelected(index)"
              class="w-3 h-3 text-[rgb(var(--bg))]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="3"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </span>

          <!-- 选项文本 -->
          <span class="text-base text-[rgb(var(--c-text-primary))] leading-relaxed">{{ option.label }}</span>
        </button>
      </div>
    </template>
  </div>
</template>
