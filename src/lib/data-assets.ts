export interface ModelAsset {
  id: string;
  name: string;
  category: string;
  format: string;
  size: string;
  triangles: string;
  tags: string[];
  geometry: "box" | "sphere" | "cylinder" | "cone" | "torus";
  color: string;
}

export const MODELS: ModelAsset[] = [
  { id: "M-001", name: "城市建筑标准模型", category: "建筑", format: "GLB", size: "12.4 MB", triangles: "240K", tags: ["LOD2", "城市", "BIM"], geometry: "box", color: "#0ea5e9" },
  { id: "M-002", name: "工业风机三维模型", category: "工业", format: "FBX", size: "8.7 MB", triangles: "180K", tags: ["风机", "设备"], geometry: "cylinder", color: "#3b82f6" },
  { id: "M-003", name: "数字人体骨骼模型", category: "人物", format: "GLB", size: "23.1 MB", triangles: "520K", tags: ["数字人", "骨骼"], geometry: "sphere", color: "#6366f1" },
  { id: "M-004", name: "光伏面板阵列", category: "能源", format: "GLB", size: "5.2 MB", triangles: "95K", tags: ["光伏", "能源"], geometry: "box", color: "#06b6d4" },
  { id: "M-005", name: "城市道路与桥梁", category: "交通", format: "GLB", size: "34.8 MB", triangles: "780K", tags: ["道路", "交通"], geometry: "torus", color: "#0284c7" },
  { id: "M-006", name: "古建筑斗拱模型", category: "文物", format: "FBX", size: "9.6 MB", triangles: "210K", tags: ["古建", "文物"], geometry: "cone", color: "#0369a1" },
  { id: "M-007", name: "海港集装箱模型", category: "物流", format: "GLB", size: "3.4 MB", triangles: "62K", tags: ["港口", "集装箱"], geometry: "box", color: "#0891b2" },
  { id: "M-008", name: "数据中心机柜", category: "设备", format: "GLB", size: "6.1 MB", triangles: "120K", tags: ["数据中心", "机柜"], geometry: "box", color: "#1d4ed8" },
  { id: "M-009", name: "智慧灯杆模型", category: "城市家具", format: "GLB", size: "2.8 MB", triangles: "48K", tags: ["智慧灯杆", "城市"], geometry: "cylinder", color: "#0ea5e9" },
  { id: "M-010", name: "充电桩三维模型", category: "新能源", format: "FBX", size: "4.3 MB", triangles: "78K", tags: ["充电", "新能源"], geometry: "box", color: "#2563eb" },
  { id: "M-011", name: "无人机外形模型", category: "航空", format: "GLB", size: "7.9 MB", triangles: "165K", tags: ["无人机", "低空"], geometry: "sphere", color: "#0e7490" },
  { id: "M-012", name: "智慧农业大棚", category: "农业", format: "GLB", size: "11.2 MB", triangles: "230K", tags: ["大棚", "农业"], geometry: "torus", color: "#0891b2" },
];

export interface DatasetAsset {
  id: string;
  name: string;
  task: string;
  modality: string;
  size: string;
  downloads: number;
  likes: number;
  updated: string;
  license: string;
  description: string;
  tags: string[];
}

export const DATASETS: DatasetAsset[] = [
  { id: "DS-001", name: "city-building-rs-100k", task: "目标检测", modality: "遥感影像", size: "12.4 GB", downloads: 18420, likes: 1240, updated: "2026-05-12", license: "CC-BY-4.0", description: "覆盖全国 12 个城市的高分辨率遥感建筑物标注数据集，含 10 万张影像。", tags: ["遥感", "建筑物", "城市"] },
  { id: "DS-002", name: "road-pointcloud-3d", task: "语义分割", modality: "点云", size: "45.2 GB", downloads: 9870, likes: 870, updated: "2026-04-28", license: "Apache-2.0", description: "城市道路场景的车载激光点云数据集，含 19 类语义标签。", tags: ["点云", "道路", "自动驾驶"] },
  { id: "DS-003", name: "industrial-defect-bench", task: "缺陷检测", modality: "工业图像", size: "3.8 GB", downloads: 12340, likes: 1560, updated: "2026-06-01", license: "CC-BY-NC-4.0", description: "电子、纺织、金属三大行业的缺陷检测基准数据集。", tags: ["缺陷检测", "工业", "小样本"] },
  { id: "DS-004", name: "digital-human-motion", task: "动作生成", modality: "动捕数据", size: "8.7 GB", downloads: 6780, likes: 920, updated: "2026-05-20", license: "MIT", description: "覆盖 500+ 日常动作的高质量数字人动捕数据。", tags: ["数字人", "动作", "AIGC"] },
  { id: "DS-005", name: "urban-traffic-spatiotemporal", task: "时空预测", modality: "结构化", size: "1.2 GB", downloads: 5430, likes: 480, updated: "2026-03-15", license: "ODbL", description: "5 个特大城市路口的实时流量时空数据，分钟级粒度。", tags: ["时空", "交通", "预测"] },
  { id: "DS-006", name: "indoor-scene-3d-recon", task: "三维重建", modality: "RGB-D", size: "28.9 GB", downloads: 8970, likes: 1120, updated: "2026-06-08", license: "CC-BY-4.0", description: "1000+ 室内场景的 RGB-D 与三维重建真值。", tags: ["三维重建", "室内", "RGB-D"] },
  { id: "DS-007", name: "agri-multispectral-crops", task: "图像分类", modality: "多光谱影像", size: "6.4 GB", downloads: 3210, likes: 340, updated: "2026-04-02", license: "CC-BY-SA", description: "12 类主要农作物的多光谱卫星影像数据集。", tags: ["农业", "多光谱", "卫星"] },
  { id: "DS-008", name: "voice-assistant-zh", task: "语音识别", modality: "音频", size: "92.3 GB", downloads: 24560, likes: 2180, updated: "2026-05-30", license: "CC-BY-4.0", description: "10 万小时中文普通话语音助手对话数据集。", tags: ["语音", "中文", "ASR"] },
  { id: "DS-009", name: "vlm-multimodal-zh", task: "多模态理解", modality: "图文", size: "15.6 GB", downloads: 14320, likes: 1980, updated: "2026-06-12", license: "Apache-2.0", description: "百万级中文图文对，用于多模态大模型预训练。", tags: ["多模态", "中文", "LLM"] },
];

export interface TwinAsset {
  id: string;
  name: string;
  category: string;
  owner: string;
  thumbnail: string; // gradient
  physical: { material: string; weight: string; dimension: string; power?: string };
  business: { industry: string; usage: string; lifecycle: string; price: string };
  tags: string[];
}

export const TWINS: TwinAsset[] = [
  { id: "T-001", name: "智能风力发电机", category: "能源装备", owner: "金风科技", thumbnail: "from-sky-400 to-blue-600", physical: { material: "复合纤维", weight: "85 吨", dimension: "Φ150m × 120m", power: "5 MW" }, business: { industry: "新能源", usage: "海上风电场", lifecycle: "20 年", price: "¥ 3,200 万" }, tags: ["风电", "海上", "新能源"] },
  { id: "T-002", name: "AGV 智能搬运机器人", category: "物流装备", owner: "极智嘉", thumbnail: "from-cyan-400 to-sky-600", physical: { material: "铝合金", weight: "180 kg", dimension: "0.8m × 0.6m × 0.3m", power: "0.8 kW" }, business: { industry: "智慧物流", usage: "仓储分拣", lifecycle: "8 年", price: "¥ 18 万" }, tags: ["AGV", "仓储", "机器人"] },
  { id: "T-003", name: "光伏逆变器", category: "能源装备", owner: "阳光电源", thumbnail: "from-blue-400 to-indigo-600", physical: { material: "钢结构", weight: "1.2 吨", dimension: "2.2m × 1.1m × 0.9m", power: "250 kW" }, business: { industry: "新能源", usage: "光伏电站", lifecycle: "25 年", price: "¥ 35 万" }, tags: ["光伏", "逆变器"] },
  { id: "T-004", name: "工业 SCARA 机械臂", category: "工业机器人", owner: "埃斯顿", thumbnail: "from-indigo-400 to-violet-600", physical: { material: "铸铝", weight: "45 kg", dimension: "臂展 600mm", power: "1.5 kW" }, business: { industry: "智能制造", usage: "3C 装配", lifecycle: "10 年", price: "¥ 8.5 万" }, tags: ["机械臂", "装配"] },
  { id: "T-005", name: "高速地铁列车车厢", category: "交通装备", owner: "中车四方", thumbnail: "from-teal-400 to-cyan-600", physical: { material: "铝合金车体", weight: "42 吨", dimension: "22m × 3m × 3.8m", power: "1.4 MW" }, business: { industry: "智慧交通", usage: "城市地铁", lifecycle: "30 年", price: "¥ 2,800 万" }, tags: ["地铁", "轨交"] },
  { id: "T-006", name: "智能路侧 RSU 单元", category: "交通设施", owner: "千方科技", thumbnail: "from-sky-400 to-cyan-600", physical: { material: "工程塑料", weight: "8 kg", dimension: "0.4m × 0.3m × 0.1m", power: "30 W" }, business: { industry: "车路协同", usage: "V2X 通信", lifecycle: "8 年", price: "¥ 4.5 万" }, tags: ["V2X", "RSU"] },
  { id: "T-007", name: "城市消防栓", category: "城市设施", owner: "市政设施集团", thumbnail: "from-blue-400 to-sky-600", physical: { material: "铸铁", weight: "65 kg", dimension: "Φ200mm × 800mm" }, business: { industry: "公共安全", usage: "城市消防", lifecycle: "20 年", price: "¥ 6,000" }, tags: ["消防", "市政"] },
  { id: "T-008", name: "智慧灯杆一体化设备", category: "城市设施", owner: "华体科技", thumbnail: "from-cyan-400 to-blue-600", physical: { material: "钢制杆体", weight: "320 kg", dimension: "Φ200mm × 12m", power: "1.2 kW" }, business: { industry: "智慧城市", usage: "城市感知", lifecycle: "15 年", price: "¥ 8.8 万" }, tags: ["智慧灯杆", "城市"] },
];
