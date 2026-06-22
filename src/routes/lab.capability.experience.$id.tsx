import { createFileRoute, notFound } from "@tanstack/react-router";
import { CapabilityDetailPage } from "@/components/CapabilityDetailPage";
import { MODULES } from "@/lib/capability-modules";

export const Route = createFileRoute("/lab/capability/experience/$id")({
  head: ({ params }) => {
    const it = MODULES.experience.items.find((x) => x.id === params.id);
    return { meta: [{ title: `${it?.name ?? "体验系统详情"} — 在线体验系统` }] };
  },
  component: () => {
    const { id } = Route.useParams();
    const mod = MODULES.experience;
    const it = mod.items.find((x) => x.id === id);
    if (!it) throw notFound();
    return <CapabilityDetailPage item={it} module={mod} />;
  },
});
