import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, X, ArrowRight, Tag } from "lucide-react";
import { useState } from "react";
import { PageShell, PageHeader } from "@/components/PageShell";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/cart")({
  component: Cart,
  head: () => ({
    meta: [
      { title: "Shopping Bag — Lumière Jewelry" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function Cart() {
  const { cartProducts, removeFromCart, setQty, cartTotal } = useStore();
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState<number>(0);

  const shipping = cartTotal > 200 || cartTotal === 0 ? 0 : 15;
  const discount = applied;
  const total = Math.max(0, cartTotal + shipping - discount);

  return (
    <PageShell>
      <PageHeader
        eyebrow="Your Selection"
        title="Shopping Bag"
        subtitle={cartProducts.length === 0 ? undefined : `${cartProducts.length} piece${cartProducts.length === 1 ? "" : "s"} awaiting you.`}
      />

      <div className="container-luxe pb-16">
        {cartProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground mb-8">Your bag is empty.</p>
            <Link to="/shop" className="btn-luxe">Continue Shopping</Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1.6fr_1fr] gap-12 lg:gap-20">
            <div className="divide-y divide-border border-y border-border">
              {cartProducts.map((item) => (
                <div key={item.id} className="py-6 grid grid-cols-[100px_1fr_auto] md:grid-cols-[120px_1fr_auto] gap-6 items-start">
                  <Link to="/product/$id" params={{ id: item.id }} className="bg-[var(--color-muted)] aspect-[3/4] overflow-hidden">
                    <img src={item.product.image} alt={item.product.name} className="h-full w-full object-cover" />
                  </Link>
                  <div className="min-w-0">
                    <div className="text-[0.65rem] tracking-[0.28em] uppercase text-muted-foreground">
                      {item.product.collection}
                    </div>
                    <Link to="/product/$id" params={{ id: item.id }} className="mt-1 font-serif text-lg md:text-xl block">
                      {item.product.name}
                    </Link>
                    <div className="mt-2 text-xs text-muted-foreground">
                      {item.color && <span>Colour: {item.color}</span>}
                      {item.size && <span className="ml-4">Size: {item.size}</span>}
                    </div>
                    <div className="mt-4 flex items-center gap-4">
                      <div className="flex items-center border border-border">
                        <button onClick={() => setQty(item.id, item.qty - 1)} className="px-3 py-2" aria-label="Decrease">
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-sm">{item.qty}</span>
                        <button onClick={() => setQty(item.id, item.qty + 1)} className="px-3 py-2" aria-label="Increase">
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                      >
                        <X className="h-3 w-3" /> Remove
                      </button>
                    </div>
                  </div>
                  <div className="text-right font-medium">€{item.product.price * item.qty}</div>
                </div>
              ))}
            </div>

            <aside className="bg-card border border-border p-8 h-fit lg:sticky lg:top-32">
              <h2 className="font-serif text-2xl">Order Summary</h2>
              <div className="mt-6 space-y-3 text-sm">
                <Row label="Subtotal" value={`€${cartTotal}`} />
                <Row label="Shipping" value={shipping === 0 ? "Complimentary" : `€${shipping}`} />
                {discount > 0 && <Row label="Discount" value={`-€${discount}`} />}
              </div>
              <div className="hairline my-6" />
              <div className="flex justify-between items-baseline">
                <span className="text-[0.7rem] tracking-[0.3em] uppercase">Total</span>
                <span className="font-serif text-3xl">€{total}</span>
              </div>

              <div className="mt-8">
                <label className="text-[0.65rem] tracking-[0.28em] uppercase text-muted-foreground flex items-center gap-2">
                  <Tag className="h-3 w-3" /> Promo Code
                </label>
                <div className="mt-3 flex">
                  <input
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                    placeholder="SELORA10"
                    className="flex-1 border border-border bg-transparent px-4 py-3 text-sm outline-none focus:border-[var(--color-gold)]"
                  />
                  <button
                    onClick={() => setApplied(coupon === "SELORA10" ? Math.round(cartTotal * 0.1) : 0)}
                    className="border border-l-0 border-border px-5 text-xs tracking-[0.2em] uppercase hover:bg-[var(--color-ink)] hover:text-[var(--color-ivory)] transition-colors"
                  >
                    Apply
                  </button>
                </div>
              </div>

              <Link to="/checkout" className="btn-luxe w-full mt-8">
                Secure Checkout <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/shop" className="mt-4 block text-center text-xs tracking-[0.2em] uppercase gold-underline">
                Continue Shopping
              </Link>
            </aside>
          </div>
        )}
      </div>
    </PageShell>
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
