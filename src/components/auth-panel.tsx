import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { ArrowLeft, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type ExtraField = {
  name: string;
  label: string;
  placeholder?: string;
  textarea?: boolean;
  required?: boolean;
};

export function AuthPanel({
  kind,
  eyebrow,
  title,
  intro,
  accent,
  extraFields,
  destination,
  crossLinkLabel,
  crossLinkTo,
}: {
  kind: "author" | "agent";
  eyebrow: string;
  title: string;
  intro: string;
  accent: string;
  extraFields: ExtraField[];
  destination: string;
  crossLinkLabel: string;
  crossLinkTo: string;
}) {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});
  const v = (k: string) => values[k] ?? "";
  const set = (k: string, val: string) => setValues((s) => ({ ...s, [k]: val }));

  async function signIn(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: v("in_email").trim(),
      password: v("in_password"),
    });
    if (error) {
      setBusy(false);
      toast.error(error.message);
      return;
    }
    const { data: role } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", data.user.id);
    const roles = (role ?? []).map((r) => r.role);
    setBusy(false);
    if (!roles.includes(kind)) {
      await supabase.auth.signOut();
      toast.error(
        kind === "author"
          ? "That account is not an author account. Use the publishing agent entrance."
          : "That account is not a publishing agent account. Use the author entrance.",
      );
      return;
    }
    toast.success("Signed in");
    void navigate({ to: destination });
  }

  async function signUp(e: React.FormEvent) {
    e.preventDefault();
    if (v("up_password").length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }
    setBusy(true);
    const meta: Record<string, string> = { kind, full_name: v("full_name").trim() };
    for (const f of extraFields) meta[f.name] = v(f.name).trim();

    const { error } = await supabase.auth.signUp({
      email: v("up_email").trim(),
      password: v("up_password"),
      options: { data: meta, emailRedirectTo: window.location.origin },
    });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Account created");
    void navigate({ to: destination });
  }

  return (
    <main className="min-h-screen bg-paper">
      <div className="mx-auto grid max-w-[1240px] gap-12 px-5 py-14 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <Link to="/" className="eyebrow inline-flex items-center gap-2 text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-3.5 w-3.5" /> TSEHAI Portal
          </Link>
          <div className="mt-10 border-l-4 pl-6" style={{ borderColor: accent }}>
            <div className="eyebrow" style={{ color: accent }}>
              {eyebrow}
            </div>
            <h1 className="mt-3 font-display text-5xl leading-[1.05] font-bold tracking-tight">{title}</h1>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted-foreground">{intro}</p>
          </div>
          <p className="mt-10 text-sm text-muted-foreground">
            Wrong entrance?{" "}
            <Link to={crossLinkTo} className="underline underline-offset-4 hover:text-primary">
              {crossLinkLabel}
            </Link>
          </p>
        </div>

        <div className="border border-neutral-200 bg-white">
          <Tabs defaultValue="signup">
            <div className="border-b px-6">
              <TabsList className="h-auto w-full justify-start gap-6 rounded-none bg-transparent p-0">
                {[
                  ["signup", "Create account"],
                  ["signin", "Sign in"],
                ].map(([val, label]) => (
                  <TabsTrigger
                    key={val}
                    value={val}
                    className="eyebrow rounded-none border-b-2 border-transparent bg-transparent px-0 py-4 text-muted-foreground shadow-none data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none"
                  >
                    {label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <TabsContent value="signup" className="m-0 px-6 py-6">
              <form className="space-y-4" onSubmit={signUp}>
                <div className="space-y-1.5">
                  <Label className="eyebrow text-muted-foreground">Full name</Label>
                  <Input required value={v("full_name")} onChange={(e) => set("full_name", e.target.value)} />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label className="eyebrow text-muted-foreground">Email</Label>
                    <Input required type="email" value={v("up_email")} onChange={(e) => set("up_email", e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="eyebrow text-muted-foreground">Password</Label>
                    <Input
                      required
                      type="password"
                      placeholder="8+ characters"
                      value={v("up_password")}
                      onChange={(e) => set("up_password", e.target.value)}
                    />
                  </div>
                </div>
                {extraFields.map((f) =>
                  f.textarea ? (
                    <div key={f.name} className="space-y-1.5">
                      <Label className="eyebrow text-muted-foreground">{f.label}</Label>
                      <Textarea
                        rows={4}
                        required={f.required}
                        placeholder={f.placeholder}
                        value={v(f.name)}
                        onChange={(e) => set(f.name, e.target.value)}
                      />
                    </div>
                  ) : (
                    <div key={f.name} className="space-y-1.5">
                      <Label className="eyebrow text-muted-foreground">{f.label}</Label>
                      <Input
                        required={f.required}
                        placeholder={f.placeholder}
                        value={v(f.name)}
                        onChange={(e) => set(f.name, e.target.value)}
                      />
                    </div>
                  ),
                )}
                <Button disabled={busy} className="w-full gap-2 rounded-none" type="submit">
                  {busy && <Loader2 className="h-4 w-4 animate-spin" />} Create {kind === "author" ? "author" : "agent"} account
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signin" className="m-0 px-6 py-6">
              <form className="space-y-4" onSubmit={signIn}>
                <div className="space-y-1.5">
                  <Label className="eyebrow text-muted-foreground">Email</Label>
                  <Input required type="email" value={v("in_email")} onChange={(e) => set("in_email", e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label className="eyebrow text-muted-foreground">Password</Label>
                  <Input
                    required
                    type="password"
                    value={v("in_password")}
                    onChange={(e) => set("in_password", e.target.value)}
                  />
                </div>
                <Button disabled={busy} className="w-full gap-2 rounded-none" type="submit">
                  {busy && <Loader2 className="h-4 w-4 animate-spin" />} Sign in
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
