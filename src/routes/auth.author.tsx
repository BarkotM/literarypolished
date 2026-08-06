import { createFileRoute } from "@tanstack/react-router";
import { AuthPanel } from "@/components/auth-panel";

export const Route = createFileRoute("/auth/author")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Author Entrance — TSEHAI Portal" },
      {
        name: "description",
        content:
          "Authors and literary estates: create a TSEHAI account to manage your author page and request new titles for the catalogue.",
      },
      { property: "og:title", content: "Author Entrance — TSEHAI Portal" },
      {
        property: "og:description",
        content: "Create a TSEHAI author account and submit titles for editorial review.",
      },
    ],
  }),
  component: AuthorAuth,
});

function AuthorAuth() {
  return (
    <AuthPanel
      kind="author"
      accent="hsl(var(--primary))"
      eyebrow="Author & Estate Entrance"
      title="For writers, translators and estates."
      intro="Create an author account to hold your biography, your languages and your bibliography — then submit new titles for editorial review. Everything you enter here becomes the raw material of your author page."
      destination="/account"
      crossLinkLabel="Literary agent entrance"
      crossLinkTo="/auth/agent"
      extraFields={[
        { name: "pen_name", label: "Pen name (if different)", placeholder: "Optional" },
        { name: "languages", label: "Languages you write in", placeholder: "Amharic, English", required: true },
        { name: "genres", label: "Principal genres", placeholder: "History, Fiction" },
        {
          name: "biography",
          label: "Editorial biography",
          placeholder: "Written in the third person, as it would appear on your author page…",
          textarea: true,
          required: true,
        },
      ]}
    />
  );
}
