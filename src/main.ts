// src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'virtual:uno.css'
import { pluginRegistry } from '@/core'
import { ThemeManagerPlugin, themeManager } from '@/plugins/theme'
import { themeNeoBrutalism, themeMinimalistSpace, themeRetroMac, themeNotion, themeDracula, themeGithub } from '@/plugins/theme/themes'

// Register themes
themeManager.registerTheme(themeNeoBrutalism)
themeManager.registerTheme(themeMinimalistSpace)
themeManager.registerTheme(themeRetroMac)
themeManager.registerTheme(themeNotion)
themeManager.registerTheme(themeDracula)
themeManager.registerTheme(themeGithub)

// Register theme plugin
pluginRegistry.use(ThemeManagerPlugin)

const app = createApp(App)
app.use(router)
app.mount('#app')
