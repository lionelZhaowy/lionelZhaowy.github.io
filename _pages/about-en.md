---
permalink: /en/
title: ""
excerpt: ""
author_profile: true
lang: en
---

{% if site.google_scholar_stats_use_cdn %}
{% assign gsDataBaseUrl = "https://cdn.jsdelivr.net/gh/" | append: site.repository | append: "@" %}
{% else %}
{% assign gsDataBaseUrl = "https://raw.githubusercontent.com/" | append: site.repository | append: "/" %}
{% endif %}
{% assign url = gsDataBaseUrl | append: "google-scholar-stats/gs_data_shieldsio.json" %}





<span class='anchor' id='about-me'></span>

I am currently a graduate student at the Institute of Semiconductors, Chinese Academy of Sciences(CAS), advised by Prof. Liyuan Liu. I received my B.Eng. degree from the School of Microelectronics, Hefei University of Technology(HFUT). My research primarily focuses on the intersection of artificial intelligence and computer architecture, specifically including:
- Edge AI inference chips
- Algorithm–hardware co-optimization for DNNs
- Domain-specific AI compilers for custom processors
- Near-sensor computing smart vision chips

I have been deeply involved in the algorithm design, compilation and deployment for 3 in-house custom Application-Specific Integrated Circuits (ASICs), as well as the architecture design of 2 FPGA-based AI accelerators. To date, I have contributed to 2 academic publications (including co-authored works).
<a href='https://scholar.google.com/citations?user=WMkMTb4AAAAJ'><img src="https://img.shields.io/endpoint?url={{ url | url_encode }}&logo=Google%20Scholar&labelColor=f6f6f6&color=9cf&style=flat&label=Citations"></a>



<span class='anchor' id='-xl'></span>

# 🎓 Education
- *2024.09 - Present*, <a href="https://www.ucas.ac.cn//"><img class="svg" src="/images/CAS_logo.svg" width="20pt"></a> University of Chinese Academy of Sciences (UCAS) & <a href="https://www.semi.ac.cn///"><img class="svg" src="/images/SEMI_logo.png" width="20pt"></a> Institute of Semiconductors, CAS, Integrated Circuit Science and Engineering, Beijing, China
- *2020.09 - 2024.06*, <a href="https://www.hfut.edu.cn/"><img class="svg" src="/images/HFUT_logo.svg" width="23pt"></a> Hefei University of Technology, School of Microelectronics, Integrated Circuit Design and Integrated Systems, Hefei, China





<span class='anchor' id='-xmjl'></span>

# 🧩 Projects

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

{% assign items = site.projects_en | sort: 'order' %}
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
- None yet. (Add files under `_projects_en/`.)
{% endif %}


<span class='anchor' id='-lwzl'></span>

# 📝 Publications & Patents

### Journal / Conference
---
- Zhihao Zhang, Gaoming Du, Zhenmin Li, Qingran Kang, `Wenyao Zhao`, Xiaolei Wang. An energy-efficient dehazing neural network accelerator based on E2 AOD-Net. *Journal of Real-Time Image Processing*, 2024, 21(6): 197. (JCR: Q2; IF: 3.0) [[web]](https://link.springer.com/article/10.1007/s11554-024-01574-x)[[pdf]](/images/project/202305-202309-MicroHFUT/s11554-024-01574-x.pdf)


- NING Xin, ZHAO Wenyao, ZONG Yixin, et al. An overview of the joint optimization method for neural network compression[J]. CAAI Transactions on Intelligent Systems, 2024, 19(1): 36-57. (PKU Core; IF:2.839; CCF-C) [[web]](https://tis.hrbeu.edu.cn/oa/darticle.aspx?type=view&id=202306042)[[pdf]](/images/project/202207-202307-SEMI/NN_Compression_Survey.pdf)


### Patents
---
- (To be updated)





<span class='anchor' id='-ryjx'></span>

# 🏅 Honors & Awards
- *2025.06* Merit Student, UCAS
- *2024.06* President's Award, HFUT; Outstanding Graduate of Anhui Province
- *2023.12* National Scholarship; First-Class Scholarship & Outstanding Merit Student, HFUT
- *2023.08* Third Prize, National College Student Integrated Circuit Innovation and Entrepreneurship Competition (Central China Division)
- *2023.05* First Prize, Anhui Provincial Robotics Competition (MCU & Embedded Systems Track)
- *2022.12* First-Class Scholarship & Merit Student, HFUT
- *2021.12* Second-Class Scholarship & Merit Student, HFUT





<span class='anchor' id='-xshy'></span>

# 🏛️ Academic Activities
- (To be updated)





<span class='anchor' id='-gzsx'></span>

# 💻 Internships
- (To be updated)