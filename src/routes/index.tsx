import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Quote, Star } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";
import heroImg from "@/assets/jewelry-hero.jpg";
import catRings from "@/assets/cat-rings.jpg";
import catNecklaces from "@/assets/cat-necklaces.jpg";
import catEarrings from "@/assets/cat-earrings.jpg";
import catBracelets from "@/assets/cat-bracelets.jpg";
import storyImg from "@/assets/j-story.jpg";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Lumière Jewelry — Fine Jewelry, Made to Last" },
      {
        name: "description",
        content:
          "Discover Lumière — fine rings, necklaces, earrings and bracelets in 18k gold and ethically-sourced diamonds. Complimentary shipping over €200.",
      },
    ],
  }),
});

function Home() {
  const newArrivals = products.filter((p) => p.isNew);
  const bestSellers = products.filter((p) => p.isBestSeller);

  return (
    <PageShell transparentNav>
      {/* HERO */}
      <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden -mt-[calc(var(--nav-h,0px))]">
        <img
          src={heroImg}
          alt="Lumière fine jewelry editorial"
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover animate-fade-in-slow"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/55" />
        <div className="relative z-10 container-luxe h-full flex flex-col justify-end pb-24 md:pb-32 text-[var(--color-ivory)]">
          <div className="max-w-2xl animate-fade-up">
            <div className="text-[0.7rem] tracking-[0.4em] uppercase text-[var(--color-gold)]">
              The Autumn Edit
            </div>
            <h1 className="mt-6 font-serif text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.98]">
              Light, held in
              <br />
              <em className="italic text-[var(--color-champagne)]">gold.</em>
            </h1>
            <p className="mt-8 max-w-md text-white/85 leading-relaxed">
              Fine jewelry hand-crafted in our Paris and Antwerp ateliers. 18k gold,
              ethically-sourced diamonds, pieces made to be inherited.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/shop" className="btn-luxe-gold">
                Shop Collection <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/collections"
                className="btn-luxe-outline"
                style={{ color: "var(--color-ivory)", borderColor: "var(--color-ivory)" }}
              >
                Explore Collections
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="border-y border-border overflow-hidden py-5 bg-[var(--color-background)]">
        <div className="flex animate-marquee whitespace-nowrap gap-16 font-serif italic text-2xl md:text-3xl">
          {Array.from({ length: 2 }).map((_, j) => (
            <div key={j} className="flex items-center gap-16 pr-16">
              {[
                "18k Gold",
                "◆",
                "Ethical Diamonds",
                "◆",
                "Freshwater Pearls",
                "◆",
                "Hand-Set in Antwerp",
                "◆",
                "Designed in Paris",
                "◆",
                "Lifetime Care",
                "◆",
              ].map((w, i) => (
                <span key={i} className={i % 2 === 1 ? "text-[var(--color-gold)] not-italic" : ""}>
                  {w}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED CATEGORIES */}
      <section className="container-luxe pt-24 md:pt-32">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
          <div>
            <div className="eyebrow">Featured Collections</div>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl max-w-lg leading-[1.05]">
              Pieces that catch the light.
            </h2>
          </div>
          <Link to="/shop" className="gold-underline text-sm tracking-[0.2em] uppercase">
            Shop All →
          </Link>
        </div>
        <div className="grid gap-4 md:gap-6 grid-cols-2 lg:grid-cols-4">
          <CategoryCard image={catRings} title="Rings" tagline="Solitaires & bands" />
          <CategoryCard image={catNecklaces} title="Necklaces" tagline="Chains & pendants" />
          <CategoryCard image={catEarrings} title="Earrings" tagline="Hoops & drops" />
          <CategoryCard image={catBracelets} title="Bracelets" tagline="Fine chains & tennis" />
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="container-luxe pt-24 md:pt-32">
        <div className="flex items-end justify-between gap-6 mb-14">
          <div>
            <div className="eyebrow">Just Landed</div>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl">New Arrivals</h2>
          </div>
          <Link to="/shop" className="gold-underline text-sm tracking-[0.2em] uppercase hidden sm:inline">
            Shop All →
          </Link>
        </div>
        <div className="grid gap-x-6 gap-y-14 grid-cols-2 lg:grid-cols-4">
          {newArrivals.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="mt-24 md:mt-32">
        <div className="container-luxe grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <img
            src={storyImg}
            alt="Lumière atelier"
            width={1600}
            height={1100}
            loading="lazy"
            className="w-full aspect-[4/5] object-cover"
          />
          <div>
            <div className="eyebrow">The Maison</div>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl leading-[1.05]">
              A quiet obsession with light and gold.
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Lumière was founded in Paris in 2018 by two goldsmiths who believed fine
              jewelry had lost its intimacy. Every piece is designed by hand, cast in our
              atelier, and set with ethically-sourced stones.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We work in 18k recycled gold and only with diamond suppliers certified to the
              Responsible Jewellery Council. Fewer pieces, made better.
            </p>
            <Link to="/about" className="btn-luxe mt-10">
              Our Story <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="container-luxe pt-24 md:pt-32">
        <div className="flex items-end justify-between gap-6 mb-14">
          <div>
            <div className="eyebrow">The Icons</div>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl">Best Sellers</h2>
          </div>
        </div>
        <div className="grid gap-x-6 gap-y-14 grid-cols-2 lg:grid-cols-4">
          {bestSellers.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* PROMO BANNER */}
      <section className="mt-24 md:mt-32 bg-[var(--color-beige)]">
        <div className="container-luxe py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="eyebrow">Bridal Appointments</div>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl leading-[1.05]">
              A private moment for a lifetime piece.
            </h2>
            <p className="mt-6 text-muted-foreground max-w-md leading-relaxed">
              Book a complimentary consultation at our Paris salon, or virtually with a
              Lumière advisor. We'll guide you through stones, settings, and bespoke.
            </p>
            <Link to="/contact" className="btn-luxe mt-8">
              Book an Appointment
            </Link>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={catRings}
              alt="Bridal rings"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="container-luxe pt-24 md:pt-32">
        <div className="text-center mb-16">
          <div className="eyebrow">Client Voices</div>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl">Worn, loved, kept.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              quote:
                "My Aurora solitaire is the most exquisite thing I own. The craftsmanship is beyond anything I've seen.",
              name: "Camille R.",
              role: "Paris",
            },
            {
              quote:
                "The Lumière team designed my bespoke wedding band. Every step felt personal — never transactional.",
              name: "Elena V.",
              role: "Milan",
            },
            {
              quote:
                "I wear my Perla hoops every single day. Two years in and they still look like they did on day one.",
              name: "Sophie L.",
              role: "London",
            },
          ].map((t, i) => (
            <div key={i} className="bg-card p-10 border border-border">
              <Quote className="h-6 w-6 text-[var(--color-gold)]" />
              <p className="mt-6 font-serif text-xl leading-relaxed">"{t.quote}"</p>
              <div className="mt-8 flex items-center gap-1 text-[var(--color-gold)]">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <div className="mt-4 text-sm">
                <span className="font-medium">{t.name}</span>
                <span className="text-muted-foreground"> · {t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="container-luxe pt-24 md:pt-32">
        <div className="text-center mb-12">
          <div className="eyebrow">@lumiere.jewelry</div>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl">Styled by our clients.</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 md:gap-3">
          {products.slice(0, 8).map((p, i) => (
            <a
              key={i}
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="relative aspect-square overflow-hidden group"
            >
              <img
                src={p.image}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors grid place-items-center text-[var(--color-ivory)] opacity-0 group-hover:opacity-100">
                <ArrowUpRight className="h-5 w-5" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="container-luxe pt-24 md:pt-32">
        <div className="bg-card border border-border p-10 md:p-20 text-center">
          <div className="eyebrow">The Lumière Letter</div>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl max-w-2xl mx-auto leading-[1.05]">
            Private previews, delivered with care.
          </h2>
          <p className="mt-5 text-muted-foreground max-w-lg mx-auto">
            First looks at new collections, atelier stories, and a complimentary 10% welcome.
          </p>
          <form
            className="mt-10 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              required
              placeholder="Your email address"
              className="flex-1 border border-border bg-transparent px-5 py-4 text-sm tracking-wider outline-none focus:border-[var(--color-gold)] transition-colors"
            />
            <button type="submit" className="btn-luxe">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </PageShell>
  );
}

function CategoryCard({
  image,
  title,
  tagline,
}: {
  image: string;
  title: string;
  tagline: string;
}) {
  return (
    <Link to="/shop" className="group relative overflow-hidden block aspect-[4/5]">
      <img
        src={image}
        alt={title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end text-[var(--color-ivory)]">
        <div className="text-[0.6rem] tracking-[0.35em] uppercase text-[var(--color-gold)]">
          {tagline}
        </div>
        <div className="mt-2 flex items-center justify-between">
          <h3 className="font-serif text-2xl md:text-3xl">{title}</h3>
          <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
