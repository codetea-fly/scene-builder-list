import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Search, Filter, Eye, GitFork, X } from "lucide-react";
import { SCENES, ALL_DOMAINS, type Scene } from "@/lib/plaza-data";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/atlas/overview")({
  head: () => ({ meta: [{ title: "全景式场景图谱" }] }),
  component: AtlasOverview,
});

// 成熟度等级（5 级，由低到高）
const MATURITY_LEVELS = [
  { key: "concept", label: "概念验证" },
  { key: "prototype", label: "原型试点" },
  { key: "pilot", label: "试运行" },
  { key: "scale", label: "规模化" },
  { key: "mature", label: "成熟运营" },
] as const;
type MaturityKey = typeof MATURITY_LEVELS[number]["key"];

// 为每个场景稳定地派生 成熟度 等级
function maturityOf(s: Scene): MaturityKey {
  const n = parseInt(s.id.slice(-4), 10) || 0;
  return MATURITY_LEVELS[n % MATURITY_LEVELS.length].key;
}

// 所有出现过的技术栈标签（排除"在线体验"运营标签）
const ALL_TECHS = Array.from(
  new Set(SCENES.flatMap((s) => s.tags.filter((t) => t !== "在线体验")))
).sort();

const LANES_PER_PAGE = 4;

// 领域配色（按域名稳定派生）
const DOMAIN_PALETTE = [
  { bar: "bg-orange-400", chipBg: "bg-orange-50", chipBorder: "border-orange-300", chipText: "text-orange-700", dot: "bg-orange-500" },
  { bar: "bg-emerald-400", chipBg: "bg-emerald-50", chipBorder: "border-emerald-300", chipText: "text-emerald-700", dot: "bg-emerald-500" },
  { bar: "bg-rose-400", chipBg: "bg-rose-50", chipBorder: "border-rose-300", chipText: "text-rose-700", dot: "bg-rose-500" },
  { bar: "bg-blue-400", chipBg: "bg-blue-50", chipBorder: "border-blue-300", chipText: "text-blue-700", dot: "bg-blue-500" },
  { bar: "bg-violet-400", chipBg: "bg-violet-50", chipBorder: "border-violet-300", chipText: "text-violet-700", dot: "bg-violet-500" },
  { bar: "bg-cyan-400", chipBg: "bg-cyan-50", chipBorder: "border-cyan-300", chipText: "text-cyan-700", dot: "bg-cyan-500" },
  { bar: "bg-amber-400", chipBg: "bg-amber-50", chipBorder: "border-amber-300", chipText: "text-amber-700", dot: "bg-amber-500" },
  { bar: "bg-lime-500", chipBg: "bg-lime-50", chipBorder: "border-lime-400", chipText: "text-lime-700", dot: "bg-lime-500" },
];
function domainStyle(domain: string) {
  let h = 0;
  for (let i = 0; i < domain.length; i++) h = (h * 31 + domain.charCodeAt(i)) >>> 0;
  return DOMAIN_PALETTE[h % DOMAIN_PALETTE.length];
}

function AtlasOverview() {
  const [domainFilter, setDomainFilter] = useState<string[]>([]);
  const [maturityFilter, setMaturityFilter] = useState<MaturityKey[]>([]);
  const [techFilter, setTechFilter] = useState<string[]>([]);
  const [q, setQ] = useState("");
  const [visibleLanes, setVisibleLanes] = useState(LANES_PER_PAGE);
  const [hover, setHover] = useState<{ scene: Scene; x: number; y: number } | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // 当筛选变化时，重置可见泳道
  useEffect(() => { setVisibleLanes(LANES_PER_PAGE); }, [domainFilter.join(","), maturityFilter.join(","), techFilter.join(","), q]);

  // 高亮判断：当任意一组筛选条件存在时，命中所有条件的为高亮，否则全部正常显示
  const hasFilter = domainFilter.length + maturityFilter.length + techFilter.length > 0 || q.length > 0;
  const isHighlighted = (s: Scene) => {
    if (!hasFilter) return true;
    const md = domainFilter.length === 0 || domainFilter.includes(s.domain);
    const mm = maturityFilter.length === 0 || maturityFilter.includes(maturityOf(s));
    const mt = techFilter.length === 0 || techFilter.every((t) => s.tags.includes(t));
    const mq = !q || s.name.includes(q) || s.vendor.includes(q) || s.domain.includes(q);
    return md && mm && mt && mq;
  };

  // 泳道排序：先展示包含高亮场景的领域
  const orderedDomains = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const s of SCENES) {
      counts[s.domain] = (counts[s.domain] ?? 0) + (isHighlighted(s) ? 1 : 0);
    }
    return [...ALL_DOMAINS].sort((a, b) => (counts[b] ?? 0) - (counts[a] ?? 0) || a.localeCompare(b));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [domainFilter, maturityFilter, techFilter, q]);

  const lanesToRender = orderedDomains.slice(0, visibleLanes);

  // 瀑布式加载
  useEffect(() => {
    if (!sentinelRef.current) return;
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisibleLanes((v) => Math.min(v + LANES_PER_PAGE, orderedDomains.length));
      }
    }, { rootMargin: "200px" });
    obs.observe(sentinelRef.current);
    return () => obs.disconnect();
  }, [orderedDomains.length]);

  const toggle = <T extends string>(arr: T[], v: T, set: (a: T[]) => void) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const clearAll = () => { setDomainFilter([]); setMaturityFilter([]); setTechFilter([]); setQ(""); };

  return (
    <main className="relative mx-auto max-w-7xl px-6 py-12">
      <PageHeader
        eyebrow="全景式场景图谱"
        title="场景"
        highlight="二维全景图"
        description="横轴为成熟度，纵向泳道为应用领域。每个圆点是一个场景，悬停可预览，点击进入详情。"
      />

      {/* 筛选区 */}
      <section className="mb-6 rounded-2xl border border-sky-100 bg-white/80 p-5 shadow-sm backdrop-blur">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="搜索场景名 / 建设方 / 领域"
              className="w-full rounded-full border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            />
          </div>
          {hasFilter && (
            <button onClick={clearAll} className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50">
              <X className="h-3.5 w-3.5" /> 清空
            </button>
          )}
        </div>

        <FilterGroup label="应用领域" options={ALL_DOMAINS} active={domainFilter} onToggle={(v) => toggle(domainFilter, v, setDomainFilter)} />
        <FilterGroup label="成熟度" options={MATURITY_LEVELS.map((m) => m.label)} active={maturityFilter.map((k) => MATURITY_LEVELS.find((m) => m.key === k)!.label)} onToggle={(label) => {
          const k = MATURITY_LEVELS.find((m) => m.label === label)!.key;
          toggle(maturityFilter, k, setMaturityFilter);
        }} />
        <FilterGroup label="技术栈" options={ALL_TECHS} active={techFilter} onToggle={(v) => toggle(techFilter, v, setTechFilter)} />
      </section>

      {/* 横轴刻度 */}
      <div className="sticky top-0 z-10 -mx-2 mb-2 rounded-xl border border-sky-100 bg-white/90 px-4 py-3 backdrop-blur">
        <div className="flex items-center">
          <div className="w-32 shrink-0 text-xs font-medium uppercase tracking-wider text-slate-400">
            <Filter className="mr-1 inline h-3.5 w-3.5" />领域 / 成熟度
          </div>
          <div className="grid flex-1 grid-cols-5 text-center text-xs font-medium text-slate-600">
            {MATURITY_LEVELS.map((m, i) => (
              <div key={m.key} className="relative">
                <span className={maturityFilter.includes(m.key) ? "text-sky-600 font-semibold" : ""}>{m.label}</span>
                {i < MATURITY_LEVELS.length - 1 && <span className="absolute -right-px top-1 text-slate-200">|</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 泳道 */}
      <section className="divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white/80">
        {lanesToRender.map((domain) => {
          const scenes = SCENES.filter((s) => s.domain === domain);
          if (scenes.length === 0) return null;
          const isDomainFiltered = domainFilter.length === 0 || domainFilter.includes(domain);
          const ds = domainStyle(domain);
          return (
            <div
              key={domain}
              className={`group flex items-stretch transition ${isDomainFiltered ? "" : "opacity-40"}`}
            >
              <div className="relative flex w-32 shrink-0 items-center px-4 py-6 text-sm font-semibold text-slate-700">
                <span className={`absolute left-0 top-3 bottom-3 w-1 rounded-r ${ds.bar}`} />
                <span className="pl-2">{domain}</span>
              </div>
              <div className="relative grid flex-1 grid-cols-5 gap-2 px-3 py-5">
                {MATURITY_LEVELS.map((_, i) => (
                  i > 0 && <div key={i} className="pointer-events-none absolute top-3 bottom-3 border-l border-dashed border-slate-100" style={{ left: `${(i / 5) * 100}%` }} />
                ))}
                {MATURITY_LEVELS.map((m) => {
                  const cell = scenes.filter((s) => maturityOf(s) === m.key);
                  return (
                    <div key={m.key} className="relative flex flex-wrap content-start items-center justify-center gap-2">
                      {cell.map((s) => {
                        const hi = isHighlighted(s);
                        return (
                          <Link
                            key={s.id}
                            to="/lab/plaza/$id"
                            params={{ id: s.id }}
                            onMouseEnter={(e) => {
                              const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
                              setHover({ scene: s, x: r.left + r.width / 2, y: r.top });
                            }}
                            onMouseLeave={() => setHover(null)}
                            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium whitespace-nowrap transition ${
                              hi
                                ? `${ds.chipBg} ${ds.chipBorder} ${ds.chipText} shadow-sm hover:-translate-y-0.5 hover:shadow-md`
                                : "border-slate-200 bg-white text-slate-300 opacity-40 hover:opacity-60"
                            }`}
                            aria-label={s.name}
                          >
                            <span className={`h-1.5 w-1.5 rounded-full ${hi ? ds.dot : "bg-slate-300"}`} />
                            <span className="max-w-[110px] truncate">{s.name.replace(/场景$/, "").replace(/孪生$/, "")}</span>
                          </Link>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        <div ref={sentinelRef} className="h-10" />
        {visibleLanes < orderedDomains.length ? (
          <p className="text-center text-xs text-slate-400">下拉加载更多泳道（{visibleLanes}/{orderedDomains.length}）</p>
        ) : (
          <p className="text-center text-xs text-slate-400">已展示全部 {orderedDomains.length} 个应用领域</p>
        )}
      </section>

      {/* Hover 卡片 */}
      {hover && <HoverCard scene={hover.scene} x={hover.x} y={hover.y} />}
    </main>
  );
}

function FilterGroup({ label, options, active, onToggle }: { label: string; options: string[]; active: string[]; onToggle: (v: string) => void }) {
  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      <span className="w-20 shrink-0 text-xs font-medium text-slate-500">{label}</span>
      <div className="flex flex-wrap gap-1.5">
        {options.map((o) => {
          const on = active.includes(o);
          return (
            <button
              key={o}
              onClick={() => onToggle(o)}
              className={`rounded-full border px-2.5 py-1 text-xs transition ${
                on
                  ? "border-sky-400 bg-sky-500 text-white shadow-sm"
                  : "border-slate-200 bg-white text-slate-600 hover:border-sky-300 hover:text-sky-600"
              }`}
            >
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function HoverCard({ scene, x, y }: { scene: Scene; x: number; y: number }) {
  // 限制不要超出屏幕
  const left = Math.min(Math.max(x - 140, 12), (typeof window !== "undefined" ? window.innerWidth : 1200) - 292);
  const top = y - 12;
  return (
    <div
      className="pointer-events-none fixed z-50 w-72 -translate-y-full rounded-xl border border-sky-100 bg-white p-3 shadow-xl animate-fade-in"
      style={{ left, top }}
    >
      <div className={`relative mb-2 h-24 w-full overflow-hidden rounded-lg bg-gradient-to-br ${scene.cover}`}>
        <img src={scene.image} alt={scene.name} loading="lazy" width={1280} height={768} className="absolute inset-0 h-full w-full object-cover" />
      </div>
      <div className="text-sm font-semibold text-slate-900">{scene.name}</div>
      <div className="mt-0.5 text-xs text-slate-500">{scene.vendor} · {scene.domain}</div>
      <p className="mt-1 line-clamp-2 text-xs text-slate-600">{scene.description}</p>
      <div className="mt-2 flex flex-wrap gap-1">
        {scene.tags.map((t) => (
          <span key={t} className="rounded-full bg-sky-50 px-2 py-0.5 text-[10px] text-sky-700">{t}</span>
        ))}
      </div>
      <div className="mt-2 flex items-center gap-3 text-[11px] text-slate-400">
        <span className="inline-flex items-center gap-1"><Eye className="h-3 w-3" />{scene.views}</span>
        <span className="inline-flex items-center gap-1"><GitFork className="h-3 w-3" />{scene.forks}</span>
      </div>
    </div>
  );
}
