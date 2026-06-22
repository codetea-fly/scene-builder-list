import { createFileRoute, notFound } from "@tanstack/react-router";
import { CapabilityDetailPage } from "@/components/CapabilityDetailPage";
import { MODULES } from "@/lib/capability-modules";

export const Route = createFileRoute("/lab/capability/platforms/$id")({
  head: ({ params }) => {
    const it = MODULES.platforms.items.find((x) => x.id === params.id);
    return { meta: [{ title: `${it?.name ?? "平台详情"} — 通用能力平台` }] };
  },
  component: () => {
    const { id } = Route.useParams();
    const mod = MODULES.platforms;
    const it = mod.items.find((x) => x.id === id);
    if (!it) throw notFound();
    return <CapabilityDetailPage item={it} module={mod} />;
  },
});
