import {
  Activity,
  AlertCircle,
  BadgeDollarSign,
  BarChart3,
  Bell,
  Boxes,
  Building2,
  CalendarDays,
  ClipboardList,
  CreditCard,
  FileBarChart,
  FileText,
  FolderOpen,
  Globe,
  Image,
  LayoutDashboard,
  Mail,
  MessageSquare,
  Newspaper,
  Receipt,
  Search,
  Settings,
  Stethoscope,
  Users,
  UserCog,
  UserPlus,
  Wallet,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  module: string;
  icon: LucideIcon;
  badge?: string;
}

export interface NavGroup {
  label?: string;
  items: NavItem[];
}

export interface WorkspaceRole {
  slug: string;
  roleLabel: string;
  personName: string;
  personTitle: string;
  initials: string;
  dashboardTitle: string;
  dashboardSubtitle: string;
  nav: NavGroup[];
}

const dashboardItem: NavItem = { label: "Dashboard", module: "", icon: LayoutDashboard };

export const workspaceRoles: Record<string, WorkspaceRole> = {
  admin: {
    slug: "admin",
    roleLabel: "Administrator",
    personName: "Dr. Mwangi",
    personTitle: "Administrator",
    initials: "DM",
    dashboardTitle: "Dashboard Overview",
    dashboardSubtitle: "Welcome back, Dr. Mwangi. Here is what is happening at the clinic today.",
    nav: [
      {
        items: [
          dashboardItem,
          { label: "Appointments", module: "appointments", icon: CalendarDays },
          { label: "Patients", module: "patients", icon: Users },
          { label: "Doctors", module: "doctors", icon: Stethoscope },
          { label: "Services", module: "services", icon: ClipboardList },
          { label: "Medical Records", module: "records", icon: FileText },
          { label: "Billing & Payments", module: "billing", icon: CreditCard },
          { label: "Inventory", module: "inventory", icon: Boxes },
          { label: "Reports", module: "reports", icon: BarChart3 },
          { label: "Messages", module: "messages", icon: MessageSquare, badge: "5" },
          { label: "Settings", module: "settings", icon: Settings },
        ],
      },
    ],
  },
  reception: {
    slug: "reception",
    roleLabel: "Receptionist",
    personName: "Alice Wanjiku",
    personTitle: "Receptionist",
    initials: "AW",
    dashboardTitle: "Reception Dashboard",
    dashboardSubtitle: "Welcome back, Alice. Manage today's appointments and patient flow.",
    nav: [
      {
        items: [
          dashboardItem,
          { label: "Appointments", module: "appointments", icon: CalendarDays },
          { label: "Patients", module: "patients", icon: Users },
          { label: "Check In / Out", module: "check-in", icon: UserPlus },
          { label: "Calendar", module: "calendar", icon: CalendarDays },
          { label: "Queue", module: "queue", icon: ClipboardList },
          { label: "Our Dentists", module: "dentists", icon: Stethoscope },
          { label: "Messages", module: "messages", icon: MessageSquare, badge: "3" },
          { label: "Billing & Payments", module: "billing", icon: CreditCard },
          { label: "Reports", module: "reports", icon: BarChart3 },
          { label: "Settings", module: "settings", icon: Settings },
        ],
      },
    ],
  },
  clinical: {
    slug: "clinical",
    roleLabel: "General Dentist",
    personName: "Dr. James Mwangi",
    personTitle: "General Dentist",
    initials: "JM",
    dashboardTitle: "Doctor Dashboard",
    dashboardSubtitle: "Welcome back, Dr. James Mwangi. Here is your day at a glance.",
    nav: [
      {
        items: [
          dashboardItem,
          { label: "My Patients", module: "patients", icon: Users },
          { label: "Appointments", module: "appointments", icon: CalendarDays },
          { label: "Prescriptions", module: "prescriptions", icon: FileText },
          { label: "Treatment Plans", module: "treatment-plans", icon: ClipboardList },
          { label: "Records & History", module: "records", icon: FolderOpen },
          { label: "Dental Chart", module: "dental-chart", icon: Stethoscope },
          { label: "Laboratory", module: "laboratory", icon: Boxes },
          { label: "Messages", module: "messages", icon: MessageSquare, badge: "5" },
          { label: "Reports", module: "reports", icon: BarChart3 },
          { label: "Payments", module: "payments", icon: CreditCard },
          { label: "Settings", module: "settings", icon: Settings },
        ],
      },
    ],
  },
  nurse: {
    slug: "nurse",
    roleLabel: "Dental Nurse",
    personName: "Esther Njoroge",
    personTitle: "Dental Nurse",
    initials: "EN",
    dashboardTitle: "Nursing Dashboard",
    dashboardSubtitle: "Welcome, Esther. Manage patient preparation and vitals.",
    nav: [
      {
        items: [
          dashboardItem,
          { label: "Waiting Room", module: "waiting-room", icon: Users },
          { label: "Patient Detail", module: "patient-detail", icon: FileText },
          { label: "Record Vitals", module: "vitals", icon: Activity },
          { label: "Messages", module: "messages", icon: MessageSquare },
          { label: "Settings", module: "settings", icon: Settings },
        ],
      },
    ],
  },
  laboratory: {
    slug: "laboratory",
    roleLabel: "Laboratory Technician",
    personName: "Brian Kiptoo",
    personTitle: "Laboratory Technician",
    initials: "BK",
    dashboardTitle: "Laboratory Dashboard",
    dashboardSubtitle: "Welcome, Brian. Manage lab orders and results.",
    nav: [
      {
        items: [
          dashboardItem,
          { label: "Lab Orders", module: "orders", icon: Boxes },
          { label: "Samples", module: "samples", icon: ClipboardList },
          { label: "Processing", module: "processing", icon: Activity },
          { label: "Results", module: "results", icon: FileText },
          { label: "Messages", module: "messages", icon: MessageSquare },
          { label: "Settings", module: "settings", icon: Settings },
        ],
      },
    ],
  },
  pharmacy: {
    slug: "pharmacy",
    roleLabel: "Pharmacist",
    personName: "Grace Kipchoge",
    personTitle: "Pharmacist",
    initials: "GK",
    dashboardTitle: "Pharmacy Dashboard",
    dashboardSubtitle: "Welcome, Grace. Manage prescriptions and inventory.",
    nav: [
      {
        items: [
          dashboardItem,
          { label: "Prescriptions", module: "prescriptions", icon: FileText },
          { label: "Dispensing", module: "dispensing", icon: Boxes },
          { label: "Inventory", module: "inventory", icon: Boxes },
          { label: "Reports", module: "reports", icon: BarChart3 },
          { label: "Messages", module: "messages", icon: MessageSquare },
          { label: "Settings", module: "settings", icon: Settings },
        ],
      },
    ],
  },
  accounts: {
    slug: "accounts",
    roleLabel: "Accountant",
    personName: "David Ochieng",
    personTitle: "Accountant",
    initials: "DO",
    dashboardTitle: "Accounting Overview",
    dashboardSubtitle: "Welcome back, David. Track clinic revenue, expenses and payments.",
    nav: [
      {
        items: [
          dashboardItem,
          { label: "Transactions", module: "transactions", icon: Activity },
          { label: "Invoices", module: "invoices", icon: Receipt },
          { label: "Payments", module: "payments", icon: BadgeDollarSign },
          { label: "Expenses", module: "expenses", icon: Wallet },
          { label: "Reports", module: "reports", icon: FileBarChart },
          { label: "Accounts", module: "accounts", icon: Building2 },
          { label: "Bank Reconciliation", module: "reconciliation", icon: CreditCard },
          { label: "Patients", module: "patients", icon: Users },
          { label: "Inventory", module: "inventory", icon: Boxes },
          { label: "Settings", module: "settings", icon: Settings },
        ],
      },
    ],
  },
  website: {
    slug: "website",
    roleLabel: "Super Admin",
    personName: "Admin",
    personTitle: "Website Administrator",
    initials: "SA",
    dashboardTitle: "Website Content Dashboard",
    dashboardSubtitle: "Manage everything visitors see on the BrightSmile public website.",
    nav: [
      {
        label: "Content",
        items: [
          dashboardItem,
          { label: "News & Blog", module: "news", icon: Newspaper },
          { label: "Campaigns", module: "campaigns", icon: Globe },
          { label: "Events", module: "events", icon: CalendarDays },
          { label: "Gallery", module: "gallery", icon: Image },
          { label: "Pages", module: "pages", icon: FileText },
        ],
      },
      {
        label: "Site",
        items: [
          { label: "Services", module: "services", icon: ClipboardList },
          { label: "Team", module: "team", icon: Users },
          { label: "Testimonials", module: "testimonials", icon: MessageSquare },
          { label: "Contact Messages", module: "messages", icon: Mail, badge: "12" },
          { label: "Newsletter", module: "newsletter", icon: Bell },
          { label: "Media Library", module: "media", icon: FolderOpen },
        ],
      },
      {
        label: "System",
        items: [
          { label: "SEO Settings", module: "seo", icon: Search },
          { label: "Site Settings", module: "settings", icon: Settings },
          { label: "Users & Roles", module: "users", icon: UserCog },
          { label: "Activity Log", module: "activity", icon: Activity },
        ],
      },
    ],
  },
  patient: {
    slug: "patient",
    roleLabel: "Patient",
    personName: "Amina Wanjiku",
    personTitle: "Patient",
    initials: "AW",
    dashboardTitle: "My Medical Portal",
    dashboardSubtitle: "View your appointments, treatments, and medical records.",
    nav: [
      {
        items: [
          dashboardItem,
          { label: "My Appointments", module: "appointments", icon: CalendarDays },
          { label: "My Treatment", module: "treatment", icon: Stethoscope },
          { label: "Dental Records", module: "dental-records", icon: FileText },
          { label: "Prescriptions", module: "prescriptions", icon: FileText },
          { label: "Lab Results", module: "lab-results", icon: BarChart3 },
          { label: "Invoices", module: "invoices", icon: Receipt },
          { label: "Payments", module: "payments", icon: BadgeDollarSign },
          { label: "Receipts", module: "receipts", icon: FileText },
          { label: "My Profile", module: "profile", icon: Users },
          { label: "Notifications", module: "notifications", icon: Bell },
        ],
      },
    ],
  },
};

export const workspaceRoleList = Object.values(workspaceRoles);

export function getWorkspaceRole(slug: string): WorkspaceRole | undefined {
  return workspaceRoles[slug];
}

export function findNavItem(role: WorkspaceRole, module: string): NavItem | undefined {
  return role.nav.flatMap((group) => group.items).find((item) => item.module === module);
}
