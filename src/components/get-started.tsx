import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, Briefcase, PenLine, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function GetStarted() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const go = (to: string) => {
    setOpen(false);
    void navigate({ to });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-2 rounded-none px-4 tracking-wide uppercase">
          <PenLine className="h-3.5 w-3.5" />
          Get started!
        </Button>
      </DialogTrigger>
      <DialogContent className="gap-0 overflow-hidden rounded-none border-neutral-200 p-0 sm:max-w-2xl">
        <DialogHeader className="space-y-1 border-b bg-white px-6 py-5 text-left">
          <DialogTitle className="font-display text-2xl">Which entrance is yours?</DialogTitle>
          <DialogDescription>
            The portal keeps two separate populations. Choose the one that describes you — the
            registration you are asked to complete is different in each case.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-px bg-neutral-200 sm:grid-cols-2">
          <button
            onClick={() => go("/auth/author")}
            className="group bg-white p-6 text-left transition-colors hover:bg-paper"
          >
            <PenLine className="h-5 w-5 text-primary" />
            <div className="mt-4 font-display text-xl font-bold">I am an author or estate</div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Hold your biography and bibliography, and request new titles for the catalogue.
            </p>
            <span className="eyebrow mt-5 inline-flex items-center gap-1.5 text-primary">
              Author entrance <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </button>

          <button
            onClick={() => go("/auth/agent")}
            className="group bg-white p-6 text-left transition-colors hover:bg-paper"
          >
            <Briefcase className="h-5 w-5" />
            <div className="mt-4 font-display text-xl font-bold">I am a literary agent</div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Register your agency and request to work with individual titles in the catalogue.
            </p>
            <span className="eyebrow mt-5 inline-flex items-center gap-1.5">
              Literary agent entrance <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </button>
        </div>

        <div className="flex flex-col items-start gap-2 border-t bg-paper px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="h-4 w-4" />
            Login as rights manager?
          </div>
          <a
            href="/rights"
            target="_blank"
            rel="noopener noreferrer"
            className="eyebrow inline-flex items-center gap-1.5 border border-foreground px-3 py-2 transition-colors hover:bg-foreground hover:text-background"
          >
            Yes — staff console <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
