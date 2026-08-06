import { useState } from "react";
import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, Building2, Globe, Library, ShoppingBag } from "lucide-react";
import { BookCover } from "@/components/book-cover";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Author, Book } from "@/data/catalog";
import { getBook } from "@/data/catalog";
import { cn } from "@/lib/utils";

const RETAILER_ICONS: Record<string, typeof ShoppingBag> = {
  "TSEHAI Store": ShoppingBag,
  "Local Bookstores": Building2,
  "Digital Archival Copy": Globe,
  "University Library Access": Library,
};

export const Route = createFileRoute("/books/$bookId")({
  loader: ({ params }): { book: Book & { author: Author } } => {
    const book = getBook(params.bookId);
    if (!book) throw notFound();
    return { book };
  },
  head: ({ loaderData }) => {
    const b = loaderData?.book;
    const title = b ? `${b.title} — ${b.author.name} | TSEHAI` : "Book — TSEHAI";
    const description = b ? b.description : "Book detail at TSEHAI Publishers.";
    return {
      meta: [
        { title },
        { name: "description", content: description.slice(0, 158) },
        { property: "og:title", content: title },
        { property: "og:description", content: description.slice(0, 158) },
        { property: "og:type", content: "book" },
        { property: "og:url", content: `/books/${b?.id ?? ""}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/books/${b?.id ?? ""}` }],
    };
  },
  component: BookPage,
  errorComponent: () => <Fallback title="This book page didn't load" />,
  notFoundComponent: () => <Fallback title="Book not found" />,
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

const RIGHTS_ROWS = [
  { key: "sold", label: "Language(s) sold", tone: "border-neutral-300 bg-neutral-100 text-foreground" },
  { key: "held", label: "Language(s) held", tone: "border-ink/30 bg-ink/5 text-ink" },
  { key: "negotiating", label: "Language(s) in negotiation", tone: "border-amber-badge/40 bg-amber-badge/10 text-amber-badge" },
  { key: "open", label: "Language(s) open", tone: "border-primary/40 bg-primary/10 text-primary" },
] as const;

function BookPage() {
  const params = Route.useParams();
  const book: Book & { author: Author } = getBook(params.bookId)!;
  const [tab, setTab] = useState<"description" | "additional">("description");

  const specs: [string, string][] = [
    ["Publication date", book.publicationDate],
    ["Page count", `${book.pages} pages`],
    ["Original title", book.originalTitle ?? book.title],
    ["Original language", book.originalLanguage],
    ["Translations", book.translations.length ? book.translations.join(", ") : "None catalogued"],
    ["ISBN / Archive ID", book.archiveId],
    ["Genre classifications", book.classifications.join(", ")],
    ["Availability", book.availability],
  ];

  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />

      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-[1240px] px-5 pt-8 pb-14">
          <Link
            to="/authors/$authorId"
            params={{ authorId: book.author.id }}
            className="eyebrow inline-flex items-center gap-2 text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> {book.author.name}
          </Link>

          {/* Product-style masthead: cover left, record right */}
          <div className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,360px)_1fr]">
            <div className="[perspective:1400px]">
              <BookCover
                id={book.id}
                title={book.title}
                author={book.author.name}
                year={book.year}
                className="max-w-[360px]"
              />
            </div>

            <div>
              <h1 className="font-display text-[clamp(1.9rem,4vw,3rem)] leading-[1.05] tracking-[-0.02em]">
                {book.title}
              </h1>
              {book.originalTitle && (
                <div className="mt-2 font-display text-xl text-muted-foreground">
                  {book.originalTitle}
                </div>
              )}
              <p className="eyebrow mt-4 text-muted-foreground">{book.badge}</p>

              <dl className="mt-6 space-y-1.5 text-sm">
                {[
                  ["ISBN Code", book.archiveId],
                  ["Author", book.author.name],
                  ["Language", book.originalLanguage],
                  ["Pages number", String(book.pages)],
                  ["Format", "Paperback"],
                  ["Publication date", book.publicationDate],
                ].map(([k, v]) => (
                  <div key={k} className="flex flex-wrap gap-x-2">
                    <dt className="font-semibold">{k}:</dt>
                    <dd className="text-muted-foreground">
                      {k === "Author" ? (
                        <Link
                          to="/authors/$authorId"
                          params={{ authorId: book.author.id }}
                          className="text-primary hover:underline"
                        >
                          {v}
                        </Link>
                      ) : (
                        v
                      )}
                    </dd>
                  </div>
                ))}
              </dl>

              {/* Rights availability by language */}
              <div className="mt-7 border border-neutral-200">
                <div className="eyebrow border-b border-neutral-200 bg-paper px-4 py-2.5 text-muted-foreground">
                  Rights availability by language
                </div>
                <div className="divide-y divide-neutral-100">
                  {RIGHTS_ROWS.map((row) => {
                    const list = book.rights[row.key];
                    return (
                      <div
                        key={row.key}
                        className="grid gap-2 px-4 py-3 sm:grid-cols-[220px_1fr] sm:gap-6"
                      >
                        <div className="eyebrow text-muted-foreground">{row.label}</div>
                        <div className="flex flex-wrap gap-1.5">
                          {list.length === 0 ? (
                            <span className="text-sm text-muted-foreground">None</span>
                          ) : (
                            list.map((l) => (
                              <span
                                key={l}
                                className={cn("eyebrow border px-2.5 py-1", row.tone)}
                              >
                                {l}
                              </span>
                            ))
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="h-12 rounded-none px-7 tracking-wide uppercase">
                      Buy / Access now
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-72 rounded-none">
                    {book.retailers.map((r) => {
                      const Icon = RETAILER_ICONS[r.label] ?? ShoppingBag;
                      return (
                        <DropdownMenuItem key={r.label} className="gap-3 rounded-none py-3">
                          <Icon className="h-4 w-4 text-primary" />
                          <span>
                            <span className="block text-sm font-medium">{r.label}</span>
                            <span className="block text-xs text-muted-foreground">{r.note}</span>
                          </span>
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="h-12 gap-2 rounded-none border-ink px-7 tracking-wide uppercase"
                    >
                      <BookOpen className="h-4 w-4" /> Read an excerpt
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-h-[85vh] overflow-y-auto rounded-none border-neutral-200 sm:max-w-2xl">
                    <DialogHeader className="text-left">
                      <div className="eyebrow text-primary">{book.excerptTitle}</div>
                      <DialogTitle className="font-display text-3xl">{book.title}</DialogTitle>
                    </DialogHeader>
                    {book.excerptOriginal && (
                      <p className="border-l-2 border-primary pl-5 font-display text-xl leading-relaxed">
                        {book.excerptOriginal}
                      </p>
                    )}
                    <p className="text-[1.05rem] leading-[1.85] whitespace-pre-line">
                      {book.excerpt}
                    </p>
                    <p className="border-t pt-4 text-xs text-muted-foreground">
                      Excerpt reproduced for editorial preview · {book.archiveId}
                    </p>
                  </DialogContent>
                </Dialog>
              </div>

              <p className="eyebrow mt-6 text-muted-foreground">{book.availability}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Description / additional information tabs */}
      <section className="mx-auto max-w-[1240px] px-5 py-12">
        <div className="flex justify-center gap-8 border-b border-neutral-200">
          {(
            [
              ["description", "Description"],
              ["additional", "Additional information"],
            ] as const
          ).map(([v, label]) => (
            <button
              key={v}
              onClick={() => setTab(v)}
              className={cn(
                "eyebrow -mb-px border-b-2 px-2 py-4 transition-colors",
                tab === v
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-primary",
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "description" ? (
          <div className="mx-auto mt-10 max-w-3xl space-y-6 text-[1.02rem] leading-[1.85] text-muted-foreground">
            <p>{book.description}</p>
            {book.subtitle && <p className="font-display text-xl italic">{book.subtitle}</p>}
            <div className="text-center font-display text-xl text-primary/50">◊ ◊ ◊</div>
            <p>{book.excerpt}</p>
            {book.excerptOriginal && (
              <p className="font-display text-lg text-foreground">{book.excerptOriginal}</p>
            )}
          </div>
        ) : (
          <dl className="mx-auto mt-10 max-w-3xl">
            {specs.map(([k, v]) => (
              <div
                key={k}
                className="grid grid-cols-1 gap-1 border-b border-neutral-100 py-4 sm:grid-cols-[240px_1fr] sm:gap-8"
              >
                <dt className="eyebrow text-muted-foreground">{k}</dt>
                <dd className="text-sm">{v}</dd>
              </div>
            ))}
            {RIGHTS_ROWS.map((row) => (
              <div
                key={row.key}
                className="grid grid-cols-1 gap-1 border-b border-neutral-100 py-4 sm:grid-cols-[240px_1fr] sm:gap-8"
              >
                <dt className="eyebrow text-muted-foreground">{row.label}</dt>
                <dd className="text-sm">
                  {book.rights[row.key].length ? book.rights[row.key].join(", ") : "None"}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </section>

      {/* Praise */}
      <section className="border-t border-neutral-200 bg-white">
        <div className="mx-auto max-w-[1240px] px-5 py-16">
          <h2 className="border-b border-neutral-200 pb-4 font-display text-2xl">
            Praise &amp; press reviews
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {book.praise.map((p) => (
              <blockquote
                key={p.source}
                className="border border-neutral-200 bg-paper p-7 shadow-[0_10px_30px_-26px_rgba(0,0,0,0.5)]"
              >
                <div className="font-display text-5xl leading-none text-primary/25">“</div>
                <p className="mt-2 font-display text-lg leading-relaxed">{p.quote}</p>
                <footer className="eyebrow mt-5 text-muted-foreground">— {p.source}</footer>
              </blockquote>
            ))}
          </div>
          <div className="mt-10">
            <Badge
              variant="outline"
              className="eyebrow rounded-none border-amber-badge/40 bg-amber-badge/10 text-amber-badge"
            >
              {book.genre}
            </Badge>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
