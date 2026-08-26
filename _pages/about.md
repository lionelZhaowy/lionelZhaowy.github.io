---
permalink: /
title: ""
description: "赵文尧的个人主页，展示边缘端 AI 处理器、定制处理器编译工具链及软硬件协同设计方面的研究与工程实践。"
author_profile: true
lang: zh
redirect_from:
  - /about/
  - /about.html
---

<section class="home-hero" id="about-me">
  <p class="section-eyebrow">ABOUT ME · 边缘智能计算</p>
  <h1>你好，我是 <span>赵文尧</span>。</h1>
  <div class="home-hero__intro">
    <p class="home-hero__lead">我目前就读于中国科学院半导体研究所，攻读集成电路科学与工程硕博连读项目，导师为刘力源研究员；本科毕业于合肥工业大学微电子学院。</p>
    <p class="home-hero__lead">我的工作聚焦于自研 AI 处理器的架构与软件栈：参与定制指令扩展、数据通路的设计与验证，并研发从模型解析、硬件感知量化到内存规划、指令映射与代码生成的编译部署工具链，推动 AI 模型在 ASIC 与 FPGA 原型上的正确、高效执行。</p>
  </div>

  <div class="research-overview" aria-label="研究与工程概览">
    <div><strong>3</strong><span>款自研 ASIC<br>算法与部署实践</span></div>
    <div><strong>2</strong><span>款 FPGA<br>加速器设计验证</span></div>
    <div><strong>2</strong><span>篇已发表论文<br>涵盖算法与加速器</span></div>
  </div>
</section>

<section class="home-section" id="education">
  <header class="section-heading">
    <div><p>EDUCATION</p><h2>教育背景</h2></div>
  </header>
  <div class="education-list">
    <article>
      <img class="education-list__logo" src="{{ '/images/CAS_logo.svg' | relative_url }}"
           width="64" height="64" alt="中国科学院院徽" loading="lazy" decoding="async">
      <div class="education-list__content">
        <time>2024.09 — 至今(预计2029年毕业)</time>
        <h3>中国科学院大学 · 中国科学院半导体研究所</h3>
        <p>集成电路科学与工程，硕博连读(保研) · 北京</p>
      </div>
    </article>
    <article>
      <img class="education-list__logo" src="{{ '/images/HFUT_logo.svg' | relative_url }}"
           width="64" height="64" alt="合肥工业大学校徽" loading="lazy" decoding="async">
      <div class="education-list__content">
        <time>2020.09 — 2024.06</time>
        <h3>合肥工业大学 · 国家示范性微电子学院</h3>
        <p>集成电路设计与集成系统，本科 · 合肥</p>
      </div>
    </article>
  </div>
</section>

<section class="home-section" id="skills">
  <header class="section-heading">
    <div><p>SKILLS &amp; TOOLKIT</p><h2>技能与工具</h2></div>
    <span>面向自研 AI 处理器的架构、编译与验证能力</span>
  </header>
  <div class="skills-grid">
    <article class="skill-group">
      <p class="skill-group__index">01</p>
      <h3>AI 处理器与数字系统</h3>
      <p>RISC-V 自定义指令扩展、SIMD 与脉动阵列、计算数据流、定点数据通路、加速器集成与 RTL 设计</p>
    </article>
    <article class="skill-group">
      <p class="skill-group__index">02</p>
      <h3>定制处理器编译与部署</h3>
      <p>ONNX 计算图解析、算子融合、静态内存规划、张量排布转换、芯间通信传输、指令映射与代码生成</p>
    </article>
    <article class="skill-group">
      <p class="skill-group__index">03</p>
      <h3>硬件感知模型优化</h3>
      <p>CNN / Transformer 模型适配、定点数值建模、算子约束、QAT / PTQ、剪枝与知识蒸馏</p>
    </article>
    <article class="skill-group">
      <p class="skill-group__index">04</p>
      <h3>验证与性能优化</h3>
      <p>MATLAB 参考模型、VCS RTL 仿真、FPGA 原型与板级测试、数值一致性验证、周期与访存瓶颈分析</p>
    </article>
  </div>
  <p class="skills-toolbox"><strong>常用开发工具</strong><span>Verilog / SystemVerilog · VCS / ModelSim · DC · ICC · Vivado · Python / PyTorch · MATLAB · C / C++ · Git / Linux</span></p>
</section>

<section class="home-section" id="projects">
  <header class="section-heading">
    <div><p>SELECTED PROJECTS</p><h2>代表项目</h2></div>
    <span>算法、编译与硬件的端到端实践</span>
  </header>

  {% assign items = site.projects | sort: 'order' %}
  <div class="project-grid">
    {% for p in items limit: 4 %}
      <article class="project-card">
        <a class="project-card__visual" href="{{ p.url | relative_url }}" aria-label="查看项目：{{ p.title }}">
          {% include project-card-media.html project=p %}
        </a>
        <div class="project-card__body">
          <p class="project-card__meta"><span>{{ p.period }}</span><span>{{ p.role }}</span></p>
          <h3><a href="{{ p.url | relative_url }}">{{ p.title }}</a></h3>
          <p class="project-card__summary">{{ p.summary }}</p>
          <ul class="project-card__tags" aria-label="技术标签">
            {% for tag in p.tech limit: 3 %}<li>{{ tag }}</li>{% endfor %}
          </ul>
        </div>
      </article>
    {% endfor %}
  </div>

  <div class="other-projects">
    <h3>其他项目经历</h3>
    <ul>
      {% for p in items offset: 4 %}
        <li><a href="{{ p.url | relative_url }}"><span>{{ p.period }}</span><strong>{{ p.title }}</strong></a></li>
      {% endfor %}
    </ul>
  </div>
</section>

<section class="home-section" id="publications">
  <header class="section-heading">
    <div><p>PUBLICATIONS</p><h2>论文成果</h2></div>
  </header>
  <ol class="publication-list">
    <li>
      <span class="publication-list__year">2024</span>
      <div><strong>An energy-efficient dehazing neural network accelerator based on E2 AOD-Net</strong><p>Zhihao Zhang, Gaoming Du, Zhenmin Li, Qingran Kang, <b>Wenyao Zhao</b>, Xiaolei Wang · <i>Journal of Real-Time Image Processing</i>, 21(6): 197 · JCR Q2, IF 3.0</p></div>
      <p class="publication-list__links"><a href="https://link.springer.com/article/10.1007/s11554-024-01574-x">网页</a><a href="{{ '/images/project/202305-202309-MicroHFUT/s11554-024-01574-x.pdf' | relative_url }}">PDF</a></p>
    </li>
    <li>
      <span class="publication-list__year">2024</span>
      <div><strong>神经网络压缩联合优化方法的研究综述</strong><p>宁欣，<b>赵文尧</b>，宗易昕，等 · 《智能系统学报》19(1): 36–57 · 核心期刊，CCF-C</p></div>
      <p class="publication-list__links"><a href="https://tis.hrbeu.edu.cn/oa/darticle.aspx?type=view&id=202306042">网页</a><a href="{{ '/images/project/202207-202307-SEMI/NN_Compression_Survey.pdf' | relative_url }}">PDF</a></p>
    </li>
  </ol>
</section>

<section class="home-section" id="honors">
  <header class="section-heading">
    <div><p>HONORS</p><h2>荣誉奖项</h2></div>
  </header>
  <ol class="timeline-list">
    <li><time>2025.06</time><span>中国科学院大学三好学生</span></li>
    <li><time>2024.06</time><span>合肥工业大学校长奖、安徽省优秀毕业生</span></li>
    <li><time>2023.12</time><span>国家奖学金、校级一等奖学金、校级优秀三好学生</span></li>
    <li><time>2023.08</time><span>全国大学生集成电路创新创业大赛华中赛区三等奖</span></li>
    <li><time>2023.05</time><span>安徽省机器人大赛单片机与嵌入式赛道一等奖</span></li>
    <li><time>2022.12</time><span>合肥工业大学一等奖学金、校级三好学生</span></li>
    <li><time>2021.12</time><span>合肥工业大学二等奖学金、校级三好学生</span></li>
  </ol>
</section>
