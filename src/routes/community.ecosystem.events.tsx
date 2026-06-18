import { createFileRoute } from "@tanstack/react-router";
import { Placeholder } from "@/components/Placeholder";
export const Route = createFileRoute("/community/ecosystem/events")({
  head: () => ({ meta: [{ title: "大会活动" }] }),
  component: () => <Placeholder title="大会活动" />,
});
