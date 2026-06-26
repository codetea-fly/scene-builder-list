import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import {
  Database,
  Cpu,
  LayoutGrid,
  Settings2,
  ShieldCheck,
  Layers,
  Award,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/promotion/maturity")({
  head: () => ({
    meta: [
      { title: "场景成熟度评估中心 — 数字孪生城市成熟度模型" },
      {
        name: "description",
        content:
          "依据《数字孪生城市成熟度评估模型》（T/CCSA 635-2025）团体标准，从数据、能力、应用、运营、安全五大维度评估场景成熟度。",
      },
    ],
  }),
  component: MaturityPage,
});

type DimKey = "data" | "capability" | "application" | "operation" | "security";

const DIMENSIONS: {
  key: DimKey;
  name: string;
  short: string;
  icon: typeof Database;
  color: string;
  weight: number;
  indicators: { name: string; weight: number; desc: string }[];
}[] = [
  {
    key: "data",
    name: "数据维度",
    short: "数据",
    icon: Database,
    color: "#0ea5e9",
    weight: 24,
    indicators: [
      { name: "数据组织", weight: 8, desc: "城市数字实体的构建、组织与规范化" },
      { name: "数据管理", weight: 8, desc: "采集、存储、共享与全生命周期治理" },
      { name: "数据质量", weight: 8, desc: "完整性、准确性、一致性、时效性" },
    ],
  },
  {
    key: "capability",
    name: "能力维度",
    short: "能力",
    icon: Cpu,
    color: "#6366f1",
    weight: 42,
    indicators: [
      { name: "物联感知操控能力", weight: 5, desc: "感知接入、控制反馈与边端联动" },
      { name: "三维模型构建能力", weight: 5, desc: "几何、语义、属性化的数字化表达" },
      { name: "可视化渲染能力", weight: 5, desc: "实时、精细、沉浸式渲染呈现" },
      { name: "数据融合供给能力", weight: 4, desc: "多源数据级、特征级、决策级融合" },
      { name: "时空分析计算能力", weight: 4, desc: "时空索引、聚合分析、计算服务" },
      { name: "模拟仿真推演能力", weight: 5, desc: "局部/全局、静态/动态仿真预测" },
      { name: "虚实融合互动能力", weight: 4, desc: "虚实映射、双向控制与协同" },
      { name: "自学习自优化能力", weight: 5, desc: "AI 驱动的持续优化与自迭代" },
      { name: "众创扩展应用能力", weight: 5, desc: "数据/能力/场景的开放扩展" },
    ],
  },
  {
    key: "application",
    name: "应用维度",
    short: "应用",
    icon: LayoutGrid,
    color: "#10b981",
    weight: 16,
    indicators: [
      { name: "应用效果", weight: 8, desc: "在治理、服务、产业等场景的成效" },
      { name: "客户服务", weight: 8, desc: "面向 G/B/C 端的服务模式与品牌" },
    ],
  },
  {
    key: "operation",
    name: "运营维度",
    short: "运营",
    icon: Settings2,
    color: "#f59e0b",
    weight: 14,
    indicators: [
      { name: "项目管理", weight: 7, desc: "规划、过程、成效与可持续管理" },
      { name: "人才支撑", weight: 7, desc: "团队结构、知识储备与专业能力" },
    ],
  },
  {
    key: "security",
    name: "安全维度",
    short: "安全",
    icon: ShieldCheck,
    color: "#ef4444",
    weight: 4,
    indicators: [
      { name: "安全保障", weight: 4, desc: "技术保障与制度保障双轨建设" },
    ],
  },
];

const LEVELS = [
  { level: 1, name: "起始级", range: "1 ≤ S < 2", color: "#94a3b8", desc: "具备基础数字化条件，能力初步建立。" },
  { level: 2, name: "应用级", range: "2 ≤ S < 3", color: "#38bdf8", desc: "重点场景具备应用能力，初步形成单点价值。" },
  { level: 3, name: "集成级", range: "3 ≤ S < 4", color: "#6366f1", desc: "跨域数据与能力集成，形成体系化应用。" },
  { level: 4, name: "成熟级", range: "4 ≤ S < 5", color: "#10b981", desc: "全域协同、动态仿真，运营商业闭环。" },
  { level: 5, name: "引领级", range: "S = 5", color: "#f59e0b", desc: "智能自迭代、规模化输出，引领行业实践。" },
];

// 示例评估样本（“当前项目” vs “行业基准”）
const SAMPLE = {
  current: { data: 3.6, capability: 3.2, application: 2.8, operation: 3.0, security: 2.6 },
  benchmark: { data: 3.0, capability: 2.8, application: 2.6, operation: 2.8, security: 2.4 },
};

function getLevel(score: number) {
  if (score >= 5) return LEVELS[4];
  if (score >= 4) return LEVELS[3];
  if (score >= 3) return LEVELS[2];
  if (score >= 2) return LEVELS[1];
  return LEVELS[0];
}

function MaturityPage() {
  const [scores, setScores] = useState<Record<DimKey, number>>(SAMPLE.current);
  const [showBenchmark, setShowBenchmark] = useState(true);

  const chartData = useMemo(
    () =>
      DIMENSIONS.map((d) => ({
        dimension: d.short,
        当前评估: Number(scores[d.key].toFixed(2)),
        行业基准: Number(SAMPLE.benchmark[d.key].toFixed(2)),
        fullMark: 5,
      })),
    [scores],
  );

  const totalScore = useMemo(() => {
    const total = DIMENSIONS.reduce((sum, d) => sum + scores[d.key] * d.weight, 0);
    const weightSum = DIMENSIONS.reduce((s, d) => s + d.weight, 0);
    return total / weightSum;
  }, [scores]);

  const currentLevel = getLevel(totalScore);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <PageHeader
        eyebrow="T/CCSA 635-2025"
        title="场景成熟度评估"
        highlight="中心"
        description="基于《数字孪生城市成熟度评估模型》团体标准，从数据、能力、应用、运营、安全五大维度构建场景成熟度评估体系，量化项目水平、识别差距、指导持续演进。"
      />

      {/* 模型概览 */}
      <Reveal variant="fade-up">
        <section className="mb-10 grid gap-4 md:grid-cols-5">
          {DIMENSIONS.map((d) => {
            const Icon = d.icon;
            return (
              <div
                key={d.key}
                className="group rounded-2xl border border-sky-100 bg-white/80 p-5 shadow-sm backdrop-blur transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div
                  className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-md"
                  style={{ backgroundColor: d.color }}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-base font-semibold text-slate-900">{d.name}</div>
                <div className="mt-1 text-xs text-slate-500">权重 {d.weight}%</div>
                <div className="mt-3 text-xs leading-relaxed text-slate-600">
                  {d.indicators.length} 项二级指标
                </div>
              </div>
            );
          })}
        </section>
      </Reveal>

      <div className="grid gap-8 lg:grid-cols-5">
        {/* 雷达图 */}
        <Reveal variant="fade-left" className="lg:col-span-3">
          <section className="rounded-3xl border border-sky-100 bg-white/85 p-6 shadow-lg backdrop-blur">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-lg font-semibold text-slate-900">成熟度雷达图</div>
                <div className="text-xs text-slate-500">
                  五维度评分对比 · 满分 5 分
                </div>
              </div>
              <label className="flex cursor-pointer items-center gap-2 text-xs text-slate-600">
                <input
                  type="checkbox"
                  checked={showBenchmark}
                  onChange={(e) => setShowBenchmark(e.target.checked)}
                  className="h-3.5 w-3.5 accent-sky-500"
                />
                显示行业基准
              </label>
            </div>

            <div className="h-[420px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={chartData} outerRadius="78%">
                  <PolarGrid stroke="#cbd5e1" strokeDasharray="3 3" />
                  <PolarAngleAxis
                    dataKey="dimension"
                    tick={{ fill: "#0f172a", fontSize: 14, fontWeight: 600 }}
                  />
                  <PolarRadiusAxis angle={90} domain={[0, 5]} tick={{ fill: "#64748b", fontSize: 11 }} />
                  {showBenchmark && (
                    <Radar
                      name="行业基准"
                      dataKey="行业基准"
                      stroke="#94a3b8"
                      fill="#94a3b8"
                      fillOpacity={0.18}
                      strokeWidth={2}
                    />
                  )}
                  <Radar
                    name="当前评估"
                    dataKey="当前评估"
                    stroke="#0ea5e9"
                    fill="#0ea5e9"
                    fillOpacity={0.45}
                    strokeWidth={2}
                  />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid #e0f2fe",
                      background: "rgba(255,255,255,0.95)",
                      fontSize: 12,
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* 滑块 */}
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {DIMENSIONS.map((d) => (
                <div key={d.key} className="rounded-xl border border-slate-100 bg-slate-50/60 p-3">
                  <div className="mb-1.5 flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-700">{d.name}</span>
                    <span
                      className="rounded-md px-2 py-0.5 font-semibold text-white"
                      style={{ backgroundColor: d.color }}
                    >
                      {scores[d.key].toFixed(1)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    step={0.1}
                    value={scores[d.key]}
                    onChange={(e) =>
                      setScores((s) => ({ ...s, [d.key]: Number(e.target.value) }))
                    }
                    className="w-full accent-sky-500"
                  />
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* 评分汇总 */}
        <Reveal variant="fade-right" className="lg:col-span-2">
          <section className="flex h-full flex-col gap-5">
            <div
              className="rounded-3xl border p-6 text-white shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${currentLevel.color}, #0f172a)`,
                borderColor: currentLevel.color,
              }}
            >
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest opacity-80">
                <Award className="h-4 w-4" />
                综合评估结果
              </div>
              <div className="mt-3 flex items-end gap-3">
                <div className="text-5xl font-bold">{totalScore.toFixed(2)}</div>
                <div className="mb-1 text-sm opacity-80">/ 5.00</div>
              </div>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm backdrop-blur">
                <TrendingUp className="h-4 w-4" />
                第{currentLevel.level}级 · {currentLevel.name}
              </div>
              <p className="mt-3 text-sm leading-relaxed opacity-90">{currentLevel.desc}</p>
            </div>

            <div className="rounded-3xl border border-sky-100 bg-white/85 p-5 shadow-sm backdrop-blur">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900">
                <Layers className="h-4 w-4 text-sky-600" />
                五级成熟度划分
              </div>
              <div className="space-y-2">
                {LEVELS.map((l) => {
                  const active = l.level === currentLevel.level;
                  return (
                    <div
                      key={l.level}
                      className={`flex items-start gap-3 rounded-xl border p-3 transition-all ${
                        active
                          ? "border-sky-300 bg-sky-50/70 shadow-sm"
                          : "border-slate-100 bg-white"
                      }`}
                    >
                      <div
                        className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white"
                        style={{ backgroundColor: l.color }}
                      >
                        L{l.level}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-baseline justify-between">
                          <span className="text-sm font-semibold text-slate-900">
                            {l.name}
                          </span>
                          <span className="text-[11px] text-slate-500">{l.range}</span>
                        </div>
                        <p className="mt-0.5 text-xs leading-relaxed text-slate-600">
                          {l.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </Reveal>
      </div>

      {/* 指标体系详解 */}
      <Reveal variant="fade-up">
        <section className="mt-12">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">指标体系</h2>
              <p className="mt-1 text-sm text-slate-600">
                共 5 个评估维度、17 项二级指标，权重示例参考 T/CCSA 635-2025 附录 A。
              </p>
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {DIMENSIONS.map((d) => {
              const Icon = d.icon;
              return (
                <div
                  key={d.key}
                  className="rounded-2xl border border-sky-100 bg-white/85 p-5 shadow-sm backdrop-blur"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-white"
                        style={{ backgroundColor: d.color }}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-base font-semibold text-slate-900">
                          {d.name}
                        </div>
                        <div className="text-xs text-slate-500">
                          维度权重 {d.weight}%
                        </div>
                      </div>
                    </div>
                    <div
                      className="rounded-lg px-2.5 py-1 text-xs font-semibold text-white"
                      style={{ backgroundColor: d.color }}
                    >
                      {scores[d.key].toFixed(1)} / 5
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {d.indicators.map((ind) => (
                      <li
                        key={ind.name}
                        className="flex items-start gap-2 rounded-lg border border-slate-100 bg-slate-50/50 px-3 py-2"
                      >
                        <CheckCircle2
                          className="mt-0.5 h-4 w-4 shrink-0"
                          style={{ color: d.color }}
                        />
                        <div className="flex-1">
                          <div className="flex items-baseline justify-between">
                            <span className="text-sm font-medium text-slate-800">
                              {ind.name}
                            </span>
                            <span className="text-[11px] text-slate-500">
                              权重 {ind.weight}%
                            </span>
                          </div>
                          <p className="mt-0.5 text-xs text-slate-600">{ind.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>
      </Reveal>

      {/* 评估方法 */}
      <Reveal variant="fade-up">
        <section className="mt-12 rounded-3xl border border-sky-100 bg-gradient-to-br from-sky-50/70 to-white/80 p-8 shadow-sm backdrop-blur">
          <h2 className="text-2xl font-bold text-slate-900">评估方法</h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-600">
            采用「分维度逐项打分 → 加权求和 → 等级判定」三步法。每项二级指标依据满足程度赋分：
            <span className="mx-1 rounded bg-white px-1.5 py-0.5 text-xs">全部满足 1.0</span>
            <span className="mx-1 rounded bg-white px-1.5 py-0.5 text-xs">大部分满足 0.8</span>
            <span className="mx-1 rounded bg-white px-1.5 py-0.5 text-xs">部分满足 0.5</span>
            <span className="mx-1 rounded bg-white px-1.5 py-0.5 text-xs">不满足 0</span>
            ，按权重汇总后得到综合评分 S，对照 5 个成熟度等级判定项目所处水平。
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              { step: "01", title: "维度打分", text: "按 17 项二级指标逐项核对要求等级，给出 1~5 级评分。" },
              { step: "02", title: "加权汇总", text: "依据指标权重示例（数据 24%、能力 42%、应用 16%、运营 14%、安全 4%）加权求和。" },
              { step: "03", title: "等级判定", text: "根据综合评分 S 对照《T/CCSA 635-2025》表 4 判定五级成熟度。" },
            ].map((s) => (
              <div
                key={s.step}
                className="rounded-2xl border border-white/80 bg-white/80 p-5 shadow-sm"
              >
                <div className="text-3xl font-bold text-sky-500">{s.step}</div>
                <div className="mt-1 text-base font-semibold text-slate-900">{s.title}</div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-sky-200 bg-white/70 px-4 py-3 text-xs text-slate-500">
            参考标准：T/CCSA 635-2025《数字孪生城市成熟度评估模型》（中国通信标准化协会，2025-02-24 发布）。
          </div>
        </section>
      </Reveal>
    </div>
  );
}
