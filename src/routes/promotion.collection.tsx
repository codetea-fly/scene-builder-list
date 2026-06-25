import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, MapPin, Users, Trophy, ArrowRight, Megaphone, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/promotion/collection")({
  head: () => ({
    meta: [
      { title: "场景征集活动 — 场景创新促进中心" },
      { name: "description", content: "面向政府、企业、科研机构开展的场景征集、案例遴选、揭榜挂帅等系列活动。" },
    ],
  }),
  component: CollectionListPage,
});

export const COLLECTION_EVENTS = [
  {
    id: "case-selection-2026",
    title: "2026 全国场景案例遴选活动",
    tag: "案例遴选",
    status: "报名中",
    statusColor: "bg-emerald-100 text-emerald-700 ring-emerald-200",
    org: "全国场景创新促进中心",
    date: "2026-03-15 至 2026-10-30",
    location: "线上 + 北京终评",
    desc: "面向人工智能、智能制造、低碳能源等八大领域，遴选具有示范引领作用的高价值场景案例，入选案例将纳入国家级场景案例库并获得资源对接。",
    quota: "拟入选 100 项",
    featured: true,
  },
  {
    id: "ai-megacity-2026",
    title: "超大城市治理场景揭榜挂帅",
    tag: "揭榜挂帅",
    status: "报名中",
    statusColor: "bg-emerald-100 text-emerald-700 ring-emerald-200",
    org: "北京市经信局 · 上海市经信委联合发布",
    date: "2026-04-01 至 2026-06-30",
    location: "北京 / 上海",
    desc: "围绕城市运行、应急管理、交通治理等关键场景发榜，征集具备落地能力的解决方案团队进行揭榜。",
    quota: "10 大榜单 · 单榜奖金 50 万",
  },
  {
    id: "industry-demand-2026q2",
    title: "2026 Q2 大企业场景机会清单征集",
    tag: "场景征集",
    status: "进行中",
    statusColor: "bg-sky-100 text-sky-700 ring-sky-200",
    org: "国资委 · 央企创新联合体",
    date: "2026-04-10 至 2026-05-31",
    location: "全国",
    desc: "面向能源、化工、装备、信息通信等领域央企，征集真实业务场景机会清单，匹配创新产品和解决方案。",
    quota: "首批 50 家央企参与",
  },
  {
    id: "low-carbon-2026",
    title: "双碳场景创新挑战赛",
    tag: "创新挑战",
    status: "即将开启",
    statusColor: "bg-amber-100 text-amber-700 ring-amber-200",
    org: "国家节能中心 · 清华大学",
    date: "2026-05-20 启动",
    location: "线上",
    desc: "围绕零碳园区、绿色制造、CCUS 等典型场景，征集低碳技术解决方案与示范案例。",
    quota: "金/银/铜奖各 3 项",
  },
  {
    id: "medical-2026",
    title: "智慧医疗场景共创计划",
    tag: "场景共创",
    status: "报名中",
    statusColor: "bg-emerald-100 text-emerald-700 ring-emerald-200",
    org: "国家卫健委信息中心",
    date: "2026-03-25 至 2026-07-15",
    location: "北上广深+成都",
    desc: "三甲医院联合发布临床场景，邀请技术企业共建可复制可推广的诊疗辅助类创新方案。",
    quota: "20 家医院 · 80 个场景",
  },
  {
    id: "edu-2025-review",
    title: "教育数字化场景优秀案例征集",
    tag: "案例征集",
    status: "已结束",
    statusColor: "bg-slate-100 text-slate-500 ring-slate-200",
    org: "教育部教育技术与资源发展中心",
    date: "2025-09-01 至 2025-12-31",
    location: "全国",
    desc: "聚焦智慧课堂、AI 助学、教育评价等场景，征集已落地的优秀案例。",
    quota: "已入选 86 项",
  },
];

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
      <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-white/70">
        <Icon className="h-3 w-3" /> {label}
      </div>
      <div className="mt-0.5 text-sm font-medium">{children}</div>
    </div>
  );
}
