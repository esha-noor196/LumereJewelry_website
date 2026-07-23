import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/PageShell";
import storyImg from "@/assets/j-story.jpg";
import craftImg from "@/assets/cat-rings.jpg";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About — Lumière Jewelry" },
      {
        name: "description",
        content:
          "The Lumière story: a Parisian maison crafting fine jewelry in 18k gold with ethically-sourced diamonds and pearls.",
      },
    ],
  }),
});

function About() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Our Story"
        title="A house of light and gold."
        subtitle="Founded in Paris in 2018 by two goldsmiths, Lumière was born of a belief that fine jewelry should be intimate — designed by hand, worn every day, kept forever."
      />

      <section className="container-luxe grid md:grid-cols-2 gap-16 items-center">
        <img src={storyImg} alt="Lumière atelier" loading="lazy" className="aspect-[4/5] object-cover w-full" />
        <div>
          <div className="eyebrow">The Maison</div>
          <h2 className="mt-4 font-serif text-3xl md:text-4xl leading-[1.15]">
            Designed in Paris, hand-set in Antwerp.
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Every Lumière piece begins as a hand drawing in our Paris studio, then travels to
            our Antwerp atelier where third-generation setters place each stone by hand.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            We work exclusively in 18k recycled gold and source diamonds only from suppliers
            certified by the Responsible Jewellery Council. Traceability is the baseline, not
            the marketing.
          </p>
        </div>
      </section>

      <section className="container-luxe pt-24 md:pt-32">
        <div className="grid md:grid-cols-3 gap-10 text-center">
          {[
            { n: "100%", t: "Recycled 18k Gold", d: "In every setting, chain, and band" },
            { n: "RJC", t: "Certified Diamonds", d: "Fully traceable, conflict-free" },
            { n: "∞", t: "Lifetime Care", d: "Free cleaning, polishing & resizing" },
          ].map((s, i) => (
            <div key={i} className="p-10 border border-border">
              <div className="font-serif text-6xl text-[var(--color-gold)]">{s.n}</div>
              <div className="mt-4 font-serif text-xl">{s.t}</div>
              <div className="mt-2 text-sm text-muted-foreground">{s.d}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-luxe pt-24 md:pt-32 grid md:grid-cols-2 gap-16 items-center">
        <div className="md:order-2">
          <img src={craftImg} alt="Craftsmanship" loading="lazy" className="aspect-[4/5] object-cover w-full" />
        </div>
        <div className="md:order-1">
          <div className="eyebrow">Craftsmanship</div>
          <h2 className="mt-4 font-serif text-3xl md:text-4xl leading-[1.15]">
            Twelve pairs of hands, one piece.
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            From wax carving to final polish, a single ring passes through the hands of a
            dozen artisans. Nothing is rushed. A solitaire takes an average of six weeks.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Because we make in small batches, every piece can be personalised — engraved,
            resized, or reset with a stone of your own.
          </p>
        </div>
      </section>

      <section className="container-luxe pt-24 md:pt-32 pb-8">
        <div className="text-center max-w-2xl mx-auto">
          <div className="eyebrow">Sustainability</div>
          <h2 className="mt-4 font-serif text-3xl md:text-4xl leading-[1.15]">
            Fewer things. Made better. Kept forever.
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Our packaging is 100% recyclable, every shipment is carbon-offset, and every
            Lumière piece comes with a lifetime care guarantee — including free polishing,
            resizing, and stone re-tightening for as long as you own it.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
