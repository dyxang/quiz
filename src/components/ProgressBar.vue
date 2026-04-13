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
  <div class="sticky top-0 z-20 bg-white/80 backdrop-blur">
    <!-- 进度条 -->
    <div class="h-1 bg-gray-200 w-full">
      <div
        class="h-full transition-all duration-300"
        :style="{
          width: `${percentage}%`,
          backgroundColor: 'var(--primary)',
        }"
      />
    </div>
    <!-- 进度文字 -->
    <div class="text-xs text-gray-500 text-center py-2">
      {{ current }} / {{ total }}
    </div>
  </div>
</template>
