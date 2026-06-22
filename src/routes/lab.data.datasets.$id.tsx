import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { DATASETS } from "@/lib/data-assets";
import { ArrowLeft, Download, Heart, Calendar, Tag, Database, ChevronRight, FileText, Code2, BarChart3 } from "lucide-react";

export const Route = createFileRoute("/lab/data/datasets/$id")({
  head: ({ params }) => {
    const d = DATASETS.find((x) => x.id === params.id);
    return { meta: [{ title: `${d?.name ?? "数据集详情"} — 高质量数据集` }] };
  },
  component: DatasetDetail,
});

function DatasetDetail() {
  const { id } = Route.useParams();
  const d = DATASETS.find((x) => x.id === id);
  if (!d) throw notFound();

  const splits = [
    { name: "train", pct: 80, count: "约 80%" },
    { name: "val", pct: 10, count: "约 10%" },
    { name: "test", pct: 10, count: "约 10%" },
  ];

  return (
    <main className="relative mx-auto max-w-7xl px-6 py-10">
      <nav className="mb-6 flex items-center gap-1.5 text-xs text-slate-500">
        <Link to="/" className="hover:text-sky-600">首页</Link>
        <ChevronRight className="h-3 w-3" /><span>数据资产中心</span>
        <ChevronRight className="h-3 w-3" />
        <Link to="/lab/data/datasets" className="hover:text-sky-600">高质量数据集</Link>
        <ChevronRight className="h-3 w-3" /><span className="text-slate-700">{d.name}</span>
      </nav>

      <header className="relative overflow-hidden rounded-3xl border border-sky-100 bg-gradient-to-br from-sky-500 to-blue-700 p-8 text-white shadow-xl shadow-sky-200/40 animate-fade-in">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:24px_24px]" />
        <Link to="/lab/data/datasets" className="relative mb-4 inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur transition hover:bg-white/25">
          <ArrowLeft className="h-3 w-3" /> 返回数据集列表
        </Link>
        <div className="relative flex items-start gap-4">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/20 backdrop-blur ring-1 ring-white/40">
            <Database className="h-7 w-7" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-mono text-xs opacity-80">{d.id}</div>
            <h1 className="mt-1 font-mono text-2xl font-bold tracking-tight">{d.name}</h1>
            <p className="mt-2 text-sm opacity-90">{d.description}</p>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
              <span className="rounded-full bg-white/15 px-3 py-1 backdrop-blur"><Tag className="mr-1 inline h-3 w-3" />{d.task}</span>
              <span className="rounded-full bg-white/15 px-3 py-1 backdrop-blur">模态：{d.modality}</span>
              <span className="rounded-full bg-white/15 px-3 py-1 backdrop-blur">许可：{d.license}</span>
              <span className="rounded-full bg-white/15 px-3 py-1 backdrop-blur">大小：{d.size}</span>
            </div>
          </div>
          <button className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-md transition hover:-translate-y-0.5">
            <Download className="h-4 w-4" />下载数据集
          </button>
        </div>
      </header>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-sky-100 bg-white/85 p-6 shadow-sm backdrop-blur animate-fade-in">
            <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-slate-900"><FileText className="h-4 w-4 text-sky-500" />详细介绍</h2>
            <p className="text-sm leading-relaxed text-slate-600">
              <strong className="text-slate-800">{d.name}</strong> 是面向「{d.task}」任务的高质量{d.modality}数据集。
              {d.description}
              数据集采用 <code className="rounded bg-sky-50 px-1.5 py-0.5 font-mono text-xs text-sky-700">{d.license}</code> 许可协议，
              最近一次更新于 {d.updated}，已被社区下载 {d.downloads.toLocaleString()} 次，
              收到 {d.likes.toLocaleString()} 个赞，是同类任务的基准数据集之一。
            </p>
          </section>

          <section className="rounded-2xl border border-sky-100 bg-white/85 p-6 shadow-sm backdrop-blur animate-fade-in" style={{ animationDelay: "60ms", animationFillMode: "backwards" }}>
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900"><BarChart3 className="h-4 w-4 text-sky-500" />数据分布</h2>
            <div className="space-y-2.5">
              {splits.map((s) => (
                <div key={s.name}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="font-mono font-medium text-slate-700">{s.name}</span>
                    <span className="text-slate-500">{s.count}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-sky-50">
                    <div className="h-full rounded-full bg-gradient-to-r from-sky-500 to-blue-600 transition-all" style={{ width: `${s.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-sky-100 bg-white/85 p-6 shadow-sm backdrop-blur animate-fade-in" style={{ animationDelay: "120ms", animationFillMode: "backwards" }}>
            <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-slate-900"><Code2 className="h-4 w-4 text-sky-500" />使用示例</h2>
            <pre className="overflow-x-auto rounded-xl bg-slate-900 p-4 text-xs leading-relaxed text-slate-100">
{`from datasets import load_dataset

ds = load_dataset("${d.name}")
print(ds["train"][0])

# 字段说明
# - image / data : ${d.modality} 主体内容
# - label        : ${d.task} 标注
# - meta         : 采集时间、来源等元信息`}
            </pre>
          </section>

          <section className="rounded-2xl border border-sky-100 bg-white/85 p-6 shadow-sm backdrop-blur animate-fade-in" style={{ animationDelay: "180ms", animationFillMode: "backwards" }}>
            <h2 className="mb-3 text-lg font-semibold text-slate-900">标签</h2>
            <div className="flex flex-wrap gap-2">
              {d.tags.map((t) => (
                <span key={t} className="rounded-full bg-gradient-to-r from-sky-500 to-blue-600 px-3 py-1 text-xs font-medium text-white shadow-sm">{t}</span>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-2xl border border-sky-100 bg-white/85 p-5 shadow-sm backdrop-blur animate-fade-in">
            <h3 className="mb-3 text-sm font-semibold text-slate-900">数据集信息</h3>
            <dl className="space-y-2 text-xs">
              <Row k="任务" v={d.task} />
              <Row k="模态" v={d.modality} />
              <Row k="数据量" v={d.size} />
              <Row k="许可协议" v={d.license} />
              <Row k="最近更新" v={d.updated} icon={<Calendar className="h-3 w-3" />} />
            </dl>
          </section>

          <section className="rounded-2xl border border-sky-100 bg-white/85 p-5 shadow-sm backdrop-blur">
            <h3 className="mb-3 text-sm font-semibold text-slate-900">社区指标</h3>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="rounded-xl bg-sky-50/60 p-3 ring-1 ring-sky-100/60">
                <Download className="mx-auto mb-1 h-4 w-4 text-sky-500" />
                <div className="text-lg font-bold text-slate-900">{d.downloads.toLocaleString()}</div>
                <div className="text-[11px] text-slate-500">下载</div>
              </div>
              <div className="rounded-xl bg-rose-50/60 p-3 ring-1 ring-rose-100/60">
                <Heart className="mx-auto mb-1 h-4 w-4 text-rose-500" />
                <div className="text-lg font-bold text-slate-900">{d.likes.toLocaleString()}</div>
                <div className="text-[11px] text-slate-500">点赞</div>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}

function Row({ k, v, icon }: { k: string; v: string; icon?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-sky-50 pb-2 last:border-0">
      <dt className="text-slate-500">{k}</dt>
      <dd className="flex items-center gap-1 text-right font-medium text-slate-800">{icon}{v}</dd>
    </div>
  );
}
