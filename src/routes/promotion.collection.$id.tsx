import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft, Calendar, MapPin, Megaphone, Trophy, Users, CheckCircle2,
  ClipboardList, Award, Download, Sparkles, FileText, Mail, Phone,
} from "lucide-react";
import { COLLECTION_EVENTS } from "@/data/collectionEvents";
import posterImg from "@/assets/poster-case-selection.jpg";

export const Route = createFileRoute("/promotion/collection/$id")({
  head: ({ params }) => {
    const e = COLLECTION_EVENTS.find((x) => x.id === params.id);
    return {
      meta: [
        { title: `${e?.title ?? "活动详情"} — 场景征集活动` },
        { name: "description", content: e?.desc ?? "场景征集活动详情。" },
      ],
    };
  },
  loader: ({ params }) => {
    const event = COLLECTION_EVENTS.find((e) => e.id === params.id);
    if (!event) throw notFound();
    return { event };
  },
  notFoundComponent: () => (
    <main className="mx-auto max-w-3xl px-6 py-20 text-center">
      <h1 className="text-2xl font-bold text-slate-900">活动不存在</h1>
      <Link to="/promotion/collection" className="mt-4 inline-block text-sky-600 hover:underline">
        返回活动列表
      </Link>
    </main>
  ),
  errorComponent: () => (
    <main className="mx-auto max-w-3xl px-6 py-20 text-center">
      <h1 className="text-2xl font-bold text-slate-900">加载失败</h1>
    </main>
  ),
  component: CollectionDetailPage,
});

const STAGES = [
  { name: "报名启动", date: "2026-03-15", desc: "线上提交报名表与初步材料" },
  { name: "资格初审", date: "2026-05-31", desc: "组委会形式审查与材料完备性核验" },
  { name: "专家评审", date: "2026-07-15", desc: "分领域专家对入围案例评分" },
  { name: "现场答辩", date: "2026-09-20", desc: "前 30% 案例进入答辩与现场交流" },
  { name: "结果公示", date: "2026-10-15", desc: "入选名单公示并颁发证书" },
  { name: "示范推广", date: "2026-10-30 之后", desc: "案例纳入国家场景案例库并对接资源" },
];

const RULES = [
  { title: "申报主体", text: "境内注册满 1 年的企事业单位、科研院所、高等院校均可申报，鼓励产学研用联合申报。" },
  { title: "案例要求", text: "案例须为真实落地或已通过原型验证，能够清晰描述场景背景、技术方案、应用效果与可复制性。" },
  { title: "评审维度", text: "创新性（30%）· 落地效果（30%）· 行业带动（20%）· 推广价值（20%）。" },
  { title: "评审专家", text: "由场景创新促进中心专家委员会、行业龙头企业 CTO、高校学者组成，采用双盲评分机制。" },
  { title: "权益保障", text: "申报材料涉及的商业秘密签署保密协议；知识产权归申报主体所有。" },
  { title: "入选权益", text: "纳入国家级场景案例库、获得中心证书、优先对接产业资源与示范推广通道。" },
];

const DOMAINS = ["人工智能", "智能制造", "智慧城市", "数字医疗", "智慧交通", "低碳能源", "数字农业", "数字教育"];

function CollectionDetailPage() {
  const { event } = Route.useLoaderData();
  const [form, setForm] = useState({ name: "", org: "", phone: "", email: "", domain: DOMAINS[0], scene: "" });
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="relative mx-auto max-w-7xl px-6 py-10">
      <Link
        to="/promotion/collection"
        className="inline-flex items-center gap-1.5 text-sm text-sky-600 transition-colors hover:text-sky-800"
      >
        <ArrowLeft className="h-4 w-4" /> 返回活动列表
      </Link>

      {/* Hero */}
      <header className="mt-4 overflow-hidden rounded-3xl border border-sky-200 bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 text-white shadow-xl shadow-sky-200/50 animate-fade-in">
        <div className="grid gap-6 p-8 md:grid-cols-[1fr_280px] md:p-10">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
                <Sparkles className="h-3 w-3" /> {event.tag}
              </span>
              <span className="rounded-full bg-emerald-400/90 px-3 py-1 text-xs font-medium">{event.status}</span>
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{event.title}</h1>
            <p className="mt-3 max-w-2xl text-sm text-white/85">{event.desc}</p>
            <div className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
              <HeroInfo icon={Megaphone} label="主办单位">{event.org}</HeroInfo>
              <HeroInfo icon={Calendar} label="活动周期">{event.date}</HeroInfo>
              <HeroInfo icon={MapPin} label="活动地点">{event.location}</HeroInfo>
              <HeroInfo icon={Trophy} label="规模奖项">{event.quota}</HeroInfo>
            </div>
          </div>
          <div className="hidden self-center md:block">
            <img
              src={posterImg}
              alt={`${event.title} 海报`}
              loading="lazy"
              width={280}
              height={420}
              className="aspect-[2/3] w-full rounded-2xl object-cover shadow-2xl ring-4 ring-white/30"
            />
          </div>
        </div>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-10">
          {/* 活动报名 */}
          <Section icon={ClipboardList} title="活动报名" subtitle="填写以下信息提交场景案例报名">
            {submitted ? (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
                <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" />
                <p className="mt-3 text-base font-semibold text-emerald-800">报名提交成功</p>
                <p className="mt-1 text-sm text-emerald-700">
                  组委会将在 5 个工作日内通过邮件与您联系，请保持通讯畅通。
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 rounded-full border border-emerald-300 bg-white px-4 py-1.5 text-sm font-medium text-emerald-700 hover:bg-emerald-100"
                >
                  再报名一项
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid gap-4 rounded-2xl border border-sky-100 bg-white/80 p-6 shadow-sm backdrop-blur md:grid-cols-2">
                <Field label="联系人">
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" />
                </Field>
                <Field label="所在单位">
                  <input required value={form.org} onChange={(e) => setForm({ ...form, org: e.target.value })} className="input" />
                </Field>
                <Field label="联系电话">
                  <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input" />
                </Field>
                <Field label="邮箱">
                  <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input" />
                </Field>
                <Field label="申报领域">
                  <select value={form.domain} onChange={(e) => setForm({ ...form, domain: e.target.value })} className="input">
                    {DOMAINS.map((d) => <option key={d}>{d}</option>)}
                  </select>
                </Field>
                <Field label="案例名称">
                  <input required value={form.scene} onChange={(e) => setForm({ ...form, scene: e.target.value })} className="input" />
                </Field>
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-sky-300/50 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    提交报名
                  </button>
                  <p className="mt-2 text-xs text-slate-500">
                    提交后将自动发送报名回执至您的邮箱，并由组委会安排后续审查。
                  </p>
                </div>
                <style>{`.input{height:40px;border-radius:0.75rem;border:1px solid #bae6fd;background:#fff;padding:0 0.875rem;font-size:0.875rem;outline:none;transition:all .2s}.input:focus{border-color:#0ea5e9;box-shadow:0 0 0 3px rgba(14,165,233,.15)}`}</style>
              </form>
            )}
          </Section>

          {/* 遴选规则 */}
          <Section icon={Award} title="遴选规则" subtitle="评审流程、评分维度与权益保障">
            <div className="rounded-2xl border border-sky-100 bg-white/80 p-6 backdrop-blur">
              <div className="grid gap-4 md:grid-cols-2">
                {RULES.map((r) => (
                  <div key={r.title} className="rounded-xl border border-sky-100 bg-sky-50/40 p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-sky-800">
                      <CheckCircle2 className="h-4 w-4 text-sky-500" />
                      {r.title}
                    </div>
                    <p className="mt-1.5 text-sm text-slate-600">{r.text}</p>
                  </div>
                ))}
              </div>

              <h3 className="mt-8 text-sm font-semibold text-slate-900">活动时间线</h3>
              <ol className="relative mt-3 space-y-4 border-l-2 border-sky-100 pl-6">
                {STAGES.map((s, i) => (
                  <li key={s.name} className="relative">
                    <div className="absolute -left-[31px] grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-sky-500 to-blue-600 text-[11px] font-bold text-white shadow">
                      {i + 1}
                    </div>
                    <div className="text-sm font-medium text-slate-900">{s.name}</div>
                    <div className="text-xs text-sky-600">{s.date}</div>
                    <div className="mt-0.5 text-sm text-slate-600">{s.desc}</div>
                  </li>
                ))}
              </ol>
            </div>
          </Section>

          {/* 活动海报 */}
          <Section icon={FileText} title="活动海报" subtitle="点击可查看大图或下载">
            <div className="grid gap-6 rounded-2xl border border-sky-100 bg-white/80 p-6 backdrop-blur md:grid-cols-[300px_1fr]">
              <a href={posterImg} target="_blank" rel="noreferrer" className="group block overflow-hidden rounded-2xl shadow-lg ring-1 ring-sky-200 transition-transform hover:-translate-y-1">
                <img
                  src={posterImg}
                  alt={`${event.title} 海报`}
                  loading="lazy"
                  width={600}
                  height={900}
                  className="aspect-[2/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </a>
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">2026 全国场景案例遴选 · 官方海报</h3>
                  <p className="mt-2 text-sm text-slate-600">
                    海报由组委会统一设计，可用于行业宣传、内部转发与活动现场展示。如需高清矢量版本（AI / PDF），请联系组委会获取。
                  </p>
                  <ul className="mt-4 space-y-1.5 text-sm text-slate-600">
                    <li>· 标准版：1024 × 1536，适合社交媒体传播</li>
                    <li>· 印刷版：A2/A1 高清矢量，含留白与出血</li>
                    <li>· 横幅版：用于会场背景与官网 Banner</li>
                  </ul>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  <a
                    href={posterImg}
                    download
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <Download className="h-4 w-4" /> 下载海报
                  </a>
                  <a
                    href={posterImg}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-5 py-2 text-sm font-medium text-sky-700 hover:bg-sky-50"
                  >
                    查看大图
                  </a>
                </div>
              </div>
            </div>
          </Section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-sky-100 bg-white/80 p-5 shadow-sm backdrop-blur">
            <div className="text-xs font-semibold text-sky-600">报名截止</div>
            <div className="mt-1 text-2xl font-bold text-slate-900">2026-05-31</div>
            <div className="mt-1 text-xs text-slate-500">逾期不再受理新案例</div>
            <a
              href="#报名"
              className="mt-4 block w-full rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-md transition-all hover:-translate-y-0.5"
            >
              立即报名
            </a>
          </div>

          <div className="rounded-2xl border border-sky-100 bg-white/80 p-5 shadow-sm backdrop-blur">
            <div className="text-sm font-semibold text-slate-900">申报领域</div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {DOMAINS.map((d) => (
                <span key={d} className="rounded-full bg-sky-50 px-2.5 py-1 text-xs text-sky-700 ring-1 ring-sky-200">
                  {d}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-sky-100 bg-white/80 p-5 shadow-sm backdrop-blur">
            <div className="text-sm font-semibold text-slate-900">组委会联系方式</div>
            <div className="mt-3 space-y-2 text-sm text-slate-600">
              <div className="flex items-center gap-2"><Users className="h-4 w-4 text-sky-500" />联系人：李老师</div>
              <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-sky-500" />010-8888 8888</div>
              <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-sky-500" />scene@cisic.org.cn</div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}

function HeroInfo({ icon: Icon, label, children }: { icon: typeof Calendar; label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-white/10 px-3 py-2 backdrop-blur ring-1 ring-white/15">
      <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-white/70">
        <Icon className="h-3 w-3" /> {label}
      </div>
      <div className="mt-0.5 text-sm font-medium">{children}</div>
    </div>
  );
}

function Section({ icon: Icon, title, subtitle, children }: { icon: typeof Calendar; title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="animate-fade-in">
      <div className="mb-4 flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-md shadow-sky-300/50">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">{title}</h2>
          {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-slate-700">{label}</span>
      {children}
    </label>
  );
}
