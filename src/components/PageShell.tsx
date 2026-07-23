import type { ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

export function PageShell({
  children,
  transparentNav = false,
}: {
  children: ReactNode;
  transparentNav?: boolean;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav transparent={transparentNav} />
      <main className={transparentNav ? "" : "pt-2"}>{children}</main>
      <Footer />
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="container-luxe pt-16 md:pt-24 pb-14 md:pb-20 text-center">
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h1 className="mt-4 font-serif text-4xl md:text-6xl leading-[1.05]">{title}</h1>
      {subtitle && (
        <p className="mt-6 max-w-xl mx-auto text-muted-foreground leading-relaxed">
          {subtitle}
        </p>
      )}
    </section>
  );
}
