---
permalink: /en/projects/
title: "Projects"
excerpt: ""
author_profile: true
lang: en
---

# Projects

Below are selected projects I have contributed to. Click a project title to view details.

<ul>
  {% assign items = site.projects_en | sort: 'order' %}
  {% for p in items %}
    <li>
      <a href="{{ p.url | relative_url }}"><strong>{{ p.title }}</strong></a>
      {% if p.period %} ({{ p.period }}){% endif %}
      {% if p.role %}<br/>Role: {{ p.role }}{% endif %}
      {% if p.tech %}<br/>Keywords: {{ p.tech | join: ' / ' }}{% endif %}
      {% if p.summary %}<br/>Summary: {{ p.summary }}{% endif %}
    </li>
  {% endfor %}
</ul>
