import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Minus, Plus, Truck, RotateCcw, ShieldCheck, Star } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { ProductCard } from "@/components/ProductCard";
import { getProduct, products } from "@/lib/products";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    const { product } = loaderData;
    return {
      meta: [
        { title: `${product.name} — Lumière Jewelry` },
        { name: "description", content: product.description },
        { property: "og:title", content: `${product.name} — Lumière Jewelry` },
        { property: "og:description", content: product.description },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]);
  const [qty, setQty] = useState(1);
  const [mainImg, setMainImg] = useState(product.image);
  const wished = wishlist.includes(product.id);

  const gallery = [product.image, product.hoverImage, product.image];

  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  return (
    <PageShell>
      <div className="container-luxe pt-10">
        <nav className="text-[0.7rem] tracking-[0.25em] uppercase text-muted-foreground mb-8">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span className="mx-3">/</span>
          <Link to="/shop" className="hover:text-foreground">Shop</Link>
          <span className="mx-3">/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-20">
          {/* Gallery */}
          <div className="flex gap-4">
            <div className="hidden md:flex flex-col gap-3 w-20 shrink-0">
              {gallery.map((g, i) => (
                <button
                  key={i}
                  onClick={() => setMainImg(g)}
                  className={`aspect-[3/4] overflow-hidden border ${mainImg === g ? "border-[var(--color-gold)]" : "border-transparent"}`}
                >
                  <img src={g} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
            <div className="flex-1 bg-[var(--color-muted)] aspect-[3/4] overflow-hidden group">
              <img
                src={mainImg}
                alt={product.name}
                width={900}
                height={1200}
                className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.08]"
              />
            </div>
          </div>

          {/* Details */}
          <div className="lg:pt-6 lg:sticky lg:top-32 lg:self-start">
            <div className="eyebrow">{product.collection}</div>
            <h1 className="mt-4 font-serif text-4xl md:text-5xl leading-[1.05]">{product.name}</h1>
            <div className="mt-6 flex items-center gap-4">
              <span className="text-2xl font-medium">€{product.price}</span>
              {product.originalPrice && (
                <span className="text-muted-foreground line-through">€{product.originalPrice}</span>
              )}
              <div className="ml-2 flex items-center gap-1 text-[var(--color-gold)]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
                <span className="ml-2 text-xs text-muted-foreground">(128 reviews)</span>
              </div>
            </div>

            <p className="mt-8 text-muted-foreground leading-relaxed max-w-md">
              {product.description}
            </p>

            {/* Color */}
            <div className="mt-10">
              <div className="flex items-center justify-between text-[0.7rem] tracking-[0.28em] uppercase">
                <span>Colour</span>
                <span className="text-muted-foreground">{color}</span>
              </div>
              <div className="mt-3 flex gap-2">
                {product.colors.map((c: string) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`px-4 py-2 text-xs border transition-colors ${color === c ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-ivory)]" : "border-border hover:border-[var(--color-ink)]"}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="mt-8">
              <div className="flex items-center justify-between text-[0.7rem] tracking-[0.28em] uppercase">
                <span>Size</span>
                <button className="text-muted-foreground gold-underline">Size Guide</button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.sizes.map((s: string) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`min-w-12 px-4 py-3 text-xs border transition-colors ${size === s ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-ivory)]" : "border-border hover:border-[var(--color-ink)]"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Qty + CTA */}
            <div className="mt-10 flex flex-wrap gap-3 items-stretch">
              <div className="flex items-center border border-border">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="h-full px-4" aria-label="Decrease">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center text-sm">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="h-full px-4" aria-label="Increase">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button
                onClick={() => addToCart(product.id, { size, color, qty })}
                className="btn-luxe flex-1"
              >
                Add to Bag
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                aria-label="Wishlist"
                className={`h-full aspect-square grid place-items-center border transition-colors ${wished ? "border-[var(--color-gold)] text-[var(--color-gold)]" : "border-border hover:border-[var(--color-ink)]"}`}
              >
                <Heart className={`h-4 w-4 ${wished ? "fill-current" : ""}`} />
              </button>
            </div>

            <button className="btn-luxe-gold w-full mt-3">Buy It Now</button>

            {/* Features */}
            <div className="mt-10 grid grid-cols-3 gap-4 text-center text-[0.65rem] tracking-[0.25em] uppercase">
              {[
                { icon: Truck, label: "Free Shipping" },
                { icon: RotateCcw, label: "30-Day Returns" },
                { icon: ShieldCheck, label: "Secure Checkout" },
              ].map((f, i) => (
                <div key={i} className="py-6 border border-border">
                  <f.icon className="h-4 w-4 mx-auto text-[var(--color-gold)]" />
                  <div className="mt-3">{f.label}</div>
                </div>
              ))}
            </div>

            {/* Accordion-esque */}
            <div className="mt-10 divide-y divide-border border-y border-border">
              {[
                { t: "Materials & Craftsmanship", c: `${product.material}. Designed in Paris, hand-set in our Antwerp atelier. Comes with a signed certificate of authenticity.` },
                { t: "Shipping & Returns", c: "Complimentary insured shipping worldwide on orders over €200. Free returns within 30 days in original packaging." },
                { t: "Lifetime Care", c: "Every Lumière piece includes free professional cleaning, polishing, resizing, and stone re-tightening for life." },
              ].map((row, i) => (
                <details key={i} className="group py-5">
                  <summary className="flex items-center justify-between text-sm tracking-[0.15em] uppercase cursor-pointer list-none">
                    <span>{row.t}</span>
                    <Plus className="h-4 w-4 group-open:hidden" />
                    <Minus className="h-4 w-4 hidden group-open:block" />
                  </summary>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{row.c}</p>
                </details>
              ))}
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="pt-24 md:pt-32">
            <div className="text-center mb-14">
              <div className="eyebrow">You May Also Love</div>
              <h2 className="mt-4 font-serif text-3xl md:text-4xl">The Perfect Complement</h2>
            </div>
            <div className="grid gap-x-6 gap-y-14 grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </PageShell>
  );
}
