import { createFileRoute, notFound } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

// Lazy load dashboard components
const AdminDashboard = lazy(() =>
  import("@/components/modules/admin/Dashboard").then((m) => ({ default: m.AdminDashboard })),
);
const ClinicalDashboard = lazy(() =>
  import("@/components/modules/clinical/ClinicalDashboard").then((m) => ({ default: m.ClinicalDashboard })),
);
const ReceptionDashboard = lazy(() =>
  import("@/components/dashboards/ReceptionDashboard").then((m) => ({ default: m.ReceptionDashboard })),
);
const NurseDashboard = lazy(() =>
  import("@/components/modules/nurse/NurseDashboard").then((m) => ({ default: m.NurseDashboard })),
);
const LabDashboard = lazy(() =>
  import("@/components/modules/laboratory/LabDashboard").then((m) => ({ default: m.LabDashboard })),
);
const PharmacyDashboard = lazy(() =>
  import("@/components/modules/pharmacy/PharmacyDashboard").then((m) => ({ default: m.PharmacyDashboard })),
);
const AccountingDashboard = lazy(() =>
  import("@/components/modules/accounting/AccountingDashboard").then((m) => ({ default: m.AccountingDashboard })),
);
const WebsiteDashboard = lazy(() =>
  import("@/components/modules/website-admin/Dashboard").then((m) => ({ default: m.WebsiteAdminDashboard })),
);
const PatientPortal = lazy(() =>
  import("@/components/modules/patient-portal/PatientPortal").then((m) => ({ default: m.PatientPortal })),
);

export const Route = createFileRoute("/workspace/$role/")({
  component: RoleDashboard,
});

function RoleDashboard() {
  const { role } = Route.useParams();

  let DashboardComponent = null;

  switch (role) {
    case "admin":
      DashboardComponent = AdminDashboard;
      break;
    case "clinical":
      DashboardComponent = ClinicalDashboard;
      break;
    case "reception":
      DashboardComponent = ReceptionDashboard;
      break;
    case "nurse":
      DashboardComponent = NurseDashboard;
      break;
    case "laboratory":
      DashboardComponent = LabDashboard;
      break;
    case "pharmacy":
      DashboardComponent = PharmacyDashboard;
      break;
    case "accounts":
      DashboardComponent = AccountingDashboard;
      break;
    case "website":
      DashboardComponent = WebsiteDashboard;
      break;
    case "patient":
      DashboardComponent = PatientPortal;
      break;
    default:
      throw notFound();
  }

  return (
    <Suspense
      fallback={
        <div className="flex min-h-96 items-center justify-center">
          <div className="text-center">
            <div className="inline-flex size-12 items-center justify-center rounded-lg bg-secondary">
              <div className="size-6 animate-spin rounded-full border-2 border-muted-foreground border-t-foreground" />
            </div>
            <p className="mt-4 text-sm font-medium text-muted-foreground">Loading dashboard…</p>
          </div>
        </div>
      }
    >
      <DashboardComponent />
    </Suspense>
  );
}
