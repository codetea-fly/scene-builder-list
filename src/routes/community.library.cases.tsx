import { createFileRoute } from "@tanstack/react-router";
import { Placeholder } from "@/components/Placeholder";
export const Route = createFileRoute("/community/library/cases")({
  head: () => ({ meta: [{ title: "案例库" }] }),
  component: () => <Placeholder title="案例库" />,
});
