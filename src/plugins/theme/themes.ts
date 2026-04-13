import { ThemeDefinition } from './index'

export const themePlainDraft: ThemeDefinition = {
  id: 'plain-draft',
  name: '无印草稿纸',
  tokens: {
    light: {
      'c-primary': '71, 85, 105', // slate-600
      'c-primary-light': '100, 116, 139', // slate-500
      'c-primary-dark': '51, 65, 85', // slate-700
      'c-muted': '203, 213, 225', // slate-300
      'bg': '#ffffff',
      'fg': '#0f172a', // slate-900
      'border': '#f1f5f9', // slate-100 (very subtle)
      'radius': '0px',
    },
    dark: {
      'c-primary': '148, 163, 184', // slate-400
      'c-primary-light': '203, 213, 225', // slate-300
      'c-primary-dark': '100, 116, 139', // slate-500
      'c-muted': '71, 85, 105', // slate-600
      'bg': '#0f172a',
      'fg': '#f8fafc',
      'border': '#1e293b', // slate-800
      'radius': '0px',
    }
  }
}

export const themeGraphiteCalm: ThemeDefinition = {
  id: 'graphite-calm',
  name: '自然石墨',
  tokens: {
    light: {
      'c-primary': '55, 65, 81', // gray-700
      'c-primary-light': '75, 85, 99', // gray-600
      'c-primary-dark': '31, 41, 55', // gray-800
      'c-muted': '156, 163, 175', // gray-400
      'bg': '#f9fafb', // gray-50
      'fg': '#111827', // gray-900
      'border': '#e5e7eb', // gray-200
      'radius': '0.375rem', // sm
    },
    dark: {
      'c-primary': '156, 163, 175', // gray-400
      'c-primary-light': '209, 213, 219', // gray-300
      'c-primary-dark': '107, 114, 128', // gray-500
      'c-muted': '55, 65, 81', // gray-700
      'bg': '#111827', // gray-900
      'fg': '#f9fafb', // gray-50
      'border': '#374151', // gray-700
      'radius': '0.375rem',
    }
  }
}

export const themeMonochromeSharp: ThemeDefinition = {
  id: 'monochrome-sharp',
  name: '黑白硬边',
  tokens: {
    light: {
      'c-primary': '0, 0, 0', // black
      'c-primary-light': '64, 64, 64', // neutral-700
      'c-primary-dark': '0, 0, 0', // black
      'c-muted': '163, 163, 163', // neutral-400
      'bg': '#ffffff', // white
      'fg': '#000000', // black
      'border': '#000000', // black
      'radius': '0px',
    },
    dark: {
      'c-primary': '255, 255, 255', // white
      'c-primary-light': '212, 212, 212', // neutral-300
      'c-primary-dark': '255, 255, 255', // white
      'c-muted': '82, 82, 82', // neutral-600
      'bg': '#000000', // black
      'fg': '#ffffff', // white
      'border': '#ffffff', // white
      'radius': '0px',
    }
  }
}
