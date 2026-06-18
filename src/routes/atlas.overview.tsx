import { createFileRoute } from "@tanstack/react-router";
import { Placeholder } from "@/components/Placeholder";
export const Route = createFileRoute("/atlas/overview")({
  head: () => ({ meta: [{ title: "全景式场景图谱" }] }),
  component: () => <Placeholder title="全景式场景图谱" description="覆盖全行业的多维度场景图谱，正在构建中。" />,
});
