# 主题系统 (Themes)

QuizLight 提供了一个高度可定制的、基于 CSS 变量 (Design Token) 和 UnoCSS 的主题系统。内置了 3 套极具差异化的默认主题，你可以非常轻松地添加属于自己的主题。

## 1. 默认主题

目前系统内置了三套差异化极大的默认主题：

- **`neo-brutalism` (新粗野主义)**: 艳红配纸张色，硬朗实心阴影，点阵背景，等宽字体。
- **`minimalist-space` (极简留白)**: 极致的黑白留白，无边框，超大圆角与极其柔和的大范围扩散阴影。
- **`retro-mac` (拟物复古)**: 经典蓝灰配色，微小圆角，CRT 扫描线背景，3D 凸起边框阴影，复古终端字体。

可以在 `src/plugins/theme/themes.ts` 中查看这三套主题的详细配置。

## 2. Design Tokens

每个主题需要提供 `light` 和 `dark` 两种模式的配置，包含以下 Token：

### 核心色彩
- `c-primary`: 主色调 (RGB 值，例如 `99, 102, 241`)
- `c-primary-light`: 主色调浅色 (RGB 值)
- `c-primary-dark`: 主色调深色 (RGB 值)
- `c-muted`: 禁用态/次要文本颜色 (RGB 值)

### 基础结构
- `bg`: 页面背景色 (Hex/RGBA 等有效 CSS 颜色)
- `fg`: 页面主要文本颜色 (Hex/RGBA 等有效 CSS 颜色)
- `border`: 边框颜色
- `radius`: 基础圆角大小 (如 `0.75rem`, `0px`, `2rem`)

### 高级视觉扩展 (新)
- `bg-pattern`: 背景纹理 (如 `radial-gradient(...)`, `none`)
- `card-shadow`: 卡片和主容器的阴影样式
- `btn-shadow`: 底部悬浮按钮栏的阴影样式
- `font-heading`: 标题及核心元素的字体家族

## 3. 如何开发新主题

### Step 1: 在 `themes.ts` 中定义主题
在 `src/plugins/theme/themes.ts` 中导出一个新的 `ThemeDefinition` 对象：

```typescript
export const themeCyberpunk: ThemeDefinition = {
  id: 'cyberpunk',
  name: '赛博朋克',
  tokens: {
    light: {
      // 亮色模式的 Tokens...
    },
    dark: {
      'c-primary': '255, 0, 255', // 霓虹紫
      'c-primary-light': '255, 100, 255',
      'c-primary-dark': '200, 0, 200',
      'c-muted': '0, 255, 255', // 霓虹青
      'bg': '#0d0221', // 深紫背景
      'fg': '#00ffcc', // 霓虹青文字
      'border': '#ff00ff', // 紫色边框
      'radius': '0px', // 锐利直角
      'bg-pattern': 'linear-gradient(45deg, #000000 25%, transparent 25%)',
      'card-shadow': '0 0 10px #ff00ff, 0 0 20px #00ffcc', // 霓虹发光阴影
      'btn-shadow': '0 -5px 15px #ff00ff',
      'font-heading': '"Orbitron", sans-serif'
    }
  }
}
```

### Step 2: 在 `main.ts` 中注册主题
打开 `src/main.ts`，导入并注册你的新主题：

```typescript
import { themeCyberpunk } from '@/plugins/theme/themes'

// Register themes
themeManager.registerTheme(themeNeoBrutalism)
themeManager.registerTheme(themeMinimalistSpace)
themeManager.registerTheme(themeRetroMac)
themeManager.registerTheme(themeCyberpunk) // 注册你的新主题
```

### Step 3: 在题库中使用
在你的测评 JSON 文件（如 `quizzes/sample-test.json`）的 `meta` 字段中指定主题 ID：

```json
{
  "meta": {
    "title": "我的赛博测评",
    "themeId": "cyberpunk"
  },
  "questions": [...]
}
```

## 4. 全局 Header
系统默认使用 `<GlobalHeader />` (`src/components/GlobalHeader.vue`) 来统一管理页面的语言切换和黑夜模式切换。该组件已与主题系统的 `btn-shadow` 和 `border` Token 深度集成，能够根据当前加载的主题自动适配样式和发光/阴影效果。