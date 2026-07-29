import { useState } from "react";
import { authorImage, initials } from "@/lib/slug";
import { cn } from "@/lib/utils";

export function AuthorPortrait({
  name,
  className,
  rounded = "rounded-full",
}: {
  name: string;
  className?: string;
  rounded?: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-secondary ring-1 ring-border",
        rounded,
        className,
      )}
    >
      {!failed ? (
        <img
          src={authorImage(name)}
          alt={`Portrait of ${name}`}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(150deg,#efece4,#e2ddd1)]">
          <span className="font-display text-[38%] leading-none font-semibold text-ink/70">
            {initials(name)}
          </span>
        </div>
      )}
    </div>
  );
}