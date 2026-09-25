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

export type ToothCondition =
  | "HEALTHY"
  | "CARIES"
  | "FILLED"
  | "MISSING"
  | "EXTRACTION"
  | "CROWN"
  | "ROOT_CANAL"
  | "IMPLANT"
  | "BRIDGE"
  | "VENEER"
  | "FRACTURE"
  | "OTHER";

export type DiagnosisStatus = "ACTIVE" | "RESOLVED" | "MONITORING";

export type TreatmentPlanStatus =
  | "PROPOSED"
  | "APPROVED"
  | "SCHEDULED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export type LabOrderStatus =
  | "REQUESTED"
  | "SAMPLE_COLLECTED"
  | "PROCESSING"
  | "RESULT_READY"
  | "REVIEWED"
  | "COMPLETED";

export type PrescriptionStatus = "ISSUED" | "PENDING" | "DISPENSED" | "EXPIRED" | "CANCELLED";

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

export interface Vitals {
  id: string;
  appointmentId: string;
  patientId: string;
  recordedBy: string;
  date: string;
  time: string;
  bloodPressure: string; // "120/80"
  heartRate: number; // bpm
  temperature: number; // Celsius
  respiratoryRate: number; // breaths per minute
  oxygenSaturation: number; // percentage
  weight: number; // kg
  height: number; // cm
  painScore: number; // 0-10
  notes?: string;
}

export interface ToothRecord {
  toothNumber: number; // 1-32 for adult teeth
  condition: ToothCondition;
  notes?: string;
  lastUpdated: string;
}

export interface DentalChart {
  id: string;
  patientId: string;
  teeth: Record<string, ToothRecord>; // keyed by tooth number
  lastUpdated: string;
}

export interface Diagnosis {
  id: string;
  patientId: string;
  date: string;
  dentistId: string;
  toothNumber?: number;
  icd10Code?: string;
  condition: string; // e.g. "Caries - tooth 16"
  description: string;
  status: DiagnosisStatus;
}

export interface TreatmentPlan {
  id: string;
  patientId: string;
  dentistId: string;
  createdDate: string;
  plannedStartDate?: string;
  completedDate?: string;
  toothNumber?: number;
  procedure: string; // e.g. "Root Canal Treatment"
  description: string;
  estimatedCost: number;
  estimatedSessions: number;
  currentSession?: number;
  status: TreatmentPlanStatus;
  notes?: string;
}

export interface Prescription {
  id: string;
  prescriptionNumber: string;
  patientId: string;
  dentistId: string;
  date: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  route: string; // e.g. "Oral"
  instructions: string;
  status: PrescriptionStatus;
  dispensedDate?: string;
  dispensedBy?: string;
}

export interface LabOrder {
  id: string;
  labOrderNumber: string;
  patientId: string;
  dentistId: string;
  createdDate: string;
  testType: string; // e.g. "Culture & Sensitivity"
  toothNumber?: number;
  priority: "ROUTINE" | "URGENT";
  status: LabOrderStatus;
  collectedDate?: string;
  resultDate?: string;
  result?: string;
  attachments?: string[];
  notes?: string;
}

export interface PatientVital {
  id: string;
  appointmentId: string;
  patientId: string;
  recordedBy: string;
  recordedDate: string;
  bloodPressure: string;
  heartRate: number;
  temperature: number;
  respiratoryRate: number;
  oxygenSaturation: number;
  weight: number;
  height: number;
  painScore: number;
  readyForDentist?: boolean;
  notes?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userRole: Role;
  action: string;
  entityType: string; // "Patient", "Appointment", "Treatment", etc
  entityId: string;
  entityName: string;
  changes?: Record<string, unknown>;
  details?: string;
}

export interface Notification {
  id: string;
  userId: string;
  type:
  | "APPOINTMENT_CONFIRMED"
  | "APPOINTMENT_REMINDER"
  | "PATIENT_CHECKED_IN"
  | "LAB_RESULT_READY"
  | "PAYMENT_RECEIVED"
  | "INVOICE_OUTSTANDING"
  | "LOW_STOCK"
  | "LEAVE_REQUEST"
  | "APPROVAL_REQUIRED";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  relatedEntity?: {
    type: string;
    id: string;
  };
}

export interface Receipt {
  id: string;
  receiptNumber: string;
  invoiceNumber: string;
  patientId: string;
  date: string;
  amount: number;
  paymentMethod: Payment["method"];
  reference: string;
  notes?: string;
}
