import { createFileRoute, notFound } from "@tanstack/react-router";
import { CapabilityDetailPage } from "@/components/CapabilityDetailPage";
import { MODULES } from "@/lib/capability-modules";

export const Route = createFileRoute("/lab/capability/ai-twin/$id")({
  head: ({ params }) => {
    const it = MODULES["ai-twin"].items.find((x) => x.id === params.id);
    return { meta: [{ title: `${it?.name ?? "AI+数字孪生详情"} — AI+数字孪生能力库` }] };
  },
  component: () => {
    const { id } = Route.useParams();
    const mod = MODULES["ai-twin"];
    const it = mod.items.find((x) => x.id === id);
    if (!it) throw notFound();
    return <CapabilityDetailPage item={it} module={mod} />;
  },
});
