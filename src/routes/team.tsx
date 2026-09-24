import { createFileRoute, Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { PageHero, Section, SiteLayout } from "@/components/site/SiteLayout";
import { dentists } from "@/lib/demo/data";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Our Dentists — BrightSmile Dental Care Centre" },
      {
        name: "description",
        content:
          "Meet the BrightSmile dental team in Kerugoya: general dentists, an orthodontist, a cosmetic dentist and an oral surgeon.",
      },
      { property: "og:title", content: "Meet the BrightSmile dental team" },
      { property: "og:description", content: "Five experienced dentists caring for Kirinyaga families." },
    ],
  }),
  component: TeamPage,
});

function TeamPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Our Team"
        title="Meet the dentists behind your smile"
        intro="Our clinicians bring together general, cosmetic, orthodontic, restorative and surgical expertise."
      />

      <Section title="Our Dentists">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dentists.map((dentist) => (
            <div key={dentist.id} className="rounded-xl border border-border bg-card p-6 text-center shadow-card">
              <span
                className={`mx-auto flex size-16 items-center justify-center rounded-full text-lg font-bold ${dentist.avatarTone}`}
              >
                {dentist.initials}
              </span>
              <h3 className="mt-4 font-semibold text-heading">{dentist.name}</h3>
              <p className="text-xs text-muted-foreground">{dentist.specialty}</p>
              <p className="mt-2 text-xs text-muted-foreground">{dentist.experienceYears} years experience</p>
              <p className="mt-2 flex items-center justify-center gap-1 text-sm font-semibold text-heading">
                <Star className="size-4 fill-warning text-warning" /> {dentist.rating}
                <span className="text-xs font-normal text-muted-foreground">({dentist.reviews})</span>
              </p>
              <div className="mt-3 flex justify-center">
                <StatusBadge status={dentist.status} />
              </div>
              <Button asChild size="sm" className="mt-4 w-full">
                <Link to="/booking">Book with {dentist.name.split(" ")[1]}</Link>
              </Button>
            </div>
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}
