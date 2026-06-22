import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { CapabilityListPage } from "@/components/CapabilityListPage";
import { AI_TWIN } from "@/lib/capability-data";
export const Route = createFileRoute("/lab/capability/ai-twin/")({
  head: () => ({ meta: [{ title: "AI+数字孪生能力库 — 能力组件中心" }] }),
  component: () => (
    <CapabilityListPage eyebrow="能力组件中心" title="AI+" highlight="数字孪生能力库"
      description="AI 大模型与数字孪生融合的预训练模型与场景能力库。"
      items={AI_TWIN} icon={Sparkles} />
  ),
});
