import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, MapPin, Users, Trophy, ArrowRight, Megaphone, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { COLLECTION_EVENTS } from "@/data/collectionEvents";

export const Route = createFileRoute("/promotion/collection/")({
  head: () => ({
    meta: [
      { title: "场景征集活动 — 场景创新促进中心" },
      { name: "description", content: "面向政府、企业、科研机构开展的场景征集、案例遴选、揭榜挂帅等系列活动。" },
    ],
  }),
  component: CollectionListPage,
});

function CollectionListPage() {
  const featured = COLLECTION_EVENTS.find((e) => e.featured);
  const others = COLLECTION_EVENTS.filter((e) => !e.featured);

  return (
    <main className="relative mx-auto max-w-7xl px-6 py-12">
      <PageHeader
        eyebrow="场景创新促进中心"
        title="场景"
        highlight="征集活动"
        description="面向政府、央企、科研机构、技术企业开展的场景征集、案例遴选、揭榜挂帅等系列活动，汇聚高价值场景资源、对接创新供需。"
      />

      {featured && (
        <Link
          to="/promotion/collection/$id"
          params={{ id: featured.id }}
          className="group mb-8 block animate-fade-in overflow-hidden rounded-3xl border border-sky-200 bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 p-[1px] shadow-xl shadow-sky-200/50"
        >
          <div className="rounded-3xl bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 p-8 text-white">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
                <Sparkles className="h-3 w-3" /> 重点活动
              </span>
              <span className="rounded-full bg-emerald-400/90 px-3 py-1 text-xs font-medium text-white">
                {featured.status}
              </span>
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs backdrop-blur">{featured.tag}</span>
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight">{featured.title}</h2>
            <p className="mt-3 max-w-3xl text-sm text-white/85">{featured.desc}</p>
            <div className="mt-6 grid gap-3 text-sm text-white/90 sm:grid-cols-2 lg:grid-cols-4">
              <Info icon={Megaphone} label="主办">{featured.org}</Info>
              <Info icon={Calendar} label="时间">{featured.date}</Info>
              <Info icon={MapPin} label="地点">{featured.location}</Info>
              <Info icon={Trophy} label="规模">{featured.quota}</Info>
            </div>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-blue-700 shadow-md transition-all duration-300 group-hover:translate-x-1">
              查看详情 <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </Link>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        {others.map((e, i) => (
          <Link
            key={e.id}
            to="/promotion/collection/$id"
            params={{ id: e.id }}
            className="group block animate-fade-in rounded-2xl border border-sky-100 bg-white/80 p-6 shadow-md shadow-sky-100/40 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-sky-300 hover:shadow-xl"
            style={{ animationDelay: `${i * 80}ms`, animationFillMode: "backwards" }}
          >
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-sky-50 px-2.5 py-0.5 text-xs font-medium text-sky-700 ring-1 ring-sky-200">
                {e.tag}
              </span>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ${e.statusColor}`}>
                {e.status}
              </span>
            </div>
            <h3 className="mt-3 text-lg font-bold text-slate-900 transition-colors group-hover:text-sky-700">
              {e.title}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm text-slate-600">{e.desc}</p>
            <div className="mt-4 space-y-1.5 text-xs text-slate-500">
              <div className="flex items-center gap-1.5"><Megaphone className="h-3.5 w-3.5 text-sky-500" />{e.org}</div>
              <div className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-sky-500" />{e.date}</div>
              <div className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-sky-500" />{e.location}</div>
              <div className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5 text-sky-500" />{e.quota}</div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

function Info({ icon: Icon, label, children }: { icon: typeof Calendar; label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-white/10 px-3 py-2 backdrop-blur ring-1 ring-white/15">
      <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-white/80">
        <Icon className="h-3 w-3" /> {label}
      </div>
      <div className="mt-0.5 text-sm font-medium">{children}</div>
    </div>
  );
}
