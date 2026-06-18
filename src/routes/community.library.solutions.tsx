import { createFileRoute } from "@tanstack/react-router";
import { Placeholder } from "@/components/Placeholder";
export const Route = createFileRoute("/community/library/solutions")({
  head: () => ({ meta: [{ title: "解决方案" }] }),
  component: () => <Placeholder title="解决方案" />,
});
