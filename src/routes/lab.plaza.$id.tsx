import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Boxes, Eye, GitFork, Share2, Building2, Tag, Play, X, Loader2, Video, Image as ImageIcon, Sparkles } from "lucide-react";
import { SCENES, ONLINE_TAG, type Scene } from "@/lib/plaza-data";

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
  const navigate = useNavigate();
  const [running, setRunning] = useState<Scene | null>(null);
  const [activeImg, setActiveImg] = useState(0);
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  const online = s.tags.includes(ONLINE_TAG);

  const share = () => {
    const url = `${window.location.origin}/lab/plaza/${s.id}`;
    navigator.clipboard?.writeText(url).catch(() => {});
  };

  return (
    <main className="relative mx-auto max-w-6xl px-6 py-12">
      <Link to="/lab/plaza" className="mb-6 inline-flex items-center gap-2 text-sm text-sky-600 hover:text-sky-700">
        <ArrowLeft className="h-4 w-4" /> 返回场景广场
      </Link>

      <article className="overflow-hidden rounded-3xl border border-sky-100 bg-white/85 shadow-xl shadow-sky-100/50 backdrop-blur animate-fade-in">
        {/* 主图 */}
        <div className={`relative h-72 bg-gradient-to-br ${s.cover} overflow-hidden`}>
          <img src={s.image} alt={s.name} width={1280} height={768} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/30 to-slate-900/10" />
          <Boxes className="absolute left-8 top-8 h-12 w-12 text-white/90 animate-float-y" />
          <div className="absolute bottom-6 left-8 right-8 flex items-end justify-between gap-4 text-white">
            <div>
              <div className="font-mono text-xs opacity-80">{s.id}</div>
              <h1 className="mt-1 text-3xl font-bold tracking-tight drop-shadow">{s.name}</h1>
              <p className="mt-1 text-sm opacity-90">{s.vendor} · {s.domain}</p>
            </div>
            {online && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/25 px-3 py-1 text-xs font-medium backdrop-blur ring-1 ring-white/30">
                <Sparkles className="h-3.5 w-3.5" /> 支持在线体验
              </span>
            )}
          </div>
        </div>

        <div className="p-8">
          {/* 操作区 */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-3">
              <div className="flex items-center gap-1.5 rounded-xl bg-sky-50 px-3 py-2 text-sm text-sky-700">
                <Eye className="h-4 w-4" /> {s.views.toLocaleString()} 浏览
              </div>
              <div className="flex items-center gap-1.5 rounded-xl bg-sky-50 px-3 py-2 text-sm text-sky-700">
                <GitFork className="h-4 w-4" /> {s.forks} 复用
              </div>
            </div>
            <div className="flex gap-3">
              {online && (
                <button onClick={() => setRunning(s)}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-sky-300/40 transition-all hover:shadow-lg hover:brightness-110">
                  <Play className="h-4 w-4" /> 在线体验
                </button>
              )}
              <button onClick={share}
                className="inline-flex items-center gap-2 rounded-xl border border-sky-200 bg-white px-4 py-2.5 text-sm font-semibold text-sky-700 transition-colors hover:bg-sky-50">
                <Share2 className="h-4 w-4" /> 转发
              </button>
            </div>
          </div>

          {/* 标签 */}
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Tag className="h-4 w-4 text-sky-500" />
            {s.tags.map((t: string) => (
              <button
                key={t}
                onClick={() => navigate({ to: "/lab/plaza", search: { tag: t } as never })}
                className={`rounded-md px-2.5 py-0.5 text-xs ring-1 transition-colors ${
                  t === ONLINE_TAG
                    ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white ring-sky-300 hover:brightness-110"
                    : "bg-sky-50 text-sky-700 ring-sky-100 hover:bg-sky-100"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* 详细介绍 */}
          <section className="mt-8 rounded-2xl bg-sky-50/50 p-6 ring-1 ring-sky-100/60">
            <h2 className="font-semibold text-slate-900">场景详细介绍</h2>
            <p className="mt-3 text-sm leading-7 text-slate-700">{s.longDescription}</p>
          </section>

          {/* 图片集 */}
          <section className="mt-8">
            <h2 className="flex items-center gap-2 font-semibold text-slate-900">
              <ImageIcon className="h-4 w-4 text-sky-500" /> 场景图片集
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-[2fr,1fr]">
            <div className={`relative aspect-[16/9] overflow-hidden rounded-2xl bg-gradient-to-br ${s.images[activeImg].gradient}`}>
                {s.images[activeImg].image && (
                  <img src={s.images[activeImg].image} alt={s.images[activeImg].caption} loading="lazy" width={1280} height={768} className="absolute inset-0 h-full w-full object-cover" />
                )}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:24px_24px]" />
                <div className="absolute bottom-4 left-4 rounded-full bg-black/30 px-3 py-1 text-xs text-white backdrop-blur">
                  {s.images[activeImg].caption}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {s.images.map((im: Scene["images"][number], i: number) => (
                  <button key={i} onClick={() => setActiveImg(i)}
                    className={`relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br ${im.gradient} ring-2 transition-all ${
                      activeImg === i ? "ring-sky-500" : "ring-transparent hover:ring-sky-200"
                    }`}>
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:14px_14px]" />
                    <span className="absolute bottom-1.5 left-2 text-[11px] font-medium text-white drop-shadow">{im.caption}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* 视频集 */}
          <section className="mt-8">
            <h2 className="flex items-center gap-2 font-semibold text-slate-900">
              <Video className="h-4 w-4 text-sky-500" /> 场景视频集
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {s.videos.map((v: Scene["videos"][number], i: number) => (
                <button key={i} onClick={() => setPlayingVideo(i)}
                  className={`group relative aspect-video overflow-hidden rounded-2xl bg-gradient-to-br ${v.gradient} text-left`}>
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:24px_24px]" />
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="grid h-14 w-14 place-items-center rounded-full bg-white/80 text-sky-600 shadow-lg backdrop-blur transition-transform group-hover:scale-110">
                      <Play className="h-6 w-6 translate-x-0.5" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                    <span className="text-sm font-medium drop-shadow">{v.title}</span>
                    <span className="rounded bg-black/40 px-2 py-0.5 text-[11px] backdrop-blur">{v.duration}</span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* 场景建设方 */}
          <section className="mt-8 rounded-2xl border border-sky-100 bg-white p-6">
            <h2 className="flex items-center gap-2 font-semibold text-slate-900">
              <Building2 className="h-4 w-4 text-sky-500" /> 场景建设方
            </h2>
            <div className="mt-4 flex items-start gap-4">
              <div className={`grid h-14 w-14 flex-none place-items-center rounded-2xl bg-gradient-to-br ${s.cover} text-white shadow`}>
                <Building2 className="h-6 w-6" />
              </div>
              <div>
                <div className="font-medium text-slate-900">{s.builder}</div>
                <p className="mt-1 text-sm leading-6 text-slate-600">{s.builderDesc}</p>
              </div>
            </div>
          </section>
        </div>
      </article>

      {running && <ExperienceModal scene={running} onClose={() => setRunning(null)} />}
      {playingVideo !== null && (
        <VideoModal video={s.videos[playingVideo]} onClose={() => setPlayingVideo(null)} />
      )}
    </main>
  );
}

function ExperienceModal({ scene, onClose }: { scene: Scene; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm animate-fade-in p-4" onClick={onClose}>
      <div className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-sky-200/40 bg-slate-900 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div>
            <div className="text-xs text-sky-300">在线体验 · {scene.domain}</div>
            <h3 className="mt-0.5 text-lg font-semibold text-white">{scene.name}</h3>
          </div>
          <button onClick={onClose} aria-label="关闭" className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 text-white transition-colors hover:bg-white/20">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(56,189,248,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.15)_1px,transparent_1px)] bg-[size:40px_40px]" style={{ animation: "grid-move 8s linear infinite" }} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Loader2 className="h-10 w-10 text-sky-300 animate-spin" />
            <div className="mt-4 text-base font-medium text-white">场景加载中</div>
            <div className="mt-2 text-xs text-sky-200/80">正在拉起孪生体、初始化渲染管线、注入实时数据流</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function VideoModal({ video, onClose }: { video: { title: string; duration: string; gradient: string }; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm animate-fade-in p-4" onClick={onClose}>
      <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-slate-900 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 text-white">
          <h3 className="font-semibold">{video.title}</h3>
          <button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 hover:bg-white/20"><X className="h-5 w-5" /></button>
        </div>
        <div className={`relative aspect-video bg-gradient-to-br ${video.gradient}`}>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:32px_32px]" />
          <div className="absolute inset-0 grid place-items-center">
            <Loader2 className="h-10 w-10 animate-spin text-white/90" />
          </div>
          <div className="absolute bottom-4 right-4 rounded bg-black/40 px-2 py-0.5 text-xs text-white backdrop-blur">{video.duration}</div>
        </div>
      </div>
    </div>
  );
}
