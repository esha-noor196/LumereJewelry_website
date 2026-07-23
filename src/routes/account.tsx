import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { User, Package, Heart, MapPin, LogOut } from "lucide-react";
import { PageShell, PageHeader } from "@/components/PageShell";

export const Route = createFileRoute("/account")({
  component: Account,
  head: () => ({
    meta: [
      { title: "Account — Lumière Jewelry" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function Account() {
  const [signedIn, setSignedIn] = useState(false);

  if (!signedIn) {
    return (
      <PageShell>
        <PageHeader eyebrow="Lumière Account" title="Sign In" />
        <div className="container-luxe max-w-md pb-24">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSignedIn(true);
            }}
            className="space-y-5"
          >
            <Field label="Email" type="email" />
            <Field label="Password" type="password" />
            <button className="btn-luxe w-full">Sign In</button>
          </form>
          <div className="mt-6 flex items-center justify-between text-xs tracking-[0.2em] uppercase">
            <a href="#" className="gold-underline text-muted-foreground">Forgot password?</a>
            <a href="#" className="gold-underline">Create account</a>
          </div>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <PageHeader eyebrow="Welcome back" title="Amelia W." />
      <div className="container-luxe grid md:grid-cols-[240px_1fr] gap-12 pb-16">
        <nav className="space-y-1 text-sm">
          {[
            { icon: User, label: "Profile" },
            { icon: Package, label: "Orders" },
            { icon: Heart, label: "Wishlist" },
            { icon: MapPin, label: "Addresses" },
          ].map((n, i) => (
            <button
              key={i}
              className="flex items-center gap-3 w-full px-4 py-3 text-left border-l-2 border-transparent hover:border-[var(--color-gold)] hover:bg-card transition-colors"
            >
              <n.icon className="h-4 w-4" /> {n.label}
            </button>
          ))}
          <button
            onClick={() => setSignedIn(false)}
            className="flex items-center gap-3 w-full px-4 py-3 text-left border-l-2 border-transparent hover:border-[var(--color-gold)] text-muted-foreground"
          >
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </nav>
        <div>
          <h2 className="font-serif text-2xl mb-6">Recent Orders</h2>
          <div className="border border-border">
            {[
              { id: "SEL-2841", date: "12 Oct 2026", total: "€714", status: "Delivered" },
              { id: "SEL-2739", date: "28 Sep 2026", total: "€289", status: "Delivered" },
              { id: "SEL-2611", date: "04 Aug 2026", total: "€1,120", status: "Delivered" },
            ].map((o, i) => (
              <div
                key={i}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 border-t border-border first:border-t-0 items-center"
              >
                <div className="font-medium">{o.id}</div>
                <div className="text-sm text-muted-foreground">{o.date}</div>
                <div className="text-sm">{o.total}</div>
                <div className="text-xs tracking-[0.2em] uppercase text-[var(--color-gold)]">
                  {o.status}
                </div>
              </div>
            ))}
          </div>
          <Link to="/shop" className="btn-luxe mt-10">Continue Shopping</Link>
        </div>
      </div>
    </PageShell>
  );
}

function Field({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <div>
      <label className="text-[0.7rem] tracking-[0.28em] uppercase text-muted-foreground">
        {label}
      </label>
      <input
        type={type}
        required
        className="mt-2 w-full bg-transparent border-b border-border py-3 outline-none focus:border-[var(--color-gold)] transition-colors"
      />
    </div>
  );
}
