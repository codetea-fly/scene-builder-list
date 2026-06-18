export interface Capability {
  id: string;
  name: string;
  vendor: string;
  description: string;
  tags: string[];
  version: string;
  downloads: number;
}

function mk(prefix: string, items: Omit<Capability, "id">[]): Capability[] {
  return items.map((it, i) => ({ ...it, id: `${prefix}-${String(i + 1).padStart(3, "0")}` }));
}

export const COMPONENTS = mk("CMP", [
  { name: "高并发消息总线", vendor: "中科云栈", description: "支持百万级并发的分布式消息中间件，提供主题、队列、广播三种模式。", tags: ["中间件", "高并发", "Java"], version: "v3.2.1", downloads: 12480 },
  { name: "统一身份认证组件", vendor: "蓝鲸科技", description: "支持 OAuth2.0、SAML、LDAP 等主流协议的单点登录与权限管理。", tags: ["安全", "SSO", "认证"], version: "v2.5.0", downloads: 8930 },
  { name: "可视化报表引擎", vendor: "数智图灵", description: "拖拽式报表配置，内置 80+ 图表类型，支持千万级数据渲染。", tags: ["可视化", "BI", "前端"], version: "v4.1.3", downloads: 15670 },
  { name: "分布式任务调度", vendor: "云鲸智能", description: "Cron、依赖、DAG 三种调度模式，支持横向扩展。", tags: ["调度", "分布式", "Go"], version: "v1.8.2", downloads: 6420 },
  { name: "全文检索组件", vendor: "Elastic 中国", description: "基于 Lucene 的中文分词与语义检索能力封装。", tags: ["搜索", "NLP", "Java"], version: "v7.17.0", downloads: 9870 },
  { name: "API 网关组件", vendor: "网易杭研", description: "统一鉴权、限流、熔断、协议转换的云原生网关。", tags: ["网关", "云原生", "微服务"], version: "v2.3.0", downloads: 11230 },
  { name: "工作流引擎", vendor: "泛微网络", description: "BPMN 2.0 标准的可视化流程设计与执行引擎。", tags: ["流程", "BPMN", "OA"], version: "v5.0.4", downloads: 7780 },
  { name: "实时数据同步", vendor: "PingCAP", description: "异构数据源之间的毫秒级 CDC 数据同步。", tags: ["数据", "CDC", "实时"], version: "v6.5.1", downloads: 5340 },
  { name: "日志采集分析", vendor: "观测云", description: "海量日志采集、聚合、检索与告警一体化方案。", tags: ["日志", "可观测", "运维"], version: "v3.0.0", downloads: 8120 },
]);

export const PLATFORMS = mk("PLT", [
  { name: "低代码开发平台", vendor: "宜搭团队", description: "面向企业应用的可视化拖拽搭建平台，支持表单、流程、报表三位一体。", tags: ["低代码", "企业应用"], version: "v8.2.0", downloads: 4320 },
  { name: "物联网设备管理平台", vendor: "阿里云 IoT", description: "百万级设备接入、固件升级、远程运维一体化平台。", tags: ["IoT", "设备管理"], version: "v4.5.0", downloads: 6780 },
  { name: "微服务治理平台", vendor: "腾讯 TSF", description: "服务注册发现、配置中心、链路追踪、流量治理。", tags: ["微服务", "云原生"], version: "v3.8.1", downloads: 5210 },
  { name: "数据中台基础平台", vendor: "数澜科技", description: "支持数据采集、治理、资产、服务的全链路数据中台。", tags: ["数据中台", "DataOps"], version: "v6.0.0", downloads: 3890 },
  { name: "数字孪生底座平台", vendor: "51World", description: "城市级数字孪生底座，支持 BIM/CIM/GIS 融合渲染。", tags: ["数字孪生", "三维"], version: "v5.2.0", downloads: 4670 },
  { name: "工业互联网平台", vendor: "树根互联", description: "面向离散与流程制造的工业互联网根云平台。", tags: ["工业互联网", "PaaS"], version: "v7.1.0", downloads: 3120 },
  { name: "AI 模型训练平台", vendor: "华为云 ModelArts", description: "覆盖数据标注、训练、推理、部署的全流程 AI 开发平台。", tags: ["AI", "MLOps"], version: "v9.0.0", downloads: 8240 },
  { name: "音视频通信平台", vendor: "声网 Agora", description: "全球部署的实时音视频与互动直播 PaaS。", tags: ["音视频", "RTC"], version: "v4.8.0", downloads: 6540 },
]);

export const EXPERIENCE = mk("EXP", [
  { name: "智慧园区在线沙盘", vendor: "数字园区联盟", description: "支持 Web 端实时渲染的园区级数字孪生体验系统。", tags: ["智慧园区", "WebGL"], version: "v2.1.0", downloads: 3210 },
  { name: "城市治理大屏体验", vendor: "城市大脑研究院", description: "城市级运行态势可视化大屏，支持指挥协同。", tags: ["智慧城市", "大屏"], version: "v3.5.0", downloads: 4870 },
  { name: "智能制造工厂巡检", vendor: "工业元宇宙实验室", description: "面向制造业的 VR 巡检与故障模拟体验。", tags: ["VR", "智能制造"], version: "v1.6.0", downloads: 2340 },
  { name: "文旅数字人导览", vendor: "文旅元宇宙", description: "AI 数字人 + 三维场景，支持多语言导览。", tags: ["数字人", "文旅"], version: "v2.0.0", downloads: 3780 },
  { name: "应急演练仿真系统", vendor: "应急科技", description: "支持多人协同的城市应急场景在线演练。", tags: ["应急", "仿真"], version: "v1.4.0", downloads: 1890 },
  { name: "AR 远程协作体验", vendor: "亮风台", description: "面向工业现场的 AR 远程指导与协同标注。", tags: ["AR", "工业"], version: "v3.0.0", downloads: 2560 },
]);

export const HARDWARE = mk("HW", [
  { name: "边缘 AI 推理盒", vendor: "英伟达 Jetson", description: "支持 Orin/NX 系列芯片的边缘 AI 推理硬件方案。", tags: ["边缘计算", "AI 芯片"], version: "Orin NX 16G", downloads: 1240 },
  { name: "工业级 5G CPE", vendor: "中兴通讯", description: "支持 5G SA/NSA 与 TSN 时间敏感网络的工业网关。", tags: ["5G", "工业网关"], version: "v2.3.0", downloads: 980 },
  { name: "高精度定位基站", vendor: "千寻位置", description: "厘米级 RTK 定位服务硬件与软件一体方案。", tags: ["定位", "RTK"], version: "v4.1.0", downloads: 760 },
  { name: "工业相机模组", vendor: "海康机器人", description: "面向高速产线的 1200 万像素工业视觉相机。", tags: ["机器视觉", "工业相机"], version: "MV-CS200", downloads: 1450 },
  { name: "国产化服务器", vendor: "鲲鹏计算", description: "基于 ARM 架构的国产化通用计算服务器。", tags: ["国产化", "服务器"], version: "TaiShan 200", downloads: 2180 },
  { name: "激光雷达传感器", vendor: "禾赛科技", description: "面向自动驾驶与机器人的 128 线机械式激光雷达。", tags: ["传感器", "激光雷达"], version: "Pandar128", downloads: 890 },
]);

export const AI_TWIN = mk("AIT", [
  { name: "城市建筑识别大模型", vendor: "商汤科技", description: "基于遥感影像的建筑物轮廓与高度识别预训练模型。", tags: ["遥感", "CV", "城市"], version: "v3.2.0", downloads: 5670 },
  { name: "三维点云语义分割", vendor: "旷视 Megvii", description: "支持城市、室内、工业三类场景的点云语义分割。", tags: ["点云", "3D", "CV"], version: "v2.5.0", downloads: 4320 },
  { name: "孪生体行为仿真引擎", vendor: "蔚来 NIO 仿真", description: "面向交通、人群的多智能体行为仿真大模型。", tags: ["仿真", "Agent"], version: "v1.8.0", downloads: 2780 },
  { name: "数字人驱动模型", vendor: "腾讯 AI Lab", description: "音频驱动的高保真数字人面部与口型生成。", tags: ["数字人", "AIGC"], version: "v4.0.0", downloads: 6120 },
  { name: "三维场景生成模型", vendor: "智谱 AI", description: "文本到三维场景的端到端生成预训练模型。", tags: ["3DGS", "AIGC"], version: "v2.1.0", downloads: 3890 },
  { name: "时空预测大模型", vendor: "中科院计算所", description: "城市级交通、人流、能耗的时空联合预测。", tags: ["时空", "预测"], version: "v1.3.0", downloads: 2450 },
  { name: "工业缺陷检测模型", vendor: "百度 PaddleX", description: "面向制造业的小样本缺陷检测预训练模型。", tags: ["缺陷检测", "工业"], version: "v3.5.0", downloads: 4760 },
  { name: "多模态理解大模型", vendor: "通义千问", description: "图文音视频多模态理解与推理大模型。", tags: ["多模态", "LLM"], version: "Qwen-VL", downloads: 8970 },
]);
