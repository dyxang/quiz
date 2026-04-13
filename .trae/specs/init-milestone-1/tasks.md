# Tasks
- [x] Task 1: Step 1 项目初始化
  - [x] SubTask 1.1: 创建 `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.node.json`, `uno.config.ts`
  - [x] SubTask 1.2: 创建 `index.html`, `src/main.ts`, `src/App.vue`
- [x] Task 2: Step 2 类型层
  - [x] SubTask 2.1: 创建 `src/core/types.ts` 和 `src/core/schema.ts` 并填入 PRD 中的定义
  - [x] SubTask 2.2: 创建 `src/core/index.ts` 统一导出
- [x] Task 3: Step 3 测验引擎
  - [x] SubTask 3.1: 创建 `src/core/engine.ts` 并实现 `QuizEngine` 类及其所有计分策略
- [x] Task 4: Step 4 路由与页面骨架
  - [x] SubTask 4.1: 创建 `src/router.ts` 定义路由
  - [x] SubTask 4.2: 创建 `HomeView.vue`, `QuizView.vue`, `ResultView.vue` 占位组件
- [x] Task 5: Step 5 状态管理 composable
  - [x] SubTask 5.1: 创建 `src/composables/useQuizState.ts` 封装 `QuizEngine` 提供响应式状态

# Task Dependencies
- [Task 2] depends on [Task 1]
- [Task 3] depends on [Task 2]
- [Task 4] depends on [Task 1]
- [Task 5] depends on [Task 3]
