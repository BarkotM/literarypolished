import { Link } from "@tanstack/react-router";
import { WriterPortal } from "@/components/writer-portal";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-6 px-5">
        <Link to="/" className="group flex items-baseline gap-2.5">
          <span className="font-display text-xl font-bold tracking-tight">TSEHAI</span>
          <span className="eyebrow hidden text-muted-foreground sm:block">
            Bibliographic Portal
          </span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {[
            ["Authors A–Z", "/#authors"],
            ["Catalogue", "/#catalogue"],
            ["Archive", "/#archive"],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="eyebrow text-muted-foreground transition-colors hover:text-primary"
            >
              {label}
            </a>
          ))}
        </nav>
        <WriterPortal />
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-[1240px] px-5 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="font-display text-lg font-bold">TSEHAI Publishers</div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Established 2007. Los Angeles / Addis Ababa. Preserving and publishing Ethiopian and
              Horn of Africa letters.
            </p>
          </div>
          {[
            ["The Portal", ["Authors A–Z", "Complete catalogue", "Archival collections", "Languages"]],
            ["For Writers", ["Writer Portal", "Submission guidelines", "Estate representation", "Rights & permissions"]],
            ["Institutions", ["Library access", "Course adoption", "Digital archive", "Contact"]],
          ].map(([title, items]) => (
            <div key={title as string}>
              <div className="eyebrow text-muted-foreground">{title as string}</div>
              <ul className="mt-4 space-y-2.5 text-sm">
                {(items as string[]).map((i) => (
                  <li key={i}>
                    <span className="cursor-default transition-colors hover:text-primary">{i}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} TSEHAI Publishers. All rights reserved.</span>
          <span className="eyebrow">Master Bibliographic &amp; Author Portal</span>
        </div>
      </div>
    </footer>
  );
}