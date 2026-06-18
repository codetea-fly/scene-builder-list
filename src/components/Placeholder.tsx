import { Link } from "@tanstack/react-router";
import { Construction, ArrowLeft } from "lucide-react";

export function Placeholder({ title, description }: { title: string; description?: string }) {
  return (
    <main className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl flex-col items-center justify-center px-6 py-20 text-center">
      <div className="animate-fade-in rounded-3xl border border-sky-100 bg-white/80 px-10 py-16 shadow-xl shadow-sky-100/50 backdrop-blur">
        <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 shadow-lg shadow-sky-300/50">
          <Construction className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">{title}</h1>
        <p className="mt-3 text-sm text-slate-500">
          {description ?? "该板块正在紧锣密鼓建设中，敬请期待。"}
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-xl border border-sky-200 bg-white px-5 py-2.5 text-sm font-medium text-sky-700 transition-colors hover:bg-sky-50"
        >
          <ArrowLeft className="h-4 w-4" />
          返回首页
        </Link>
      </div>
    </main>
  );
}
