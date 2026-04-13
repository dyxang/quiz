# Tasks
- [x] Task 1: 检出并拉取最新 main 分支
  - [x] SubTask 1.1: 确保本地无未提交的工作 (`git status` 检查)。
  - [x] SubTask 1.2: 切换到 main 分支 (`git checkout main`) 并拉取最新代码 (`git pull`)。
- [x] Task 2: 检查并剔除被忽略的文件
  - [x] SubTask 2.1: 查找当前 Git 仓库中被 `.gitignore` 规则忽略但仍在跟踪的文件（例如 `git ls-files -i --exclude-standard`）。
  - [x] SubTask 2.2: 使用 `git rm -r --cached <file>` 从 Git 索引中剔除这些文件，但保留本地文件。
  - [x] SubTask 2.3: 将更改加入暂存区，并进行提交（如果 SubTask 2.1 找到了文件）。

# Task Dependencies
- [Task 2] depends on [Task 1]
