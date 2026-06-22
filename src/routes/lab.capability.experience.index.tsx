import { createFileRoute } from "@tanstack/react-router";
import { Monitor } from "lucide-react";
import { CapabilityListPage } from "@/components/CapabilityListPage";
import { EXPERIENCE } from "@/lib/capability-data";
export const Route = createFileRoute("/lab/capability/experience/")({
  head: () => ({ meta: [{ title: "在线体验系统 — 能力组件中心" }] }),
  component: () => (
    <CapabilityListPage eyebrow="能力组件中心" title="在线" highlight="体验系统"
      description="可直接体验的数字孪生在线交互系统，覆盖园区、城市、文旅、制造等。"
      items={EXPERIENCE} icon={Monitor} slug="experience" />
  ),
});
