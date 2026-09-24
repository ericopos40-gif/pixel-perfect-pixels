import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}

export function PageHero({ title, intro, eyebrow }: { title: string; intro: string; eyebrow?: string }) {
  return (
    <section className="brand-gradient px-4 py-16 text-white sm:px-6">
      <div className="mx-auto max-w-7xl">
        {eyebrow ? (
          <p className="text-xs font-semibold tracking-widest text-white/70 uppercase">{eyebrow}</p>
        ) : null}
        <h1 className="mt-2 font-display text-4xl font-bold text-white">{title}</h1>
        <p className="mt-3 max-w-2xl text-sm text-white/80">{intro}</p>
      </div>
    </section>
  );
}

export function Section({
  title,
  description,
  children,
  tinted = false,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  tinted?: boolean;
}) {
  return (
    <section className={tinted ? "bg-secondary px-4 py-16 sm:px-6" : "px-4 py-16 sm:px-6"}>
      <div className="mx-auto max-w-7xl">
        <h2 className="font-display text-3xl font-bold text-heading">{title}</h2>
        {description ? <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{description}</p> : null}
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}
