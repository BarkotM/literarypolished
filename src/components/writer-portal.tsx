import { useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Check, PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";

const STEPS = ["Identity", "Biography", "Your work", "Review & submit"];

type WizardState = {
  name: string;
  email: string;
  role: string;
  languages: string;
  bio: string;
  title: string;
  year: string;
  genre: string;
  language: string;
  note: string;
  consent: boolean;
};

const EMPTY: WizardState = {
  name: "",
  email: "",
  role: "Author",
  languages: "",
  bio: "",
  title: "",
  year: "",
  genre: "",
  language: "",
  note: "",
  consent: false,
};

function Field({
  label,
  ...props
}: { label: string } & React.ComponentProps<typeof Input>) {
  return (
    <div className="space-y-1.5">
      <Label className="eyebrow text-muted-foreground">{label}</Label>
      <Input {...props} />
    </div>
  );
}

export function WriterPortal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<WizardState>(EMPTY);
  const set = (k: keyof WizardState, v: string | boolean) =>
    setForm((f) => ({ ...f, [k]: v }));

  const words = form.bio.trim() ? form.bio.trim().split(/\s+/).length : 0;

  const canAdvance =
    step === 0
      ? form.name.trim().length > 1 && /\S+@\S+\.\S+/.test(form.email)
      : step === 1
        ? words >= 20
        : step === 2
          ? form.title.trim().length > 1
          : form.consent;

  function submit() {
    toast.success("Submission received", {
      description: `Thank you, ${form.name.split(" ")[0]}. Our editorial team reviews catalogue submissions within 10 working days.`,
    });
    setOpen(false);
    setStep(0);
    setForm(EMPTY);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-2 rounded-none px-4 tracking-wide uppercase">
          <PenLine className="h-3.5 w-3.5" />
          Writer Portal
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[88vh] gap-0 overflow-y-auto rounded-none border-neutral-200 p-0 sm:max-w-2xl">
        <DialogHeader className="space-y-1 border-b bg-white px-6 py-5 text-left">
          <DialogTitle className="font-display text-2xl">Writer Portal</DialogTitle>
          <DialogDescription>
            Sign in to manage your author page, or register a new author or estate for catalogue
            inclusion.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="signin" className="w-full">
          <div className="border-b bg-white px-6">
            <TabsList className="h-auto w-full justify-start gap-6 rounded-none bg-transparent p-0">
              {[
                ["signin", "Sign in"],
                ["signup", "Create account"],
                ["onboard", "Author onboarding"],
              ].map(([v, l]) => (
                <TabsTrigger
                  key={v}
                  value={v}
                  className="eyebrow rounded-none border-b-2 border-transparent bg-transparent px-0 py-3 text-muted-foreground shadow-none data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none"
                >
                  {l}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="signin" className="m-0 space-y-4 px-6 py-6">
            <Field label="Email" type="email" placeholder="you@example.com" />
            <Field label="Password" type="password" placeholder="••••••••" />
            <Button
              className="w-full rounded-none"
              onClick={() => toast.info("Portal accounts open with the public catalogue launch.")}
            >
              Sign in
            </Button>
          </TabsContent>

          <TabsContent value="signup" className="m-0 space-y-4 px-6 py-6">
            <Field label="Full name" placeholder="Your name" />
            <Field label="Email" type="email" placeholder="you@example.com" />
            <Field label="Password" type="password" placeholder="Choose a password" />
            <Button
              className="w-full rounded-none"
              onClick={() => toast.success("Account request noted — we'll be in touch by email.")}
            >
              Create account
            </Button>
          </TabsContent>

          <TabsContent value="onboard" className="m-0 px-6 py-6">
            <div className="mb-6">
              <div className="mb-2 flex items-center justify-between">
                <span className="eyebrow text-muted-foreground">
                  Step {step + 1} of {STEPS.length} · {STEPS[step]}
                </span>
                <span className="eyebrow text-muted-foreground">
                  {Math.round(((step + 1) / STEPS.length) * 100)}%
                </span>
              </div>
              <Progress value={((step + 1) / STEPS.length) * 100} className="h-1" />
            </div>

            {step === 0 && (
              <div className="space-y-4">
                <Field
                  label="Author or estate representative"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="Full name"
                />
                <Field
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  placeholder="you@example.com"
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Submitting as"
                    value={form.role}
                    onChange={(e) => set("role", e.target.value)}
                    placeholder="Author / Estate / Translator"
                  />
                  <Field
                    label="Languages"
                    value={form.languages}
                    onChange={(e) => set("languages", e.target.value)}
                    placeholder="Amharic, English"
                  />
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-2">
                <Label className="eyebrow text-muted-foreground">
                  Editorial biography (20 words minimum)
                </Label>
                <Textarea
                  rows={9}
                  value={form.bio}
                  onChange={(e) => set("bio", e.target.value)}
                  placeholder="Write in the third person, as it would appear on the author page…"
                />
                <p className="text-xs text-muted-foreground">{words} words</p>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <Field
                  label="Title"
                  value={form.title}
                  onChange={(e) => set("title", e.target.value)}
                  placeholder="Book title"
                />
                <div className="grid gap-4 sm:grid-cols-3">
                  <Field
                    label="Year"
                    value={form.year}
                    onChange={(e) => set("year", e.target.value)}
                    placeholder="2026"
                  />
                  <Field
                    label="Genre"
                    value={form.genre}
                    onChange={(e) => set("genre", e.target.value)}
                    placeholder="Historical Fiction"
                  />
                  <Field
                    label="Original language"
                    value={form.language}
                    onChange={(e) => set("language", e.target.value)}
                    placeholder="Amharic"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="eyebrow text-muted-foreground">Note to the editors</Label>
                  <Textarea
                    rows={4}
                    value={form.note}
                    onChange={(e) => set("note", e.target.value)}
                    placeholder="Rights, editions, archival holdings…"
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <dl className="divide-y border-y text-sm">
                  {[
                    ["Name", form.name],
                    ["Email", form.email],
                    ["Submitting as", form.role],
                    ["Languages", form.languages || "—"],
                    ["Title", form.title],
                    ["Year", form.year || "—"],
                    ["Genre", form.genre || "—"],
                    ["Biography", `${words} words`],
                  ].map(([k, v]) => (
                    <div key={k} className="grid grid-cols-3 gap-4 py-2.5">
                      <dt className="eyebrow text-muted-foreground">{k}</dt>
                      <dd className="col-span-2">{v}</dd>
                    </div>
                  ))}
                </dl>
                <label className="flex cursor-pointer items-start gap-3 text-sm text-muted-foreground">
                  <Checkbox
                    checked={form.consent}
                    onCheckedChange={(v) => set("consent", v === true)}
                    className="mt-0.5"
                  />
                  I confirm I hold or represent the rights to the work submitted and consent to
                  editorial review by TSEHAI Publishers.
                </label>
              </div>
            )}

            <div className="mt-8 flex items-center justify-between border-t pt-5">
              <Button
                variant="ghost"
                className="gap-2 rounded-none"
                disabled={step === 0}
                onClick={() => setStep((s) => Math.max(0, s - 1))}
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
              {step < STEPS.length - 1 ? (
                <Button
                  className="gap-2 rounded-none"
                  disabled={!canAdvance}
                  onClick={() => setStep((s) => s + 1)}
                >
                  Continue <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button className="gap-2 rounded-none" disabled={!canAdvance} onClick={submit}>
                  <Check className="h-4 w-4" /> Submit for review
                </Button>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}