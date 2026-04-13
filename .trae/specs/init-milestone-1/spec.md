# Milestone 1 (Step 1-5) Spec

## Why
项目刚刚启动，尚未进行任何初始化工作。为了支持 QuizLight MVP 的后续 UI 开发，必须首先搭建前端工程脚手架（基于 Vite + Vue 3 + TypeScript），并实现测验引擎的核心数据结构与业务逻辑（核心类、路由以及状态管理），建立坚实的架构基础。

## What Changes
- 初始化 Vite + Vue 3 项目，配置 UnoCSS、Zod、Vue Router 等依赖。
- 定义应用的核心类型和 Schema（`src/core/types.ts`, `src/core/schema.ts`）。
- 实现框架无关的 `QuizEngine` 测验引擎核心类（`src/core/engine.ts`）。
- 配置 Vue Router 并创建应用的三大核心页面骨架（HomeView、QuizView、ResultView）。
- 实现基于 Composition API 的答题状态管理（`src/composables/useQuizState.ts`）。

## Impact
- Affected specs: 项目基础架构确立，支持完整测验流程的数据和状态层。
- Affected code: 新增项目根目录配置文件、`src/core/*`、`src/views/*`、`src/composables/*`、`src/router.ts`。

## ADDED Requirements
### Requirement: Project Scaffolding
The system SHALL provide a fully configured Vite + Vue 3 environment with UnoCSS, TypeScript, and Vue Router.

#### Scenario: Success case
- **WHEN** user runs `pnpm dev`
- **THEN** the Vite development server starts and renders the Vue application without errors.

### Requirement: Core Quiz Engine
The system SHALL provide a framework-agnostic QuizEngine capable of loading quizzes, tracking answers, and calculating dimension-based or total-score results.

#### Scenario: Success case
- **WHEN** a quiz is loaded and answers are submitted
- **THEN** `getResult()` returns the calculated dimension scores and matched result type.
