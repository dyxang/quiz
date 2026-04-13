# QuizLight P2 Phase Development Spec

## Why
P1阶段已经确认完成。为了进一步提升 QuizLight 测评引擎的用户体验和可扩展性，现在开始 P2 阶段的开发，主要包括：离线可用性、中断恢复、主题适配、国际化以及强大的插件扩展能力。

## What Changes
- 添加 PWA 离线支持 (Service Worker)。
- 实现答题进度本地保存 (localStorage)。
- 添加深色模式支持 (CSS 变量 + 状态管理)。
- 集成多语言支持 (i18n, 中英双语)。
- 实现标准的插件扩展系统 (支持自定义题型、结果展示、计分策略及生命周期钩子)。

## Impact
- Affected specs: 增加了全新的 P2 特性，完善了项目能力
- Affected code: `src/core/engine.ts` (引擎插件机制), `src/App.vue` (深色/语言状态), `src/composables/useQuizState.ts` (进度保存), `vite.config.ts` (PWA) 等核心和 UI 文件。

## ADDED Requirements
### Requirement: 进度保存 (localStorage)
系统 SHALL 自动保存用户的答题进度到 localStorage。
#### Scenario: 中断恢复
- **WHEN** 用户答题到一半刷新页面或关闭后重新打开
- **THEN** 答题进度自动恢复，无需从头开始。

### Requirement: 深色模式
系统 SHALL 支持深色模式和浅色模式切换。
#### Scenario: 切换主题
- **WHEN** 用户点击主题切换按钮或系统主题为深色时
- **THEN** 界面自动应用深色模式对应的 CSS 变量样式。

### Requirement: 多语言支持 (i18n)
系统 SHALL 提供界面的中英文切换能力。
#### Scenario: 切换语言
- **WHEN** 用户选择英文语言
- **THEN** 界面上的固定文案（如“上一题”、“下一题”、“查看结果”）切换为英文。

### Requirement: PWA 离线支持
系统 SHALL 提供离线访问能力，支持 Service Worker。
#### Scenario: 离线访问
- **WHEN** 用户在无网络连接时访问已缓存的测试页面
- **THEN** 页面正常加载并允许进行答题。

### Requirement: 插件扩展系统
系统 SHALL 提供 `QuizLight.use(plugin)` 机制，允许外部注册能力。
#### Scenario: 注册插件
- **WHEN** 开发者编写并注册一个包含自定义题型或计分策略的插件
- **THEN** 引擎能够识别并正确渲染该题型或应用该计分策略。
