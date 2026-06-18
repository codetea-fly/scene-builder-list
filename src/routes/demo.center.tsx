import { createFileRoute } from "@tanstack/react-router";
import { Placeholder } from "@/components/Placeholder";
export const Route = createFileRoute("/demo/center")({
  head: () => ({ meta: [{ title: "创新中心示范" }] }),
  component: () => <Placeholder title="创新中心示范" />,
});
