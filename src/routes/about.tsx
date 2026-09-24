import { createFileRoute } from "@tanstack/react-router";
import { HeartHandshake, ShieldCheck, Sparkles, Users } from "lucide-react";
import { PageHero, Section, SiteLayout } from "@/components/site/SiteLayout";
import galleryTeam from "@/assets/gallery-team.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About BrightSmile Dental Care Centre — Kerugoya" },
      {
        name: "description",
        content:
          "Learn about BrightSmile Dental Care Centre in Kerugoya: our story, our values and the team caring for Kirinyaga families.",
      },
      { property: "og:title", content: "About BrightSmile Dental Care Centre" },
      { property: "og:description", content: "Our story, values and commitment to community dental health." },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  { icon: HeartHandshake, title: "Patient First", text: "Every visit starts with listening, explaining and agreeing a plan you are comfortable with." },
  { icon: ShieldCheck, title: "Safe & Sterile", text: "Strict infection-control protocols and single-use instruments on every procedure." },
  { icon: Sparkles, title: "Modern Dentistry", text: "Digital imaging, dental lasers and up-to-date restorative materials." },
  { icon: Users, title: "Community Rooted", text: "Free dental camps and school outreach across Kirinyaga County every quarter." },
];

function AboutPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="About Us"
        title="Caring for Kirinyaga smiles since 2016"
        intro="BrightSmile Dental Care Centre is a family dental practice in Kerugoya offering general, cosmetic, orthodontic and restorative care under one roof."
      />

      <Section title="Our Story">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <img
            src={galleryTeam}
            alt="The BrightSmile dental team at the clinic reception"
            loading="lazy"
            width={1008}
            height={752}
            className="w-full rounded-2xl border border-border"
          />
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>
              BrightSmile opened its doors in Kerugoya with a single treatment room and a simple promise: quality dental
              care should not require a trip to Nairobi.
            </p>
            <p>
              Today the clinic runs five treatment rooms, an in-house laboratory and a pharmacy, with a team of general
              dentists, an orthodontist, a cosmetic dentist and an oral surgeon serving more than 12,000 patients.
            </p>
            <p>
              We remain a community practice: our outreach programme has brought free check-ups and fluoride treatment to
              thousands of schoolchildren across the county.
            </p>
          </div>
        </div>
      </Section>

      <Section title="What We Stand For" tinted>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((value) => (
            <div key={value.title} className="rounded-xl border border-border bg-card p-6 shadow-card">
              <span className="flex size-11 items-center justify-center rounded-lg bg-brand-soft text-brand">
                <value.icon className="size-5" />
              </span>
              <h3 className="mt-4 font-semibold text-heading">{value.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{value.text}</p>
            </div>
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}
