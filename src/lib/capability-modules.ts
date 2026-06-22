import { Boxes, Layers, Monitor, Cpu, Sparkles, type LucideIcon } from "lucide-react";
import { COMPONENTS, PLATFORMS, EXPERIENCE, HARDWARE, AI_TWIN, type Capability } from "@/lib/capability-data";

export type ModuleSlug = "components" | "platforms" | "experience" | "hardware" | "ai-twin";

export interface ModuleConfig {
  slug: ModuleSlug;
  label: string;        // 模块名
  title: string;
  highlight: string;
  description: string;
  icon: LucideIcon;
  accent: string;       // gradient classes
  items: Capability[];
}

export const MODULES: Record<ModuleSlug, ModuleConfig> = {
  components: {
    slug: "components", label: "通用能力组件",
    title: "通用", highlight: "能力组件",
    description: "面向通用业务场景的可复用软件组件，支持快速集成与二次开发。",
    icon: Boxes, accent: "from-sky-500 to-blue-600", items: COMPONENTS,
  },
  platforms: {
    slug: "platforms", label: "通用能力平台",
    title: "通用", highlight: "能力平台",
    description: "面向行业应用的中台型能力平台，开箱即用、可灵活组合。",
    icon: Layers, accent: "from-blue-500 to-indigo-600", items: PLATFORMS,
  },
  experience: {
    slug: "experience", label: "在线体验系统",
    title: "在线", highlight: "体验系统",
    description: "可直接体验的数字孪生在线交互系统，覆盖园区、城市、文旅、制造等。",
    icon: Monitor, accent: "from-cyan-500 to-sky-600", items: EXPERIENCE,
  },
  hardware: {
    slug: "hardware", label: "特定领域软硬件",
    title: "特定领域", highlight: "软硬件",
    description: "面向特定行业场景的专业软硬件一体化解决方案。",
    icon: Cpu, accent: "from-indigo-500 to-blue-600", items: HARDWARE,
  },
  "ai-twin": {
    slug: "ai-twin", label: "AI+数字孪生能力库",
    title: "AI+", highlight: "数字孪生能力库",
    description: "AI 大模型与数字孪生融合的预训练模型与场景能力库。",
    icon: Sparkles, accent: "from-violet-500 to-sky-600", items: AI_TWIN,
  },
};

// 模块特定的“详情段落”内容（贴合每个模块的特点）
export const MODULE_DETAIL_SECTIONS: Record<ModuleSlug, {
  features: { title: string; desc: string }[];
  specs: { label: string; value: string }[];
  scenarios: string[];
  api?: { method: string; path: string; desc: string }[];
}> = {
  components: {
    features: [
      { title: "模块化封装", desc: "标准接口与依赖注入，支持业务系统秒级集成。" },
      { title: "高并发就绪", desc: "经过千万级 QPS 生产环境验证，自带熔断限流。" },
      { title: "完整可观测", desc: "内置 Metrics / Tracing / Logging 三件套。" },
      { title: "插件化扩展", desc: "SPI 机制，二次开发零侵入。" },
    ],
    specs: [
      { label: "运行环境", value: "JDK 17+ / Go 1.21+ / Node 20+" },
      { label: "部署形态", value: "Jar / Docker / Helm Chart" },
      { label: "依赖中间件", value: "Redis 6+ / MySQL 8+ / Kafka 3+" },
      { label: "SLA", value: "99.95%" },
    ],
    scenarios: ["微服务架构", "中台体系建设", "传统系统改造", "高并发互联网业务"],
    api: [
      { method: "GET", path: "/api/v1/health", desc: "健康检查" },
      { method: "POST", path: "/api/v1/invoke", desc: "能力调用入口" },
      { method: "GET", path: "/api/v1/metrics", desc: "运行指标查询" },
    ],
  },
  platforms: {
    features: [
      { title: "全栈中台能力", desc: "从数据接入到业务编排的一站式能力支撑。" },
      { title: "多租户隔离", desc: "支持多组织、多环境的资源与权限隔离。" },
      { title: "可视化运营", desc: "图形化配置中心，运营人员零代码使用。" },
      { title: "开放生态", desc: "标准 OpenAPI / WebHook，对接主流系统。" },
    ],
    specs: [
      { label: "部署架构", value: "K8s 集群（建议 3 Master + 5 Worker）" },
      { label: "最小配置", value: "32C / 128G / 2TB SSD" },
      { label: "服务化能力", value: "200+ 内置服务接口" },
      { label: "高可用", value: "同城双活 / 异地灾备" },
    ],
    scenarios: ["集团数字化中台", "城市运营平台", "行业 PaaS", "SaaS 多租户服务"],
    api: [
      { method: "GET", path: "/openapi/tenants", desc: "租户列表" },
      { method: "POST", path: "/openapi/services/deploy", desc: "服务部署" },
      { method: "GET", path: "/openapi/audit/logs", desc: "运营审计日志" },
    ],
  },
  experience: {
    features: [
      { title: "Web 即开即用", desc: "无需下载客户端，Chrome 最新版即可流畅运行。" },
      { title: "实时交互渲染", desc: "WebGL / WebGPU 加速，60fps 大场景渲染。" },
      { title: "多端同步", desc: "PC、移动、大屏多端协同体验。" },
      { title: "可嵌入门户", desc: "提供 iframe / SDK 两种嵌入方式。" },
    ],
    specs: [
      { label: "浏览器要求", value: "Chrome 120+ / Edge 120+ / Safari 17+" },
      { label: "推荐带宽", value: "≥ 20 Mbps" },
      { label: "渲染管线", value: "WebGL 2.0 / WebGPU 可选" },
      { label: "首屏加载", value: "< 3s（CDN 加速）" },
    ],
    scenarios: ["产品演示", "在线展厅", "客户体验中心", "招商引资展示"],
  },
  hardware: {
    features: [
      { title: "工业级品质", desc: "支持 -40℃ ~ 70℃ 宽温运行，IP65 防护。" },
      { title: "软硬一体", desc: "出厂预装行业算法，到货即用。" },
      { title: "边云协同", desc: "支持本地推理 + 云端管理双模式。" },
      { title: "国产化适配", desc: "兼容鲲鹏 / 飞腾 / 龙芯主流国产芯片。" },
    ],
    specs: [
      { label: "工作温度", value: "-40℃ ~ 70℃" },
      { label: "防护等级", value: "IP65" },
      { label: "供电", value: "DC 12 ~ 48V" },
      { label: "认证", value: "CCC / CE / FCC / 国密合规" },
    ],
    scenarios: ["智能工厂", "智慧矿山", "智慧交通路侧", "智慧能源场站"],
  },
  "ai-twin": {
    features: [
      { title: "孪生体专属预训练", desc: "在城市、工业、交通三类语料上完成行业预训练。" },
      { title: "多模态融合", desc: "支持图像、点云、时序、文本的联合理解。" },
      { title: "可微调可蒸馏", desc: "提供 LoRA / QLoRA 微调脚本与蒸馏方案。" },
      { title: "推理高效", desc: "支持 TensorRT / ONNX / vLLM 加速。" },
    ],
    specs: [
      { label: "模型参数", value: "7B / 14B / 72B 三档" },
      { label: "上下文长度", value: "32K tokens" },
      { label: "推理显存", value: "≥ 24GB（INT8 量化）" },
      { label: "训练框架", value: "PyTorch 2.4 / DeepSpeed" },
    ],
    scenarios: ["城市孪生", "工业巡检", "交通仿真", "数字人交互"],
    api: [
      { method: "POST", path: "/v1/twin/infer", desc: "孪生体推理调用" },
      { method: "POST", path: "/v1/twin/finetune", desc: "提交微调任务" },
      { method: "GET", path: "/v1/twin/models", desc: "可用模型列表" },
    ],
  },
};
