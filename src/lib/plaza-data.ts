export interface Scene {
  id: string;
  name: string;
  vendor: string;
  domain: string;
  tags: string[];
  description: string;
  cover: string; // gradient class for cover
  views: number;
  forks: number;
}

const COVERS = [
  "from-sky-400 via-blue-400 to-indigo-500",
  "from-cyan-400 via-sky-400 to-blue-500",
  "from-blue-400 via-indigo-400 to-violet-500",
  "from-sky-300 via-cyan-400 to-teal-500",
  "from-indigo-400 via-blue-500 to-sky-500",
  "from-teal-400 via-cyan-500 to-sky-500",
];

const RAW: Omit<Scene, "id" | "cover" | "views" | "forks">[] = [
  { name: "城市交通智能调度孪生场景", vendor: "百度 Apollo", domain: "智慧交通", tags: ["3DGS", "高精地图", "实时仿真"], description: "面向中心城区的交通信号与车流实时联动调度。" },
  { name: "智慧园区能耗管控场景", vendor: "腾讯 WeCity", domain: "智慧园区", tags: ["IoT", "能耗", "BIM"], description: "园区楼宇能耗数字孪生与异常诊断。" },
  { name: "黄河流域生态监测孪生", vendor: "中科院遥感所", domain: "生态环保", tags: ["遥感", "GIS", "AI 识别"], description: "黄河流域水质、植被、岸线一体化监测。" },
  { name: "智能工厂产线孪生场景", vendor: "海尔卡奥斯", domain: "智能制造", tags: ["产线", "MES", "VR"], description: "家电生产线的数字孪生与节拍优化。" },
  { name: "数字文旅景区导览", vendor: "故宫数字团队", domain: "智慧文旅", tags: ["3DGS", "AR", "数字人"], description: "故宫全景三维重建与 AR 沉浸式导览。" },
  { name: "智慧医院手术室孪生", vendor: "联影智能", domain: "智慧医疗", tags: ["手术", "AR", "5G"], description: "面向远程手术指导的高保真孪生场景。" },
  { name: "雄安零碳园区孪生", vendor: "雄安数字城市", domain: "智慧能源", tags: ["零碳", "园区", "光伏"], description: "园区零碳运行的能源调度孪生场景。" },
  { name: "海港集装箱无人作业", vendor: "山东港口", domain: "智慧物流", tags: ["港口", "无人驾驶", "调度"], description: "集装箱码头无人化装卸与调度孪生。" },
  { name: "城市低空航路调度", vendor: "亿航智能", domain: "低空经济", tags: ["无人机", "航路", "调度"], description: "城市级低空无人机航路与冲突消解。" },
  { name: "数字孪生流域防汛", vendor: "水利部信息中心", domain: "公共安全", tags: ["防汛", "GIS", "预测"], description: "流域级洪水演进仿真与防汛指挥。" },
  { name: "智慧校园学情分析", vendor: "好未来", domain: "智慧教育", tags: ["教育", "AI", "可视化"], description: "K12 校园学情数据孪生与个性化推荐。" },
  { name: "矿区无人驾驶卡车编组", vendor: "踏歌智行", domain: "智能制造", tags: ["矿区", "无人驾驶", "编组"], description: "露天矿无人驾驶卡车的编组与调度孪生。" },
  { name: "古城 AR 沉浸导览场景", vendor: "西安曲江", domain: "智慧文旅", tags: ["古城", "AR", "数字人"], description: "古城历史场景的 AR 时空穿越体验。" },
  { name: "新能源换电网络孪生", vendor: "宁德时代", domain: "新能源", tags: ["换电", "电池", "调度"], description: "城市级换电网络的运营孪生与调度。" },
  { name: "金融营业厅服务孪生", vendor: "招商银行", domain: "金融科技", tags: ["金融", "客流", "服务"], description: "银行营业厅客流与服务效率孪生。" },
  { name: "高原铁路隧道巡检", vendor: "中国中铁", domain: "智慧交通", tags: ["铁路", "巡检", "AI"], description: "高原铁路隧道结构智能巡检孪生场景。" },
  { name: "智慧农业大田灌溉", vendor: "大疆农业", domain: "智慧农业", tags: ["农业", "灌溉", "无人机"], description: "大田作物的精准灌溉与无人机协同。" },
  { name: "城市应急指挥孪生", vendor: "应急管理部", domain: "公共安全", tags: ["应急", "指挥", "可视化"], description: "城市级应急事件的处置与指挥孪生。" },
  { name: "海岛全域旅游孪生", vendor: "海南旅游集团", domain: "智慧文旅", tags: ["海岛", "文旅", "导览"], description: "海岛全域旅游服务的统一孪生平台。" },
  { name: "智慧社区养老服务", vendor: "民政部研究院", domain: "智慧城市", tags: ["养老", "社区", "AI"], description: "社区居家养老服务的智能孪生场景。" },
];

export const SCENES: Scene[] = RAW.map((s, i) => ({
  ...s,
  id: `SC-${String(i + 1).padStart(4, "0")}`,
  cover: COVERS[i % COVERS.length],
  views: 1200 + Math.floor(Math.sin(i * 3.7) * 800 + 1500),
  forks: 40 + Math.floor(Math.cos(i * 2.3) * 60 + 80),
}));

export const ALL_TAGS = Array.from(new Set(SCENES.flatMap((s) => s.tags))).sort();
export const ALL_VENDORS = Array.from(new Set(SCENES.map((s) => s.vendor))).sort();
export const ALL_DOMAINS = Array.from(new Set(SCENES.map((s) => s.domain))).sort();
