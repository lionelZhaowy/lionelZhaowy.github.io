---
permalink: /
title: ""
excerpt: ""
author_profile: true
lang: zh
redirect_from: 
  - /about/
  - /about.html
---

{% if site.google_scholar_stats_use_cdn %}
{% assign gsDataBaseUrl = "https://cdn.jsdelivr.net/gh/" | append: site.repository | append: "@" %}
{% else %}
{% assign gsDataBaseUrl = "https://raw.githubusercontent.com/" | append: site.repository | append: "/" %}
{% endif %}
{% assign url = gsDataBaseUrl | append: "google-scholar-stats/gs_data_shieldsio.json" %}

<span class='anchor' id='about-me'></span>

我目前就读于中国科学院半导体研究所，导师为刘力源研究员。本科毕业于合肥工业大学微电子学院。包括合著，我已经发表 2 篇学术论文。
 <a href='https://scholar.google.com/citations?user=WMkMTb4AAAAJ'><img src="https://img.shields.io/endpoint?url={{ url | url_encode }}&logo=Google%20Scholar&labelColor=f6f6f6&color=9cf&style=flat&label=引用"></a>。

我的研究领域包括：
- 边缘端AI推理芯片
- 神经网络算法与硬件协同优化
- 面向自研处理器的AI模型编译器
- 感算一体智能视觉芯片



<span class='anchor' id='-xl'></span>

# 🎓 学历
- *2024.09 - 至今*, <a href="https://www.ucas.ac.cn//"><img class="svg" src="/images/CAS_logo.svg" width="20pt"></a> 中国科学院大学, <a href="https://www.semi.ac.cn///"><img class="svg" src="/images/SEMI_logo.png" width="20pt"></a> 中国科学院半导体研究所, 集成电路科学与工程, 北京, 硕博连读
- *2020.09 - 2024.06*, <a href="https://www.hfut.edu.cn/"><img class="svg" src="/images/HFUT_logo.svg" width="23pt"></a> 合肥工业大学 微电子学院, 集成电路设计与集成系统, 安徽合肥, 本科
 


<span class='anchor' id='-xmjl'></span>

# 🧩 项目经历

<style>
  /* 卡片整体样式 */
  .project-card {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    margin-bottom: 25px;
    padding: 15px;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    border: 1px solid #f0f0f0;
  }
  /* 鼠标悬停时的轻微抬起动画 */
  .project-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 16px rgba(0,0,0,0.12);
  }
  /* 缩略图区域 */
  .project-thumbnail {
    flex-shrink: 0;
    width: 200px;
    margin-right: 20px;
  }
  .project-thumbnail img {
    width: 100%;
    border-radius: 6px;
    object-fit: cover;
    aspect-ratio: 16/9; /* 强制 16:9 比例 */
    border: 1px solid #eaeaea;
  }
  /* 文字信息区域 */
  .project-info {
    flex-grow: 1;
  }
  .project-info h3 {
    margin-top: 0;
    margin-bottom: 8px;
    font-size: 1.25em;
  }
  .project-info h3 a {
    text-decoration: none;
    color: #2c3e50;
  }
  .project-meta {
    font-size: 0.85em;
    color: #7f8c8d;
    margin-bottom: 10px;
  }
  .project-summary {
    font-size: 0.95em;
    color: #444;
    margin-bottom: 12px;
    line-height: 1.6;
  }
  /* 底部标签区域 */
  .project-tags span {
    display: inline-block;
    background: #f1f3f5;
    padding: 4px 10px;
    border-radius: 4px;
    font-size: 0.85em;
    color: #495057;
    margin-right: 8px;
    margin-bottom: 6px;
  }
  /* 移动端适配 */
  @media (max-width: 768px) {
    .project-card {
      flex-direction: column;
    }
    .project-thumbnail {
      width: 100%;
      margin-right: 0;
      margin-bottom: 15px;
    }
  }
</style>

{% assign items = site.projects | sort: 'order' %}
{% if items and items.size > 0 %}

<div class="project-cards">
  {% for p in items %}
  <div class="project-card">
    <div class="project-thumbnail">
      {% if p.teaser %}
        <img src="{{ p.teaser | relative_url }}" alt="{{ p.title }}">
      {% else %}
        <img src="{{ '/images/500x300.png' | relative_url }}" alt="Placeholder">
      {% endif %}
    </div>
    
    <div class="project-info">
      <h3><a href="{{ p.url | relative_url }}">{{ p.title }}</a></h3>
      
      {% if p.period %}
        <div class="project-meta">
          <i class="fas fa-calendar-alt"></i> {{ p.period }}
        </div>
      {% endif %}
      
      {% if p.summary %}
        <div class="project-summary">{{ p.summary }}</div>
      {% endif %}
      
      <div class="project-tags">
        {% if p.role %}<span><i class="fas fa-user-tag"></i> {{ p.role }}</span>{% endif %}
        {% if p.tech %}<span><i class="fas fa-microchip"></i> {{ p.tech | join: ' / ' }}</span>{% endif %}
      </div>
    </div>
  </div>
  {% endfor %}
</div>

{% else %}
- 暂无（请在 `_projects/` 下新增项目文件）
{% endif %}




<span class='anchor' id='-lwzl'></span>

# 📝 论文专利

### 英文
---

- Zhihao Zhang, Gaoming Du, Zhenmin Li, Qingran Kang, `Wenyao Zhao`, Xiaolei Wang. [An energy-efficient dehazing neural network accelerator based on E2 AOD-Net](https://link.springer.com/article/10.1007/s11554-024-01574-x)[J]. Journal of Real-Time Image Processing, 2024, 21(6): 197. (JCR:Q2; IF:3.0)




### 中文
---

- 宁欣, `赵文尧`, 宗易昕, 张玉贵, 陈灏, 周琦, 马骏骁. [神经网络压缩联合优化方法的研究综述](https://tis.hrbeu.edu.cn/oa/darticle.aspx?type=view&id=202306042)[J]. 智能系统学报, 2024, 19(1): 3657. (核心期刊; IF:2.839; CCF-C)




### 专利
---
- 暂无







<span class='anchor' id='-ryjx'></span>

# 🏅 荣誉奖项
- *2025.06* 获得 中国科学院大学获`三好学生`
- *2024.06* 获得 合肥工业大学`校长奖`、安徽省`优秀毕业生`
- *2023.12* 获得 `国家奖学金`、校级`一等奖学金`、校级`优秀三好学生`
- *2023.08* 获得 全国大学生集成电路创新创业大赛华中赛区`三等奖`
- *2023.05* 获得 安徽省机器人大赛单片机与嵌入式赛道`一等奖`
- *2022.12* 获得 合肥工业大学校级`一等奖学金`、校级`三好学生`
- *2021.12* 获得 合肥工业大学校级`二等奖学金`、校级`三好学生`







<span class='anchor' id='-xshy'></span>

# 🏛️ 学术会议
- 暂无







<span class='anchor' id='-gzsx'></span>

# 💻 工作实习
- 暂无