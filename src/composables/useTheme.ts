import { ref, watch } from 'vue'

const THEME_KEY = 'quizlight-theme'

function getInitialTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light'
  
  const saved = localStorage.getItem(THEME_KEY)
  if (saved === 'light' || saved === 'dark') {
    return saved
  }
  
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }
  
  return 'light'
}

// 全局单例状态
const theme = ref<'light' | 'dark'>(getInitialTheme())

// 初始化应用时立即执行一次
if (typeof window !== 'undefined') {
  watch(theme, (newTheme) => {
    localStorage.setItem(THEME_KEY, newTheme)
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.add('light')
      document.documentElement.classList.remove('dark')
    }
  }, { immediate: true })
}

export function useTheme() {
  function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  return { theme, toggleTheme }
}
