import { useCallback, useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Loader2, Plus, X } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { statusLabel, statusTone } from "@/lib/status";

type BookRequest = {
  id: string;
  title: string;
  year: string | null;
  genre: string | null;
  language: string | null;
  synopsis: string | null;
  rights_notes: string | null;
  status: string;
  decision_note: string | null;
  created_at: string;
};

export const Route = createFileRoute("/account")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "My Author Account — TSEHAI Portal" },
      { name: "description", content: "Manage your author details and submit new titles to the TSEHAI catalogue." },
      { property: "og:title", content: "My Author Account — TSEHAI Portal" },
      { property: "og:description", content: "Manage your author details and submit new titles." },
    ],
  }),
  component: AccountPage,
});

const EMPTY = { title: "", year: "", genre: "", language: "", synopsis: "", rights_notes: "" };

function AccountPage() {
  const { profile, loading, user, refresh } = useAuth();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Record<string, string>>({});
  const [requests, setRequests] = useState<BookRequest[]>([]);
  const [composer, setComposer] = useState(false);
  const [draft, setDraft] = useState({ ...EMPTY });

  useEffect(() => {
    if (loading) return;
    if (!user) void navigate({ to: "/auth/author" });
    else if (profile && profile.kind !== "author") void navigate({ to: "/" });
  }, [loading, user, profile, navigate]);

  useEffect(() => {
    if (!profile) return;
    setForm({
      full_name: profile.full_name ?? "",
      pen_name: profile.pen_name ?? "",
      languages: profile.languages ?? "",
      genres: profile.genres ?? "",
      biography: profile.biography ?? "",
      phone: profile.phone ?? "",
    });
  }, [profile]);

  const loadRequests = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase
      .from("book_requests")
      .select("*")
      .order("created_at", { ascending: false });
    setRequests((data as BookRequest[]) ?? []);
  }, [user]);

  useEffect(() => {
    void loadRequests();
  }, [loadRequests]);

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from("profiles").update(form as never).eq("id", user.id);
    setSaving(false);
    if (error) toast.error(error.message);
    else {
      toast.success("Details updated");
      await refresh();
    }
  }

  async function submitBook(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from("book_requests").insert({ ...draft, author_id: user.id });
    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Title submitted for editorial review");
    setDraft({ ...EMPTY });
    setComposer(false);
    await loadRequests();
  }

  async function withdraw(id: string) {
    const { error } = await supabase.from("book_requests").delete().eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success("Request withdrawn");
      await loadRequests();
    }
  }

  if (loading || !profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />
      <main className="mx-auto max-w-[1240px] px-5 py-12">
        <div className="eyebrow text-primary">Author account</div>
        <h1 className="mt-3 font-display text-5xl font-bold tracking-tight">
          {profile.full_name || "Your author page"}
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
          What you enter here is the source of your public author page. Titles you submit go to the
          TSEHAI rights manager for editorial review.
        </p>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <section className="border border-neutral-200 bg-white p-6">
            <h2 className="font-display text-2xl font-bold">Personal details</h2>
            <form className="mt-6 space-y-4" onSubmit={saveProfile}>
              {[
                ["full_name", "Full name"],
                ["pen_name", "Pen name"],
                ["languages", "Languages"],
                ["genres", "Principal genres"],
                ["phone", "Contact number"],
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
                <Label className="eyebrow text-muted-foreground">Editorial biography</Label>
                <Textarea
                  rows={7}
                  value={form["biography"] ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, biography: e.target.value }))}
                />
              </div>
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
            <div className="flex items-baseline justify-between">
              <h2 className="font-display text-2xl font-bold">Title submissions</h2>
              <span className="eyebrow text-muted-foreground">{requests.length} on file</span>
            </div>

            {!composer ? (
              <button
                onClick={() => setComposer(true)}
                className="mt-6 flex w-full items-center justify-center gap-3 border-2 border-dashed border-neutral-300 bg-white/60 py-12 transition-colors hover:border-primary hover:bg-white"
              >
                <Plus className="h-5 w-5 text-primary" />
                <span className="eyebrow">Request to push a new book</span>
              </button>
            ) : (
              <form onSubmit={submitBook} className="mt-6 border border-neutral-200 bg-white p-6">
                <div className="flex items-start justify-between">
                  <h3 className="font-display text-xl font-bold">New title request</h3>
                  <button type="button" onClick={() => setComposer(false)} aria-label="Close">
                    <X className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
                <div className="mt-5 space-y-4">
                  <div className="space-y-1.5">
                    <Label className="eyebrow text-muted-foreground">Title</Label>
                    <Input
                      required
                      value={draft.title}
                      onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {[
                      ["year", "Year"],
                      ["genre", "Genre"],
                      ["language", "Original language"],
                    ].map(([k, label]) => (
                      <div key={k} className="space-y-1.5">
                        <Label className="eyebrow text-muted-foreground">{label}</Label>
                        <Input
                          value={draft[k as keyof typeof draft]}
                          onChange={(e) => setDraft({ ...draft, [k as string]: e.target.value })}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="space-y-1.5">
                    <Label className="eyebrow text-muted-foreground">Synopsis</Label>
                    <Textarea
                      rows={5}
                      required
                      value={draft.synopsis}
                      onChange={(e) => setDraft({ ...draft, synopsis: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="eyebrow text-muted-foreground">Rights & editions note</Label>
                    <Textarea
                      rows={3}
                      value={draft.rights_notes}
                      onChange={(e) => setDraft({ ...draft, rights_notes: e.target.value })}
                    />
                  </div>
                  <Button disabled={saving} type="submit" className="gap-2 rounded-none">
                    {saving && <Loader2 className="h-4 w-4 animate-spin" />} Submit for review
                  </Button>
                </div>
              </form>
            )}

            <div className="mt-8 space-y-4">
              {requests.map((r) => (
                <article key={r.id} className="border border-neutral-200 bg-white p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-xl font-bold">{r.title}</h3>
                      <p className="eyebrow mt-1 text-muted-foreground">
                        {[r.genre, r.language, r.year].filter(Boolean).join(" · ") || "No metadata"}
                      </p>
                    </div>
                    <Badge className={`rounded-none ${statusTone(r.status)}`}>{statusLabel(r.status)}</Badge>
                  </div>
                  {r.synopsis && (
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{r.synopsis}</p>
                  )}
                  {r.decision_note && (
                    <p className="mt-3 border-l-2 border-primary pl-3 text-sm italic">{r.decision_note}</p>
                  )}
                  {r.status === "pending" && (
                    <button
                      onClick={() => void withdraw(r.id)}
                      className="eyebrow mt-4 text-muted-foreground underline underline-offset-4 hover:text-primary"
                    >
                      Withdraw request
                    </button>
                  )}
                </article>
              ))}
              {requests.length === 0 && !composer && (
                <p className="text-sm text-muted-foreground">No titles submitted yet.</p>
              )}
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
