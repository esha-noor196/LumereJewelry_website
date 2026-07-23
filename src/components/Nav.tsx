import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Heart, Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { useStore } from "@/lib/store";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/collections", label: "Collections" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Nav({ transparent = false }: { transparent?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { cartCount, wishlist } = useStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = !transparent || scrolled;

  return (
    <>
      <div style={{ background: "var(--color-ink)", color: "var(--color-ivory)" }} className="text-[0.68rem] tracking-[0.3em] uppercase">
        <div className="container-luxe flex items-center justify-center py-2.5 text-center">
          Complimentary shipping worldwide over €200 · Signature velvet box
        </div>
      </div>
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          solid
            ? "glass border-b border-border"
            : "bg-transparent"
        }`}
        style={!solid ? { color: "var(--color-ivory)" } : undefined}
      >
        <div className="container-luxe grid grid-cols-[auto_1fr_auto] items-center gap-6 py-5 md:py-6">
          <button
            className="lg:hidden -ml-2 p-2"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <nav className="hidden lg:flex items-center gap-9 text-[0.72rem] tracking-[0.28em] uppercase font-medium">
            {links.slice(0, 3).map((l) => (
              <Link key={l.to} to={l.to} className="gold-underline">
                {l.label}
              </Link>
            ))}
          </nav>

          <Link
            to="/"
            className="justify-self-center font-serif text-2xl md:text-[1.7rem] tracking-[0.35em] leading-none italic"
          >
            LUMIÈRE
          </Link>

          <div className="flex items-center gap-1 md:gap-3 justify-self-end">
            <nav className="hidden lg:flex items-center gap-9 mr-6 text-[0.72rem] tracking-[0.28em] uppercase font-medium">
              {links.slice(3).map((l) => (
                <Link key={l.to} to={l.to} className="gold-underline">
                  {l.label}
                </Link>
              ))}
            </nav>
            <button aria-label="Search" className="p-2 hover:text-[var(--color-gold)] transition-colors">
              <Search className="h-[18px] w-[18px]" />
            </button>
            <Link to="/account" aria-label="Account" className="p-2 hover:text-[var(--color-gold)] transition-colors hidden sm:inline-flex">
              <User className="h-[18px] w-[18px]" />
            </Link>
            <Link to="/wishlist" aria-label="Wishlist" className="p-2 hover:text-[var(--color-gold)] transition-colors relative">
              <Heart className="h-[18px] w-[18px]" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 text-[10px] font-medium bg-[var(--color-gold)] text-[var(--color-ink)] rounded-full h-4 min-w-4 px-1 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link to="/cart" aria-label="Cart" className="p-2 hover:text-[var(--color-gold)] transition-colors relative">
              <ShoppingBag className="h-[18px] w-[18px]" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 text-[10px] font-medium bg-[var(--color-gold)] text-[var(--color-ink)] rounded-full h-4 min-w-4 px-1 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden animate-fade-in-slow">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-[85%] max-w-sm bg-background shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <span className="font-serif text-xl tracking-[0.3em] italic">LUMIÈRE</span>
              <button onClick={() => setOpen(false)} aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col p-6 gap-5 text-sm tracking-[0.25em] uppercase">
              {links.map((l) => (
                <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="py-1">
                  {l.label}
                </Link>
              ))}
              <div className="hairline my-3" />
              <Link to="/account" onClick={() => setOpen(false)} className="py-1">Account</Link>
              <Link to="/wishlist" onClick={() => setOpen(false)} className="py-1">Wishlist</Link>
              <Link to="/faq" onClick={() => setOpen(false)} className="py-1">FAQ</Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
