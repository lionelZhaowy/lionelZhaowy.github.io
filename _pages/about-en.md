---
permalink: /en/
title: ""
excerpt: ""
author_profile: true
lang: en
redirect_from: 
  - /en/about/
  - /en/about.html
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



<span class='anchor' id='education'></span>

# 🎓 Education
- *2024.09 - Present*, <a href="https://www.ucas.ac.cn//"><img class="svg" src="/images/CAS_logo.svg" width="20pt"></a> University of Chinese Academy of Sciences (UCAS) & <a href="https://www.semi.ac.cn///"><img class="svg" src="/images/SEMI_logo.png" width="20pt"></a> Institute of Semiconductors, CAS, Integrated Circuit Science and Engineering, Beijing, China
- *2020.09 - 2024.06*, <a href="https://www.hfut.edu.cn/"><img class="svg" src="/images/HFUT_logo.svg" width="23pt"></a> Hefei University of Technology, School of Microelectronics, Integrated Circuit Design and Integrated Systems, Hefei, China



<span class='anchor' id='projects'></span>

# 🧩 Projects


{% assign items = site.projects_en | sort: 'order' %}
{% if items and items.size > 0 %}

<div class="project-cards">
  {% for p in items %}
  <div class="project-card">
    <div class="project-thumbnail">
      {% if p.teaser %}
        {% if p.teaser contains '.mp4' or p.teaser contains '.webm' %}
          <video class="project-video-thumb" autoplay loop muted playsinline webkit-playsinline>
            <source src="{{ p.teaser | relative_url }}?v=1" type="video/mp4">
          </video>
        {% else %}
          <img src="{{ p.teaser | relative_url }}" alt="{{ p.title }}" loading="lazy">
        {% endif %}
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


<span class='anchor' id='publications'></span>

# 📝 Publications & Patents

### Journal / Conference
---
- Zhihao Zhang, Gaoming Du, Zhenmin Li, Qingran Kang, `Wenyao Zhao`, Xiaolei Wang. An energy-efficient dehazing neural network accelerator based on E2 AOD-Net. *Journal of Real-Time Image Processing*, 2024, 21(6): 197. (JCR: Q2; IF: 3.0) [[web]](https://link.springer.com/article/10.1007/s11554-024-01574-x)[[pdf]](/images/project/202305-202309-MicroHFUT/s11554-024-01574-x.pdf)


- NING Xin, ZHAO Wenyao, ZONG Yixin, et al. An overview of the joint optimization method for neural network compression[J]. CAAI Transactions on Intelligent Systems, 2024, 19(1): 36-57. (PKU Core; IF:2.839; CCF-C) [[web]](https://tis.hrbeu.edu.cn/oa/darticle.aspx?type=view&id=202306042)[[pdf]](/images/project/202207-202307-SEMI/NN_Compression_Survey.pdf)


### Patents
---
- (To be updated)





<span class='anchor' id='honors'></span>

# 🏅 Honors & Awards
- *2025.06* Merit Student, UCAS
- *2024.06* President's Award, HFUT; Outstanding Graduate of Anhui Province
- *2023.12* National Scholarship; First-Class Scholarship & Outstanding Merit Student, HFUT
- *2023.08* Third Prize, National College Student Integrated Circuit Innovation and Entrepreneurship Competition (Central China Division)
- *2023.05* First Prize, Anhui Provincial Robotics Competition (MCU & Embedded Systems Track)
- *2022.12* First-Class Scholarship & Merit Student, HFUT
- *2021.12* Second-Class Scholarship & Merit Student, HFUT





{% if false %}{% endif %}





{% if false %}{% endif %}
