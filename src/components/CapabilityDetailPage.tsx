import { Link } from "@tanstack/react-router";
import { ArrowLeft, Download, Star, GitFork, Share2, Tag, ChevronRight, CheckCircle2, Server, Sparkles } from "lucide-react";
import type { Capability } from "@/lib/capability-data";
import type { ModuleConfig } from "@/lib/capability-modules";
import { MODULE_DETAIL_SECTIONS } from "@/lib/capability-modules";

export function CapabilityDetailPage({ item, module: mod }: { item: Capability; module: ModuleConfig }) {
  const sections = MODULE_DETAIL_SECTIONS[mod.slug];
  const Icon = mod.icon;

  const related = mod.items.filter((i) => i.id !== item.id).slice(0, 3);

  return (
    <main className="relative mx-auto max-w-7xl px-6 py-10">
      {/* 面包屑 */}
      <nav className="mb-6 flex items-center gap-1.5 text-xs text-slate-500">
        <Link to="/" className="hover:text-sky-600">首页</Link>
        <ChevronRight className="h-3 w-3" />
        <span>能力组件中心</span>
        <ChevronRight className="h-3 w-3" />
        <Link to={`/lab/capability/${mod.slug}` as string} className="hover:text-sky-600">{mod.label}</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-slate-700">{item.name}</span>
      </nav>

      {/* 头部 */}
      <header className={`relative overflow-hidden rounded-3xl border border-sky-100 bg-gradient-to-br ${mod.accent} p-8 text-white shadow-xl shadow-sky-200/40 animate-fade-in`}>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/15 blur-3xl" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0 flex-1">
            <Link to={`/lab/capability/${mod.slug}` as string}
              className="mb-4 inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur transition hover:bg-white/25">
              <ArrowLeft className="h-3 w-3" /> 返回 {mod.label}
            </Link>
            <div className="flex items-start gap-4">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/20 backdrop-blur ring-1 ring-white/40">
                <Icon className="h-7 w-7" />
              </div>
              <div>
                <div className="font-mono text-xs opacity-80">{item.id} · {item.version}</div>
                <h1 className="mt-1 text-3xl font-bold tracking-tight">{item.name}</h1>
                <p className="mt-2 text-sm opacity-90">{item.vendor} 提供 · 隶属 {mod.label}</p>
              </div>
            </div>
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-white/90">{item.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {item.tags.map((t) => (
                <span key={t} className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur ring-1 ring-white/20">
                  <Tag className="h-3 w-3" />{t}
                </span>
              ))}
            </div>
          </div>
          <div className="flex shrink-0 flex-col gap-2 md:w-52">
            <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-md transition hover:-translate-y-0.5">
              <Download className="h-4 w-4" /> 申请使用
            </button>
            <div className="grid grid-cols-3 gap-2">
              <button className="inline-flex flex-col items-center justify-center rounded-xl bg-white/15 py-2 text-xs backdrop-blur transition hover:bg-white/25">
                <Star className="mb-0.5 h-4 w-4" />收藏
              </button>
              <button className="inline-flex flex-col items-center justify-center rounded-xl bg-white/15 py-2 text-xs backdrop-blur transition hover:bg-white/25">
                <GitFork className="mb-0.5 h-4 w-4" />Fork
              </button>
              <button className="inline-flex flex-col items-center justify-center rounded-xl bg-white/15 py-2 text-xs backdrop-blur transition hover:bg-white/25">
                <Share2 className="mb-0.5 h-4 w-4" />分享
              </button>
            </div>
            <div className="mt-2 rounded-xl bg-white/10 px-3 py-2 text-xs backdrop-blur">
              <div className="flex items-center justify-between"><span className="opacity-80">下载量</span><span className="font-mono font-semibold">{item.downloads.toLocaleString()}</span></div>
              <div className="mt-1 flex items-center justify-between"><span className="opacity-80">当前版本</span><span className="font-mono font-semibold">{item.version}</span></div>
            </div>
          </div>
        </div>
      </header>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* 左侧主体 */}
        <div className="space-y-6">
          {/* 详细介绍 */}
          <section className="rounded-2xl border border-sky-100 bg-white/85 p-6 shadow-sm backdrop-blur animate-fade-in">
            <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-slate-900"><Sparkles className="h-4 w-4 text-sky-500" />详细介绍</h2>
            <p className="text-sm leading-relaxed text-slate-600">
              <strong className="text-slate-800">{item.name}</strong> 是由 {item.vendor} 推出的{mod.label}产品，
              {item.description}面向 {item.tags.join("、")} 等典型场景，
              已在多家行业头部客户的生产环境稳定运行，累计下载 {item.downloads.toLocaleString()} 次。
              当前版本 <code className="rounded bg-sky-50 px-1.5 py-0.5 font-mono text-xs text-sky-700">{item.version}</code>，
              持续迭代更新，提供企业级 SLA 与 7×24 技术支持。
            </p>
          </section>

          {/* 核心特性 */}
          <section className="rounded-2xl border border-sky-100 bg-white/85 p-6 shadow-sm backdrop-blur animate-fade-in" style={{ animationDelay: "60ms", animationFillMode: "backwards" }}>
            <h2 className="mb-4 text-lg font-semibold text-slate-900">核心特性</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {sections.features.map((f) => (
                <div key={f.title} className="flex gap-3 rounded-xl border border-sky-100/70 bg-gradient-to-br from-sky-50/60 to-white p-4 transition hover:border-sky-200">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-sky-500" />
                  <div>
                    <div className="font-medium text-slate-900">{f.title}</div>
                    <div className="mt-0.5 text-xs leading-relaxed text-slate-500">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* API / 接口 (条件渲染) */}
          {sections.api && (
            <section className="rounded-2xl border border-sky-100 bg-white/85 p-6 shadow-sm backdrop-blur animate-fade-in" style={{ animationDelay: "120ms", animationFillMode: "backwards" }}>
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900"><Server className="h-4 w-4 text-sky-500" />接口示例</h2>
              <div className="overflow-hidden rounded-xl ring-1 ring-sky-100">
                {sections.api.map((api, i) => (
                  <div key={api.path} className={`flex items-center gap-3 px-4 py-3 text-sm ${i % 2 === 0 ? "bg-sky-50/40" : "bg-white"}`}>
                    <span className={`rounded-md px-2 py-0.5 font-mono text-[11px] font-semibold ${
                      api.method === "GET" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"
                    }`}>{api.method}</span>
                    <code className="font-mono text-xs text-slate-800">{api.path}</code>
                    <span className="ml-auto text-xs text-slate-500">{api.desc}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 适用场景 */}
          <section className="rounded-2xl border border-sky-100 bg-white/85 p-6 shadow-sm backdrop-blur animate-fade-in" style={{ animationDelay: "180ms", animationFillMode: "backwards" }}>
            <h2 className="mb-4 text-lg font-semibold text-slate-900">适用场景</h2>
            <div className="flex flex-wrap gap-2">
              {sections.scenarios.map((s) => (
                <span key={s} className={`rounded-xl bg-gradient-to-r ${mod.accent} px-4 py-2 text-xs font-medium text-white shadow-sm`}>{s}</span>
              ))}
            </div>
          </section>
        </div>

        {/* 右侧 — 规格与相关 */}
        <aside className="space-y-6">
          <section className="rounded-2xl border border-sky-100 bg-white/85 p-5 shadow-sm backdrop-blur animate-fade-in">
            <h3 className="mb-3 text-sm font-semibold text-slate-900">规格参数</h3>
            <dl className="space-y-2 text-xs">
              {sections.specs.map((s) => (
                <div key={s.label} className="flex items-start justify-between gap-3 border-b border-sky-50 pb-2 last:border-0">
                  <dt className="text-slate-500">{s.label}</dt>
                  <dd className="text-right font-medium text-slate-800">{s.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="rounded-2xl border border-sky-100 bg-white/85 p-5 shadow-sm backdrop-blur animate-fade-in" style={{ animationDelay: "100ms", animationFillMode: "backwards" }}>
            <h3 className="mb-3 text-sm font-semibold text-slate-900">同模块推荐</h3>
            <div className="space-y-2">
              {related.map((r) => (
                <Link key={r.id} to={`/lab/capability/${mod.slug}/${r.id}` as string}
                  className="flex items-start gap-2 rounded-xl border border-transparent p-2 transition hover:border-sky-200 hover:bg-sky-50">
                  <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br ${mod.accent} text-white`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium text-slate-800">{r.name}</div>
                    <div className="truncate text-xs text-slate-500">{r.vendor}</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}
