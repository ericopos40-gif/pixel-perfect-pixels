import { useLocation } from "@tanstack/react-router";
import { ReceptionDashboard } from "@/components/dashboards/ReceptionDashboard";
import { Appointments } from "./Appointments";
import { Patients } from "./Patients";
import { CheckIn } from "./CheckIn";
import { Queue } from "./Queue";
import { Dentists } from "./Dentists";
import { Calendar } from "./Calendar";
import { Messages } from "./Messages";
import { Billing } from "./Billing";
import { PanelCard, EmptyState } from "@/components/shared/PanelCard";

export function ReceptionRouter() {
  const location = useLocation();
  const moduleSlug = location.pathname.split("/").pop() || "";

  switch (moduleSlug) {
    case "reception":
    case "":
      return <ReceptionDashboard />;
    case "appointments":
      return <Appointments />;
    case "patients":
      return <Patients />;
    case "check-in":
      return <CheckIn />;
    case "queue":
      return <Queue />;
    case "dentists":
      return <Dentists />;
    case "calendar":
      return <Calendar />;
    case "messages":
      return <Messages />;
    case "billing":
      return <Billing />;
    case "reports":
      return <PanelCard title="Reports" subtitle="Reception reports"><EmptyState message="Reports view coming soon." /></PanelCard>;
    case "settings":
      return <PanelCard title="Settings" subtitle="Reception settings"><EmptyState message="Settings view coming soon." /></PanelCard>;
    default:
      return <PanelCard title="Module" subtitle="Module coming soon"><EmptyState message="This module is coming soon." /></PanelCard>;
  }
}
