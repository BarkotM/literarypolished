import { createFileRoute } from "@tanstack/react-router";
import { AuthPanel } from "@/components/auth-panel";

export const Route = createFileRoute("/auth/agent")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Literary Agent Entrance — TSEHAI Portal" },
      {
        name: "description",
        content:
          "Literary agents: register your agency, browse the TSEHAI catalogue and request rights conversations on individual titles.",
      },
      { property: "og:title", content: "Literary Agent Entrance — TSEHAI Portal" },
      {
        property: "og:description",
        content: "Register your agency and request to work with TSEHAI titles.",
      },
    ],
  }),
  component: AgentAuth,
});

function AgentAuth() {
  return (
    <AuthPanel
      kind="agent"
      accent="hsl(var(--foreground))"
      eyebrow="Literary Agent Entrance"
      title="For agencies, scouts and rights buyers."
      intro="Register your agency to request working rights on catalogue titles. Every request enters a queue reviewed by the TSEHAI rights manager, and its status stays visible in your requests basket."
      destination="/agent"
      crossLinkLabel="Author & estate entrance"
      crossLinkTo="/auth/author"
      extraFields={[
        { name: "agency_name", label: "Agency or imprint", placeholder: "Agency name", required: true },
        { name: "territory", label: "Territories represented", placeholder: "North America, EU", required: true },
        { name: "rights_handled", label: "Rights handled", placeholder: "Translation, film, audio" },
        { name: "website", label: "Website", placeholder: "https://" },
        { name: "phone", label: "Direct line", placeholder: "+1 …" },
      ]}
    />
  );
}
