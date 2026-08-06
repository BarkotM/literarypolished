import { Link, createFileRoute } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

export const Route = createFileRoute("/guidelines")({
  component: Guidelines,
  head: () => ({
    meta: [
      { title: "Submission Guidelines & Parameters — TSEHAI Portal" },
      {
        name: "description",
        content:
          "Step-by-step submission rules for authors and literary agents using the TSEHAI bibliographic portal, including rights, solicitation and review timelines.",
      },
      { property: "og:title", content: "Submission Guidelines & Parameters — TSEHAI" },
      {
        property: "og:description",
        content: "How authors and literary agents submit titles and rights requests to TSEHAI Publishers.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const BLOCKS = [
  {
    who: "For authors",
    steps: [
      "Create an author account from “Get started!” and choose the author entrance.",
      "Complete the four registration steps: identity, languages & genres, biography, and review.",
      "Open your account page and use the “+” panel to request a new title.",
      "Declare solicitation status — solicited, referred, or unsolicited — with the name of the editor or referee where applicable.",
      "Supply title, year, genre, language, a 200-word synopsis and a clear statement of rights held.",
      "Submit. Your request enters the rights queue with status “pending”.",
      "Watch your account for the decision: approved, rejected, or a request for more material.",
    ],
    rules: [
      "One title per request — no bundled series submissions.",
      "You must hold or control the rights you claim; estates must name the executor.",
      "An unsolicited submission is accepted, but a solicited or referred submission is read first.",
      "Do not claim a referral you cannot evidence; false referrals end portal access.",
      "Previously published works need publisher, ISBN and year of first publication.",
      "Amharic, Tigrinya, Afaan Oromo, Ge'ez, English and French are accepted.",
      "Synopses must be your own words; no AI-generated substitutes.",
      "Pending requests may be withdrawn by you at any time; approved records may not.",
      "Duplicate submissions of the same title are removed without notice.",
    ],
  },
  {
    who: "For literary agents",
    steps: [
      "Create a literary agent account from “Get started!” and choose the literary agent entrance.",
      "Complete the registration steps: contact, agency, territories & rights handled, and review.",
      "Browse the catalogue or use the header search to find the titles you want.",
      "Open a title and submit a collaboration request in three steps: title, terms, and message.",
      "Check the rights panel on each book — sold, held, in negotiation, and open — before requesting.",
      "Track everything in your basket (cart icon, top right) with live status.",
      "When status turns to “contact literary agents”, open it to reveal our contact details and write within 14 days.",
    ],
    rules: [
      "Requests must come from a named agency, not a personal address.",
      "State the territory and the exact rights sought (print, digital, audio, translation, film).",
      "Languages already listed as sold are not available; requests against them are closed automatically.",
      "One request per title; repeat requests for the same title are ignored.",
      "No offers or figures in the request message — those follow the contact stage.",
      "Contact details released to you are confidential and must not be shared or listed.",
      "Rejected requests may be resubmitted after six months with new terms.",
      "Misrepresenting an agency ends portal access permanently.",
    ],
  },
];

function Guidelines() {
  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />
      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-[1240px] px-5 py-14">
          <div className="eyebrow text-primary">TSEHAI Rights Desk</div>
          <h1 className="mt-5 font-display text-[clamp(2rem,5vw,3.6rem)] leading-tight">
            Submission guidelines &amp; parameters
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Read this before you submit a title or request rights. These parameters govern every
            submission cycle and are applied without exception.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          {BLOCKS.map((block) => (
            <div key={block.who}>
              <div className="eyebrow text-primary">{block.who}</div>
              <ol className="mt-5 space-y-4">
                {block.steps.map((s, i) => (
                  <li key={s} className="flex gap-4">
                    <span className="font-display text-lg text-primary tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm leading-relaxed text-muted-foreground">{s}</span>
                  </li>
                ))}
              </ol>
              <div className="eyebrow mt-8 text-muted-foreground">Rules &amp; parameters</div>
              <ul className="mt-3 space-y-2 border-t border-neutral-200 pt-3">
                {block.rules.map((r) => (
                  <li key={r} className="border-b border-neutral-100 pb-2 text-sm leading-relaxed">
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-10 max-w-3xl text-sm text-muted-foreground">
          Review times run 10–15 working days. Decisions are made by the TSEHAI rights desk and are
          final for the submission cycle in which they were made.{" "}
          <Link to="/catalogue" className="text-primary underline underline-offset-4">
            Browse the catalogue
          </Link>
          .
        </p>
      </section>
      <SiteFooter />
    </div>
  );
}
