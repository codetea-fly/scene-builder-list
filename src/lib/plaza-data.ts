export interface Scene {
  id: string;
  name: string;
  vendor: string;
  domain: string;
  tags: string[];
  description: string;
  longDescription?: string;
  cover: string; // gradient class for cover
  views: number;
  forks: number;
  /** 场景建设方 */
  builder: string;
  builderDesc: string;
  /** 图片集合（使用渐变 class 占位，避免外部图源） */
  images: { caption: string; gradient: string }[];
  /** 视频集合（占位） */
  videos: { title: string; duration: string; gradient: string }[];
  /** 在线体验体验人次（带「在线体验」标签时使用） */
  users?: number;
  /** 在线体验预计时长 */
  duration?: string;
}

const COVERS = [
  "from-sky-400 via-blue-400 to-indigo-500",
  "from-cyan-400 via-sky-400 to-blue-500",
  "from-blue-400 via-indigo-400 to-violet-500",
  "from-sky-300 via-cyan-400 to-teal-500",
  "from-indigo-400 via-blue-500 to-sky-500",
  "from-teal-400 via-cyan-500 to-sky-500",
];

const IMG_GRADIENTS = [
  "from-sky-500 via-cyan-400 to-blue-600",
  "from-indigo-500 via-blue-500 to-sky-400",
  "from-teal-400 via-cyan-500 to-blue-500",
  "from-violet-500 via-indigo-500 to-sky-500",
];

/** 这些索引的场景会被打上「在线体验」标签，且会出现在「在线体验中心」 */
const ONLINE_INDEXES = new Set([0, 1, 3, 4, 5, 6, 7, 8, 10, 12, 16, 18]);

const RAW: Omit<Scene, "id" | "cover" | "views" | "forks" | "images" | "videos" | "users" | "duration">[] = [
  { name: "城市交通智能调度孪生场景", vendor: "百度 Apollo", domain: "智慧交通", tags: ["3DGS", "高精地图", "实时仿真"], description: "面向中心城区的交通信号与车流实时联动调度。", longDescription: "以城市级高精地图为底座，融合卡口、雷视一体机、信号机、网联车等多源数据，对中心城区交通流进行实时孪生。通过强化学习对路口信号配时进行在线优化，对突发拥堵、事件交通进行毫秒级感知与策略下发，实现城市干线协调、区域协同与应急疏导。", builder: "百度 Apollo 智能交通事业部", builderDesc: "国内领先的车路云一体化解决方案提供商，已在 50+ 城市落地车城网项目。" },
  { name: "智慧园区能耗管控场景", vendor: "腾讯 WeCity", domain: "智慧园区", tags: ["IoT", "能耗", "BIM"], description: "园区楼宇能耗数字孪生与异常诊断。", longDescription: "基于 BIM + IoT 构建园区级建筑能耗孪生体，覆盖空调、照明、电梯、给排水等全用能设备，结合 AI 异常诊断模型实现能耗画像、节能寻优、故障定位与碳排核算。", builder: "腾讯云 WeCity 团队", builderDesc: "腾讯智慧城市核心团队，深耕园区、政务、交通等场景的数字底座建设。" },
  { name: "黄河流域生态监测孪生", vendor: "中科院遥感所", domain: "生态环保", tags: ["遥感", "GIS", "AI 识别"], description: "黄河流域水质、植被、岸线一体化监测。", builder: "中科院空天信息创新研究院", builderDesc: "国家级遥感与地球信息科学研究机构。" },
  { name: "智能工厂产线孪生场景", vendor: "海尔卡奥斯", domain: "智能制造", tags: ["产线", "MES", "VR"], description: "家电生产线的数字孪生与节拍优化。", longDescription: "面向离散制造业的产线级孪生场景，实现设备 OEE 监控、节拍瓶颈识别、排产仿真与工艺质量回溯，支持 VR 远程巡检与新员工沉浸式培训。", builder: "海尔卡奥斯工业互联网", builderDesc: "国家级跨行业跨领域工业互联网平台。" },
  { name: "数字文旅景区导览", vendor: "故宫数字团队", domain: "智慧文旅", tags: ["3DGS", "AR", "数字人"], description: "故宫全景三维重建与 AR 沉浸式导览。", longDescription: "通过 3D 高斯泼溅 + 倾斜摄影对景区进行毫米级三维重建，结合数字人讲解、AR 时空叠加，为游客提供沉浸式文化体验与游线推荐。", builder: "故宫博物院数字文物研究所", builderDesc: "国内顶尖的文化遗产数字化团队。" },
  { name: "智慧医院手术室孪生", vendor: "联影智能", domain: "智慧医疗", tags: ["手术", "AR", "5G"], description: "面向远程手术指导的高保真孪生场景。", builder: "上海联影智能医疗", builderDesc: "高端医疗影像与 AI 解决方案提供商。" },
  { name: "雄安零碳园区孪生", vendor: "雄安数字城市", domain: "智慧能源", tags: ["零碳", "园区", "光伏"], description: "园区零碳运行的能源调度孪生场景。", builder: "雄安数字城市科技有限公司", builderDesc: "雄安新区官方数字城市运营主体。" },
  { name: "海港集装箱无人作业", vendor: "山东港口", domain: "智慧物流", tags: ["港口", "无人驾驶", "调度"], description: "集装箱码头无人化装卸与调度孪生。", builder: "山东港口集团", builderDesc: "全球最大港口集团之一,自动化码头标杆。" },
  { name: "城市低空航路调度", vendor: "亿航智能", domain: "低空经济", tags: ["无人机", "航路", "调度"], description: "城市级低空无人机航路与冲突消解。", builder: "亿航智能", builderDesc: "全球领先的城市空中交通(UAM)解决方案商。" },
  { name: "数字孪生流域防汛", vendor: "水利部信息中心", domain: "公共安全", tags: ["防汛", "GIS", "预测"], description: "流域级洪水演进仿真与防汛指挥。", builder: "水利部信息中心", builderDesc: "国家级水利信息化主管单位。" },
  { name: "智慧校园学情分析", vendor: "好未来", domain: "智慧教育", tags: ["教育", "AI", "可视化"], description: "K12 校园学情数据孪生与个性化推荐。", builder: "好未来教育科技集团", builderDesc: "国内领先的教育科技与学习服务提供商。" },
  { name: "矿区无人驾驶卡车编组", vendor: "踏歌智行", domain: "智能制造", tags: ["矿区", "无人驾驶", "编组"], description: "露天矿无人驾驶卡车的编组与调度孪生。", builder: "踏歌智行", builderDesc: "矿区无人驾驶领域领军企业。" },
  { name: "古城 AR 沉浸导览场景", vendor: "西安曲江", domain: "智慧文旅", tags: ["古城", "AR", "数字人"], description: "古城历史场景的 AR 时空穿越体验。", builder: "西安曲江文化产业集团", builderDesc: "国家级文化产业示范园区运营方。" },
  { name: "新能源换电网络孪生", vendor: "宁德时代", domain: "新能源", tags: ["换电", "电池", "调度"], description: "城市级换电网络的运营孪生与调度。", builder: "宁德时代新能源科技", builderDesc: "全球动力电池领军企业。" },
  { name: "金融营业厅服务孪生", vendor: "招商银行", domain: "金融科技", tags: ["金融", "客流", "服务"], description: "银行营业厅客流与服务效率孪生。", builder: "招商银行金融科技部", builderDesc: "国内银行业数字化转型标杆。" },
  { name: "高原铁路隧道巡检", vendor: "中国中铁", domain: "智慧交通", tags: ["铁路", "巡检", "AI"], description: "高原铁路隧道结构智能巡检孪生场景。", builder: "中国中铁科研院", builderDesc: "轨道交通基础设施智能运维国家队。" },
  { name: "智慧农业大田灌溉", vendor: "大疆农业", domain: "智慧农业", tags: ["农业", "灌溉", "无人机"], description: "大田作物的精准灌溉与无人机协同。", builder: "大疆创新农业事业部", builderDesc: "全球植保无人机行业引领者。" },
  { name: "城市应急指挥孪生", vendor: "应急管理部", domain: "公共安全", tags: ["应急", "指挥", "可视化"], description: "城市级应急事件的处置与指挥孪生。", builder: "应急管理部信息研究院", builderDesc: "国家级应急管理数字化研究机构。" },
  { name: "海岛全域旅游孪生", vendor: "海南旅游集团", domain: "智慧文旅", tags: ["海岛", "文旅", "导览"], description: "海岛全域旅游服务的统一孪生平台。", builder: "海南旅游投资发展集团", builderDesc: "海南自贸港文旅龙头企业。" },
  { name: "智慧社区养老服务", vendor: "民政部研究院", domain: "智慧城市", tags: ["养老", "社区", "AI"], description: "社区居家养老服务的智能孪生场景。", builder: "民政部政策研究中心", builderDesc: "国家级民政政策与社会服务研究机构。" },
];

export const SCENES: Scene[] = RAW.map((s, i) => {
  const isOnline = ONLINE_INDEXES.has(i);
  const tags = isOnline ? [...s.tags, "在线体验"] : s.tags;
  return {
    ...s,
    tags,
    id: `SC-${String(i + 1).padStart(4, "0")}`,
    cover: COVERS[i % COVERS.length],
    views: 1200 + Math.floor(Math.sin(i * 3.7) * 800 + 1500),
    forks: 40 + Math.floor(Math.cos(i * 2.3) * 60 + 80),
    longDescription: s.longDescription ?? `${s.description} 该场景围绕 ${s.domain} 领域的关键业务诉求,以数字孪生为核心载体,融合多源数据接入、三维可视化、AI 推演与协同指挥能力,支撑业务方在虚拟空间中完成态势研判、策略推演与闭环调度,实现降本增效与风险可控。`,
    images: [
      { caption: "孪生主视图", gradient: IMG_GRADIENTS[(i + 0) % IMG_GRADIENTS.length] },
      { caption: "数据看板", gradient: IMG_GRADIENTS[(i + 1) % IMG_GRADIENTS.length] },
      { caption: "推演沙盘", gradient: IMG_GRADIENTS[(i + 2) % IMG_GRADIENTS.length] },
      { caption: "联动调度", gradient: IMG_GRADIENTS[(i + 3) % IMG_GRADIENTS.length] },
    ],
    videos: [
      { title: "场景概览短片", duration: "01:32", gradient: IMG_GRADIENTS[(i + 1) % IMG_GRADIENTS.length] },
      { title: "典型业务流程", duration: "03:48", gradient: IMG_GRADIENTS[(i + 2) % IMG_GRADIENTS.length] },
    ],
    users: isOnline ? 400 + ((i * 137) % 1800) : undefined,
    duration: isOnline ? `约 ${5 + (i % 4)} 分钟` : undefined,
  };
});

export const ALL_TAGS = Array.from(new Set(SCENES.flatMap((s) => s.tags))).sort();
export const ALL_VENDORS = Array.from(new Set(SCENES.map((s) => s.vendor))).sort();
export const ALL_DOMAINS = Array.from(new Set(SCENES.map((s) => s.domain))).sort();

export const ONLINE_TAG = "在线体验";
