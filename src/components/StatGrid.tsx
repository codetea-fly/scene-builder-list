import type { LucideIcon } from "lucide-react";

export interface Stat {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color?: string;
}

export function StatGrid({ stats }: { stats: Stat[] }) {
  return (
    <section className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
      {stats.map((s, i) => (
        <div
          key={s.label}
          className="group relative overflow-hidden rounded-2xl border border-sky-100 bg-white/80 p-5 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-sky-200/50 animate-fade-in"
          style={{ animationDelay: `${i * 80}ms`, animationFillMode: "backwards" }}
        >
          <div className={`absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gradient-to-br ${s.color ?? "from-sky-500 to-blue-500"} opacity-10 transition-transform duration-500 group-hover:scale-150`} />
          <s.icon className="mb-3 h-5 w-5 text-sky-500" />
          <div className="text-2xl font-bold text-slate-900">{s.value}</div>
          <div className="mt-1 text-xs text-slate-500">{s.label}</div>
        </div>
      ))}
    </section>
  );
}
