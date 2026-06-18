import { createFileRoute } from "@tanstack/react-router";
import { Placeholder } from "@/components/Placeholder";
export const Route = createFileRoute("/promotion/maturity")({
  head: () => ({ meta: [{ title: "场景成熟度评估中心" }] }),
  component: () => <Placeholder title="场景成熟度评估中心" />,
});
