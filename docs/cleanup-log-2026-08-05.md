# 冗余文件清理日志

- 执行时间：2026-08-05 15:54:00 +08:00
- 清理范围：仅删除已确认未被当前模板、页面或配置引用的重复资源和停用工具。
- 删除文件：15 个
- 释放空间：2,007,505 bytes（约 1.91 MiB）
- Git 状态：未提交、未推送；删除内容仍可从 Git 历史恢复。

## 删除明细

| 路径 | 大小（bytes） | 原因 |
| --- | ---: | --- |
| `.github/workflows/google_scholar_crawler.yaml` | 851 | 页面已改用普通 Scholar 链接，不再需要定时抓取与强制推送统计分支。 |
| `google_scholar_crawler/.gitignore` | 1,959 | 随停用的 Scholar 抓取工具删除。 |
| `google_scholar_crawler/main.py` | 825 | 随停用的 Scholar 抓取工具删除。 |
| `google_scholar_crawler/requirements.txt` | 37 | 随停用的 Scholar 抓取工具删除。 |
| `images/favicon_io.zip` | 55,790 | favicon 生成包归档；站点使用根目录中的正式资源。 |
| `images/favicon_io/android-chrome-192x192.png` | 8,438 | 与 `images/android-chrome-192x192.png` 内容完全相同。 |
| `images/favicon_io/android-chrome-512x512.png` | 21,418 | 与 `images/android-chrome-512x512.png` 内容完全相同。 |
| `images/favicon_io/apple-touch-icon.png` | 7,479 | 与 `images/apple-touch-icon.png` 内容完全相同。 |
| `images/favicon_io/favicon-16x16.png` | 619 | 与 `images/favicon-16x16.png` 内容完全相同。 |
| `images/favicon_io/favicon-32x32.png` | 1,347 | 与 `images/favicon-32x32.png` 内容完全相同。 |
| `images/favicon_io/favicon.ico` | 15,406 | 与 `images/favicon.ico` 内容完全相同。 |
| `images/favicon_io/site.webmanifest` | 263 | 与 `images/site.webmanifest` 内容完全相同。 |
| `images/ijaem2020.svg` | 993,438 | 当前页面、模板、样式、配置和 README 引用数均为 0 的旧 SVG 资源。 |
| `images/sensors2022.svg` | 306,481 | 当前页面、模板、样式、配置和 README 引用数均为 0 的旧 SVG 资源。 |
| `images/sna2021.svg` | 593,154 | 当前页面、模板、样式、配置和 README 引用数均为 0 的旧 SVG 资源。 |

同时移除了清空后的 `images/favicon_io/` 和 `google_scholar_crawler/` 目录，以及 `_config.yml` 中已失效的 `google_scholar_crawler` 排除项。

## 保留项

- 保留 `images/` 根目录下正在使用的 favicon、Apple Touch Icon、Android Chrome 图标和 Web App Manifest。
- 保留 README 仍引用的 `docs/README-en.md` 与 `docs/screenshot.png`。
- 保留全部项目媒体和当前本地预览所需的 `_site/` 生成目录。
