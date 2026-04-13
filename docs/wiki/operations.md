# 开发、构建与部署

## 开发运行

依赖安装：

```bash
pnpm install
```

启动开发服务器：

```bash
pnpm dev
```

核心脚本定义见 [package.json](file:///workspace/package.json#L6-L11)。

## 构建产物

构建（包含类型检查）：

```bash
pnpm build
```

说明：

- `build` 脚本会先运行 `vue-tsc --noEmit`，再运行 `vite build`
- 产物输出目录为 `dist/`（Vite 默认）

本地预览：

```bash
pnpm preview
```

## 部署（GitHub Pages）

脚本：

```bash
pnpm deploy
```

行为：

- 执行 `vue-tsc --noEmit && vite build`
- 将 `dist/` 推送到 `gh-pages` 分支（依赖 `gh-pages`）

常见注意点：

- 使用 GitHub Pages “项目页”时，建议在 [vite.config.ts](file:///workspace/vite.config.ts) 增加 `base: '/<repo>/'`，以保证静态资源路径正确。

## 运行时存储（localStorage）

- 主题：`quizlight-theme`（见 [useTheme.ts](file:///workspace/src/composables/useTheme.ts#L3-L35)）
- 语言：`quizlight-locale`（见 [useI18n.ts](file:///workspace/src/composables/useI18n.ts#L78-L97)）
- 作答记录：`quizlight-<quizId>`（见 [useQuizState.saveProgress](file:///workspace/src/composables/useQuizState.ts#L115-L121)、[ResultView.vue](file:///workspace/src/views/ResultView.vue#L55-L63)）

## 测试

仓库包含 Vitest 测试用例（当前主要用于验证 PWA 已移除）：

- [pwa-removal.test.ts](file:///workspace/tests/pwa-removal.test.ts)

如需补充测试建议：

- 为 `QuizEngine` 添加纯逻辑单元测试（dimension-max / total-score / tieBreak）
- 为 `validateQuiz` 添加 schema 回归测试（特别是题型/字段兼容性）

