import { useLocation } from "@tanstack/react-router";
import { AdminDashboard } from "./Dashboard";
import { Appointments } from "./Appointments";
import { Patients } from "./Patients";
import { Doctors } from "./Doctors";
import { Services } from "./Services";
import { Reports } from "./Reports";
import { PanelCard, EmptyState } from "@/components/shared/PanelCard";

export function AdminRouter() {
  const location = useLocation();
  const moduleSlug = location.pathname.split("/").pop() || "";

  switch (moduleSlug) {
    case "admin":
    case "":
      return <AdminDashboard />;
    case "appointments":
      return <Appointments />;
    case "patients":
      return <Patients />;
    case "doctors":
      return <Doctors />;
    case "services":
      return <Services />;
    case "reports":
      return <Reports />;
    case "records":
      return <PanelCard title="Medical Records" subtitle="Clinical records"><EmptyState message="Records view coming soon." /></PanelCard>;
    case "billing":
      return <PanelCard title="Billing & Payments" subtitle="Financial management"><EmptyState message="Billing view coming soon." /></PanelCard>;
    case "inventory":
      return <PanelCard title="Inventory" subtitle="Stock management"><EmptyState message="Inventory view coming soon." /></PanelCard>;
    case "messages":
      return <PanelCard title="Messages" subtitle="Internal messaging"><EmptyState message="Messages view coming soon." /></PanelCard>;
    case "settings":
      return <PanelCard title="Settings" subtitle="System settings"><EmptyState message="Settings view coming soon." /></PanelCard>;
    default:
      return <PanelCard title="Module" subtitle="Module coming soon"><EmptyState message="This module is coming soon." /></PanelCard>;
  }
}
