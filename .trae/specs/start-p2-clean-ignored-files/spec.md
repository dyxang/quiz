# 开始 P2 阶段与清理忽略文件 Spec

## Why
在正式开始 P2 阶段的开发工作前，需要确保基于最新的 `main` 分支进行，并清理那些在 `.gitignore` 规则中已声明忽略，但却被错误提交到了 Git 仓库中的文件，保持代码库的整洁和规范。

## What Changes
- 切换到 `main` 分支并拉取最新代码。
- 扫描 Git 跟踪的文件，识别其中被 `.gitignore` 规则匹配的内容。
- 从 Git 索引中剔除（`git rm --cached`）这些文件，而不删除本地实体文件。
- 如果存在变更，提交一次清理记录。

## Impact
- Affected specs: 无功能性影响
- Affected code: 任何目前在版本控制中且匹配 `.gitignore` 的文件将被停止跟踪。

## ADDED Requirements
### Requirement: 纯净的主分支代码库
系统应当在开发新阶段前不包含应当被忽略的临时、编译或配置文件。

#### Scenario: Success case
- **WHEN** 开发者准备拉取并开发新特性时
- **THEN** 工作区不再包含任何应当被 Git 忽略却仍然被追踪的文件。
