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
      'shadow-glow': 'none'
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
      'shadow-glow': 'none'
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
      'shadow-glow': '0 0 40px rgba(0, 0, 0, 0.03)'
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
      'shadow-glow': '0 0 40px rgba(255, 255, 255, 0.03)'
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
      'shadow-glow': 'none'
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
      'shadow-glow': 'none'
    }
  }
}
