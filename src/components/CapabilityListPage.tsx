import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, Download, Tag, Boxes } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { StatGrid, type Stat } from "@/components/StatGrid";
import type { Capability } from "@/lib/capability-data";

export function CapabilityListPage({
  eyebrow, title, highlight, description, items, icon: Icon = Boxes, slug,
}: {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  items: Capability[];
  icon?: LucideIcon;
  slug: string;
}) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState<string[]>([]);

  const allTags = useMemo(() => Array.from(new Set(items.flatMap((i) => i.tags))).sort(), [items]);

  const filtered = useMemo(() => items.filter((it) => {
    const mq = !q || it.name.includes(q) || it.vendor.includes(q);
    const mt = active.length === 0 || active.every((t) => it.tags.includes(t));
    return mq && mt;
  }), [items, q, active]);

  const stats: Stat[] = [
    { label: "能力总数", value: items.length, icon: Boxes, color: "from-sky-500 to-blue-500" },
    { label: "厂商数量", value: new Set(items.map((i) => i.vendor)).size, icon: Tag, color: "from-cyan-500 to-sky-500" },
    { label: "总下载量", value: items.reduce((s, i) => s + i.downloads, 0).toLocaleString(), icon: Download, color: "from-blue-500 to-indigo-500" },
    { label: "技术标签", value: allTags.length, icon: Tag, color: "from-indigo-500 to-blue-500" },
  ];

  const toggle = (t: string) => setActive((p) => p.includes(t) ? p.filter((x) => x !== t) : [...p, t]);

  return (
    <main className="relative mx-auto max-w-7xl px-6 py-12">
      <PageHeader eyebrow={eyebrow} title={title} highlight={highlight} description={description} />
      <StatGrid stats={stats} />

      <section className="mb-6 rounded-2xl border border-sky-100 bg-white/80 p-5 shadow-sm backdrop-blur animate-fade-in">
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sky-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="搜索能力名称 / 厂商"
            className="w-full rounded-xl border border-sky-200 bg-white/80 py-2.5 pl-10 pr-4 text-sm outline-none transition-all focus:border-sky-400 focus:ring-4 focus:ring-sky-100" />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {allTags.map((t) => (
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

      <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((it, i) => (
          <article key={it.id}
            className="group relative animate-fade-in overflow-hidden rounded-2xl border border-sky-100 bg-white/85 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-200/50"
            style={{ animationDelay: `${i * 50}ms`, animationFillMode: "backwards" }}>
            <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 opacity-10 transition-transform duration-500 group-hover:scale-150" />
            <div className="flex items-start gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 shadow-md shadow-sky-300/50">
                <Icon className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-mono text-[11px] text-sky-500">{it.id}</div>
                <h3 className="font-semibold text-slate-900 group-hover:text-sky-600">{it.name}</h3>
                <p className="text-xs text-slate-500">{it.vendor} · {it.version}</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-600 line-clamp-2">{it.description}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {it.tags.map((t) => (
                <span key={t} className="rounded-md bg-sky-50 px-2 py-0.5 text-[11px] text-sky-700 ring-1 ring-sky-100">{t}</span>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-sky-50 pt-3 text-xs text-slate-500">
              <span className="flex items-center gap-1"><Download className="h-3.5 w-3.5" />{it.downloads.toLocaleString()}</span>
              <button className="rounded-lg bg-sky-50 px-3 py-1 font-medium text-sky-700 transition-colors hover:bg-sky-100">查看详情</button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
