import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PageHero, Section, SiteLayout } from "@/components/site/SiteLayout";
import { clinicEvents } from "@/lib/demo/data";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Upcoming Dental Events & Free Camps — BrightSmile" },
      {
        name: "description",
        content:
          "Oral health talks, children's check-up days, orthodontic consultation days and free dental camps in Kirinyaga County.",
      },
      { property: "og:title", content: "Upcoming BrightSmile Events" },
      { property: "og:description", content: "Free camps, talks and clinic days open to the community." },
    ],
  }),
  component: EventsPage,
});

function EventsPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Events"
        title="Come and see us in the community"
        intro="Our team runs free camps, awareness talks and dedicated clinic days throughout the year."
      />

      <Section title="Upcoming Events">
        <div className="grid gap-6 md:grid-cols-2">
          {clinicEvents.map((event) => (
            <div key={event.id} className="rounded-xl border border-border bg-card p-6 shadow-card">
              <div className="flex gap-4">
                <div className="flex size-16 shrink-0 flex-col items-center justify-center rounded-lg bg-navy text-white">
                  <span className="text-[10px] font-semibold tracking-wide">{event.monthLabel}</span>
                  <span className="text-xl leading-none font-bold">{event.day}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="font-display text-lg font-bold text-heading">{event.title}</h2>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="size-3.5" /> {event.timeRange}
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="size-3.5" /> {event.location}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-brand">{event.fee}</p>
                </div>
              </div>

              <div className="mt-5">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Users className="size-3.5" /> {event.registrations} registered
                  </span>
                  <span>{event.capacity} places</span>
                </div>
                <Progress value={(event.registrations / event.capacity) * 100} className="mt-2 h-2" />
              </div>

              <Button asChild className="mt-5 w-full">
                <Link to="/contact">Reserve a place</Link>
              </Button>
            </div>
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}
