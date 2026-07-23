import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { PageShell, PageHeader } from "@/components/PageShell";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Contact — Lumière Jewelry" },
      {
        name: "description",
        content:
          "Contact the Lumière client care team — private appointments, bespoke design, after-care and lifetime service.",
      },
    ],
  }),
});

function Contact() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Client Care"
        title="Get in touch."
        subtitle="Our client advisors are available Monday through Saturday, 10am – 7pm CET."
      />

      <section className="container-luxe grid lg:grid-cols-[1fr_1.4fr] gap-16">
        <div className="space-y-8">
          {[
            { icon: MapPin, t: "Paris Salon", d: "12 Place Vendôme\n75001 Paris, France" },
            { icon: Mail, t: "Email", d: "care@lumiere-jewelry.com" },
            { icon: Phone, t: "Phone", d: "+33 1 42 60 00 00" },
            { icon: MessageCircle, t: "Live Chat", d: "Available 10am – 7pm CET" },
          ].map((row, i) => (
            <div key={i} className="flex gap-5 items-start">
              <div className="h-12 w-12 grid place-items-center border border-border text-[var(--color-gold)] shrink-0">
                <row.icon className="h-4 w-4" />
              </div>
              <div>
                <div className="text-[0.7rem] tracking-[0.28em] uppercase text-muted-foreground">
                  {row.t}
                </div>
                <div className="mt-1 whitespace-pre-line">{row.d}</div>
              </div>
            </div>
          ))}

          <div className="pt-6">
            <div className="eyebrow">Business Hours</div>
            <ul className="mt-4 text-sm space-y-1.5">
              <li className="flex justify-between"><span>Monday – Friday</span><span className="text-muted-foreground">10am – 7pm</span></li>
              <li className="flex justify-between"><span>Saturday</span><span className="text-muted-foreground">11am – 6pm</span></li>
              <li className="flex justify-between"><span>Sunday</span><span className="text-muted-foreground">By appointment</span></li>
            </ul>
          </div>

          <div className="aspect-[4/3] overflow-hidden border border-border">
            <iframe
              title="Lumière Paris Salon map"
              className="w-full h-full grayscale"
              loading="lazy"
              src="https://www.openstreetmap.org/export/embed.html?bbox=2.3260%2C48.8664%2C2.3350%2C48.8700&layer=mapnik&marker=48.8682%2C2.3305"
            />
          </div>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="bg-card border border-border p-8 md:p-12">
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="First Name" />
            <Field label="Last Name" />
            <Field label="Email" type="email" className="sm:col-span-2" />
            <Field label="Subject" className="sm:col-span-2" />
            <div className="sm:col-span-2">
              <label className="text-[0.7rem] tracking-[0.28em] uppercase text-muted-foreground">
                Message
              </label>
              <textarea
                rows={6}
                className="mt-2 w-full bg-transparent border-b border-border py-3 outline-none focus:border-[var(--color-gold)] transition-colors resize-none"
              />
            </div>
          </div>
          <button type="submit" className="btn-luxe mt-10 w-full sm:w-auto">
            Send Message
          </button>
        </form>
      </section>
    </PageShell>
  );
}

function Field({
  label,
  type = "text",
  className = "",
}: {
  label: string;
  type?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="text-[0.7rem] tracking-[0.28em] uppercase text-muted-foreground">
        {label}
      </label>
      <input
        type={type}
        className="mt-2 w-full bg-transparent border-b border-border py-3 outline-none focus:border-[var(--color-gold)] transition-colors"
      />
    </div>
  );
}
