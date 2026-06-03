---
permalink: /projects/
title: "项目经历"
excerpt: ""
author_profile: true
lang: zh
---

# 项目经历

这里列出我主要参与的项目。点击项目标题可进入项目详情页。

<ul>
  {% assign items = site.projects | sort: 'order' %}
  {% for p in items %}
    <li>
      <a href="{{ p.url | relative_url }}"><strong>{{ p.title }}</strong></a>
      {% if p.period %}（{{ p.period }}）{% endif %}
      {% if p.role %}<br/>角色：{{ p.role }}{% endif %}
      {% if p.tech %}<br/>关键词：{{ p.tech | join: ' / ' }}{% endif %}
      {% if p.summary %}<br/>简介：{{ p.summary }}{% endif %}
    </li>
  {% endfor %}
</ul>
