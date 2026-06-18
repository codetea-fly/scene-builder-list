import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Download, Heart, Database, Tag, Layers, Calendar } from "lucide-react";
import { DATASETS } from "@/lib/data-assets";
import { PageHeader } from "@/components/PageHeader";
import { StatGrid } from "@/components/StatGrid";

export const Route = createFileRoute("/lab/data/datasets")({
  head: () => ({ meta: [{ title: "高质量数据集 — 数据资产中心" }] }),
  component: DatasetsPage,
});

function DatasetsPage() {
  const [q, setQ] = useState("");
  const [task, setTask] = useState("全部");
  const [license, setLicense] = useState("全部");

  const tasks = useMemo(() => ["全部", ...Array.from(new Set(DATASETS.map((d) => d.task)))], []);
  const licenses = useMemo(() => ["全部", ...Array.from(new Set(DATASETS.map((d) => d.license)))], []);

  const filtered = useMemo(() => DATASETS.filter((d) => {
    const mq = !q || d.name.includes(q) || d.description.includes(q);
    const mt = task === "全部" || d.task === task;
    const ml = license === "全部" || d.license === license;
    return mq && mt && ml;
  }), [q, task, license]);

  return (
    <main className="relative mx-auto max-w-7xl px-6 py-12">
      <PageHeader eyebrow="数据资产中心" title="高质量" highlight="数据集"
        description="覆盖目标检测、语义分割、多模态理解等任务的高质量数据集，支持下载、引用与社区交流。" />
      <StatGrid stats={[
        { label: "数据集总数", value: DATASETS.length, icon: Database, color: "from-sky-500 to-blue-500" },
        { label: "任务类型", value: tasks.length - 1, icon: Layers, color: "from-cyan-500 to-sky-500" },
        { label: "总下载量", value: DATASETS.reduce((s, d) => s + d.downloads, 0).toLocaleString(), icon: Download, color: "from-blue-500 to-indigo-500" },
        { label: "社区点赞", value: DATASETS.reduce((s, d) => s + d.likes, 0).toLocaleString(), icon: Heart, color: "from-indigo-500 to-blue-500" },
      ]} />

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        {/* sidebar */}
        <aside className="space-y-4">
          <div className="rounded-2xl border border-sky-100 bg-white/80 p-4 shadow-sm backdrop-blur">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-sky-600">任务类型</div>
            <div className="flex flex-wrap gap-1.5">
              {tasks.map((t) => (
                <button key={t} onClick={() => setTask(t)}
                  className={`rounded-md px-2.5 py-1 text-xs transition-all ${
                    task === t ? "bg-sky-100 text-sky-700 font-medium" : "text-slate-600 hover:bg-sky-50"
                  }`}>{t}</button>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-sky-100 bg-white/80 p-4 shadow-sm backdrop-blur">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-sky-600">许可协议</div>
            <div className="flex flex-wrap gap-1.5">
              {licenses.map((l) => (
                <button key={l} onClick={() => setLicense(l)}
                  className={`rounded-md px-2.5 py-1 text-xs transition-all ${
                    license === l ? "bg-sky-100 text-sky-700 font-medium" : "text-slate-600 hover:bg-sky-50"
                  }`}>{l}</button>
              ))}
            </div>
          </div>
        </aside>

        <div>
          <div className="relative mb-5">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sky-400" />
            <input value={q} onChange={(e) => setQ(e.target.value)}
              placeholder="搜索数据集 (e.g. city-building-rs)"
              className="w-full rounded-xl border border-sky-200 bg-white/80 py-2.5 pl-10 pr-4 text-sm outline-none transition-all focus:border-sky-400 focus:ring-4 focus:ring-sky-100" />
          </div>

          <div className="space-y-3">
            {filtered.map((d, i) => (
              <article key={d.id}
                className="group animate-fade-in rounded-2xl border border-sky-100 bg-white/85 p-5 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-sky-200/40"
                style={{ animationDelay: `${i * 40}ms`, animationFillMode: "backwards" }}>
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <Database className="h-4 w-4 text-sky-500" />
                      <h3 className="truncate font-mono text-sm font-semibold text-slate-900 group-hover:text-sky-600">{d.name}</h3>
                      <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[11px] text-blue-700 ring-1 ring-blue-100">{d.task}</span>
                      <span className="rounded-md bg-sky-50 px-2 py-0.5 text-[11px] text-sky-700 ring-1 ring-sky-100">{d.modality}</span>
                    </div>
                    <p className="mt-2 text-sm text-slate-600 line-clamp-2">{d.description}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1"><Download className="h-3 w-3" />{d.downloads.toLocaleString()}</span>
                      <span className="flex items-center gap-1"><Heart className="h-3 w-3" />{d.likes.toLocaleString()}</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{d.updated}</span>
                      <span className="flex items-center gap-1"><Tag className="h-3 w-3" />{d.license}</span>
                      <span>· {d.size}</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {d.tags.map((t) => (
                        <span key={t} className="rounded-md bg-sky-50 px-2 py-0.5 text-[11px] text-sky-700 ring-1 ring-sky-100">{t}</span>
                      ))}
                    </div>
                  </div>
                  <button className="shrink-0 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-md transition-all hover:-translate-y-0.5">使用</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
