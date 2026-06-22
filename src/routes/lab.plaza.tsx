import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Share2, Eye, GitFork, Tag, Search, Boxes, Sparkles } from "lucide-react";
import { SCENES, ALL_TAGS, ONLINE_TAG } from "@/lib/plaza-data";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/lab/plaza")({
  head: () => ({ meta: [{ title: "场景创新广场 — 场景创新实验室" }] }),
  validateSearch: (s: Record<string, unknown>) => ({ tag: typeof s.tag === "string" ? s.tag : undefined }),
  component: PlazaPage,
});

function PlazaPage() {
  const { tag: initialTag } = Route.useSearch();
  const [active, setActive] = useState<string[]>(initialTag ? [initialTag] : []);
  const [q, setQ] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  useEffect(() => { if (initialTag && !active.includes(initialTag)) setActive([initialTag]); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [initialTag]);

  const filtered = useMemo(() => SCENES.filter((s) => {
    const mq = !q || s.name.includes(q) || s.vendor.includes(q) || s.domain.includes(q);
    const mt = active.length === 0 || active.every((t) => s.tags.includes(t));
    return mq && mt;
  }), [q, active]);

  const toggle = (t: string) => setActive((p) => p.includes(t) ? p.filter((x) => x !== t) : [...p, t]);

  const share = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}/lab/plaza/${id}`;
    navigator.clipboard?.writeText(url).catch(() => {});
    setToast("场景链接已复制到剪贴板");
    setTimeout(() => setToast(null), 2200);
  };

  return (
    <main className="relative mx-auto max-w-7xl px-6 py-12">
      <PageHeader
        eyebrow="场景创新实验室"
        title="场景创新"
        highlight="广场"
        description="汇聚行业领先的数字孪生场景案例，按标签自由筛选，一键转发到协作伙伴。"
      />

      {/* 搜索 + 标签 */}
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
          {ALL_TAGS.map((t) => {
            const isOn = active.includes(t);
            const isExp = t === ONLINE_TAG;
            return (
              <button key={t} onClick={() => toggle(t)}
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition-all hover:scale-105 ${
                  isOn
                    ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-sm"
                    : isExp
                      ? "border border-emerald-300 bg-emerald-50 text-emerald-700 hover:border-emerald-400"
                      : "border border-sky-200 bg-white text-slate-600 hover:border-sky-300 hover:text-sky-600"
                }`}>
                {isExp && <Sparkles className="h-3 w-3" />}{t}
              </button>
            );
          })}
          {active.length > 0 && (
            <button onClick={() => setActive([])} className="ml-2 text-xs text-sky-500 underline">清空</button>
          )}
        </div>
      </section>

      <div className="mb-4 text-sm text-slate-500">共 {filtered.length} 个场景</div>

      <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((s, i) => (
          <Link key={s.id} to="/lab/plaza/$id" params={{ id: s.id }}
            className="group relative animate-fade-in overflow-hidden rounded-2xl border border-sky-100 bg-white/85 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-200/50"
            style={{ animationDelay: `${i * 40}ms`, animationFillMode: "backwards" }}>
            <div className={`relative h-32 bg-gradient-to-br ${s.cover} overflow-hidden`}>
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:20px_20px]" />
              <Boxes className="absolute left-4 top-4 h-7 w-7 text-white/90" />
              <button onClick={(e) => share(e, s.id)}
                aria-label="转发"
                className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-lg bg-white/30 text-white backdrop-blur transition-all hover:scale-110 hover:bg-white/50">
                <Share2 className="h-4 w-4" />
              </button>
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
                <span className="flex items-center gap-1"><Eye className="h-3.5 w-3.5" />{s.views.toLocaleString()}</span>
                <span className="flex items-center gap-1"><GitFork className="h-3.5 w-3.5" />{s.forks}</span>
                <span className="font-semibold text-sky-600">查看详情 →</span>
              </div>
            </div>
          </Link>
        ))}
      </section>

      {toast && (
        <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 animate-fade-in rounded-xl bg-slate-900/90 px-5 py-3 text-sm text-white shadow-2xl backdrop-blur">
          {toast}
        </div>
      )}
    </main>
  );
}
