import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageShell, PageHeader } from "@/components/PageShell";
import { collections, products } from "@/lib/products";
import ringsImg from "@/assets/cat-rings.jpg";
import necklacesImg from "@/assets/cat-necklaces.jpg";
import earringsImg from "@/assets/cat-earrings.jpg";
import braceletsImg from "@/assets/cat-bracelets.jpg";

const images: Record<string, string> = {
  bridal: ringsImg,
  "everyday-luxury": necklacesImg,
  "fine-jewelry": braceletsImg,
  "limited-edition": earringsImg,
};

export const Route = createFileRoute("/collections")({
  component: CollectionsPage,
  head: () => ({
    meta: [
      { title: "Collections — Lumière Jewelry" },
      {
        name: "description",
        content:
          "Explore Lumière's curated collections — Bridal, Everyday Luxury, Fine Jewelry, and Limited Edition.",
      },
    ],
  }),
});

function CollectionsPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Collections"
        title="Chapters in Gold"
        subtitle="Four focused collections, each with its own reason to exist."
      />
      <div className="container-luxe grid gap-16 md:gap-24 pb-16">
        {collections.map((c, i) => {
          const featured = products.filter((p) => p.collection === c.name);
          const reverse = i % 2 === 1;
          return (
            <article
              key={c.slug}
              className={`grid md:grid-cols-2 gap-8 md:gap-16 items-center ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}
            >
              <Link to="/shop" className="block relative aspect-[4/5] overflow-hidden group">
                <img
                  src={images[c.slug]}
                  alt={c.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                />
              </Link>
              <div>
                <div className="eyebrow">Chapter {String(i + 1).padStart(2, "0")}</div>
                <h2 className="mt-4 font-serif text-4xl md:text-5xl leading-[1.05]">{c.name}</h2>
                <p className="mt-6 text-muted-foreground leading-relaxed max-w-md">{c.tagline}</p>
                <div className="mt-4 text-xs text-muted-foreground tracking-[0.2em] uppercase">
                  {c.count} pieces · From €245
                </div>

                {featured.length > 0 && (
                  <div className="mt-8 grid grid-cols-3 gap-3">
                    {featured.slice(0, 3).map((p) => (
                      <Link
                        key={p.id}
                        to="/product/$id"
                        params={{ id: p.id }}
                        className="aspect-square overflow-hidden bg-[var(--color-muted)] group"
                      >
                        <img
                          src={p.image}
                          alt={p.name}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </Link>
                    ))}
                  </div>
                )}

                <Link to="/shop" className="btn-luxe mt-10">
                  Explore Chapter <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </PageShell>
  );
}
