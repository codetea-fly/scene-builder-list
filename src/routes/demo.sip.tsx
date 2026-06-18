import { createFileRoute } from "@tanstack/react-router";
import { Placeholder } from "@/components/Placeholder";
export const Route = createFileRoute("/demo/sip")({
  head: () => ({ meta: [{ title: "SIP实践" }] }),
  component: () => <Placeholder title="SIP实践" />,
});
