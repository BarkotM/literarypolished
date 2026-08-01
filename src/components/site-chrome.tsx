import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { LogOut, ShoppingCart, UserRound } from "lucide-react";
import { GetStarted } from "@/components/get-started";
import { useAuth, signOut } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
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
          {[
            ["Authors A–Z", "/#authors"],
            ["Catalogue", "/#catalogue"],
            ["Guidelines", "/#guidelines"],
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
        <AccountArea />
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
