import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Tag, Play, Boxes, Users, Clock, X, Loader2 } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/demo/online")({
  head: () => ({ meta: [{ title: "在线体验中心 — 场景示范体验中心" }] }),
  component: OnlineExperiencePage,
});

type Scene = {
  id: string;
  name: string;
  vendor: string;
  domain: string;
  description: string;
  tags: string[];
  cover: string;
  users: number;
  duration: string;
};

const SCENES: Scene[] = [
  { id: "smart-factory", name: "智能工厂数字孪生", vendor: "中科云制造", domain: "智能制造", description: "实时还原车间设备运转，支持产线节拍仿真与瓶颈分析。", tags: ["数字孪生", "工业互联网", "实时仿真"], cover: "from-sky-400 to-blue-600", users: 1284, duration: "约 5 分钟" },
  { id: "smart-city", name: "城市级综合治理孪生", vendor: "智慧城市研究院", domain: "智慧城市", description: "融合交通、应急、环境多源数据，构建一张图的城市治理体验。", tags: ["城市孪生", "GIS", "多源融合"], cover: "from-cyan-400 to-sky-600", users: 2103, duration: "约 8 分钟" },
  { id: "power-grid", name: "新型电力系统仿真", vendor: "国网数字研究院", domain: "能源电力", description: "覆盖源网荷储全环节的孪生体，支持极端工况推演。", tags: ["电力", "新能源", "仿真推演"], cover: "from-blue-500 to-indigo-600", users: 967, duration: "约 6 分钟" },
  { id: "smart-port", name: "智慧港口作业孪生", vendor: "海港科技", domain: "智慧交通", description: "岸桥/堆场/集卡协同调度，AGV 轨迹与拥堵热力可视化。", tags: ["港口", "调度优化", "AGV"], cover: "from-teal-400 to-cyan-600", users: 742, duration: "约 7 分钟" },
  { id: "campus-twin", name: "智慧园区数字孪生", vendor: "云栖数字", domain: "智慧园区", description: "园区能耗、安防、人流多维度联动，支持节能策略沙盘推演。", tags: ["园区", "能耗管理", "安防"], cover: "from-sky-500 to-blue-500", users: 1521, duration: "约 5 分钟" },
  { id: "hospital", name: "智慧医院运营孪生", vendor: "康源医疗", domain: "智慧医疗", description: "复刻门诊/住院/手术全流程，辅助床位调度与流程优化。", tags: ["医疗", "流程优化", "调度"], cover: "from-indigo-400 to-blue-600", users: 638, duration: "约 6 分钟" },
  { id: "water-net", name: "水务管网孪生", vendor: "九州水务", domain: "智慧水务", description: "管网压力、漏损、水质实时联动，支持爆管事故应急推演。", tags: ["水务", "管网", "应急"], cover: "from-cyan-500 to-teal-600", users: 489, duration: "约 6 分钟" },
  { id: "mine", name: "智慧矿山三维孪生", vendor: "矿源科技", domain: "智慧矿山", description: "井下设备、人员定位与瓦斯监测一体化，支持作业风险预警。", tags: ["矿山", "安全监测", "三维"], cover: "from-blue-600 to-slate-700", users: 372, duration: "约 7 分钟" },
  { id: "wind-farm", name: "海上风电场孪生", vendor: "蓝海能源", domain: "新能源", description: "风机姿态/出力/环境耦合建模，支持运维路径与发电预测。", tags: ["风电", "海洋", "预测"], cover: "from-sky-400 to-teal-500", users: 815, duration: "约 6 分钟" },
  { id: "agri", name: "智慧农业大田孪生", vendor: "禾田数字", domain: "智慧农业", description: "土壤墒情/作物长势/气象联动，辅助精准灌溉与施肥决策。", tags: ["农业", "遥感", "精准"], cover: "from-emerald-400 to-cyan-500", users: 564, duration: "约 5 分钟" },
  { id: "rail", name: "城轨车站客流孪生", vendor: "轨道未来", domain: "智慧交通", description: "站台/换乘/出入闸客流模拟，节假日大客流预案演练。", tags: ["城轨", "客流", "应急"], cover: "from-blue-400 to-sky-600", users: 921, duration: "约 6 分钟" },
  { id: "edu", name: "智慧校园教学孪生", vendor: "学海教育云", domain: "智慧教育", description: "教室/实验室/宿舍多场景融合，支持教学评估与资源调配。", tags: ["教育", "校园", "评估"], cover: "from-sky-300 to-indigo-500", users: 433, duration: "约 5 分钟" },
];

const ALL_TAGS = Array.from(new Set(SCENES.flatMap((s) => s.tags)));

function OnlineExperiencePage() {
  const [q, setQ] = useState("");
  const [active, setActive] = useState<string[]>([]);
  const [running, setRunning] = useState<Scene | null>(null);

  const filtered = useMemo(() => SCENES.filter((s) => {
    const mq = !q || s.name.includes(q) || s.vendor.includes(q) || s.domain.includes(q);
    const mt = active.length === 0 || active.every((t) => s.tags.includes(t));
    return mq && mt;
  }), [q, active]);

  const toggle = (t: string) => setActive((p) => p.includes(t) ? p.filter((x) => x !== t) : [...p, t]);

  return (
    <main className="relative mx-auto max-w-7xl px-6 py-12">
      <PageHeader
        eyebrow="场景示范体验中心"
        title="在线"
        highlight="体验中心"
        description="精选数字孪生场景在线体验，点击场景卡片中的「在线体验」按钮，即刻沉浸式进入孪生世界。"
      />

      <section className="mb-6 rounded-2xl border border-sky-100 bg-white/80 p-5 shadow-sm backdrop-blur animate-fade-in">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sky-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="搜索场景名称 / 厂商 / 领域"
            className="w-full rounded-xl border border-sky-200 bg-white/80 py-2.5 pl-10 pr-4 text-sm outline-none transition-all focus:border-sky-400 focus:ring-4 focus:ring-sky-100" />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Tag className="h-4 w-4 text-sky-500" />
          <span className="text-xs font-medium text-slate-500">标签筛选：</span>
          {ALL_TAGS.map((t) => (
            <button key={t} onClick={() => toggle(t)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-all hover:scale-105 ${
                active.includes(t)
                  ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-sm"
                  : "border border-sky-200 bg-white text-slate-600 hover:border-sky-300 hover:text-sky-600"
              }`}>{t}</button>
          ))}
          {active.length > 0 && (
            <button onClick={() => setActive([])} className="ml-2 text-xs text-sky-500 underline">清空</button>
          )}
        </div>
      </section>

      <div className="mb-4 text-sm text-slate-500">共 {filtered.length} 个可在线体验场景</div>

      <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((s, i) => (
          <article key={s.id}
            className="group animate-fade-in overflow-hidden rounded-2xl border border-sky-100 bg-white/85 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-200/50"
            style={{ animationDelay: `${i * 40}ms`, animationFillMode: "backwards" }}>
            <div className={`relative h-32 bg-gradient-to-br ${s.cover} overflow-hidden`}>
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:20px_20px]" />
              <Boxes className="absolute left-4 top-4 h-7 w-7 text-white/90" />
              <span className="absolute bottom-3 left-4 rounded-full bg-white/30 px-2.5 py-0.5 text-[11px] font-medium text-white backdrop-blur">{s.domain}</span>
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-slate-900 group-hover:text-sky-600 line-clamp-1">{s.name}</h3>
              <p className="mt-1 text-xs text-slate-500">{s.vendor}</p>
              <p className="mt-2 text-xs text-slate-500 line-clamp-2">{s.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {s.tags.map((t) => (
                  <span key={t} className="rounded-md bg-sky-50 px-2 py-0.5 text-[11px] text-sky-700 ring-1 ring-sky-100">{t}</span>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-sky-50 pt-3 text-xs text-slate-500">
                <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{s.users.toLocaleString()}</span>
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{s.duration}</span>
              </div>
              <button onClick={() => setRunning(s)}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-sky-300/40 transition-all hover:shadow-lg hover:shadow-sky-400/50 hover:brightness-110">
                <Play className="h-4 w-4" />
                在线体验
              </button>
            </div>
          </article>
        ))}
      </section>

      {running && <ExperienceModal scene={running} onClose={() => setRunning(null)} />}
    </main>
  );
}

function ExperienceModal({ scene, onClose }: { scene: Scene; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm animate-fade-in p-4"
      onClick={onClose}>
      <div className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-sky-200/40 bg-slate-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div>
            <div className="text-xs text-sky-300">在线体验 · {scene.domain}</div>
            <h3 className="mt-0.5 text-lg font-semibold text-white">{scene.name}</h3>
          </div>
          <button onClick={onClose}
            aria-label="关闭"
            className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 text-white transition-colors hover:bg-white/20">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
          {/* 动态网格背景 */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(56,189,248,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.15)_1px,transparent_1px)] bg-[size:40px_40px]"
            style={{ animation: "grid-move 8s linear infinite" }} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(2,6,23,0.85)_80%)]" />

          {/* 光斑 */}
          <div className="absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl animate-blob" />
          <div className="absolute -right-20 bottom-1/4 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl animate-blob" style={{ animationDelay: "2s" }} />

          {/* 中央加载 */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="relative grid h-24 w-24 place-items-center">
              <div className="absolute inset-0 rounded-full border-2 border-sky-400/30" />
              <div className="absolute inset-0 rounded-full border-t-2 border-sky-400 animate-spin" style={{ animationDuration: "1.4s" }} />
              <div className="absolute inset-3 rounded-full border-2 border-blue-300/20" />
              <div className="absolute inset-3 rounded-full border-b-2 border-blue-300 animate-spin" style={{ animationDuration: "2s", animationDirection: "reverse" }} />
              <Loader2 className="h-8 w-8 text-sky-300 animate-spin" />
            </div>
            <div className="mt-6 text-base font-medium text-white">场景加载中</div>
            <div className="mt-2 flex items-center gap-1.5 text-xs text-sky-200/80">
              <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-sky-300" style={{ animationDelay: "0ms" }} />
              <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-sky-300" style={{ animationDelay: "150ms" }} />
              <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-sky-300" style={{ animationDelay: "300ms" }} />
              <span className="ml-2">正在拉起孪生体、初始化渲染管线、注入实时数据流</span>
            </div>

            {/* 进度条 */}
            <div className="mt-6 h-1 w-64 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-1/3 rounded-full bg-gradient-to-r from-sky-400 to-blue-500"
                style={{ animation: "loader-slide 1.6s ease-in-out infinite" }} />
            </div>
          </div>

          <style>{`
            @keyframes loader-slide {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(300%); }
            }
          `}</style>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-white/10 bg-slate-900/80 px-6 py-3 text-xs text-slate-400">
          <div className="flex items-center gap-4">
            <span>厂商：{scene.vendor}</span>
            <span>预计时长：{scene.duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            <span>体验通道已建立</span>
          </div>
        </div>
      </div>
    </div>
  );
}
