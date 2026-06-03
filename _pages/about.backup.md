---
permalink: /
title: ""
excerpt: ""
author_profile: true
lang: zh
redirect_from: 
  - /about/
  - /about.html
---

{% if site.google_scholar_stats_use_cdn %}
{% assign gsDataBaseUrl = "https://cdn.jsdelivr.net/gh/" | append: site.repository | append: "@" %}
{% else %}
{% assign gsDataBaseUrl = "https://raw.githubusercontent.com/" | append: site.repository | append: "/" %}
{% endif %}
{% assign url = gsDataBaseUrl | append: "google-scholar-stats/gs_data_shieldsio.json" %}

<span class='anchor' id='about-me'></span>

我目前就读于中国科学院半导体研究所，导师为刘力源研究员。本科毕业于合肥工业大学微电子学院。包括合著，我已经发表 2 篇学术论文。
 <a href='https://scholar.google.com/citations?user=WMkMTb4AAAAJ'><img src="https://img.shields.io/endpoint?url={{ url | url_encode }}&logo=Google%20Scholar&labelColor=f6f6f6&color=9cf&style=flat&label=引用"></a>。

我的研究领域包括：
- 边缘端AI推理芯片
- 神经网络算法与硬件协同优化
- 面向自研处理器的AI模型编译器
- 感算一体智能视觉芯片



<span class='anchor' id='-xl'></span>

# 🎓 学历
- *2024.09 - 至今*, <a href="https://www.ucas.ac.cn//"><img class="svg" src="/images/CAS_logo.svg" width="20pt"></a> 中国科学院大学, <a href="https://www.semi.ac.cn///"><img class="svg" src="/images/SEMI_logo.png" width="20pt"></a> 中国科学院半导体研究所, 集成电路科学与工程, 北京, 硕博连读
- *2020.09 - 2024.06*, <a href="https://www.hfut.edu.cn/"><img class="svg" src="/images/HFUT_logo.svg" width="23pt"></a> 合肥工业大学 微电子学院, 集成电路设计与集成系统, 安徽合肥, 本科
 



<span class='anchor' id='-xmjl'></span>

# 🧩 项目经历

{% assign items = site.projects | sort: 'order' %}
{% if items and items.size > 0 %}

{% for p in items %}
- **[{{ p.title }}]({{ p.url | relative_url }})**{% if p.period %}（{{ p.period }}）{% endif %}

  {% if p.role %}- 角色：{{ p.role }}{% endif %}
  {% if p.tech %}- 关键词：{{ p.tech | join: ' / ' }}{% endif %}
  {% if p.summary %}- 简介：{{ p.summary }}{% endif %}
{% endfor %}

{% else %}
- 暂无（请在 `_projects/` 下新增项目文件）
{% endif %}




<span class='anchor' id='-lwzl'></span>

# 📝 论文专利

### 英文
---

-	Zhihao Zhang, Gaoming Du, Zhenmin Li, Qingran Kang, `Wenyao Zhao`, Xiaolei Wang. [An energy-efficient dehazing neural network accelerator based on E2 AOD-Net](https://link.springer.com/article/10.1007/s11554-024-01574-x)[J]. Journal of Real-Time Image Processing, 2024, 21(6): 197. (JCR:Q2; IF:3.0)


<!-- <div class='paper-box'><div class='paper-box-image'><div><div class="badge">Sens. Actuators Phys. 2021</div><img src='images/sna2021.svg' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

-	`Jian Tang`, Rongbiao Wang, Bocheng Liu, Yihua Kang. A novel magnetic flux leakage method based on the ferromagnetic lift-off layer with through groove. *Sensors and Actuators A: Physical*. 2021: 113091. (JCR:Q1; IF:4.291)
[[网页]](https://dx.doi.org/10.1016/j.sna.2021.113091) [[预览]](https://github.com/tangjyan/tangjyan.github.io/blob/main/pdf/TangJ-2021-A%20novel%20magnetic%20flux%20leakage%20method%20based%20on%20the%20ferromagnetic%20lift-off%20layer.pdf) [[下载]](/pdf/TangJ-2021-A%20novel%20magnetic%20flux%20leakage%20method%20based%20on%20the%20ferromagnetic%20lift-off%20layer.pdf)

</div>
</div> -->

<!-- <div class='paper-box'><div class='paper-box-image'><div><div class="badge">Int. J. Appl. Electrom. 2020</div><img src='images/ijaem2020.svg' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

-	`Jian Tang`, Rongbiao Wang, Jikai Zhang, Yihua Kang. The influence of magnetic head’s pose on magnetic flux leakage detection. *International Journal of Applied Electromagnetics and Mechanics*. 2020, 64(1–4): 493–500. (JCR:Q4; IF:0.536)  
[[网页]](https://dx.doi.org/10.3233/JAE-209356) [[预览]](https://github.com/tangjyan/tangjyan.github.io/blob/main/pdf/TangJ-2020-The%20influence%20of%20magnetic%20head%E2%80%99s%20pose%20on%20magnetic%20flux%20leakage%20detection.pdf) [[下载]](/pdf/TangJ-2020-The%20influence%20of%20magnetic%20head%E2%80%99s%20pose%20on%20magnetic%20flux%20leakage%20detection.pdf) -->
<!-- 
</div>
</div>


- Bo Feng, Jianbo Wu, Hongming Tu, `Jian Tang`, Yihua Kang. A Review of Magnetic Flux Leakage Nondestructive Testing. *Materials*. 2022, 15 (20): 7362. (JCR:Q1; IF:3.748)  
[[网页]](https://dx.doi.org/10.3390/ma15207362) [[预览]](https://github.com/tangjyan/tangjyan.github.io/blob/main/pdf/FengB-2022-A%20Review%20of%20Magnetic%20Flux%20Leakage%20Nondestructive%20Testing.pdf) [[下载]](/pdf/FengB-2022-A%20Review%20of%20Magnetic%20Flux%20Leakage%20Nondestructive%20Testing.pdf) -->


<!-- - Xin Jin, Hongbao Ma, `Jian Tang`, Yihua Kang, A Self-Adaptive Vibration Reduction Method Based on Deep Deterministic Policy Gradient (DDPG) Reinforcement Learning Algorithm. *Applied Sciences*. 2022,12(9): 9703. (JCR:Q2; IF:2.838)  
[[网页]](https://dx.doi.org/10.3390/app12199703) [[预览]](https://github.com/tangjyan/tangjyan.github.io/blob/main/pdf/JinX-2022-A%20Self-Adaptive%20Vibration%20Reduction%20Method%20Based%20on%20Deep%20Deterministic%20Policy.pdf) [[下载]](/pdf/JinX-2022-A%20Self-Adaptive%20Vibration%20Reduction%20Method%20Based%20on%20Deep%20Deterministic%20Policy.pdf) -->


### 中文
---

- 宁欣, `赵文尧`, 宗易昕, 张玉贵, 陈灏, 周琦, 马骏骁. [神经网络压缩联合优化方法的研究综述](https://tis.hrbeu.edu.cn/oa/darticle.aspx?type=view&id=202306042)[J]. 智能系统学报, 2024, 19(1): 3657. (核心期刊; IF:2.839; CCF-C)


<!-- - 刘伯承, `唐健*`, 王荣彪, 叶文超, 康宜华. 基于TMR的轴承滚子微细裂纹漏磁检测方法. *仪表技术与传感器*. 2021(12): 111-114+118.  (通讯作者; 核心期刊)  
[[网页]](https://kns.cnki.net/kcms/detail/detail.aspx?dbcode=CJFD&dbname=CJFDAUTO&filename=YBJS202112021) [[预览]](https://github.com/tangjyan/tangjyan.github.io/blob/main/pdf/%E5%88%98%E4%BC%AF%E6%89%BF-2021-%E5%9F%BA%E4%BA%8ETMR%E7%9A%84%E8%BD%B4%E6%89%BF%E6%BB%9A%E5%AD%90%E5%BE%AE%E7%BB%86%E8%A3%82%E7%BA%B9%E6%BC%8F%E7%A3%81%E6%A3%80%E6%B5%8B%E6%96%B9%E6%B3%95.pdf) [[下载]](/pdf/%E5%88%98%E4%BC%AF%E6%89%BF-2021-%E5%9F%BA%E4%BA%8ETMR%E7%9A%84%E8%BD%B4%E6%89%BF%E6%BB%9A%E5%AD%90%E5%BE%AE%E7%BB%86%E8%A3%82%E7%BA%B9%E6%BC%8F%E7%A3%81%E6%A3%80%E6%B5%8B%E6%96%B9%E6%B3%95.pdf)   -->



### 专利
---
- 暂无

<!-- - 康宜华, `唐健`. 一种基于铁磁性板的缺陷检测方法. [[网页]](https://cprs.patentstar.com.cn/Search/Detail?ANE=9IBC8DFA9GCB8DEA6FAA9HHFCICA1BAA9ACB9EGC9GAA6AAA)
- 康宜华, `唐健`. 基于电磁原理的倒角测量装置.[[网页]](http://www.wanfangdata.com.cn/details/detail.do?_type=patent&id=CN201921137073.X)
- 伍剑波, 王杰, 方辉, `唐健`. 一种钢管脉冲磁化漏磁探伤装置. [[网页]](https://kns.cnki.net/KCMS/detail/detail.aspx?dbcode=SCPD&dbname=SCPD2016&filename=CN105334260A&v=) 
- 伍剑波, `唐健`, 王杰, 方辉. 一种基于动生涡电流的金属管件电磁无损检测装置. [[网页]](https://kns.cnki.net/KCMS/detail/detail.aspx?dbcode=SCPD&dbname=SCPD2016&filename=CN105510433A&v=) 
- 刁燕, 陈敏, 王荣彪, `唐健`, 蒲廷燕, 都健. 一种基于绳体拉力传动的机械手. [[网页]](https://kns.cnki.net/KCMS/detail/detail.aspx?dbcode=SCPD&dbname=SCPD2016&filename=CN105773598A&v=)  -->





<span class='anchor' id='-ryjx'></span>

# 🏅 荣誉奖项
- *2025.06* 获得 中国科学院大学获`三好学生`
- *2024.06* 获得 合肥工业大学`校长奖`、安徽省`优秀毕业生`
- *2023.12* 获得 `国家奖学金`、校级`一等奖学金`、校级`优秀三好学生`
- *2023.08* 获得 全国大学生集成电路创新创业大赛华中赛区`三等奖`
- *2023.05* 获得 安徽省机器人大赛单片机与嵌入式赛道`一等奖`
- *2022.12* 获得 合肥工业大学校级`一等奖学金`、校级`三好学生`
- *2021.12* 获得 合肥工业大学校级`二等奖学金`、校级`三好学生`


<!-- - *2015.11* 获得 第十四届“挑战杯”全国大学生课外学术科技作品竞赛 `一等奖`  
- *2015.06* 获得 第十三届“挑战杯”四川大学生课外学术科技作品竞赛 `一等奖` [[新闻]](https://www.sc.gov.cn/10462/10778/10876/2015/7/1/10341562.shtml)  
- *2014.12* 获得 第四届全国大学生工程训练综合能力竞赛（四川赛区） `一等奖`   -->





<span class='anchor' id='-xshy'></span>

# 🏛️ 学术会议
- 暂无

<!-- - *2021.10*, 全国电磁无损检测技术研讨会 暨 中国机械工程学会无损检测分会电磁专业技术大会第十一届第四次全体会议, 陕西西安, 受邀报告
- *2019.09*, 第十九届国际应用电磁学与力学会议 (ISEM 2019), 江苏南京, 海报
- *2017.10*, 第六届中国国际管道会议 (CIPC 2017), 河北廊坊 -->





<span class='anchor' id='-gzsx'></span>

# 💻 工作实习
- 暂无

<!-- - *2018.05 - 2020.02*, 重庆长江轴承股份有限公司, 重庆
- *2020.11.25 - 2020.12.02*, 湖北新冶钢有限公司, 湖北黄石
- *2017.6 - 2021.1*, 制造装备数字化国家工程研究中心, 湖北武汉 -->
