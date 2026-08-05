# 项目媒体优化与接入指南

本文档记录本个人主页中视频、图片的压缩方案、页面接入方式和验收流程。后续添加新项目时，应先生成网页专用媒体，再更新中英文项目页，避免直接把相机原片、录屏原片或高分辨率技术图用于网页展示。

## 1. 当前方案概览

站点采用“保留原文件 + 新增网页版本”的方式管理媒体：

- 原始视频保留为 `Demo.mp4`，网页版本命名为 `Demo-web.mp4`。
- 原始图片保留为 `Figure.png` 或 `Figure.jpg`，网页版本命名为 `Figure-web.webp`。
- 首页项目缩略图可单独命名为 `Cover-card.webp`。
- 中英文项目页复用同一份媒体资源，但两侧 Markdown 引用必须同步修改。
- 不使用 `?v=1` 一类查询参数破坏缓存；媒体内容变化时改用新文件名，如 `Demo-v2-web.mp4`。

当前视频加载行为由以下文件统一控制：

- `_includes/project-card-media.html`：首页项目卡片的视频/图片输出。
- `assets/js/_main.js`：视频懒加载、播放、暂停及并发队列的可读源码。
- `assets/js/main.min.js`：网页实际加载的 JavaScript 文件，修改行为时必须与 `_main.js` 同步。
- `_sass/_refresh.scss`：视频占位状态、项目卡片比例及详情页视频网格。

目前的关键策略为：

- `<video preload="none">`，并将真实地址放在 `<source data-src="...">` 中。
- 视频距离视口约 120px 时才加入加载队列。
- 同一时间最多加载两段视频，避免多视频网格争抢带宽。
- 视频离开加载区域后暂停。
- 开启节省流量模式或 `prefers-reduced-motion` 时停止自动播放并显示控件。
- 视频未就绪时显示统一的浅蓝色加载占位，不使用其他项目图片冒充视频封面。
- 本科毕设跟踪结果在桌面端保持 4 列，1024px 以下为 2 列，600px 以下为 1 列。

## 2. 工具准备

### 2.1 FFmpeg

视频压缩和 WebP 生成均使用 FFmpeg。首先检查命令是否可用：

```powershell
where.exe ffmpeg
ffmpeg -version
ffmpeg -hide_banner -encoders | Select-String 'libx264|libwebp'
```

至少需要以下编码器：

- `libx264`：生成兼容性较好的 H.264 MP4。
- `libwebp`：生成 WebP 图片。

如果 FFmpeg 没有加入 `PATH`，可以在脚本中使用其绝对路径，例如：

```powershell
$ffmpeg = 'D:\Program Files\FormatFactory\ffmpeg.exe'
```

建议优先将稳定版本 FFmpeg 加入 `PATH`，避免文档或脚本依赖某个软件附带的固定安装路径。

### 2.2 Ruby、Bundler 与 Jekyll

媒体及 Markdown 修改完成后，需要执行完整站点构建：

```powershell
bundle exec jekyll build --trace
```

本工程当前使用 GitHub Pages 对应的 Jekyll 3.9.2。若机器安装了多个 Bundler 版本，应使用 `Gemfile.lock` 对应的版本执行构建。

## 3. 视频压缩

### 3.1 推荐参数

个人主页中的视频主要是算法结果、板级验证和工具链演示，通常静音循环播放，推荐使用：

| 参数 | 推荐值 | 说明 |
| --- | --- | --- |
| 最大宽度 | 960px | 足以覆盖当前项目正文和卡片显示尺寸。 |
| 编码 | H.264 / `libx264` | 浏览器和移动端兼容性较好。 |
| CRF | 28 | 数值越小越清晰、文件越大；技术细节较多时可用 26–27。 |
| preset | `medium` | 在压缩率和处理时间之间折中。 |
| 像素格式 | `yuv420p` | 避免部分浏览器无法解码。 |
| 音频 | 移除 | 当前视频静音自动播放，保留音轨没有实际价值。 |
| MP4 布局 | `+faststart` | 将元数据移动到文件开头，加快首帧出现。 |

### 3.2 单个视频压缩脚本

以下脚本会在原视频旁生成 `-web.mp4`，不会覆盖原文件：

```powershell
param(
  [Parameter(Mandatory = $true)]
  [string]$Source,
  [int]$MaxWidth = 960,
  [int]$Crf = 28
)

$ffmpegCommand = Get-Command ffmpeg -ErrorAction Stop
$ffmpeg = $ffmpegCommand.Source
$directory = Split-Path -Parent $Source
$stem = [System.IO.Path]::GetFileNameWithoutExtension($Source)
$destination = Join-Path $directory ($stem + '-web.mp4')

& $ffmpeg `
  -y -hide_banner -loglevel warning `
  -i $Source `
  -map 0:v:0 `
  -vf "scale='min($MaxWidth,iw)':-2" `
  -c:v libx264 -preset medium -crf $Crf `
  -pix_fmt yuv420p `
  -an `
  -movflags +faststart `
  $destination

if ($LASTEXITCODE -ne 0) {
  throw "FFmpeg compression failed: $Source"
}

$before = (Get-Item -LiteralPath $Source).Length
$after = (Get-Item -LiteralPath $destination).Length
'{0:N2} MB -> {1:N2} MB, reduced by {2:P1}' -f `
  ($before / 1MB), ($after / 1MB), (1 - $after / $before)
```

使用示例：

```powershell
.\optimize-video.ps1 `
  -Source 'images\project\202601-202603-NewProject\Demo.mp4'
```

若视频需要保留声音，应移除 `-an`，并增加例如 `-c:a aac -b:a 96k`；但这类视频不应默认静音自动播放，应改为用户主动播放。

### 3.3 批量处理

建议显式列出本次新增项目使用的视频，不要直接递归转换整个 `images` 目录：

```powershell
$videos = @(
  'images\project\202601-202603-NewProject\DemoA.mp4',
  'images\project\202601-202603-NewProject\DemoB.mp4'
)

foreach ($video in $videos) {
  .\optimize-video.ps1 -Source $video
}
```

显式列表可以避免重复压缩已有的 `-web.mp4`，也能防止误处理未在网页中使用的原始素材。

## 4. 图片压缩

### 4.1 图片类型与参数

| 图片类型 | 建议参数 | 备注 |
| --- | --- | --- |
| 照片、开发板照片、自然图像 | WebP quality 80–84 | 通常可获得较大体积收益。 |
| 架构图、曲线图、技术示意图 | WebP quality 86–90 | 优先保证文字、细线和箭头清晰。 |
| 代码截图、小字号文字截图 | WebP quality 88–92 | 压缩后必须按原尺寸检查文字可读性。 |
| 首页项目卡片 | 最大宽度 960px，通常小于 100KB | 使用 `Cover-card.webp` 区分正文图片。 |
| 正文大图 | 最大宽度约 1400px | 当前正文没有必要传输 2K–8K 原图。 |

技术图不应只依据文件大小判断是否合格。压缩后需要查看细线、坐标、代码和标注；出现文字发虚时，应提高质量参数或改用无损 WebP。

### 4.2 单个图片压缩脚本

```powershell
param(
  [Parameter(Mandatory = $true)]
  [string]$Source,
  [int]$MaxWidth = 1400,
  [int]$Quality = 86
)

$ffmpegCommand = Get-Command ffmpeg -ErrorAction Stop
$ffmpeg = $ffmpegCommand.Source
$directory = Split-Path -Parent $Source
$stem = [System.IO.Path]::GetFileNameWithoutExtension($Source)
$destination = Join-Path $directory ($stem + '-web.webp')

& $ffmpeg `
  -y -hide_banner -loglevel warning `
  -i $Source `
  -vf "scale='min($MaxWidth,iw)':-2" `
  -c:v libwebp `
  -quality $Quality `
  -compression_level 6 `
  $destination

if ($LASTEXITCODE -ne 0) {
  throw "WebP compression failed: $Source"
}

$before = (Get-Item -LiteralPath $Source).Length
$after = (Get-Item -LiteralPath $destination).Length
'{0:N2} MB -> {1:N2} MB, reduced by {2:P1}' -f `
  ($before / 1MB), ($after / 1MB), (1 - $after / $before)
```

使用示例：

```powershell
.\optimize-image.ps1 `
  -Source 'images\project\202601-202603-NewProject\Architecture.png' `
  -Quality 88
```

## 5. Jekyll 页面接入

### 5.1 首页项目卡片

静态图片项目的 front matter：

```yaml
teaser: "/images/project/202601-202603-NewProject/Cover.png"
teaser_webp: "/images/project/202601-202603-NewProject/Cover-card.webp"
```

视频项目的 front matter：

```yaml
teaser: "/images/project/202601-202603-NewProject/Demo-web.mp4"
```

`_includes/project-card-media.html` 会根据 `teaser` 扩展名选择 `<video>` 或 `<picture>`。首页只展示按 `order` 排序后的前四个项目，因此修改 `order` 后应重新检查首屏媒体总量。

### 5.2 详情页视频

```html
<video class="lazy-video" autoplay loop muted playsinline
       webkit-playsinline width="90%" preload="none">
  <source data-src="{{ '/images/project/202601-202603-NewProject/Demo-web.mp4' | relative_url }}"
          type="video/mp4">
</video>
```

必须遵循：

- 使用 `class="lazy-video"`。
- 使用 `preload="none"`。
- 把地址写入 `data-src`，不要直接写 `src`。
- 自动播放视频必须包含 `muted` 和 `playsinline`。
- 不要添加破坏缓存的查询参数。
- 当前站点默认显示统一加载占位，不需要设置 `poster`。
- 如果确实需要 `poster`，必须是该视频独有且经过压缩的首帧，不能复用项目架构图或其他视频的静态图。

### 5.3 详情页图片

```html
<picture class="optimized-media">
  <source srcset="/images/project/202601-202603-NewProject/Architecture-web.webp"
          type="image/webp">
  <img src="/images/project/202601-202603-NewProject/Architecture.png"
       width="1400" height="900"
       style="width: 85%;"
       loading="lazy" decoding="async"
       alt="图 1：处理器与编译工具链架构">
</picture>
```

必须遵循：

- WebP 放在 `<source>` 中，原 PNG/JPG 作为回退。
- 使用明确的像素 `width` 和 `height`，减少图片加载前后的布局跳动。
- 显示比例通过 CSS 或 `style="width: ..."` 控制，不要把 `80%` 写进 HTML 的 `width` 属性。
- 非首屏图片添加 `loading="lazy"` 和 `decoding="async"`。
- `alt` 应描述图片内容，不要只写“图1”或“Figure 1”。

## 6. 新增项目标准流程

1. 在 `images/project/项目目录/` 中放入原始媒体，文件名尽量使用英文字母、数字、连字符和下划线。
2. 记录原始视频和图片的分辨率、时长与文件大小。
3. 为实际引用的视频生成 `-web.mp4`。
4. 为实际引用的大图生成 `-web.webp`，首页封面生成 `-card.webp`。
5. 检查压缩后图片中的小字、边框和曲线，检查视频中的检测框、跟踪框和波形是否清晰。
6. 更新 `_projects/项目.md` 的中文内容和媒体引用。
7. 以中文页为事实基线，同步更新 `_projects_en/项目.md`，不要改变技术指标、作者关系和贡献边界。
8. 确认所有视频使用 `lazy-video + preload="none" + data-src`。
9. 确认所有正文图片使用 WebP 优先、原图回退、懒加载和明确尺寸。
10. 执行媒体解码、资源路径、JavaScript、Jekyll 构建和 Git 差异检查。
11. 在 1440、1024、768 和 390px 宽度下人工检查布局与媒体比例。
12. 人工审核通过后再提交、推送或发布。

## 7. 验证命令

### 7.1 检查是否仍引用原始 MP4

```powershell
rg -n "(?<!-web)\.mp4" _projects _projects_en --pcre2
```

如果某个原始 MP4 是有意保留的下载链接，应人工确认；页面播放源原则上应使用 `-web.mp4`。

### 7.2 检查视频懒加载写法

```powershell
rg -n '<source[^>]+\ssrc="[^"]+\.mp4' _projects _projects_en _includes
rg -n 'data-src=.*-web\.mp4' _projects _projects_en _includes
rg -n 'preload="none"' _projects _projects_en _includes
```

第一条命令原则上不应找到直接加载的视频 `<source src="...">`。

### 7.3 验证媒体可解码

```powershell
$ffmpeg = (Get-Command ffmpeg -ErrorAction Stop).Source
$media = Get-ChildItem images -Recurse -File |
  Where-Object { $_.Name -match '-web\.(mp4|webp)$' }

$failed = @()
foreach ($file in $media) {
  & $ffmpeg -v error -i $file.FullName -f null - 2>$null
  if ($LASTEXITCODE -ne 0) {
    $failed += $file.FullName
  }
}

"Decode errors: $($failed.Count)"
$failed
```

### 7.4 验证 MP4 Fast Start

```powershell
$failed = @()
Get-ChildItem images -Recurse -File -Filter '*-web.mp4' | ForEach-Object {
  $stream = [System.IO.File]::OpenRead($_.FullName)
  try {
    $length = [Math]::Min(1MB, $stream.Length)
    $buffer = New-Object byte[] $length
    [void]$stream.Read($buffer, 0, $length)
    $header = [System.Text.Encoding]::ASCII.GetString($buffer)
    $moov = $header.IndexOf('moov')
    $mdat = $header.IndexOf('mdat')
    if ($moov -lt 0 -or $mdat -lt 0 -or $moov -gt $mdat) {
      $failed += $_.FullName
    }
  }
  finally {
    $stream.Dispose()
  }
}

"Fast Start errors: $($failed.Count)"
$failed
```

### 7.5 检查 JavaScript 和站点构建

```powershell
node --check assets/js/_main.js
node --check assets/js/main.min.js
bundle exec jekyll build --trace
git diff --check
```

构建完成后还应搜索 `_site`，确认生成页面已经引用网页媒体版本：

```powershell
rg -n -- '-web\.mp4|-web\.webp|-card\.webp' _site
```

## 8. 性能预算

新增项目时建议遵守以下预算：

- 头像 WebP：不超过 80KB。
- 首页项目卡片图片：单张尽量不超过 100KB。
- 首页自动播放视频：单段建议控制在 0.5–1MB，尽量不超过 1.5MB。
- 普通正文图片：通常控制在 300KB 内。
- 含大量小字的技术截图：可放宽到约 600KB，但必须验证可读性。
- 普通详情视频：单段尽量不超过 2MB；较长视频应拆分或进一步降低帧率、分辨率。
- 首页关键 CSS 与 JavaScript：合计保持在 100KB 内。
- 不直接把 1920×1080 或更高分辨率录屏作为首页卡片播放源。

这些数值是页面体验预算，不是绝对限制。技术内容清晰度优先，但超出预算时必须说明原因并进行人工对比。

## 9. 常见问题

### 9.1 视频一直显示“正在加载视频”

按以下顺序排查：

1. 检查 `<source>` 是否使用 `data-src`，并且父级 `<video>` 包含 `lazy-video`。
2. 在浏览器网络面板确认视频进入视口后是否发出请求。
3. 直接访问视频 URL，确认返回 HTTP 200 或 206。
4. 检查路径大小写；GitHub Pages 的路径大小写敏感。
5. 使用 FFmpeg 解码检查确认文件没有损坏。
6. 确认编码为 H.264 且像素格式为 `yuv420p`。
7. 确认 `moov` 位于 `mdat` 前，即已经启用 Fast Start。
8. 本地测试必须通过 `http://127.0.0.1:4000/`，不要直接双击 HTML 文件使用 `file://` 打开。

### 9.2 视频加载后仍先看到静态画面

浏览器在播放前后可能短暂保留已解码的第一帧。当前页面使用统一加载层覆盖未就绪状态，并在 `loadeddata`、`canplay` 或 `playing` 后隐藏占位。不要使用另一个项目的图片作为 `poster`，否则会造成内容重复或误导。

### 9.3 多视频页面加载很慢

- 确认视频是否已经切换为 `-web.mp4`。
- 检查是否误把 `data-src` 改成了 `src`。
- 不要移除 `maxConcurrentLoads = 2` 的并发限制。
- 对 2×4 网格中的长视频，可进一步将最大宽度降至 640–800px。
- 如果单段视频内容很长，应截取最能说明结果的短片，而不是完整录屏。

### 9.4 WebP 反而很大

可能原因包括原图分辨率过高、无损编码、图中噪声较多或质量参数过高。应先缩放到实际显示尺寸，再选择适合图片类型的 quality。不要仅将 PNG 无损转换成同尺寸无损 WebP后就认为已经完成网页优化。

## 10. 本轮优化结果基线

2026-08-05 的优化可作为后续对照：

- 17 段实际使用的视频由 58.01MB 降至 14.85MB，减少 74.4%。
- 首页四个代表项目的媒体总量由约 7.65MB 降至约 0.90MB。
- 6 张较大的正文 WebP 由约 5.51MB 降至约 1.13MB。
- 所有网页视频均通过解码和 Fast Start 检查。
- 关键 CSS 与 JavaScript 合计约 70.3KB。

后续优化不应以降低清晰度为唯一目标，而应同时检查首帧时间、滚动流畅度、布局稳定性、移动端可读性以及技术信息是否仍然准确。
