# QuizLight

QuizLight 是一套开源、纯前端、轻量化的趣味测评引擎：通过放置 `quizzes/*.json` 题库文件，即可生成可分享的测评页面（首页列表 → 答题 → 结果）。

## 特性

- 纯前端运行：Vite + Vue 3 + Vue Router
- 题库即内容：在 `quizzes/` 放置 JSON 文件，页面自动发现并校验
- 计分引擎框架无关：核心逻辑为纯 TypeScript（可复用到其它 UI）
- 进度保存：答题过程实时保存到 localStorage，可中断恢复
- 深色模式与主题系统：内置 3 套极具差异化的默认主题（新粗野主义、极简留白、拟物复古），支持高度定制化 Design Token（阴影、背景纹理、字体等）
- 全局导航与多语言：优雅的全局 Header 统一管理语言切换（中/英）和主题切换
- 插件扩展：自定义题型渲染、结果渲染、计分策略与生命周期钩子

## 技术栈与依赖

- Runtime: [vue](./package.json#L12-L26), [vue-router](./package.json#L12-L26)
- Validation: zod（题库 JSON 运行时校验）
- Styling: UnoCSS（主题色 + 原子化类名）
- Build: Vite

## 快速开始（开发者）

```bash
pnpm install
pnpm dev
```

打开终端输出的本地地址即可访问。

## 构建与预览（部署者）

```bash
pnpm build
pnpm preview
```

## 部署到 GitHub Pages

项目提供了 `pnpm deploy`（使用 `gh-pages` 将 `dist/` 推送到 `gh-pages` 分支）：

```bash
pnpm deploy
```

注意：
- 若使用“项目页”（`https://<user>.github.io/<repo>/`），通常需要在 [vite.config.ts](./vite.config.ts) 增加 `base: '/<repo>/'`，否则资源路径可能不正确。
- 若使用“用户/组织页”（`https://<user>.github.io/`），通常无需设置 `base`。

## 添加/修改题库

1. 在 `quizzes/` 下新增 JSON 文件（例如 [sample-test.json](./quizzes/sample-test.json)）。
2. 首页会通过 `import.meta.glob('/quizzes/*.json', { eager: true })` 自动扫描并加载。
3. 题库会使用 [validateQuiz](./src/core/schema.ts#L154-L190) 做运行时校验；校验失败的题库会被跳过。

题库结构的 TypeScript 定义见 [types.ts](./src/core/types.ts#L100-L134)（`QuizSchema`）。

## 插件扩展

插件通过全局注册中心 [pluginRegistry](./src/core/plugins.ts) 注入到引擎与组件渲染流程中：

- 自定义题型渲染：在 [Question.vue](./src/components/Question.vue#L25-L34) 中按 `question.type` 查找插件的 `customQuestionRenderers[type]`
- 自定义结果渲染：在 [ResultCard.vue](./src/components/ResultCard.vue#L29-L38) 中按 `layout` 查找插件的 `customResultRenderers[layout]`
- 自定义计分策略：在 [QuizEngine.getResult](./src/core/engine.ts#L108-L134) 中按 `scoringStrategy` 查找插件的 `customScoringStrategies[strategy]`

插件接口定义见 [QuizPlugin](./src/core/types.ts#L206-L228)。

## 文档（Code Wiki）

- 入口：[docs/wiki/index.md](./docs/wiki/index.md)

