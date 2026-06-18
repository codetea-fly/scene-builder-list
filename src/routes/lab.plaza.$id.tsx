import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Boxes, Eye, GitFork, Share2, Building2, Tag } from "lucide-react";
import { SCENES } from "@/lib/plaza-data";

export const Route = createFileRoute("/lab/plaza/$id")({
  head: ({ params }) => {
    const s = SCENES.find((x) => x.id === params.id);
    return { meta: [{ title: `${s?.name ?? "场景详情"} — 场景创新广场` }] };
  },
  loader: ({ params }) => {
    const scene = SCENES.find((s) => s.id === params.id);
    if (!scene) throw notFound();
    return { scene };
  },
  component: SceneDetail,
  notFoundComponent: () => (
    <main className="mx-auto max-w-3xl px-6 py-20 text-center">
      <h1 className="text-2xl font-bold text-slate-900">未找到该场景</h1>
      <Link to="/lab/plaza" className="mt-6 inline-block text-sky-600">返回场景广场</Link>
    </main>
  ),
});

function SceneDetail() {
  const { scene: s } = Route.useLoaderData();
  return (
    <main className="relative mx-auto max-w-5xl px-6 py-12">
      <Link to="/lab/plaza" className="mb-6 inline-flex items-center gap-2 text-sm text-sky-600 hover:text-sky-700">
        <ArrowLeft className="h-4 w-4" /> 返回场景广场
      </Link>

      <article className="overflow-hidden rounded-3xl border border-sky-100 bg-white/85 shadow-xl shadow-sky-100/50 backdrop-blur animate-fade-in">
        <div className={`relative h-64 bg-gradient-to-br ${s.cover} overflow-hidden`}>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:24px_24px]" />
          <Boxes className="absolute left-8 top-8 h-12 w-12 text-white/90 animate-float-y" />
        </div>
        <div className="p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="font-mono text-xs text-sky-500">{s.id}</div>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{s.name}</h1>
              <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                <Building2 className="h-4 w-4 text-sky-400" /> {s.vendor} · {s.domain}
              </p>
            </div>
            <div className="flex gap-3">
              <div className="flex items-center gap-1.5 rounded-xl bg-sky-50 px-3 py-2 text-sm text-sky-700">
                <Eye className="h-4 w-4" /> {s.views.toLocaleString()}
              </div>
              <div className="flex items-center gap-1.5 rounded-xl bg-sky-50 px-3 py-2 text-sm text-sky-700">
                <GitFork className="h-4 w-4" /> {s.forks}
              </div>
              <button className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md">
                <Share2 className="h-4 w-4" /> 转发
              </button>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Tag className="h-4 w-4 text-sky-500" />
            {s.tags.map((t: string) => (
              <span key={t} className="rounded-md bg-sky-50 px-2.5 py-0.5 text-xs text-sky-700 ring-1 ring-sky-100">{t}</span>
            ))}
          </div>

          <div className="mt-8 rounded-2xl bg-sky-50/50 p-6 ring-1 ring-sky-100/60">
            <h2 className="font-semibold text-slate-900">场景描述</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">{s.description}</p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              { k: "技术栈", v: s.tags.slice(0, 3).join(" · ") },
              { k: "应用领域", v: s.domain },
              { k: "解决方案提供方", v: s.vendor },
            ].map((it) => (
              <div key={it.k} className="rounded-xl border border-sky-100 bg-white p-4">
                <div className="text-xs text-slate-500">{it.k}</div>
                <div className="mt-1 font-medium text-slate-800">{it.v}</div>
              </div>
            ))}
          </div>
        </div>
      </article>
    </main>
  );
}
