import { createFileRoute } from "@tanstack/react-router";
import { Placeholder } from "@/components/Placeholder";
export const Route = createFileRoute("/promotion/consulting")({
  head: () => ({ meta: [{ title: "场景服务咨询" }] }),
  component: () => <Placeholder title="场景服务咨询" />,
});
