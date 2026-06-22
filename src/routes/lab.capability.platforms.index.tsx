import { createFileRoute } from "@tanstack/react-router";
import { Layers } from "lucide-react";
import { CapabilityListPage } from "@/components/CapabilityListPage";
import { PLATFORMS } from "@/lib/capability-data";
export const Route = createFileRoute("/lab/capability/platforms/")({
  head: () => ({ meta: [{ title: "通用能力平台 — 能力组件中心" }] }),
  component: () => (
    <CapabilityListPage eyebrow="能力组件中心" title="通用" highlight="能力平台"
      description="面向行业应用的中台型能力平台，开箱即用、可灵活组合。"
      items={PLATFORMS} icon={Layers} slug="platforms" />
  ),
});
