import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Search, ArrowRight, Newspaper, Flame, Boxes, Database,
  Layers, ClipboardList, Lightbulb, Target, Rocket, Award,
} from "lucide-react";
import { Reveal, CountUp } from "@/components/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "数字孪生场景创新公共服务平台" },
      { name: "description", content: "数字孪生场景创新公共服务平台 —— 汇聚全国场景建设需求，加速供需对接与创新落地。" },
      { property: "og:title", content: "数字孪生场景创新公共服务平台" },
      { property: "og:description", content: "场景创新，从这里开始。" },
    ],
  }),
  component: Index,
});

// Hero point cloud / grid
const SPLATS = Array.from({ length: 90 }, (_, i) => {
  const seed = (n: number) => {
    const x = Math.sin(i * 999.13 + n) * 43758.5453;
    return x - Math.floor(x);
  };
  return {
    left: seed(1) * 100,
    top: seed(2) * 100,
    size: 6 + seed(3) * 28,
    dx: (seed(4) - 0.5) * 40,
    dy: (seed(5) - 0.5) * 40,
    delay: seed(6) * 6,
    dur: 4 + seed(7) * 6,
    hue: 195 + Math.floor(seed(8) * 45),
    opacity: 0.25 + seed(9) * 0.5,
    rot: Math.floor(seed(10) * 180),
  };
});

function HeroPointCloud() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-x-0 bottom-0 h-[80%] [perspective:800px]">
        <div className="absolute inset-0 origin-bottom animate-gs-grid [transform:rotateX(64deg)_scale(1.4)_translateZ(0)] [backface-visibility:hidden] bg-[linear-gradient(to_right,rgba(14,165,233,0.7)_1.5px,transparent_1.5px),linear-gradient(to_bottom,rgba(37,99,235,0.7)_1.5px,transparent_1.5px)] bg-[size:64px_64px] [mask-image:linear-gradient(to_top,black_25%,rgba(0,0,0,0.85)_45%,transparent_72%)]" />
      </div>
      <div className="absolute left-1/2 top-1/2 h-[680px] w-[680px] -translate-x-1/2 -translate-y-1/2 animate-gs-orbit rounded-full border border-sky-200/40 [mask-image:radial-gradient(circle,black_55%,transparent_72%)]">
        <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-sky-400 shadow-[0_0_18px_4px_rgba(56,189,248,0.7)]" />
        <div className="absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-blue-400 shadow-[0_0_14px_3px_rgba(59,130,246,0.6)]" />
      </div>
      <div className="absolute inset-0">
        {SPLATS.map((s, i) => (
          <span
            key={i}
            className="absolute rounded-full animate-gs-drift"
            style={{
              left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size * 0.62,
              background: `radial-gradient(ellipse at center, hsla(${s.hue},90%,65%,0.95) 0%, hsla(${s.hue},90%,60%,0.4) 45%, hsla(${s.hue},90%,55%,0) 75%)`,
              filter: "blur(0.3px)", transform: `rotate(${s.rot}deg)`,
              ["--gs-x" as string]: `${s.dx}px`, ["--gs-y" as string]: `${s.dy}px`,
              ["--gs-o" as string]: `${s.opacity}`,
              animationDelay: `${s.delay}s`, animationDuration: `${s.dur}s`,
            }}
          />
        ))}
      </div>
      <div className="absolute inset-y-0 left-0 w-1/3 animate-gs-sweep bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/20" />
    </div>
  );
}

function Hero() {
  const [q, setQ] = useState("");
  const scrollDown = () => {
    document.getElementById("news")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <section className="relative isolate flex min-h-[calc(100vh-4rem)] flex-col overflow-hidden border-b border-sky-100">
      <HeroPointCloud />
      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <h1 className="animate-fade-in text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-6xl"
          style={{ animationDelay: "80ms", animationFillMode: "backwards" }}>
          数字孪生
          <span className="bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent">场景创新</span>
          公共服务平台
        </h1>
        <p className="mt-5 animate-fade-in text-base text-slate-600 sm:text-lg"
          style={{ animationDelay: "160ms", animationFillMode: "backwards" }}>
          场景创新，从这里开始
        </p>
        <form onSubmit={(e) => { e.preventDefault(); scrollDown(); }}
          className="mt-10 flex w-full max-w-2xl animate-fade-in flex-col gap-3 sm:flex-row"
          style={{ animationDelay: "240ms", animationFillMode: "backwards" }}>
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-sky-400" />
            <input value={q} onChange={(e) => setQ(e.target.value)}
              placeholder="搜索场景、能力组件、数据资产…"
              className="h-14 w-full rounded-2xl border border-sky-200 bg-white/90 pl-12 pr-4 text-base shadow-lg shadow-sky-200/40 outline-none backdrop-blur transition-all placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100" />
          </div>
          <button type="submit"
            className="group inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 px-8 text-base font-semibold text-white shadow-lg shadow-sky-300/50 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-sky-400/50">
            点击探索 <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </form>
      </div>
      <button onClick={scrollDown} aria-label="向下滚动"
        className="group relative mx-auto mb-8 flex h-12 w-8 items-center justify-center rounded-full border-2 border-sky-400/60 text-sky-500 transition-colors hover:border-sky-500">
        <span className="absolute top-2 h-2 w-1 animate-bounce rounded-full bg-sky-500" />
      </button>
    </section>
  );
}

const NEWS = [
  { tag: "政策", date: "2026-06-12", title: "国家发改委印发《数字孪生城市建设指引(2026)》", desc: "明确未来三年城市级数字孪生建设的重点任务与配套政策。", color: "from-sky-400 to-blue-500" },
  { tag: "技术", date: "2026-06-08", title: "3DGS 高斯泼溅技术在城市重建落地新进展", desc: "多家厂商在城市级场景中实现千平米级实时高斯泼溅重建。", color: "from-cyan-400 to-sky-500" },
  { tag: "产业", date: "2026-06-02", title: "全国首批场景创新示范基地名单发布", desc: "12 个城市入选首批数字孪生场景创新示范基地。", color: "from-indigo-400 to-blue-500" },
  { tag: "活动", date: "2026-05-28", title: "2026 中国数字孪生大会即将开幕", desc: "聚焦城市、工业、文旅三大领域的场景创新最新实践。", color: "from-blue-400 to-cyan-500" },
];

const HOT_SCENES = [
  { name: "城市交通智能调度", domain: "智慧交通", tags: ["3DGS", "高精地图"] },
  { name: "智慧园区能耗管控", domain: "智慧园区", tags: ["IoT", "BIM"] },
  { name: "工业产线孪生", domain: "智能制造", tags: ["MES", "VR"] },
  { name: "数字文旅景区导览", domain: "智慧文旅", tags: ["AR", "数字人"] },
  { name: "雄安零碳园区", domain: "智慧能源", tags: ["零碳", "光伏"] },
  { name: "城市低空航路调度", domain: "低空经济", tags: ["无人机", "调度"] },
];

const OVERVIEW = [
  { label: "通用能力组件", value: 1280, suffix: "+", icon: Boxes, color: "from-sky-500 to-blue-500" },
  { label: "通用能力平台", value: 320, suffix: "+", icon: Layers, color: "from-cyan-500 to-sky-500" },
  { label: "三维模型库", value: 8640, suffix: "+", icon: Database, color: "from-blue-500 to-indigo-500" },
  { label: "高质量数据集", value: 560, suffix: "+", icon: ClipboardList, color: "from-indigo-500 to-sky-500" },
  { label: "孪生体资产", value: 2180, suffix: "+", icon: Boxes, color: "from-sky-500 to-cyan-500" },
  { label: "AI+孪生能力", value: 740, suffix: "+", icon: Lightbulb, color: "from-blue-500 to-sky-500" },
];

const SERVICES = [
  { icon: Layers, title: "场景体系设计", desc: "规划、图谱、顶层架构。" },
  { icon: Target, title: "场景挖掘与策划", desc: "机会清单 + 能力清单。" },
  { icon: Boxes, title: "场景建设与验证", desc: "多方共建、快速迭代。" },
  { icon: Award, title: "场景示范与转化", desc: "产品化、标准化。" },
  { icon: Rocket, title: "场景推广与产业化", desc: "孵化、培育、生态。" },
];

const PARTNERS = [
  "中科云栈", "百度 Apollo", "腾讯 WeCity", "华为云", "阿里云", "51World",
  "商汤科技", "海尔卡奥斯", "宁德时代", "中车四方", "金风科技", "千寻位置",
];

function Index() {
  return (
    <>
      <Hero />

      {/* 行业资讯 */}
      <section id="news" className="relative mx-auto max-w-7xl px-6 py-20">
        <Reveal variant="fade-up" className="mb-10 flex items-end justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/70 px-4 py-1.5 text-xs font-medium text-sky-700 shadow-sm backdrop-blur">
              <Newspaper className="h-3.5 w-3.5" /> 行业资讯
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">前沿动态 · 把握趋势</h2>
          </div>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {NEWS.map((n, i) => (
            <Reveal key={n.title} variant={i % 2 === 0 ? "slide-left" : "slide-right"} delay={i * 100} duration={850} as="article"
              className="group overflow-hidden rounded-2xl border border-sky-100 bg-white/80 shadow-sm backdrop-blur hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-200/50">
              <div className={`relative h-32 bg-gradient-to-br ${n.color} overflow-hidden`}>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:18px_18px]" />
                <span className="absolute left-4 top-4 rounded-full bg-white/30 px-3 py-0.5 text-xs font-medium text-white backdrop-blur">{n.tag}</span>
              </div>
              <div className="p-5">
                <div className="text-xs text-slate-400">{n.date}</div>
                <h3 className="mt-2 font-semibold text-slate-900 transition-colors group-hover:text-sky-600 line-clamp-2">{n.title}</h3>
                <p className="mt-2 text-sm text-slate-500 line-clamp-2">{n.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 热门场景 */}
      <section className="relative mx-auto max-w-7xl px-6 py-16">
        <Reveal variant="fade-up" className="mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/70 px-4 py-1.5 text-xs font-medium text-sky-700 shadow-sm backdrop-blur">
            <Flame className="h-3.5 w-3.5" /> 热门场景
          </div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">实时聚焦 · 高价值场景</h2>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {HOT_SCENES.map((s, i) => (
            <Reveal key={s.name} variant={i % 3 === 0 ? "slide-left" : i % 3 === 1 ? "slide-up" : "slide-right"} delay={i * 90} duration={900}>
              <Link to="/lab/plaza"
                className="group relative block overflow-hidden rounded-2xl border border-sky-100 bg-white/80 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-200/50">
                <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 opacity-10 transition-transform duration-500 group-hover:scale-150" />
                <Boxes className="mb-3 h-6 w-6 text-sky-500" />
                <h3 className="text-lg font-semibold text-slate-900 group-hover:text-sky-600">{s.name}</h3>
                <p className="mt-1 text-xs text-slate-500">{s.domain}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {s.tags.map((t) => (
                    <span key={t} className="rounded-md bg-sky-50 px-2 py-0.5 text-[11px] text-sky-700 ring-1 ring-sky-100">{t}</span>
                  ))}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 资产总览 */}
      <section className="relative mx-auto max-w-7xl px-6 py-16">
        <Reveal variant="fade-up" className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/70 px-4 py-1.5 text-xs font-medium text-sky-700 shadow-sm backdrop-blur">
            <Database className="h-3.5 w-3.5" /> 组件 / 数据资产总览
          </div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">沉淀能力 · 赋能场景</h2>
        </Reveal>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
          {OVERVIEW.map((o, i) => (
            <Reveal key={o.label} variant={i % 2 === 0 ? "slide-down" : "slide-up"} delay={i * 90} duration={800}
              className="group relative overflow-hidden rounded-2xl border border-sky-100 bg-white/80 p-5 shadow-sm backdrop-blur hover:-translate-y-1 hover:shadow-lg hover:shadow-sky-200/50">
              <div className={`absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gradient-to-br ${o.color} opacity-10 transition-transform duration-500 group-hover:scale-150`} />
              <o.icon className="mb-3 h-5 w-5 text-sky-500" />
              <div className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-2xl font-bold text-transparent">
                <CountUp end={o.value} suffix={o.suffix} />
              </div>
              <div className="mt-1 text-xs text-slate-500">{o.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 专业服务 */}
      <section className="relative mx-auto max-w-7xl px-6 py-16">
        <Reveal variant="fade-up" className="mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/70 px-4 py-1.5 text-xs font-medium text-sky-700 shadow-sm backdrop-blur">
            <Lightbulb className="h-3.5 w-3.5" /> 专业服务
          </div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">场景创新全过程服务体系</h2>
          <p className="mt-2 text-slate-600">覆盖场景五大生命周期，提供端到端的专业服务。</p>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-5">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} variant="slide-right" delay={i * 130} duration={900}>
              <Link to="/promotion/lifecycle"
                className="group relative block overflow-hidden rounded-2xl border border-sky-100 bg-white/80 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-200/50">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 shadow-md shadow-sky-300/50 transition-transform group-hover:scale-110">
                  <s.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-xs font-mono text-sky-500">0{i + 1}</div>
                <h3 className="mt-1 font-semibold text-slate-900 group-hover:text-sky-600">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-500">{s.desc}</p>
                <ArrowRight className="absolute right-4 top-4 h-4 w-4 text-sky-400 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 生态圈 logo marquee */}
      <section className="relative mx-auto max-w-7xl px-6 py-16">
        <Reveal variant="fade-up" className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/70 px-4 py-1.5 text-xs font-medium text-sky-700 shadow-sm backdrop-blur">
            创新中心生态圈
          </div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">汇聚伙伴 · 共建场景</h2>
        </Reveal>
        <Reveal variant="fade" className="relative overflow-hidden rounded-2xl border border-sky-100 bg-white/60 py-8 backdrop-blur [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-marquee gap-12 px-6">
            {[...PARTNERS, ...PARTNERS].map((p, i) => (
              <div key={i} className="flex h-16 w-44 shrink-0 items-center justify-center gap-2 rounded-xl border border-sky-100 bg-white/80 px-4 text-sm font-semibold text-slate-700 shadow-sm">
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-sky-500 to-blue-600">
                  <Boxes className="h-4 w-4 text-white" />
                </div>
                {p}
              </div>
            ))}
          </div>
        </Reveal>
      </section>


      <footer className="relative mt-12 border-t border-sky-100/80 bg-white/40 py-8 text-center text-xs text-slate-400 backdrop-blur">
        © 2026 数字孪生场景创新公共服务平台 · 场景创新，从这里开始
      </footer>
    </>
  );
}
