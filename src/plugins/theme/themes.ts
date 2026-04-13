import { ThemeDefinition } from './index'

export const themeNeoBrutalism: ThemeDefinition = {
  id: 'neo-brutalism',
  name: '新粗野主义',
  tokens: {
    light: {
      'c-primary': '255, 62, 108', // 更具活力的粉红色
      'c-primary-light': '255, 107, 142',
      'c-primary-dark': '220, 38, 85',
      'c-muted': '107, 114, 128',
      'bg': '#fdfbf7', // 更加通透的米白纸张色
      'fg': '#0f1419', // 深邃沉稳的黑
      'border': '#0f1419',
      'radius': '0px',
      'bg-pattern': 'radial-gradient(#0f1419 1px, transparent 1px)',
      'bg-pattern-size': '24px 24px',
      'card-shadow': '6px 6px 0px 0px #0f1419', // 稍微收敛阴影，减轻笨重感
      'btn-shadow': '4px 4px 0px 0px #0f1419',
      'font-heading': '"Space Grotesk", "Space Mono", ui-monospace, monospace', // 引入具有设计感的现代无衬线体
      'c-surface': '255, 255, 255',
      'c-text-primary': '15, 20, 25',
      'border-width': '3px', // 从 4px 降为 3px，粗旷中带点精致
      'font-body': '"Space Grotesk", system-ui, -apple-system, sans-serif',
      'font-display': '"Space Grotesk", "Space Mono", ui-monospace, monospace',
      'radius-sm': '0px',
      'radius-md': '0px',
      'radius-lg': '0px',
      'shadow-glow': 'none',
      'logo-text': '#0f1419',
      'logo-font': '"Space Grotesk", "Space Mono", ui-monospace, monospace',
      'footer-text': 'rgba(107, 114, 128, 1)',
      'progress-bg': 'repeating-linear-gradient(45deg, #0f1419, #0f1419 10px, #fdfbf7 10px, #fdfbf7 20px)',
      'progress-animation': 'progress-wave 2s linear infinite'
    },
    dark: {
      'c-primary': '186, 230, 126', // 柔和高级的荧光绿
      'c-primary-light': '210, 245, 160',
      'c-primary-dark': '140, 190, 80',
      'c-muted': '156, 163, 175',
      'bg': '#0f1419', // 不再使用死黑
      'fg': '#fdfbf7',
      'border': '#fdfbf7',
      'radius': '0px',
      'bg-pattern': 'radial-gradient(rgba(253, 251, 247, 0.15) 1.5px, transparent 1.5px)', // 弱化暗黑模式下的点阵，避免眼花
      'bg-pattern-size': '24px 24px',
      'card-shadow': '6px 6px 0px 0px #fdfbf7',
      'btn-shadow': '4px 4px 0px 0px #fdfbf7',
      'font-heading': '"Space Grotesk", "Space Mono", ui-monospace, monospace',
      'c-surface': '25, 30, 36', // 提亮卡片背景层，增加层次
      'c-text-primary': '253, 251, 247',
      'border-width': '3px',
      'font-body': '"Space Grotesk", system-ui, -apple-system, sans-serif',
      'font-display': '"Space Grotesk", "Space Mono", ui-monospace, monospace',
      'radius-sm': '0px',
      'radius-md': '0px',
      'radius-lg': '0px',
      'shadow-glow': 'none',
      'logo-text': '#fdfbf7',
      'logo-font': '"Space Grotesk", "Space Mono", ui-monospace, monospace',
      'footer-text': 'rgba(156, 163, 175, 1)',
      'progress-bg': 'repeating-linear-gradient(45deg, #fdfbf7, #fdfbf7 10px, #0f1419 10px, #0f1419 20px)',
      'progress-animation': 'progress-wave 2s linear infinite'
    }
  }
}

export const themeMinimalistSpace: ThemeDefinition = {
  id: 'minimalist-space',
  name: '极简留白',
  tokens: {
    light: {
      'c-primary': '17, 24, 39',
      'c-primary-light': '55, 65, 81',
      'c-primary-dark': '0, 0, 0',
      'c-muted': '107, 114, 128',
      'bg': '#fafafa', // 更高级通透的极简白
      'fg': '#111827',
      'border': '#e5e7eb', // 加深边框线，增加边界感
      'radius': '24px', // 统一圆角使用 px
      'bg-pattern': 'none',
      'card-shadow': '0 10px 30px -10px rgba(0, 0, 0, 0.08)', // 减轻阴影黑度，让页面更轻盈
      'btn-shadow': '0 4px 12px -4px rgba(0, 0, 0, 0.08)',
      'font-heading': '"Playfair Display", "Merriweather", serif',
      'c-surface': '255, 255, 255',
      'c-text-primary': '17, 24, 39',
      'border-width': '1px',
      'font-body': '"Inter", system-ui, -apple-system, sans-serif',
      'font-display': '"Playfair Display", "Merriweather", serif',
      'radius-sm': '8px',
      'radius-md': '16px',
      'radius-lg': '24px',
      'shadow-glow': 'none', // 移除冗余的 glow，保持极简
      'logo-text': '#111827',
      'logo-font': '"Playfair Display", "Merriweather", serif',
      'footer-text': 'rgba(107, 114, 128, 1)',
      'progress-bg': 'rgba(17, 24, 39, 1)',
      'progress-animation': 'none'
    },
    dark: {
      'c-primary': '249, 250, 251',
      'c-primary-light': '255, 255, 255',
      'c-primary-dark': '209, 213, 219',
      'c-muted': '156, 163, 175',
      'bg': '#09090b', // 更中性的深邃黑 (Zinc)
      'fg': '#f9fafb',
      'border': '#27272a',
      'radius': '24px',
      'bg-pattern': 'none',
      'card-shadow': '0 10px 30px -10px rgba(0, 0, 0, 0.8)', // 极黑环境下的阴影
      'btn-shadow': '0 4px 12px -4px rgba(0, 0, 0, 0.8)',
      'font-heading': '"Playfair Display", "Merriweather", serif',
      'c-surface': '24, 24, 27', // 提升层级对比度，与背景拉开差距
      'c-text-primary': '249, 250, 251',
      'border-width': '1px',
      'font-body': '"Inter", system-ui, -apple-system, sans-serif',
      'font-display': '"Playfair Display", "Merriweather", serif',
      'radius-sm': '8px',
      'radius-md': '16px',
      'radius-lg': '24px',
      'shadow-glow': 'none',
      'logo-text': '#f9fafb',
      'logo-font': '"Playfair Display", "Merriweather", serif',
      'footer-text': 'rgba(156, 163, 175, 1)',
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
      'c-primary': '0, 0, 170', // 更复古、沉稳的深蓝
      'c-primary-light': '50, 50, 200',
      'c-primary-dark': '0, 0, 130',
      'c-muted': '102, 102, 102',
      'bg': '#dfdfdf', // 经典 Mac OS 灰底
      'fg': '#000000',
      'border': '#000000', // 纯黑边框增强复古线条感
      'radius': '0px',
      'bg-pattern': 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
      'card-shadow': 'inset -2px -2px 0px #808080, inset 2px 2px 0px #ffffff, 2px 2px 0px rgba(0,0,0,0.2)', // 改善复杂的 3D 阴影并添加外阴影
      'btn-shadow': 'inset -2px -2px 0px #808080, inset 2px 2px 0px #ffffff',
      'font-heading': '"Chicago", "Pixelify Sans", "Courier New", Courier, monospace',
      'c-surface': '204, 204, 204',
      'c-text-primary': '0, 0, 0',
      'border-width': '2px',
      'font-body': '"Courier New", Courier, monospace',
      'font-display': '"Chicago", "Pixelify Sans", "Courier New", Courier, monospace',
      'radius-sm': '0px',
      'radius-md': '0px',
      'radius-lg': '0px',
      'shadow-glow': 'none',
      'logo-text': '#000000',
      'logo-font': '"Chicago", "Pixelify Sans", "Courier New", Courier, monospace',
      'footer-text': 'rgba(102, 102, 102, 1)',
      'progress-bg': 'repeating-linear-gradient(45deg, #000, #000 10px, #fff 10px, #fff 20px)', // 替换刺眼的彩虹色为斑马纹
      'progress-animation': 'progress-wave 2s linear infinite'
    },
    dark: {
      'c-primary': '255, 176, 0', // 琥珀终端色
      'c-primary-light': '255, 200, 80',
      'c-primary-dark': '200, 130, 0',
      'c-muted': '0, 150, 0', // 暗绿色注释风格
      'bg': '#121212', // 极深灰 CRT 屏幕底
      'fg': '#ffb000',
      'border': '#ffb000',
      'radius': '0px',
      'bg-pattern': 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,176,0,0.05) 2px, rgba(255,176,0,0.05) 4px)',
      'card-shadow': '0px 0px 15px rgba(255, 176, 0, 0.15)', // 荧光外发光，去除浑浊内阴影
      'btn-shadow': '0px 0px 10px rgba(255, 176, 0, 0.2)',
      'font-heading': '"VT323", "Courier New", Courier, monospace',
      'c-surface': '26, 26, 26',
      'c-text-primary': '255, 176, 0',
      'border-width': '2px',
      'font-body': '"VT323", "Courier New", Courier, monospace',
      'font-display': '"VT323", "Courier New", Courier, monospace',
      'radius-sm': '0px',
      'radius-md': '0px',
      'radius-lg': '0px',
      'shadow-glow': '0 0 20px rgba(255, 176, 0, 0.3)',
      'logo-text': '#ffb000',
      'logo-font': '"VT323", "Courier New", Courier, monospace',
      'footer-text': 'rgba(255, 176, 0, 0.6)',
      'progress-bg': '#ffb000',
      'progress-animation': 'none'
    }
  }
}

export const themeNotion: ThemeDefinition = {
  id: 'notion',
  name: 'Notion 极简',
  tokens: {
    light: {
      'c-primary': '55, 53, 47',
      'c-primary-light': '100, 100, 100',
      'c-primary-dark': '30, 30, 30',
      'c-muted': '155, 154, 151',
      'bg': '#ffffff',
      'fg': '#37352f',
      'border': '#e9e9e7',
      'radius': '4px', // 稍微圆润一点
      'bg-pattern': 'none',
      'card-shadow': 'rgba(15, 15, 15, 0.05) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 3px 6px, rgba(15, 15, 15, 0.05) 0px 9px 24px', // 更贴近 Notion 真实的悬浮阴影
      'btn-shadow': 'rgba(15, 15, 15, 0.1) 0px 1px 2px',
      'font-heading': 'ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif', // 弃用通篇衬线，回归标准无衬线
      'c-surface': '255, 255, 255',
      'c-text-primary': '55, 53, 47',
      'border-width': '1px',
      'font-body': 'ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
      'font-display': 'ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
      'radius-sm': '3px',
      'radius-md': '4px',
      'radius-lg': '6px',
      'shadow-glow': 'none',
      'logo-text': '#37352f',
      'logo-font': 'ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
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
      'border': '#373737', // 提升对比度
      'radius': '4px',
      'bg-pattern': 'none',
      'card-shadow': 'rgba(0, 0, 0, 0.4) 0px 0px 0px 1px, rgba(0, 0, 0, 0.5) 0px 3px 6px', // 修复原版错误的白色阴影
      'btn-shadow': 'rgba(0, 0, 0, 0.4) 0px 1px 2px',
      'font-heading': 'ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
      'c-surface': '32, 32, 32',
      'c-text-primary': '255, 255, 255',
      'border-width': '1px',
      'font-body': 'ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
      'font-display': 'ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
      'radius-sm': '3px',
      'radius-md': '4px',
      'radius-lg': '6px',
      'shadow-glow': 'none',
      'logo-text': '#ffffff',
      'logo-font': 'ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
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
      'c-primary-dark': '98, 114, 164',
      'c-muted': '98, 114, 164',
      'bg': '#f8f8f2', // 修复原版错误：亮色模式不应使用暗色背景
      'fg': '#282a36',
      'border': '#e6e6e6',
      'radius': '8px',
      'bg-pattern': 'none',
      'card-shadow': '0 8px 24px rgba(40, 42, 54, 0.08)',
      'btn-shadow': '0 4px 12px rgba(189, 147, 249, 0.3)',
      'font-heading': '"Fira Code", "JetBrains Mono", monospace', // 移除出戏的中文字体，换用极客风字体
      'c-surface': '255, 255, 255',
      'c-text-primary': '40, 42, 54',
      'border-width': '1px', // 去除过粗的边框
      'font-body': 'system-ui, -apple-system, sans-serif',
      'font-display': '"Fira Code", "JetBrains Mono", monospace',
      'radius-sm': '4px',
      'radius-md': '8px',
      'radius-lg': '12px',
      'shadow-glow': 'none',
      'logo-text': '#bd93f9',
      'logo-font': '"Fira Code", "JetBrains Mono", monospace',
      'logo-glow': 'none',
      'footer-text': 'rgba(98, 114, 164, 1)',
      'progress-bg': 'linear-gradient(90deg, #ff79c6, #bd93f9)',
      'progress-animation': 'none'
    },
    dark: {
      'c-primary': '189, 147, 249',
      'c-primary-light': '255, 121, 198',
      'c-primary-dark': '139, 233, 253',
      'c-muted': '98, 114, 164',
      'bg': '#282a36',
      'fg': '#f8f8f2',
      'border': '#44475a',
      'radius': '8px',
      'bg-pattern': 'none',
      'card-shadow': '0 8px 24px rgba(0, 0, 0, 0.4)', // 减轻生硬的黑块阴影
      'btn-shadow': '0 4px 12px rgba(0, 0, 0, 0.3)',
      'font-heading': '"Fira Code", "JetBrains Mono", monospace',
      'c-surface': '68, 71, 90',
      'c-text-primary': '248, 248, 242',
      'border-width': '1px',
      'font-body': 'system-ui, -apple-system, sans-serif',
      'font-display': '"Fira Code", "JetBrains Mono", monospace',
      'radius-sm': '4px',
      'radius-md': '8px',
      'radius-lg': '12px',
      'shadow-glow': '0 0 15px rgba(189, 147, 249, 0.3)',
      'logo-text': '#ff79c6',
      'logo-font': '"Fira Code", "JetBrains Mono", monospace',
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
      'c-primary': '9, 105, 218',
      'c-primary-light': '84, 174, 255',
      'c-primary-dark': '5, 80, 174',
      'c-muted': '101, 109, 118',
      'bg': '#f6f8fa', // 修改为真实的 Github 灰色背景
      'fg': '#1f2328',
      'border': '#d0d7de',
      'radius': '6px',
      'bg-pattern': 'none',
      'card-shadow': '0 1px 3px rgba(31,35,40,0.12), 0 8px 24px rgba(66,74,83,0.12)',
      'btn-shadow': '0 1px 0 rgba(31,35,40,0.04)',
      'font-heading': '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif', // 去掉全站等宽字体的荒谬设定
      'c-surface': '255, 255, 255', // 卡片必须是纯白
      'c-text-primary': '31, 35, 40',
      'border-width': '1px',
      'font-body': '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
      'font-display': '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
      'radius-sm': '4px',
      'radius-md': '6px',
      'radius-lg': '8px',
      'shadow-glow': 'none',
      'logo-text': '#1f2328',
      'logo-font': '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
      'footer-text': 'rgba(101, 109, 118, 1)',
      'progress-bg': 'repeating-linear-gradient(90deg, #40c463, #40c463 12px, transparent 12px, transparent 16px)',
      'progress-animation': 'none'
    },
    dark: {
      'c-primary': '47, 129, 247', // Github 黑暗模式蓝色
      'c-primary-light': '88, 166, 255',
      'c-primary-dark': '56, 139, 253',
      'c-muted': '139, 148, 158',
      'bg': '#0d1117',
      'fg': '#e6edf3',
      'border': '#30363d',
      'radius': '6px',
      'bg-pattern': 'none',
      'card-shadow': '0 0 0 1px #30363d, 0 8px 24px rgba(1,4,9,0.8)',
      'btn-shadow': '0 0 0 1px #30363d',
      'font-heading': '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
      'c-surface': '22, 27, 34', // 卡片稍浅的黑
      'c-text-primary': '230, 237, 243',
      'border-width': '1px',
      'font-body': '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
      'font-display': '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
      'radius-sm': '4px',
      'radius-md': '6px',
      'radius-lg': '8px',
      'shadow-glow': 'none',
      'logo-text': '#e6edf3',
      'logo-font': '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
      'footer-text': 'rgba(139, 148, 158, 1)',
      'progress-bg': 'repeating-linear-gradient(90deg, #3fb950, #3fb950 12px, transparent 12px, transparent 16px)',
      'progress-animation': 'none'
    }
  }
}
