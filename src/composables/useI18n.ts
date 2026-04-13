import { ref, computed, watch } from 'vue'

type Locale = 'zh' | 'en'

const dictionaries = {
  zh: {
    home: {
      subtitle: '选择一个测试开始吧',
      loadError: '加载题库失败，请刷新重试',
      noQuiz: '暂无可用测试',
    },
    common: {
      retry: '刷新重试',
      questions: '题',
      loading: '加载中...',
      home: '返回首页',
      retake: '重新测试',
    },
    error: {
      quizNotFound: '未找到测试: {id}',
      loadFailed: '加载题库失败，请刷新重试',
      noRecord: '未找到答题记录，请重新测试',
      incomplete: '答案不完整，请重新完成测试',
      loadResultFailed: '加载结果失败，请刷新重试',
    },
    quiz: {
      prev: '上一题',
      next: '下一题',
      viewResult: '查看结果',
    },
    result: {
      dimensionAnalysis: '维度分析',
    },
    theme: {
      toggle: '切换深色/浅色模式',
    },
    pwa: {
      offlineReady: '应用已就绪，支持离线访问',
      needRefresh: '发现新内容，点击刷新按钮以更新',
      reload: '刷新',
      close: '关闭',
    },
    i18n: {
      toggle: '切换语言 / Toggle Language',
    },
  },
  en: {
    home: {
      subtitle: 'Choose a quiz to start',
      loadError: 'Failed to load quizzes, please refresh and try again',
      noQuiz: 'No quizzes available',
    },
    common: {
      retry: 'Refresh & Retry',
      questions: 'Qs',
      loading: 'Loading...',
      home: 'Back to Home',
      retake: 'Retake Quiz',
    },
    error: {
      quizNotFound: 'Quiz not found: {id}',
      loadFailed: 'Failed to load quiz, please refresh and try again',
      noRecord: 'No record found, please retake the quiz',
      incomplete: 'Incomplete answers, please retake the quiz',
      loadResultFailed: 'Failed to load result, please refresh and try again',
    },
    quiz: {
      prev: 'Previous',
      next: 'Next',
      viewResult: 'View Result',
    },
    result: {
      dimensionAnalysis: 'Dimension Analysis',
    },
    theme: {
      toggle: 'Toggle Dark/Light Mode',
    },
    pwa: {
      offlineReady: 'App ready to work offline',
      needRefresh: 'New content available, click on reload button to update.',
      reload: 'Reload',
      close: 'Close',
    },
    i18n: {
      toggle: '切换语言 / Toggle Language',
    },
  },
}

const STORAGE_KEY = 'quizlight-locale'

// Get initial locale from localStorage or browser settings
const getInitialLocale = (): Locale => {
  const stored = localStorage.getItem(STORAGE_KEY) as Locale
  if (stored && ['zh', 'en'].includes(stored)) {
    return stored
  }
  const browserLang = navigator.language.toLowerCase()
  if (browserLang.startsWith('zh')) {
    return 'zh'
  }
  return 'en'
}

const locale = ref<Locale>(getInitialLocale())

watch(locale, (newLocale) => {
  localStorage.setItem(STORAGE_KEY, newLocale)
})

export function useI18n() {
  const t = computed(() => {
    return (key: string, params?: Record<string, string>) => {
      const keys = key.split('.')
      let value: any = dictionaries[locale.value]
      for (const k of keys) {
        if (value === undefined) break
        value = value[k]
      }
      if (typeof value !== 'string') {
        return key
      }
      if (params) {
        return value.replace(/\{(\w+)\}/g, (_, match) => params[match] || '')
      }
      return value
    }
  })

  const toggleLocale = () => {
    locale.value = locale.value === 'zh' ? 'en' : 'zh'
  }

  return {
    locale,
    t,
    toggleLocale,
  }
}
