import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Search, Sparkles } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { newsArticles } from "@/lib/demo/data";
import hero from "@/assets/hero-clinic.jpg";
import habits from "@/assets/article-daily-habits.jpg";
import team from "@/assets/article-dental-team.jpg";
import child from "@/assets/article-child-checkup.jpg";
import room from "@/assets/gallery-room.jpg";
import campaign from "@/assets/campaign-smiles.jpg";

export const Route = createFileRoute("/blog")({
  head: () => ({ meta: [
    { title: "Dental Health Blog — BrightSmile Kerugoya" },
    { name: "description", content: "Oral health tips, clinic news and community stories from BrightSmile Dental Care Centre." },
    { property: "og:title", content: "BrightSmile Dental Health Blog" },
    { property: "og:description", content: "Practical oral health advice and clinic updates from our dentists." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }), component: BlogPage,
});

const posts = [...newsArticles,
  { id:"NEWS-4", tag:"HEALTH TIPS", title:"Is Teeth Whitening Safe?", date:"Aug 28, 2025", excerpt:"What professional whitening does to enamel, and how to keep your brighter results for longer." },
  { id:"NEWS-5", tag:"ORTHODONTICS", title:"Braces or Aligners: Choosing Well", date:"Aug 14, 2025", excerpt:"Our orthodontist explains when clear aligners work and when fixed braces remain the better choice." },
  { id:"NEWS-6", tag:"CHILDREN", title:"Your Child’s First Dental Visit", date:"Jul 30, 2025", excerpt:"How to prepare a child for a first check-up and make the clinic feel friendly and reassuring." },
];
const images = [habits, team, child, hero, room, campaign];

function BlogPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("ALL");
  const categories = ["ALL", ...new Set(posts.map((post) => post.tag))];
  const filtered = useMemo(() => posts.filter((post) => (category === "ALL" || post.tag === category) && `${post.title} ${post.excerpt}`.toLowerCase().includes(query.toLowerCase())), [query, category]);
  return <SiteLayout><main>
    <section className="relative isolate min-h-[330px] overflow-hidden px-4 py-14 sm:px-6"><img src={hero} alt="BrightSmile dentist and patient" width={1600} height={1104} className="absolute inset-0 -z-20 size-full object-cover"/><div className="absolute inset-0 -z-10 bg-navy-deep/75"/><div className="mx-auto max-w-7xl text-primary-foreground"><p className="text-xs font-bold tracking-widest uppercase">Latest News &amp; Updates</p><h1 className="mt-3 max-w-xl text-4xl font-bold text-primary-foreground">Healthier smiles begin with better information.</h1><p className="mt-4 max-w-xl text-sm text-primary-foreground/80">Expert guidance, clinic updates, and community stories from the BrightSmile team.</p></div></section>
    <section className="px-4 py-10 sm:px-6"><div className="mx-auto max-w-7xl">
      <div className="flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-center"><div><p className="text-xs font-bold tracking-wider text-brand uppercase">BrightSmile Journal</p><h2 className="text-2xl font-bold text-heading">Latest Articles</h2></div><div className="relative md:ml-auto md:w-72"><Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"/><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search articles..." className="pl-9"/></div></div>
      <div className="flex gap-2 overflow-x-auto py-5">{categories.map((item) => <Button key={item} size="sm" variant={category === item ? "default" : "outline"} onClick={() => setCategory(item)}>{item === "ALL" ? "All Articles" : item}</Button>)}</div>
      {filtered.length ? <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{filtered.map((post) => { const index=posts.findIndex((item)=>item.id===post.id); return <article key={post.id} className="group overflow-hidden rounded-lg border border-border bg-card shadow-card"><img src={images[index]} alt="" loading="lazy" width={1200} height={800} className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"/><div className="p-5"><span className="rounded-sm bg-brand-soft px-2 py-1 text-[10px] font-bold text-brand">{post.tag}</span><h2 className="mt-3 text-lg font-bold text-heading">{post.title}</h2><p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground"><CalendarDays className="size-3.5"/>{post.date}</p><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p><Button asChild variant="link" className="mt-3 h-auto p-0"><Link to="/contact">Read Article <ArrowRight className="size-4"/></Link></Button></div></article>;})}</div> : <div className="py-20 text-center"><Sparkles className="mx-auto size-8 text-brand"/><p className="mt-3 text-sm text-muted-foreground">No articles match your search.</p></div>}
    </div></section>
  </main></SiteLayout>;
}