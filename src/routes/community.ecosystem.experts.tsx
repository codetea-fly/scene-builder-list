import { createFileRoute } from "@tanstack/react-router";
import { Placeholder } from "@/components/Placeholder";
export const Route = createFileRoute("/community/ecosystem/experts")({
  head: () => ({ meta: [{ title: "专家库" }] }),
  component: () => <Placeholder title="专家库" />,
});
