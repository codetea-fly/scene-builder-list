import { createFileRoute } from "@tanstack/react-router";
import { Placeholder } from "@/components/Placeholder";
export const Route = createFileRoute("/demo/online")({
  head: () => ({ meta: [{ title: "在线体验中心" }] }),
  component: () => <Placeholder title="在线体验中心" />,
});
