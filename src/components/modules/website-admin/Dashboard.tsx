import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  BarChart3,
  BellRing,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Edit3,
  FileCheck2,
  FileText,
  Image,
  Mail,
  Megaphone,
  Newspaper,
  Save,
  Send,
  Settings2,
  Upload,
  Users,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { TrendLineChart } from "@/components/dashboards/charts";
import { campaigns, clinicEvents, contentOverview } from "@/lib/demo/data";
import campaignImage from "@/assets/campaign-smiles.jpg";
import teamImage from "@/assets/article-dental-team.jpg";
import childImage from "@/assets/article-child-checkup.jpg";

const stats = [
  { label: "Published Articles", value: "24", growth: "12%", icon: Newspaper, tone: "bg-brand-soft text-brand" },
  { label: "Active Campaigns", value: "4", growth: "33%", icon: Megaphone, tone: "bg-violet-soft text-violet" },
  { label: "Upcoming Events", value: "8", growth: "14%", icon: CalendarDays, tone: "bg-success-soft text-success" },
  { label: "Gallery Photos", value: "186", growth: "22%", icon: Image, tone: "bg-info-soft text-info" },
  { label: "Unread Messages", value: "12", growth: "71%", icon: Mail, tone: "bg-violet-soft text-violet" },
  { label: "Newsletter Subscribers", value: "1,284", growth: "18%", icon: Users, tone: "bg-teal-soft text-teal" },
];

const controls = ["Show Blog", "Show Events", "Show Gallery", "Show Campaign Banner", "Online Appointment Button", "Contact Form", "Newsletter Signup", "Social Links"];
const sections = ["Hero Banner", "Latest News", "Campaigns", "Upcoming Events", "Photo Gallery", "Contact Panel", "Footer"];

const quickActions = [
  { label: "New Article", module: "news", icon: FileText, tone: "bg-primary" },
  { label: "New Campaign", module: "campaigns", icon: Megaphone, tone: "bg-teal" },
  { label: "New Event", module: "events", icon: CalendarDays, tone: "bg-violet" },
  { label: "Upload Photos", module: "gallery", icon: Upload, tone: "bg-info" },
  { label: "View Messages", module: "messages", icon: Mail, tone: "bg-brand" },
  { label: "Edit Homepage", module: "pages", icon: Edit3, tone: "bg-success" },
] as const;

export function WebsiteAdminDashboard() {
  const [siteControls, setSiteControls] = useState<Record<string, boolean>>(() => Object.fromEntries(controls.map((item) => [item, true])));
  const [homepageSections, setHomepageSections] = useState<Record<string, boolean>>(() => Object.fromEntries(sections.map((item) => [item, true])));

  const toggle = (setter: React.Dispatch<React.SetStateAction<Record<string, boolean>>>, key: string) => {
    setter((current) => ({ ...current, [key]: !current[key] }));
  };

  return (
    <div className="space-y-3 pb-20">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-heading">Good morning, Admin! <span aria-hidden="true">👋</span></h1>
          <p className="text-xs text-brand">Here&apos;s what&apos;s happening with your BrightSmile Dental Care Centre website.</p>
        </div>
        <Button variant="outline" className="h-10 bg-card"><CalendarDays className="size-4" /> Sat, Sep 20, 2025</Button>
      </div>

      <div className="grid gap-3 xl:grid-cols-[minmax(0,3fr)_310px]">
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2.5 md:grid-cols-3 xl:grid-cols-6">
            {stats.map((item) => (
              <div key={item.label} className="min-h-28 rounded-lg border border-border bg-card p-3 shadow-card">
                <div className="flex items-start gap-2.5">
                  <span className={`flex size-10 shrink-0 items-center justify-center rounded-full ${item.tone}`}><item.icon className="size-5" /></span>
                  <div className="min-w-0">
                    <p className="text-[11px] leading-tight font-semibold text-heading">{item.label}</p>
                    <p className="mt-2 text-xl font-bold text-heading">{item.value}</p>
                    <p className="mt-1 text-[10px] font-semibold text-success">↑ {item.growth}</p>
                    <p className="text-[9px] text-muted-foreground">vs. last month</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-3 lg:grid-cols-[1.25fr_1fr]">
            <AdminPanel title="Content Overview" icon={BarChart3} action={<ChartLegend />}>
              <TrendLineChart data={contentOverview} height={186} series={[
                { key: "articles", label: "Articles", color: "var(--chart-1)" },
                { key: "events", label: "Events", color: "var(--chart-6)" },
                { key: "campaigns", label: "Campaigns", color: "var(--chart-3)" },
              ]} />
            </AdminPanel>
            <AdminPanel title="Recent Activity" icon={Clock3} action={<SmallLink to="activity" label="View All" />}>
              <div className="divide-y divide-border">
                {[
                  ["2 min ago", "Published: 5 Daily Habits for...", "Admin"],
                  ["18 min ago", "Updated: Healthy Smiles for All...", "Admin"],
                  ["1 hour ago", "Added: Children’s Dental Check-up Day", "Admin"],
                  ["3 hours ago", "Uploaded 12 gallery images", "Admin"],
                  ["5 hours ago", "New message from Mary Wanjiku", "Admin"],
                ].map(([time, activity, by], index) => (
                  <div key={activity} className="grid grid-cols-[70px_1fr_40px] items-center gap-2 py-2 text-[10px]">
                    <span className="text-muted-foreground">{time}</span>
                    <span className="truncate font-medium text-heading"><span className={`mr-2 inline-block size-2 rounded-full ${index % 2 ? "bg-violet" : "bg-brand"}`} />{activity}</span>
                    <span className="text-right text-muted-foreground">{by}</span>
                  </div>
                ))}
              </div>
            </AdminPanel>
          </div>

          <div className="grid gap-3 lg:grid-cols-[1.1fr_1fr]">
            <AdminPanel title="Quick Content Actions" icon={Zap}>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {quickActions.map((action) => (
                  <Button key={action.label} asChild className={`h-14 flex-col gap-1 ${action.tone}`}>
                    <Link to="/workspace/$role/$module" params={{ role: "website", module: action.module }}>
                      <action.icon className="size-4" /> <span className="text-[11px]">+ {action.label}</span>
                    </Link>
                  </Button>
                ))}
              </div>
            </AdminPanel>
            <AdminPanel title="Content Approval / Drafts" icon={FileCheck2} action={<SmallLink to="news" label="View All" />}>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {[["Draft Articles", "3"], ["Draft Campaigns", "1"], ["Draft Events", "2"], ["Pending Approval", "5"]].map(([label, value]) => (
                  <Link key={label} to="/workspace/$role/$module" params={{ role: "website", module: "news" }} className="rounded-md border border-border p-3 hover:border-brand">
                    <p className="text-[10px] font-medium text-brand">{label}</p><p className="mt-3 text-xl font-bold text-heading">{value}</p><p className="mt-2 text-[9px] text-brand">View →</p>
                  </Link>
                ))}
              </div>
            </AdminPanel>
          </div>

          <div className="grid gap-3 lg:grid-cols-[1.05fr_1.4fr]">
            <AdminPanel title="Upcoming Events" icon={CalendarDays} action={<SmallLink to="events" label="View All" />}>
              <div className="overflow-x-auto"><table className="w-full min-w-96 text-[10px]"><thead><tr className="border-b text-left text-muted-foreground"><th className="pb-2">Event Name</th><th>Date</th><th>Registrations</th><th>Status</th></tr></thead><tbody>{clinicEvents.map((event) => <tr key={event.id} className="border-b border-border last:border-0"><td className="py-2 font-medium text-heading">{event.title}</td><td>{event.date}</td><td>{event.registrations} / {event.capacity}</td><td><span className="rounded-full bg-success-soft px-2 py-1 text-success">Upcoming</span></td></tr>)}</tbody></table></div>
            </AdminPanel>
            <AdminPanel title="Active Campaigns" icon={Megaphone} action={<SmallLink to="campaigns" label="View All" />}>
              <div className="grid gap-2 sm:grid-cols-3">
                {campaigns.map((campaign, index) => {
                  const images = [campaignImage, teamImage, childImage];
                  return <article key={campaign.id} className="overflow-hidden rounded-md border border-border"><img src={images[index]} alt="" loading="lazy" width={1200} height={800} className="h-20 w-full object-cover" /><div className="p-2"><p className="truncate text-[10px] font-semibold text-heading">{campaign.title}</p><p className="mt-1 text-[9px] text-muted-foreground">{campaign.period}</p><span className="mt-2 inline-flex rounded-full bg-success-soft px-2 py-0.5 text-[9px] text-success">{campaign.state}</span><Button size="sm" variant="outline" className="mt-2 h-6 w-full text-[9px]" onClick={() => toast.success(`${campaign.title} opened for editing`)}>Edit</Button></div></article>;
                })}
              </div>
            </AdminPanel>
          </div>
        </div>

        <aside className="space-y-3">
          <AdminPanel title="Website Controls" icon={Settings2}>
            <div className="space-y-2.5">{controls.map((label) => <ToggleRow key={label} label={label} value={Boolean(siteControls[label])} onChange={() => toggle(setSiteControls, label)} />)}</div>
          </AdminPanel>
          <AdminPanel title="Homepage Sections" icon={Settings2} action={<span className="text-[9px] text-brand">Drag to reorder</span>}>
            <div className="space-y-2">{sections.map((label) => <div key={label} className="flex items-center gap-2"><span className="min-w-0 flex-1 truncate text-[10px] font-medium text-heading">{label}</span><Switch aria-label={`Show ${label}`} checked={Boolean(homepageSections[label])} onCheckedChange={() => toggle(setHomepageSections, label)} className="scale-75"/><Button variant="outline" size="sm" className="h-5 px-2 text-[9px]" onClick={() => toast.success(`${label} opened for editing`)}>Edit</Button></div>)}</div>
          </AdminPanel>
          <AdminPanel title="Live Website Preview" icon={Image} action={<Button asChild variant="link" size="sm" className="h-auto p-0 text-[9px]"><Link to="/">View Full Site →</Link></Button>}>
            <div className="h-52 overflow-hidden rounded-md border border-border bg-secondary">
              <iframe title="BrightSmile live website preview" src="/" className="h-[780px] w-[1280px] origin-top-left scale-[0.205] border-0" />
            </div>
          </AdminPanel>
        </aside>
      </div>

      <div className="fixed right-0 bottom-0 left-0 z-20 flex items-center justify-end gap-3 border-t border-border bg-card/95 px-5 py-3 shadow-panel backdrop-blur lg:left-52">
        <span className="mr-auto hidden items-center gap-2 text-[10px] text-muted-foreground sm:flex"><Clock3 className="size-4 text-brand" /> Last published 2 minutes ago</span>
        <Button variant="outline" onClick={() => toast.success("Website changes saved")}><Save className="size-4" /> Save Changes</Button>
        <Button onClick={() => toast.success("BrightSmile website published successfully")}><Send className="size-4" /> Publish Website</Button>
      </div>
    </div>
  );
}

function AdminPanel({ title, icon: Icon, action, children }: { title: string; icon: typeof BellRing; action?: React.ReactNode; children: React.ReactNode }) {
  return <section className="rounded-lg border border-border bg-card shadow-card"><header className="flex h-10 items-center gap-2 border-b border-border px-3"><Icon className="size-4 text-brand" /><h2 className="text-xs font-bold text-heading">{title}</h2><div className="ml-auto">{action}</div></header><div className="p-3">{children}</div></section>;
}

function SmallLink({ to, label }: { to: string; label: string }) {
  return <Button asChild variant="link" size="sm" className="h-auto p-0 text-[9px]"><Link to="/workspace/$role/$module" params={{ role: "website", module: to }}>{label} →</Link></Button>;
}

function ToggleRow({ label, value, onChange }: { label: string; value: boolean; onChange: () => void }) {
  return <div className="flex items-center gap-2"><CheckCircle2 className="size-3.5 text-brand" /><span className="flex-1 text-[10px] font-medium text-heading">{label}</span><Switch aria-label={label} checked={value} onCheckedChange={onChange} className="scale-75"/><span className="w-4 text-[9px] text-success">{value ? "On" : "Off"}</span></div>;
}

function ChartLegend() {
  return <div className="flex gap-2 text-[9px] text-muted-foreground"><span>● Articles</span><span className="text-teal">● Events</span><span className="text-violet">● Campaigns</span></div>;
}