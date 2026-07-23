import { createFileRoute } from "@tanstack/react-router";
import { Plus, Minus } from "lucide-react";
import { PageShell, PageHeader } from "@/components/PageShell";

export const Route = createFileRoute("/faq")({
  component: FAQ,
  head: () => ({
    meta: [
      { title: "FAQ — Lumière Jewelry" },
      { name: "description", content: "Answers to common questions about Lumière orders, shipping, sizing, materials and care." },
    ],
  }),
});

const groups = [
  {
    title: "Orders & Shipping",
    items: [
      { q: "How long does shipping take?", a: "Standard shipping arrives within 3–5 business days in Europe and 5–7 business days worldwide. Every piece is delivered in our signature velvet box." },
      { q: "Do you ship internationally?", a: "Yes — we ship to over 80 countries. Duties and taxes are calculated at checkout and paid upfront." },
      { q: "Is shipping insured?", a: "All Lumière orders are fully insured in transit and require signature on delivery." },
    ],
  },
  {
    title: "Sizing & Fit",
    items: [
      { q: "How do I find my ring size?", a: "Order our complimentary paper ring sizer from the product page, or visit our Paris salon for a precise measurement." },
      { q: "Can I resize a ring after purchase?", a: "Yes — complimentary resizing is included for the lifetime of the piece, within +/- 2 sizes of the original." },
    ],
  },
  {
    title: "Materials & Craftsmanship",
    items: [
      { q: "What metals do you use?", a: "Every Lumière piece is cast in 18k recycled gold — yellow, white, or rose. Vermeil pieces use a 14k gold layer over sterling silver." },
      { q: "Where do your diamonds come from?", a: "All diamonds are sourced from suppliers certified by the Responsible Jewellery Council (RJC) and are fully traceable to the mine of origin." },
      { q: "How should I care for my jewelry?", a: "Wipe pieces gently with the polishing cloth in your Lumière box. Avoid perfumes, chlorine, and lotions. We offer complimentary professional cleaning for life." },
    ],
  },
  {
    title: "Returns & Guarantee",
    items: [
      { q: "What is your return policy?", a: "We offer complimentary returns within 30 days of delivery for a full refund. Bespoke and engraved pieces are final sale." },
      { q: "Do you offer a warranty?", a: "Every Lumière piece is covered by a lifetime warranty against manufacturing defects, plus free polishing, resizing, and stone re-tightening." },
    ],
  },
];

function FAQ() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Support"
        title="Frequently Asked"
        subtitle="Everything you need to know about ordering, sizing, and caring for your Lumière piece."
      />
      <div className="container-luxe max-w-3xl">
        {groups.map((g) => (
          <section key={g.title} className="mb-16">
            <h2 className="font-serif text-2xl md:text-3xl mb-6">{g.title}</h2>
            <div className="divide-y divide-border border-y border-border">
              {g.items.map((item, i) => (
                <details key={i} className="group py-6">
                  <summary className="flex items-center justify-between gap-4 cursor-pointer list-none">
                    <span className="font-medium">{item.q}</span>
                    <Plus className="h-4 w-4 group-open:hidden shrink-0" />
                    <Minus className="h-4 w-4 hidden group-open:block shrink-0" />
                  </summary>
                  <p className="mt-4 text-muted-foreground leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>
    </PageShell>
  );
}
