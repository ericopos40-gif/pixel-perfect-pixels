/**
 * Shared domain model for BrightSmile Dental Care Centre.
 *
 * Every role in the system reads and writes these same records, so the demo
 * behaves like one clinic rather than a set of disconnected screens. The shapes
 * mirror the planned REST resources so the data layer can later be swapped for
 * the Laravel API without touching the interface code.
 */

export type Role =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "RECEPTIONIST"
  | "DENTIST"
  | "NURSE"
  | "ACCOUNTANT"
  | "HR"
  | "LAB_TECHNICIAN"
  | "PHARMACIST"
  | "STORE_MANAGER"
  | "MANAGER"
  | "PATIENT";

export type AppointmentStatus =
  | "SCHEDULED"
  | "CONFIRMED"
  | "CHECKED_IN"
  | "WAITING"
  | "WITH_NURSE"
  | "IN_ROOM"
  | "COMPLETED"
  | "CANCELLED"
  | "NO_SHOW";

export type InvoiceStatus = "PAID" | "PENDING" | "PARTIAL" | "OVERDUE" | "VOID";

export type StaffStatus = "AVAILABLE" | "ON_LEAVE" | "OFF_DUTY";

export interface StaffMember {
  id: string;
  name: string;
  role: Role;
  title: string;
  specialty?: string;
  email: string;
  phone: string;
  experienceYears?: number;
  rating?: number;
  reviews?: number;
  status: StaffStatus;
  department: string;
  avatarTone: string;
  initials: string;
}

export interface Patient {
  id: string;
  code: string;
  name: string;
  phone: string;
  email: string;
  gender: "Female" | "Male";
  dateOfBirth: string;
  town: string;
  registeredOn: string;
  lastVisit: string;
  status: "Active" | "Inactive";
  allergies: string[];
  conditions: string[];
  bloodGroup: string;
  initials: string;
  avatarTone: string;
}

export interface Service {
  id: string;
  name: string;
  category: string;
  price: number;
  durationMinutes: number;
}

export interface Appointment {
  id: string;
  patientId: string;
  dentistId: string;
  serviceId: string;
  date: string;
  time: string;
  endTime: string;
  status: AppointmentStatus;
  note?: string;
  createdBy: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface Invoice {
  id: string;
  number: string;
  patientId: string;
  date: string;
  dueDate: string;
  items: InvoiceItem[];
  status: InvoiceStatus;
  amountPaid: number;
}

export interface Payment {
  id: string;
  invoiceNumber: string;
  patientId: string;
  date: string;
  amount: number;
  method: "Cash" | "M-Pesa" | "Bank" | "Insurance";
  reference: string;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  type: "Income" | "Expense";
  amount: number;
  account: string;
}

export interface ExpenseCategory {
  name: string;
  share: number;
  tone: string;
}

export interface AccountBalance {
  name: string;
  balance: number;
  icon: "cash" | "mobile" | "bank" | "petty";
}

export interface ActivityEntry {
  id: string;
  time: string;
  message: string;
  detail: string;
  tone: string;
}

export interface NewsArticle {
  id: string;
  tag: string;
  title: string;
  date: string;
  excerpt: string;
}

export interface ClinicEvent {
  id: string;
  title: string;
  monthLabel: string;
  day: string;
  year: string;
  date: string;
  timeRange: string;
  location: string;
  fee: string;
  registrations: number;
  capacity: number;
}

export interface Campaign {
  id: string;
  title: string;
  blurb: string;
  period: string;
  badge: string;
  state: "Active" | "Scheduled";
}

export interface TrendPoint {
  label: string;
  [series: string]: string | number;
}
