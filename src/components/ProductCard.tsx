import { Link } from "@tanstack/react-router";
import { Heart, Eye } from "lucide-react";
import type { Product } from "@/lib/products";
import { useStore } from "@/lib/store";

export function ProductCard({ product }: { product: Product }) {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const wished = wishlist.includes(product.id);

  return (
    <div className="group relative">
      <Link
        to="/product/$id"
        params={{ id: product.id }}
        className="block relative overflow-hidden bg-[var(--color-muted)] aspect-[3/4]"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={900}
          height={1200}
          className="absolute inset-0 h-full w-full object-cover transition-all duration-[900ms] ease-out group-hover:opacity-0 group-hover:scale-[1.03]"
        />
        <img
          src={product.hoverImage}
          alt=""
          aria-hidden
          loading="lazy"
          width={900}
          height={1200}
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-[900ms] ease-out group-hover:opacity-100 group-hover:scale-[1.03]"
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && (
            <span className="text-[0.6rem] tracking-[0.28em] uppercase bg-[var(--color-ivory)]/95 backdrop-blur px-3 py-1 text-[var(--color-ink)] font-medium">
              New
            </span>
          )}
          {product.onSale && (
            <span className="text-[0.6rem] tracking-[0.28em] uppercase bg-[var(--color-gold)] px-3 py-1 text-[var(--color-ink)] font-medium">
              Sale
            </span>
          )}
        </div>
      </Link>

      {/* Wishlist */}
      <button
        onClick={() => toggleWishlist(product.id)}
        aria-label="Add to wishlist"
        className="absolute top-4 right-4 h-9 w-9 grid place-items-center bg-[var(--color-ivory)]/85 backdrop-blur hover:bg-[var(--color-ivory)] transition-colors"
      >
        <Heart
          className={`h-[15px] w-[15px] transition ${wished ? "fill-[var(--color-gold)] text-[var(--color-gold)]" : "text-[var(--color-ink)]"}`}
        />
      </button>

      {/* Quick actions */}
      <div className="pointer-events-none absolute left-4 right-4 bottom-4 flex gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
        <button
          onClick={() =>
            addToCart(product.id, { size: product.sizes[0], color: product.colors[0] })
          }
          className="btn-luxe pointer-events-auto flex-1 !py-3 !text-[0.66rem]"
        >
          Add to Bag
        </button>
        <Link
          to="/product/$id"
          params={{ id: product.id }}
          className="pointer-events-auto h-[42px] w-[42px] grid place-items-center bg-[var(--color-ivory)] text-[var(--color-ink)] border border-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-ivory)] transition-colors"
          aria-label="Quick view"
        >
          <Eye className="h-4 w-4" />
        </Link>
      </div>

      <div className="pt-5 pb-2">
        <div className="text-[0.65rem] tracking-[0.28em] uppercase text-muted-foreground">
          {product.collection}
        </div>
        <Link
          to="/product/$id"
          params={{ id: product.id }}
          className="mt-2 block font-serif text-lg md:text-xl leading-snug"
        >
          {product.name}
        </Link>
        <div className="mt-2 flex items-baseline gap-3 text-sm">
          <span className="font-medium">€{product.price}</span>
          {product.originalPrice && (
            <span className="text-muted-foreground line-through text-[0.85em]">
              €{product.originalPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
