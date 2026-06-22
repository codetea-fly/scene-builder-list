import { createFileRoute, notFound } from "@tanstack/react-router";
import { CapabilityDetailPage } from "@/components/CapabilityDetailPage";
import { MODULES } from "@/lib/capability-modules";

export const Route = createFileRoute("/lab/capability/components/$id")({
  head: ({ params }) => {
    const it = MODULES.components.items.find((x) => x.id === params.id);
    return { meta: [{ title: `${it?.name ?? "组件详情"} — 通用能力组件` }] };
  },
  component: () => {
    const { id } = Route.useParams();
    const mod = MODULES.components;
    const it = mod.items.find((x) => x.id === id);
    if (!it) throw notFound();
    return <CapabilityDetailPage item={it} module={mod} />;
  },
});
