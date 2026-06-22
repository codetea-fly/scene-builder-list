import { createFileRoute } from "@tanstack/react-router";
import { Cpu } from "lucide-react";
import { CapabilityListPage } from "@/components/CapabilityListPage";
import { HARDWARE } from "@/lib/capability-data";
export const Route = createFileRoute("/lab/capability/hardware/")({
  head: () => ({ meta: [{ title: "特定领域软硬件 — 能力组件中心" }] }),
  component: () => (
    <CapabilityListPage eyebrow="能力组件中心" title="特定领域" highlight="软硬件"
      description="面向特定行业场景的专业软硬件一体化解决方案。"
      items={HARDWARE} icon={Cpu} />
  ),
});
