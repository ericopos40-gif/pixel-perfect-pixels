import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero, Section, SiteLayout } from "@/components/site/SiteLayout";
import { services } from "@/lib/demo/data";
import { ksh } from "@/lib/demo/format";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Dental Services & Prices — BrightSmile Kerugoya" },
      {
        name: "description",
        content:
          "Check-ups, cleaning, fillings, root canals, braces, whitening and oral surgery at BrightSmile Dental Care Centre, with clear prices in Kenyan shillings.",
      },
      { property: "og:title", content: "Dental Services & Prices — BrightSmile" },
      { property: "og:description", content: "Our full treatment list with transparent pricing in KSh." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const categories = Array.from(new Set(services.map((service) => service.category)));

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Services"
        title="Complete dental care, clearly priced"
        intro="From a routine check-up to full orthodontic treatment, every service is quoted upfront so there are no surprises."
      />

      {categories.map((category, index) => (
        <Section key={category} title={category} tinted={index % 2 === 1}>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services
              .filter((service) => service.category === category)
              .map((service) => (
                <div key={service.id} className="rounded-xl border border-border bg-card p-6 shadow-card">
                  <h3 className="font-semibold text-heading">{service.name}</h3>
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="size-3.5" /> About {service.durationMinutes} minutes
                  </p>
                  <p className="mt-4 text-xl font-bold text-brand">{ksh(service.price)}</p>
                  <Button asChild variant="outline" size="sm" className="mt-4">
                    <Link to="/booking">Book this service</Link>
                  </Button>
                </div>
              ))}
          </div>
        </Section>
      ))}
    </SiteLayout>
  );
}
