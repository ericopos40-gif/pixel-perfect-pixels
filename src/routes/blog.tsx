import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, SiteLayout } from "@/components/site/SiteLayout";
import { newsArticles } from "@/lib/demo/data";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Dental Health Blog — BrightSmile Kerugoya" },
      {
        name: "description",
        content: "Oral health tips, clinic news and community stories from the BrightSmile Dental Care Centre team.",
      },
      { property: "og:title", content: "BrightSmile Dental Health Blog" },
      { property: "og:description", content: "Practical oral health advice and clinic updates from our dentists." },
    ],
  }),
  component: BlogPage,
});

const MORE = [
  {
    id: "NEWS-4",
    tag: "HEALTH TIPS",
    title: "Is Teeth Whitening Safe?",
    date: "Aug 28, 2025",
    excerpt: "What professional whitening actually does to your enamel, and how to keep results for longer.",
  },
  {
    id: "NEWS-5",
    tag: "ORTHODONTICS",
    title: "Braces or Aligners: Choosing Well",
    date: "Aug 14, 2025",
    excerpt: "Our orthodontist explains when clear aligners work and when fixed braces remain the better choice.",
  },
  {
    id: "NEWS-6",
    tag: "CHILDREN",
    title: "Your Child's First Dental Visit",
    date: "Jul 30, 2025",
    excerpt: "How to prepare a toddler for a first check-up and make the clinic feel friendly rather than frightening.",
  },
];

function BlogPage() {
  const posts = [...newsArticles, ...MORE];

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Blog"
        title="Advice from our dental team"
        intro="Practical guidance on keeping your family's teeth healthy, plus news from the clinic."
      />

      <Section title="Latest Articles">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.id} className="flex flex-col rounded-xl border border-border bg-card p-5 shadow-card">
              <span className="text-[11px] font-bold tracking-wider text-brand uppercase">{post.tag}</span>
              <h2 className="mt-2 font-display text-lg font-bold text-heading">{post.title}</h2>
              <p className="mt-1 text-xs text-muted-foreground">{post.date}</p>
              <p className="mt-3 flex-1 text-sm text-muted-foreground">{post.excerpt}</p>
            </article>
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}
