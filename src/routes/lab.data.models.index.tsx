import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Boxes, Download, Eye, Tag, Layers } from "lucide-react";
import { MODELS } from "@/lib/data-assets";
import { PageHeader } from "@/components/PageHeader";
import { StatGrid } from "@/components/StatGrid";
import { useModelPreview } from "@/components/ModelPreview";

export const Route = createFileRoute("/lab/data/models/")({
  head: () => ({ meta: [{ title: "三维模型库 — 数据资产中心" }] }),
  component: ModelsPage,
});

function ModelsPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("全部");
  const preview = useModelPreview();

  const categories = useMemo(() => ["全部", ...Array.from(new Set(MODELS.map((m) => m.category)))], []);
  const filtered = useMemo(() => MODELS.filter((m) => {
    const mq = !q || m.name.includes(q);
    const mc = cat === "全部" || m.category === cat;
    return mq && mc;
  }), [q, cat]);

  return (
    <main className="relative mx-auto max-w-7xl px-6 py-12">
      <PageHeader eyebrow="数据资产中心" title="三维" highlight="模型库"
        description="高质量的三维模型资产，支持在线预览、下载与场景集成。" />
      <StatGrid stats={[
        { label: "模型总数", value: MODELS.length, icon: Boxes, color: "from-sky-500 to-blue-500" },
        { label: "覆盖分类", value: categories.length - 1, icon: Layers, color: "from-cyan-500 to-sky-500" },
        { label: "总三角面数", value: "2.7M+", icon: Tag, color: "from-blue-500 to-indigo-500" },
        { label: "总下载量", value: "48,210", icon: Download, color: "from-indigo-500 to-blue-500" },
      ]} />

      <section className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sky-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="搜索模型名称"
            className="w-full rounded-xl border border-sky-200 bg-white/80 py-2.5 pl-10 pr-4 text-sm outline-none transition-all focus:border-sky-400 focus:ring-4 focus:ring-sky-100" />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button key={c} onClick={() => setCat(c)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-all hover:scale-105 ${
                cat === c
                  ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-sm"
                  : "border border-sky-200 bg-white text-slate-600 hover:border-sky-300 hover:text-sky-600"
              }`}>{c}</button>
          ))}
        </div>
      </section>

      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((m, i) => (
          <article key={m.id}
            className="group relative animate-fade-in overflow-hidden rounded-2xl border border-sky-100 bg-white/85 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-200/50"
            style={{ animationDelay: `${i * 40}ms`, animationFillMode: "backwards" }}>
            <div className="relative h-36 overflow-hidden bg-gradient-to-br from-sky-50 via-white to-blue-50">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(14,165,233,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,165,233,0.18)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)]" />
              <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-2xl animate-spin-slow"
                style={{ background: `radial-gradient(circle at 35% 30%, ${m.color}cc, ${m.color}55 60%, ${m.color}11 80%)`, boxShadow: `0 10px 30px ${m.color}55` }} />
            </div>
            <div className="p-5">
              <div className="font-mono text-[11px] text-sky-500">{m.id}</div>
              <h3 className="font-semibold text-slate-900 group-hover:text-sky-600">{m.name}</h3>
              <div className="mt-1 text-xs text-slate-500">{m.category} · {m.format} · {m.size}</div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {m.tags.map((t) => (
                  <span key={t} className="rounded-md bg-sky-50 px-2 py-0.5 text-[11px] text-sky-700 ring-1 ring-sky-100">{t}</span>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                <button onClick={() => preview.open(m)} className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 px-3 py-2 text-xs font-semibold text-white shadow-md transition-all hover:-translate-y-0.5">
                  <Eye className="h-3.5 w-3.5" /> 预览
                </button>
                <button className="flex items-center justify-center gap-1.5 rounded-lg bg-sky-50 px-3 py-2 text-xs font-medium text-sky-700 hover:bg-sky-100">
                  <Download className="h-3.5 w-3.5" /> 下载
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      {preview.node}
    </main>
  );
}
