---
permalink: /en/
title: ""
description: "Personal website of Wenyao Zhao, featuring research and engineering work on edge AI processors, compiler toolchains for custom architectures, and hardware–software co-design."
author_profile: true
lang: en
redirect_from:
  - /en/about/
  - /en/about.html
---

<section class="home-hero" id="about-me">
  <p class="section-eyebrow">ABOUT ME · EDGE AI COMPUTING</p>
  <h1>Hello, I’m <span>Wenyao Zhao</span>.</h1>
  <div class="home-hero__intro">
    <p class="home-hero__lead">I am a graduate student in the integrated M.S.–Ph.D. program in Integrated Circuit Science and Engineering at the Institute of Semiconductors, Chinese Academy of Sciences, advised by Prof. Liyuan Liu. I received my B.Eng. from the School of Microelectronics at Hefei University of Technology.</p>
    <p>My work focuses on the architecture and software stack of custom AI processors. I contribute to custom datapaths, ISA extensions, and digital-system verification while building compilation and deployment infrastructure that spans model parsing, hardware-aware quantization, memory planning, instruction mapping, and code generation. This work enables correct and efficient execution of AI workloads on in-house ASICs and FPGA prototypes.</p>
  </div>

  <div class="research-overview" aria-label="Research and engineering overview">
    <div><strong>3</strong><span>custom ASICs<br>algorithm and deployment work</span></div>
    <div><strong>2</strong><span>FPGA accelerators<br>designed and verified</span></div>
    <div><strong>2</strong><span>peer-reviewed papers<br>on algorithms and accelerators</span></div>
  </div>
</section>

<section class="home-section" id="education">
  <header class="section-heading">
    <div><p>EDUCATION</p><h2>Education</h2></div>
  </header>
  <div class="education-list">
    <article>
      <img class="education-list__logo" src="{{ '/images/CAS_logo.svg' | relative_url }}"
           width="64" height="64" alt="Chinese Academy of Sciences emblem" loading="lazy" decoding="async">
      <div class="education-list__content">
        <time>Sep. 2024 — Present</time>
        <h3>University of Chinese Academy of Sciences · Institute of Semiconductors, CAS</h3>
        <p>Integrated Circuit Science and Engineering, combined M.S.–Ph.D. program (expected graduation: 2029) · Beijing, China</p>
      </div>
    </article>
    <article>
      <img class="education-list__logo" src="{{ '/images/HFUT_logo.svg' | relative_url }}"
           width="64" height="64" alt="Hefei University of Technology emblem" loading="lazy" decoding="async">
      <div class="education-list__content">
        <time>Sep. 2020 — Jun. 2024</time>
        <h3>Hefei University of Technology · National Exemplary School of Microelectronics</h3>
        <p>B.Eng. in Integrated Circuit Design and Integrated Systems · Hefei, China</p>
      </div>
    </article>
  </div>
</section>

<section class="home-section" id="skills">
  <header class="section-heading">
    <div><p>SKILLS &amp; TOOLKIT</p><h2>Skills &amp; Toolkit</h2></div>
    <span>Architecture, compiler, and verification capabilities for custom AI processors</span>
  </header>
  <div class="skills-grid">
    <article class="skill-group">
      <p class="skill-group__index">01</p>
      <h3>AI Processors &amp; Digital Systems</h3>
      <p>RISC-V custom ISA extensions, SIMD and systolic arrays, compute dataflows, fixed-point datapaths, accelerator integration, and RTL design</p>
    </article>
    <article class="skill-group">
      <p class="skill-group__index">02</p>
      <h3>Compilation &amp; Deployment for Custom Processors</h3>
      <p>ONNX graph parsing, hardware modeling, operator fusion, static memory planning, tensor-layout transformation, instruction mapping, and code generation</p>
    </article>
    <article class="skill-group">
      <p class="skill-group__index">03</p>
      <h3>Hardware-Aware Model Optimization</h3>
      <p>CNN / Transformer adaptation, QAT / PTQ, fixed-point numerical modeling, operator constraints, pruning, and knowledge distillation</p>
    </article>
    <article class="skill-group">
      <p class="skill-group__index">04</p>
      <h3>Verification &amp; Performance Analysis</h3>
      <p>MATLAB reference models, VCS RTL simulation, FPGA prototyping and board-level testing, numerical consistency checks, and cycle / memory-bottleneck analysis</p>
    </article>
  </div>
  <p class="skills-toolbox"><strong>Development environment</strong><span>Python / PyTorch · MATLAB · C / C++ · Verilog / SystemVerilog · Vivado / VCS · Git / Linux</span></p>
</section>

<section class="home-section" id="projects">
  <header class="section-heading">
    <div><p>SELECTED PROJECTS</p><h2>Selected Projects</h2></div>
    <span>End-to-end work across models, compilers, and hardware</span>
  </header>

  {% assign items = site.projects_en | sort: 'order' %}
  <div class="project-grid">
    {% for p in items limit: 4 %}
      <article class="project-card">
        <a class="project-card__visual" href="{{ p.url | relative_url }}" aria-label="View project: {{ p.title }}">
          {% include project-card-media.html project=p %}
        </a>
        <div class="project-card__body">
          <p class="project-card__meta"><span>{{ p.period }}</span><span>{{ p.role }}</span></p>
          <h3><a href="{{ p.url | relative_url }}">{{ p.title }}</a></h3>
          <p class="project-card__summary">{{ p.summary }}</p>
          <ul class="project-card__tags" aria-label="Technologies">
            {% for tag in p.tech limit: 3 %}<li>{{ tag }}</li>{% endfor %}
          </ul>
        </div>
      </article>
    {% endfor %}
  </div>

  <div class="other-projects">
    <h3>Additional Projects</h3>
    <ul>
      {% for p in items offset: 4 %}
        <li><a href="{{ p.url | relative_url }}"><span>{{ p.period }}</span><strong>{{ p.title }}</strong></a></li>
      {% endfor %}
    </ul>
  </div>
</section>

<section class="home-section" id="publications">
  <header class="section-heading">
    <div><p>PUBLICATIONS</p><h2>Publications</h2></div>
  </header>
  <ol class="publication-list">
    <li>
      <span class="publication-list__year">2024</span>
      <div><strong>An Energy-Efficient Dehazing Neural Network Accelerator Based on E2 AOD-Net</strong><p>Zhihao Zhang, Gaoming Du, Zhenmin Li, Qingran Kang, <b>Wenyao Zhao</b>, Xiaolei Wang · <i>Journal of Real-Time Image Processing</i>, 21(6): 197 · JCR Q2, IF 3.0</p></div>
      <p class="publication-list__links"><a href="https://link.springer.com/article/10.1007/s11554-024-01574-x">Web</a><a href="{{ '/images/project/202305-202309-MicroHFUT/s11554-024-01574-x.pdf' | relative_url }}">PDF</a></p>
    </li>
    <li>
      <span class="publication-list__year">2024</span>
      <div><strong>An Overview of Joint Optimization Methods for Neural Network Compression</strong><p>Xin Ning, <b>Wenyao Zhao</b>, Yixin Zong, et al. · <i>CAAI Transactions on Intelligent Systems</i>, 19(1): 36–57 · PKU Core, CCF-C</p></div>
      <p class="publication-list__links"><a href="https://tis.hrbeu.edu.cn/oa/darticle.aspx?type=view&id=202306042">Web</a><a href="{{ '/images/project/202207-202307-SEMI/NN_Compression_Survey.pdf' | relative_url }}">PDF</a></p>
    </li>
  </ol>
</section>

<section class="home-section" id="honors">
  <header class="section-heading">
    <div><p>HONORS</p><h2>Honors & Awards</h2></div>
  </header>
  <ol class="timeline-list">
    <li><time>Jun. 2025</time><span>Merit Student, University of Chinese Academy of Sciences</span></li>
    <li><time>Jun. 2024</time><span>President's Award, HFUT; Outstanding Graduate of Anhui Province</span></li>
    <li><time>Dec. 2023</time><span>National Scholarship; First-Class Scholarship; Outstanding Merit Student, HFUT</span></li>
    <li><time>Aug. 2023</time><span>Third Prize, National College Student Integrated Circuit Innovation and Entrepreneurship Competition, Central China Division</span></li>
    <li><time>May 2023</time><span>First Prize, Anhui Provincial Robotics Competition, MCU and Embedded Systems Track</span></li>
    <li><time>Dec. 2022</time><span>First-Class Scholarship and Merit Student, HFUT</span></li>
    <li><time>Dec. 2021</time><span>Second-Class Scholarship and Merit Student, HFUT</span></li>
  </ol>
</section>
