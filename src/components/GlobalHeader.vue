<script setup lang="ts">
import ThemeToggle from './ThemeToggle.vue'
import LanguageToggle from './LanguageToggle.vue'
</script>

<template>
  <header class="sticky top-0 z-50 w-full border-b-[length:var(--border-width)] border-[rgb(var(--border))] bg-[rgb(var(--c-surface))]/80 backdrop-blur-md"
          :style="{ boxShadow: 'var(--btn-shadow)' }">
    <div class="max-w-640px mx-auto px-4 h-14 flex items-center justify-between">
      <!-- 占位，可以放 Logo 或标题，保持居中平衡 -->
      <div class="flex-1 flex items-center">
        <span class="text-sm font-bold text-primary tracking-wide font-[family:var(--font-display)]">QUIZLIGHT</span>
      </div>

      <div class="flex items-center gap-1">
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </div>
  </header>
</template>
