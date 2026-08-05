import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ChevronDown, LogOut, Search, ShoppingCart, UserRound } from "lucide-react";
import { GetStarted } from "@/components/get-started";
import { useAuth, signOut } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authors } from "@/data/catalog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function AccountArea() {
  const { profile, loading } = useAuth();
  const navigate = useNavigate();
  const [cart, setCart] = useState(0);

  useEffect(() => {
    if (profile?.kind !== "agent") return;
    void supabase
      .from("collaboration_requests")
      .select("id", { count: "exact", head: true })
      .eq("agent_id", profile.id)
      .then(({ count }) => setCart(count ?? 0));
  }, [profile]);

  if (loading) return <div className="h-8 w-28" />;
  if (!profile) return <GetStarted />;

  const home =
    profile.kind === "agent" ? "/agent" : profile.kind === "rights_manager" ? "/rights" : "/account";

  return (
    <div className="flex items-center gap-2">
      {profile.kind === "agent" && (
        <Link
          to="/agent"
          search={{ tab: "basket" }}
          className="relative inline-flex h-9 w-9 items-center justify-center border border-neutral-200 transition-colors hover:bg-paper"
          aria-label="Requested titles"
        >
          <ShoppingCart className="h-4 w-4" />
          {cart > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-4 items-center justify-center bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
              {cart}
            </span>
          )}
        </Link>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2 rounded-none">
            <UserRound className="h-3.5 w-3.5" />
            <span className="max-w-[9rem] truncate">{profile.full_name || profile.email}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 rounded-none">
          <DropdownMenuLabel className="eyebrow text-muted-foreground">
            {profile.kind === "agent"
              ? "Publishing agent"
              : profile.kind === "rights_manager"
                ? "Rights manager"
                : "Author account"}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => void navigate({ to: home })}>My account</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={async () => {
              await signOut();
              void navigate({ to: "/" });
            }}
          >
            <LogOut className="mr-2 h-3.5 w-3.5" /> Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-6 px-5">
        <Link to="/" className="group flex items-baseline gap-2.5">
          <span className="font-display text-xl font-bold tracking-tight">TSEHAI</span>
          <span className="eyebrow hidden text-muted-foreground sm:block">Bibliographic Portal</span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          <a
            href="/#authors"
            className="eyebrow text-muted-foreground transition-colors hover:text-primary"
          >
            Authors A–Z
          </a>
          <CatalogueMenu />
          <Link
            to="/team"
            className="eyebrow text-muted-foreground transition-colors hover:text-primary"
          >
            Meet the Team
          </Link>
        </nav>
        <AccountArea />
      </div>
    </header>
  );
}

function CatalogueMenu() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    if (timer.current) clearTimeout(timer.current);
    setOpen(true);
  };
  const hide = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(false), 220);
  };

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return [];
    const out: { id: string; title: string; author: string }[] = [];
    for (const a of authors) {
      for (const b of a.books) {
        if (b.title.toLowerCase().includes(s) || a.name.toLowerCase().includes(s))
          out.push({ id: b.id, title: b.title, author: a.name });
      }
    }
    return out.slice(0, 6);
  }, [q]);

  return (
    <div className="relative" onMouseEnter={show} onMouseLeave={hide}>
      <Link
        to="/catalogue"
        className="eyebrow flex items-center gap-1 text-muted-foreground transition-colors hover:text-primary"
      >
        Catalogue <ChevronDown className="h-3 w-3" />
      </Link>
      {open && (
        <div className="absolute top-full left-1/2 z-50 w-[26rem] -translate-x-1/2 pt-4">
          <div className="border border-neutral-200 bg-white p-4 shadow-xl">
            <div className="relative">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search titles and authors"
                className="h-11 rounded-none pl-9"
              />
            </div>
            <div className="mt-3 max-h-72 overflow-y-auto">
              {q && results.length === 0 && (
                <p className="px-1 py-3 text-sm text-muted-foreground">No matches.</p>
              )}
              {results.map((r) => (
                <Link
                  key={r.id}
                  to="/books/$bookId"
                  params={{ bookId: r.id }}
                  onClick={() => setOpen(false)}
                  className="block border-b border-neutral-100 py-2 last:border-0 hover:text-primary"
                >
                  <div className="font-display text-sm">{r.title}</div>
                  <div className="text-xs text-muted-foreground">{r.author}</div>
                </Link>
              ))}
              {!q && (
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link to="/catalogue" onClick={() => setOpen(false)} className="hover:text-primary">
                      Browse the full catalogue
                    </Link>
                  </li>
                  <li>
                    <a href="/#authors" className="hover:text-primary">
                      Authors A–Z
                    </a>
                  </li>
                  <li>
                    <a href="/#guidelines" className="hover:text-primary">
                      Submission guidelines
                    </a>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
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
            ["For Writers", ["Author entrance", "Submission guidelines", "Estate representation", "Rights & permissions"]],
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
