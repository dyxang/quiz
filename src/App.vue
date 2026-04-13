<!-- src/App.vue -->
<script setup lang="ts">
import { useRegisterSW } from 'virtual:pwa-register/vue'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()

const {
  offlineReady,
  needRefresh,
  updateServiceWorker,
} = useRegisterSW({
  onRegistered(r) {
    console.log('SW Registered:', r)
  },
  onRegisterError(error) {
    console.log('SW registration error', error)
  },
})

function close() {
  offlineReady.value = false
  needRefresh.value = false
}
</script>

<template>
  <router-view />

  <!-- PWA Reload Prompt -->
  <div
    v-if="offlineReady || needRefresh"
    class="fixed bottom-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 max-w-sm w-[calc(100%-2rem)] flex flex-col gap-3"
  >
    <div class="text-sm text-gray-700 dark:text-gray-200">
      <span v-if="offlineReady">
        {{ t('pwa.offlineReady') }}
      </span>
      <span v-else>
        {{ t('pwa.needRefresh') }}
      </span>
    </div>
    <div class="flex gap-2 justify-end">
      <button
        v-if="needRefresh"
        class="px-4 py-1.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors"
        @click="updateServiceWorker()"
      >
        {{ t('pwa.reload') }}
      </button>
      <button
        class="px-4 py-1.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        @click="close"
      >
        {{ t('pwa.close') }}
      </button>
    </div>
  </div>
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
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: var(--bg);
  color: var(--fg);
  min-height: 100vh;
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
</style>
