import { useMemo, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { LayoutGrid, Rows3, Search, ArrowUpRight } from "lucide-react";
import { AuthorPortrait } from "@/components/author-portrait";
import { BookCover } from "@/components/book-cover";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { authors, allBooks, genreMatches, genres } from "@/data/catalog";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "TSEHAI Master Bibliographic & Author Portal" },
      {
        name: "description",
        content:
          "The complete catalogue of Ethiopian letters — editorial author biographies, full bibliographies and archival access, one author page at a time.",
      },
      { property: "og:title", content: "TSEHAI Master Bibliographic & Author Portal" },
      {
        property: "og:description",
        content:
          "Editorial author pages, complete bibliographies and archival access to Ethiopian and Horn of Africa literature.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Index() {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("All");
  const [view, setView] = useState<"grid" | "table">("grid");

  const q = query.trim().toLowerCase();

  const results = useMemo(() => {
    return authors
      .map((a) => {
        const matchedBooks = a.books.filter(
          (b) =>
            genreMatches(genre, b.genre) &&
            (!q ||
              b.title.toLowerCase().includes(q) ||
              (b.originalTitle ?? "").toLowerCase().includes(q) ||
              b.genre.toLowerCase().includes(q)),
        );
        const authorHit =
          !q ||
          a.name.toLowerCase().includes(q) ||
          (a.amharicName ?? "").includes(query.trim()) ||
          a.languages.join(" ").toLowerCase().includes(q);
        const genreOk = a.books.some((b) => genreMatches(genre, b.genre));
        const titleHit = matchedBooks.length > 0;
        return { author: a, matchedBooks, visible: genreOk && (authorHit || titleHit), titleHit };
      })
      .filter((r) => r.visible);
  }, [q, query, genre]);

  const stats = [
    ["Authors", authors.length],
    ["Works catalogued", allBooks.length],
    ["Languages", 6],
    ["Centuries covered", 5],
  ] as const;

  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />

      {/* Masthead */}
      <section className="border-b border-neutral-200">
        <div className="mx-auto grid max-w-[1240px] gap-12 px-5 py-16 lg:grid-cols-[1.55fr_1fr] lg:py-24">
          <div>
            <div className="eyebrow text-primary">
              Established 2007 · Los Angeles / Addis Ababa
            </div>
            <h1 className="mt-6 font-display text-[clamp(2.5rem,6vw,4.6rem)] leading-[0.98] font-normal tracking-[-0.02em]">
              The complete catalog of{" "}
              <em className="font-normal text-primary">Ethiopian</em> letters, one author page at a
              time.
            </h1>
            <p className="mt-7 max-w-2xl text-[1.05rem] leading-relaxed text-muted-foreground">
              TSEHAI's master bibliographic portal collects the writers who shaped modern Amharic
              prose and the diaspora voices carrying the tradition forward — with editorial
              biographies, complete bibliographies, and direct access to the works.
            </p>
          </div>
          <div className="lg:border-l lg:border-neutral-200 lg:pl-10">
            <div className="eyebrow text-muted-foreground">In this portal</div>
            <dl className="mt-5">
              {stats.map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-baseline justify-between border-b border-neutral-200 py-3.5"
                >
                  <dt className="text-sm">{label}</dt>
                  <dd className="font-display text-2xl">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Search + filters */}
      <section id="catalogue" className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-[1240px] px-5 py-8">
          <div className="relative">
            <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by author, book title, or genre — searching a title takes you to its author"
              className="h-14 rounded-none border-neutral-200 pl-11 text-base shadow-none focus-visible:ring-1"
            />
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            {genres.map((g) => (
              <button
                key={g}
                onClick={() => setGenre(g)}
                className={cn(
                  "eyebrow rounded-full border px-3.5 py-1.5 transition-colors",
                  genre === g
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-neutral-200 text-muted-foreground hover:border-primary hover:text-primary",
                )}
              >
                {g}
              </button>
            ))}
            <div className="ml-auto flex items-center border border-neutral-200">
              {([
                ["grid", LayoutGrid, "Editorial grid"],
                ["table", Rows3, "Data table"],
              ] as const).map(([v, Icon, label]) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  title={label}
                  aria-label={label}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 transition-colors",
                    view === v ? "bg-ink text-white" : "text-muted-foreground hover:text-primary",
                  )}
                >
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section id="authors" className="mx-auto max-w-[1240px] px-5 py-14">
        <div className="mb-8 flex items-baseline justify-between border-b border-neutral-200 pb-4">
          <h2 className="font-display text-2xl">
            {q ? "Search results" : "Authors A–Z"}
          </h2>
          <span className="eyebrow text-muted-foreground">
            {results.length} author{results.length === 1 ? "" : "s"}
          </span>
        </div>

        {results.length === 0 && (
          <p className="py-16 text-center text-muted-foreground">
            No authors match that search. Try a title, a genre, or a language.
          </p>
        )}

        {view === "grid" ? (
          <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {results.map(({ author, matchedBooks, titleHit }) => (
              <Link
                key={author.id}
                to="/authors/$authorId"
                params={{ authorId: author.id }}
                search={titleHit && q ? { highlight: matchedBooks[0]?.id } : undefined}
                className="group block"
              >
                <div className="flex items-start gap-5">
                  <AuthorPortrait name={author.name} className="h-20 w-20 shrink-0" />
                  <div className="min-w-0">
                    <h3 className="font-display text-xl leading-tight transition-colors group-hover:text-primary">
                      {author.name}
                    </h3>
                    <div className="eyebrow mt-1 text-muted-foreground">{author.lifespan}</div>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                      {author.tagline}
                    </p>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-4">
                  {author.books.slice(0, 3).map((b) => (
                    <div key={b.id}>
                      <BookCover id={b.id} title={b.title} author={author.name} year={b.year} />
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-1.5 border-t border-neutral-200 pt-3">
                  <span className="eyebrow text-primary">View author page</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto border border-neutral-200 bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-200 text-left">
                  {["Author", "Title", "Year", "Genre", "Language", "Availability"].map((h) => (
                    <th key={h} className="eyebrow px-4 py-3 text-muted-foreground">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {results.flatMap(({ author, matchedBooks }) =>
                  (matchedBooks.length ? matchedBooks : author.books).map((b) => (
                    <tr key={b.id} className="border-b border-neutral-100 last:border-0 hover:bg-secondary/60">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <Link
                          to="/authors/$authorId"
                          params={{ authorId: author.id }}
                          className="font-medium hover:text-primary"
                        >
                          {author.name}
                        </Link>
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          to="/books/$bookId"
                          params={{ bookId: b.id }}
                          className="font-display hover:text-primary"
                        >
                          {b.title}
                        </Link>
                      </td>
                      <td className="px-4 py-3 tabular-nums">{b.year}</td>
                      <td className="px-4 py-3 text-muted-foreground">{b.genre}</td>
                      <td className="px-4 py-3 text-muted-foreground">{b.originalLanguage}</td>
                      <td className="px-4 py-3 text-muted-foreground">{b.availability}</td>
                    </tr>
                  )),
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Archive strip */}
      <section id="archive" className="border-y border-neutral-200 bg-white">
        <div className="mx-auto max-w-[1240px] px-5 py-14">
          <div className="flex items-baseline justify-between border-b border-neutral-200 pb-4">
            <h2 className="font-display text-2xl">Recently catalogued</h2>
            <span className="eyebrow text-muted-foreground">TSEHAI Archives</span>
          </div>
          <div className="mt-8 grid gap-8 sm:grid-cols-3 lg:grid-cols-6">
            {allBooks.map((b) => (
              <Link key={b.id} to="/books/$bookId" params={{ bookId: b.id }} className="group">
                <BookCover id={b.id} title={b.title} author={b.author.name} year={b.year} />
                <Badge
                  variant="outline"
                  className="eyebrow mt-3 rounded-none border-amber-badge/40 bg-amber-badge/10 text-amber-badge"
                >
                  {b.badge}
                </Badge>
                <div className="mt-2 font-display text-sm leading-snug group-hover:text-primary">
                  {b.title}
                </div>
                <div className="text-xs text-muted-foreground">{b.author.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
