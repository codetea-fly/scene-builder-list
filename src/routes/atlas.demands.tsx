import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Search, MapPin, Briefcase, Calendar, Wallet, Building2,
  TrendingUp, ClipboardList, CheckCircle2,
} from "lucide-react";
import { DEMANDS, STATUS_STYLES, STATUS_DOT, type DemandStatus } from "@/lib/demands-data";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/atlas/demands")({
  head: () => ({
    meta: [
      { title: "场景需求清单 — 数字孪生场景创新公共服务平台" },
      { name: "description", content: "汇集来自全国各省市、各行业的最新场景建设需求。" },
    ],
  }),
  component: DemandsPage,
});

const STATUSES: ("全部" | DemandStatus)[] = ["全部", "征集中", "评审中", "已立项", "已完成", "已截止"];

function DemandsPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"全部" | DemandStatus>("全部");

  const filtered = useMemo(() => DEMANDS.filter((d) => {
    const mq = !query || [d.name, d.party, d.region, d.domain, d.id].some((v) => v.includes(query));
    const ms = status === "全部" || d.status === status;
    return mq && ms;
  }), [query, status]);

  const stats = useMemo(() => ({
    total: DEMANDS.length,
    collecting: DEMANDS.filter((d) => d.status === "征集中").length,
    approved: DEMANDS.filter((d) => d.status === "已立项").length,
    budget: DEMANDS.reduce((s, d) => s + d.budget, 0),
  }), []);

  return (
    <main className="relative mx-auto max-w-7xl px-6 py-12">
      <PageHeader
        eyebrow="全国场景建设需求汇聚"
        title="场景建设"
        highlight="需求清单"
        description="汇集来自全国各省市、各行业的最新场景建设需求，洞察预算规模、把握立项节奏，让供需对接更高效。"
      />

      <section className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "需求总数", value: stats.total, icon: ClipboardList, color: "from-sky-500 to-blue-500" },
          { label: "正在征集", value: stats.collecting, icon: TrendingUp, color: "from-cyan-500 to-sky-500" },
          { label: "已立项", value: stats.approved, icon: CheckCircle2, color: "from-blue-500 to-indigo-500" },
          { label: "预算总额(万)", value: stats.budget.toLocaleString(), icon: Wallet, color: "from-indigo-500 to-blue-500" },
        ].map((s, i) => (
          <div key={s.label}
            className="group relative overflow-hidden rounded-2xl border border-sky-100 bg-white/80 p-5 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-sky-200/50 animate-fade-in"
            style={{ animationDelay: `${i * 80}ms`, animationFillMode: "backwards" }}>
            <div className={`absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gradient-to-br ${s.color} opacity-10 transition-transform duration-500 group-hover:scale-150`} />
            <s.icon className="mb-3 h-5 w-5 text-sky-500" />
            <div className="text-2xl font-bold text-slate-900">{s.value}</div>
            <div className="mt-1 text-xs text-slate-500">{s.label}</div>
          </div>
        ))}
      </section>

      <section className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sky-400" />
          <input value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索需求名称 / 需求方 / 地域 / 编号"
            className="w-full rounded-xl border border-sky-200 bg-white/80 py-2.5 pl-10 pr-4 text-sm shadow-sm outline-none backdrop-blur transition-all placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100" />
        </div>
        <div className="flex flex-wrap gap-2">
          {STATUSES.map((s) => (
            <button key={s} onClick={() => setStatus(s)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200 hover:scale-105 ${
                status === s
                  ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-300/50"
                  : "border border-sky-200 bg-white/70 text-slate-600 hover:border-sky-300 hover:text-sky-600"
              }`}>{s}</button>
          ))}
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-sky-100 bg-white/80 shadow-xl shadow-sky-100/50 backdrop-blur animate-fade-in">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-sky-50 to-blue-50 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                <th className="px-5 py-4">需求编号</th>
                <th className="px-5 py-4">需求名称</th>
                <th className="px-5 py-4">需求方</th>
                <th className="px-5 py-4">所属地域</th>
                <th className="px-5 py-4">所属领域</th>
                <th className="px-5 py-4 text-right">预算(万)</th>
                <th className="px-5 py-4">需求状态</th>
                <th className="px-5 py-4">截止日期</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d, i) => (
                <tr key={d.id}
                  className="group border-t border-sky-50 transition-all duration-200 hover:bg-sky-50/60 animate-fade-in"
                  style={{ animationDelay: `${i * 30}ms`, animationFillMode: "backwards" }}>
                  <td className="whitespace-nowrap px-5 py-4 font-mono text-xs text-sky-600">{d.id}</td>
                  <td className="px-5 py-4 font-medium text-slate-800 group-hover:text-sky-700">{d.name}</td>
                  <td className="px-5 py-4 text-slate-600"><div className="flex items-center gap-2"><Building2 className="h-3.5 w-3.5 text-sky-400" />{d.party}</div></td>
                  <td className="px-5 py-4 text-slate-600"><div className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-sky-400" />{d.region}</div></td>
                  <td className="px-5 py-4"><span className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-0.5 text-xs text-blue-700 ring-1 ring-blue-100"><Briefcase className="h-3 w-3" />{d.domain}</span></td>
                  <td className="whitespace-nowrap px-5 py-4 text-right font-semibold text-slate-800">{d.budget.toLocaleString()}</td>
                  <td className="px-5 py-4"><span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[d.status]}`}><span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[d.status]}`} />{d.status}</span></td>
                  <td className="whitespace-nowrap px-5 py-4 text-slate-600"><div className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-sky-400" />{d.deadline}</div></td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={8} className="px-5 py-16 text-center text-sm text-slate-400">未找到匹配的需求</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-sky-50 bg-sky-50/40 px-5 py-3 text-xs text-slate-500">
          <span>共 {filtered.length} 条需求</span>
          <span>数据每日同步 · 最后更新 2026-06-17</span>
        </div>
      </section>
    </main>
  );
}
