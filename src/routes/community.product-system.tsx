import { createFileRoute } from "@tanstack/react-router";
import { Placeholder } from "@/components/Placeholder";
export const Route = createFileRoute("/community/product-system")({
  head: () => ({ meta: [{ title: "创新中心产品体系专题" }] }),
  component: () => <Placeholder title="创新中心产品体系专题" />,
});
