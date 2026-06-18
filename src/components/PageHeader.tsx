import { Sparkles } from "lucide-react";
import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  highlight,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <header className="mb-10 animate-fade-in">
      {eyebrow && (
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/70 px-4 py-1.5 text-xs font-medium text-sky-700 shadow-sm backdrop-blur">
          <Sparkles className="h-3.5 w-3.5" />
          {eyebrow}
        </div>
      )}
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
        {title}
        {highlight && (
          <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
            {highlight}
          </span>
        )}
      </h1>
      {description && (
        <p className="mt-3 max-w-3xl text-slate-600">{description}</p>
      )}
      {children}
    </header>
  );
}
