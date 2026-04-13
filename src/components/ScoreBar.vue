<!-- src/components/ScoreBar.vue -->
<script setup lang="ts">
import type { DimensionScore } from '@/core'
import { computed } from 'vue'

/** 组件 Props */
const props = defineProps<{
  /** 维度分数数据 */
  dimension: DimensionScore
  /** 是否显示维度名称标签，默认为 true */
  showLabel?: boolean
}>()

/** 反向百分比 */
const oppositePercentage = computed(() => {
  return 100 - props.dimension.percentage
})
</script>

<template>
  <div class="flex items-center gap-3 h-8">
    <!-- 维度名称 -->
    <span
      v-if="showLabel !== false"
      class="w-24 text-sm font-medium text-[rgb(var(--c-text-primary))] font-[family:var(--font-body)] flex-shrink-0 text-right"
    >
      {{ dimension.name }}
    </span>

    <!-- 条形容器 -->
    <div class="flex-1 h-full bg-[rgb(var(--border))] rounded-[length:var(--radius-md)] overflow-hidden flex">
      <!-- 正向维度填充 -->
      <div
        class="h-full transition-all duration-[var(--transition-speed,500ms)] rounded-l-[length:var(--radius-md)]"
        :style="{
          width: `${dimension.percentage}%`,
          backgroundColor: 'var(--primary)',
        }"
      />
      <!-- 反向维度填充 -->
      <div
        class="h-full transition-all duration-[var(--transition-speed,500ms)] rounded-r-[length:var(--radius-md)]"
        :style="{
          width: `${oppositePercentage}%`,
          backgroundColor: 'var(--muted)',
        }"
      />
    </div>

    <!-- 百分比数字 -->
    <span class="w-12 text-sm text-[rgb(var(--c-muted))] font-[family:var(--font-body)] text-right flex-shrink-0">
      {{ dimension.percentage }}%
    </span>
  </div>
</template>
