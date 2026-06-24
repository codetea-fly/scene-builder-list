import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Tag, Play, Boxes, Users, Clock, X, Loader2, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { SCENES, ONLINE_TAG, type Scene } from "@/lib/plaza-data";

export const Route = createFileRoute("/demo/online")({
  head: () => ({ meta: [{ title: "在线体验中心 — 场景示范体验中心" }] }),
  component: OnlineExperiencePage,
});

function OnlineExperiencePage() {
  const [q, setQ] = useState("");
  const [active, setActive] = useState<string[]>([]);
  const [running, setRunning] = useState<Scene | null>(null);

  // 仅展示「场景创新广场」中带「在线体验」标签的场景
  const pool = useMemo(() => SCENES.filter((s) => s.tags.includes(ONLINE_TAG)), []);
  const tags = useMemo(
    () => Array.from(new Set(pool.flatMap((s) => s.tags.filter((t) => t !== ONLINE_TAG)))),
    [pool],
  );
  const filtered = useMemo(() => pool.filter((s) => {
    const mq = !q || s.name.includes(q) || s.vendor.includes(q) || s.domain.includes(q);
    const mt = active.length === 0 || active.every((t) => s.tags.includes(t));
    return mq && mt;
  }), [q, active, pool]);

  const toggle = (t: string) => setActive((p) => p.includes(t) ? p.filter((x) => x !== t) : [...p, t]);

  return (
    <main className="relative mx-auto max-w-7xl px-6 py-12">
      <PageHeader
        eyebrow="场景示范体验中心"
        title="在线"
        highlight="体验中心"
        description="精选「场景创新广场」中支持在线体验的孪生场景，点击「在线体验」即刻沉浸式进入孪生世界。"
      />

      <div className="mb-6 flex items-center justify-between rounded-2xl border border-emerald-200/60 bg-gradient-to-r from-emerald-50 via-sky-50 to-white p-4 text-sm text-slate-600 animate-fade-in">
        <span>
          以下场景由「场景创新广场」中应用 <span className="font-semibold text-emerald-700">在线体验</span> 标签筛选所得，共 <span className="font-semibold text-sky-700">{pool.length}</span> 个。
        </span>
        <Link to="/lab/plaza" search={{ tag: ONLINE_TAG } as never}
          className="inline-flex items-center gap-1 rounded-lg border border-sky-200 bg-white px-3 py-1.5 text-xs font-semibold text-sky-700 hover:bg-sky-50">
          前往场景广场 <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

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
          {tags.map((t) => (
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
              <img src={s.image} alt={s.name} loading="lazy" width={1280} height={768} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/55 via-slate-900/10 to-transparent" />
              <Boxes className="absolute left-4 top-4 h-7 w-7 text-white/90" />
              <span className="absolute bottom-3 left-4 rounded-full bg-white/30 px-2.5 py-0.5 text-[11px] font-medium text-white backdrop-blur">{s.domain}</span>
            </div>
            <div className="p-5">
              <Link to="/lab/plaza/$id" params={{ id: s.id }}
                className="font-semibold text-slate-900 hover:text-sky-600 line-clamp-1">{s.name}</Link>
              <p className="mt-1 text-xs text-slate-500">{s.vendor}</p>
              <p className="mt-2 text-xs text-slate-500 line-clamp-2">{s.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {s.tags.filter((t) => t !== ONLINE_TAG).slice(0, 3).map((t) => (
                  <span key={t} className="rounded-md bg-sky-50 px-2 py-0.5 text-[11px] text-sky-700 ring-1 ring-sky-100">{t}</span>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-sky-50 pt-3 text-xs text-slate-500">
                <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{(s.users ?? 0).toLocaleString()}</span>
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
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(56,189,248,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.15)_1px,transparent_1px)] bg-[size:40px_40px]"
            style={{ animation: "grid-move 8s linear infinite" }} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(2,6,23,0.85)_80%)]" />

          <div className="absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl animate-blob" />
          <div className="absolute -right-20 bottom-1/4 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl animate-blob" style={{ animationDelay: "2s" }} />

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
