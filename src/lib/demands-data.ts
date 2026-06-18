export type DemandStatus = "征集中" | "评审中" | "已立项" | "已完成" | "已截止";

export interface Demand {
  id: string;
  name: string;
  party: string;
  region: string;
  domain: string;
  budget: number;
  status: DemandStatus;
  deadline: string;
}

export const DEMANDS: Demand[] = [
  { id: "XQ-2025-0001", name: "城市交通智慧大脑调度平台", party: "北京市交通委员会", region: "北京", domain: "智慧交通", budget: 1280, status: "征集中", deadline: "2026-08-15" },
  { id: "XQ-2025-0002", name: "黄浦江沿岸数字孪生展示系统", party: "上海市浦东新区政府", region: "上海", domain: "数字孪生", budget: 860, status: "评审中", deadline: "2026-07-30" },
  { id: "XQ-2025-0003", name: "粤港澳大湾区跨境政务协同平台", party: "广东省政务服务数据管理局", region: "广东", domain: "政务服务", budget: 2150, status: "已立项", deadline: "2026-12-20" },
  { id: "XQ-2025-0004", name: "智能制造产线视觉质检场景", party: "重庆长安汽车股份有限公司", region: "重庆", domain: "智能制造", budget: 540, status: "征集中", deadline: "2026-09-05" },
  { id: "XQ-2025-0005", name: "三甲医院 AI 辅助影像诊断系统", party: "四川大学华西医院", region: "四川", domain: "智慧医疗", budget: 780, status: "评审中", deadline: "2026-07-10" },
  { id: "XQ-2025-0006", name: "智慧校园学情分析平台", party: "浙江大学", region: "浙江", domain: "智慧教育", budget: 420, status: "征集中", deadline: "2026-10-18" },
  { id: "XQ-2025-0007", name: "黄河流域生态环境监测网络", party: "黄河水利委员会", region: "河南", domain: "生态环保", budget: 1680, status: "已立项", deadline: "2026-11-30" },
  { id: "XQ-2025-0008", name: "雄安新区零碳园区能源管控", party: "雄安集团数字城市公司", region: "河北", domain: "智慧能源", budget: 1950, status: "征集中", deadline: "2026-09-22" },
  { id: "XQ-2025-0009", name: "海港集装箱无人化装卸场景", party: "山东港口青岛港集团", region: "山东", domain: "智慧物流", budget: 2380, status: "评审中", deadline: "2026-08-08" },
  { id: "XQ-2025-0010", name: "智慧农业大田精准灌溉系统", party: "黑龙江农垦建三江管理局", region: "黑龙江", domain: "智慧农业", budget: 360, status: "征集中", deadline: "2026-10-30" },
  { id: "XQ-2025-0011", name: "城市应急指挥可视化平台", party: "武汉市应急管理局", region: "湖北", domain: "公共安全", budget: 920, status: "已立项", deadline: "2026-09-15" },
  { id: "XQ-2025-0012", name: "古城文旅 AR 沉浸式导览", party: "西安曲江文化产业集团", region: "陕西", domain: "智慧文旅", budget: 480, status: "征集中", deadline: "2026-08-28" },
  { id: "XQ-2025-0013", name: "新能源汽车换电网络运营平台", party: "宁德时代新能源科技", region: "福建", domain: "新能源", budget: 1450, status: "评审中", deadline: "2026-07-25" },
  { id: "XQ-2025-0014", name: "省级一网通办政务大模型", party: "江苏省大数据管理中心", region: "江苏", domain: "政务服务", budget: 1780, status: "已立项", deadline: "2027-01-15" },
  { id: "XQ-2025-0015", name: "矿区无人驾驶卡车编组场景", party: "国家能源集团准能公司", region: "内蒙古", domain: "智能制造", budget: 2680, status: "征集中", deadline: "2026-11-08" },
  { id: "XQ-2025-0016", name: "智慧社区居家养老服务平台", party: "天津市民政局", region: "天津", domain: "智慧城市", budget: 380, status: "已完成", deadline: "2026-05-30" },
  { id: "XQ-2025-0017", name: "海岛全域旅游一体化平台", party: "海南省旅游和文化广电体育厅", region: "海南", domain: "智慧文旅", budget: 690, status: "征集中", deadline: "2026-10-12" },
  { id: "XQ-2025-0018", name: "高原铁路隧道智能巡检系统", party: "中国铁路青藏集团", region: "西藏", domain: "智慧交通", budget: 1120, status: "评审中", deadline: "2026-09-30" },
  { id: "XQ-2025-0019", name: "金融反欺诈实时风控引擎", party: "招商银行总行", region: "广东", domain: "金融科技", budget: 1320, status: "已立项", deadline: "2026-12-01" },
  { id: "XQ-2025-0020", name: "城市低空经济无人机航路调度", party: "深圳市交通运输局", region: "广东", domain: "智慧交通", budget: 1580, status: "已截止", deadline: "2026-06-10" },
];

export const STATUS_STYLES: Record<DemandStatus, string> = {
  "征集中": "bg-sky-100 text-sky-700 ring-1 ring-sky-200",
  "评审中": "bg-indigo-100 text-indigo-700 ring-1 ring-indigo-200",
  "已立项": "bg-cyan-100 text-cyan-700 ring-1 ring-cyan-200",
  "已完成": "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200",
  "已截止": "bg-slate-100 text-slate-500 ring-1 ring-slate-200",
};

export const STATUS_DOT: Record<DemandStatus, string> = {
  "征集中": "bg-sky-500 animate-pulse",
  "评审中": "bg-indigo-500 animate-pulse",
  "已立项": "bg-cyan-500",
  "已完成": "bg-emerald-500",
  "已截止": "bg-slate-400",
};
