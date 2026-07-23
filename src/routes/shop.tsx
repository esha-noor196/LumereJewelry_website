import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PageShell, PageHeader } from "@/components/PageShell";
import { ProductCard } from "@/components/ProductCard";
import { products, categories, collections } from "@/lib/products";

export const Route = createFileRoute("/shop")({
  component: Shop,
  head: () => ({
    meta: [
      { title: "Shop Fine Jewelry — Lumière" },
      {
        name: "description",
        content:
          "Shop Lumière fine jewelry — rings, necklaces, earrings and bracelets in 18k gold, diamonds and pearls.",
      },
    ],
  }),
});

const filters = [
  { key: "all", label: "All" },
  ...categories.map((c) => ({ key: c.key as string, label: c.label })),
  { key: "sale", label: "Sale" },
  { key: "new", label: "New" },
];

function Shop() {
  const [filter, setFilter] = useState<string>("all");
  const [sort, setSort] = useState("featured");
  const [collection, setCollection] = useState<string>("all");
  const [query, setQuery] = useState("");

  const list = useMemo(() => {
    let l = products;
    if (filter === "sale") l = l.filter((p) => p.onSale);
    else if (filter === "new") l = l.filter((p) => p.isNew);
    else if (filter !== "all") l = l.filter((p) => p.category === filter);
    if (collection !== "all") l = l.filter((p) => p.collection === collection);
    if (query.trim()) {
      const q = query.toLowerCase();
      l = l.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q) ||
          p.collection.toLowerCase().includes(q),
      );
    }
    if (sort === "price-asc") l = [...l].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") l = [...l].sort((a, b) => b.price - a.price);
    return l;
  }, [filter, sort, collection, query]);

  return (
    <PageShell>
      <PageHeader
        eyebrow="The Boutique"
        title="Shop Fine Jewelry"
        subtitle="Every Lumière piece is designed in Paris, cast in 18k gold, and hand-set in our Antwerp atelier."
      />

      <div className="container-luxe">
        <div className="flex flex-wrap items-center justify-between gap-6 mb-8 pb-6 border-b border-border">
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-[0.72rem] tracking-[0.28em] uppercase">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`gold-underline pb-1 transition-colors ${filter === f.key ? "text-foreground font-medium" : "text-muted-foreground"}`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-6 text-[0.72rem] tracking-[0.28em] uppercase">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Collection</span>
              <select
                value={collection}
                onChange={(e) => setCollection(e.target.value)}
                className="bg-transparent border-b border-border pb-1 outline-none focus:border-[var(--color-gold)] cursor-pointer"
              >
                <option value="all">All</option>
                {collections.map((c) => (
                  <option key={c.slug} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Sort</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-transparent border-b border-border pb-1 outline-none focus:border-[var(--color-gold)] cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mb-12 flex items-center gap-3 max-w-md border-b border-border pb-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search rings, diamonds, pearls…"
            className="flex-1 bg-transparent outline-none text-sm"
          />
        </div>

        {list.length === 0 ? (
          <p className="text-center text-muted-foreground py-24">No pieces match this selection.</p>
        ) : (
          <div className="grid gap-x-6 gap-y-16 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-16">
            {list.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
}
