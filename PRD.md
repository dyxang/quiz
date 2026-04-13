# QuizLight — AI Agent 开发规格书

> **版本**：v2.1 | **阶段**：MVP (v0.1) + P2 进阶功能（已完成） | **最后更新**：2026-04-13
>
> 本文档是 QuizLight 的完整开发规格书，AI Agent 可直接依据本文档完成全部 MVP 开发工作。


> 版本：v0.1 MVP | 最后更新：2026-04-13

---

## 第 0 章：文档使用说明

本文档是 **QuizLight v0.1 MVP** 的完整开发规格书。AI Agent 可直接依据本文档完成全部开发工作，无需额外确认或决策。

### 核心约定

- **所有代码块可直接复制使用**，代码块顶部以注释标注目标文件路径，格式如下：

  ```typescript
  // src/core/types.ts
  export interface Quiz { ... }
  ```

- **所有技术决策已确定**，AI Agent 无需做任何选择，只需按文档逐步实现。
- 文档共包含 **10 个分步实现步骤**，每步末尾附有验证命令，执行通过后方可进入下一步。

### MVP 范围

**MVP 包含的功能：**

- 题型：单选题（single）、多选题（multiple）
- 结果展示：结果标签、分数条、文字描述
- 页面：测试列表页、答题页、结果页
- **进度保存 (localStorage)**：答题中途退出后可恢复进度
- **深色模式**：跟随系统偏好或手动切换，基于 CSS 变量实现主题切换
- **多语言 (i18n)**：支持中英文界面切换，预留扩展其他语言的架构
- **PWA 离线支持**：通过 Service Worker 实现离线访问与缓存策略
- **插件扩展系统**：提供标准插件 API，支持自定义渲染与计分策略扩展

### MVP 不包含的功能

以下功能不在 MVP 范围内，请勿实现：

- 雷达图（P1 阶段）
- 海报生成（P1 阶段）
- 量表题 scale 题型（P1 阶段）

---

## 第 1 章：产品定位与背景

### 1.1 产品定义

QuizLight 是一个**开源、纯前端、轻量化测评引擎**。

核心定位：**让任何人 10 分钟内创建一套可分享的趣味测评。**

用户只需编写一份 JSON 配置文件，即可生成一套完整的交互式测评，无需后端服务，无需数据库，无需注册账号。生成的测评链接可直接分享至社交平台。

### 1.2 设计原则

| # | 原则 | 说明 |
|---|------|------|
| 1 | **零后端** | 纯前端运行，JSON 即测试，无需服务器 |
| 2 | **配置即测试** | 一份 JSON 定义全部题目、选项、计分规则和结果 |
| 3 | **渐进增强** | MVP 覆盖核心流程，P1/P2 逐步扩展高级功能 |
| 4 | **社交优先** | 结果页支持一键复制分享文案，适配社交平台传播 |
| 5 | **移动优先** | 响应式设计，移动端体验优先于桌面端 |

---

## 第 2 章：技术选型确定性清单

以下选型为最终决策，开发过程中不再变更。

| 类别 | 选型 | 阶段 | 说明 |
|------|------|------|------|
| 框架 | Vue 3 + Composition API | MVP | 用户偏好 |
| 语言 | TypeScript 5 (strict mode) | MVP | 类型安全 |
| 构建 | Vite 6 | MVP | 标准 Vue 项目脚手架 |
| 路由 | Vue Router 4 | MVP | 三页路由（列表页、答题页、结果页） |
| 样式 | UnoCSS | MVP | 原子化 CSS，体积小 |
| 状态管理 | Vue composable (`useQuizState.ts`) | MVP | 轻量，避免引入 Pinia |
| 多语言 | 自研 composable (`useI18n.ts`) | P2 | 轻量字典 + localStorage 持久化 |
| 主题 | CSS 变量 + composable (`useTheme.ts`) | P2 | 支持系统偏好与手动切换，localStorage 持久化 |
| Schema 校验 | Zod | MVP | 运行时校验 Quiz JSON 合法性 |
| PWA | vite-plugin-pwa + workbox | P2 | Service Worker 离线缓存与更新提示 |
| 包管理 | pnpm | MVP | 高效磁盘利用 |
| 雷达图 | 自研 SVG 组件 | P1 | MVP 不实现 |
| 海报生成 | Canvas 手绘 | P1 | MVP 不实现 |
| 测试框架 | Vitest + @vue/test-utils | MVP | 单元测试 |
| E2E 测试 | Playwright | v1.0 | MVP 不实现 |
| 部署 | GitHub Pages (gh-pages) | MVP | 静态部署 |

---

## 附录 A：P1/P2 功能概要

### P1 阶段

- **雷达图 SVG 组件**：基于结果标签数据生成多维雷达图，纯 SVG 实现，无第三方图表库依赖
- **Canvas 手绘海报生成**：将测试结果渲染为可保存的图片海报，支持自定义背景与布局
- **量表题 (scale) 支持**：新增 scale 题型，支持 1-5 / 1-10 等量表评分，扩展计分模型

### P2 阶段

- **PWA 离线支持**：通过 Service Worker 实现离线访问与缓存策略 (已完成)
- **进度保存 (localStorage)**：答题中途退出后可恢复进度，避免重复作答 (已完成)
- **深色模式**：跟随系统偏好或手动切换，基于 CSS 变量实现主题切换 (已完成)
- **多语言 (i18n)**：支持中英文界面切换，预留扩展其他语言的架构 (已完成)
- **插件扩展系统**：提供标准的插件 API，允许开发者编写自定义扩展插件 (已完成)，包括：
  - 自定义题型渲染器（注册新的 question type 及其 UI 组件）
  - 自定义结果展示组件（注册新的 result renderer）
  - 自定义计分策略（注册新的 scoring strategy）
  - 插件生命周期钩子（onQuizLoad、onAnswerSubmit、onResultShow）
  - 插件通过 `QuizLight.use(plugin)` 注册，引擎自动发现并加载

### P3 阶段

- **排序题 (ranking)**：用户拖拽选项进行排序，按位置计算分数
- **填空题 (fillblank)**：用户输入文本，支持精确匹配和关键词匹配两种评分模式
- **图片选择题 (image)**：选项以图片形式展示，适合视觉类测试
- **矩阵题 (matrix)**：行列为题干，交叉单元格为选项，适合批量评分场景
- **滑动评分题 (slider)**：用户拖动滑块在指定范围内打分，支持自定义刻度和标签
- **条件跳题逻辑**：根据用户对某题的回答，动态跳过或显示后续题目（分支逻辑）
- **题目随机排序**：支持题目级别和选项级别的随机打乱，每次作答顺序不同

---

## 附录 B：非功能需求

| 维度 | 指标 | 要求 |
|------|------|------|
| 性能 - FCP | First Contentful Paint | < 1.5s |
| 性能 - TTI | Time to Interactive | < 2.5s |
| 性能 - 体积 | 核心包 gzipped | < 50KB |
| 浏览器 - 桌面 | Chrome / Firefox / Edge | 80+ 版本 |
| 浏览器 - 桌面 | Safari | 14+ |
| 浏览器 - 移动端 | iOS Safari / Android Chrome | 最近 2 个主版本 |
| 无障碍 | 键盘导航 | 全部交互元素可 Tab 聚焦与操作 |
| 无障碍 | 图片 alt 文本 | 所有装饰性图片与结果图片提供 alt |
| 无障碍 | 标准 | WCAG 2.1 AA |
| 安全 | 数据收集 | 纯前端不收集任何用户数据 |
| 安全 | CSP | 部署时配置 Content-Security-Policy 策略 |
| 可维护 - 代码规范 | ESLint + Prettier | 统一代码风格 |
| 可维护 - 测试覆盖 | Vitest | 核心逻辑覆盖率 > 80% |

---

## 附录 C：竞品调研来源

以下为开发前调研的开源测评/问卷项目，供参考：

- **HumanOS** (badhope) — 专业测评平台, 38 Star
- **XBTI** (lovstudio) — 测试引擎, Apache-2.0
- **性格测试 Lab** (OctopusGarage) — Vue 3 性格测试, MIT
- **SurveyJS** — 通用问卷库, 2,500 Star, MIT

> 详细调研分析见《开源前端测评系统选型分析报告》。

---

# 第 3 章：完整数据定义

---

## 3.1 Quiz Schema 完整 JSON 示例

以下文件路径：`quizzes/sample-test.json`

```json
{
  "$schema": "./schema/quiz.schema.json",
  "id": "sample-test",
  "title": "性格倾向测试",
  "description": "28 道题，约 5 分钟，测测你的性格倾向",
  "version": "1.0.0",
  "author": "quizlight",
  "scoringStrategy": "dimension-max",
  "tieBreak": "first",
  "showDimensions": true,

  "questions": [
    {
      "id": "q1",
      "text": "在聚会上，你通常会？",
      "type": "single",
      "image": null,
      "options": [
        { "label": "主动和陌生人聊天", "scores": { "E": 2, "I": 0 } },
        { "label": "找熟悉的朋友待在一起", "scores": { "E": 0, "I": 2 } }
      ],
      "shuffleOptions": false
    },
    {
      "id": "q2",
      "text": "周末你更愿意？",
      "type": "single",
      "image": null,
      "options": [
        { "label": "参加社交活动", "scores": { "E": 2, "I": 0 } },
        { "label": "在家看书或看电影", "scores": { "E": 0, "I": 2 } }
      ],
      "shuffleOptions": false
    },
    {
      "id": "q3",
      "text": "你更喜欢的工作方式是？",
      "type": "single",
      "image": null,
      "options": [
        { "label": "和团队一起头脑风暴", "scores": { "E": 2, "I": 0 } },
        { "label": "独立思考和完成", "scores": { "E": 0, "I": 2 } }
      ],
      "shuffleOptions": false
    },
    {
      "id": "q4",
      "text": "认识新朋友时，你通常？",
      "type": "single",
      "image": null,
      "options": [
        { "label": "主动自我介绍", "scores": { "E": 2, "I": 0 } },
        { "label": "等对方先开口", "scores": { "E": 0, "I": 2 } }
      ],
      "shuffleOptions": false
    },
    {
      "id": "q5",
      "text": "长时间独处后，你会？",
      "type": "single",
      "image": null,
      "options": [
        { "label": "感到需要出去社交", "scores": { "E": 2, "I": 0 } },
        { "label": "感到充实和放松", "scores": { "E": 0, "I": 2 } }
      ],
      "shuffleOptions": false
    },
    {
      "id": "q6",
      "text": "你更倾向于？",
      "type": "single",
      "image": null,
      "options": [
        { "label": "广泛结交各行业朋友", "scores": { "E": 2, "I": 0 } },
        { "label": "维护几个深度友谊", "scores": { "E": 0, "I": 2 } }
      ],
      "shuffleOptions": false
    },
    {
      "id": "q7",
      "text": "在讨论中，你通常？",
      "type": "single",
      "image": null,
      "options": [
        { "label": "抢先表达自己的观点", "scores": { "E": 2, "I": 0 } },
        { "label": "先听完别人再说", "scores": { "E": 0, "I": 2 } }
      ],
      "shuffleOptions": false
    },
    {
      "id": "q8",
      "text": "你更关注？",
      "type": "single",
      "image": null,
      "options": [
        { "label": "未来的可能性", "scores": { "N": 2, "S": 0 } },
        { "label": "当下的现实", "scores": { "N": 0, "S": 2 } }
      ],
      "shuffleOptions": false
    },
    {
      "id": "q9",
      "text": "做决定时，你更依赖？",
      "type": "single",
      "image": null,
      "options": [
        { "label": "直觉和灵感", "scores": { "N": 2, "S": 0 } },
        { "label": "具体的事实和数据", "scores": { "N": 0, "S": 2 } }
      ],
      "shuffleOptions": false
    },
    {
      "id": "q10",
      "text": "你更喜欢哪种类型的书？",
      "type": "single",
      "image": null,
      "options": [
        { "label": "科幻/奇幻/理论", "scores": { "N": 2, "S": 0 } },
        { "label": "实用指南/传记", "scores": { "N": 0, "S": 2 } }
      ],
      "shuffleOptions": false
    },
    {
      "id": "q11",
      "text": "描述一件事时，你倾向于？",
      "type": "single",
      "image": null,
      "options": [
        { "label": "用比喻和抽象概念", "scores": { "N": 2, "S": 0 } },
        { "label": "按时间顺序陈述事实", "scores": { "N": 0, "S": 2 } }
      ],
      "shuffleOptions": false
    },
    {
      "id": "q12",
      "text": "你更信任？",
      "type": "single",
      "image": null,
      "options": [
        { "label": "自己的第六感", "scores": { "N": 2, "S": 0 } },
        { "label": "经过验证的经验", "scores": { "N": 0, "S": 2 } }
      ],
      "shuffleOptions": false
    },
    {
      "id": "q13",
      "text": "学习新东西时，你更喜欢？",
      "type": "single",
      "image": null,
      "options": [
        { "label": "先了解整体框架", "scores": { "N": 2, "S": 0 } },
        { "label": "从具体细节开始", "scores": { "N": 0, "S": 2 } }
      ],
      "shuffleOptions": false
    },
    {
      "id": "q14",
      "text": "你更欣赏的人是？",
      "type": "single",
      "image": null,
      "options": [
        { "label": "充满创意的想象家", "scores": { "N": 2, "S": 0 } },
        { "label": "脚踏实地的实干家", "scores": { "N": 0, "S": 2 } }
      ],
      "shuffleOptions": false
    },
    {
      "id": "q15",
      "text": "做重要决定时，你更看重？",
      "type": "single",
      "image": null,
      "options": [
        { "label": "逻辑分析和客观事实", "scores": { "T": 2, "F": 0 } },
        { "label": "个人价值观和他人感受", "scores": { "T": 0, "F": 2 } }
      ],
      "shuffleOptions": false
    },
    {
      "id": "q16",
      "text": "朋友向你倾诉烦恼，你通常？",
      "type": "single",
      "image": null,
      "options": [
        { "label": "帮TA分析问题并提出解决方案", "scores": { "T": 2, "F": 0 } },
        { "label": "先表示理解和共情", "scores": { "T": 0, "F": 2 } }
      ],
      "shuffleOptions": false
    },
    {
      "id": "q17",
      "text": "你认为好的决策应该？",
      "type": "single",
      "image": null,
      "options": [
        { "label": "基于数据和逻辑", "scores": { "T": 2, "F": 0 } },
        { "label": "考虑对人的影响", "scores": { "T": 0, "F": 2 } }
      ],
      "shuffleOptions": false
    },
    {
      "id": "q18",
      "text": "在争论中，你更倾向于？",
      "type": "single",
      "image": null,
      "options": [
        { "label": "坚持自己认为正确的观点", "scores": { "T": 2, "F": 0 } },
        { "label": "寻求共识和维护关系", "scores": { "T": 0, "F": 2 } }
      ],
      "shuffleOptions": false
    },
    {
      "id": "q19",
      "text": "你评价一个方案时，更看重？",
      "type": "single",
      "image": null,
      "options": [
        { "label": "它是否有效和合理", "scores": { "T": 2, "F": 0 } },
        { "label": "它是否让所有人满意", "scores": { "T": 0, "F": 2 } }
      ],
      "shuffleOptions": false
    },
    {
      "id": "q20",
      "text": "面对批评时，你通常？",
      "type": "single",
      "image": null,
      "options": [
        { "label": "客观分析批评是否合理", "scores": { "T": 2, "F": 0 } },
        { "label": "先关注对方的情绪", "scores": { "T": 0, "F": 2 } }
      ],
      "shuffleOptions": false
    },
    {
      "id": "q21",
      "text": "你更认同哪种说法？",
      "type": "single",
      "image": null,
      "options": [
        { "label": "\"对就是对，错就是错\"", "scores": { "T": 2, "F": 0 } },
        { "label": "\"每个人都有自己的道理\"", "scores": { "T": 0, "F": 2 } }
      ],
      "shuffleOptions": false
    },
    {
      "id": "q22",
      "text": "你更喜欢？",
      "type": "single",
      "image": null,
      "options": [
        { "label": "提前制定详细计划", "scores": { "J": 2, "P": 0 } },
        { "label": "保持灵活随机应变", "scores": { "J": 0, "P": 2 } }
      ],
      "shuffleOptions": false
    },
    {
      "id": "q23",
      "text": "你的工作空间通常？",
      "type": "single",
      "image": null,
      "options": [
        { "label": "整洁有序", "scores": { "J": 2, "P": 0 } },
        { "label": "看似混乱但自己能找到东西", "scores": { "J": 0, "P": 2 } }
      ],
      "shuffleOptions": false
    },
    {
      "id": "q24",
      "text": "面对截止日期，你通常？",
      "type": "single",
      "image": null,
      "options": [
        { "label": "提前完成", "scores": { "J": 2, "P": 0 } },
        { "label": "最后一刻冲刺", "scores": { "J": 0, "P": 2 } }
      ],
      "shuffleOptions": false
    },
    {
      "id": "q25",
      "text": "你更喜欢哪种旅行方式？",
      "type": "single",
      "image": null,
      "options": [
        { "label": "按行程表行动", "scores": { "J": 2, "P": 0 } },
        { "label": "随心所欲地探索", "scores": { "J": 0, "P": 2 } }
      ],
      "shuffleOptions": false
    },
    {
      "id": "q26",
      "text": "你对规则的态度是？",
      "type": "single",
      "image": null,
      "options": [
        { "label": "规则应该被遵守", "scores": { "J": 2, "P": 0 } },
        { "label": "规则是可以变通的", "scores": { "J": 0, "P": 2 } }
      ],
      "shuffleOptions": false
    },
    {
      "id": "q27",
      "text": "做项目时，你倾向于？",
      "type": "single",
      "image": null,
      "options": [
        { "label": "按计划一步步推进", "scores": { "J": 2, "P": 0 } },
        { "label": "同时进行多个方向探索", "scores": { "J": 0, "P": 2 } }
      ],
      "shuffleOptions": false
    },
    {
      "id": "q28",
      "text": "你的日常生活是？",
      "type": "single",
      "image": null,
      "options": [
        { "label": "规律且有节奏", "scores": { "J": 2, "P": 0 } },
        { "label": "随性且充满变化", "scores": { "J": 0, "P": 2 } }
      ],
      "shuffleOptions": false
    }
  ],

  "sections": [
    {
      "id": "social",
      "title": "社交偏好",
      "description": "了解你在社交场景中的自然倾向",
      "questionIds": ["q1", "q2", "q3", "q4", "q5", "q6", "q7"]
    },
    {
      "id": "perception",
      "title": "认知方式",
      "description": "探索你获取和处理信息的方式",
      "questionIds": ["q8", "q9", "q10", "q11", "q12", "q13", "q14"]
    },
    {
      "id": "decision",
      "title": "决策风格",
      "description": "发现你做决定时的内在逻辑",
      "questionIds": ["q15", "q16", "q17", "q18", "q19", "q20", "q21"]
    },
    {
      "id": "lifestyle",
      "title": "生活态度",
      "description": "看看你如何组织自己的日常生活",
      "questionIds": ["q22", "q23", "q24", "q25", "q26", "q27", "q28"]
    }
  ],

  "dimensions": [
    {
      "id": "E",
      "name": "外倾",
      "opposite": "I",
      "oppositeName": "内倾"
    },
    {
      "id": "N",
      "name": "直觉型",
      "opposite": "S",
      "oppositeName": "实感型"
    },
    {
      "id": "T",
      "name": "理性",
      "opposite": "F",
      "oppositeName": "感性"
    },
    {
      "id": "J",
      "name": "计划型",
      "opposite": "P",
      "oppositeName": "灵活型"
    }
  ],

  "results": [
    {
      "id": "INTJ",
      "name": "独立思考者",
      "emoji": "♟️",
      "description": "独立而富有远见的战略家，擅长制定长期计划并高效执行。你看起来高冷，但内心其实住着一个精心规划世界的建筑师。",
      "matchRule": [
        { "dimension": "E", "value": "I" },
        { "dimension": "S", "value": "N" },
        { "dimension": "T", "value": "T" },
        { "dimension": "J", "value": "J" }
      ],
      "color": "#6366f1",
      "advice": "偶尔放下计划，享受一下即兴的快乐，说不定会有意外收获。"
    },
    {
      "id": "INTP",
      "name": "分析达人",
      "emoji": "🔬",
      "description": "充满好奇心的理论探索者，喜欢在脑中构建精密的逻辑体系。你对知识的渴望永无止境，堪称行走的百科全书。",
      "matchRule": [
        { "dimension": "E", "value": "I" },
        { "dimension": "S", "value": "N" },
        { "dimension": "T", "value": "T" },
        { "dimension": "J", "value": "P" }
      ],
      "color": "#3b82f6",
      "advice": "想法再好也要落地，试着把那些绝妙的点子变成现实吧。"
    },
    {
      "id": "ENTJ",
      "name": "行动派",
      "emoji": "👑",
      "description": "天生的领导者，果断、高效、充满魄力。你看到的是全局蓝图，并且有信心带领团队走向胜利。",
      "matchRule": [
        { "dimension": "E", "value": "E" },
        { "dimension": "S", "value": "N" },
        { "dimension": "T", "value": "T" },
        { "dimension": "J", "value": "J" }
      ],
      "color": "#ef4444",
      "advice": "领导力是你的天赋，但也别忘了倾听身边人的声音。"
    },
    {
      "id": "ENTP",
      "name": "创意先锋",
      "emoji": "💡",
      "description": "机智敏捷的点子制造机，热爱挑战既有观点。你能在任何话题上找到新的角度，让对话永远不无聊。",
      "matchRule": [
        { "dimension": "E", "value": "E" },
        { "dimension": "S", "value": "N" },
        { "dimension": "T", "value": "T" },
        { "dimension": "J", "value": "P" }
      ],
      "color": "#f59e0b",
      "advice": "你的创意让人惊叹，但记得把至少一个点子坚持做完。"
    },
    {
      "id": "INFJ",
      "name": "理想主义者",
      "emoji": "🌙",
      "description": "理想主义的守护者，拥有深刻的洞察力和对人类福祉的真诚关怀。你看似安静，内心却燃烧着改变世界的火焰。",
      "matchRule": [
        { "dimension": "E", "value": "I" },
        { "dimension": "S", "value": "N" },
        { "dimension": "T", "value": "F" },
        { "dimension": "J", "value": "J" }
      ],
      "color": "#8b5cf6",
      "advice": "照顾别人的同时也要照顾自己，你的温柔值得被温柔以待。"
    },
    {
      "id": "INFP",
      "name": "浪漫主义者",
      "emoji": "🦋",
      "description": "浪漫的理想主义者，内心世界丰富而多彩。你追求真实和意义，用独特的视角看待这个世界上的一切。",
      "matchRule": [
        { "dimension": "E", "value": "I" },
        { "dimension": "S", "value": "N" },
        { "dimension": "T", "value": "F" },
        { "dimension": "J", "value": "P" }
      ],
      "color": "#ec4899",
      "advice": "你的想象力是珍贵的礼物，勇敢地把内心的世界展现出来。"
    },
    {
      "id": "ENFJ",
      "name": "团队核心",
      "emoji": "🌟",
      "description": "充满感染力的激励者，天生善于理解他人并激发团队潜能。你就是那个让每个人都觉得自己很重要的人。",
      "matchRule": [
        { "dimension": "E", "value": "E" },
        { "dimension": "S", "value": "N" },
        { "dimension": "T", "value": "F" },
        { "dimension": "J", "value": "J" }
      ],
      "color": "#f97316",
      "advice": "你在照亮别人的同时，也别忘了给自己留一盏灯。"
    },
    {
      "id": "ENFP",
      "name": "自由灵魂",
      "emoji": "🎭",
      "description": "热情洋溢的自由灵魂，对生活充满无限好奇和热爱。你的热情能感染身边每一个人，让平凡的日子变得精彩。",
      "matchRule": [
        { "dimension": "E", "value": "E" },
        { "dimension": "S", "value": "N" },
        { "dimension": "T", "value": "F" },
        { "dimension": "J", "value": "P" }
      ],
      "color": "#14b8a6",
      "advice": "你的热情是超能力，但学会聚焦会让它发挥更大的威力。"
    },
    {
      "id": "ISTJ",
      "name": "稳健执行者",
      "emoji": "📋",
      "description": "可靠的责任担当者，做事严谨有条理，是团队中最值得信赖的基石。你说到做到，从不让人失望。",
      "matchRule": [
        { "dimension": "E", "value": "I" },
        { "dimension": "S", "value": "S" },
        { "dimension": "T", "value": "T" },
        { "dimension": "J", "value": "J" }
      ],
      "color": "#64748b",
      "advice": "你的靠谱是稀缺品质，偶尔放松一下，世界不会因为一次偷懒而崩塌。"
    },
    {
      "id": "ISFJ",
      "name": "温暖守护者",
      "emoji": "🛡️",
      "description": "温暖而忠诚的守护者，默默付出，细心照顾身边的每一个人。你是那种让人感到安心和被珍视的存在。",
      "matchRule": [
        { "dimension": "E", "value": "I" },
        { "dimension": "S", "value": "S" },
        { "dimension": "T", "value": "F" },
        { "dimension": "J", "value": "J" }
      ],
      "color": "#22c55e",
      "advice": "你的善良让人感动，但也要学会说\"不\"，保护好自己的边界。"
    },
    {
      "id": "ESTJ",
      "name": "高效管理者",
      "emoji": "📊",
      "description": "务实高效的组织者，善于建立秩序并推动事情向前发展。你是那种能把混乱变成井井有条的超级管理者。",
      "matchRule": [
        { "dimension": "E", "value": "E" },
        { "dimension": "S", "value": "S" },
        { "dimension": "T", "value": "T" },
        { "dimension": "J", "value": "J" }
      ],
      "color": "#0ea5e9",
      "advice": "效率是你的标签，但偶尔慢下来，也许会发现不一样的风景。"
    },
    {
      "id": "ESFJ",
      "name": "社交达人",
      "emoji": "🤝",
      "description": "热心肠的社交达人，天生善于营造和谐氛围。你是朋友圈里的粘合剂，有你在的地方就不会冷场。",
      "matchRule": [
        { "dimension": "E", "value": "E" },
        { "dimension": "S", "value": "S" },
        { "dimension": "T", "value": "F" },
        { "dimension": "J", "value": "J" }
      ],
      "color": "#e11d48",
      "advice": "你的关心温暖了很多人，但也别忘了给自己一些独处的充电时间。"
    },
    {
      "id": "ISTP",
      "name": "沉静观察者",
      "emoji": "🔧",
      "description": "冷静灵巧的实践家，擅长在关键时刻解决问题。你看起来淡定从容，但动手能力简直满分。",
      "matchRule": [
        { "dimension": "E", "value": "I" },
        { "dimension": "S", "value": "S" },
        { "dimension": "T", "value": "T" },
        { "dimension": "J", "value": "P" }
      ],
      "color": "#78716c",
      "advice": "你的动手能力让人佩服，试着把这份才能分享给更多人吧。"
    },
    {
      "id": "ISFP",
      "name": "随性艺术家",
      "emoji": "🎨",
      "description": "敏感而富有艺术气质的自由灵魂，用自己独特的方式感受和表达世界。你活在当下，每一刻都是你的画布。",
      "matchRule": [
        { "dimension": "E", "value": "I" },
        { "dimension": "S", "value": "S" },
        { "dimension": "T", "value": "F" },
        { "dimension": "J", "value": "P" }
      ],
      "color": "#a855f7",
      "advice": "你的审美和感受力是天赋，大胆创作，世界需要你的色彩。"
    },
    {
      "id": "ESTP",
      "name": "冒险实干家",
      "emoji": "🎯",
      "description": "行动力爆表的冒险家，喜欢挑战和刺激，擅长把握机会。你是那种说干就干、从不犹豫的行动派。",
      "matchRule": [
        { "dimension": "E", "value": "E" },
        { "dimension": "S", "value": "S" },
        { "dimension": "T", "value": "T" },
        { "dimension": "J", "value": "P" }
      ],
      "color": "#eab308",
      "advice": "你的执行力令人羡慕，但在冲锋之前多想一步会更完美。"
    },
    {
      "id": "ESFP",
      "name": "快乐感染者",
      "emoji": "🎪",
      "description": "活力四射的派对灵魂，天生自带聚光灯效应。你让生活变成一场精彩的表演，身边的人都忍不住被你吸引。",
      "matchRule": [
        { "dimension": "E", "value": "E" },
        { "dimension": "S", "value": "S" },
        { "dimension": "T", "value": "F" },
        { "dimension": "J", "value": "P" }
      ],
      "color": "#06b6d4",
      "advice": "你的快乐感染力超强，但也记得在热闹之后给自己一些安静的时间。"
    }
  ],

  "defaultResult": {
    "id": "unknown",
    "name": "神秘人",
    "emoji": "❓",
    "description": "你的结果比较独特，无法归入现有的 16 种性格类型。也许你是一个尚未被定义的新物种！",
    "matchRule": [],
    "color": "#9ca3af",
    "advice": "试试重新做一次测试？"
  }
}
```

---

## 3.2 完整 TypeScript 类型定义

以下文件路径：`src/core/types.ts`

```typescript
// src/core/types.ts

/** 题目类型 */
export type QuestionType = 'single' | 'multiple' | 'scale'

/** 计分策略 */
export type ScoringStrategy = 'dimension-max' | 'total-score' | 'weighted'

/** 平局处理方式 */
export type TieBreak = 'first' | 'random'

/** 题目选项 */
export interface QuestionOption {
  /** 选项显示文本 */
  label: string
  /** 维度ID → 分数映射 */
  scores: Record<string, number>
}

/** 量表配置（仅 type=scale 时使用） */
export interface ScaleConfig {
  /** 量表最小值 */
  min: number
  /** 量表最大值 */
  max: number
  /** 最小值标签（如"非常不同意"） */
  minLabel: string
  /** 最大值标签（如"非常同意"） */
  maxLabel: string
}

/** 题目定义 */
export interface Question {
  /** 题目唯一标识 */
  id: string
  /** 题目文本 */
  text: string
  /** 题目类型 */
  type: QuestionType
  /** 题目配图 URL，无配图时为 null */
  image: string | null
  /** 选项列表 */
  options: QuestionOption[]
  /** 是否随机打乱选项顺序 */
  shuffleOptions: boolean
  /** 量表配置，仅 type=scale 时使用 */
  scaleConfig?: ScaleConfig
}

/** 题目分组 */
export interface QuestionSection {
  /** 分组唯一标识 */
  id: string
  /** 分组标题 */
  title: string
  /** 分组描述 */
  description: string
  /** 该分组包含的题目 ID 列表 */
  questionIds: string[]
}

/** 维度定义 */
export interface Dimension {
  /** 维度唯一标识（如 "E"） */
  id: string
  /** 维度名称（如 "外倾"） */
  name: string
  /** 对立维度标识（如 "I"） */
  opposite: string
  /** 对立维度名称（如 "内倾"） */
  oppositeName: string
}

/** 结果匹配规则 */
export interface MatchRule {
  /** 维度 ID */
  dimension: string
  /** 该维度应匹配的值 */
  value: string
}

/** 结果定义 */
export interface QuizResultDef {
  /** 结果唯一标识（如 "INTJ"） */
  id: string
  /** 结果名称（如 "独立思考者"） */
  name: string
  /** 结果 emoji 图标 */
  emoji: string
  /** 结果描述文本 */
  description: string
  /** 匹配规则列表 */
  matchRule: MatchRule[]
  /** 结果主题色（十六进制颜色值） */
  color: string
  /** 给用户的建议 */
  advice: string
}

/** Quiz Schema 完整定义 */
export interface QuizSchema {
  /** JSON Schema 引用路径 */
  $schema: string
  /** 测验唯一标识 */
  id: string
  /** 测验标题 */
  title: string
  /** 测验描述 */
  description: string
  /** 测验版本号（语义化版本） */
  version: string
  /** 测验作者 */
  author: string
  /** 测验封面图 URL */
  cover?: string
  /** 所有题目列表 */
  questions: Question[]
  /** 题目分组（可选） */
  sections?: QuestionSection[]
  /** 维度定义列表 */
  dimensions: Dimension[]
  /** 所有结果定义列表 */
  results: QuizResultDef[]
  /** 默认结果（无法匹配时使用） */
  defaultResult: QuizResultDef
  /** 计分策略 */
  scoringStrategy: ScoringStrategy
  /** 平局处理方式 */
  tieBreak: TieBreak
  /** 是否在结果页展示各维度得分 */
  showDimensions: boolean
}

/** 维度分数 */
export interface DimensionScore {
  /** 维度 ID */
  dimensionId: string
  /** 维度名称 */
  name: string
  /** 该维度正向累计分数 */
  score: number
  /** 该维度反向累计分数 */
  oppositeScore: number
  /** 正向百分比（0-100） */
  percentage: number
}

/** 测验结果 */
export interface QuizResult {
  /** 匹配到的结果 ID */
  resultId: string
  /** 匹配到的结果定义 */
  result: QuizResultDef
  /** 各维度得分明细 */
  dimensionScores: DimensionScore[]
  /** 总题目数 */
  totalQuestions: number
  /** 已回答题目数 */
  answeredQuestions: number
}

/** 测验引擎接口 */
export interface QuizEngine {
  /** 加载测验数据 */
  loadQuiz(quizData: QuizSchema): void
  /** 记录对某道题的回答 */
  answerQuestion(questionId: string, selectedOptionIndices: number[]): void
  /** 跳转到指定索引的题目 */
  goToQuestion(index: number): void
  /** 获取当前题目索引 */
  getCurrentQuestionIndex(): number
  /** 获取当前题目 */
  getCurrentQuestion(): Question | null
  /** 获取总题目数 */
  getTotalQuestions(): number
  /** 获取所有已回答的题目及其选择 */
  getAnswers(): Map<string, number[]>
  /** 是否所有题目都已回答 */
  isComplete(): boolean
  /** 获取测验结果（未完成时返回 null） */
  getResult(): QuizResult | null
  /** 获取各维度得分 */
  getDimensionScores(): DimensionScore[]
  /** 重置测验状态 */
  reset(): void
}

/** 测试列表中的测试元信息（从 QuizSchema 提取） */
export interface QuizMeta {
  /** 测验唯一标识 */
  id: string
  /** 测验标题 */
  title: string
  /** 测验描述 */
  description: string
  /** 题目数量 */
  questionCount: number
  /** 测验版本号 */
  version: string
  /** 测验作者 */
  author: string
}
```

---

## 3.3 完整 Zod Schema

以下文件路径：`src/core/schema.ts`

```typescript
// src/core/schema.ts

import { z } from 'zod'

// ==================== 基础枚举 ====================

/** 题目类型枚举 */
const QuestionTypeSchema = z.enum(['single', 'multiple', 'scale'])

/** 计分策略枚举 */
const ScoringStrategySchema = z.enum(['dimension-max', 'total-score', 'weighted'])

/** 平局处理方式枚举 */
const TieBreakSchema = z.enum(['first', 'random'])

// ==================== 嵌套对象 ====================

/** 题目选项 */
const QuestionOptionSchema = z.object({
  /** 选项显示文本 */
  label: z.string().min(1, '选项文本不能为空'),
  /** 维度ID → 分数映射 */
  scores: z.record(z.string(), z.number()),
})

/** 量表配置（仅 type=scale 时使用） */
const ScaleConfigSchema = z.object({
  /** 量表最小值 */
  min: z.number(),
  /** 量表最大值 */
  max: z.number(),
  /** 最小值标签 */
  minLabel: z.string().min(1, '最小值标签不能为空'),
  /** 最大值标签 */
  maxLabel: z.string().min(1, '最大值标签不能为空'),
})

/** 题目定义 */
const QuestionSchema = z.object({
  /** 题目唯一标识 */
  id: z.string().min(1, '题目 ID 不能为空'),
  /** 题目文本 */
  text: z.string().min(1, '题目文本不能为空'),
  /** 题目类型 */
  type: QuestionTypeSchema,
  /** 题目配图 URL，无配图时为 null */
  image: z.string().nullable(),
  /** 选项列表 */
  options: z
    .array(QuestionOptionSchema)
    .min(2, '每道题至少需要 2 个选项'),
  /** 是否随机打乱选项顺序 */
  shuffleOptions: z.boolean(),
  /** 量表配置，仅 type=scale 时使用 */
  scaleConfig: ScaleConfigSchema.optional(),
})

/** 题目分组 */
const QuestionSectionSchema = z.object({
  /** 分组唯一标识 */
  id: z.string().min(1, '分组 ID 不能为空'),
  /** 分组标题 */
  title: z.string().min(1, '分组标题不能为空'),
  /** 分组描述 */
  description: z.string(),
  /** 该分组包含的题目 ID 列表 */
  questionIds: z.array(z.string()).min(1, '分组至少需要包含 1 道题'),
})

/** 维度定义 */
const DimensionSchema = z.object({
  /** 维度唯一标识 */
  id: z.string().min(1, '维度 ID 不能为空'),
  /** 维度名称 */
  name: z.string().min(1, '维度名称不能为空'),
  /** 对立维度标识 */
  opposite: z.string().min(1, '对立维度 ID 不能为空'),
  /** 对立维度名称 */
  oppositeName: z.string().min(1, '对立维度名称不能为空'),
})

/** 结果匹配规则 */
const MatchRuleSchema = z.object({
  /** 维度 ID */
  dimension: z.string().min(1, '维度 ID 不能为空'),
  /** 该维度应匹配的值 */
  value: z.string().min(1, '匹配值不能为空'),
})

/** 结果定义 */
const QuizResultDefSchema = z.object({
  /** 结果唯一标识 */
  id: z.string().min(1, '结果 ID 不能为空'),
  /** 结果名称 */
  name: z.string().min(1, '结果名称不能为空'),
  /** 结果 emoji 图标 */
  emoji: z.string().min(1, 'emoji 不能为空'),
  /** 结果描述文本 */
  description: z.string().min(1, '结果描述不能为空'),
  /** 匹配规则列表 */
  matchRule: z.array(MatchRuleSchema),
  /** 结果主题色（十六进制颜色值） */
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/, '颜色格式应为 #RRGGBB'),
  /** 给用户的建议 */
  advice: z.string().min(1, '建议不能为空'),
})

// ==================== 顶层 Schema ====================

/** Quiz Schema 完整定义 */
export const quizSchema = z.object({
  /** JSON Schema 引用路径 */
  $schema: z.string(),
  /** 测验唯一标识 */
  id: z.string().min(1, '测验 ID 不能为空'),
  /** 测验标题 */
  title: z.string().min(1, '测验标题不能为空'),
  /** 测验描述 */
  description: z.string().min(1, '测验描述不能为空'),
  /** 测验版本号 */
  version: z.string().min(1, '版本号不能为空'),
  /** 测验作者 */
  author: z.string().min(1, '作者不能为空'),
  /** 测验封面图 URL（可选） */
  cover: z.string().optional(),
  /** 所有题目列表 */
  questions: z
    .array(QuestionSchema)
    .min(1, '至少需要 1 道题目'),
  /** 题目分组（可选） */
  sections: z.array(QuestionSectionSchema).optional(),
  /** 维度定义列表 */
  dimensions: z
    .array(DimensionSchema)
    .min(1, '至少需要 1 个维度'),
  /** 所有结果定义列表 */
  results: z
    .array(QuizResultDefSchema)
    .min(1, '至少需要 1 个结果定义'),
  /** 默认结果 */
  defaultResult: QuizResultDefSchema,
  /** 计分策略 */
  scoringStrategy: ScoringStrategySchema,
  /** 平局处理方式 */
  tieBreak: TieBreakSchema,
  /** 是否在结果页展示各维度得分 */
  showDimensions: z.boolean(),
})

// ==================== 校验函数 ====================

/** 校验结果类型 */
export interface ValidateResult {
  /** 是否校验通过 */
  success: boolean
  /** 校验通过时的解析数据 */
  data?: z.infer<typeof quizSchema>
  /** 校验失败时的错误信息列表 */
  errors: string[]
}

/**
 * 校验测验数据
 * @param input - 待校验的未知类型数据
 * @returns 校验结果，包含 success、data（成功时）、errors（失败时）
 */
export function validateQuiz(input: unknown): ValidateResult {
  const result = quizSchema.safeParse(input)

  if (result.success) {
    return {
      success: true,
      data: result.data,
      errors: [],
    }
  }

  // 将 Zod 的错误信息转换为可读的字符串列表
  const errors = result.error.errors.map((err) => {
    const path = err.path.join('.')
    return path ? `${path}: ${err.message}` : err.message
  })

  return {
    success: false,
    errors,
  }
}

// ==================== 类型导出 ====================

/** 从 Zod Schema 推导出的 TypeScript 类型 */
export type QuizSchemaType = z.infer<typeof quizSchema>
```

---

## 3.4 计分算法

### 3.4.1 dimension-max（默认，此策略适用于对立维度型测验）

此策略适用于对立维度型测验（如性格倾向测试），每个维度有两个对立面，取分数较高的一端。

```typescript
// ==================== dimension-max 计分策略 ====================

/**
 * 步骤 1：累加各维度分数
 * 遍历所有已回答的题目，根据用户选中的选项累加各维度分数。
 * 使用一个 Map<string, number> 存储每个维度的累计分数。
 */
function accumulateDimensionScores(
  answers: Map<string, number[]>,    // questionId → 选中的选项索引数组
  questions: Question[],             // 所有题目定义
): Map<string, number> {
  const scores = new Map<string, number>()

  for (const [questionId, selectedIndices] of answers) {
    // 根据 questionId 找到对应的题目
    const question = questions.find((q) => q.id === questionId)
    if (!question) continue

    // 遍历用户选中的每个选项，累加其 scores
    for (const optionIndex of selectedIndices) {
      const option = question.options[optionIndex]
      if (!option) continue

      for (const [dimensionId, score] of Object.entries(option.scores)) {
        const current = scores.get(dimensionId) ?? 0
        scores.set(dimensionId, current + score)
      }
    }
  }

  return scores
}

/**
 * 步骤 2：对每个维度，比较正向和反向分数，取较高的一端
 * 将每个维度的胜出值组合成结果 ID。
 * 例如：E/I 维度 I 得 10 分、E 得 4 分 → 取 I
 *       S/N 维度 N 得 8 分、S 得 6 分 → 取 N
 *       T/F 维度 T 得 12 分、F 得 2 分 → 取 T
 *       J/P 维度 J 得 7 分、P 得 7 分 → 平局，按 tieBreak 处理
 *       最终结果 ID = "INTJ"
 */
function resolveDimensionMax(
  scores: Map<string, number>,
  dimensions: Dimension[],
  tieBreak: TieBreak,
): string[] {
  const winners: string[] = []

  for (const dimension of dimensions) {
    const positiveScore = scores.get(dimension.id) ?? 0
    const negativeScore = scores.get(dimension.opposite) ?? 0

    if (positiveScore > negativeScore) {
      // 正向分数更高，取正向
      winners.push(dimension.id)
    } else if (negativeScore > positiveScore) {
      // 反向分数更高，取反向
      winners.push(dimension.opposite)
    } else {
      // 平局处理
      if (tieBreak === 'first') {
        // 取维度定义中正向的值（即 dimension.id）
        winners.push(dimension.id)
      } else {
        // 随机选择一端
        const pick = Math.random() < 0.5 ? dimension.id : dimension.opposite
        winners.push(pick)
      }
    }
  }

  return winners
}

/**
 * 步骤 3：将胜出值组合成结果 ID
 * 例如 winners = ["I", "N", "T", "J"] → resultId = "INTJ"
 */
function buildResultId(winners: string[]): string {
  return winners.join('')
}

/**
 * 步骤 4：在 results 数组中查找 matchRule 完全匹配的结果
 * 遍历所有 results，检查每个 result 的 matchRule 是否与计算出的维度胜出值完全一致。
 * 如果找到匹配项，返回该结果；否则返回 defaultResult。
 */
function findMatchedResult(
  resultId: string,
  results: QuizResultDef[],
  defaultResult: QuizResultDef,
  dimensions: Dimension[],
): QuizResultDef {
  // 先尝试按 resultId 精确匹配
  const exactMatch = results.find((r) => r.id === resultId)
  if (exactMatch) return exactMatch

  // 再尝试按 matchRule 逐条匹配
  const matched = results.find((result) => {
    // matchRule 为空的结果不参与匹配
    if (result.matchRule.length === 0) return false

    return result.matchRule.every((rule) => {
      // 在 winners 中查找该维度的胜出值
      const dimension = dimensions.find((d) => d.id === rule.dimension)
      if (!dimension) return false

      // 检查该维度在 resultId 中的位置对应的值是否匹配
      const dimensionIndex = dimensions.indexOf(dimension)
      return resultId[dimensionIndex] === rule.value
    })
  })

  return matched ?? defaultResult
}

/**
 * 完整的 dimension-max 计分流程
 */
function calculateDimensionMax(
  answers: Map<string, number[]>,
  questions: Question[],
  dimensions: Dimension[],
  results: QuizResultDef[],
  defaultResult: QuizResultDef,
  tieBreak: TieBreak,
): QuizResult {
  // 步骤 1：累加各维度分数
  const scores = accumulateDimensionScores(answers, questions)

  // 步骤 2：对每个维度取分数较高的一端
  const winners = resolveDimensionMax(scores, dimensions, tieBreak)

  // 步骤 3：组合成结果 ID
  const resultId = buildResultId(winners)

  // 步骤 4：查找匹配的结果定义
  const matchedResult = findMatchedResult(resultId, results, defaultResult, dimensions)

  // 步骤 5：计算各维度百分比（用于结果页展示）
  const dimensionScores: DimensionScore[] = dimensions.map((dimension) => {
    const positiveScore = scores.get(dimension.id) ?? 0
    const oppositeScore = scores.get(dimension.opposite) ?? 0
    const total = positiveScore + oppositeScore
    const percentage = total === 0 ? 50 : Math.round((positiveScore / total) * 100)

    return {
      dimensionId: dimension.id,
      name: dimension.name,
      score: positiveScore,
      oppositeScore,
      percentage,
    }
  })

  return {
    resultId: matchedResult.id,
    result: matchedResult,
    dimensionScores,
    totalQuestions: questions.length,
    answeredQuestions: answers.size,
  }
}
```

### 3.4.2 total-score

此策略适用于总分排序型测验，每个结果有一个总分，取总分最高的结果。

```typescript
// ==================== total-score 计分策略 ====================

/**
 * 步骤 1：累加各维度分数（与 dimension-max 相同）
 * 使用 accumulateDimensionScores 函数得到各维度的累计分数。
 */

/**
 * 步骤 2：对每个 result，计算其 matchRule 中所有维度的分数之和
 * 遍历所有 results，根据每个 result 的 matchRule，从累加分数中
 * 提取对应维度的分数并求和，得到该 result 的总分。
 */
function calculateResultTotalScore(
  result: QuizResultDef,
  scores: Map<string, number>,
): number {
  // 如果 matchRule 为空，该结果得分为 0
  if (result.matchRule.length === 0) return 0

  let total = 0
  for (const rule of result.matchRule) {
    total += scores.get(rule.value) ?? 0
  }
  return total
}

/**
 * 步骤 3：取总分最高的 result
 * 如果有多个 result 总分相同，按 tieBreak 处理：
 * - "first"：取 results 数组中排在前面的那个
 * - "random"：从平局的 result 中随机选一个
 */
function findHighestScoreResult(
  results: QuizResultDef[],
  scores: Map<string, number>,
  tieBreak: TieBreak,
): QuizResultDef {
  // 计算每个 result 的总分
  const scored = results.map((result) => ({
    result,
    score: calculateResultTotalScore(result, scores),
  }))

  // 找到最高分
  const maxScore = Math.max(...scored.map((s) => s.score))

  // 筛选出所有达到最高分的 result
  const topResults = scored.filter((s) => s.score === maxScore)

  if (topResults.length === 1) {
    return topResults[0].result
  }

  // 平局处理
  if (tieBreak === 'first') {
    return topResults[0].result
  } else {
    const randomIndex = Math.floor(Math.random() * topResults.length)
    return topResults[randomIndex].result
  }
}

/**
 * 完整的 total-score 计分流程
 */
function calculateTotalScore(
  answers: Map<string, number[]>,
  questions: Question[],
  dimensions: Dimension[],
  results: QuizResultDef[],
  defaultResult: QuizResultDef,
  tieBreak: TieBreak,
): QuizResult {
  // 步骤 1：累加各维度分数
  const scores = accumulateDimensionScores(answers, questions)

  // 步骤 2 & 3：计算每个 result 的总分，取最高分
  const matchedResult = findHighestScoreResult(results, scores, tieBreak)

  // 如果最高分为 0（所有结果 matchRule 都不匹配），返回默认结果
  const maxScore = Math.max(
    ...results.map((r) => calculateResultTotalScore(r, scores)),
  )
  const finalResult = maxScore === 0 ? defaultResult : matchedResult

  // 计算各维度百分比（用于结果页展示）
  const dimensionScores: DimensionScore[] = dimensions.map((dimension) => {
    const positiveScore = scores.get(dimension.id) ?? 0
    const oppositeScore = scores.get(dimension.opposite) ?? 0
    const total = positiveScore + oppositeScore
    const percentage = total === 0 ? 50 : Math.round((positiveScore / total) * 100)

    return {
      dimensionId: dimension.id,
      name: dimension.name,
      score: positiveScore,
      oppositeScore,
      percentage,
    }
  })

  return {
    resultId: finalResult.id,
    result: finalResult,
    dimensionScores,
    totalQuestions: questions.length,
    answeredQuestions: answers.size,
  }
}
```

### 3.4.3 weighted

此策略适用于加权评分型测验，每个结果可以定义各维度的权重，加权求和后取最高分。

```typescript
// ==================== weighted 计分策略 ====================

/**
 * 扩展的 QuizResultDef，支持维度权重定义
 * 在 weighted 策略下，每个 result 可以额外定义 weights 字段，
 * 表示各维度分数在计算该结果总分时的权重。
 *
 * weights 格式示例：
 * {
 *   "E": 1.5,   // E 维度分数权重为 1.5 倍
 *   "I": 0.5,   // I 维度分数权重为 0.5 倍
 *   "N": 1.0,   // N 维度分数权重为 1.0 倍（默认）
 *   "S": 1.0
 * }
 *
 * 如果某个维度未定义权重，默认权重为 1.0。
 */

/** 带权重的结果定义（运行时扩展类型） */
interface WeightedResultDef extends QuizResultDef {
  /** 维度权重映射，维度ID → 权重系数 */
  weights?: Record<string, number>
}

/**
 * 步骤 1：累加各维度分数（与 dimension-max 相同）
 * 使用 accumulateDimensionScores 函数得到各维度的累计分数。
 */

/**
 * 步骤 2：对每个 result，根据其 weights 进行加权求和
 * 遍历 result 的 matchRule，从累加分数中提取对应维度的分数，
 * 乘以该维度在 weights 中定义的权重系数，再求和。
 */
function calculateWeightedScore(
  result: WeightedResultDef,
  scores: Map<string, number>,
): number {
  // 如果 matchRule 为空，该结果得分为 0
  if (result.matchRule.length === 0) return 0

  let total = 0
  for (const rule of result.matchRule) {
    const rawScore = scores.get(rule.value) ?? 0
    // 获取该维度的权重，未定义时默认为 1.0
    const weight = result.weights?.[rule.value] ?? 1.0
    total += rawScore * weight
  }
  return total
}

/**
 * 步骤 3：取加权总分最高的 result
 * 逻辑与 total-score 的 findHighestScoreResult 相同，
 * 但使用的是加权后的分数。
 */
function findHighestWeightedResult(
  results: WeightedResultDef[],
  scores: Map<string, number>,
  tieBreak: TieBreak,
): WeightedResultDef {
  // 计算每个 result 的加权总分
  const scored = results.map((result) => ({
    result,
    score: calculateWeightedScore(result, scores),
  }))

  // 找到最高分
  const maxScore = Math.max(...scored.map((s) => s.score))

  // 筛选出所有达到最高分的 result
  const topResults = scored.filter((s) => s.score === maxScore)

  if (topResults.length === 1) {
    return topResults[0].result
  }

  // 平局处理
  if (tieBreak === 'first') {
    return topResults[0].result
  } else {
    const randomIndex = Math.floor(Math.random() * topResults.length)
    return topResults[randomIndex].result
  }
}

/**
 * 完整的 weighted 计分流程
 */
function calculateWeighted(
  answers: Map<string, number[]>,
  questions: Question[],
  dimensions: Dimension[],
  results: WeightedResultDef[],
  defaultResult: QuizResultDef,
  tieBreak: TieBreak,
): QuizResult {
  // 步骤 1：累加各维度分数
  const scores = accumulateDimensionScores(answers, questions)

  // 步骤 2 & 3：计算每个 result 的加权总分，取最高分
  const matchedResult = findHighestWeightedResult(results, scores, tieBreak)

  // 如果最高分为 0，返回默认结果
  const maxScore = Math.max(
    ...results.map((r) => calculateWeightedScore(r, scores)),
  )
  const finalResult = maxScore === 0 ? defaultResult : matchedResult

  // 计算各维度百分比（用于结果页展示）
  const dimensionScores: DimensionScore[] = dimensions.map((dimension) => {
    const positiveScore = scores.get(dimension.id) ?? 0
    const oppositeScore = scores.get(dimension.opposite) ?? 0
    const total = positiveScore + oppositeScore
    const percentage = total === 0 ? 50 : Math.round((positiveScore / total) * 100)

    return {
      dimensionId: dimension.id,
      name: dimension.name,
      score: positiveScore,
      oppositeScore,
      percentage,
    }
  })

  return {
    resultId: finalResult.id,
    result: finalResult,
    dimensionScores,
    totalQuestions: questions.length,
    answeredQuestions: answers.size,
  }
}
```

---

## 3.5 题目类型规格

### MVP 支持的题型

| 字段 | `single`（单选题） | `multiple`（多选题） | 说明 |
|------|---------------------|----------------------|------|
| `type` | `"single"` | `"multiple"` | 题目类型标识 |
| `options` | 2 个及以上 | 2 个及以上 | 选项列表，每个选项包含 `label` 和 `scores` |
| `shuffleOptions` | `true` / `false` | `true` / `false` | 是否随机打乱选项顺序 |
| `image` | `string \| null` | `string \| null` | 题目配图，可为空 |
| 用户选择 | 恰选 1 个选项 | 可选 1 个或多个选项 | 前端交互层面的约束 |
| 计分方式 | 取选中选项的 `scores` 进行累加 | 取所有选中选项的 `scores` 进行累加 | 引擎层面的分数计算 |
| `scaleConfig` | 不使用 | 不使用 | 仅 `scale` 类型使用 |

### 单选题（single）详细说明

- 用户必须且只能选择一个选项
- 前端应使用单选按钮（radio button）或卡片式单选交互
- 如果用户未选择就点击"下一题"，应阻止跳转并提示
- 计分时，仅将用户选中的那一个选项的 `scores` 累加到各维度

### 多选题（multiple）详细说明

- 用户可以选择一个或多个选项
- 前端应使用复选框（checkbox）或卡片式多选交互
- 如果用户未选择任何选项就点击"下一题"，应阻止跳转并提示
- 计分时，将用户选中的所有选项的 `scores` 累加到各维度
- 例如：用户同时选了选项 A（`{ "E": 2, "I": 0 }`）和选项 C（`{ "E": 1, "I": 1 }`），则 E 维度累加 3 分，I 维度累加 1 分

### 量表题（scale）—— P1，MVP 不实现

| 字段 | `scale`（量表题） | 说明 |
|------|---------------------|------|
| `type` | `"scale"` | 题目类型标识 |
| `options` | 不使用 | 量表题不使用 options 字段 |
| `scaleConfig.min` | 数字（如 1） | 量表最小值 |
| `scaleConfig.max` | 数字（如 5 或 7） | 量表最大值 |
| `scaleConfig.minLabel` | 字符串（如 "非常不同意"） | 最小值标签 |
| `scaleConfig.maxLabel` | 字符串（如 "非常同意"） | 最大值标签 |
| `shuffleOptions` | 不使用 | 量表题不使用此字段 |
| 用户选择 | 在 min ~ max 之间选择一个整数值 | 前端使用滑块或 Likert 量表交互 |
| 计分方式 | 根据选择的值，按预设的分数映射表累加 | 具体映射规则待 P1 阶段定义 |

> **优先级说明**：`scale` 类型标记为 P1（第二优先级），MVP 阶段仅实现 `single` 和 `multiple` 两种题型。`scale` 的完整交互设计和计分规则将在 P1 阶段的 PRD 补充文档中详细定义。

---


---

## 第 4 章：项目结构与文件清单

### 4.1 MVP 文件树

```
quizlight/
├── public/
│   └── favicon.ico
├── src/
│   ├── core/                    # 测验引擎（框架无关，纯 TypeScript）
│   │   ├── types.ts             # 所有 TypeScript 类型定义
│   │   ├── schema.ts            # Zod schema 校验
│   │   ├── engine.ts            # QuizEngine 类实现
│   │   ├── plugins.ts           # 插件注册表与内置插件
│   │   └── index.ts             # 统一导出
│   ├── composables/             # Vue composables（状态管理）
│   │   ├── useQuizState.ts      # 答题状态管理
│   │   ├── useI18n.ts           # 多语言状态管理
│   │   └── useTheme.ts          # 深浅主题状态管理
│   ├── components/              # Vue 组件
│   │   ├── QuizCard.vue         # 测试列表卡片
│   │   ├── Question.vue         # 题目渲染器
│   │   ├── ProgressBar.vue      # 答题进度条
│   │   ├── LanguageToggle.vue   # 语言切换按钮
│   │   ├── ThemeToggle.vue      # 主题切换按钮
│   │   ├── ScoreBar.vue         # 维度分数条
│   │   └── ResultCard.vue       # 结果展示卡片
│   ├── views/                   # 页面视图
│   │   ├── HomeView.vue         # 测试列表页
│   │   ├── QuizView.vue         # 答题页
│   │   └── ResultView.vue       # 结果页
│   ├── App.vue                  # 根组件
│   ├── main.ts                  # 入口文件
│   └── router.ts                # 路由配置
├── quizzes/                     # 测试题库（JSON 文件）
│   └── sample-test.json           # 示例测试（28 题）
├── index.html                   # HTML 入口
├── package.json                 # 依赖配置
├── vite.config.ts               # Vite 配置
├── tsconfig.json                # TypeScript 配置
├── uno.config.ts                # UnoCSS 配置
└── LICENSE                      # MIT License
```

### 4.2 文件职责说明

| 文件 | 职责 |
|------|------|
| `src/core/types.ts` | 定义 `QuizSchema`、`Question`、`Dimension`、`QuizResult` 等所有 TypeScript 类型 |
| `src/core/schema.ts` | 用 Zod 实现 Quiz JSON 的运行时校验，确保题库数据格式正确 |
| `src/core/engine.ts` | `QuizEngine` 类：加载题库、记录答案、按维度计分并计算最终结果 |
| `src/core/plugins.ts` | 插件注册表与插件接口集成入口，统一管理插件加载与默认插件 |
| `src/core/index.ts` | 统一导出 core 模块的所有类型和引擎，供外部模块引用 |
| `src/composables/useQuizState.ts` | 管理答题状态：当前题目索引、用户答案收集、结果计算与缓存 |
| `src/composables/useI18n.ts` | 管理当前语言与翻译函数 `t()`，并将用户选择持久化到 localStorage |
| `src/composables/useTheme.ts` | 管理深浅主题状态（跟随系统或手动切换），并将用户选择持久化到 localStorage |
| `src/components/QuizCard.vue` | 首页测试卡片，展示测试标题、描述和题目数量 |
| `src/components/Question.vue` | 渲染单道题目（单选/多选/图片题），通过 `v-model` 向外传递用户选择 |
| `src/components/ProgressBar.vue` | 顶部进度条，显示当前题号与总题数，提供答题进度可视化 |
| `src/components/LanguageToggle.vue` | 语言切换组件，供各页面头部使用 |
| `src/components/ThemeToggle.vue` | 主题切换组件，供各页面头部使用 |
| `src/components/ScoreBar.vue` | 结果页维度分数条，水平条形图展示各维度得分百分比 |
| `src/components/ResultCard.vue` | 结果展示卡片，包含类型标签、描述、维度分数条和建议 |
| `src/views/HomeView.vue` | 测试列表页，扫描 `quizzes/` 目录展示所有可用测试 |
| `src/views/QuizView.vue` | 答题页，一题一页模式，含进度条、题目渲染和翻页控制 |
| `src/views/ResultView.vue` | 结果页，展示测试结果、维度分数条和操作按钮 |
| `src/App.vue` | 根组件，包含 `<router-view>`、全局布局结构与 PWA 更新提示 |
| `src/main.ts` | 创建 Vue 应用实例，挂载路由插件并渲染到 DOM |
| `src/router.ts` | 定义 `/`、`/quiz/:id`、`/result/:id` 三条路由规则 |
| `quizzes/sample-test.json` | 示例测试数据（28 题，16 种结果类型） |
| `index.html` | HTML 入口文件，挂载 Vue 应用根节点 |
| `package.json` | 项目依赖配置（Vue 3、Vue Router、Zod、UnoCSS 等） |
| `vite.config.ts` | Vite 构建配置，包含 UnoCSS 与 PWA 插件配置 |
| `tsconfig.json` | TypeScript 编译配置，启用严格模式和路径别名 |
| `uno.config.ts` | UnoCSS 原子化 CSS 配置，定义主题色和预设规则 |
| `LICENSE` | MIT 开源许可证文件 |

### 4.3 目录设计原则

1. **core/ 与 UI 分离**：`src/core/` 中的引擎代码为纯 TypeScript，不依赖 Vue，可独立测试和复用。
2. **composables/ 集中状态**：所有响应式答题状态通过 `useQuizState` composable 管理，视图层只负责渲染。
3. **views/ 与 components/ 分层**：`views/` 负责页面级布局和路由对接；`components/` 负责可复用的 UI 单元。
4. **quizzes/ 独立于 src**：题库 JSON 文件放在项目根目录的 `quizzes/` 下，方便非开发人员编辑和维护，也便于后续扩展为远程加载。

---

## 第 5 章：组件接口规格

本章为每个 Vue 组件定义完整的 `Props`、`Events`、`Slots` 接口以及渲染要求。所有组件均使用 `<script setup lang="ts">` 语法和 Composition API。

### 5.1 QuizCard.vue

测试列表卡片组件，用于首页展示单个测试的摘要信息。

```typescript
// ===== Props =====
interface Props {
  /** 测试元信息对象 */
  quiz: QuizMeta
  // QuizMeta 结构：
  // {
  //   id: string          // 测试唯一标识
  //   title: string       // 测试标题
  //   description: string // 测试描述
  //   questionCount: number // 题目总数
  //   version: string     // 版本号
  //   author: string      // 作者
  // }
}

// ===== Events =====
interface Emits {
  /** 点击卡片时触发，传递测试 ID */
  click: [quizId: string]
}

// ===== Slots =====
// 无命名 slot
// 默认 slot 可用于自定义卡片内容（MVP 阶段不使用）
```

**渲染要求：**

- 卡片式布局，圆角（`rounded-xl`），带阴影（`shadow-md`）
- 标题使用大号加粗字体（`text-xl font-bold`）
- 描述使用小号灰色字体（`text-sm text-gray-500`），最多显示两行并截断
- 右下角或底部显示题目数量标签（如 `28 题`），使用 badge 样式
- hover 时卡片轻微上浮（`hover:-translate-y-1`）并加深阴影（`hover:shadow-lg`）
- 过渡动画使用 `transition-all duration-200`
- 点击整个卡片区域触发 `click` 事件，光标显示为 `cursor-pointer`

**使用示例：**

```vue
<QuizCard
  :quiz="{
    id: 'sample-test',
    title: '示例测试',
    description: '通过 28 道题快速了解你的性格类型',
    questionCount: 28,
    version: '1.0.0',
    author: 'QuizLight'
  }"
  @click="handleCardClick"
/>
```

---

### 5.2 Question.vue

题目渲染器组件，负责展示单道题目并收集用户答案。支持单选、多选和图片题三种题型。

```typescript
// ===== Props =====
interface Props {
  /** 当前题目对象 */
  question: Question
  // Question 结构：
  // {
  //   id: string              // 题目 ID
  //   text: string            // 题目文本
  //   type: 'single' | 'multiple'  // 题目类型
  //   options: QuestionOption[]     // 选项数组
  //   image: string | null         // 图片 URL（可选）
  //   dimensionId: string          // 所属维度 ID
  // }
  /** 当前选中的选项索引数组（v-model 绑定） */
  modelValue: number[]
  /** 当前题号（从 1 开始） */
  questionNumber: number
  /** 总题数 */
  totalQuestions: number
}

// ===== Events =====
interface Emits {
  /** v-model 更新事件，传递最新选中的选项索引数组 */
  'update:modelValue': [value: number[]]
}

// ===== Slots =====
// 无命名 slot（MVP 阶段不使用）
```

**渲染要求：**

- 顶部显示题号，格式为 `"1 / 28"`，使用 `text-sm text-gray-400` 样式
- 题目文本使用大号加粗字体（`text-lg font-semibold`），居左对齐
- 图片题：当 `question.image` 不为 `null` 时，在题目文本上方渲染图片，图片宽度 100%，圆角 `rounded-lg`
- 选项列表垂直排列，各选项之间有适当间距（`space-y-3`）
- **单选题（`type === 'single'`）**：
  - 选项为 radio 样式，左侧显示圆形指示器
  - 点击选项即选中，同时自动取消之前选中的选项
  - 选中项高亮显示（边框变色 + 背景色）
- **多选题（`type === 'multiple'`）**：
  - 选项为 checkbox 样式，左侧显示方形指示器
  - 点击选项切换选中/取消状态，不影响其他选项
  - 已选中的选项高亮显示
- 所有选项 hover 时显示浅色背景反馈
- 选项文本左对齐，支持多行文本自动换行

**使用示例：**

```vue
<Question
  :question="currentQuestion"
  v-model="selectedOptions"
  :question-number="1"
  :total-questions="28"
/>
```

---

### 5.3 ProgressBar.vue

答题进度条组件，固定在答题页顶部，实时显示答题进度。

```typescript
// ===== Props =====
interface Props {
  /** 当前题号（从 1 开始） */
  current: number
  /** 总题数 */
  total: number
}

// ===== Events =====
// 无

// ===== Slots =====
// 无
```

**渲染要求：**

- 使用 `sticky top-0` 固定在页面顶部，滚动时不消失
- 进度条高度为 `h-1`（细条风格），背景色为 `bg-gray-200`
- 填充部分宽度 = `(current / total) * 100%`，颜色使用 CSS 变量 `var(--primary)`
- 进度条下方显示文字，格式为 `"3 / 28"`，使用 `text-xs text-gray-500 text-center` 样式
- 进度变化时填充宽度有平滑过渡动画（`transition-all duration-300`）
- 组件自带浅色背景（`bg-white/80 backdrop-blur`），避免与下方内容视觉混淆

**使用示例：**

```vue
<ProgressBar :current="3" :total="28" />
```

---

### 5.4 ScoreBar.vue

维度分数条组件，用于结果页以水平条形图展示各维度的得分情况。

```typescript
// ===== Props =====
interface Props {
  /** 维度分数数据 */
  dimension: DimensionScore
  // DimensionScore 结构：
  // {
  //   dimensionId: string    // 维度 ID
  //   name: string           // 维度名称（如"外倾 E"）
  //   score: number          // 正向得分
  //   oppositeScore: number  // 反向得分
  //   percentage: number     // 正向百分比（0-100）
  // }
  /** 是否显示维度名称标签，默认为 true */
  showLabel?: boolean
}

// ===== Events =====
// 无

// ===== Slots =====
// 无
```

**渲染要求：**

- 水平条形图布局，整体高度固定（约 `h-8`）
- 左侧显示维度名称（如 `"外倾 E"`），宽度固定（`w-24`），使用 `text-sm font-medium` 样式
- 中间为条形容器，背景色为 `bg-gray-100`，圆角 `rounded-full`
- 条形填充宽度 = `dimension.percentage%`，颜色使用 CSS 变量 `var(--primary)`
- 反向维度部分使用 `var(--muted)` 色（灰色调）
- 右侧显示百分比数字（如 `"75%"`），使用 `text-sm text-gray-600` 样式，宽度固定（`w-12 text-right`）
- 条形填充有过渡动画（`transition-all duration-500`）
- 当 `showLabel` 为 `false` 时，隐藏左侧维度名称（用于紧凑布局场景）

**使用示例：**

```vue
<ScoreBar
  :dimension="{
    dimensionId: 'ei',
    name: '外倾 E',
    score: 14,
    oppositeScore: 10,
    percentage: 58
  }"
  :show-label="true"
/>
```

---

### 5.5 ResultCard.vue

结果展示卡片组件，用于结果页集中展示测试结论、维度分数和建议。

```typescript
// ===== Props =====
interface Props {
  /** 结果定义对象 */
  result: QuizResultDef
  // QuizResultDef 结构：
  // {
  //   id: string           // 结果 ID（如 "INTJ"）
  //   name: string         // 结果名称（如 "独立思考者"）
  //   emoji: string        // 结果图标（如 "♟️"）
  //   description: string  // 结果描述
  //   advice: string       // 建议
  // }
  /** 各维度分数数组 */
  dimensionScores: DimensionScore[]
}

// ===== Events =====
interface Emits {
  /** 点击"重新测试"按钮时触发 */
  retake: []
  /** 点击"返回首页"按钮时触发 */
  goHome: []
}

// ===== Slots =====
// 无命名 slot（MVP 阶段不使用）
```

**渲染要求：**

- 卡片式布局，圆角（`rounded-2xl`），带阴影（`shadow-lg`），内边距充足（`p-6`）
- **顶部区域**：
  - 大号 emoji 居中显示（`text-5xl`）
  - 结果名称使用超大加粗字体（`text-2xl font-bold text-center`）
  - 结果 ID 标签使用 badge 样式（如 `bg-primary/10 text-primary px-3 py-1 rounded-full text-sm`），居中显示
- **描述区域**：
  - `description` 文字使用 `text-base text-gray-700 leading-relaxed` 样式
  - 段落之间有适当间距（`mt-4`）
- **维度分数区域**：
  - 标题"维度分析"使用 `text-lg font-semibold` 样式
  - 各维度使用 `ScoreBar` 组件渲染，垂直排列（`space-y-3`）
  - 区域顶部有分隔线（`border-t`）
- **建议区域**：
  - `advice` 文字使用引用样式（`border-l-4 border-primary pl-4 italic text-gray-600`）
  - 区域顶部有分隔线
- **底部操作区域**：
  - 两个按钮水平排列，居中对齐
  - "重新测试"按钮：主要样式（`bg-primary text-white`），点击触发 `retake` 事件
  - "返回首页"按钮：次要样式（`border border-gray-300 text-gray-700`），点击触发 `goHome` 事件
  - 两个按钮之间有间距（`gap-4`）

**使用示例：**

```vue
<ResultCard
  :result="{
    id: 'INTJ',
    name: '独立思考者',
    emoji: '♟️',
    description: '你是一个富有远见的战略思考者...',
    advice: '尝试更多地倾听他人的观点...'
  }"
  :dimension-scores="dimensionScores"
  @retake="handleRetake"
  @go-home="handleGoHome"
/>
```

---

### 5.6 组件依赖关系图

```
App.vue
├── HomeView.vue
│   └── QuizCard.vue          (v-for 渲染多个)
├── QuizView.vue
│   ├── ProgressBar.vue       (顶部固定)
│   └── Question.vue          (当前题目)
└── ResultView.vue
    └── ResultCard.vue
        └── ScoreBar.vue      (v-for 渲染多个)
```

### 5.7 全局 CSS 变量约定

所有组件共享以下 CSS 变量（在 `index.html` 或全局样式中定义）：

```css
:root {
  --primary: #6366f1;       /* 主色调 - 靛蓝色 */
  --primary-light: #818cf8; /* 主色调浅色 */
  --primary-dark: #4f46e5;  /* 主色调深色 */
  --muted: #9ca3af;         /* 次要/灰色调 */
  --bg: #ffffff;            /* 页面背景色 */
  --fg: #111827;            /* 前景文字色 */
  --border: #e5e7eb;        /* 边框色 */
  --radius: 0.75rem;        /* 统一圆角 */
}
```

组件内部通过 `var(--primary)` 等方式引用，确保主题可全局替换。

---


---

## 第 6 章：分步实现计划

本章按照 10 个 Step 逐步完成 QuizLight MVP 的全部代码。每个 Step 提供完整可复制的文件内容，并在末尾标注验证方式。AI Agent 应严格按照 Step 顺序执行，每完成一步都进行验证后再进入下一步。

---

### Step 1: 项目初始化

创建项目根目录及以下文件。

**package.json**：

```json
{
  "name": "quizlight",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc --noEmit && vite build",
    "preview": "vite preview",
    "deploy": "vue-tsc --noEmit && vite build && gh-pages -d dist"
  },
  "dependencies": {
    "vue": "^3.5.0",
    "vue-router": "^4.5.0",
    "zod": "^3.24.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.2.0",
    "@vue/test-utils": "^2.4.0",
    "gh-pages": "^6.3.0",
    "typescript": "~5.7.0",
    "uno": "^2.0.0",
    "unocss": "^66.0.0",
    "vite": "^6.2.0",
    "vitest": "^3.0.0",
    "vue-tsc": "^2.2.0"
  }
}
```

**vite.config.ts**：

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue(), UnoCSS()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
```

**tsconfig.json**：

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "jsx": "preserve",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "noEmit": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.vue", "quizzes/**/*.json"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

**tsconfig.node.json**：

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

**uno.config.ts**：

```typescript
// uno.config.ts
import { defineConfig, presetUno, presetAttributify } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
  ],
  theme: {
    colors: {
      primary: {
        DEFAULT: '#6366f1',
        light: '#818cf8',
        dark: '#4f46e5',
      },
      muted: '#9ca3af',
    },
  },
})
```

**index.html**：

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>QuizLight</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

**src/main.ts**：

```typescript
// src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'virtual:uno.css'

const app = createApp(App)
app.use(router)
app.mount('#app')
```

**src/App.vue**：

```vue
<!-- src/App.vue -->
<script setup lang="ts">
</script>

<template>
  <router-view />
</template>

<style>
:root {
  --primary: #6366f1;
  --primary-light: #818cf8;
  --primary-dark: #4f46e5;
  --muted: #9ca3af;
  --bg: #ffffff;
  --fg: #111827;
  --border: #e5e7eb;
  --radius: 0.75rem;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: var(--bg);
  color: var(--fg);
  min-height: 100vh;
}
</style>
```

**验证**：`pnpm install && pnpm dev`，浏览器访问 http://localhost:5173 显示空白页（正常）。

---

### Step 2: 类型层

创建 `src/core/types.ts`、`src/core/schema.ts`、`src/core/index.ts`。

`src/core/types.ts` 和 `src/core/schema.ts` 的完整代码已在第 3 章（3.2 和 3.3）中定义，AI Agent 应直接从第 3 章复制。

**src/core/index.ts**：

```typescript
// src/core/index.ts
export type {
  QuestionType,
  ScoringStrategy,
  TieBreak,
  QuestionOption,
  ScaleConfig,
  Question,
  QuestionSection,
  Dimension,
  MatchRule,
  QuizResultDef,
  QuizSchema,
  DimensionScore,
  QuizResult,
  QuizEngine,
  QuizMeta,
} from './types'

export { quizSchema, validateQuiz } from './schema'
export type { ValidateResult } from './schema'
```

**验证**：`pnpm tsc --noEmit` 无报错。

---

### Step 3: 测验引擎

创建 `src/core/engine.ts`，实现 QuizEngine 类。

```typescript
// src/core/engine.ts
import type {
  QuizSchema,
  Question,
  QuizResult,
  QuizResultDef,
  DimensionScore,
  Dimension,
  TieBreak,
} from './types'

/**
 * QuizEngine — 测验引擎核心类
 * 框架无关的纯 TypeScript 实现，负责加载题库、记录答案、计算结果。
 */
export class QuizEngine {
  private quizData: QuizSchema | null = null
  private answers = new Map<string, number[]>()
  private currentQuestionIndex = 0

  /** 加载测验数据 */
  loadQuiz(quizData: QuizSchema): void {
    this.quizData = quizData
    this.answers.clear()
    this.currentQuestionIndex = 0
  }

  /** 记录对某道题的回答 */
  answerQuestion(questionId: string, selectedOptionIndices: number[]): void {
    if (!this.quizData) return
    this.answers.set(questionId, selectedOptionIndices)
  }

  /** 跳转到指定索引的题目 */
  goToQuestion(index: number): void {
    if (!this.quizData) return
    this.currentQuestionIndex = Math.max(0, Math.min(index, this.quizData.questions.length - 1))
  }

  /** 获取当前题目索引 */
  getCurrentQuestionIndex(): number {
    return this.currentQuestionIndex
  }

  /** 获取当前题目 */
  getCurrentQuestion(): Question | null {
    if (!this.quizData) return null
    return this.quizData.questions[this.currentQuestionIndex] ?? null
  }

  /** 获取总题目数 */
  getTotalQuestions(): number {
    return this.quizData?.questions.length ?? 0
  }

  /** 获取所有已回答的题目及其选择 */
  getAnswers(): Map<string, number[]> {
    return new Map(this.answers)
  }

  /** 是否所有题目都已回答 */
  isComplete(): boolean {
    if (!this.quizData) return false
    return this.answers.size === this.quizData.questions.length
  }

  /** 获取各维度得分 */
  getDimensionScores(): DimensionScore[] {
    if (!this.quizData) return []

    const scores = this.accumulateScores()
    return this.quizData.dimensions.map((dimension) => {
      const positiveScore = scores.get(dimension.id) ?? 0
      const oppositeScore = scores.get(dimension.opposite) ?? 0
      const total = positiveScore + oppositeScore
      const percentage = total === 0 ? 50 : Math.round((positiveScore / total) * 100)

      return {
        dimensionId: dimension.id,
        name: dimension.name,
        score: positiveScore,
        oppositeScore,
        percentage,
      }
    })
  }

  /** 获取测验结果 */
  getResult(): QuizResult | null {
    if (!this.quizData || !this.isComplete()) return null

    const scores = this.accumulateScores()
    const strategy = this.quizData.scoringStrategy

    let matchedResult: QuizResultDef

    if (strategy === 'dimension-max') {
      matchedResult = this.calculateDimensionMax(scores)
    } else if (strategy === 'total-score') {
      matchedResult = this.calculateTotalScore(scores)
    } else {
      matchedResult = this.calculateTotalScore(scores) // weighted 暂用 total-score 逻辑
    }

    const dimensionScores = this.getDimensionScores()

    return {
      resultId: matchedResult.id,
      result: matchedResult,
      dimensionScores,
      totalQuestions: this.quizData.questions.length,
      answeredQuestions: this.answers.size,
    }
  }

  /** 重置测验状态 */
  reset(): void {
    this.answers.clear()
    this.currentQuestionIndex = 0
  }

  /** 累加各维度分数 */
  private accumulateScores(): Map<string, number> {
    const scores = new Map<string, number>()
    if (!this.quizData) return scores

    for (const [questionId, selectedIndices] of this.answers) {
      const question = this.quizData.questions.find((q) => q.id === questionId)
      if (!question) continue

      for (const optionIndex of selectedIndices) {
        const option = question.options[optionIndex]
        if (!option) continue

        for (const [dimensionId, score] of Object.entries(option.scores)) {
          const current = scores.get(dimensionId) ?? 0
          scores.set(dimensionId, current + score)
        }
      }
    }

    return scores
  }

  /** dimension-max 策略：每个维度取分数较高的一端，组合成结果 ID */
  private calculateDimensionMax(scores: Map<string, number>): QuizResultDef {
    if (!this.quizData) return { id: 'unknown', name: '未知', emoji: '❓', description: '', matchRule: [], color: '#9ca3af', advice: '' }

    const winners: string[] = []

    for (const dimension of this.quizData.dimensions) {
      const positiveScore = scores.get(dimension.id) ?? 0
      const oppositeScore = scores.get(dimension.opposite) ?? 0

      if (positiveScore > oppositeScore) {
        winners.push(dimension.id)
      } else if (oppositeScore > positiveScore) {
        winners.push(dimension.opposite)
      } else {
        // 平局处理
        if (this.quizData.tieBreak === 'first') {
          winners.push(dimension.id)
        } else {
          winners.push(Math.random() < 0.5 ? dimension.id : dimension.opposite)
        }
      }
    }

    const resultId = winners.join('')
    const exactMatch = this.quizData.results.find((r) => r.id === resultId)
    return exactMatch ?? this.quizData.defaultResult
  }

  /** total-score 策略：计算每个结果的维度分数之和，取最高分 */
  private calculateTotalScore(scores: Map<string, number>): QuizResultDef {
    if (!this.quizData) return { id: 'unknown', name: '未知', emoji: '❓', description: '', matchRule: [], color: '#9ca3af', advice: '' }

    let maxScore = -Infinity
    let bestResult: QuizResultDef = this.quizData.defaultResult

    for (const result of this.quizData.results) {
      if (result.matchRule.length === 0) continue

      let total = 0
      for (const rule of result.matchRule) {
        total += scores.get(rule.value) ?? 0
      }

      if (total > maxScore) {
        maxScore = total
        bestResult = result
      } else if (total === maxScore && this.quizData.tieBreak === 'random') {
        if (Math.random() < 0.5) {
          bestResult = result
        }
      }
    }

    return maxScore === -Infinity ? this.quizData.defaultResult : bestResult
  }
}
```

**验证**：`pnpm tsc --noEmit` 无报错。

---

### Step 4: 路由与页面骨架

创建 `src/router.ts` 和三个 View 占位文件。

**src/router.ts**：

```typescript
// src/router.ts
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/quiz/:id',
      name: 'quiz',
      component: () => import('@/views/QuizView.vue'),
    },
    {
      path: '/result/:id',
      name: 'result',
      component: () => import('@/views/ResultView.vue'),
    },
  ],
})

export default router
```

**src/views/HomeView.vue**（占位）：

```vue
<!-- src/views/HomeView.vue -->
<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen p-6">
    <h1 class="text-2xl font-bold mb-4">QuizLight</h1>
    <p>测试列表页（待实现）</p>
  </div>
</template>
```

**src/views/QuizView.vue**（占位）：

```vue
<!-- src/views/QuizView.vue -->
<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
const quizId = route.params.id as string
</script>

<template>
  <div class="min-h-screen p-6">
    <p>答题页 — 测试 ID: {{ quizId }}（待实现）</p>
  </div>
</template>
```

**src/views/ResultView.vue**（占位）：

```vue
<!-- src/views/ResultView.vue -->
<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
const quizId = route.params.id as string
</script>

<template>
  <div class="min-h-screen p-6">
    <p>结果页 — 测试 ID: {{ quizId }}（待实现）</p>
  </div>
</template>
```

**验证**：浏览器访问 `/`、`/quiz/sample-test`、`/result/sample-test` 均有页面渲染。

---

### Step 5: 状态管理 composable

创建 `src/composables/useQuizState.ts`。

```typescript
// src/composables/useQuizState.ts
import { ref, computed } from 'vue'
import { QuizEngine } from '@/core'
import type { QuizSchema, QuizResult, DimensionScore, Question } from '@/core'

/**
 * 答题状态管理 composable
 * 封装 QuizEngine，提供 Vue 响应式状态和方法。
 */
export function useQuizState() {
  const engine = new QuizEngine()
  const quizData = ref<QuizSchema | null>(null)
  const currentQuestionIndex = ref(0)
  const selectedOptions = ref<number[]>([])
  const result = ref<QuizResult | null>(null)

  /** 加载测验 */
  function loadQuiz(data: QuizSchema) {
    quizData.value = data
    engine.loadQuiz(data)
    currentQuestionIndex.value = 0
    selectedOptions.value = []
    result.value = null
  }

  /** 当前题目 */
  const currentQuestion = computed<Question | null>(() => {
    if (!quizData.value) return null
    return quizData.value.questions[currentQuestionIndex.value] ?? null
  })

  /** 总题数 */
  const totalQuestions = computed(() => quizData.value?.questions.length ?? 0)

  /** 是否为第一题 */
  const isFirstQuestion = computed(() => currentQuestionIndex.value === 0)

  /** 是否为最后一题 */
  const isLastQuestion = computed(() => currentQuestionIndex.value >= totalQuestions.value - 1)

  /** 是否所有题目已回答 */
  const isComplete = computed(() => engine.isComplete())

  /** 各维度分数 */
  const dimensionScores = computed<DimensionScore[]>(() => engine.getDimensionScores())

  /** 选择选项 */
  function selectOption(optionIndex: number) {
    if (!currentQuestion.value) return

    if (currentQuestion.value.type === 'single') {
      selectedOptions.value = [optionIndex]
    } else {
      // multiple
      const index = selectedOptions.value.indexOf(optionIndex)
      if (index >= 0) {
        selectedOptions.value.splice(index, 1)
      } else {
        selectedOptions.value.push(optionIndex)
      }
    }
  }

  /** 确认当前题目答案并进入下一题 */
  function nextQuestion() {
    if (!currentQuestion.value || selectedOptions.value.length === 0) return

    engine.answerQuestion(currentQuestion.value.id, [...selectedOptions.value])

    if (currentQuestionIndex.value < totalQuestions.value - 1) {
      currentQuestionIndex.value++
      selectedOptions.value = []
    } else {
      // 所有题目已回答完毕，计算结果
      result.value = engine.getResult()
    }
  }

  /** 返回上一题 */
  function prevQuestion() {
    if (currentQuestionIndex.value > 0) {
      // 恢复上一题的已选答案
      currentQuestionIndex.value--
      const prevQuestion = quizData.value?.questions[currentQuestionIndex.value]
      if (prevQuestion) {
        const prevAnswer = engine.getAnswers().get(prevQuestion.id)
        selectedOptions.value = prevAnswer ? [...prevAnswer] : []
      }
    }
  }

  /** 重新测试 */
  function retake() {
    if (quizData.value) {
      engine.reset()
      currentQuestionIndex.value = 0
      selectedOptions.value = []
      result.value = null
    }
  }

  return {
    quizData,
    currentQuestionIndex,
    currentQuestion,
    totalQuestions,
    selectedOptions,
    result,
    isFirstQuestion,
    isLastQuestion,
    isComplete,
    dimensionScores,
    loadQuiz,
    selectOption,
    nextQuestion,
    prevQuestion,
    retake,
  }
}
```

**验证**：在 QuizView 中引入 `useQuizState`，确认 TypeScript 无报错。

---

### Step 6: 首页（HomeView + QuizCard）

本 Step 实现首页测试列表和卡片组件。

**src/components/QuizCard.vue**：

```vue
<!-- src/components/QuizCard.vue -->
<script setup lang="ts">
import type { QuizMeta } from '@/core'

/** 组件 Props */
const props = defineProps<{
  /** 测试元信息对象 */
  quiz: QuizMeta
}>()

/** 组件事件 */
const emit = defineEmits<{
  /** 点击卡片时触发，传递测试 ID */
  click: [quizId: string]
}>()

/** 处理卡片点击 */
function handleClick() {
  emit('click', props.quiz.id)
}
</script>

<template>
  <div
    class="bg-white rounded-xl shadow-md p-5 cursor-pointer
           hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
    @click="handleClick"
  >
    <!-- 标题 -->
    <h3 class="text-xl font-bold text-gray-900 mb-2">{{ quiz.title }}</h3>
    <!-- 描述 -->
    <p class="text-sm text-gray-500 line-clamp-2 mb-3">{{ quiz.description }}</p>
    <!-- 底部信息 -->
    <div class="flex items-center justify-between">
      <span class="text-xs text-gray-400">{{ quiz.author }}</span>
      <span class="bg-primary/10 text-primary px-2.5 py-0.5 rounded-full text-xs font-medium">
        {{ quiz.questionCount }} 题
      </span>
    </div>
  </div>
</template>
```

**src/views/HomeView.vue**（完整实现）：

```vue
<!-- src/views/HomeView.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { validateQuiz } from '@/core'
import type { QuizMeta, QuizSchema } from '@/core'
import QuizCard from '@/components/QuizCard.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

/** 测试列表数据 */
const quizList = ref<QuizMeta[]>([])

/** 加载错误信息 */
const loadError = ref<string | null>(null)

onMounted(async () => {
  try {
    // 使用 import.meta.glob 扫描 quizzes/ 目录下的所有 JSON 文件
    const quizModules = import.meta.glob('/quizzes/*.json', { eager: true })

    for (const [path, module] of Object.entries(quizModules)) {
      // 获取 JSON 的默认导出
      const rawData = (module as Record<string, unknown>).default
      if (!rawData) continue

      // 使用 Zod 校验数据格式
      const validation = validateQuiz(rawData)
      if (!validation.success) {
        console.warn(`题库校验失败 [${path}]:`, validation.errors)
        continue
      }

      // 提取元信息
      const data = validation.data as QuizSchema
      quizList.value.push({
        id: data.id,
        title: data.title,
        description: data.description,
        questionCount: data.questions.length,
        version: data.version,
        author: data.author,
      })
    }
  } catch (error) {
    console.error('加载题库失败:', error)
    loadError.value = '加载题库失败，请刷新重试'
  }
})

/** 处理卡片点击，跳转到答题页 */
function handleCardClick(quizId: string) {
  router.push(`/quiz/${quizId}`)
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 顶部导航 -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div class="max-w-640px mx-auto px-4 py-4">
        <h1 class="text-xl font-bold text-gray-900">QuizLight</h1>
        <p class="text-sm text-gray-500 mt-1">选择一个测试开始吧</p>
      </div>
    </header>

    <!-- 测试列表 -->
    <main class="max-w-640px mx-auto px-4 py-6">
      <!-- 加载错误提示 -->
      <div v-if="loadError" class="text-center py-12">
        <p class="text-red-500 mb-2">{{ loadError }}</p>
        <button
          class="text-primary hover:text-primary-dark text-sm underline"
          @click="() => window.location.reload()"
        >
          刷新重试
        </button>
      </div>

      <!-- 空状态 -->
      <div v-else-if="quizList.length === 0" class="text-center py-12">
        <p class="text-gray-400">暂无可用测试</p>
      </div>

      <!-- 卡片列表 -->
      <div v-else class="space-y-4">
        <QuizCard
          v-for="quiz in quizList"
          :key="quiz.id"
          :quiz="quiz"
          @click="handleCardClick"
        />
      </div>
    </main>
  </div>
</template>
```

**验证**：浏览器访问 `/`，应显示 sample-test 测试卡片，包含标题、描述和题目数量。点击卡片跳转到 `/quiz/sample-test`。

---

### Step 7: 答题页（QuizView + Question + ProgressBar）

本 Step 实现答题页的三个组件。

**src/components/ProgressBar.vue**：

```vue
<!-- src/components/ProgressBar.vue -->
<script setup lang="ts">
/** 组件 Props */
const props = defineProps<{
  /** 当前题号（从 1 开始） */
  current: number
  /** 总题数 */
  total: number
}>()

/** 计算进度百分比 */
const percentage = computed(() => {
  if (props.total === 0) return 0
  return Math.round((props.current / props.total) * 100)
})
</script>

<script lang="ts">
import { computed } from 'vue'
</script>

<template>
  <div class="sticky top-0 z-20 bg-white/80 backdrop-blur">
    <!-- 进度条 -->
    <div class="h-1 bg-gray-200 w-full">
      <div
        class="h-full transition-all duration-300"
        :style="{
          width: `${percentage}%`,
          backgroundColor: 'var(--primary)',
        }"
      />
    </div>
    <!-- 进度文字 -->
    <div class="text-xs text-gray-500 text-center py-2">
      {{ current }} / {{ total }}
    </div>
  </div>
</template>
```

**src/components/Question.vue**：

```vue
<!-- src/components/Question.vue -->
<script setup lang="ts">
import type { Question as QuestionType } from '@/core'

/** 组件 Props */
const props = defineProps<{
  /** 当前题目对象 */
  question: QuestionType
  /** 当前选中的选项索引数组（v-model 绑定） */
  modelValue: number[]
  /** 当前题号（从 1 开始） */
  questionNumber: number
  /** 总题数 */
  totalQuestions: number
}>()

/** 组件事件 */
const emit = defineEmits<{
  /** v-model 更新事件 */
  'update:modelValue': [value: number[]]
}>()

/** 处理选项点击 */
function handleOptionClick(optionIndex: number) {
  if (props.question.type === 'single') {
    // 单选题：直接替换
    emit('update:modelValue', [optionIndex])
  } else {
    // 多选题：切换选中状态
    const newValue = [...props.modelValue]
    const existingIndex = newValue.indexOf(optionIndex)
    if (existingIndex >= 0) {
      newValue.splice(existingIndex, 1)
    } else {
      newValue.push(optionIndex)
    }
    emit('update:modelValue', newValue)
  }
}

/** 判断选项是否被选中 */
function isSelected(optionIndex: number): boolean {
  return props.modelValue.includes(optionIndex)
}
</script>

<template>
  <div class="py-4">
    <!-- 题号 -->
    <p class="text-sm text-gray-400 mb-2">{{ questionNumber }} / {{ totalQuestions }}</p>

    <!-- 题目图片（如果有） -->
    <img
      v-if="question.image"
      :src="question.image"
      :alt="question.text"
      class="w-full rounded-lg mb-4 object-cover max-h-48"
    />

    <!-- 题目文本 -->
    <h2 class="text-lg font-semibold text-gray-900 mb-6 leading-relaxed">
      {{ question.text }}
    </h2>

    <!-- 选项列表 -->
    <div class="space-y-3">
      <button
        v-for="(option, index) in question.options"
        :key="index"
        class="w-full text-left p-4 rounded-xl border-2 transition-all duration-200
               flex items-center gap-3 cursor-pointer
               hover:bg-gray-50"
        :class="{
          'border-primary bg-primary/5': isSelected(index),
          'border-gray-200': !isSelected(index),
        }"
        @click="handleOptionClick(index)"
      >
        <!-- 单选指示器 -->
        <span
          v-if="question.type === 'single'"
          class="flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors"
          :class="{
            'border-primary': isSelected(index),
            'border-gray-300': !isSelected(index),
          }"
        >
          <span
            v-if="isSelected(index)"
            class="w-2.5 h-2.5 rounded-full bg-primary"
          />
        </span>

        <!-- 多选指示器 -->
        <span
          v-else
          class="flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors"
          :class="{
            'border-primary bg-primary': isSelected(index),
            'border-gray-300': !isSelected(index),
          }"
        >
          <svg
            v-if="isSelected(index)"
            class="w-3 h-3 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="3"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </span>

        <!-- 选项文本 -->
        <span class="text-base text-gray-800 leading-relaxed">{{ option.label }}</span>
      </button>
    </div>
  </div>
</template>
```

**src/views/QuizView.vue**（完整实现）：

```vue
<!-- src/views/QuizView.vue -->
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { validateQuiz } from '@/core'
import type { QuizSchema } from '@/core'
import { useQuizState } from '@/composables/useQuizState'
import ProgressBar from '@/components/ProgressBar.vue'
import Question from '@/components/Question.vue'

const route = useRoute()
const router = useRouter()
const quizId = route.params.id as string

/** 加载状态 */
const loading = ref(true)
const loadError = ref<string | null>(null)

/** 使用状态管理 composable */
const {
  currentQuestion,
  currentQuestionIndex,
  totalQuestions,
  selectedOptions,
  result,
  isFirstQuestion,
  isLastQuestion,
  loadQuiz,
  selectOption,
  nextQuestion,
  prevQuestion,
} = useQuizState()

/** 加载题库数据 */
onMounted(async () => {
  try {
    // 动态加载对应 ID 的题库 JSON
    const quizModules = import.meta.glob('/quizzes/*.json', { eager: true })

    // 查找匹配的题库文件
    let quizData: QuizSchema | null = null

    for (const [path, module] of Object.entries(quizModules)) {
      const rawData = (module as Record<string, unknown>).default
      if (!rawData) continue

      const validation = validateQuiz(rawData)
      if (!validation.success) continue

      const data = validation.data as QuizSchema
      if (data.id === quizId) {
        quizData = data
        break
      }
    }

    if (!quizData) {
      loadError.value = `未找到测试: ${quizId}`
      return
    }

    // 加载测验到状态管理
    loadQuiz(quizData)
  } catch (error) {
    console.error('加载题库失败:', error)
    loadError.value = '加载题库失败，请刷新重试'
  } finally {
    loading.value = false
  }
})

/** 监听结果变化，答完后自动跳转到结果页 */
watch(result, (newResult) => {
  if (newResult) {
    // 将答案序列化为 URL query 参数
    const answers = []
    // 重新加载题库获取所有题目 ID 的顺序
    const quizModules = import.meta.glob('/quizzes/*.json', { eager: true })
    for (const [, module] of Object.entries(quizModules)) {
      const rawData = (module as Record<string, unknown>).default
      if (!rawData) continue
      const validation = validateQuiz(rawData)
      if (!validation.success) continue
      const data = validation.data as QuizSchema
      if (data.id === quizId) {
        // 按题目顺序提取答案
        for (const question of data.questions) {
          const selected = newResult.result.dimensionScores
          // 通过 currentQuestionIndex 之前的答案映射
          // 这里我们直接传递所有题目的选中索引
        }
        break
      }
    }
    router.push(`/result/${quizId}`)
  }
})

/** 处理下一题 */
function handleNext() {
  nextQuestion()
}

/** 处理上一题 */
function handlePrev() {
  prevQuestion()
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 加载中 -->
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <p class="text-gray-400">加载中...</p>
    </div>

    <!-- 加载错误 -->
    <div v-else-if="loadError" class="flex flex-col items-center justify-center min-h-screen">
      <p class="text-red-500 mb-4">{{ loadError }}</p>
      <router-link
        to="/"
        class="text-primary hover:text-primary-dark text-sm underline"
      >
        返回首页
      </router-link>
    </div>

    <!-- 答题界面 -->
    <div v-else-if="currentQuestion" class="max-w-640px mx-auto">
      <!-- 进度条 -->
      <ProgressBar
        :current="currentQuestionIndex + 1"
        :total="totalQuestions"
      />

      <!-- 题目区域 -->
      <div class="px-4 pb-32">
        <Question
          :question="currentQuestion"
          v-model="selectedOptions"
          :question-number="currentQuestionIndex + 1"
          :total-questions="totalQuestions"
        />
      </div>

      <!-- 底部操作栏 -->
      <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4">
        <div class="max-w-640px mx-auto flex items-center justify-between gap-3">
          <!-- 上一题按钮 -->
          <button
            class="flex-1 py-3 px-4 rounded-xl border-2 border-gray-200 text-gray-600
                   font-medium transition-colors duration-200
                   hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            :disabled="isFirstQuestion"
            @click="handlePrev"
          >
            上一题
          </button>

          <!-- 下一题 / 查看结果按钮 -->
          <button
            class="flex-1 py-3 px-4 rounded-xl text-white font-medium
                   transition-colors duration-200
                   disabled:opacity-40 disabled:cursor-not-allowed"
            :style="{
              backgroundColor: selectedOptions.length > 0 ? 'var(--primary)' : 'var(--muted)',
            }"
            :disabled="selectedOptions.length === 0"
            @click="handleNext"
          >
            {{ isLastQuestion ? '查看结果' : '下一题' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
```

**验证**：

1. 浏览器访问 `/quiz/sample-test`，应显示第 1 题和进度条
2. 选择选项后点击"下一题"，进度条更新，显示第 2 题
3. 点击"上一题"可返回修改答案
4. 最后一题按钮文字变为"查看结果"

---

### Step 8: 结果页（ResultView + ResultCard + ScoreBar）

本 Step 实现结果页的三个组件。

**src/components/ScoreBar.vue**：

```vue
<!-- src/components/ScoreBar.vue -->
<script setup lang="ts">
import type { DimensionScore } from '@/core'

/** 组件 Props */
const props = defineProps<{
  /** 维度分数数据 */
  dimension: DimensionScore
  /** 是否显示维度名称标签，默认为 true */
  showLabel?: boolean
}>()

/** 反向百分比 */
const oppositePercentage = computed(() => {
  return 100 - props.dimension.percentage
})
</script>

<script lang="ts">
import { computed } from 'vue'
</script>

<template>
  <div class="flex items-center gap-3 h-8">
    <!-- 维度名称 -->
    <span
      v-if="showLabel !== false"
      class="w-24 text-sm font-medium text-gray-700 flex-shrink-0 text-right"
    >
      {{ dimension.name }}
    </span>

    <!-- 条形容器 -->
    <div class="flex-1 h-full bg-gray-100 rounded-full overflow-hidden flex">
      <!-- 正向维度填充 -->
      <div
        class="h-full transition-all duration-500 rounded-l-full"
        :style="{
          width: `${dimension.percentage}%`,
          backgroundColor: 'var(--primary)',
        }"
      />
      <!-- 反向维度填充 -->
      <div
        class="h-full transition-all duration-500 rounded-r-full"
        :style="{
          width: `${oppositePercentage}%`,
          backgroundColor: 'var(--muted)',
        }"
      />
    </div>

    <!-- 百分比数字 -->
    <span class="w-12 text-sm text-gray-600 text-right flex-shrink-0">
      {{ dimension.percentage }}%
    </span>
  </div>
</template>
```

**src/components/ResultCard.vue**：

```vue
<!-- src/components/ResultCard.vue -->
<script setup lang="ts">
import type { QuizResultDef, DimensionScore } from '@/core'
import ScoreBar from './ScoreBar.vue'

/** 组件 Props */
const props = defineProps<{
  /** 结果定义对象 */
  result: QuizResultDef
  /** 各维度分数数组 */
  dimensionScores: DimensionScore[]
}>()

/** 组件事件 */
const emit = defineEmits<{
  /** 点击"重新测试"按钮时触发 */
  retake: []
  /** 点击"返回首页"按钮时触发 */
  goHome: []
}>()
</script>

<template>
  <div class="bg-white rounded-2xl shadow-lg p-6 max-w-640px mx-auto">
    <!-- 顶部：emoji + 结果名称 + ID 标签 -->
    <div class="text-center mb-6">
      <div class="text-5xl mb-3">{{ result.emoji }}</div>
      <h2 class="text-2xl font-bold text-gray-900 mb-2">{{ result.name }}</h2>
      <span
        class="inline-block px-3 py-1 rounded-full text-sm font-medium"
        :style="{
          backgroundColor: `${result.color}15`,
          color: result.color,
        }"
      >
        {{ result.id }}
      </span>
    </div>

    <!-- 描述区域 -->
    <p class="text-base text-gray-700 leading-relaxed mb-4">
      {{ result.description }}
    </p>

    <!-- 维度分数区域 -->
    <div v-if="dimensionScores.length > 0" class="border-t border-gray-100 pt-4 mt-4">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">维度分析</h3>
      <div class="space-y-3">
        <ScoreBar
          v-for="ds in dimensionScores"
          :key="ds.dimensionId"
          :dimension="ds"
          :show-label="true"
        />
      </div>
    </div>

    <!-- 建议区域 -->
    <div class="border-t border-gray-100 pt-4 mt-4">
      <p class="border-l-4 pl-4 italic text-gray-600" :style="{ borderColor: 'var(--primary)' }">
        {{ result.advice }}
      </p>
    </div>

    <!-- 底部操作按钮 -->
    <div class="flex items-center justify-center gap-4 mt-6">
      <button
        class="py-2.5 px-6 rounded-xl text-white font-medium transition-colors duration-200
               hover:opacity-90"
        :style="{ backgroundColor: 'var(--primary)' }"
        @click="emit('retake')"
      >
        重新测试
      </button>
      <button
        class="py-2.5 px-6 rounded-xl border-2 border-gray-300 text-gray-700 font-medium
               transition-colors duration-200 hover:bg-gray-50"
        @click="emit('goHome')"
      >
        返回首页
      </button>
    </div>
  </div>
</template>
```

**src/views/ResultView.vue**（完整实现）：

```vue
<!-- src/views/ResultView.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { validateQuiz } from '@/core'
import type { QuizSchema, QuizResult } from '@/core'
import { QuizEngine } from '@/core'
import ResultCard from '@/components/ResultCard.vue'

const route = useRoute()
const router = useRouter()
const quizId = route.params.id as string

/** 加载状态 */
const loading = ref(true)
const loadError = ref<string | null>(null)

/** 测验结果 */
const quizResult = ref<QuizResult | null>(null)

/** 测验数据（用于维度信息展示） */
const quizData = ref<QuizSchema | null>(null)

onMounted(async () => {
  try {
    // 动态加载题库 JSON
    const quizModules = import.meta.glob('/quizzes/*.json', { eager: true })
    let foundQuiz: QuizSchema | null = null

    for (const [, module] of Object.entries(quizModules)) {
      const rawData = (module as Record<string, unknown>).default
      if (!rawData) continue

      const validation = validateQuiz(rawData)
      if (!validation.success) continue

      const data = validation.data as QuizSchema
      if (data.id === quizId) {
        foundQuiz = data
        break
      }
    }

    if (!foundQuiz) {
      loadError.value = `未找到测试: ${quizId}`
      return
    }

    quizData.value = foundQuiz

    // 从 localStorage 恢复答题数据
    const storageKey = `quizlight-${quizId}`
    const storedAnswers = localStorage.getItem(storageKey)

    if (!storedAnswers) {
      loadError.value = '未找到答题记录，请重新测试'
      return
    }

    // 解析存储的答案数据
    const answersData = JSON.parse(storedAnswers) as Record<string, number[]>

    // 重建引擎状态并计算结果
    const engine = new QuizEngine()
    engine.loadQuiz(foundQuiz)

    // 按题目顺序逐一录入答案
    for (const question of foundQuiz.questions) {
      const selectedIndices = answersData[question.id]
      if (selectedIndices && selectedIndices.length > 0) {
        engine.answerQuestion(question.id, selectedIndices)
      }
    }

    // 计算结果
    const result = engine.getResult()
    if (!result) {
      loadError.value = '答案不完整，请重新完成测试'
      return
    }

    quizResult.value = result
  } catch (error) {
    console.error('加载结果失败:', error)
    loadError.value = '加载结果失败，请刷新重试'
  } finally {
    loading.value = false
  }
})

/** 重新测试 */
function handleRetake() {
  // 清除 localStorage 中的答题记录
  const storageKey = `quizlight-${quizId}`
  localStorage.removeItem(storageKey)
  router.push(`/quiz/${quizId}`)
}

/** 返回首页 */
function handleGoHome() {
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 加载中 -->
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <p class="text-gray-400">加载中...</p>
    </div>

    <!-- 加载错误 -->
    <div v-else-if="loadError" class="flex flex-col items-center justify-center min-h-screen px-4">
      <p class="text-red-500 mb-4 text-center">{{ loadError }}</p>
      <div class="flex gap-3">
        <router-link
          to="/"
          class="text-primary hover:text-primary-dark text-sm underline"
        >
          返回首页
        </router-link>
      </div>
    </div>

    <!-- 结果展示 -->
    <div v-else-if="quizResult" class="py-8 px-4">
      <ResultCard
        :result="quizResult.result"
        :dimension-scores="quizResult.dimensionScores"
        @retake="handleRetake"
        @go-home="handleGoHome"
      />
    </div>
  </div>
</template>
```

**同步修改 QuizView.vue 的结果跳转逻辑**：

在 `src/views/QuizView.vue` 中，需要将 `watch(result, ...)` 替换为以下逻辑，使答题完成后将答案存入 localStorage 再跳转：

将 QuizView.vue 中的 `watch(result, ...)` 部分替换为：

```typescript
/** 监听结果变化，答完后保存答案并跳转到结果页 */
watch(result, (newResult) => {
  if (newResult) {
    // 将答案保存到 localStorage
    const storageKey = `quizlight-${quizId}`
    const answersMap: Record<string, number[]> = {}
    // 通过重新加载题库获取答案映射
    const quizModules = import.meta.glob('/quizzes/*.json', { eager: true })
    for (const [, module] of Object.entries(quizModules)) {
      const rawData = (module as Record<string, unknown>).default
      if (!rawData) continue
      const validation = validateQuiz(rawData)
      if (!validation.success) continue
      const data = validation.data as QuizSchema
      if (data.id === quizId) {
        // 从引擎获取已记录的答案
        // 注意：这里需要直接访问 engine 的 answers
        // 由于 useQuizState 没有暴露 engine，我们通过另一种方式
        // 在 nextQuestion 中已经将答案记录到 engine，这里利用 quizData 的题目顺序
        break
      }
    }
    localStorage.setItem(storageKey, JSON.stringify(answersMap))
    router.push(`/result/${quizId}`)
  }
})
```

为了更优雅地实现答案持久化，需要在 `useQuizState.ts` 中增加一个 `getAnswersMap` 方法。在 `useQuizState.ts` 的 `return` 之前添加：

```typescript
/** 获取所有已回答题目的答案映射（用于持久化） */
function getAnswersMap(): Record<string, number[]> {
  const answers = engine.getAnswers()
  const map: Record<string, number[]> = {}
  for (const [questionId, indices] of answers) {
    map[questionId] = indices
  }
  return map
}
```

并在 `return` 中添加 `getAnswersMap`。

然后 QuizView.vue 中的 `watch(result, ...)` 最终版本为：

```typescript
// 在 useQuizState 解构中增加 getAnswersMap
const {
  currentQuestion,
  currentQuestionIndex,
  totalQuestions,
  selectedOptions,
  result,
  isFirstQuestion,
  isLastQuestion,
  loadQuiz,
  selectOption,
  nextQuestion,
  prevQuestion,
  getAnswersMap,
} = useQuizState()

/** 监听结果变化，答完后保存答案并跳转到结果页 */
watch(result, (newResult) => {
  if (newResult) {
    // 将答案保存到 localStorage
    const storageKey = `quizlight-${quizId}`
    const answersMap = getAnswersMap()
    localStorage.setItem(storageKey, JSON.stringify(answersMap))
    router.push(`/result/${quizId}`)
  }
})
```

**验证**：

1. 完整答题流程：从首页进入答题页，逐题作答
2. 答完最后一题后自动跳转到结果页
3. 结果页显示正确的性格类型（如 INTJ）
4. 结果页显示 4 个维度的分数条
5. 结果页显示文字描述和建议
6. "重新测试"按钮可清除答案回到答题页
7. "返回首页"按钮可回到列表页

---

### Step 9: 示例题库

将第 3 章（3.1）中定义的 `sample-test.json` 完整内容保存到 `quizzes/sample-test.json`。

该文件的完整内容已在第 3 章 3.1 节中定义，AI Agent 应直接从第 3 章复制，此处不再重复。

**验证**：`pnpm dev`，浏览器访问首页应能正常加载并显示 sample-test 测试卡片。

---

### Step 10: 集成与样式调优

本 Step 进行最终的集成检查和样式调优。

#### 10.1 全局样式补充

在 `src/App.vue` 的 `<style>` 中追加以下响应式样式：

```css
/* 响应式容器 */
.max-w-640px {
  max-width: 640px;
}

/* 文本截断 */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 安全区域（适配 iPhone 底部横条） */
@supports (padding-bottom: env(safe-area-inset-bottom)) {
  .fixed.bottom-0 {
    padding-bottom: calc(1rem + env(safe-area-inset-bottom));
  }
}
```

#### 10.2 检查清单

逐项检查以下内容：

- [ ] **移动端（375px）布局正常**
  - 首页卡片宽度适配屏幕
  - 答题页选项按钮可正常点击
  - 底部操作栏不遮挡题目内容（`pb-32` 预留空间）
  - 进度条固定在顶部
- [ ] **桌面端（1024px+）居中显示，最大宽度 640px**
  - 首页、答题页、结果页内容区域均使用 `max-w-640px mx-auto`
- [ ] **所有按钮可点击**
  - "上一题"、"下一题"、"查看结果"按钮
  - "重新测试"、"返回首页"按钮
  - 首页卡片点击跳转
- [ ] **进度条正确更新**
  - 从 `1 / 28` 逐步递增到 `28 / 28`
  - 进度条填充宽度平滑过渡
- [ ] **结果页正确显示**
  - emoji、结果名称、ID 标签
  - 维度分数条（4 个维度）
  - 描述文字和建议
- [ ] **`pnpm build` 成功**
  - 无 TypeScript 错误
  - 无构建警告
  - `dist/` 目录生成正确

#### 10.3 最终文件树确认

```
quizlight/
├── public/
│   └── favicon.ico
├── src/
│   ├── core/
│   │   ├── types.ts
│   │   ├── schema.ts
│   │   ├── engine.ts
│   │   └── index.ts
│   ├── composables/
│   │   └── useQuizState.ts
│   ├── components/
│   │   ├── QuizCard.vue
│   │   ├── Question.vue
│   │   ├── ProgressBar.vue
│   │   ├── ScoreBar.vue
│   │   └── ResultCard.vue
│   ├── views/
│   │   ├── HomeView.vue
│   │   ├── QuizView.vue
│   │   └── ResultView.vue
│   ├── App.vue
│   ├── main.ts
│   └── router.ts
├── quizzes/
│   └── sample-test.json
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
└── uno.config.ts
```

**验证**：`pnpm build && pnpm preview`，在预览环境中完整走通首页 -> 答题 -> 结果的流程。

---

## 第 7 章：验证清单

本章提供两套验证清单：**每步验证表**用于开发过程中逐步确认，**MVP 最终验收清单**用于整体功能验收。

---

### 7.1 每步验证

| Step | 验证命令 / 操作 | 预期结果 |
|------|-----------------|----------|
| 1 | `pnpm install && pnpm dev` | 浏览器访问 `http://localhost:5173` 显示空白页（正常） |
| 2 | `pnpm tsc --noEmit` | 终端无 TypeScript 错误输出 |
| 3 | `pnpm tsc --noEmit` | 终端无 TypeScript 错误输出 |
| 4 | 浏览器依次访问 `/`、`/quiz/test`、`/result/test` | 三个页面均有占位内容渲染 |
| 5 | 在 QuizView 中引入 `useQuizState`，确认 TypeScript 编译通过 | `pnpm tsc --noEmit` 无报错 |
| 6 | 浏览器访问 `/` | 显示 sample-test 测试卡片（标题、描述、题目数量），点击卡片跳转到 `/quiz/sample-test` |
| 7 | 完整答题流程 | 可逐题选择答案并翻到下一题，进度条从 `1/28` 更新到 `28/28`，可返回上一题修改答案 |
| 8 | 答完所有 28 题 | 自动跳转到结果页，显示正确的性格类型（如 INTJ）和 4 个维度的分数条 |
| 9 | `pnpm dev` | 首页题库加载成功，控制台无校验错误 |
| 10 | 分别在 375px 和 1024px 宽度下检查 | 移动端布局无溢出，桌面端居中显示 |

---

### 7.2 MVP 最终验收清单

以下为 MVP（v0.1）的完整验收清单，所有项目均需通过方可视为 MVP 完成。

#### 7.2.1 构建与部署

- [ ] `pnpm install` 无依赖冲突
- [ ] `pnpm tsc --noEmit` 无 TypeScript 错误
- [ ] `pnpm build` 构建成功，`dist/` 目录生成
- [ ] `pnpm preview` 可正常预览构建产物

#### 7.2.2 首页功能

- [ ] 首页展示 sample-test 测试卡片
- [ ] 卡片显示测试标题（"性格倾向测试"）
- [ ] 卡片显示测试描述（"28 道题，约 5 分钟..."）
- [ ] 卡片显示题目数量标签（"28 题"）
- [ ] 点击卡片跳转到 `/quiz/sample-test`
- [ ] 卡片 hover 有上浮和阴影效果

#### 7.2.3 答题功能

- [ ] 答题页正确显示第 1 题
- [ ] 题号显示格式为 `1 / 28`
- [ ] 进度条固定在页面顶部
- [ ] 单选题点击选项即选中，同时取消之前选中项
- [ ] 选中项有高亮样式（边框变色 + 背景色）
- [ ] 未选择选项时"下一题"按钮不可点击（灰色）
- [ ] 选择选项后"下一题"按钮变为可点击（主色调）
- [ ] 点击"下一题"后进度条更新，显示下一题
- [ ] 点击"上一题"可返回，且之前选择的答案被恢复
- [ ] 第 1 题时"上一题"按钮不可点击
- [ ] 最后一题时按钮文字变为"查看结果"
- [ ] 多选题（如有）支持选择/取消多个选项

#### 7.2.4 结果功能

- [ ] 答完 28 题后自动跳转到结果页
- [ ] 结果页显示正确的性格类型（4 字母组合，如 INTJ）
- [ ] 结果页显示结果名称（如"独立思考者"）
- [ ] 结果页显示 emoji 图标
- [ ] 结果页显示 4 个维度的分数条（E/I、N/S、T/F、J/P）
- [ ] 每个分数条显示维度名称和百分比数字
- [ ] 分数条有过渡动画
- [ ] 结果页显示文字描述
- [ ] 结果页显示建议（引用样式）
- [ ] "重新测试"按钮可清除 localStorage 答案并跳转到答题页
- [ ] "返回首页"按钮可跳转到列表页

#### 7.2.5 响应式布局

- [ ] 移动端（375px 宽度）布局正常，无水平溢出
- [ ] 移动端底部操作栏适配安全区域（iPhone 底部横条）
- [ ] 桌面端（1024px+ 宽度）内容居中显示，最大宽度 640px
- [ ] 选项按钮在移动端可正常点击（触摸目标 >= 44px）
- [ ] 文字在移动端可读（最小字号 >= 14px）

#### 7.2.6 边界情况

- [ ] 直接访问 `/quiz/nonexistent` 显示"未找到测试"错误提示
- [ ] 直接访问 `/result/sample-test`（无答题记录）显示"未找到答题记录"提示
- [ ] 刷新答题页后状态重置（MVP 阶段不保存进度，属预期行为）
- [ ] 所有维度分数平局时按 `tieBreak: 'first'` 处理，结果确定

#### 7.2.7 代码质量

- [ ] 所有 TypeScript 文件无 `any` 类型（除必要的外部交互场景）
- [ ] 所有组件使用 `<script setup lang="ts">` 语法
- [ ] `src/core/` 目录下的文件不依赖 Vue
- [ ] CSS 使用 UnoCSS 原子类 + CSS 变量，无硬编码颜色值（组件内部）
- [ ] 代码注释使用中文
