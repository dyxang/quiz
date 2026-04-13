// uno.config.ts
import { defineConfig, presetUno, presetAttributify } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
  ],
  theme: {
    colors: {
      primary: {
        DEFAULT: '#6366f1',
        light: '#818cf8',
        dark: '#4f46e5',
      },
      muted: '#9ca3af',
      white: 'rgba(var(--c-white), %alpha)',
      gray: {
        50: 'rgba(var(--c-gray-50), %alpha)',
        100: 'rgba(var(--c-gray-100), %alpha)',
        200: 'rgba(var(--c-gray-200), %alpha)',
        300: 'rgba(var(--c-gray-300), %alpha)',
        400: 'rgba(var(--c-gray-400), %alpha)',
        500: 'rgba(var(--c-gray-500), %alpha)',
        600: 'rgba(var(--c-gray-600), %alpha)',
        700: 'rgba(var(--c-gray-700), %alpha)',
        800: 'rgba(var(--c-gray-800), %alpha)',
        900: 'rgba(var(--c-gray-900), %alpha)',
        950: 'rgba(var(--c-gray-950), %alpha)',
      }
    },
  },
})
