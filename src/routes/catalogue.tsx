import { useMemo, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { BookCover } from "@/components/book-cover";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { allBooks, genreMatches, genres } from "@/data/catalog";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/catalogue")({
  component: Catalogue,
  head: () => ({
    meta: [
      { title: "Complete Catalogue — TSEHAI Bibliographic Portal" },
      {
        name: "description",
        content:
          "Browse every title in the TSEHAI catalogue — Ethiopian and Horn of Africa history, art history, translation and reference works.",
      },
      { property: "og:title", content: "Complete Catalogue — TSEHAI" },
      {
        property: "og:description",
        content: "Every title in the TSEHAI catalogue of Ethiopian and Horn of Africa letters.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Catalogue() {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("All");
  const q = query.trim().toLowerCase();

  const books = useMemo(
    () =>
      allBooks.filter(
        (b) =>
          genreMatches(genre, b.genre) &&
          (!q ||
            b.title.toLowerCase().includes(q) ||
            (b.originalTitle ?? "").toLowerCase().includes(q) ||
            b.genre.toLowerCase().includes(q) ||
            b.author.name.toLowerCase().includes(q)),
      ),
    [q, genre],
  );

  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />

      <section className="border-b border-neutral-200">
        <div className="mx-auto max-w-[1240px] px-5 py-14">
          <div className="eyebrow text-primary">TSEHAI Publishers</div>
          <h1 className="mt-5 font-display text-[clamp(2rem,5vw,3.6rem)] leading-tight">
            The complete catalogue
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Every title held in the portal, with full bibliographic records, excerpts and archival
            access.
          </p>
        </div>
      </section>

      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-[1240px] px-5 py-8">
          <div className="relative">
            <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the catalogue by title, genre or author"
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
            <span className="eyebrow ml-auto text-muted-foreground">
              {books.length} title{books.length === 1 ? "" : "s"}
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 py-14">
        {books.length === 0 ? (
          <p className="py-16 text-center text-muted-foreground">
            No titles match that search. Try another title, genre or author.
          </p>
        ) : (
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
            {books.map((b) => (
              <Link key={b.id} to="/books/$bookId" params={{ bookId: b.id }} className="group">
                <BookCover id={b.id} title={b.title} author={b.author.name} year={b.year} />
                <Badge
                  variant="outline"
                  className="eyebrow mt-3 rounded-none border-amber-badge/40 bg-amber-badge/10 text-amber-badge"
                >
                  {b.badge}
                </Badge>
                <h2 className="mt-2 font-display text-base leading-snug group-hover:text-primary">
                  {b.title}
                </h2>
                <div className="text-xs text-muted-foreground">{b.author.name}</div>
                <div className="eyebrow mt-1 text-muted-foreground">
                  {b.genre} · {b.year}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <SiteFooter />
    </div>
  );
}