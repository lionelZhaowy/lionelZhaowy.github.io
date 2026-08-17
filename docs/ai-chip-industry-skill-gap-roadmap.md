# AI芯片行业技能差距与学习路线

> 更新日期：2026-08-17  
> 目标方向：可编程AI DSA、AI编译器、低精度推理与软硬件协同  
> 预计毕业：2029年  
> 使用原则：区分“已经证明”“具备基础”“尚未掌握”，不以工具名替代项目证据。

## 1. 当前能力基线

### 已有较强证据

- **AI编译与部署**：ONNX计算图解析、算子融合、静态内存规划、张量排布转换、指令映射、汇编模板实例化与代码生成。
- **硬件感知模型优化**：CNN/Transformer模型适配、INT8 QAT/PTQ、定点数值建模、硬件截断与量化误差分析。
- **定制处理器软硬件协同**：RISC-V自定义指令、NICE紧耦合协处理器、SIMD与脉动阵列算子映射、C/内联汇编调度。
- **验证闭环**：MATLAB参考模型、VCS结果比对、FPGA原型、ASIC测试板模型部署与端侧实测。
- **FPGA加速器实践**：PE阵列、Line Buffer、AXI-Stream/DMA集成、PYNQ和A7 FPGA板级验证。

### 已有基础但证据仍不完整

- **RTL微架构**：能描述数据流、缓冲、流水和接口，但缺少系统化的模块责任、接口时序、corner case、综合结果和验证覆盖率。
- **AI芯片架构评估**：能够分析存储、通信和计算瓶颈，但缺少统一的性能模型、Roofline分析、设计空间搜索和PPA约束下的方案比较。
- **SoC集成**：做过AXI-Stream、DMA和CPU—协处理器集成，但对AXI4 Memory-Mapped、AHB/APB、cache一致性、MMU、中断、启动和跨时钟域的证据有限。
- **低精度计算**：INT8推理经验较强，但FP8/BF16/FP4格式、舍入模式、异常值、训练反向传播和低精度浮点单元尚未形成项目闭环。

### 当前缺失或尚未证明

- 专业数字验证方法：验证计划、约束随机、scoreboard、SVA、功能/代码覆盖率、回归、formal、CDC/RDC。
- ASIC前端与PPA闭环：lint、综合、SDC、STA、LEC、功耗分析、DFT基础，以及从RTL到可比较PPA结果的方法。
- LLM硬件建模：prefill/decode、KV-cache、Attention/MoE、HBM/DDR/NoC、片间通信和多卡/多芯调度模型。
- SystemC/TLM与HLS：事务级虚拟原型、周期近似模型、C/RTL协同仿真和HLS设计空间探索。
- 通用CPU微架构：分支预测、cache/TLB、流水线hazard、乱序执行、cache一致性、QEMU/gem5和SPEC类工作负载。
- ASIC物理实现：floorplan、布局布线、CTS、IR drop、sign-off等。若不投物理实现岗位，可将其作为了解项而非主攻项。

这里的“尚未证明”仅指当前公开材料不足以支持招聘判断，不等同于完全没有接触。项目主页无需公开完整状态机、全部CDC结构或所有验证用例；真正需要补齐的是知识和工程能力，展示时只选能够代表设计深度的证据。

## 2. 相比目标岗位最需要补齐的技能

| 优先级 | 能力 | 学习完成标准 | 与目标方向的关系 |
| --- | --- | --- | --- |
| P0 | RTL微架构与接口 | 能独立完成模块规格、可综合RTL、backpressure/异常处理、bit-exact验证和FPGA实现 | DSA/NPU核心能力 |
| P0 | 数字验证基础 | 验证计划、directed+random测试、scoreboard、SVA、覆盖率、回归和至少一个formal案例 | 证明RTL可靠性 |
| P0 | 架构量化评估 | 建立cycles、带宽、片上容量、利用率、能耗代理和Roofline模型；比较至少3种设计方案 | 从“实现者”进阶为“架构设计者” |
| P0 | 编译器中间表示与调度 | 明确IR层次、合法性约束、liveness、内存分配、tiling、layout propagation和cost model | 强化现有优势 |
| P1 | ASIC前端/PPA | 完成lint、综合、STA和功耗估算；报告Fmax、WNS、面积/资源和功耗口径 | 让架构结果可落地 |
| P1 | SoC接口与系统集成 | 掌握AXI4/AXI-Stream/APB、DMA、interrupt、reset/clock、CDC和软件驱动边界 | 支撑完整加速器系统 |
| P1 | 低精度算术 | 实现INT8/INT4或FP8 MAC/requant，明确rounding、saturation、overflow和误差预算 | 低精度架构岗位 |
| P2 | LLM工作负载模型 | 能分别建模prefill和decode、KV-cache容量/带宽、Attention IO与MoE通信 | 仅在转向LLM芯片时必需 |
| P2 | SystemC/HLS | 用SystemC/TLM或HLS完成一个可与RTL/Python模型对照的原型 | 对应特定建模岗位 |
| P2 | CPU架构 | 用gem5研究pipeline/cache/branch，并完成一个可复现实验 | 仅在转向CPU岗位时必需 |

### 截图岗位需求的针对性拆解

| 岗位方向 | 当前可迁移基础 | 优先补强 | 推荐练习或项目 |
| --- | --- | --- | --- |
| NPU设计 | 脉动阵列、SIMD、INT8、VCS/FPGA | 模块级RTL、PPA、lint/CDC/STA、算子访存与利用率分析 | E203可编程DSA升级；给出RTL、验证和PPA闭环 |
| AI芯片架构 | 数据流、编译映射、存储/通信瓶颈分析 | workload characterization、设计空间探索、带宽/容量/能耗模型 | 用Timeloop/Accelergy或SCALE-Sim比较阵列、buffer和dataflow |
| AI芯片微架构 | NICE、自定义指令、buffer、Tile调度 | backpressure、异常、队列解耦、双缓冲、仲裁和SoC接口 | 在现有E203系统中实现命令FIFO与load/compute/store重叠 |
| AI编译器 | ONNX解析、融合、地址分配、汇编生成 | IR、pass约束、layout、liveness、tiling、cost model和自动调优 | 为现有编译器建立多级IR和硬件代价模型 |
| 低精度AI芯片 | INT8 QAT/PTQ、定点SoftMax/LayerNorm | FP8/BF16/FP4、scale管理、舍入/饱和、异常值、反向传播数据流 | 实现一个FP8或INT4 MAC/requant单元并做误差-PPA比较 |
| 逻辑设计与验证 | VCS差分验证、FPGA板测 | verification plan、SVA、coverage、random、regression和formal | 为E203命令/数据通路建立独立验证环境和bug闭环 |
| SoC设计 | AXI-Stream/DMA、CPU—协处理器集成 | AXI4/APB、interrupt、reset/clock、CDC、DDR/PCIe/RDMA概念和交付流程 | 将加速器封装为AXI4 IP，完成寄存器、DMA、驱动和系统测试 |
| LLM SystemC/HLS | Transformer量化与算子部署 | prefill/decode、KV-cache、Attention/MoE、SystemC/TLM和HLS | 构建LLM推理架构模型，再选MatMul/Attention子核做HLS |
| CPU/AI芯片架构 | RISC-V自定义指令与紧耦合加速 | pipeline、cache/TLB、branch、QEMU/gem5、benchmark方法 | 仅在确定转向CPU岗位后开展gem5实验 |
| 物理实现 | FPGA实现和ASIC平台使用经验 | 综合、STA、P&R、功耗、LEC和sign-off | 作为了解项完成一次OpenROAD流程；不作为当前主线 |

## 3. 学习路线（按每周8—10小时设计）

本路线不要求重新搭建或复现数年前的项目。旧项目只需依据仍能确认的原始数据整理口径；新的能力通过当前和后续项目形成证据。学习细节主要用于实现与面试准备，不要求全部公开到个人主页。

### 阶段A：RTL与数字验证补强（8—10周）

- SystemVerilog：接口、parameter、packed/unpacked数据、FSM、pipeline、FIFO、ready/valid、reset与时钟使能。
- 验证：从directed testbench开始，加入reference model、scoreboard、随机stall、随机尺寸和边界tile。
- SVA：验证握手稳定性、FIFO上下溢、请求最终应答、状态机合法转移。
- 覆盖率：为指令类型、tile边界、stall组合、饱和/溢出情况定义功能覆盖点。
- formal：用一个异步FIFO或同步ready/valid FIFO完成安全性和活性属性验证。
- 内部输出：可综合IP、验证计划、断言、覆盖率报告和回归脚本。主页只需展示模块架构、一项代表性验证结果和一个实际bug案例，不必公开全部状态或CDC细节。

### 阶段B：可编程DSA项目（12—16周）

建议以现有E203项目为基础迭代，避免另起炉灶：

1. 将32×32阵列拆为`decoder/control`、`NICE wrapper`、`command FIFO`、`DMA/load-store`、`buffer`、`PE array`、`requant`七类模块。
2. 明确定义long-latency指令的请求、应答、backpressure、flush/kill、异常和非法参数行为。
3. 支持边界tile、非32倍数尺寸、双缓冲和load/compute/store重叠。
4. 用Python或MATLAB建立bit-exact参考模型，并在VCS/Verilator中逐层、逐tile和端到端比较。
5. 在FPGA上报告频率、LUT/FF/DSP/BRAM、WNS、周期、阵列利用率和端到端延迟。
6. 用统一工作量比较：INT8标量E203、原阻塞NICE、解耦FIFO版本。桌面CPU/GPU结果只作系统背景，不作为E203微架构优化baseline。

### 阶段C：AI编译器深化（12—16周，可与阶段B并行）

- 定义至少三级IR：图级IR、算子/张量级IR、目标指令级IR。
- 为每个pass定义输入不变量、输出不变量和合法性检查。
- 实现tensor lifetime分析和可解释的静态内存分配算法，并输出地址时空图。
- 实现layout propagation、tiling和边界tile处理。
- 为PEG规模、tile形状、双缓冲与指令排程建立cost model；先用解析模型，再用板测校准。
- 增加pass级单元测试、随机小图测试和端到端差分验证。
- 输出：编译时间、生成代码量、相对手写汇编开发成本、正确率和目标端性能。

### 阶段D：ASIC前端与PPA闭环（8—12周）

- 用开源流程完成一次RTL到GDS或至少RTL到布局后STA，理解综合、SDC、时序路径、拥塞和功耗报告。
- 对阶段B的阵列做3组设计空间实验，例如8×8、16×16、32×32，比较吞吐、面积、频率、存储和带宽需求。
- 将“峰值TOPS”与“实测利用率”分开，报告有效TOPS、每帧能耗或每MAC能耗代理。
- 若能使用课题组商业EDA，再迁移到DC/PrimeTime/Verdi等环境；学习目标是理解流程和报告，不是罗列工具名。

### 阶段E：岗位定向分支（按求职方向任选其一，12—16周）

#### E1：LLM芯片与SystemC/HLS

- 建立Transformer层级工作量模型，分别计算prefill/decode的FLOPs、参数流量、KV-cache容量和带宽。
- 实现Attention tile与KV-cache访问的Python参考模型，再用SystemC/TLM实现事务级延迟和带宽模型。
- 选择一个MatMul或Attention子核进行Vitis HLS，实现C仿真、综合、C/RTL协同仿真和PPA比较。
- 最终项目：可调PE数、SRAM容量、HBM带宽、NoC带宽的LLM推理架构探索器。

#### E2：CPU微架构

- 使用gem5完成pipeline、分支预测、L1/L2容量与相联度实验。
- 添加或模拟一个自定义指令/加速器接口，明确ISA语义、时序、cache一致性和异常处理。
- 最终项目：E203/NICE方案与gem5中松耦合/紧耦合加速器模型的定量比较。

## 4. 推荐学习材料

### RTL、验证与协议

- [Accellera UVM标准与参考实现](https://www.accellera.org/downloads/standards/uvm)：学习verification plan、agent、sequence、driver、monitor、scoreboard与覆盖率驱动验证。
- [Verilator官方文档](https://verilator.org/guide/latest/)：适合构建可复现的开源RTL仿真和CI回归。
- [SymbiYosys官方文档](https://yosyshq.readthedocs.io/projects/sby/en/stable/)：从FIFO的assert/assume/cover开始学习formal。
- [Arm AMBA AXI/ACE规范](https://developer.arm.com/documentation/ihi0022/latest/)：重点阅读五通道、ordering、burst、outstanding和response语义。
- [RISC-V ISA规范](https://riscv.org/technical/specifications/)：用于规范化自定义指令、异常和内存语义。
- [NVDLA Hardware Manual](https://nvdla.org/hw/contents.html)：结合真实开源NPU学习模块划分、寄存器、buffer、DMA、精度保持、集成和验证组织方式。

### 架构、PPA与系统建模

- [Roofline原始技术报告](https://www2.eecs.berkeley.edu/Pubs/TechRpts/2008/EECS-2008-134.html)：建立算术强度、峰值计算和带宽上限之间的联系。
- [gem5官方学习材料](https://www.gem5.org/documentation/learning_gem5/introduction/)：离散事件、CPU模型、cache和内存系统建模。
- [OpenROAD官方文档](https://openroad.readthedocs.io/en/latest/)：理解RTL到GDSII、时序和PPA闭环。
- [Accellera SystemC](https://www.accellera.org/downloads/standards/systemc)：学习SystemC 3.x、TLM和事务级建模。
- [AMD Vitis HLS教程](https://docs.amd.com/r/en-US/Vitis-Tutorials-Vitis-HLS/Vitis-HLS-Tutorials)：覆盖pipeline、unroll、array partition、dataflow和C/RTL协同仿真。

### AI加速器架构与设计空间探索

- [Eyeriss项目与论文](https://eyeriss.mit.edu/)：重点理解数据搬运能耗、Row-Stationary数据流和存储层级复用。
- [NVDLA硬件架构规范](https://nvdla.org/hw/v1/hwarch.html)：分析CMAC/CACC/CBUF、ping-pong寄存器、DMA和可配置参数如何共同决定性能与面积。
- [Timeloop/Accelergy](https://timeloop.csail.mit.edu/)：学习张量映射、空间/时间复用、能耗模型和架构参数搜索。
- [SCALE-Sim](https://scalesim-project.github.io/)：从脉动阵列周期、SRAM/DRAM带宽、stall和多核建模入手，适合与现有阵列项目结合。
- 推荐顺序：先手算一个卷积/GEMM的MAC数、复用量与最小周期，再用SCALE-Sim复核，最后用Timeloop/Accelergy搜索映射并解释差异。

### AI编译器

- [ONNX IR规范](https://github.com/onnx/onnx/blob/main/docs/IR.md)：补齐图、类型、shape、opset和模型合法性的规范化理解。
- [MLIR官方教程](https://mlir.llvm.org/docs/Tutorials/)：从Toy教程学习dialect、pass、rewrite与lowering。
- [Apache TVM文档](https://tvm.apache.org/docs/)：重点学习Relax、TensorIR、operator fusion、schedule和BYOC。
- [TVM TensorIR](https://tvm.apache.org/docs/deep_dive/tensor_ir/index.html)：理解loop tiling、locality、reduction rewrite和tensor intrinsic。
- 建议练习：将现有编译器的一种算子表示为自定义IR，分别实现shape验证、layout变换、tiling和目标指令lowering，不必立刻重写整个工具链。

### 低精度计算

- [FP8 Formats for Deep Learning](https://arxiv.org/abs/2209.05433)：理解E4M3/E5M2的动态范围、特殊值和训练/推理适用场景。
- [NVDLA Precision Preservation](https://nvdla.org/hw/v1/ias/precision.html)：学习整数乘累加、截断、rounding、saturation与多级精度转换在真实NPU中的组织方式。
- 练习顺序：先完成INT8/INT4 requant的bit-exact模型和RTL，再扩展FP8乘加；每一步都比较误差、关键路径和资源，而不是只看最终模型精度。

### LLM硬件与系统（可选）

- [FlashAttention论文](https://arxiv.org/abs/2205.14135)：学习IO-aware tiling和HBM—SRAM数据搬运分析。
- [PagedAttention论文](https://arxiv.org/abs/2309.06180)：学习KV-cache分页、碎片和批处理吞吐。
- [DeepSeek-V3技术报告](https://arxiv.org/abs/2412.19437)：关注MLA、MoE、FP8训练和通信，而非只阅读模型精度结果。

## 5. 推荐项目组合

### 主项目：可验证、可综合的可编程AI DSA

这是最符合NPU设计、AI芯片架构/微架构、SoC和AI编译器岗位的项目。建议直接迭代E203/NICE系统，而不是重做一个与既有经历割裂的教学型加速器。

#### 架构目标

- 从阻塞式单命令执行升级为命令FIFO解耦，尝试load/compute/store重叠。
- 保留可编程ISA与Tile调度，增加非整齐尺寸、边界tile和双缓冲。
- 为阵列规模、buffer容量、总线宽度和tile形状建立cycles/带宽/容量模型。

#### 实现与验证目标

- ISA/寄存器/接口规范；
- decoder/control、NICE wrapper、command FIFO、buffer、PE array、requant等RTL模块；
- Python/MATLAB bit-exact模型；
- directed、random、SVA、coverage、formal与回归结果；
- FPGA资源、时序、功耗估算、周期和利用率；
- 编译器从模型到指令的自动生成；
- 一份写清baseline和计时边界的技术报告。

#### 与岗位的对应证据

- NPU/RTL：可综合模块、握手、backpressure、corner case和FPGA结果。
- 架构：阵列/buffer/带宽的设计空间与取舍。
- 编译器：模型、Tile、地址和指令的自动映射。
- SoC：CPU—协处理器接口、寄存器、DMA/访存和软件调用链。

### 配套项目一：独立的验证案例

- 从主项目选取command FIFO、requant或AXI接口，不需要验证整个SoC。
- 建立verification plan、reference model、scoreboard、随机stall、SVA和功能覆盖率。
- 记录至少一个真实bug：现象、触发条件、波形、根因、修复和回归结果。
- 主页公开验证架构和代表性结果；完整用例、覆盖点与波形留作面试材料。

### 配套项目二：编译器IR与硬件cost model

- 从现有ONNX编译器抽取图级、算子/张量级和目标指令级IR。
- 为融合、layout、liveness、地址复用、tiling和指令选择建立pass与合法性检查。
- cost model至少包含计算周期、访存周期、buffer容量和PE利用率，并用FPGA计数器校准一个模型。
- 对比人工规则、解析cost model和搜索结果，说明何时编译时间值得换取目标端性能。

### 配套项目三：低精度算术与非线性核

- 实现INT8/INT4 requant或FP8 MAC，比较不同rounding、saturation和累加位宽。
- 选择SoftMax或LayerNorm，建立浮点参考、定点近似、误差上界和极端输入测试。
- 输出误差—面积—时序—功耗的Pareto曲线，而不只报告模型最终精度。

### 可选项目：LLM架构探索器

- 输入：模型维度、batch、prompt/output长度、精度、PE数、SRAM/HBM/NoC带宽。
- 输出：prefill/decode延迟、KV-cache容量、计算利用率、带宽瓶颈和片间通信量。
- 验证：选择一个公开GPU/加速器测量点校准趋势，不要求一开始就实现完整LLM RTL。
- 若投SystemC/HLS岗位，再将解析模型迁移为SystemC/TLM，并选取MatMul或Attention tile完成HLS C仿真、综合和C/RTL协同仿真；否则Python模型即可。

### 不建议当前单独投入的项目

- 再做一个仅支持单网络、无编程模型的教学型CNN专用加速器：与目标可编程DSA方向重合收益有限。
- 为了主页关键词单独做UVM、SystemC或OpenROAD演示：工具应服务于主项目问题，而不是成为孤立标签。
- 同时展开CPU、LLM、物理实现三个方向：这些岗位知识栈差异较大，应根据后续求职方向择一深入。

## 6. 主页与求职证据的后续更新规则

- 在教育经历中写：`集成电路科学与工程，硕博连读 (预计2029年毕业) · 北京`。目前不能实习时不写可到岗承诺；真正开始求职后，再增加实习起止、每周天数和地点。
- 将现有“个人贡献”移动到“技术方案概览”之后、“详细技术实现”之前，使阅读者先明确个人工作，再进入技术细节；不强制增加企业化的职责/交付模板。
- 主页项目页展示到以下粒度即可：架构或流程、关键设计思想、个人贡献、验证层级和一项代表性结果。不需要公开每个CDC同步器、完整状态转移图、全部寄存器或所有测试用例。
- 单独准备面试材料：接口时序、关键状态机、CDC/reset策略、一个实际bug、性能瓶颈和设计取舍。只有面试深挖时再展开。
- 完整RTL、CDC报告、回归日志和内部架构文档保留在项目仓库或课题组环境中，不因个人主页展示而破坏保密或可读性。
- 平台规格与个人贡献分开：工艺、主频、TOPS和SERDES若来自团队芯片，应标为“目标平台”；本人工作放在另一栏。
- 投稿中的结果可继续隐藏，但页面应写明“实验结果随论文录用后公开”，不要用无数据的定性结论替代。
- 只有完成实际项目后，才把UVM、SystemC、HLS、OpenROAD或gem5加入主页技能表。

## 7. 阶段性验收清单

每完成一个阶段，用以下问题判断是否真正掌握：

- 我能否给出规格、实现、验证、结果四类独立证据？
- 我能否解释baseline、公平比较条件和计时边界？
- 我能否指出一个失败方案、一个实际bug及其根因？
- 我能否区分团队平台属性与自己的设计贡献？
- 他人能否根据commit、配置和脚本复现实验？
- 面对未知工作负载，我能否先建立计算、存储、带宽和通信模型，再决定硬件结构？
