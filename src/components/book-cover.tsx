import { useState } from "react";
import { coverImage } from "@/lib/slug";
import { cn } from "@/lib/utils";

type Props = {
  id: string;
  title: string;
  author: string;
  year: number;
  className?: string;
  tilt?: boolean;
};

const PALETTES = [
  { bg: "bg-[#1c1c1c]", rule: "bg-[#C41230]", text: "text-[#f4f1ea]", meta: "text-[#f4f1ea]/60" },
  { bg: "bg-[#C41230]", rule: "bg-[#F9F8F6]", text: "text-[#F9F8F6]", meta: "text-[#F9F8F6]/70" },
  { bg: "bg-[#e8e3d7]", rule: "bg-[#1c1c1c]", text: "text-[#1c1c1c]", meta: "text-[#1c1c1c]/60" },
  { bg: "bg-[#0f3b32]", rule: "bg-[#D97706]", text: "text-[#f4f1ea]", meta: "text-[#f4f1ea]/60" },
  { bg: "bg-[#E05A00]", rule: "bg-[#1c1c1c]", text: "text-[#1c1c1c]", meta: "text-[#1c1c1c]/70" },
  { bg: "bg-[#26303c]", rule: "bg-[#e8e3d7]", text: "text-[#f4f1ea]", meta: "text-[#f4f1ea]/60" },
];

function paletteFor(id: string) {
  let n = 0;
  for (const ch of id) n = (n + ch.charCodeAt(0)) % 997;
  return PALETTES[n % PALETTES.length];
}

export function BookCover({ id, title, author, year, className, tilt = true }: Props) {
  const [failed, setFailed] = useState(false);
  const p = paletteFor(id);

  return (
    <div
      className={cn(
        "relative aspect-[2/3] w-full overflow-hidden rounded-[2px] shadow-[10px_14px_30px_-16px_rgba(0,0,0,0.45)] ring-1 ring-black/10",
        tilt && "tilt-card",
        className,
      )}
    >
      {!failed ? (
        <img
          src={coverImage(id)}
          alt={`Cover of ${title} by ${author}`}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className={cn("flex h-full w-full flex-col justify-between p-[8%]", p.bg)}>
          <div className={cn("eyebrow", p.meta)}>Tsehai</div>
          <div>
            <div className={cn("h-px w-10", p.rule)} />
            <h3
              className={cn(
                "mt-3 font-display text-[clamp(0.95rem,2.1vw,1.6rem)] leading-[1.08] font-semibold",
                p.text,
              )}
            >
              {title}
            </h3>
          </div>
          <div className={cn("eyebrow leading-relaxed", p.meta)}>
            {author}
            <br />
            {year}
          </div>
        </div>
      )}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[7%] bg-gradient-to-r from-black/25 to-transparent" />
    </div>
  );
}