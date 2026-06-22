import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { MODELS } from "@/lib/data-assets";
import { ArrowLeft, Download, Eye, ChevronRight, Boxes, Layers, Tag, FileText, RotateCcw } from "lucide-react";

export const Route = createFileRoute("/lab/data/models/$id")({
  head: ({ params }) => {
    const m = MODELS.find((x) => x.id === params.id);
    return { meta: [{ title: `${m?.name ?? "模型详情"} — 三维模型库` }] };
  },
  component: ModelDetail,
});

function ModelDetail() {
  const { id } = Route.useParams();
  const m = MODELS.find((x) => x.id === id);
  if (!m) throw notFound();

  const related = MODELS.filter((x) => x.id !== m.id && x.category === m.category).slice(0, 3);

  return (
    <main className="relative mx-auto max-w-7xl px-6 py-10">
      <nav className="mb-6 flex items-center gap-1.5 text-xs text-slate-500">
        <Link to="/" className="hover:text-sky-600">首页</Link>
        <ChevronRight className="h-3 w-3" /><span>数据资产中心</span>
        <ChevronRight className="h-3 w-3" />
        <Link to="/lab/data/models" className="hover:text-sky-600">三维模型库</Link>
        <ChevronRight className="h-3 w-3" /><span className="text-slate-700">{m.name}</span>
      </nav>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        {/* 模型预览区 */}
        <section className="relative overflow-hidden rounded-3xl border border-sky-100 bg-gradient-to-br from-sky-50 via-white to-blue-50 p-8 shadow-sm">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(14,165,233,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,165,233,0.12)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
          <Link to="/lab/data/models" className="relative inline-flex items-center gap-1 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm backdrop-blur transition hover:bg-white">
            <ArrowLeft className="h-3 w-3" />返回模型库
          </Link>
          <div className="relative mt-6 flex h-[360px] items-center justify-center">
            <div
              className="h-40 w-40 rounded-3xl animate-spin-slow shadow-2xl"
              style={{
                background: `radial-gradient(circle at 32% 28%, ${m.color}ee, ${m.color}88 55%, ${m.color}22 85%)`,
                boxShadow: `0 30px 80px ${m.color}66`,
              }}
            />
          </div>
          <div className="relative mt-4 flex items-center justify-center gap-2">
            <button className="inline-flex items-center gap-1 rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:bg-sky-50">
              <RotateCcw className="h-3.5 w-3.5" />重置视角
            </button>
            <button className="inline-flex items-center gap-1 rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:bg-sky-50">
              <Eye className="h-3.5 w-3.5" />全屏预览
            </button>
          </div>
        </section>

        {/* 信息区 */}
        <section className="flex flex-col">
          <div className="font-mono text-xs text-sky-500">{m.id} · {m.category}</div>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">{m.name}</h1>

          <div className="mt-4 grid grid-cols-3 gap-3">
            <Stat label="格式" value={m.format} />
            <Stat label="文件大小" value={m.size} />
            <Stat label="三角面数" value={m.triangles} />
          </div>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {m.tags.map((t) => (
              <span key={t} className="rounded-md bg-sky-50 px-2.5 py-1 text-xs text-sky-700 ring-1 ring-sky-100">
                <Tag className="mr-1 inline h-3 w-3" />{t}
              </span>
            ))}
          </div>

          <div className="mt-6 flex gap-3">
            <button className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5">
              <Download className="h-4 w-4" />下载模型 ({m.size})
            </button>
            <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-50 px-4 py-3 text-sm font-medium text-sky-700 hover:bg-sky-100">
              加入场景
            </button>
          </div>

          <div className="mt-6 rounded-2xl border border-sky-100 bg-white/85 p-5 shadow-sm backdrop-blur">
            <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900"><FileText className="h-4 w-4 text-sky-500" />详细介绍</h2>
            <p className="text-sm leading-relaxed text-slate-600">
              <strong className="text-slate-800">{m.name}</strong> 隶属于「{m.category}」分类，
              采用 {m.format} 标准格式，三角面数约 {m.triangles}，
              文件大小 {m.size}，可直接导入主流数字孪生引擎（Three.js / Unreal / Unity / 51World）使用。
              贴图采用 PBR 工作流，包含 BaseColor、Normal、Roughness、Metallic 等通道，
              支持 LOD 多级细节，可根据相机距离动态切换。
            </p>
          </div>
        </section>
      </div>

      {/* 技术规格 */}
      <section className="mt-6 rounded-2xl border border-sky-100 bg-white/85 p-6 shadow-sm backdrop-blur animate-fade-in">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900"><Layers className="h-4 w-4 text-sky-500" />技术规格</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <SpecCard k="文件格式" v={m.format} />
          <SpecCard k="贴图工作流" v="PBR (Metallic/Roughness)" />
          <SpecCard k="UV 通道" v="2 套 (主 UV + Lightmap)" />
          <SpecCard k="LOD 级别" v="LOD 0 ~ LOD 3" />
          <SpecCard k="坐标系" v="Y-Up · 米制单位" />
          <SpecCard k="动画" v={m.category === "人物" ? "含骨骼/动画" : "静态模型"} />
          <SpecCard k="碰撞体" v="自带简化碰撞" />
          <SpecCard k="兼容引擎" v="Three.js · Unreal · Unity" />
        </div>
      </section>

      {/* 同类推荐 */}
      {related.length > 0 && (
        <section className="mt-6">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900"><Boxes className="h-4 w-4 text-sky-500" />同类模型</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <Link key={r.id} to="/lab/data/models/$id" params={{ id: r.id }}
                className="group flex items-center gap-4 rounded-2xl border border-sky-100 bg-white/85 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
                <div className="h-12 w-12 shrink-0 rounded-xl"
                  style={{ background: `radial-gradient(circle at 35% 30%, ${r.color}cc, ${r.color}33 80%)`, boxShadow: `0 6px 20px ${r.color}44` }} />
                <div className="min-w-0 flex-1">
                  <div className="truncate font-medium text-slate-900 group-hover:text-sky-600">{r.name}</div>
                  <div className="truncate text-xs text-slate-500">{r.format} · {r.size}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-sky-100 bg-white/70 px-3 py-2 text-center">
      <div className="text-[11px] text-slate-500">{label}</div>
      <div className="mt-0.5 font-mono text-sm font-semibold text-slate-900">{value}</div>
    </div>
  );
}

function SpecCard({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-xl bg-gradient-to-br from-sky-50/60 to-white p-3 ring-1 ring-sky-100/70">
      <div className="text-[11px] text-sky-600">{k}</div>
      <div className="mt-1 text-sm font-medium text-slate-800">{v}</div>
    </div>
  );
}
