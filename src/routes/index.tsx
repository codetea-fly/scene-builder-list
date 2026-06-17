import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, MapPin, Briefcase, Calendar, Wallet, Building2, Sparkles, TrendingUp, ClipboardList, CheckCircle2, ArrowRight, Boxes } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "数字孪生场景创新公共服务平台" },
      { name: "description", content: "数字孪生场景创新公共服务平台 —— 基于 3DGS 点云重建，汇聚全国场景建设需求，加速供需对接。" },
      { property: "og:title", content: "数字孪生场景创新公共服务平台" },
      { property: "og:description", content: "基于 3DGS 点云重建技术，汇聚全国场景建设需求，加速创新落地。" },
    ],
  }),
  component: Index,
});


type Status = "征集中" | "评审中" | "已立项" | "已完成" | "已截止";

interface Demand {
  id: string;
  name: string;
  party: string;
  region: string;
  domain: string;
  budget: number; // 万元
  status: Status;
  deadline: string;
}

const DEMANDS: Demand[] = [
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

const STATUS_STYLES: Record<Status, string> = {
  "征集中": "bg-sky-100 text-sky-700 ring-1 ring-sky-200",
  "评审中": "bg-indigo-100 text-indigo-700 ring-1 ring-indigo-200",
  "已立项": "bg-cyan-100 text-cyan-700 ring-1 ring-cyan-200",
  "已完成": "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200",
  "已截止": "bg-slate-100 text-slate-500 ring-1 ring-slate-200",
};

const STATUS_DOT: Record<Status, string> = {
  "征集中": "bg-sky-500 animate-pulse",
  "评审中": "bg-indigo-500 animate-pulse",
  "已立项": "bg-cyan-500",
  "已完成": "bg-emerald-500",
  "已截止": "bg-slate-400",
};

const STATUSES: ("全部" | Status)[] = ["全部", "征集中", "评审中", "已立项", "已完成", "已截止"];

// Pre-generated deterministic "Gaussian splat" point cloud — soft elliptical splats
// that drift to evoke 3DGS point-cloud reconstruction.
const SPLATS = Array.from({ length: 90 }, (_, i) => {
  const seed = (n: number) => {
    const x = Math.sin(i * 999.13 + n) * 43758.5453;
    return x - Math.floor(x);
  };
  const left = seed(1) * 100;
  const top = seed(2) * 100;
  const size = 6 + seed(3) * 28;
  const dx = (seed(4) - 0.5) * 40;
  const dy = (seed(5) - 0.5) * 40;
  const delay = seed(6) * 6;
  const dur = 4 + seed(7) * 6;
  const hue = 195 + Math.floor(seed(8) * 45); // sky → blue → indigo
  const opacity = 0.25 + seed(9) * 0.5;
  const rot = Math.floor(seed(10) * 180);
  return { left, top, size, dx, dy, delay, dur, hue, opacity, rot };
});

function HeroPointCloud() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Perspective grid floor */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 [perspective:900px]">
        <div
          className="absolute inset-0 origin-bottom animate-gs-grid [transform:rotateX(62deg)] bg-[linear-gradient(to_right,rgba(56,189,248,0.35)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.35)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:linear-gradient(to_top,black,transparent_85%)]"
        />
      </div>

      {/* Orbiting ring */}
      <div className="absolute left-1/2 top-1/2 h-[680px] w-[680px] -translate-x-1/2 -translate-y-1/2 animate-gs-orbit rounded-full border border-sky-200/40 [mask-image:radial-gradient(circle,black_55%,transparent_72%)]">
        <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-sky-400 shadow-[0_0_18px_4px_rgba(56,189,248,0.7)]" />
        <div className="absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-blue-400 shadow-[0_0_14px_3px_rgba(59,130,246,0.6)]" />
      </div>

      {/* Gaussian splats */}
      <div className="absolute inset-0">
        {SPLATS.map((s, i) => (
          <span
            key={i}
            className="absolute rounded-full animate-gs-drift"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size * 0.62,
              background: `radial-gradient(ellipse at center, hsla(${s.hue},90%,65%,0.95) 0%, hsla(${s.hue},90%,60%,0.4) 45%, hsla(${s.hue},90%,55%,0) 75%)`,
              filter: "blur(0.3px)",
              transform: `rotate(${s.rot}deg)`,
              ["--gs-x" as string]: `${s.dx}px`,
              ["--gs-y" as string]: `${s.dy}px`,
              ["--gs-o" as string]: `${s.opacity}`,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.dur}s`,
            }}
          />
        ))}
      </div>

      {/* Scan sweep */}
      <div className="absolute inset-y-0 left-0 w-1/3 animate-gs-sweep bg-gradient-to-r from-transparent via-white/40 to-transparent" />

      {/* Soft top vignette to keep text legible */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/10 to-white/60" />
    </div>
  );
}

function Hero() {
  const [q, setQ] = useState("");
  const scrollToList = () => {
    document.getElementById("demand-list")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <section className="relative isolate flex min-h-screen flex-col overflow-hidden border-b border-sky-100 bg-gradient-to-b from-sky-50 via-white to-blue-50">
      <HeroPointCloud />
      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <h1
          className="animate-fade-in text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-6xl"
          style={{ animationDelay: "80ms", animationFillMode: "backwards" }}
        >
          数字孪生
          <span className="bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
            场景创新
          </span>
          公共服务平台
        </h1>
        <p
          className="mt-5 animate-fade-in text-base text-slate-600 sm:text-lg"
          style={{ animationDelay: "160ms", animationFillMode: "backwards" }}
        >
          场景创新，从这里开始
        </p>

        <form
          onSubmit={(e) => { e.preventDefault(); scrollToList(); }}
          className="mt-10 flex w-full max-w-2xl animate-fade-in flex-col gap-3 sm:flex-row"
          style={{ animationDelay: "240ms", animationFillMode: "backwards" }}
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-sky-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="搜索场景需求、行业领域或所属地区…"
              className="h-14 w-full rounded-2xl border border-sky-200 bg-white/90 pl-12 pr-4 text-base shadow-lg shadow-sky-200/40 outline-none backdrop-blur transition-all placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
            />
          </div>
          <button
            type="submit"
            className="group inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 px-8 text-base font-semibold text-white shadow-lg shadow-sky-300/50 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-sky-400/50 active:translate-y-0"
          >
            点击探索
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </form>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToList}
        aria-label="向下滚动"
        className="group relative mx-auto mb-8 flex h-12 w-8 items-center justify-center rounded-full border-2 border-sky-400/60 text-sky-500 transition-colors hover:border-sky-500"
      >
        <span className="absolute top-2 h-2 w-1 animate-bounce rounded-full bg-sky-500" />
      </button>
    </section>

  );
}


function Index() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"全部" | Status>("全部");

  const filtered = useMemo(() => {
    return DEMANDS.filter((d) => {
      const matchQ = !query || [d.name, d.party, d.region, d.domain, d.id].some((v) => v.includes(query));
      const matchS = status === "全部" || d.status === status;
      return matchQ && matchS;
    });
  }, [query, status]);

  const stats = useMemo(() => {
    const total = DEMANDS.length;
    const collecting = DEMANDS.filter((d) => d.status === "征集中").length;
    const approved = DEMANDS.filter((d) => d.status === "已立项").length;
    const budget = DEMANDS.reduce((s, d) => s + d.budget, 0);
    return { total, collecting, approved, budget };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-50 via-white to-blue-50 text-slate-800">
      <Hero />
      {/* Decorative animated blobs */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-sky-200/40 blur-3xl animate-blob" />
        <div className="absolute top-40 -right-32 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-cyan-200/40 blur-3xl animate-blob animation-delay-4000" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(14,165,233,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,165,233,0.05)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-12">
        {/* Header */}
        <header className="mb-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/70 px-4 py-1.5 text-xs font-medium text-sky-700 shadow-sm backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            全国场景建设需求汇聚平台
          </div>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            场景建设<span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">需求清单</span>
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            汇集来自全国各省市、各行业的最新场景建设需求，洞察预算规模、把握立项节奏，让供需对接更高效。
          </p>
        </header>

        {/* Stats */}
        <section className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "需求总数", value: stats.total, icon: ClipboardList, color: "from-sky-500 to-blue-500" },
            { label: "正在征集", value: stats.collecting, icon: TrendingUp, color: "from-cyan-500 to-sky-500" },
            { label: "已立项", value: stats.approved, icon: CheckCircle2, color: "from-blue-500 to-indigo-500" },
            { label: "预算总额(万)", value: stats.budget.toLocaleString(), icon: Wallet, color: "from-indigo-500 to-blue-500" },
          ].map((s, i) => (
            <div
              key={s.label}
              className="group relative overflow-hidden rounded-2xl border border-sky-100 bg-white/80 p-5 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-sky-200/50 animate-fade-in"
              style={{ animationDelay: `${i * 80}ms`, animationFillMode: "backwards" }}
            >
              <div className={`absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gradient-to-br ${s.color} opacity-10 transition-transform duration-500 group-hover:scale-150`} />
              <s.icon className="mb-3 h-5 w-5 text-sky-500" />
              <div className="text-2xl font-bold text-slate-900">{s.value}</div>
              <div className="mt-1 text-xs text-slate-500">{s.label}</div>
            </div>
          ))}
        </section>

        {/* Controls */}
        <section className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sky-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索需求名称 / 需求方 / 地域 / 编号"
              className="w-full rounded-xl border border-sky-200 bg-white/80 py-2.5 pl-10 pr-4 text-sm shadow-sm outline-none backdrop-blur transition-all placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200 hover:scale-105 ${
                  status === s
                    ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-300/50"
                    : "border border-sky-200 bg-white/70 text-slate-600 hover:border-sky-300 hover:text-sky-600"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </section>

        {/* Table */}
        <section id="demand-list" className="overflow-hidden rounded-2xl border border-sky-100 bg-white/80 shadow-xl shadow-sky-100/50 backdrop-blur animate-fade-in scroll-mt-8">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-sky-50 to-blue-50 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <th className="px-5 py-4">需求编号</th>
                  <th className="px-5 py-4">需求名称</th>
                  <th className="px-5 py-4">需求方</th>
                  <th className="px-5 py-4">所属地域</th>
                  <th className="px-5 py-4">所属领域</th>
                  <th className="px-5 py-4 text-right">预算(万)</th>
                  <th className="px-5 py-4">需求状态</th>
                  <th className="px-5 py-4">截止日期</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((d, i) => (
                  <tr
                    key={d.id}
                    className="group border-t border-sky-50 transition-all duration-200 hover:bg-sky-50/60 animate-fade-in"
                    style={{ animationDelay: `${i * 40}ms`, animationFillMode: "backwards" }}
                  >
                    <td className="whitespace-nowrap px-5 py-4 font-mono text-xs text-sky-600">{d.id}</td>
                    <td className="px-5 py-4 font-medium text-slate-800 group-hover:text-sky-700">{d.name}</td>
                    <td className="px-5 py-4 text-slate-600">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-3.5 w-3.5 text-sky-400" />
                        {d.party}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-sky-400" />
                        {d.region}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-0.5 text-xs text-blue-700 ring-1 ring-blue-100">
                        <Briefcase className="h-3 w-3" />
                        {d.domain}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-right font-semibold text-slate-800">
                      {d.budget.toLocaleString()}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[d.status]}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[d.status]}`} />
                        {d.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-sky-400" />
                        {d.deadline}
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-5 py-16 text-center text-sm text-slate-400">
                      未找到匹配的需求
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between border-t border-sky-50 bg-sky-50/40 px-5 py-3 text-xs text-slate-500">
            <span>共 {filtered.length} 条需求</span>
            <span>数据每日同步 · 最后更新 2026-06-17</span>
          </div>
        </section>

        <footer className="mt-10 text-center text-xs text-slate-400">
          © 2026 全国场景建设需求汇聚平台 · 让每一个场景都被看见
        </footer>
      </div>
    </div>
  );
}
