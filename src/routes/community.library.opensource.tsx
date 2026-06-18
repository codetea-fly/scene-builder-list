import { createFileRoute } from "@tanstack/react-router";
import { Placeholder } from "@/components/Placeholder";
export const Route = createFileRoute("/community/library/opensource")({
  head: () => ({ meta: [{ title: "开源技术资源库" }] }),
  component: () => <Placeholder title="开源技术资源库" />,
});
