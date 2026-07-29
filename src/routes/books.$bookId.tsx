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

function BookPage() {
  const params = Route.useParams();
  const book: Book & { author: Author } = getBook(params.bookId)!;

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
        <div className="mx-auto max-w-[1240px] px-5 pt-8 pb-16">
          <Link
            to="/authors/$authorId"
            params={{ authorId: book.author.id }}
            className="eyebrow inline-flex items-center gap-2 text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> {book.author.name}
          </Link>

          <div className="mt-10 grid gap-14 lg:grid-cols-[minmax(0,340px)_1fr]">
            <div className="[perspective:1400px]">
              <BookCover
                id={book.id}
                title={book.title}
                author={book.author.name}
                year={book.year}
                className="max-w-[340px]"
              />
            </div>

            <div>
              <Badge
                variant="outline"
                className="eyebrow rounded-none border-amber-badge/40 bg-amber-badge/10 text-amber-badge"
              >
                {book.badge}
              </Badge>
              <h1 className="mt-4 font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-[1] tracking-[-0.02em]">
                {book.title}
              </h1>
              {book.originalTitle && (
                <div className="mt-2 font-display text-2xl text-muted-foreground">
                  {book.originalTitle}
                </div>
              )}
              {book.subtitle && (
                <p className="mt-4 max-w-2xl font-display text-xl text-muted-foreground italic">
                  {book.subtitle}
                </p>
              )}
              <p className="mt-5 text-sm">
                By{" "}
                <Link
                  to="/authors/$authorId"
                  params={{ authorId: book.author.id }}
                  className="font-medium text-primary hover:underline"
                >
                  {book.author.name}
                </Link>{" "}
                · {book.year}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-2">
                <span className="eyebrow rounded-full border border-neutral-200 px-3 py-1.5">
                  {book.genre}
                </span>
                <span className="eyebrow rounded-full border border-neutral-200 px-3 py-1.5 text-muted-foreground">
                  Original: {book.originalLanguage}
                </span>
                {book.translations.map((t) => (
                  <span
                    key={t}
                    className="eyebrow rounded-full bg-secondary px-3 py-1.5 text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <p className="mt-7 max-w-2xl text-[1.05rem] leading-[1.75] text-muted-foreground">
                {book.description}
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
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

      {/* Praise */}
      <section className="mx-auto max-w-[1240px] px-5 py-16">
        <h2 className="border-b border-neutral-200 pb-4 font-display text-2xl">
          Praise &amp; press reviews
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {book.praise.map((p) => (
            <blockquote
              key={p.source}
              className="border border-neutral-200 bg-white p-7 shadow-[0_10px_30px_-26px_rgba(0,0,0,0.5)]"
            >
              <div className="font-display text-5xl leading-none text-primary/25">“</div>
              <p className="mt-2 font-display text-lg leading-relaxed">{p.quote}</p>
              <footer className="eyebrow mt-5 text-muted-foreground">— {p.source}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* Specs */}
      <section className="border-t border-neutral-200 bg-white">
        <div className="mx-auto max-w-[1240px] px-5 py-16">
          <h2 className="border-b border-neutral-200 pb-4 font-display text-2xl">
            Book details &amp; specs
          </h2>
          <dl className="mt-6 max-w-3xl">
            {specs.map(([k, v]) => (
              <div
                key={k}
                className="grid grid-cols-1 gap-1 border-b border-neutral-100 py-4 sm:grid-cols-[240px_1fr] sm:gap-8"
              >
                <dt className="eyebrow text-muted-foreground">{k}</dt>
                <dd className="text-sm">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}