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

I am currently a graduate student at the Institute of Semiconductors, Chinese Academy of Sciences, advised by Prof. Liyuan Liu. I received my B.Eng. degree from the School of Microelectronics, Hefei University of Technology. Including co-authored works, I have published 2 papers.
<a href='https://scholar.google.com/citations?user=WMkMTb4AAAAJ'><img src="https://img.shields.io/endpoint?url={{ url | url_encode }}&logo=Google%20Scholar&labelColor=f6f6f6&color=9cf&style=flat&label=Citations"></a>

My research interests include:
- Edge AI inference chips
- Algorithm–hardware co-optimization for neural networks
- AI model compilers for self-developed processors

<span class='anchor' id='-xl'></span>

# 🎓 Education
- *2024.09 - Present*, University of Chinese Academy of Sciences (UCAS) & Institute of Semiconductors, CAS, Integrated Circuit Science and Engineering, Beijing, China
- *2020.09 - 2024.06*, Hefei University of Technology, School of Microelectronics, Integrated Circuit Design and Integrated Systems, Hefei, China

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

<span class='anchor' id='-ryjx'></span>

# 🏅 Honors & Awards
- *2025.06* Merit Student, University of Chinese Academy of Sciences
- *2024.06* President's Award (HFUT); Outstanding Graduate of Anhui Province

<span class='anchor' id='-xshy'></span>

# 🏛️ Academic Activities
- (To be updated)

<span class='anchor' id='-gzsx'></span>

# 💻 Internships
- (To be updated)
