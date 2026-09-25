import { createFileRoute, notFound } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

// ============================================================================
// DYNAMIC MODULE LOADING
// ============================================================================
// This route handles all workspace modules across all roles.
// Modules are lazy-loaded to keep the initial bundle small.
// Each module is a function that returns a component based on role and module slug.

// Dentist/Clinical modules
const ClinicalDashboard = lazy(() =>
  import("@/components/modules/clinical/ClinicalDashboard").then((m) => ({ default: m.ClinicalDashboard })),
);
const ClinicalPatients = lazy(() =>
  import("@/components/modules/clinical/ClinicalPatients").then((m) => ({ default: m.ClinicalPatients })),
);
const ClinicalAppointments = lazy(() =>
  import("@/components/modules/clinical/ClinicalAppointments").then((m) => ({ default: m.ClinicalAppointments })),
);
const PatientDetailClinical = lazy(() =>
  import("@/components/modules/clinical/PatientDetail").then((m) => ({ default: m.PatientDetail })),
);
const DentalChart = lazy(() =>
  import("@/components/modules/clinical/DentalChart").then((m) => ({ default: m.DentalChart })),
);
const TreatmentPlans = lazy(() =>
  import("@/components/modules/clinical/TreatmentPlans").then((m) => ({ default: m.TreatmentPlans })),
);
const Prescriptions = lazy(() =>
  import("@/components/modules/clinical/Prescriptions").then((m) => ({ default: m.Prescriptions })),
);
const LaboratoryDentist = lazy(() =>
  import("@/components/modules/clinical/Laboratory").then((m) => ({ default: m.Laboratory })),
);

// Nurse modules
const NurseDashboard = lazy(() =>
  import("@/components/modules/nurse/NurseDashboard").then((m) => ({ default: m.NurseDashboard })),
);
const WaitingRoom = lazy(() =>
  import("@/components/modules/nurse/WaitingRoom").then((m) => ({ default: m.WaitingRoom })),
);
const PatientDetailNurse = lazy(() =>
  import("@/components/modules/nurse/PatientDetail").then((m) => ({ default: m.PatientDetail })),
);
const VitalsRecording = lazy(() =>
  import("@/components/modules/nurse/VitalsRecording").then((m) => ({ default: m.VitalsRecording })),
);

// Lab modules
const LabDashboard = lazy(() =>
  import("@/components/modules/laboratory/LabDashboard").then((m) => ({ default: m.LabDashboard })),
);
const LabOrders = lazy(() =>
  import("@/components/modules/laboratory/LabOrders").then((m) => ({ default: m.LabOrders })),
);
const LabOrderDetail = lazy(() =>
  import("@/components/modules/laboratory/LabOrderDetail").then((m) => ({ default: m.LabOrderDetail })),
);

// Pharmacy modules
const PharmacyDashboard = lazy(() =>
  import("@/components/modules/pharmacy/PharmacyDashboard").then((m) => ({ default: m.PharmacyDashboard })),
);
const PrescriptionsPending = lazy(() =>
  import("@/components/modules/pharmacy/Prescriptions").then((m) => ({ default: m.Prescriptions })),
);
const Dispensing = lazy(() =>
  import("@/components/modules/pharmacy/Dispensing").then((m) => ({ default: m.Dispensing })),
);
const PharmacyInventory = lazy(() =>
  import("@/components/modules/pharmacy/Inventory").then((m) => ({ default: m.Inventory })),
);
const PharmacyReports = lazy(() =>
  import("@/components/modules/pharmacy/Reports").then((m) => ({ default: m.Reports })),
);
const PharmacyMessages = lazy(() =>
  import("@/components/modules/pharmacy/Messages").then((m) => ({ default: m.Messages })),
);
const PharmacySettings = lazy(() =>
  import("@/components/modules/pharmacy/Settings").then((m) => ({ default: m.Settings })),
);

// Accounting modules
const AccountingDashboard = lazy(() =>
  import("@/components/modules/accounting/AccountingDashboard").then((m) => ({ default: m.AccountingDashboard })),
);
const Transactions = lazy(() =>
  import("@/components/modules/accounting/Transactions").then((m) => ({ default: m.Transactions })),
);
const Invoices = lazy(() =>
  import("@/components/modules/accounting/Invoices").then((m) => ({ default: m.Invoices })),
);
const InvoiceDetail = lazy(() =>
  import("@/components/modules/accounting/InvoiceDetail").then((m) => ({ default: m.InvoiceDetail })),
);
const Payments = lazy(() =>
  import("@/components/modules/accounting/Payments").then((m) => ({ default: m.Payments })),
);
const Expenses = lazy(() =>
  import("@/components/modules/accounting/Expenses").then((m) => ({ default: m.Expenses })),
);
const AccountingReports = lazy(() =>
  import("@/components/modules/accounting/Reports").then((m) => ({ default: m.Reports })),
);
const ChartOfAccounts = lazy(() =>
  import("@/components/modules/accounting/Accounts").then((m) => ({ default: m.Accounts })),
);
const BankReconciliation = lazy(() =>
  import("@/components/modules/accounting/Reconciliation").then((m) => ({ default: m.Reconciliation })),
);
const AccountingPatients = lazy(() =>
  import("@/components/modules/accounting/Patients").then((m) => ({ default: m.Patients })),
);
const AccountingInventory = lazy(() =>
  import("@/components/modules/accounting/Inventory").then((m) => ({ default: m.Inventory })),
);
const AccountingSettings = lazy(() =>
  import("@/components/modules/accounting/Settings").then((m) => ({ default: m.Settings })),
);

// Reception modules
const ReceptionModuleRouter = lazy(() =>
  import("@/components/modules/reception/ReceptionRouter").then((m) => ({ default: m.ReceptionRouter })),
);

// Admin modules
const AdminModuleRouter = lazy(() =>
  import("@/components/modules/admin/AdminRouter").then((m) => ({ default: m.AdminRouter })),
);

// Website Admin modules
const WebsiteAdminRouter = lazy(() =>
  import("@/components/modules/website-admin/WebsiteAdminRouter").then((m) => ({
    default: m.WebsiteAdminRouter,
  })),
);

// Patient portal
const PatientPortal = lazy(() =>
  import("@/components/modules/patient-portal/PatientPortal").then((m) => ({ default: m.PatientPortal })),
);

export const Route = createFileRoute("/workspace/$role/$module")({
  component: ModuleComponent,
});

function ModuleComponent() {
  const { role, module } = Route.useParams();

  // Route to the appropriate component based on role and module
  let Component = null;

  // CLINICAL/DENTIST ROLE
  if (role === "clinical") {
    switch (module) {
      case "":
        Component = ClinicalDashboard;
        break;
      case "patients":
        Component = ClinicalPatients;
        break;
      case "appointments":
        Component = ClinicalAppointments;
        break;
      case "patient-detail":
        Component = PatientDetailClinical;
        break;
      case "dental-chart":
        Component = DentalChart;
        break;
      case "treatment-plans":
        Component = TreatmentPlans;
        break;
      case "prescriptions":
        Component = Prescriptions;
        break;
      case "laboratory":
        Component = LaboratoryDentist;
        break;
      default:
        throw notFound();
    }
  }

  // NURSE ROLE
  if (role === "nurse") {
    switch (module) {
      case "":
        Component = NurseDashboard;
        break;
      case "waiting-room":
        Component = WaitingRoom;
        break;
      case "patient-detail":
        Component = PatientDetailNurse;
        break;
      case "vitals":
        Component = VitalsRecording;
        break;
      default:
        throw notFound();
    }
  }

  // LABORATORY ROLE
  if (role === "laboratory") {
    switch (module) {
      case "":
        Component = LabDashboard;
        break;
      case "orders":
        Component = LabOrders;
        break;
      case "order-detail":
        Component = LabOrderDetail;
        break;
      default:
        throw notFound();
    }
  }

  // PHARMACY ROLE
  if (role === "pharmacy") {
    switch (module) {
      case "":
        Component = PharmacyDashboard;
        break;
      case "prescriptions":
        Component = PrescriptionsPending;
        break;
      case "dispensing":
        Component = Dispensing;
        break;
      case "inventory":
        Component = PharmacyInventory;
        break;
      case "reports":
        Component = PharmacyReports;
        break;
      case "messages":
        Component = PharmacyMessages;
        break;
      case "settings":
        Component = PharmacySettings;
        break;
      default:
        throw notFound();
    }
  }

  // ACCOUNTING ROLE
  if (role === "accounts") {
    switch (module) {
      case "":
        Component = AccountingDashboard;
        break;
      case "transactions":
        Component = Transactions;
        break;
      case "invoices":
        Component = Invoices;
        break;
      case "invoice-detail":
        Component = InvoiceDetail;
        break;
      case "payments":
        Component = Payments;
        break;
      case "expenses":
        Component = Expenses;
        break;
      case "reports":
        Component = AccountingReports;
        break;
      case "accounts":
        Component = ChartOfAccounts;
        break;
      case "reconciliation":
        Component = BankReconciliation;
        break;
      case "patients":
        Component = AccountingPatients;
        break;
      case "inventory":
        Component = AccountingInventory;
        break;
      case "settings":
        Component = AccountingSettings;
        break;
      default:
        throw notFound();
    }
  }

  // RECEPTION ROLE
  if (role === "reception") {
    Component = ReceptionModuleRouter;
  }

  // ADMIN ROLE
  if (role === "admin") {
    Component = AdminModuleRouter;
  }

  // WEBSITE/SUPER_ADMIN ROLE
  if (role === "website") {
    Component = WebsiteAdminRouter;
  }

  // PATIENT PORTAL
  if (role === "patient") {
    Component = PatientPortal;
  }

  if (!Component) {
    throw notFound();
  }

  return (
    <Suspense fallback={<ModuleLoadingPlaceholder />}>
      <Component />
    </Suspense>
  );
}

function ModuleLoadingPlaceholder() {
  return (
    <div className="flex min-h-96 items-center justify-center">
      <div className="text-center">
        <div className="inline-flex size-12 items-center justify-center rounded-lg bg-secondary">
          <div className="size-6 animate-spin rounded-full border-2 border-muted-foreground border-t-foreground" />
        </div>
        <p className="mt-4 text-sm font-medium text-muted-foreground">Loading module…</p>
      </div>
    </div>
  );
}
