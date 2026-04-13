import type { QuizPlugin } from '@/core'

export type ThemeTokenKey = 
  | 'c-surface'
  | 'c-text-primary'
  | 'border-width'
  | 'font-body'
  | 'font-display'
  | 'radius-sm'
  | 'radius-md'
  | 'radius-lg'
  | 'shadow-glow'
  | string

export interface ThemeTokens {
  light: Record<ThemeTokenKey, string>
  dark: Record<ThemeTokenKey, string>
}

export interface ThemeDefinition {
  id: string
  name: string
  tokens: ThemeTokens
}

class ThemeManager {
  private themes = new Map<string, ThemeDefinition>()
  private styleElement: HTMLStyleElement | null = null

  registerTheme(theme: ThemeDefinition) {
    this.themes.set(theme.id, theme)
  }

  applyTheme(themeId: string) {
    const theme = this.themes.get(themeId)
    if (!theme) {
      console.warn(`Theme "${themeId}" not found, falling back to default.`)
      this.clearTheme()
      return
    }

    if (!this.styleElement) {
      this.styleElement = document.createElement('style')
      this.styleElement.id = 'quizlight-theme-plugin'
      document.head.appendChild(this.styleElement)
    }

    const lightVars = Object.entries(theme.tokens.light)
      .map(([key, value]) => `  --${key}: ${value};`)
      .join('\n')

    const darkVars = Object.entries(theme.tokens.dark)
      .map(([key, value]) => `  --${key}: ${value};`)
      .join('\n')

    this.styleElement.textContent = `
:root[data-ql-theme="${themeId}"] {
${lightVars}
}
:root.dark[data-ql-theme="${themeId}"] {
${darkVars}
}
@media (prefers-color-scheme: dark) {
  :root[data-ql-theme="${themeId}"]:not(.light) {
${darkVars}
  }
}
`
    document.documentElement.setAttribute('data-ql-theme', themeId)
  }

  clearTheme() {
    document.documentElement.removeAttribute('data-ql-theme')
    if (this.styleElement) {
      this.styleElement.remove()
      this.styleElement = null
    }
  }
}

export const themeManager = new ThemeManager()

export const ThemeManagerPlugin: QuizPlugin = {
  name: 'theme-manager',
  onQuizLoad(quizData) {
    if (quizData.themeId) {
      themeManager.applyTheme(quizData.themeId)
    } else {
      themeManager.clearTheme()
    }
  }
}
