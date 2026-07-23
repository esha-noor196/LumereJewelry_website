import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Lock } from "lucide-react";
import { useState } from "react";
import { PageShell } from "@/components/PageShell";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/checkout")({
  component: Checkout,
  head: () => ({
    meta: [
      { title: "Checkout — Lumière Jewelry" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function Checkout() {
  const { cartProducts, cartTotal } = useStore();
  const [placed, setPlaced] = useState(false);
  const shipping = cartTotal > 200 || cartTotal === 0 ? 0 : 15;
  const total = cartTotal + shipping;

  if (placed) {
    return (
      <PageShell>
        <div className="container-luxe py-32 text-center max-w-lg">
          <CheckCircle2 className="h-14 w-14 mx-auto text-[var(--color-gold)]" />
          <h1 className="mt-6 font-serif text-4xl">Thank you.</h1>
          <p className="mt-4 text-muted-foreground">
            Your order has been placed. A confirmation is on its way to your inbox.
          </p>
          <Link to="/" className="btn-luxe mt-10">Return Home</Link>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="container-luxe pt-14 pb-16">
        <div className="text-center mb-12">
          <div className="eyebrow">Secure Checkout</div>
          <h1 className="mt-4 font-serif text-4xl md:text-5xl">Checkout</h1>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setPlaced(true);
          }}
          className="grid lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-20"
        >
          <div className="space-y-12">
            <Section title="Contact">
              <div className="grid gap-5">
                <Field label="Email" type="email" />
              </div>
            </Section>
            <Section title="Delivery">
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="First Name" />
                <Field label="Last Name" />
                <Field label="Address" className="sm:col-span-2" />
                <Field label="City" />
                <Field label="Postal Code" />
                <Field label="Country" className="sm:col-span-2" />
              </div>
            </Section>
            <Section title="Payment">
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Card Number" className="sm:col-span-2" />
                <Field label="Expiry (MM/YY)" />
                <Field label="CVC" />
              </div>
              <p className="mt-4 text-xs text-muted-foreground flex items-center gap-2">
                <Lock className="h-3 w-3" /> Your payment is encrypted and secure.
              </p>
            </Section>
            <button className="btn-luxe w-full">Place Order — €{total}</button>
          </div>

          <aside className="bg-card border border-border p-8 h-fit lg:sticky lg:top-32">
            <h2 className="font-serif text-2xl">Your Bag</h2>
            <div className="mt-6 divide-y divide-border">
              {cartProducts.length === 0 && (
                <p className="text-sm text-muted-foreground py-2">Your bag is empty.</p>
              )}
              {cartProducts.map((item) => (
                <div key={item.id} className="flex gap-4 py-4">
                  <div className="w-16 aspect-[3/4] bg-[var(--color-muted)] overflow-hidden shrink-0">
                    <img src={item.product.image} alt="" className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm truncate">{item.product.name}</div>
                    <div className="text-xs text-muted-foreground">Qty {item.qty}</div>
                  </div>
                  <div className="text-sm">€{item.product.price * item.qty}</div>
                </div>
              ))}
            </div>
            <div className="hairline my-6" />
            <div className="space-y-2 text-sm">
              <Row label="Subtotal" value={`€${cartTotal}`} />
              <Row label="Shipping" value={shipping === 0 ? "Complimentary" : `€${shipping}`} />
            </div>
            <div className="hairline my-6" />
            <div className="flex justify-between items-baseline">
              <span className="text-[0.7rem] tracking-[0.3em] uppercase">Total</span>
              <span className="font-serif text-3xl">€{total}</span>
            </div>
          </aside>
        </form>
      </div>
    </PageShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-serif text-2xl mb-6">{title}</h2>
      {children}
    </section>
  );
}
function Field({ label, type = "text", className = "" }: { label: string; type?: string; className?: string }) {
  return (
    <div className={className}>
      <label className="text-[0.7rem] tracking-[0.28em] uppercase text-muted-foreground">{label}</label>
      <input
        type={type}
        required
        className="mt-2 w-full bg-transparent border-b border-border py-3 outline-none focus:border-[var(--color-gold)] transition-colors"
      />
    </div>
  );
}
function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span>{value}</span>
    </div>
  );
}
