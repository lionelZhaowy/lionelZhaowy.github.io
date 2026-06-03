---
title: "示例项目：边缘端 AI 推理加速器"
order: 1
period: "2024.03 - 2024.12"
role: "核心开发（算法-硬件协同）"
tech:
  - "CNN"
  - "Quantization"
  - "FPGA/ASIC"
summary: "面向边缘端场景的低功耗神经网络推理加速方案，实现端侧实时推理。"

# 你新增的字段：项目技术方案（详细）
# 建议字段名：solution（也可用 technical_solution / architecture / approach）
solution: |
  - 设计整体推理流水线：前处理 -> 量化模型推理 -> 后处理。
  - 采用 INT8 量化与算子融合，减少带宽与访存压力。
  - 设计片上缓存复用策略，提升数据复用率。

highlights:
  - "将模型端到端延迟降低 XX%（填入你的真实数据）"
  - "完成关键算子（Conv/GEMM）硬件映射与调优"
links:
  - label: "GitHub"
    url: "https://github.com/"
---

## 项目背景
（填写项目背景/目标/约束）

## 技术方案
{{ page.solution | markdownify }}

## 个人贡献
{% if page.highlights %}
- {% for h in page.highlights %}
  - {{ h }}
  {% endfor %}
{% endif %}

## 结果与指标
（填写性能、功耗、面积、吞吐、延迟等指标；可以列表或表格）
