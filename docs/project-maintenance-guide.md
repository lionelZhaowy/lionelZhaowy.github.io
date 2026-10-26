# 项目介绍写作与维护规范

适用于新增 `_projects/` 中文介绍、同步 `_projects_en/` 英文介绍，以及重构现有项目页。内容组织以本文为准；媒体转换参数和加载机制见 [媒体优化与接入指南](media-optimization-guide.md)。两者冲突时先核对实际模板与运行时代码，再同步修正文档。

## 1. 修改入口与命名

| 内容 | 位置与约定 |
| --- | --- |
| 中文项目 | `_projects/YYYYMM-YYYYMM-ProjectName.md` |
| 英文项目 | `_projects_en/` 下完全同名文件 |
| 共享媒体 | `images/project/YYYYMM-YYYYMM-ProjectName/` |
| 中文起步模板 | [templates/project-zh.md](templates/project-zh.md) |
| 英文起步模板 | [templates/project-en.md](templates/project-en.md) |
| 自动审计 | `scripts/audit-projects.mjs`，Node.js 18+，无 npm 依赖 |

文件名和媒体路径大小写必须准确。文件名同时决定 `/projects/:name/` 和 `/en/projects/:name/` 的 URL；重构时保留已有文件名、正文锚点及被外部引用的链接。如确需迁移 URL，应在同一修改中更新站内引用并验证重定向。

项目周期以 `period` 的事实信息为准；历史文件名不必为纠正周期而改名。新文件名使用实际起止月份，未结束项目应说明当前状态。模板保存在已被 Jekyll 排除的 `docs/` 中，不能直接作为真实项目发布。

## 2. Front matter 字段

本仓库采用顶层标量、缩进列表与 `solution: |` 块。字符串用引号包围；列表每项单独一行。审计脚本按此约定读取，不承担完整 YAML 解析，最终语法仍由 Jekyll 构建验证。

| 字段 | 要求 | 双语规则 |
| --- | --- | --- |
| `title` | 必填，直接说明项目对象和工作 | 翻译，保留专有名称 |
| `order` | 必填，正整数，同一语言内唯一；越小越靠前 | 完全一致 |
| `period` | 必填，实际周期，如 `2026.04 - 2026.06` | 完全一致 |
| `role` | 必填，准确界定独立开发、负责或参与 | 语义一致，不能扩大职责 |
| `tech` | 必填，非空缩进列表，选择关键技术 | 技术含义一致，缩写尽量一致 |
| `summary` | 必填，用一段话说明问题、工作和结果 | 事实一致，允许调整表达 |
| `teaser` | 必填，本站 `/images/` 下的封面原图或 `-web.mp4` | 路径一致 |
| `teaser_webp` | 图片卡片应填写 `-card.webp` | 路径一致 |
| `teaser_poster` | 视频卡片应填写首帧 `-poster.webp` | 路径一致 |
| `solution` | 必填，`|` 块中用 Markdown 列出技术路线 | 顺序和技术关系一致 |
| `highlights` | 必填，非空列表，列出个人贡献及可核验结果 | 指标、责任与成果一致 |
| `links` | 可选，`label`、`url` 对象列表，用于论文、代码、演示 | 标签翻译，目标一致 |
| `math` | 含公式时设置 `true`，无公式省略或 `false` | 同时维护，差异需人工复核 |

`layout`、`author_profile`、`lang` 由 `_config.yml` 的 collection defaults 提供，一般不在项目页覆盖。首页模板按 `order` 取前四项；插入新项目或调整排序时，需检查首页卡片和详情页前后导航。

## 3. 内容结构与写作要求

推荐按以下阅读顺序组织，可根据项目实际合并章节：

1. **项目背景 / Background**：应用场景、约束、任务目标和评估口径。
2. **技术方案概览 / Approach**：通过 `{{ page.solution | markdownify }}` 复用技术路线，避免维护两份相同摘要。
3. **个人贡献 / Contributions**：循环输出 `page.highlights`，明确独立完成、共同完成、沿用已有系统的边界。
4. **详细技术实现 / Technical Details**：解释关键设计选择、实现方法与取舍。篇幅较长时使用已有 `tech-accordion` 折叠结构。
5. **结果与验证 / Results and Validation**：给出指标、数据集/平台、基线、测试条件和对应图表或演示。
6. **总结与思考 / Discussion**：写出限制、失败经验、尚未完成内容及可行的后续方向。

不为了符合模板虚构指标或成果。速度提升必须注明比较对象、硬件与测试范围；精度指标注明数据集及单位。图表编号、正文引用、图注与 alt 要对应；alt 描述内容，如“量化前后精度与模型体积对比”，不只写“图 1”。

重构先改变组织和表达，再核对技术含义。不得把“参与”改成“主导”，不得把仿真结果写成实测，不得把后续工作写成项目期间成果。中文为事实基线；英文同步事实，不要求逐字翻译。

## 4. 媒体与性能约定

| 用途 | 推荐文件名 | 引用方式 |
| --- | --- | --- |
| 原始视频 | `Demo.mp4` | 留存，必要时作为明确下载链接 |
| 网页播放源 | `Demo-web.mp4` | 详情 `source[data-src]` 或卡片 `teaser` |
| 首页视频首帧 | `Demo-poster.webp` | `teaser_poster` |
| 详情视频首帧 | `Demo-web-poster.webp` | `<video poster="...">` |
| 原始图 / 回退图 | `Architecture.png` | `<picture>` 内 `<img src>` |
| 正文压缩图 | `Architecture-web.webp` | `<source type="image/webp" srcset>` |
| 首页图片 | `Cover-card.webp` | `teaser_webp` |

既有 WebP 可能不带 `-web` 后缀，无需为命名统一重复生成或改名。新增资源遵循上表；不要删除原始媒体。中英文复用同一资源，避免复制压缩文件。

- 详情视频保留 `lazy-video`、`autoplay loop muted playsinline`、`preload="none"`，地址仅写入 `source[data-src]`，配置同名独立 poster。需要网页视频的首帧，不能使用架构图替代。
- 图片写入真实正整数像素 `width`、`height`，显示比例用 CSS；PNG/JPG 使用 WebP 优先和原图回退。非首屏图片使用 `loading="lazy" decoding="async"`，确认在首屏的图片可用 `loading="eager"`。
- 图多、视频多的内容优先按技术模块折叠，不能通过批量设置 `src` 或 `preload="auto"` 解决播放等待。
- 不在项目正文加入新的播放器、MathJax CDN 标签或自动播放脚本。公式仅声明 `math: true`，复用统一的延迟加载配置。
- 修改 JavaScript 运行时时，同步维护 `assets/js/_main.js` 和实际加载的 `assets/js/main.min.js`，执行语法与行为回归；样式和模板修改按影响范围检查页面行为。

媒体压缩、首帧提取、性能预算、资源释放距离、MathJax 加载时机及人工验收步骤见 [媒体指南](media-optimization-guide.md)。

## 5. 新增项目流程

1. 确认项目周期、职责、结果证据和公开范围，选择唯一文件名及 `order`。
2. 复制两份起步模板到对应 collection，替换所有 `TODO` 与示例路径；模板中的示例 `order` 必须重新选择。
3. 创建媒体目录，记录原始尺寸、时长与大小，只转换实际使用资源；生成卡片资源和详情 poster。
4. 完成中文内容，核对指标与贡献边界，再同步英文和共享媒体引用。
5. 根据内容选用图片/视频示例；删除未使用的示例块，含公式时在两侧声明 `math: true`。
6. 执行目标项目严格审计、全站审计和构建；检查新项目进入首页后的排序与资源总量。
7. 人工检查两种语言、移动端布局、折叠内容、播放与资源重载，完成发布检查。

## 6. 现有介绍重构清单

- [ ] 记录改前 URL、锚点、项目周期、角色、指标、论文/代码链接及媒体清单。
- [ ] 先列章节映射与拟修改事实；保留有效外链和锚点。
- [ ] 更新摘要、solution、highlights 与正文，避免重复或互相矛盾。
- [ ] 中文完成后同步英文；检查数值、单位、基线、贡献、图表和链接。
- [ ] 被改动页面中的图片补充真实像素尺寸及有意义的 alt；视频符合懒加载与 poster 规则。
- [ ] 新生成资源与原文件并存；删除引用前先搜索中英文及模板，确认没有误删共享资源。
- [ ] 对该项目执行 `--strict`，处理警告；全站已有问题单独记录，不通过放宽规则掩盖。
- [ ] 对照改前清单检查 URL、锚点、事实与演示行为，确认没有丢失关键内容。

## 7. 自动审计

在仓库根目录运行；脚本也可从其他工作目录调用，默认从脚本位置定位仓库：

```powershell
node scripts/audit-projects.mjs
node scripts/audit-projects.mjs --project 202604-202606-S28Compiler --strict
node scripts/audit-projects.mjs --json
```

`--project` 输入文件名去掉 `.md` 的完整 slug，同时检查中英文；排序冲突仍做全站检查。新建和重构页面使用 `--strict`，全部警告也会导致失败。全站审计默认只因错误失败，以便区分历史内容改进项。`--root PATH` 可指定另一仓库根目录，用于临时样例验证。

| 等级 | 检查内容 | 处理方式 |
| --- | --- | --- |
| 错误 | front matter 缺失、必填字段、列表格式、重复 order/字段、遗留 TODO、双语缺页/关键字段或本地资源清单差异 | 修复后再发布 |
| 错误 | `/images/` 文件不存在或大小写不符、视频直接 src、缺少播放属性、非网页 MP4、详情 poster 不匹配 | 修复后再发布 |
| 警告 | 图片无像素尺寸、alt 不完整、无 WebP 回退或加载属性、Markdown 图片、缺少卡片 WebP/poster | 新建/重构时修复；历史页面逐项迁移 |
| 警告 | math 双语差异、检测到部分公式定界符但未启用 math | 核对两页公式后处理 |

退出码：`0` 通过；`1` 有错误，或严格模式存在警告；`2` 参数错误、项目不存在或读取失败。输出包含文件、行号、规则代码；`--json` 用于机器读取。

边界：这是针对本仓库写法的静态审计，不是完整 YAML/HTML/Liquid 解析器。忽略围栏代码块和 HTML 注释；支持静态路径与 `{{ '/images/...' | relative_url }}`、`{{ page.teaser | relative_url }}` 等简单路径表达式。资源存在性检查覆盖显式 `/images/` 引用并核对大小写，不能证明图像尺寸正确、媒体可解码、双语语义/指标一致、远端链接有效或浏览器行为正常。公式检测只作提示，不能替代人工检查。采用复杂 YAML、动态路径或 include 时需扩展脚本，并用 Jekyll 生成 HTML 验证。

2026-10-26 首次全站审计为 0 个错误、177 条警告，包含中英文分别计数的图片尺寸、alt、旧项目卡片 poster，以及 S28 Compiler 双语 `math` 配置差异。脚本保留这些可见警告；本次规范维护不批量重写项目正文，也不设忽略名单。此数值为当前迁移基线，不是允许的警告上限。

## 8. 构建与发布检查

```powershell
node scripts/audit-projects.mjs --project YYYYMM-YYYYMM-ProjectName --strict
node scripts/audit-projects.mjs
node --check assets/js/_main.js
node --check assets/js/main.min.js
bundle _2.3.24_ exec jekyll build --trace
git diff --check
```

Windows 的 CRLF 工作区若被 Git 误报为行末空白，可用 `git -c core.whitespace=cr-at-eol diff --check` 检查真实空白问题，避免为此改动全文件换行符。

另按媒体指南验证新增视频/图片可解码及 MP4 Fast Start。构建后检查 `_site/projects/`、`_site/en/projects/` 的目标页面，确认 Liquid 已解析、图片有尺寸、视频仍使用 `data-src`。

人工验收至少覆盖 1440、1024、768、390px，两种语言与明暗主题。对媒体修改核对 poster 首帧、自动播放、离屏暂停/远离释放/返回重载、折叠区不预加载；涉及运行时修改时复测 reduced-motion、Save-Data、播放被拦截及断网恢复。含公式页面确认延迟加载后公式正常；慢网检查首页不请求整页视频。

只有完成本次范围的严格审计、构建与人工检查后才提交和推送到部署分支；提交前查看 `git diff`，避免带入 `_site`、临时媒体和无关文件。推送后确认 GitHub Pages 构建成功，再从线上打开目标中英文 URL 检查。发布需要用户授权，文档更新不自动触发推送。

若本机 Ruby 返回 Windows `0xC0000022` 等环境错误，记录失败命令和错误，不把静态审计标记为构建成功。修复本地环境或在已授权的远端构建环境完成构建验证，再确认发布状态。
