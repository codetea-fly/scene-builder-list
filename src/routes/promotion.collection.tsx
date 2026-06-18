import { createFileRoute } from "@tanstack/react-router";
import { Placeholder } from "@/components/Placeholder";
export const Route = createFileRoute("/promotion/collection")({
  head: () => ({ meta: [{ title: "场景征集活动" }] }),
  component: () => <Placeholder title="场景征集活动" />,
});
