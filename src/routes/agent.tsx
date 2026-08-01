import { useCallback, useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Loader2, Mail, Phone } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { allBooks } from "@/data/catalog";
import { statusLabel, statusTone } from "@/lib/status";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

type Collab = {
  id: string;
  book_id: string;
  book_title: string;
  author_name: string | null;
  message: string | null;
  status: string;
  decision_note: string | null;
  contact_email: string | null;
  contact_phone: string | null;
};

export const Route = createFileRoute("/agent")({
  ssr: false,
  validateSearch: (search: Record<string, unknown>) => ({
    tab: search["tab"] === "basket" ? ("basket" as const) : ("details" as const),
  }),
  head: () => ({
    meta: [
      { title: "Agent Console — TSEHAI Portal" },
      { name: "description", content: "Manage your agency details and track requests to work with TSEHAI titles." },
      { property: "og:title", content: "Agent Console — TSEHAI Portal" },
      { property: "og:description", content: "Track your rights requests with TSEHAI Publishers." },
    ],
  }),
  component: AgentPage,
});

function AgentPage() {
  const { profile, loading, user, refresh } = useAuth();
  const navigate = useNavigate();
  const { tab } = Route.useSearch();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Record<string, string>>({});
  const [rows, setRows] = useState<Collab[]>([]);
  const [message, setMessage] = useState<Record<string, string>>({});

  useEffect(() => {
    if (loading) return;
    if (!user) void navigate({ to: "/auth/agent" });
    else if (profile && profile.kind !== "agent") void navigate({ to: "/" });
  }, [loading, user, profile, navigate]);

  useEffect(() => {
    if (!profile) return;
    setForm({
      full_name: profile.full_name ?? "",
      agency_name: profile.agency_name ?? "",
      territory: profile.territory ?? "",
      rights_handled: profile.rights_handled ?? "",
      website: profile.website ?? "",
      phone: profile.phone ?? "",
    });
  }, [profile]);

  const load = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase
      .from("collaboration_requests")
      .select("*")
      .order("created_at", { ascending: false });
    setRows((data as Collab[]) ?? []);
  }, [user]);

  useEffect(() => {
    void load();
  }, [load]);

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from("profiles").update(form as never).eq("id", user.id);
    setSaving(false);
    if (error) toast.error(error.message);
    else {
      toast.success("Agency details updated");
      await refresh();
    }
  }

  async function request(bookId: string, title: string, author: string) {
    if (!user) return;
    const { error } = await supabase.from("collaboration_requests").insert({
      agent_id: user.id,
      book_id: bookId,
      book_title: title,
      author_name: author,
      message: message[bookId] ?? "",
    });
    if (error) toast.error(error.message);
    else {
      toast.success("Request sent to the rights manager");
      await load();
    }
  }

  if (loading || !profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const requested = new Set(rows.map((r) => r.book_id));

  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />
      <main className="mx-auto max-w-[1240px] px-5 py-12">
        <div className="eyebrow text-primary">Publishing agent console</div>
        <h1 className="mt-3 font-display text-5xl font-bold tracking-tight">
          {profile.agency_name || profile.full_name}
        </h1>

        <div className="mt-8 flex gap-6 border-b">
          {[
            ["details", "Agency details"],
            ["basket", `Requested titles (${rows.length})`],
          ].map(([v, label]) => (
            <button
              key={v}
              onClick={() => void navigate({ to: "/agent", search: { tab: v as "details" | "basket" } })}
              className={`eyebrow border-b-2 py-3 ${tab === v ? "border-primary" : "border-transparent text-muted-foreground"}`}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "details" ? (
          <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_1.1fr]">
            <section className="border border-neutral-200 bg-white p-6">
              <h2 className="font-display text-2xl font-bold">Agency details</h2>
              <form className="mt-6 space-y-4" onSubmit={saveProfile}>
                {[
                  ["full_name", "Contact name"],
                  ["agency_name", "Agency or imprint"],
                  ["territory", "Territories"],
                  ["rights_handled", "Rights handled"],
                  ["website", "Website"],
                  ["phone", "Direct line"],
                ].map(([k, label]) => (
                  <div key={k} className="space-y-1.5">
                    <Label className="eyebrow text-muted-foreground">{label}</Label>
                    <Input
                      value={form[k!] ?? ""}
                      onChange={(e) => setForm((f) => ({ ...f, [k!]: e.target.value }))}
                    />
                  </div>
                ))}
                <div className="space-y-1.5">
                  <Label className="eyebrow text-muted-foreground">Email</Label>
                  <Input value={profile.email} disabled />
                </div>
                <Button disabled={saving} type="submit" className="gap-2 rounded-none">
                  {saving && <Loader2 className="h-4 w-4 animate-spin" />} Save changes
                </Button>
              </form>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold">Catalogue — request to work with a title</h2>
              <div className="mt-6 space-y-4">
                {allBooks.map((b) => (
                  <article key={b.id} className="border border-neutral-200 bg-white p-5">
                    <h3 className="font-display text-xl font-bold">{b.title}</h3>
                    <p className="eyebrow mt-1 text-muted-foreground">
                      {b.author.name} · {b.genre} · {b.year}
                    </p>
                    {requested.has(b.id) ? (
                      <p className="mt-4 text-sm text-muted-foreground">Already in your basket.</p>
                    ) : (
                      <div className="mt-4 space-y-3">
                        <Textarea
                          rows={2}
                          placeholder="Note to the rights manager (territories, intended use)…"
                          value={message[b.id] ?? ""}
                          onChange={(e) => setMessage((m) => ({ ...m, [b.id]: e.target.value }))}
                        />
                        <Button
                          size="sm"
                          className="rounded-none"
                          onClick={() => void request(b.id, b.title, b.author.name)}
                        >
                          Request to work with this title
                        </Button>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </section>
          </div>
        ) : (
          <div className="mt-10 space-y-4">
            {rows.map((r) => (
              <article key={r.id} className="border border-neutral-200 bg-white p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-xl font-bold">{r.book_title}</h3>
                    <p className="eyebrow mt-1 text-muted-foreground">{r.author_name}</p>
                  </div>
                  <Badge className={`rounded-none ${statusTone(r.status)}`}>{statusLabel(r.status)}</Badge>
                </div>
                {r.decision_note && (
                  <p className="mt-3 border-l-2 border-primary pl-3 text-sm italic">{r.decision_note}</p>
                )}
                {r.status === "contact_agents" && (
                  <div className="mt-4 border border-primary/40 bg-paper p-4">
                    <div className="eyebrow text-primary">Contact the literary agents</div>
                    <div className="mt-3 space-y-1.5 text-sm">
                      <p className="flex items-center gap-2">
                        <Mail className="h-3.5 w-3.5" /> {r.contact_email ?? "rights@tsehaipublishers.com"}
                      </p>
                      <p className="flex items-center gap-2">
                        <Phone className="h-3.5 w-3.5" /> {r.contact_phone ?? "+1 (323) 431-0090"}
                      </p>
                    </div>
                  </div>
                )}
              </article>
            ))}
            {rows.length === 0 && <p className="text-sm text-muted-foreground">Your basket is empty.</p>}
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
