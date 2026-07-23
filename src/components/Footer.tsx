import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer
      className="mt-32"
      style={{ background: "var(--color-ink)", color: "var(--color-ivory)" }}
    >
      <div className="container-luxe py-20 md:py-28">
        <div className="grid gap-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="font-serif italic text-3xl tracking-[0.35em]">LUMIÈRE</div>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/70">
              Fine jewelry, hand-crafted between Paris and Antwerp. Precious metals, ethically-sourced stones, made to last a lifetime.
            </p>
            <div className="mt-8 flex gap-4">
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social"
                  className="h-10 w-10 grid place-items-center border border-white/20 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterCol
            title="Maison"
            links={[
              { to: "/about", label: "About Lumière" },
              { to: "/collections", label: "Collections" },
              { to: "/about", label: "Craftsmanship" },
              { to: "/about", label: "Sustainability" },
            ]}
          />
          <FooterCol
            title="Client Care"
            links={[
              { to: "/contact", label: "Contact" },
              { to: "/faq", label: "FAQ" },
              { to: "/faq", label: "Shipping & Returns" },
              { to: "/faq", label: "Ring Size Guide" },
            ]}
          />
          <FooterCol
            title="Account"
            links={[
              { to: "/account", label: "Sign In" },
              { to: "/wishlist", label: "Wishlist" },
              { to: "/cart", label: "Cart" },
              { to: "/checkout", label: "Checkout" },
            ]}
          />
        </div>

        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-white/50 tracking-[0.15em] uppercase">
          <div>© {new Date().getFullYear()} Lumière Jewelry · All rights reserved</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[var(--color-gold)]">Privacy</a>
            <a href="#" className="hover:text-[var(--color-gold)]">Terms</a>
            <a href="#" className="hover:text-[var(--color-gold)]">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { to: string; label: string }[];
}) {
  return (
    <div>
      <div className="text-[0.7rem] tracking-[0.3em] uppercase text-[var(--color-gold)] font-medium">
        {title}
      </div>
      <ul className="mt-6 space-y-3 text-sm text-white/75">
        {links.map((l, i) => (
          <li key={i}>
            <Link to={l.to} className="hover:text-[var(--color-gold)] transition-colors">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
