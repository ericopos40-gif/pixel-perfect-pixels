import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, SiteLayout } from "@/components/site/SiteLayout";
import heroImage from "@/assets/hero-clinic.jpg";
import campaignImage from "@/assets/campaign-smiles.jpg";
import galleryRoom from "@/assets/gallery-room.jpg";
import galleryTeam from "@/assets/gallery-team.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Photo Gallery — BrightSmile Dental Care Centre" },
      {
        name: "description",
        content: "Photos of our treatment rooms, dental team and community outreach days in Kerugoya, Kirinyaga.",
      },
      { property: "og:title", content: "Inside BrightSmile Dental Care Centre" },
      { property: "og:description", content: "Our clinic, our team and our community work in pictures." },
    ],
  }),
  component: GalleryPage,
});

const PHOTOS = [
  { src: heroImage, alt: "Dentist and patient in the treatment room", caption: "Patient care" },
  { src: galleryRoom, alt: "Modern dental treatment room", caption: "Treatment room" },
  { src: galleryTeam, alt: "The BrightSmile dental team", caption: "Our team" },
  { src: campaignImage, alt: "Community dental outreach day", caption: "Community outreach" },
];

function GalleryPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Gallery"
        title="Inside BrightSmile"
        intro="A glimpse of our clinic, our people and the communities we serve across Kirinyaga."
      />

      <Section title="Photos">
        <div className="grid gap-6 sm:grid-cols-2">
          {PHOTOS.map((photo) => (
            <figure key={photo.caption} className="overflow-hidden rounded-xl border border-border bg-card shadow-card">
              <img src={photo.src} alt={photo.alt} loading="lazy" className="h-64 w-full object-cover" />
              <figcaption className="px-5 py-3 text-sm font-medium text-heading">{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}
