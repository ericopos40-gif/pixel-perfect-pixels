import { useLocation } from "@tanstack/react-router";
import { WebsiteAdminDashboard } from "./Dashboard";
import { News } from "./News";
import { PanelCard, EmptyState } from "@/components/shared/PanelCard";

export function WebsiteAdminRouter() {
  const location = useLocation();
  const moduleSlug = location.pathname.split("/").pop() || "";

  switch (moduleSlug) {
    case "website":
    case "":
      return <WebsiteAdminDashboard />;
    case "news":
      return <News />;
    case "campaigns":
      return <PanelCard title="Campaigns" subtitle="Marketing campaigns"><EmptyState message="Campaign management coming soon." /></PanelCard>;
    case "events":
      return <PanelCard title="Events" subtitle="Clinic events"><EmptyState message="Events management coming soon." /></PanelCard>;
    case "gallery":
      return <PanelCard title="Gallery" subtitle="Photo gallery"><EmptyState message="Gallery management coming soon." /></PanelCard>;
    case "pages":
      return <PanelCard title="Pages" subtitle="Website pages"><EmptyState message="Pages management coming soon." /></PanelCard>;
    case "services":
      return <PanelCard title="Services" subtitle="Service listings"><EmptyState message="Services management coming soon." /></PanelCard>;
    case "team":
      return <PanelCard title="Team" subtitle="Team profiles"><EmptyState message="Team management coming soon." /></PanelCard>;
    case "testimonials":
      return <PanelCard title="Testimonials" subtitle="Patient testimonials"><EmptyState message="Testimonials management coming soon." /></PanelCard>;
    case "messages":
      return <PanelCard title="Contact Messages" subtitle="Visitor messages"><EmptyState message="Contact messages coming soon." /></PanelCard>;
    case "newsletter":
      return <PanelCard title="Newsletter" subtitle="Newsletter management"><EmptyState message="Newsletter management coming soon." /></PanelCard>;
    case "media":
      return <PanelCard title="Media Library" subtitle="Media files"><EmptyState message="Media library coming soon." /></PanelCard>;
    case "seo":
      return <PanelCard title="SEO Settings" subtitle="SEO optimization"><EmptyState message="SEO settings coming soon." /></PanelCard>;
    case "settings":
      return <PanelCard title="Site Settings" subtitle="Website settings"><EmptyState message="Site settings coming soon." /></PanelCard>;
    case "users":
      return <PanelCard title="Users & Roles" subtitle="User management"><EmptyState message="Users management coming soon." /></PanelCard>;
    case "activity":
      return <PanelCard title="Activity Log" subtitle="System activity"><EmptyState message="Activity log coming soon." /></PanelCard>;
    default:
      return <PanelCard title="Module" subtitle="Module coming soon"><EmptyState message="This module is coming soon." /></PanelCard>;
  }
}
