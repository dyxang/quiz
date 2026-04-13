import { ThemeDefinition } from './index'

export const themeNeoBrutalism: ThemeDefinition = {
  id: 'neo-brutalism',
  name: '新粗野主义',
  tokens: {
    light: {
      'c-primary': '255, 90, 95', // 艳红色
      'c-primary-light': '255, 120, 125',
      'c-primary-dark': '230, 60, 65',
      'c-muted': '156, 163, 175',
      'bg': '#fcf9f2', // 暖白纸张色
      'fg': '#1a1a1a',
      'border': '#1a1a1a', // 纯黑粗边框
      'radius': '0px',
      'bg-pattern': 'radial-gradient(#1a1a1a 1.5px, transparent 1.5px)',
      'bg-pattern-size': '24px 24px',
      'card-shadow': '8px 8px 0px 0px rgba(26, 26, 26, 1)', // 硬边阴影
      'btn-shadow': '4px 4px 0px 0px rgba(26, 26, 26, 1)',
      'font-heading': '"Space Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
      'c-surface': '255, 255, 255',
      'c-text-primary': '26, 26, 26',
      'border-width': '4px',
      'font-body': '"Space Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
      'font-display': '"Space Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
      'radius-sm': '0px',
      'radius-md': '0px',
      'radius-lg': '0px',
      'shadow-glow': 'none',
      'logo-text': '#1a1a1a',
      'logo-font': '"Space Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
      'footer-text': 'rgba(156, 163, 175, 1)',
      'progress-bg': 'repeating-linear-gradient(45deg, #1a1a1a, #1a1a1a 10px, #fcf9f2 10px, #fcf9f2 20px)',
      'progress-animation': 'progress-wave 2s linear infinite'
    },
    dark: {
      'c-primary': '0, 255, 170', // 荧光绿
      'c-primary-light': '50, 255, 190',
      'c-primary-dark': '0, 200, 130',
      'c-muted': '107, 114, 128',
      'bg': '#1a1a1a',
      'fg': '#fcf9f2',
      'border': '#fcf9f2',
      'radius': '0px',
      'bg-pattern': 'radial-gradient(#fcf9f2 1.5px, transparent 1.5px)',
      'bg-pattern-size': '24px 24px',
      'card-shadow': '8px 8px 0px 0px rgba(252, 249, 242, 1)',
      'btn-shadow': '4px 4px 0px 0px rgba(252, 249, 242, 1)',
      'font-heading': '"Space Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
      'c-surface': '40, 40, 40',
      'c-text-primary': '252, 249, 242',
      'border-width': '4px',
      'font-body': '"Space Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
      'font-display': '"Space Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
      'radius-sm': '0px',
      'radius-md': '0px',
      'radius-lg': '0px',
      'shadow-glow': 'none',
      'logo-text': '#fcf9f2',
      'logo-font': '"Space Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
      'footer-text': 'rgba(107, 114, 128, 1)',
      'progress-bg': 'repeating-linear-gradient(45deg, #fcf9f2, #fcf9f2 10px, #1a1a1a 10px, #1a1a1a 20px)',
      'progress-animation': 'progress-wave 2s linear infinite'
    }
  }
}

export const themeMinimalistSpace: ThemeDefinition = {
  id: 'minimalist-space',
  name: '极简留白',
  tokens: {
    light: {
      'c-primary': '17, 24, 39', // 近黑
      'c-primary-light': '55, 65, 81',
      'c-primary-dark': '0, 0, 0',
      'c-muted': '156, 163, 175',
      'bg': '#fcfdfd', // 微暖的极简白
      'fg': '#111827',
      'border': '#f3f4f6', // 极淡的边框
      'radius': '1.5rem', // 大圆角
      'bg-pattern': 'none',
      'card-shadow': '0 20px 40px -10px rgb(0 0 0 / 0.05)', // 柔和的大阴影
      'btn-shadow': '0 10px 20px -5px rgb(0 0 0 / 0.05)',
      'font-heading': '"Playfair Display", "Merriweather", serif',
      'c-surface': '255, 255, 255',
      'c-text-primary': '17, 24, 39',
      'border-width': '1px',
      'font-body': '"Inter", system-ui, -apple-system, sans-serif',
      'font-display': '"Playfair Display", "Merriweather", serif',
      'radius-sm': '0.5rem',
      'radius-md': '1rem',
      'radius-lg': '1.5rem',
      'shadow-glow': '0 0 40px rgba(0, 0, 0, 0.03)',
      'logo-text': '#111827',
      'logo-font': '"Playfair Display", "Merriweather", serif',
      'footer-text': 'rgba(156, 163, 175, 1)',
      'progress-bg': 'rgba(17, 24, 39, 1)',
      'progress-animation': 'none'
    },
    dark: {
      'c-primary': '249, 250, 251', // 近白
      'c-primary-light': '255, 255, 255',
      'c-primary-dark': '229, 231, 235',
      'c-muted': '75, 85, 99',
      'bg': '#030712', // 极黑
      'fg': '#f9fafb',
      'border': '#1f2937',
      'radius': '1.5rem',
      'bg-pattern': 'none',
      'card-shadow': '0 20px 40px -10px rgb(0 0 0 / 0.5)',
      'btn-shadow': '0 10px 20px -5px rgb(0 0 0 / 0.5)',
      'font-heading': '"Playfair Display", "Merriweather", serif',
      'c-surface': '10, 10, 10',
      'c-text-primary': '249, 250, 251',
      'border-width': '1px',
      'font-body': '"Inter", system-ui, -apple-system, sans-serif',
      'font-display': '"Playfair Display", "Merriweather", serif',
      'radius-sm': '0.5rem',
      'radius-md': '1rem',
      'radius-lg': '1.5rem',
      'shadow-glow': '0 0 40px rgba(255, 255, 255, 0.03)',
      'logo-text': '#f9fafb',
      'logo-font': '"Playfair Display", "Merriweather", serif',
      'footer-text': 'rgba(75, 85, 99, 1)',
      'progress-bg': 'rgba(249, 250, 251, 1)',
      'progress-animation': 'none'
    }
  }
}

export const themeRetroMac: ThemeDefinition = {
  id: 'retro-mac',
  name: '拟物复古',
  tokens: {
    light: {
      'c-primary': '0, 0, 255', // 经典蓝
      'c-primary-light': '50, 50, 255',
      'c-primary-dark': '0, 0, 200',
      'c-muted': '153, 153, 153',
      'bg': '#e5e5e5', // 经典灰背景
      'fg': '#000000',
      'border': '#808080', // 经典灰边框
      'radius': '2px', // 微小圆角
      'bg-pattern': 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0.05) 4px)', // 扫描线纹理
      'card-shadow': 'inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf', // 经典 3D 边框
      'btn-shadow': 'inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf',
      'font-heading': '"Chicago", "Courier New", Courier, monospace',
      'c-surface': '229, 229, 229',
      'c-text-primary': '0, 0, 0',
      'border-width': '2px',
      'font-body': '"Courier New", Courier, monospace',
      'font-display': '"Chicago", "Courier New", Courier, monospace',
      'radius-sm': '0px',
      'radius-md': '0px',
      'radius-lg': '0px',
      'shadow-glow': 'none',
      'logo-text': '#0000ff',
      'logo-font': '"Chicago", "Courier New", Courier, monospace',
      'footer-text': 'rgba(153, 153, 153, 1)',
      'progress-bg': 'linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)',
      'progress-animation': 'progress-rainbow 3s linear infinite'
    },
    dark: {
      'c-primary': '255, 165, 0', // 琥珀色
      'c-primary-light': '255, 185, 50',
      'c-primary-dark': '200, 130, 0',
      'c-muted': '102, 102, 102',
      'bg': '#1a1a1a', // 深灰底
      'fg': '#00ff00', // 终端绿
      'border': '#00ff00',
      'radius': '2px',
      'bg-pattern': 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.05) 2px, rgba(0,255,0,0.05) 4px)',
      'card-shadow': 'inset -1px -1px #000000, inset 1px 1px #333333, inset -2px -2px #111111, inset 2px 2px #222222',
      'btn-shadow': 'inset -1px -1px #000000, inset 1px 1px #333333, inset -2px -2px #111111, inset 2px 2px #222222',
      'font-heading': '"Chicago", "Courier New", Courier, monospace',
      'c-surface': '34, 34, 34',
      'c-text-primary': '0, 255, 0',
      'border-width': '2px',
      'font-body': '"Courier New", Courier, monospace',
      'font-display': '"Chicago", "Courier New", Courier, monospace',
      'radius-sm': '0px',
      'radius-md': '0px',
      'radius-lg': '0px',
      'shadow-glow': 'none',
      'logo-text': '#ffa500',
      'logo-font': '"Chicago", "Courier New", Courier, monospace',
      'footer-text': 'rgba(102, 102, 102, 1)',
      'progress-bg': 'linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)',
      'progress-animation': 'progress-rainbow 3s linear infinite'
    }
  }
}

export const themeNotion: ThemeDefinition = {
  id: 'notion',
  name: 'Notion 极简',
  tokens: {
    light: {
      'c-primary': '55, 53, 47', // Notion text primary
      'c-primary-light': '100, 100, 100',
      'c-primary-dark': '30, 30, 30',
      'c-muted': '155, 154, 151',
      'bg': '#ffffff',
      'fg': '#37352f',
      'border': '#e9e9e7',
      'radius': '3px',
      'bg-pattern': 'none',
      'card-shadow': 'rgba(15, 15, 15, 0.1) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 2px 4px',
      'btn-shadow': 'rgba(15, 15, 15, 0.1) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 2px 4px',
      'font-heading': 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
      'c-surface': '255, 255, 255',
      'c-text-primary': '55, 53, 47',
      'border-width': '1px',
      'font-body': 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
      'font-display': 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
      'radius-sm': '3px',
      'radius-md': '4px',
      'radius-lg': '6px',
      'shadow-glow': 'none',
      'logo-text': '#37352f',
      'logo-font': 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
      'footer-text': 'rgba(55, 53, 47, 0.6)',
      'progress-bg': 'rgba(55, 53, 47, 1)',
      'progress-animation': 'none'
    },
    dark: {
      'c-primary': '255, 255, 255',
      'c-primary-light': '220, 220, 220',
      'c-primary-dark': '200, 200, 200',
      'c-muted': '155, 155, 155',
      'bg': '#191919',
      'fg': '#ffffff',
      'border': '#373737',
      'radius': '3px',
      'bg-pattern': 'none',
      'card-shadow': 'rgba(255, 255, 255, 0.1) 0px 0px 0px 1px, rgba(255, 255, 255, 0.1) 0px 2px 4px',
      'btn-shadow': 'rgba(255, 255, 255, 0.1) 0px 0px 0px 1px, rgba(255, 255, 255, 0.1) 0px 2px 4px',
      'font-heading': 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
      'c-surface': '32, 32, 32',
      'c-text-primary': '255, 255, 255',
      'border-width': '1px',
      'font-body': 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
      'font-display': 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
      'radius-sm': '3px',
      'radius-md': '4px',
      'radius-lg': '6px',
      'shadow-glow': 'none',
      'logo-text': '#ffffff',
      'logo-font': 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
      'footer-text': 'rgba(255, 255, 255, 0.6)',
      'progress-bg': 'rgba(255, 255, 255, 1)',
      'progress-animation': 'none'
    }
  }
}

export const themeDracula: ThemeDefinition = {
  id: 'dracula',
  name: 'Dracula 霓虹',
  tokens: {
    light: {
      'c-primary': '189, 147, 249', // Purple
      'c-primary-light': '255, 121, 198', // Pink
      'c-primary-dark': '139, 233, 253', // Cyan
      'c-muted': '98, 114, 164', // Comment
      'bg': '#282a36', // Background
      'fg': '#f8f8f2', // Foreground
      'border': '#6272a4',
      'radius': '8px',
      'bg-pattern': 'none',
      'card-shadow': '0 8px 32px rgba(0, 0, 0, 0.5)',
      'btn-shadow': '0 4px 12px rgba(189, 147, 249, 0.4)',
      'font-heading': '"Zhi Mang Xing", "Ma Shan Zheng", "STKaiti", "KaiTi", cursive',
      'c-surface': '68, 71, 90', // Current Line
      'c-text-primary': '248, 248, 242',
      'border-width': '2px',
      'font-body': 'system-ui, -apple-system, sans-serif',
      'font-display': '"Zhi Mang Xing", "Ma Shan Zheng", "STKaiti", "KaiTi", cursive',
      'radius-sm': '4px',
      'radius-md': '8px',
      'radius-lg': '12px',
      'shadow-glow': '0 0 10px rgba(189, 147, 249, 0.5)',
      'logo-text': '#ff79c6',
      'logo-font': '"Zhi Mang Xing", "Ma Shan Zheng", "STKaiti", "KaiTi", cursive',
      'logo-glow': '0 0 10px #ff79c6, 0 0 20px #bd93f9',
      'footer-text': 'rgba(98, 114, 164, 1)',
      'progress-bg': 'linear-gradient(90deg, #ff79c6, #bd93f9, #8be9fd, #50fa7b, #f1fa8c, #ffb86c, #ff5555)',
      'progress-animation': 'progress-rainbow 3s linear infinite'
    },
    dark: {
      'c-primary': '189, 147, 249',
      'c-primary-light': '255, 121, 198',
      'c-primary-dark': '139, 233, 253',
      'c-muted': '98, 114, 164',
      'bg': '#282a36',
      'fg': '#f8f8f2',
      'border': '#6272a4',
      'radius': '8px',
      'bg-pattern': 'none',
      'card-shadow': '0 8px 32px rgba(0, 0, 0, 0.5)',
      'btn-shadow': '0 4px 12px rgba(189, 147, 249, 0.4)',
      'font-heading': '"Zhi Mang Xing", "Ma Shan Zheng", "STKaiti", "KaiTi", cursive',
      'c-surface': '68, 71, 90',
      'c-text-primary': '248, 248, 242',
      'border-width': '2px',
      'font-body': 'system-ui, -apple-system, sans-serif',
      'font-display': '"Zhi Mang Xing", "Ma Shan Zheng", "STKaiti", "KaiTi", cursive',
      'radius-sm': '4px',
      'radius-md': '8px',
      'radius-lg': '12px',
      'shadow-glow': '0 0 10px rgba(189, 147, 249, 0.5)',
      'logo-text': '#ff79c6',
      'logo-font': '"Zhi Mang Xing", "Ma Shan Zheng", "STKaiti", "KaiTi", cursive',
      'logo-glow': '0 0 10px #ff79c6, 0 0 20px #bd93f9',
      'footer-text': 'rgba(98, 114, 164, 1)',
      'progress-bg': 'linear-gradient(90deg, #ff79c6, #bd93f9, #8be9fd, #50fa7b, #f1fa8c, #ffb86c, #ff5555)',
      'progress-animation': 'progress-rainbow 3s linear infinite'
    }
  }
}

export const themeGithub: ThemeDefinition = {
  id: 'github',
  name: 'Github 经典',
  tokens: {
    light: {
      'c-primary': '9, 105, 218', // Github blue
      'c-primary-light': '84, 174, 255',
      'c-primary-dark': '5, 80, 174',
      'c-muted': '101, 109, 118',
      'bg': '#ffffff',
      'fg': '#1f2328',
      'border': '#d0d7de',
      'radius': '6px',
      'bg-pattern': 'none',
      'card-shadow': '0 1px 3px rgba(31,35,40,0.12), 0 8px 24px rgba(66,74,83,0.12)',
      'btn-shadow': '0 1px 0 rgba(31,35,40,0.04)',
      'font-heading': 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
      'c-surface': '246, 248, 250',
      'c-text-primary': '31, 35, 40',
      'border-width': '1px',
      'font-body': 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
      'font-display': 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
      'radius-sm': '4px',
      'radius-md': '6px',
      'radius-lg': '8px',
      'shadow-glow': 'none',
      'logo-text': '#1f2328',
      'logo-font': 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
      'footer-text': 'rgba(101, 109, 118, 1)',
      'progress-bg': 'repeating-linear-gradient(90deg, #40c463, #40c463 12px, transparent 12px, transparent 16px)',
      'progress-animation': 'none'
    },
    dark: {
      'c-primary': '88, 166, 255',
      'c-primary-light': '121, 192, 255',
      'c-primary-dark': '56, 139, 253',
      'c-muted': '139, 148, 158',
      'bg': '#0d1117',
      'fg': '#e6edf3',
      'border': '#30363d',
      'radius': '6px',
      'bg-pattern': 'none',
      'card-shadow': '0 0 0 1px #30363d, 0 8px 24px rgba(1,4,9,0.8)',
      'btn-shadow': '0 0 0 1px #30363d',
      'font-heading': 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
      'c-surface': '22, 27, 34',
      'c-text-primary': '230, 237, 243',
      'border-width': '1px',
      'font-body': 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
      'font-display': 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
      'radius-sm': '4px',
      'radius-md': '6px',
      'radius-lg': '8px',
      'shadow-glow': 'none',
      'logo-text': '#e6edf3',
      'logo-font': 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
      'footer-text': 'rgba(139, 148, 158, 1)',
      'progress-bg': 'repeating-linear-gradient(90deg, #3fb950, #3fb950 12px, transparent 12px, transparent 16px)',
      'progress-animation': 'none'
    }
  }
}
