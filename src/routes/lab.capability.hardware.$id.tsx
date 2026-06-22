import { createFileRoute, notFound } from "@tanstack/react-router";
import { CapabilityDetailPage } from "@/components/CapabilityDetailPage";
import { MODULES } from "@/lib/capability-modules";

export const Route = createFileRoute("/lab/capability/hardware/$id")({
  head: ({ params }) => {
    const it = MODULES.hardware.items.find((x) => x.id === params.id);
    return { meta: [{ title: `${it?.name ?? "软硬件详情"} — 特定领域软硬件` }] };
  },
  component: () => {
    const { id } = Route.useParams();
    const mod = MODULES.hardware;
    const it = mod.items.find((x) => x.id === id);
    if (!it) throw notFound();
    return <CapabilityDetailPage item={it} module={mod} />;
  },
});
