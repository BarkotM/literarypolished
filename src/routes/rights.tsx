import { useCallback, useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Loader2, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth, signOut } from "@/lib/auth";
import { verifyRightsManager } from "@/lib/rights.functions";
import { statusLabel, statusTone } from "@/lib/status";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/rights")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Rights Manager Console — TSEHAI" },
      { name: "description", content: "Staff console for reviewing author and literary agent requests." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Rights Manager Console — TSEHAI" },
      { property: "og:description", content: "Staff console for TSEHAI Publishers." },
    ],
  }),
  component: RightsPage,
});

type Row = Record<string, unknown> & { id: string; status?: string };

function RightsPage() {
  const { profile, loading } = useAuth();
  const verify = useServerFn(verifyRightsManager);
  const [busy, setBusy] = useState(false);
  const [f, setF] = useState({ email: "", password1: "", password2: "", orgCode: "" });
  const [profiles, setProfiles] = useState<Row[]>([]);
  const [books, setBooks] = useState<Row[]>([]);
  const [collabs, setCollabs] = useState<Row[]>([]);

  const isStaff = profile?.kind === "rights_manager";

  const load = useCallback(async () => {
    if (!isStaff) return;
    const [p, b, c] = await Promise.all([
      supabase.from("profiles").select("*").order("created_at", { ascending: false }),
      supabase.from("book_requests").select("*").order("created_at", { ascending: false }),
      supabase.from("collaboration_requests").select("*").order("created_at", { ascending: false }),
    ]);
    setProfiles((p.data as unknown as Row[]) ?? []);
    setBooks((b.data as unknown as Row[]) ?? []);
    setCollabs((c.data as unknown as Row[]) ?? []);
  }, [isStaff]);

  useEffect(() => {
    void load();
  }, [load]);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const res = await verify({ data: f });
    if (!res.ok) {
      setBusy(false);
      toast.error("Those credentials were not accepted.");
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({
      email: res.email,
      password: f.password1,
    });
    setBusy(false);
    if (error) toast.error(error.message);
    else toast.success("Signed in as rights manager");
  }

  async function setStatus(table: "book_requests" | "collaboration_requests", id: string, status: string) {
    const patch: Record<string, unknown> = { status };
    if (table === "collaboration_requests" && status === "contact_agents") {
      patch["contact_email"] = "rights@tsehaipublishers.com";
      patch["contact_phone"] = "+1 (323) 431-0090";
    }
    const { error } = await supabase.from(table).update(patch as never).eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success("Status updated");
      await load();
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-950">
        <Loader2 className="h-5 w-5 animate-spin text-neutral-400" />
      </div>
    );
  }

  if (!isStaff) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-neutral-950 px-5 py-16">
        <form onSubmit={login} className="w-full max-w-md border border-neutral-800 bg-neutral-900 p-8">
          <ShieldCheck className="h-6 w-6 text-neutral-400" />
          <h1 className="mt-5 font-display text-3xl font-bold text-white">Rights Manager Console</h1>
          <p className="mt-2 text-sm text-neutral-400">
            Four credentials are required. This console is not part of the public portal.
          </p>
          <div className="mt-7 space-y-4">
            {[
              ["email", "Email", "email"],
              ["password1", "Password one", "password"],
              ["password2", "Password two", "password"],
              ["orgCode", "Organisational code", "text"],
            ].map(([k, label, type]) => (
              <div key={k} className="space-y-1.5">
                <Label className="eyebrow text-neutral-400">{label}</Label>
                <Input
                  required
                  type={type}
                  className="rounded-none border-neutral-700 bg-neutral-950 text-white"
                  value={f[k as keyof typeof f]}
                  onChange={(e) => setF({ ...f, [k as string]: e.target.value })}
                />
              </div>
            ))}
            <Button disabled={busy} type="submit" className="w-full gap-2 rounded-none">
              {busy && <Loader2 className="h-4 w-4 animate-spin" />} Enter console
            </Button>
          </div>
        </form>
      </main>
    );
  }

  const section = (title: string, count: number) => (
    <div className="flex items-baseline justify-between border-b border-neutral-800 pb-3">
      <h2 className="font-display text-2xl font-bold text-white">{title}</h2>
      <span className="eyebrow text-neutral-500">{count}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200">
      <header className="border-b border-neutral-800">
        <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-5">
          <span className="font-display text-lg font-bold text-white">TSEHAI · Rights Console</span>
          <Button
            variant="outline"
            size="sm"
            className="rounded-none border-neutral-700 bg-transparent text-neutral-200 hover:bg-neutral-800"
            onClick={() => void signOut()}
          >
            Sign out
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-[1240px] space-y-14 px-5 py-12">
        <section>
          {section("Accounts", profiles.length)}
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {profiles.map((p) => (
              <div key={p.id} className="border border-neutral-800 bg-neutral-900 p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-display text-lg text-white">{String(p["full_name"] || p["email"])}</span>
                  <Badge className="rounded-none bg-neutral-800 text-neutral-200 hover:bg-neutral-800">
                    {String(p["kind"])}
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-neutral-400">{String(p["email"])}</p>
                <p className="mt-2 text-sm text-neutral-500">
                  {String(p["agency_name"] ?? p["languages"] ?? "")}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          {section("Author book requests", books.length)}
          <div className="mt-5 space-y-3">
            {books.map((b) => (
              <div key={b.id} className="border border-neutral-800 bg-neutral-900 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="font-display text-lg text-white">{String(b["title"])}</div>
                    <p className="eyebrow mt-1 text-neutral-500">
                      {[b["genre"], b["language"], b["year"]].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                  <Badge className={`rounded-none ${statusTone(b.status ?? "")}`}>{statusLabel(b.status ?? "")}</Badge>
                </div>
                <p className="mt-2 text-sm">
                  <span className="eyebrow text-neutral-500">Solicitation: </span>
                  <span
                    className={
                      String(b["solicitation"] ?? "unsolicited") === "unsolicited"
                        ? "text-neutral-400"
                        : "text-emerald-400"
                    }
                  >
                    {String(b["solicitation"] ?? "unsolicited")}
                    {b["referral_name"] ? ` — ${String(b["referral_name"])}` : ""}
                    {b["referral_reference"] ? ` (${String(b["referral_reference"])})` : ""}
                  </span>
                </p>
                {b["synopsis"] ? <p className="mt-3 text-sm text-neutral-400">{String(b["synopsis"])}</p> : null}
                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    ["approved", "Approve"],
                    ["rejected", "Reject"],
                    ["pending", "Reset to pending"],
                  ].map(([s, label]) => (
                    <Button
                      key={s}
                      size="sm"
                      variant="outline"
                      className="rounded-none border-neutral-700 bg-transparent text-neutral-200 hover:bg-neutral-800"
                      onClick={() => void setStatus("book_requests", b.id, s!)}
                    >
                      {label}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          {section("Agent collaboration requests", collabs.length)}
          <div className="mt-5 space-y-3">
            {collabs.map((c) => (
              <div key={c.id} className="border border-neutral-800 bg-neutral-900 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="font-display text-lg text-white">{String(c["book_title"])}</div>
                    <p className="eyebrow mt-1 text-neutral-500">{String(c["author_name"] ?? "")}</p>
                  </div>
                  <Badge className={`rounded-none ${statusTone(c.status ?? "")}`}>{statusLabel(c.status ?? "")}</Badge>
                </div>
                <p className="mt-2 text-sm text-neutral-400">
                  {[c["territory"], c["rights_sought"]].filter(Boolean).map(String).join(" · ") ||
                    "No terms stated"}
                </p>
                {c["message"] ? <p className="mt-3 text-sm text-neutral-400">{String(c["message"])}</p> : null}
                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    ["contact_agents", "Contact literary agents"],
                    ["rejected", "Reject"],
                    ["pending", "Reset to pending"],
                  ].map(([s, label]) => (
                    <Button
                      key={s}
                      size="sm"
                      variant="outline"
                      className="rounded-none border-neutral-700 bg-transparent text-neutral-200 hover:bg-neutral-800"
                      onClick={() => void setStatus("collaboration_requests", c.id, s!)}
                    >
                      {label}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
