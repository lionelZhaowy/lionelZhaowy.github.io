---
title: "Demo Project: Edge AI Inference Accelerator"
order: 1
period: "Mar 2024 - Dec 2024"
role: "Core contributor (algorithm–hardware co-design)"
tech:
  - "CNN"
  - "Quantization"
  - "FPGA/ASIC"
summary: "A low-power edge AI inference acceleration solution enabling real-time on-device inference."

# Field for detailed technical solution
# Recommended field name: solution (alternatives: technical_solution / architecture / approach)
solution: |
  - End-to-end inference pipeline: pre-processing -> quantized inference -> post-processing.
  - INT8 quantization + operator fusion to reduce bandwidth and memory traffic.
  - On-chip buffer reuse strategy to improve data reuse.

highlights:
  - "Reduced end-to-end latency by XX% (fill your real number)"
  - "Implemented and optimized Conv/GEMM mapping"
links:
  - label: "GitHub"
    url: "https://github.com/"
---

## Background
(Fill in the project background, goals, constraints.)

## Technical Solution
{{ page.solution | markdownify }}

## My Contributions
{% if page.highlights %}
- {% for h in page.highlights %}
  - {{ h }}
  {% endfor %}
{% endif %}

## Results
(Fill in performance/power/area/throughput/latency metrics.)
