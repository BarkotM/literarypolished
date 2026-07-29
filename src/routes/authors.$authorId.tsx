import { useState } from "react";
import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, ChevronDown, Heart, Quote } from "lucide-react";
import { AuthorPortrait } from "@/components/author-portrait";
import { BookCover } from "@/components/book-cover";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { Author } from "@/data/catalog";
import { authors, eras, getAuthor } from "@/data/catalog";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/authors/$authorId")({
  validateSearch: (search: Record<string, unknown>) => ({
    highlight: typeof search.highlight === "string" ? search.highlight : undefined,
  }),
  loader: ({ params }): { author: Author } => {
    const author = getAuthor(params.authorId);
    if (!author) throw notFound();
    return { author };
  },
  head: ({ loaderData }) => {
    const a = loaderData?.author;
    const title = a ? `${a.name} — TSEHAI Author Portal` : "Author — TSEHAI";
    const description = a
      ? `${a.name} (${a.lifespan}). ${a.tagline} Biography, complete bibliography and archival access at TSEHAI Publishers.`
      : "Author page at TSEHAI Publishers.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "profile" },
        { property: "og:url", content: `/authors/${a?.id ?? ""}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/authors/${a?.id ?? ""}` }],
    };
  },
  component: AuthorPage,
  errorComponent: () => <Fallback title="This author page didn't load" />,
  notFoundComponent: () => <Fallback title="Author not found" />,
});

function Fallback({ title }: { title: string }) {
  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />
      <div className="mx-auto max-w-[1240px] px-5 py-32 text-center">
        <h1 className="font-display text-3xl">{title}</h1>
        <Link to="/" className="eyebrow mt-6 inline-block text-primary">
          Back to the portal
        </Link>
      </div>
    </div>
  );
}

function AuthorPage() {
  const params = Route.useParams();
  const author: Author = getAuthor(params.authorId)!;
  const search = Route.useSearch();
  const highlight: string | undefined = search.highlight;
  const [era, setEra] = useState("All eras");
  const [following, setFollowing] = useState(false);

  const related = authors.filter((a) => a.id !== author.id).slice(0, 3);
  const books = author.books.filter((b) => era === "All eras" || b.era === era);

  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />

      {/* Hero */}
      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-[1240px] px-5 pt-8 pb-14">
          <Link
            to="/"
            className="eyebrow inline-flex items-center gap-2 text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All authors
          </Link>
          <div className="mt-8 grid gap-10 lg:grid-cols-[320px_1fr]">
            <AuthorPortrait
              name={author.name}
              rounded="rounded-none"
              className="aspect-[4/5] w-full max-w-[320px] shadow-[16px_18px_44px_-26px_rgba(0,0,0,0.5)]"
            />
            <div className="flex flex-col justify-end">
              <div className="eyebrow text-primary">TSEHAI Author</div>
              <h1 className="mt-3 font-display text-[clamp(2.4rem,6vw,4.4rem)] leading-[0.95] tracking-[-0.02em]">
                {author.name}
              </h1>
              {author.amharicName && (
                <div className="mt-2 font-display text-2xl text-muted-foreground">
                  {author.amharicName}
                </div>
              )}
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                {author.tagline}
              </p>
              <dl className="mt-7 flex flex-wrap gap-x-12 gap-y-4">
                {[
                  ["Lifespan", author.lifespan],
                  ["Origin", author.origin],
                  ["Languages", author.languages.join(" · ")],
                  ["Works", `${author.books.length} catalogued`],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="eyebrow text-muted-foreground">{k}</dt>
                    <dd className="mt-1 text-sm">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8">
                <Button
                  onClick={() => setFollowing((f) => !f)}
                  variant={following ? "outline" : "default"}
                  className="h-11 gap-2 rounded-none px-6 tracking-wide uppercase"
                >
                  <Heart className={cn("h-4 w-4", following && "fill-primary text-primary")} />
                  {following ? "Following" : "Follow Author"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="mx-auto max-w-[1240px] px-5 py-16">
        <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
          <h2 className="eyebrow text-muted-foreground">About the author</h2>
          <div className="max-w-3xl space-y-6 text-[1.05rem] leading-[1.75]">
            {author.bio.map((p, i) => (
              <p key={i} className={i === 0 ? "first-letter:float-left first-letter:mt-1 first-letter:mr-2 first-letter:font-display first-letter:text-[3.4rem] first-letter:leading-[0.8] first-letter:text-primary" : undefined}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Q&A */}
      <section className="border-y border-neutral-200 bg-white">
        <div className="mx-auto max-w-[1240px] px-5 py-16">
          <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
            <h2 className="eyebrow text-muted-foreground">Author Q&amp;A / In conversation</h2>
            <div className="max-w-3xl">
              {author.qa.map((item, i) => (
                <Collapsible key={i} defaultOpen={i === 0} className="border-b border-neutral-200">
                  <CollapsibleTrigger className="group flex w-full items-start justify-between gap-6 py-5 text-left">
                    <span className="font-display text-xl leading-snug transition-colors group-hover:text-primary">
                      {item.q}
                    </span>
                    <ChevronDown className="mt-1.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    <div className="flex gap-4 pt-1 pb-6">
                      <Quote className="h-5 w-5 shrink-0 text-primary/40" />
                      <p className="leading-[1.75] text-muted-foreground">{item.a}</p>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bibliography */}
      <section className="mx-auto max-w-[1240px] px-5 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-neutral-200 pb-4">
          <h2 className="font-display text-3xl">Complete bibliography</h2>
          <div className="flex flex-wrap gap-2">
            {eras.map((e) => (
              <button
                key={e}
                onClick={() => setEra(e)}
                className={cn(
                  "eyebrow rounded-full border px-3 py-1.5 transition-colors",
                  era === e
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-neutral-200 text-muted-foreground hover:border-primary hover:text-primary",
                )}
              >
                {e}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((b) => (
            <Link
              key={b.id}
              to="/books/$bookId"
              params={{ bookId: b.id }}
              className={cn(
                "group block p-4 transition-colors",
                highlight === b.id
                  ? "bg-amber-badge/10 ring-1 ring-amber-badge/40"
                  : "hover:bg-white",
              )}
            >
              {highlight === b.id && (
                <div className="eyebrow mb-3 text-amber-badge">Your search result</div>
              )}
              <BookCover id={b.id} title={b.title} author={author.name} year={b.year} />
              <Badge
                variant="outline"
                className="eyebrow mt-4 rounded-none border-amber-badge/40 bg-amber-badge/10 text-amber-badge"
              >
                {b.badge}
              </Badge>
              <h3 className="mt-3 font-display text-xl leading-snug group-hover:text-primary">
                {b.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {b.year} · {b.genre}
              </p>
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                {b.description}
              </p>
              <span className="eyebrow mt-4 inline-flex items-center gap-2 text-primary">
                <BookOpen className="h-3.5 w-3.5" /> Book details
              </span>
            </Link>
          ))}
        </div>
        {books.length === 0 && (
          <p className="py-16 text-center text-muted-foreground">
            No works in this era for {author.name}.
          </p>
        )}
      </section>

      {/* Related */}
      <section className="border-t border-neutral-200 bg-white">
        <div className="mx-auto max-w-[1240px] px-5 py-16">
          <h2 className="font-display text-2xl">
            If you read {author.name.split(" ")[0]}, you might also like
          </h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            {related.map((a) => (
              <Link
                key={a.id}
                to="/authors/$authorId"
                params={{ authorId: a.id }}
                className="group flex gap-5 border border-neutral-200 p-5 transition-shadow hover:shadow-[0_14px_36px_-24px_rgba(0,0,0,0.4)]"
              >
                <AuthorPortrait name={a.name} className="h-16 w-16 shrink-0" />
                <div className="min-w-0">
                  <h3 className="font-display text-lg leading-tight group-hover:text-primary">
                    {a.name}
                  </h3>
                  <div className="eyebrow mt-1 text-muted-foreground">{a.lifespan}</div>
                  <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{a.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}