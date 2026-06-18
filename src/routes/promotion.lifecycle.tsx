import { createFileRoute } from "@tanstack/react-router";
import { Layers, Target, Boxes, Award, Rocket } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/promotion/lifecycle")({
  head: () => ({
    meta: [
      { title: "场景创新全过程服务体系 — 场景创新促进中心" },
      { name: "description", content: "覆盖场景体系设计、挖掘策划、建设验证、示范转化、推广产业化五大生命周期的端到端服务。" },
    ],
  }),
  component: LifecyclePage,
});

const STAGES = [
  {
    icon: Layers, title: "场景体系设计", subtitle: "规划 · 图谱",
    color: "from-sky-500 to-blue-600",
    bullets: [
      "区域场景资源开发与政策制定顶层规划",
      "区域场景资源分类体系建设与图谱编制",
      "重大场景谋划",
    ],
  },
  {
    icon: Target, title: "场景挖掘与策划", subtitle: "机会清单 + 能力清单",
    color: "from-cyan-500 to-sky-600",
    bullets: [
      "面向政府和大企业的场景征集与高价值场景梳理（机会清单）",
      "面向技术创新企业新产品、新技术的场景策划（能力清单）",
    ],
  },
  {
    icon: Boxes, title: "场景建设与验证", subtitle: "多方共建 · 快速迭代",
    color: "from-blue-500 to-indigo-600",
    bullets: [
      "场景建设与项目全过程管理",
      "方案辅导 · 技术对接 · 实施协调 · 评估优化",
    ],
  },
  {
    icon: Award, title: "场景示范与转化", subtitle: "产品化 · 标准化",
    color: "from-indigo-500 to-blue-600",
    bullets: [
      "标杆示范场景评选与示范申报",
      "场景标杆案例清单梳理",
      "创新产品、解决方案与标准的打磨",
    ],
  },
  {
    icon: Rocket, title: "场景推广与产业化", subtitle: "孵化 · 培育",
    color: "from-sky-500 to-cyan-600",
    bullets: [
      "示范场景对接与孵化",
      "新产品、新赛道、新生态培育",
    ],
  },
];

function LifecyclePage() {
  return (
    <main className="relative mx-auto max-w-7xl px-6 py-12">
      <PageHeader
        eyebrow="场景创新促进中心"
        title="场景创新"
        highlight="全过程服务体系"
        description="覆盖场景五大生命周期，从顶层规划到产业化推广，为政府、大企业、创新企业提供端到端的专业服务。"
      />

      <div className="relative">
        {/* timeline line */}
        <div className="absolute left-8 top-0 hidden h-full w-0.5 bg-gradient-to-b from-sky-200 via-blue-200 to-indigo-200 md:block" />

        <div className="space-y-8">
          {STAGES.map((s, i) => (
            <div key={s.title}
              className="relative animate-fade-in md:pl-24"
              style={{ animationDelay: `${i * 100}ms`, animationFillMode: "backwards" }}>
              <div className={`absolute left-0 top-6 hidden h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${s.color} shadow-lg shadow-sky-300/50 md:flex animate-float-y`}>
                <s.icon className="h-7 w-7 text-white" />
              </div>
              <div className="rounded-2xl border border-sky-100 bg-white/80 p-7 shadow-md shadow-sky-100/50 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-mono text-sky-500">阶段 0{i + 1}</div>
                    <h2 className="mt-1 text-2xl font-bold text-slate-900">{s.title}</h2>
                    <p className="mt-1 text-sm text-sky-600">{s.subtitle}</p>
                  </div>
                  <div className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${s.color} shadow-md md:hidden`}>
                    <s.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <ul className="mt-5 grid gap-2 md:grid-cols-2">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 rounded-xl bg-sky-50/50 px-3 py-2 text-sm text-slate-700 ring-1 ring-sky-100/60">
                      <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r ${s.color}`} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
