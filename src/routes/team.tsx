import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { bookColor, staff } from "@/data/staff";

export const Route = createFileRoute("/team")({
  component: Team,
  head: () => ({
    meta: [
      { title: "Meet the Team — TSEHAI Bibliographic Portal" },
      {
        name: "description",
        content:
          "The editors, archivists and rights staff behind the TSEHAI master bibliographic and author portal.",
      },
      { property: "og:title", content: "Meet the Team — TSEHAI" },
      {
        property: "og:description",
        content: "Editors, archivists and rights staff behind the TSEHAI author portal.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function BookTile({ seed }: { seed: string }) {
  const color = bookColor(seed);
  return (
    <div className="aspect-square w-full [perspective:1100px]">
      <div className="flex h-full w-full items-center justify-center">
        <div
          className="relative h-[62%] w-[74%] transition-transform duration-500 [transform:rotateX(52deg)_rotateZ(-28deg)] [transform-style:preserve-3d] hover:[transform:rotateX(44deg)_rotateZ(-20deg)]"
          style={{ background: color }}
        >
          {/* cover sheen */}
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.32),rgba(255,255,255,0)_55%,rgba(0,0,0,0.18))]" />
          {/* spine */}
          <div
            className="absolute top-0 left-0 h-full w-[26px] origin-left [transform:rotateY(-90deg)]"
            style={{ background: color, filter: "brightness(0.72)" }}
          />
          {/* page block */}
          <div
            className="absolute bottom-0 left-0 h-[26px] w-full origin-bottom [transform:rotateX(-90deg)]"
            style={{ background: "#f4f1ea" }}
          />
          <div
            className="absolute top-0 right-0 h-full w-[26px] origin-right [transform:rotateY(90deg)]"
            style={{ background: "#e7e1d4" }}
          />
          <div className="absolute -bottom-8 left-4 -z-10 h-full w-full bg-black/25 blur-xl" />
        </div>
      </div>
    </div>
  );
}

function Team() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signedIn, setSignedIn] = useState<(typeof staff)[number] | null>(null);
  const [error, setError] = useState("");

  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />
      <section className="mx-auto max-w-[1240px] px-5 py-16">
        <div className="text-center">
          <h1 className="font-display text-[clamp(2rem,4.5vw,3.2rem)] leading-tight">
            Our leadership team
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            With over 100 years of combined experience in Ethiopian and Horn of Africa publishing,
            we keep the catalogue accurate, the rights clear and the archive open.
          </p>
        </div>

        <div className="mt-16 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {staff.map((s) => (
            <article key={s.id}>
              <BookTile seed={s.id + s.name} />
              <h2 className="mt-6 font-display text-xl">{s.name}</h2>
              <div className="eyebrow mt-1 text-muted-foreground">{s.title}</div>
            </article>
          ))}
        </div>

        {/* Mock staff sign-in */}
        <div className="mt-20 border border-neutral-200 bg-white p-8">
          <div className="eyebrow text-primary">Staff area — demo sign-in</div>
          {!signedIn ? (
            <form
              className="mt-5 grid gap-3 sm:grid-cols-[1fr_1fr_auto]"
              onSubmit={(e) => {
                e.preventDefault();
                const found = staff.find(
                  (s) =>
                    s.email.toLowerCase() === email.trim().toLowerCase() && s.password === password,
                );
                if (!found) return setError("Those staff credentials were not recognised.");
                setError("");
                setSignedIn(found);
              }}
            >
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@literary.com"
                className="h-11 rounded-none"
              />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="h-11 rounded-none"
              />
              <Button type="submit" className="h-11 rounded-none">
                Sign in
              </Button>
              {error && <p className="text-sm text-primary sm:col-span-3">{error}</p>}
            </form>
          ) : (
            <div className="mt-5">
              <h3 className="font-display text-2xl">Welcome, {signedIn.name}</h3>
              <div className="eyebrow mt-1 text-muted-foreground">
                Role: {signedIn.role.replace(/_/g, " ")}
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                {signedIn.permissions.map((p) => (
                  <li key={p} className="border-b border-neutral-100 pb-2">
                    {p}
                  </li>
                ))}
              </ul>
              <Button
                variant="outline"
                className="mt-5 rounded-none"
                onClick={() => {
                  setSignedIn(null);
                  setEmail("");
                  setPassword("");
                }}
              >
                Sign out
              </Button>
            </div>
          )}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
