/* src/App.vue */
<template>
  <div class="flex flex-col min-h-screen">
    <GlobalHeader />
    <main class="flex-1">
      <router-view />
    </main>
    <GlobalFooter />
  </div>
</template>

<script setup lang="ts">
import GlobalHeader from '@/components/GlobalHeader.vue'
import GlobalFooter from '@/components/GlobalFooter.vue'
</script>

<style>
:root {
  --primary: rgb(var(--c-primary));
  --primary-light: rgb(var(--c-primary-light));
  --primary-dark: rgb(var(--c-primary-dark));
  --muted: rgb(var(--c-muted));
  --bg: #ffffff;
  --fg: #111827;
  --border: #e5e7eb;
  --radius: 0.75rem;

  /* Extended Theme Tokens */
  --c-surface: 255, 255, 255;
  --c-text-primary: 17, 24, 39;
  --border-width: 1px;
  --font-body: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-display: inherit;
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --shadow-glow: 0 0 10px rgba(0, 0, 0, 0.1);
  --bg-pattern: none;
  --transition-speed: 200ms;
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --btn-shadow: var(--shadow-sm);
  --card-shadow: var(--shadow-md);
  --font-heading: inherit;

  /* New Tokens */
  --logo-text: var(--fg);
  --logo-font: var(--font-display);
  --footer-text: rgb(var(--c-muted));
  --progress-bg: rgb(var(--c-primary));
  --progress-animation: none;

  /* Theme Colors */
  --c-primary: 99, 102, 241; /* #6366f1 */
  --c-primary-light: 129, 140, 248; /* #818cf8 */
  --c-primary-dark: 79, 70, 229; /* #4f46e5 */
  --c-muted: 156, 163, 175; /* #9ca3af */

  /* Default Light Mode Colors (Tailwind Gray Scale) */
  --c-white: 255, 255, 255;
  --c-gray-50: 249, 250, 251;
  --c-gray-100: 243, 244, 246;
  --c-gray-200: 229, 231, 235;
  --c-gray-300: 209, 213, 219;
  --c-gray-400: 156, 163, 175;
  --c-gray-500: 107, 114, 128;
  --c-gray-600: 75, 85, 99;
  --c-gray-700: 55, 65, 81;
  --c-gray-800: 31, 41, 55;
  --c-gray-900: 17, 24, 39;
  --c-gray-950: 3, 7, 18;
}

/* Dark mode overrides (.dark class) */
:root.dark {
  --bg: #111827;
  --fg: #f9fafb;
  --border: #374151;

  --c-surface: 31, 41, 55;
  --c-text-primary: 249, 250, 251;
  --shadow-glow: 0 0 10px rgba(255, 255, 255, 0.1);

  --c-white: 17, 24, 39;
  --c-gray-50: 31, 41, 55;
  --c-gray-100: 55, 65, 81;
  --c-gray-200: 75, 85, 99;
  --c-gray-300: 107, 114, 128;
  --c-gray-400: 156, 163, 175;
  --c-gray-500: 209, 213, 219;
  --c-gray-600: 229, 231, 235;
  --c-gray-700: 243, 244, 246;
  --c-gray-800: 249, 250, 251;
  --c-gray-900: 255, 255, 255;
  --c-gray-950: 255, 255, 255;
}

/* Dark mode overrides (system preference) */
@media (prefers-color-scheme: dark) {
  :root:not(.light) {
    --bg: #111827;
    --fg: #f9fafb;
    --border: #374151;

    --c-surface: 31, 41, 55;
    --c-text-primary: 249, 250, 251;
    --shadow-glow: 0 0 10px rgba(255, 255, 255, 0.1);

    --c-white: 17, 24, 39;
    --c-gray-50: 31, 41, 55;
    --c-gray-100: 55, 65, 81;
    --c-gray-200: 75, 85, 99;
    --c-gray-300: 107, 114, 128;
    --c-gray-400: 156, 163, 175;
    --c-gray-500: 209, 213, 219;
    --c-gray-600: 229, 231, 235;
    --c-gray-700: 243, 244, 246;
    --c-gray-800: 249, 250, 251;
    --c-gray-900: 255, 255, 255;
    --c-gray-950: 255, 255, 255;
  }
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-body);
  background-color: var(--bg);
  background-image: var(--bg-pattern);
  background-size: var(--bg-pattern-size, auto);
  color: var(--fg);
  min-height: 100vh;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display);
}

/* 响应式容器 */
.max-w-640px {
  max-width: 640px;
}

/* 文本截断 */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 安全区域（适配 iPhone 底部横条） */
@supports (padding-bottom: env(safe-area-inset-bottom)) {
  .fixed.bottom-0 {
    padding-bottom: calc(1rem + env(safe-area-inset-bottom));
  }
}

@keyframes progress-wave {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 28px 0;
  }
}

@keyframes progress-rainbow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
