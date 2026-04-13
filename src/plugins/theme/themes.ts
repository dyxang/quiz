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
      'bg-pattern': 'radial-gradient(#1a1a1a 1px, transparent 1px)',
      'card-shadow': '4px 4px 0px 0px rgba(26, 26, 26, 1)', // 硬边阴影
      'btn-shadow': '2px 2px 0px 0px rgba(26, 26, 26, 1)',
      'font-heading': '"Space Mono", monospace, sans-serif'
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
      'bg-pattern': 'radial-gradient(#fcf9f2 1px, transparent 1px)',
      'card-shadow': '4px 4px 0px 0px rgba(252, 249, 242, 1)',
      'btn-shadow': '2px 2px 0px 0px rgba(252, 249, 242, 1)',
      'font-heading': '"Space Mono", monospace, sans-serif'
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
      'c-muted': '209, 213, 219',
      'bg': '#ffffff', // 纯白
      'fg': '#111827',
      'border': '#f3f4f6', // 极淡的边框
      'radius': '1.5rem', // 大圆角
      'bg-pattern': 'none',
      'card-shadow': '0 20px 40px -10px rgb(0 0 0 / 0.05)', // 柔和的大阴影
      'btn-shadow': 'none',
      'font-heading': 'system-ui, -apple-system, sans-serif'
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
      'btn-shadow': 'none',
      'font-heading': 'system-ui, -apple-system, sans-serif'
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
      'font-heading': '"Courier New", Courier, monospace'
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
      'font-heading': '"Courier New", Courier, monospace'
    }
  }
}
