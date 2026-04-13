<!-- src/components/ResultCard.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import type { QuizResultDef, DimensionScore } from '@/core'
import { pluginRegistry } from '@/core'
import ScoreBar from './ScoreBar.vue'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()

/** 组件 Props */
const props = defineProps<{
  /** 结果定义对象 */
  result: QuizResultDef
  /** 各维度分数数组 */
  dimensionScores: DimensionScore[]
  /** 结果展示布局 */
  layout?: string
}>()

/** 组件事件 */
const emit = defineEmits<{
  /** 点击"重新测试"按钮时触发 */
  retake: []
  /** 点击"返回首页"按钮时触发 */
  goHome: []
}>()

/** 查找是否有匹配的自定义结果渲染器 */
const customRenderer = computed(() => {
  if (!props.layout) return null
  for (const plugin of pluginRegistry.getPlugins()) {
    if (plugin.customResultRenderers && plugin.customResultRenderers[props.layout]) {
      return plugin.customResultRenderers[props.layout]
    }
  }
  return null
})
</script>

<template>
  <!-- 如果有自定义渲染器，直接渲染 -->
  <component
    v-if="customRenderer"
    :is="customRenderer"
    :result="result"
    :dimensionScores="dimensionScores"
    @retake="emit('retake')"
    @goHome="emit('goHome')"
  />

  <!-- 否则使用默认渲染 -->
  <div v-else class="bg-white rounded-2xl shadow-lg p-6 max-w-640px mx-auto">
    <!-- 顶部：emoji + 结果名称 + ID 标签 -->
    <div class="text-center mb-6">
      <div class="text-5xl mb-3">{{ result.emoji }}</div>
      <h2 class="text-2xl font-bold text-gray-900 mb-2">{{ result.name }}</h2>
      <span
        class="inline-block px-3 py-1 rounded-full text-sm font-medium"
        :style="{
          backgroundColor: `${result.color}15`,
          color: result.color,
        }"
      >
        {{ result.id }}
      </span>
    </div>

    <!-- 描述区域 -->
    <p class="text-base text-gray-700 leading-relaxed mb-4">
      {{ result.description }}
    </p>

    <!-- 维度分数区域 -->
    <div v-if="dimensionScores.length > 0" class="border-t border-gray-100 pt-4 mt-4">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">{{ t('result.dimensionAnalysis') }}</h3>
      <div class="space-y-3">
        <ScoreBar
          v-for="ds in dimensionScores"
          :key="ds.dimensionId"
          :dimension="ds"
          :show-label="true"
        />
      </div>
    </div>

    <!-- 建议区域 -->
    <div class="border-t border-gray-100 pt-4 mt-4">
      <p class="border-l-4 pl-4 italic text-gray-600" :style="{ borderColor: 'var(--primary)' }">
        {{ result.advice }}
      </p>
    </div>

    <!-- 底部操作按钮 -->
    <div class="flex items-center justify-center gap-4 mt-6">
      <button
        class="py-2.5 px-6 rounded-xl text-white font-medium transition-colors duration-200
               hover:opacity-90"
        :style="{ backgroundColor: 'var(--primary)' }"
        @click="emit('retake')"
      >
        {{ t('common.retake') }}
      </button>
      <button
        class="py-2.5 px-6 rounded-xl border-2 border-gray-300 text-gray-700 font-medium
               transition-colors duration-200 hover:bg-gray-50"
        @click="emit('goHome')"
      >
        {{ t('common.home') }}
      </button>
    </div>
  </div>
</template>
