import { cn } from "@/lib/utils";

export function Stepper({ steps, current }: { steps: string[]; current: number }) {
  return (
    <ol className="flex flex-wrap items-center gap-x-2 gap-y-3">
      {steps.map((s, i) => {
        const state = i === current ? "current" : i < current ? "done" : "todo";
        return (
          <li key={s} className="flex items-center gap-2">
            <span
              className={cn(
                "flex h-7 w-7 items-center justify-center border text-xs tabular-nums",
                state === "current" && "border-primary bg-primary text-primary-foreground",
                state === "done" && "border-primary bg-primary/10 text-primary",
                state === "todo" && "border-neutral-300 text-muted-foreground",
              )}
            >
              {i + 1}
            </span>
            <span
              className={cn(
                "eyebrow",
                state === "todo" ? "text-muted-foreground" : "text-foreground",
              )}
            >
              {s}
            </span>
            {i < steps.length - 1 && <span className="mx-1 h-px w-6 bg-neutral-300" />}
          </li>
        );
      })}
    </ol>
  );
}

export function AlphabetIndex({
  letters,
  active,
  onSelect,
}: {
  letters: Set<string>;
  active: string | null;
  onSelect: (l: string | null) => void;
}) {
  const all = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  return (
    <div className="flex flex-wrap items-center gap-1">
      <button
        onClick={() => onSelect(null)}
        className={cn(
          "eyebrow border px-2.5 py-1 transition-colors",
          active === null
            ? "border-primary bg-primary text-primary-foreground"
            : "border-neutral-200 text-muted-foreground hover:border-primary hover:text-primary",
        )}
      >
        All
      </button>
      {all.map((l) => {
        const has = letters.has(l);
        return (
          <button
            key={l}
            disabled={!has}
            onClick={() => onSelect(l)}
            className={cn(
              "h-7 w-7 border text-xs font-medium transition-colors",
              active === l
                ? "border-primary bg-primary text-primary-foreground"
                : has
                  ? "border-neutral-200 hover:border-primary hover:text-primary"
                  : "cursor-not-allowed border-neutral-100 text-neutral-300",
            )}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}
