<!-- src/views/ResultView.vue -->
<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
const quizId = route.params.id as string
</script>

<template>
  <div class="min-h-screen p-6">
    <p>结果页 — 测试 ID: {{ quizId }}（待实现）</p>
  </div>
</template>
