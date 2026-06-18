import { createFileRoute } from "@tanstack/react-router";
import { Placeholder } from "@/components/Placeholder";
export const Route = createFileRoute("/community/library/standards")({
  head: () => ({ meta: [{ title: "规范标准库" }] }),
  component: () => <Placeholder title="规范标准库" />,
});
