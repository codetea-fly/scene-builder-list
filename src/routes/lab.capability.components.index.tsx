import { createFileRoute } from "@tanstack/react-router";
import { Boxes } from "lucide-react";
import { CapabilityListPage } from "@/components/CapabilityListPage";
import { COMPONENTS } from "@/lib/capability-data";
export const Route = createFileRoute("/lab/capability/components/")({
  head: () => ({ meta: [{ title: "通用能力组件 — 能力组件中心" }] }),
  component: () => (
    <CapabilityListPage eyebrow="能力组件中心" title="通用" highlight="能力组件"
      description="面向通用业务场景的可复用软件组件，支持快速集成与二次开发。"
      items={COMPONENTS} icon={Boxes} />
  ),
});
