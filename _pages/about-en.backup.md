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

I am currently a graduate student at the Institute of Semiconductors, Chinese Academy of Sciences(CAS), advised by Prof. Liyuan Liu. I received my B.Eng. degree from the School of Microelectronics, Hefei University of Technology(HFUT). Including co-authored works, I have published 2 papers.
<a href='https://scholar.google.com/citations?user=WMkMTb4AAAAJ'><img src="https://img.shields.io/endpoint?url={{ url | url_encode }}&logo=Google%20Scholar&labelColor=f6f6f6&color=9cf&style=flat&label=Citations"></a>

My research interests include:
- Edge AI inference processors
- Algorithm–hardware co-optimization for DNNs
- AI model compilers for self-developed processors
- Monolithic/3D-Stacked Vision Chip with Processing-near-Sensor Architecture





<span class='anchor' id='-xl'></span>

# 🎓 Education
- *2024.09 - Present*, <a href="https://www.ucas.ac.cn//"><img class="svg" src="/images/CAS_logo.svg" width="20pt"></a> University of Chinese Academy of Sciences (UCAS) & <a href="https://www.semi.ac.cn///"><img class="svg" src="/images/SEMI_logo.png" width="20pt"></a> Institute of Semiconductors, CAS, Integrated Circuit Science and Engineering, Beijing, China
- *2020.09 - 2024.06*, <a href="https://www.hfut.edu.cn/"><img class="svg" src="/images/HFUT_logo.svg" width="23pt"></a> Hefei University of Technology, School of Microelectronics, Integrated Circuit Design and Integrated Systems, Hefei, China





<span class='anchor' id='-xmjl'></span>

# 🧩 Projects

{% assign items = site.projects_en | sort: 'order' %}
{% if items and items.size > 0 %}

{% for p in items %}
- **[{{ p.title }}]({{ p.url | relative_url }})**{% if p.period %} ({{ p.period }}){% endif %}

  {% if p.role %}- Role: {{ p.role }}{% endif %}
  {% if p.tech %}- Keywords: {{ p.tech | join: ' / ' }}{% endif %}
  {% if p.summary %}- Summary: {{ p.summary }}{% endif %}
{% endfor %}

{% else %}
- None yet. (Add files under `_projects_en/`.)
{% endif %}


<span class='anchor' id='-lwzl'></span>

# 📝 Publications & Patents

### Journal / Conference
---
- Zhihao Zhang, Gaoming Du, Zhenmin Li, Qingran Kang, `Wenyao Zhao`, Xiaolei Wang. [An energy-efficient dehazing neural network accelerator based on E2 AOD-Net](https://link.springer.com/article/10.1007/s11554-024-01574-x). *Journal of Real-Time Image Processing*, 2024, 21(6): 197. (JCR: Q2; IF: 3.0)

- NING Xin, ZHAO Wenyao, ZONG Yixin, et al. [An overview of the joint optimization method for neural network compression](https://tis.hrbeu.edu.cn/oa/darticle.aspx?type=view&id=202306042)[J]. CAAI Transactions on Intelligent Systems, 2024, 19(1): 36-57. (PKU Core; IF:2.839; CCF-C)


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
