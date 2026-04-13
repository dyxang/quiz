<!-- src/components/ProgressBar.vue -->
<script setup lang="ts">
import { computed } from 'vue'

/** 组件 Props */
const props = defineProps<{
  /** 当前题号（从 1 开始） */
  current: number
  /** 总题数 */
  total: number
}>()

/** 计算进度百分比 */
const percentage = computed(() => {
  if (props.total === 0) return 0
  return Math.round((props.current / props.total) * 100)
})
</script>

<template>
  <div class="sticky top-14 z-20 bg-[rgb(var(--c-surface))]/80 backdrop-blur">
    <!-- 进度条 -->
    <div class="h-1 bg-[rgb(var(--border))] w-full">
      <div
        class="h-full transition-all duration-[var(--transition-speed,300ms)]"
        :style="{
          width: `${percentage}%`,
          backgroundColor: 'var(--primary)',
        }"
      />
    </div>
    <!-- 进度文字 -->
    <div class="text-xs text-[rgb(var(--c-muted))] font-[family:var(--font-body)] text-center py-2 relative">
      {{ current }} / {{ total }}
      <div class="absolute right-4 top-1/2 -translate-y-1/2">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>
