import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { MessageSquare, X, MoreVertical, RotateCcw } from "lucide-react";
import { assistantTree, type AssistantOption } from "@/data/assistant-tree";

type Entry =
  | { who: "bot"; text: string }
  | { who: "user"; text: string }
  | { who: "divider"; text: string };

export function SiteAssistant() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [node, setNode] = useState("start");
  const [log, setLog] = useState<Entry[]>([]);
  const [menu, setMenu] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // seed the first node
  useEffect(() => {
    if (log.length === 0) {
      setLog(assistantTree["start"]!.say.map((text) => ({ who: "bot", text }) as Entry));
    }
  }, [log.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [log, open]);

  const current = assistantTree[node]!;

  function reset() {
    setNode("start");
    setLog(assistantTree["start"]!.say.map((text) => ({ who: "bot", text }) as Entry));
    setMenu(false);
  }

  function choose(opt: AssistantOption) {
    const next: Entry[] = [{ who: "user", text: opt.label }];

    if (opt.href) {
      if (opt.newTab) {
        window.open(opt.href, "_blank", "noopener,noreferrer");
        next.push({ who: "bot", text: "Opened in a new tab. Anything else?" });
        setLog((l) => [...l, ...next]);
        setNode("menu");
        return;
      }
      if (opt.href.includes("#")) window.location.assign(opt.href);
      else void navigate({ to: opt.href });
      next.push({ who: "bot", text: "Taking you there now. Anything else?" });
      setLog((l) => [...l, ...next]);
      setNode("menu");
      return;
    }

    const target = assistantTree[opt.to ?? "menu"] ?? assistantTree["menu"]!;
    next.push({ who: "divider", text: "New messages" });
    for (const text of target.say) next.push({ who: "bot", text });
    setLog((l) => [...l, ...next]);
    setNode(opt.to ?? "menu");
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        aria-label="Open the TSEHAI assistant"
        className="fixed right-5 bottom-5 z-50 flex items-center gap-2 border border-neutral-900 bg-brick px-4 py-3 text-brick-foreground shadow-xl transition-transform hover:-translate-y-0.5"
      >
        <MessageSquare className="h-5 w-5" />
        <span className="eyebrow">Need help?</span>
      </button>
    );
  }

  return (
    <div className="fixed right-5 bottom-5 z-50 flex max-h-[80vh] w-[min(24rem,calc(100vw-2.5rem))] flex-col border border-neutral-900 bg-brick shadow-2xl">
      {/* header */}
      <div className="flex items-start justify-between px-4 pt-4">
        <MessageSquare className="h-6 w-6 text-brick-foreground" />
        <div className="relative flex items-center gap-1">
          <button
            onClick={() => setMenu((m) => !m)}
            aria-label="Assistant options"
            className="p-1 text-brick-foreground/90 hover:text-brick-foreground"
          >
            <MoreVertical className="h-4 w-4" />
          </button>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close the assistant"
            className="p-1 text-brick-foreground/90 hover:text-brick-foreground"
          >
            <X className="h-4 w-4" />
          </button>
          {menu && (
            <div className="absolute top-8 right-0 w-44 border border-neutral-200 bg-white p-1 shadow-lg">
              <button
                onClick={reset}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-paper"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Start again
              </button>
              <button
                onClick={() => {
                  setMenu(false);
                  setOpen(false);
                }}
                className="w-full px-3 py-2 text-left text-sm hover:bg-paper"
              >
                Close assistant
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="px-4 pt-2 pb-3 font-display text-lg font-bold text-brick-foreground">
        Ask TSEHAI
      </div>

      {/* transcript panel */}
      <div className="mx-3 flex min-h-0 flex-1 flex-col border border-neutral-200 bg-white">
        <div className="flex items-center gap-2 border-b border-neutral-200 px-4 py-3">
          <span className="flex h-8 w-8 items-center justify-center bg-neutral-900 font-display text-xs font-bold text-white">
            TS
          </span>
          <span className="font-display text-base font-semibold">Tsehai Assist</span>
        </div>

        <div ref={scrollRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4">
          {log.map((e, i) =>
            e.who === "divider" ? (
              <div key={i} className="flex items-center gap-2 py-1">
                <span className="h-px flex-1 bg-neutral-200" />
                <span className="eyebrow text-[10px] text-neutral-500">{e.text}</span>
                <span className="h-px flex-1 bg-neutral-200" />
              </div>
            ) : e.who === "bot" ? (
              <div key={i} className="flex items-start gap-2">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center bg-neutral-900 text-[10px] font-bold text-white">
                  TS
                </span>
                <p className="max-w-[85%] bg-neutral-100 px-3 py-2 text-sm leading-relaxed text-neutral-800">
                  {e.text}
                </p>
              </div>
            ) : (
              <div key={i} className="flex justify-end">
                <p className="max-w-[85%] bg-brick px-3 py-2 text-sm text-brick-foreground">{e.text}</p>
              </div>
            ),
          )}

          <div className="flex flex-wrap gap-2 pt-1">
            {current.options.map((o) => (
              <button
                key={o.label}
                onClick={() => choose(o)}
                className="border border-brick/60 bg-white px-3 py-2 text-sm text-neutral-800 transition-colors hover:bg-brick hover:text-brick-foreground"
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* footer */}
      <div className="flex flex-wrap gap-2 px-3 py-3">
        <FooterBtn onClick={() => choose({ label: "Main menu", to: "menu" })}>Main menu</FooterBtn>
        <FooterBtn onClick={reset}>Start again</FooterBtn>
        <FooterBtn onClick={() => choose({ label: "Contact a human", to: "contact" })}>Contact</FooterBtn>
      </div>
    </div>
  );
}

function FooterBtn({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="border border-white/70 bg-transparent px-3 py-1.5 text-xs text-brick-foreground transition-colors hover:bg-white hover:text-brick"
    >
      {children}
    </button>
  );
}
