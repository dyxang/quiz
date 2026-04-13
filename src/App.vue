<!-- src/App.vue -->
<script setup lang="ts">
</script>

<template>
  <router-view />
</template>

<style>
:root {
  --primary: #6366f1;
  --primary-light: #818cf8;
  --primary-dark: #4f46e5;
  --muted: #9ca3af;
  --bg: #ffffff;
  --fg: #111827;
  --border: #e5e7eb;
  --radius: 0.75rem;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: var(--bg);
  color: var(--fg);
  min-height: 100vh;
}
</style>
