import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Clock, GalleryHorizontal, Mail, MapPin, Megaphone, Phone, Sparkles, Stethoscope, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteLayout } from "@/components/site/SiteLayout";
import { campaigns, clinicEvents, newsArticles } from "@/lib/demo/data";
import heroImage from "@/assets/hero-clinic.jpg";
import campaignImage from "@/assets/campaign-smiles.jpg";
import galleryRoom from "@/assets/gallery-room.jpg";
import galleryTeam from "@/assets/gallery-team.jpg";
import articleHabits from "@/assets/article-daily-habits.jpg";
import articleTeam from "@/assets/article-dental-team.jpg";
import articleChild from "@/assets/article-child-checkup.jpg";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "BrightSmile Dental Care Centre — Healthier Smiles, Stronger Communities" },
    { name: "description", content: "Family dental care, clinic news, community campaigns and appointments in Kerugoya, Kirinyaga." },
    { property: "og:title", content: "BrightSmile Dental Care Centre — Kerugoya" },
    { property: "og:description", content: "Healthier smiles, stronger communities. Book your dental appointment in Kerugoya today." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: HomePage,
});

const articleImages = [articleHabits, articleTeam, articleChild];
const quickLinks = [
  ["Book Appointment", "/booking"], ["Our Services", "/services"], ["Meet Our Team", "/team"], ["Gallery", "/gallery"], ["FAQs", "/contact"],
] as const;

function HomePage() {
  return <SiteLayout>
    <main className="bg-card">
      <section className="grid min-h-[350px] bg-navy-deep lg:grid-cols-[1.55fr_1fr_0.95fr]">
        <div className="relative isolate flex min-h-[320px] items-center overflow-hidden px-7 py-10 sm:px-12">
          <img src={heroImage} alt="BrightSmile dentist caring for a patient" width={1600} height={1104} className="absolute inset-0 -z-20 size-full object-cover" />
          <div className="absolute inset-0 -z-10 bg-navy-deep/80" />
          <div className="max-w-lg text-primary-foreground">
            <p className="text-[11px] font-bold tracking-widest uppercase">Latest News &amp; Updates</p>
            <h1 className="mt-3 text-3xl leading-[1.02] font-bold text-primary-foreground sm:text-4xl">Healthier Smiles,<br/><span className="text-info">Stronger Communities</span></h1>
            <p className="mt-4 max-w-md text-xs leading-relaxed text-primary-foreground/80">Stay informed with the latest news, dental tips, community initiatives, and events from BrightSmile Dental Care Centre.</p>
            <Button asChild variant="secondary" size="sm" className="mt-5"><Link to="/blog">Explore Our Blog <ArrowRight className="size-3.5" /></Link></Button>
          </div>
        </div>
        <div className="hidden overflow-hidden lg:block"><img src={heroImage} alt="Dentist treating a smiling BrightSmile patient" width={1600} height={1104} className="size-full object-cover" /></div>
        <div className="relative min-h-72 overflow-hidden bg-brand-soft p-6">
          <img src={campaignImage} alt="BrightSmile community dental campaign" width={1200} height={800} className="absolute inset-0 size-full object-cover opacity-35" />
          <div className="relative max-w-[190px]"><span className="rounded-full border border-brand px-2 py-1 text-[9px] font-bold text-brand">CURRENT CAMPAIGN</span><h2 className="mt-5 text-2xl leading-none font-bold text-heading">Healthy Smiles<br/>for All</h2><p className="mt-4 text-xs text-heading">Get a free dental check-up and consultation this month.</p><Button asChild size="sm" className="mt-5"><Link to="/booking">Learn More <ArrowRight className="size-3" /></Link></Button></div>
          <span className="absolute right-6 bottom-7 flex size-20 flex-col items-center justify-center rounded-full border-4 border-primary-foreground bg-info text-center text-xs font-bold text-primary-foreground">FREE<br/><span className="text-[9px]">CHECK-UP</span></span>
        </div>
      </section>

      <div className="mx-auto grid max-w-[1500px] gap-5 px-4 py-5 xl:grid-cols-[1fr_1.15fr_250px]">
        <div className="space-y-5">
          <HomePanel title="Latest News" icon={NewspaperIcon} link="/blog" linkLabel="View All News">
            <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-3">{newsArticles.map((article, index) => <ArticleCard key={article.id} article={article} image={articleImages[index]} />)}</div>
          </HomePanel>
          <HomePanel title="Upcoming Events" icon={CalendarDays} link="/events" linkLabel="View All Events">
            <div className="grid gap-3 sm:grid-cols-3">{clinicEvents.slice(0,3).map((event, index) => <article key={event.id} className="overflow-hidden rounded-md border border-border"><div className="relative h-20"><img src={[galleryRoom, articleChild, articleHabits][index]} alt="" loading="lazy" width={1200} height={800} className="size-full object-cover"/><span className="absolute inset-y-0 left-0 flex w-14 flex-col items-center justify-center bg-brand text-primary-foreground"><b className="text-[10px]">{event.monthLabel}</b><b className="text-xl">{event.day}</b><span className="text-[9px]">{event.year}</span></span></div><div className="p-3"><h3 className="text-[11px] font-bold text-heading">{event.title}</h3><p className="mt-2 text-[9px] text-muted-foreground"><Clock className="mr-1 inline size-3" />{event.timeRange}</p><p className="mt-1 text-[9px] text-muted-foreground"><MapPin className="mr-1 inline size-3" />{event.location}</p><p className="mt-1 text-[9px] font-semibold text-brand">{event.fee}</p><Button asChild variant="outline" size="sm" className="mt-2 h-6 w-full text-[9px]"><Link to="/events">{index === 2 ? "Book Now" : "Register Now"} <ArrowRight className="size-3" /></Link></Button></div></article>)}</div>
          </HomePanel>
        </div>

        <div className="space-y-5">
          <HomePanel title="Campaigns" icon={Megaphone} link="/booking" linkLabel="View All Campaigns">
            <div className="relative min-h-52 overflow-hidden rounded-md bg-navy-deep"><img src={heroImage} alt="BrightSmile whitening campaign" loading="lazy" width={1600} height={1104} className="absolute right-0 top-0 h-full w-2/3 object-cover opacity-80"/><div className="absolute inset-0 bg-navy-deep/30"/><div className="relative max-w-[230px] p-6 text-primary-foreground"><h3 className="text-xl font-bold text-primary-foreground">BRIGHTER SMILES<br/>TOMORROW</h3><p className="mt-3 text-xs">{campaigns[0]?.blurb}</p><Button asChild variant="secondary" size="sm" className="mt-5"><Link to="/booking">Book Now <ArrowRight className="size-3" /></Link></Button></div><span className="absolute right-5 bottom-4 flex size-16 items-center justify-center rounded-full border-4 border-primary-foreground bg-brand text-center text-lg font-bold text-primary-foreground">20%<br/></span></div>
          </HomePanel>
          <HomePanel title="Photo Gallery" icon={GalleryHorizontal} link="/gallery" linkLabel="View All Gallery">
            <div className="grid grid-cols-3 gap-2">{[galleryRoom, heroImage, galleryTeam, articleHabits, articleChild, galleryRoom].map((image, i) => <img key={i} src={image} alt="BrightSmile clinic gallery" loading="lazy" width={1200} height={800} className="h-24 w-full rounded-md object-cover" />)}</div>
          </HomePanel>
        </div>

        <aside className="space-y-4">
          <SidePanel title="Quick Links" icon={Users}>{quickLinks.map(([label,to]) => <Button key={label} asChild variant="ghost" className="h-9 w-full justify-start text-xs"><Link to={to}>{label}<ArrowRight className="ml-auto size-3"/></Link></Button>)}</SidePanel>
          <SidePanel title="Get In Touch" icon={Phone}><div className="space-y-3 text-xs text-muted-foreground"><p><Phone className="mr-2 inline size-4 text-brand"/>+254 712 345 678</p><p><Mail className="mr-2 inline size-4 text-brand"/>info@brightsmile.co.ke</p><p><MapPin className="mr-2 inline size-4 text-brand"/>Kerugoya, Kirinyaga</p><p><Clock className="mr-2 inline size-4 text-brand"/>Mon - Fri: 8:00 AM – 5:00 PM<br/><span className="ml-6">Sat: 8:00 AM – 1:00 PM</span></p><Button asChild className="mt-2 w-full"><Link to="/contact">Send Us a Message <ArrowRight className="size-3"/></Link></Button></div></SidePanel>
        </aside>
      </div>
    </main>
  </SiteLayout>;
}

const NewspaperIcon = Sparkles;
function HomePanel({ title, icon: Icon, link, linkLabel, children }: { title:string; icon:typeof Sparkles; link:string; linkLabel:string; children:React.ReactNode }) { return <section><header className="mb-2 flex items-center gap-2"><Icon className="size-5 text-brand"/><h2 className="text-sm font-bold text-heading">{title}</h2><Button asChild variant="link" size="sm" className="ml-auto h-auto p-0 text-[9px]"><Link to={link}>{linkLabel} <ArrowRight className="size-3"/></Link></Button></header>{children}</section>; }
function SidePanel({ title, icon: Icon, children }: { title:string; icon:typeof Sparkles; children:React.ReactNode }) { return <section className="rounded-md border border-border bg-secondary/60 p-3"><h2 className="mb-2 flex items-center gap-2 text-sm font-bold text-heading"><Icon className="size-5 text-brand"/>{title}</h2>{children}</section>; }
function ArticleCard({ article, image }: { article:(typeof newsArticles)[number]; image:string }) { return <article className="overflow-hidden rounded-md border border-border bg-card"><div className="relative"><img src={image} alt="" loading="lazy" width={1200} height={800} className="h-24 w-full object-cover"/><span className="absolute bottom-2 left-2 rounded-sm bg-brand px-2 py-1 text-[8px] font-bold text-primary-foreground">{article.tag}</span></div><div className="p-3"><h3 className="text-[11px] leading-tight font-bold text-heading">{article.title}</h3><p className="mt-2 text-[9px] text-muted-foreground">{article.date}</p><p className="mt-2 line-clamp-3 text-[9px] leading-relaxed text-muted-foreground">{article.excerpt}</p><Button asChild variant="link" size="sm" className="mt-2 h-auto p-0 text-[9px]"><Link to="/blog">Read More <ArrowRight className="size-3"/></Link></Button></div></article>; }