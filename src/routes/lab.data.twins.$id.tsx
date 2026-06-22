import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { TWINS } from "@/lib/data-assets";
import { ArrowLeft, ChevronRight, Boxes, Cpu, Building2, Tag, Activity, Wrench, ShieldCheck, Calendar, DollarSign } from "lucide-react";

export const Route = createFileRoute("/lab/data/twins/$id")({
  head: ({ params }) => {
    const t = TWINS.find((x) => x.id === params.id);
    return { meta: [{ title: `${t?.name ?? "孪生体详情"} — 可归集孪生体资产` }] };
  },
  component: TwinDetail,
});

function TwinDetail() {
  const { id } = Route.useParams();
  const t = TWINS.find((x) => x.id === id);
  if (!t) throw notFound();

  const related = TWINS.filter((x) => x.id !== t.id && x.category === t.category).slice(0, 3);

  // 模拟实时遥测
  const telemetry = [
    { label: "运行状态", value: "在线", tone: "emerald" as const },
    { label: "健康度", value: "94%", tone: "sky" as const },
    { label: "采集频率", value: "1 Hz", tone: "blue" as const },
    { label: "最近上报", value: "2 秒前", tone: "indigo" as const },
  ];

  return (
    <main className="relative mx-auto max-w-7xl px-6 py-10">
      <nav className="mb-6 flex items-center gap-1.5 text-xs text-slate-500">
        <Link to="/" className="hover:text-sky-600">首页</Link>
        <ChevronRight className="h-3 w-3" /><span>数据资产中心</span>
        <ChevronRight className="h-3 w-3" />
        <Link to="/lab/data/twins" className="hover:text-sky-600">可归集孪生体资产</Link>
        <ChevronRight className="h-3 w-3" /><span className="text-slate-700">{t.name}</span>
      </nav>

      <header className={`relative overflow-hidden rounded-3xl border border-sky-100 bg-gradient-to-br ${t.thumbnail} p-8 text-white shadow-xl shadow-sky-200/40 animate-fade-in`}>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/15 blur-3xl" />
        <Link to="/lab/data/twins" className="relative mb-4 inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur transition hover:bg-white/25">
          <ArrowLeft className="h-3 w-3" />返回孪生体列表
        </Link>
        <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="font-mono text-xs opacity-80">{t.id} · {t.category}</div>
            <h1 className="mt-1 text-3xl font-bold tracking-tight">{t.name}</h1>
            <p className="mt-2 inline-flex items-center gap-1 text-sm opacity-90"><Building2 className="h-4 w-4" />{t.owner}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {t.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-white/15 px-3 py-1 text-xs backdrop-blur">{tag}</span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 md:w-72">
            {telemetry.map((m) => (
              <div key={m.label} className="rounded-xl bg-white/15 px-3 py-2 text-xs backdrop-blur ring-1 ring-white/20">
                <div className="opacity-80">{m.label}</div>
                <div className="mt-0.5 font-mono text-base font-semibold">{m.value}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* 物理属性 */}
        <section className="rounded-2xl border border-sky-100 bg-white/85 p-6 shadow-sm backdrop-blur animate-fade-in">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-sky-600">
            <Cpu className="h-4 w-4" />物理属性
          </h2>
          <dl className="space-y-3 text-sm">
            <PropRow k="材质" v={t.physical.material} icon={<Wrench className="h-3.5 w-3.5" />} />
            <PropRow k="质量" v={t.physical.weight} />
            <PropRow k="尺寸" v={t.physical.dimension} />
            {t.physical.power && <PropRow k="额定功率" v={t.physical.power} icon={<Activity className="h-3.5 w-3.5" />} />}
          </dl>
        </section>

        {/* 业务属性 */}
        <section className="rounded-2xl border border-sky-100 bg-white/85 p-6 shadow-sm backdrop-blur animate-fade-in" style={{ animationDelay: "60ms", animationFillMode: "backwards" }}>
          <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
            <Tag className="h-4 w-4" />业务属性
          </h2>
          <dl className="space-y-3 text-sm">
            <PropRow k="所属行业" v={t.business.industry} />
            <PropRow k="典型用途" v={t.business.usage} />
            <PropRow k="生命周期" v={t.business.lifecycle} icon={<Calendar className="h-3.5 w-3.5" />} />
            <PropRow k="参考价格" v={t.business.price} icon={<DollarSign className="h-3.5 w-3.5" />} />
          </dl>
        </section>

        {/* 接入与合规 */}
        <section className="rounded-2xl border border-sky-100 bg-white/85 p-6 shadow-sm backdrop-blur animate-fade-in" style={{ animationDelay: "120ms", animationFillMode: "backwards" }}>
          <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-indigo-600">
            <ShieldCheck className="h-4 w-4" />接入与合规
          </h2>
          <dl className="space-y-3 text-sm">
            <PropRow k="通信协议" v="MQTT 5.0 / OPC UA" />
            <PropRow k="数据频率" v="1 ~ 10 Hz 可配" />
            <PropRow k="安全认证" v="国密 SM2/SM4" />
            <PropRow k="模型版本" v="DTDL v3" />
          </dl>
        </section>
      </div>

      {/* 详细介绍 */}
      <section className="mt-6 rounded-2xl border border-sky-100 bg-white/85 p-6 shadow-sm backdrop-blur animate-fade-in">
        <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-slate-900"><Boxes className="h-4 w-4 text-sky-500" />详细介绍</h2>
        <p className="text-sm leading-relaxed text-slate-600">
          <strong className="text-slate-800">{t.name}</strong> 是由 <em className="not-italic text-slate-700">{t.owner}</em> 归集的「{t.category}」类孪生体资产，
          主要服务于 {t.business.industry} 行业的 {t.business.usage} 场景。该孪生体由 {t.physical.material} 材质构成，
          尺寸 {t.physical.dimension}，质量 {t.physical.weight}
          {t.physical.power ? `，额定功率 ${t.physical.power}` : ""}。
          设计生命周期 {t.business.lifecycle}，参考采购价 {t.business.price}。
          孪生体已按 DTDL v3 标准建模，可即插即用地接入城市级数字孪生底座或行业仿真平台，
          通过 MQTT/OPC UA 协议实时同步物理对象的运行数据，支持远程监控、故障预测与生命周期管理。
        </p>
      </section>

      {/* 同类推荐 */}
      {related.length > 0 && (
        <section className="mt-6">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900"><Boxes className="h-4 w-4 text-sky-500" />同类孪生体</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <Link key={r.id} to="/lab/data/twins/$id" params={{ id: r.id }}
                className="group overflow-hidden rounded-2xl border border-sky-100 bg-white/85 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
                <div className={`h-20 bg-gradient-to-br ${r.thumbnail}`} />
                <div className="p-4">
                  <div className="font-mono text-[11px] text-sky-500">{r.id}</div>
                  <div className="truncate font-medium text-slate-900 group-hover:text-sky-600">{r.name}</div>
                  <div className="truncate text-xs text-slate-500">{r.owner}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

function PropRow({ k, v, icon }: { k: string; v: string; icon?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-sky-50 pb-2 last:border-0">
      <dt className="flex items-center gap-1 text-slate-500">{icon}{k}</dt>
      <dd className="text-right font-medium text-slate-800">{v}</dd>
    </div>
  );
}
