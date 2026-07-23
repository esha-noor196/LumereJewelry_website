import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/PageShell";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/wishlist")({
  component: Wishlist,
  head: () => ({
    meta: [
      { title: "Wishlist — Lumière Jewelry" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function Wishlist() {
  const { wishlist } = useStore();
  const items = products.filter((p) => wishlist.includes(p.id));

  return (
    <PageShell>
      <PageHeader
        eyebrow="Saved for Later"
        title="Your Wishlist"
        subtitle={items.length === 0 ? "Pieces you love, gathered in one place." : undefined}
      />
      <div className="container-luxe pb-16">
        {items.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-8">Your wishlist is empty.</p>
            <Link to="/shop" className="btn-luxe">Discover the Collection</Link>
          </div>
        ) : (
          <div className="grid gap-x-6 gap-y-14 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
}
