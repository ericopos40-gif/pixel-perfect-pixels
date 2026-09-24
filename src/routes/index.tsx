import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Clock, MapPin, ShieldCheck, Sparkles, Stethoscope, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteLayout, Section } from "@/components/site/SiteLayout";
import { campaigns, clinicEvents, newsArticles } from "@/lib/demo/data";
import heroImage from "@/assets/hero-clinic.jpg";
import campaignImage from "@/assets/campaign-smiles.jpg";
import galleryRoom from "@/assets/gallery-room.jpg";
import galleryTeam from "@/assets/gallery-team.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BrightSmile Dental Care Centre — Healthier Smiles, Stronger Communities" },
      {
        name: "description",
        content:
          "Family dental care in Kerugoya, Kirinyaga. Check-ups, cleaning, orthodontics, cosmetic and restorative treatment, plus free community dental camps.",
      },
      { property: "og:title", content: "BrightSmile Dental Care Centre — Kerugoya" },
      {
        property: "og:description",
        content: "Healthier smiles, stronger communities. Book your dental appointment in Kerugoya today.",
      },
    ],
  }),
  component: HomePage,
});

const TRUST = [
  { icon: Users, value: "12,000+", label: "Patients Served" },
  { icon: Stethoscope, value: "5", label: "Expert Doctors" },
  { icon: Sparkles, value: "Modern", label: "Equipment" },
  { icon: ShieldCheck, value: "24/7", label: "Emergency Care" },
];

function HomePage() {
  const featured = campaigns[1];

  return (
    <SiteLayout>
      <section className="brand-gradient px-4 py-16 sm:px-6">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
          <div className="text-white">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">
              <MapPin className="size-3.5" /> Kerugoya, Kirinyaga County
            </span>
            <h1 className="mt-5 font-display text-4xl leading-tight font-bold text-white sm:text-5xl">
              Healthier Smiles, Stronger Communities
            </h1>
            <p className="mt-4 max-w-xl text-white/80">
              BrightSmile Dental Care Centre combines modern dentistry with genuine community care — from routine
              check-ups to orthodontics, all under one roof.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="secondary">
                <Link to="/booking">Book Appointment</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                <Link to="/blog">Explore Our Blog</Link>
              </Button>
            </div>
          </div>
          <img
            src={heroImage}
            alt="Dentist treating a smiling patient at BrightSmile Dental Care Centre"
            width={1600}
            height={1104}
            className="w-full rounded-2xl shadow-panel"
          />
        </div>
      </section>

      <div className="border-b border-border bg-card px-4 py-8 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST.map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-lg bg-brand-soft text-brand">
                <item.icon className="size-5" />
              </span>
              <span>
                <span className="block text-lg font-bold text-heading">{item.value}</span>
                <span className="block text-xs text-muted-foreground">{item.label}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <Section title="Current Campaign" description="What our team is running for the community right now.">
        <div className="grid items-center gap-8 rounded-2xl border border-border bg-card p-6 shadow-card lg:grid-cols-2">
          <img
            src={campaignImage}
            alt="Family at a BrightSmile community dental outreach"
            loading="lazy"
            width={1200}
            height={800}
            className="w-full rounded-xl"
          />
          <div>
            <span className="inline-flex rounded-full bg-success-soft px-3 py-1 text-xs font-bold tracking-wide text-success uppercase">
              {featured.badge}
            </span>
            <h3 className="mt-4 font-display text-2xl font-bold text-heading">{featured.title}</h3>
            <p className="mt-3 text-sm text-muted-foreground">{featured.blurb}</p>
            <p className="mt-2 text-xs font-medium text-muted-foreground">{featured.period}</p>
            <Button asChild className="mt-6">
              <Link to="/booking">
                Claim your free check-up <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      <Section title="Latest News" description="Oral health tips, clinic updates and community stories." tinted>
        <div className="grid gap-6 md:grid-cols-3">
          {newsArticles.map((article) => (
            <article key={article.id} className="flex flex-col rounded-xl border border-border bg-card p-5 shadow-card">
              <span className="text-[11px] font-bold tracking-wider text-brand uppercase">{article.tag}</span>
              <h3 className="mt-2 font-display text-lg font-bold text-heading">{article.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{article.date}</p>
              <p className="mt-3 flex-1 text-sm text-muted-foreground">{article.excerpt}</p>
              <Link to="/blog" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                Read more <ArrowRight className="size-4" />
              </Link>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Campaigns" description="Ongoing offers and awareness drives at BrightSmile.">
        <div className="grid gap-6 md:grid-cols-3">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="rounded-xl border border-border bg-card p-6 shadow-card">
              <span className="inline-flex rounded-full bg-brand-soft px-3 py-1 text-[11px] font-bold tracking-wider text-brand uppercase">
                {campaign.badge}
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-heading">{campaign.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{campaign.blurb}</p>
              <p className="mt-3 text-xs text-muted-foreground">{campaign.period}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Upcoming Events" description="Join us at our clinic days, talks and free dental camps." tinted>
        <div className="grid gap-5 md:grid-cols-3">
          {clinicEvents.slice(0, 3).map((event) => (
            <div key={event.id} className="flex gap-4 rounded-xl border border-border bg-card p-5 shadow-card">
              <div className="flex size-16 shrink-0 flex-col items-center justify-center rounded-lg bg-navy text-white">
                <span className="text-[10px] font-semibold tracking-wide">{event.monthLabel}</span>
                <span className="text-xl leading-none font-bold">{event.day}</span>
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-heading">{event.title}</h3>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="size-3.5" /> {event.timeRange}
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="size-3.5" /> {event.location}
                </p>
                <p className="mt-2 text-xs font-semibold text-brand">{event.fee}</p>
              </div>
            </div>
          ))}
        </div>
        <Button asChild variant="outline" className="mt-6">
          <Link to="/events">
            <CalendarDays className="size-4" /> View all events
          </Link>
        </Button>
      </Section>

      <Section title="Photo Gallery" description="A look inside BrightSmile Dental Care Centre.">
        <div className="grid gap-5 sm:grid-cols-2">
          <img
            src={galleryRoom}
            alt="Modern dental treatment room"
            loading="lazy"
            width={1008}
            height={752}
            className="w-full rounded-xl border border-border"
          />
          <img
            src={galleryTeam}
            alt="The BrightSmile dental team"
            loading="lazy"
            width={1008}
            height={752}
            className="w-full rounded-xl border border-border"
          />
        </div>
        <Button asChild variant="outline" className="mt-6">
          <Link to="/gallery">Open full gallery</Link>
        </Button>
      </Section>
    </SiteLayout>
  );
}
