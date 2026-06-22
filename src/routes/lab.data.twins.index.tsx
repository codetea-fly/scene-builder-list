import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Boxes, Building2, Tag, Layers, Cpu } from "lucide-react";
import { TWINS } from "@/lib/data-assets";
import { PageHeader } from "@/components/PageHeader";
import { StatGrid } from "@/components/StatGrid";

export const Route = createFileRoute("/lab/data/twins/")({
  head: () => ({ meta: [{ title: "可归集孪生体资产 — 数据资产中心" }] }),
  component: TwinsPage,
});

function TwinsPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("全部");
  const categories = useMemo(() => ["全部", ...Array.from(new Set(TWINS.map((t) => t.category)))], []);

  const filtered = useMemo(() => TWINS.filter((t) => {
    const mq = !q || t.name.includes(q) || t.owner.includes(q);
    const mc = cat === "全部" || t.category === cat;
    return mq && mc;
  }), [q, cat]);

  return (
    <main className="relative mx-auto max-w-7xl px-6 py-12">
      <PageHeader eyebrow="数据资产中心" title="可归集" highlight="孪生体资产"
        description="带有物理属性与业务属性的三维孪生体资产，支持在数字孪生场景中即插即用。" />
      <StatGrid stats={[
        { label: "孪生体资产", value: TWINS.length, icon: Boxes, color: "from-sky-500 to-blue-500" },
        { label: "覆盖分类", value: categories.length - 1, icon: Layers, color: "from-cyan-500 to-sky-500" },
        { label: "拥有方", value: new Set(TWINS.map((t) => t.owner)).size, icon: Building2, color: "from-blue-500 to-indigo-500" },
        { label: "覆盖行业", value: new Set(TWINS.map((t) => t.business.industry)).size, icon: Cpu, color: "from-indigo-500 to-blue-500" },
      ]} />

      <section className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sky-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="搜索资产名称 / 拥有方"
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

      <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((t, i) => (
          <article key={t.id}
            className="group animate-fade-in overflow-hidden rounded-2xl border border-sky-100 bg-white/85 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-200/50"
            style={{ animationDelay: `${i * 50}ms`, animationFillMode: "backwards" }}>
            <div className={`relative h-32 bg-gradient-to-br ${t.thumbnail} overflow-hidden`}>
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:18px_18px]" />
              <Boxes className="absolute left-4 top-4 h-7 w-7 text-white/90 animate-float-y" />
              <span className="absolute right-3 top-3 rounded-full bg-white/30 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur">{t.category}</span>
            </div>
            <div className="p-5">
              <div className="font-mono text-[11px] text-sky-500">{t.id}</div>
              <h3 className="font-semibold text-slate-900 group-hover:text-sky-600">{t.name}</h3>
              <p className="mt-0.5 text-xs text-slate-500 flex items-center gap-1"><Building2 className="h-3 w-3" />{t.owner}</p>

              <div className="mt-4 space-y-3">
                <div className="rounded-xl bg-sky-50/60 p-3 ring-1 ring-sky-100/60">
                  <div className="mb-1.5 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-sky-600"><Cpu className="h-3 w-3" />物理属性</div>
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs text-slate-600">
                    <div><span className="text-slate-400">材质：</span>{t.physical.material}</div>
                    <div><span className="text-slate-400">质量：</span>{t.physical.weight}</div>
                    <div className="col-span-2"><span className="text-slate-400">尺寸：</span>{t.physical.dimension}</div>
                    {t.physical.power && <div><span className="text-slate-400">功率：</span>{t.physical.power}</div>}
                  </div>
                </div>
                <div className="rounded-xl bg-blue-50/60 p-3 ring-1 ring-blue-100/60">
                  <div className="mb-1.5 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-blue-600"><Tag className="h-3 w-3" />业务属性</div>
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs text-slate-600">
                    <div><span className="text-slate-400">行业：</span>{t.business.industry}</div>
                    <div><span className="text-slate-400">用途：</span>{t.business.usage}</div>
                    <div><span className="text-slate-400">生命周期：</span>{t.business.lifecycle}</div>
                    <div><span className="text-slate-400">参考价：</span>{t.business.price}</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {t.tags.map((tag) => (
                  <span key={tag} className="rounded-md bg-sky-50 px-2 py-0.5 text-[11px] text-sky-700 ring-1 ring-sky-100">{tag}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
