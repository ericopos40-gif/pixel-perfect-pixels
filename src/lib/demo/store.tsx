import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import {
  appointments as seedAppointments,
  invoices as seedInvoices,
  patients as seedPatients,
  payments as seedPayments,
  services,
  staff,
  vitalSigns,
  aminaDentalChart,
  aminaDiagnoses,
  aminaTreatmentPlans,
  aminaPrescriptions,
  aminaLabOrders,
  aminaAuditLogs,
  notifications as seedNotifications,
  aminaReceipt,
} from "./data";
import type {
  Appointment,
  AppointmentStatus,
  Invoice,
  Patient,
  Payment,
  Vitals,
  DentalChart,
  Diagnosis,
  TreatmentPlan,
  Prescription,
  LabOrder,
  AuditLog,
  Notification,
  Receipt,
} from "./types";

/**
 * A single in-memory clinic store shared by every dashboard.
 *
 * Reception, clinical and finance screens all read and write these records, so
 * checking a patient in on the reception desk is immediately visible to the
 * dentist and the accountant. Swapping this provider for API-backed queries
 * later will not change any component that consumes it.
 */
interface ClinicState {
  patients: Patient[];
  appointments: Appointment[];
  invoices: Invoice[];
  payments: Payment[];
  doctors: typeof staff;
  vitals: Vitals[];
  dentalCharts: DentalChart[];
  diagnoses: Diagnosis[];
  treatmentPlans: TreatmentPlan[];
  prescriptions: Prescription[];
  labOrders: LabOrder[];
  auditLogs: AuditLog[];
  notifications: Notification[];
  receipts: Receipt[];
  isLoading: boolean;
  // Appointment operations
  setAppointmentStatus: (id: string, status: AppointmentStatus) => void;
  addAppointment: (appointment: Appointment) => void;
  updateAppointment: (id: string, updates: Partial<Appointment>) => void;
  deleteAppointment: (id: string) => void;
  // Patient operations
  addPatient: (patient: Patient) => void;
  updatePatient: (id: string, updates: Partial<Patient>) => void;
  deletePatient: (id: string) => void;
  // Payment operations
  addPayment: (input: { invoiceNumber: string; amount: number; method: Payment["method"] }) => void;
  // Medical records operations
  updateDentalChart: (patientId: string, chart: DentalChart) => void;
  addDiagnosis: (diagnosis: Diagnosis) => void;
  addTreatmentPlan: (plan: TreatmentPlan) => void;
  addVitals: (vitals: Vitals) => void;
  // Prescription operations
  addPrescription: (prescription: Prescription) => void;
  updatePrescription: (id: string, updates: Partial<Prescription>) => void;
  // Lab order operations
  addLabOrder: (labOrder: LabOrder) => void;
  updateLabOrder: (id: string, updates: Partial<LabOrder>) => void;
  // Notification operations
  addNotification: (notification: Notification) => void;
  markNotificationRead: (id: string) => void;
  // Utility operations
  resetDemoData: () => void;
  saveToLocalStorage: () => void;
}

const ClinicContext = createContext<ClinicState | null>(null);

const STORAGE_KEY = "brightsmile-clinic-data";

// Check if we're in a browser environment
const isBrowser = typeof window !== "undefined" && typeof localStorage !== "undefined";

export function ClinicProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [patients, setPatients] = useState<Patient[]>(seedPatients);
  const [appointments, setAppointments] = useState<Appointment[]>(seedAppointments);
  const [invoices, setInvoices] = useState<Invoice[]>(seedInvoices);
  const [payments, setPayments] = useState<Payment[]>(seedPayments);
  const [vitals, setVitals] = useState<Vitals[]>([vitalSigns]);
  const [dentalCharts, setDentalCharts] = useState<DentalChart[]>([aminaDentalChart]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>(aminaDiagnoses);
  const [treatmentPlans, setTreatmentPlans] = useState<TreatmentPlan[]>(aminaTreatmentPlans);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(aminaPrescriptions);
  const [labOrders, setLabOrders] = useState<LabOrder[]>(aminaLabOrders);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(aminaAuditLogs);
  const [notifications, setNotifications] = useState<Notification[]>(seedNotifications);
  const [receipts, setReceipts] = useState<Receipt[]>([aminaReceipt]);

  // Load data from localStorage on mount (client-side only)
  useState(() => {
    if (!isBrowser) {
      setIsLoading(false);
      return;
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        if (data.patients) setPatients(data.patients);
        if (data.appointments) setAppointments(data.appointments);
        if (data.invoices) setInvoices(data.invoices);
        if (data.payments) setPayments(data.payments);
        if (data.vitals) setVitals(data.vitals);
        if (data.dentalCharts) setDentalCharts(data.dentalCharts);
        if (data.diagnoses) setDiagnoses(data.diagnoses);
        if (data.treatmentPlans) setTreatmentPlans(data.treatmentPlans);
        if (data.prescriptions) setPrescriptions(data.prescriptions);
        if (data.labOrders) setLabOrders(data.labOrders);
        if (data.auditLogs) setAuditLogs(data.auditLogs);
        if (data.notifications) setNotifications(data.notifications);
        if (data.receipts) setReceipts(data.receipts);
      }
    } catch (error) {
      console.error("Failed to load data from localStorage:", error);
    } finally {
      setIsLoading(false);
    }
  });

  const setAppointmentStatus = useCallback((id: string, status: AppointmentStatus) => {
    setAppointments((current) => current.map((item) => (item.id === id ? { ...item, status } : item)));
  }, []);

  const addPayment = useCallback(
    ({ invoiceNumber, amount, method }: { invoiceNumber: string; amount: number; method: Payment["method"] }) => {
      setInvoices((current) =>
        current.map((invoice) => {
          if (invoice.number !== invoiceNumber) return invoice;
          const total = invoice.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
          const paid = invoice.amountPaid + amount;
          return { ...invoice, amountPaid: paid, status: paid >= total ? "PAID" : "PARTIAL" };
        }),
      );
      setPayments((current) => {
        const invoice = invoices.find((item) => item.number === invoiceNumber);
        return [
          {
            id: `PMT-${String(current.length + 1).padStart(2, "0")}`,
            invoiceNumber,
            patientId: invoice?.patientId ?? "",
            date: new Date().toISOString().slice(0, 10),
            amount,
            method,
            reference: `DEMO-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
          },
          ...current,
        ];
      });
    },
    [invoices],
  );

  const updateDentalChart = useCallback((patientId: string, chart: DentalChart) => {
    setDentalCharts((current) => {
      const existing = current.findIndex((c) => c.patientId === patientId);
      if (existing >= 0) {
        const updated = [...current];
        updated[existing] = chart;
        return updated;
      }
      return [...current, chart];
    });
  }, []);

  const addDiagnosis = useCallback((diagnosis: Diagnosis) => {
    setDiagnoses((current) => [diagnosis, ...current]);
  }, []);

  const addTreatmentPlan = useCallback((plan: TreatmentPlan) => {
    setTreatmentPlans((current) => [plan, ...current]);
  }, []);

  const addVitals = useCallback((vitals_: Vitals) => {
    setVitals((current) => [vitals_, ...current]);
  }, []);

  const addNotification = useCallback((notification: Notification) => {
    setNotifications((current) => [notification, ...current]);
  }, []);

  const addAppointment = useCallback((appointment: Appointment) => {
    setAppointments((current) => [appointment, ...current]);
  }, []);

  const updateAppointment = useCallback((id: string, updates: Partial<Appointment>) => {
    setAppointments((current) => current.map((apt) => (apt.id === id ? { ...apt, ...updates } : apt)));
  }, []);

  const deleteAppointment = useCallback((id: string) => {
    setAppointments((current) => current.filter((apt) => apt.id !== id));
  }, []);

  const addPatient = useCallback((patient: Patient) => {
    setPatients((current) => [patient, ...current]);
  }, []);

  const updatePatient = useCallback((id: string, updates: Partial<Patient>) => {
    setPatients((current) => current.map((patient) => (patient.id === id ? { ...patient, ...updates } : patient)));
  }, []);

  const deletePatient = useCallback((id: string) => {
    setPatients((current) => current.filter((patient) => patient.id !== id));
  }, []);

  const addPrescription = useCallback((prescription: Prescription) => {
    setPrescriptions((current) => [prescription, ...current]);
  }, []);

  const updatePrescription = useCallback((id: string, updates: Partial<Prescription>) => {
    setPrescriptions((current) => current.map((rx) => (rx.id === id ? { ...rx, ...updates } : rx)));
  }, []);

  const addLabOrder = useCallback((labOrder: LabOrder) => {
    setLabOrders((current) => [labOrder, ...current]);
  }, []);

  const updateLabOrder = useCallback((id: string, updates: Partial<LabOrder>) => {
    setLabOrders((current) => current.map((order) => (order.id === id ? { ...order, ...updates } : order)));
  }, []);

  const markNotificationRead = useCallback((id: string) => {
    setNotifications((current) => current.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)));
  }, []);

  const saveToLocalStorage = useCallback(() => {
    if (!isBrowser) return;

    try {
      const data = {
        patients,
        appointments,
        invoices,
        payments,
        vitals,
        dentalCharts,
        diagnoses,
        treatmentPlans,
        prescriptions,
        labOrders,
        auditLogs,
        notifications,
        receipts,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error("Failed to save data to localStorage:", error);
    }
  }, [
    patients,
    appointments,
    invoices,
    payments,
    vitals,
    dentalCharts,
    diagnoses,
    treatmentPlans,
    prescriptions,
    labOrders,
    auditLogs,
    notifications,
    receipts,
  ]);

  const resetDemoData = useCallback(() => {
    setPatients(seedPatients);
    setAppointments(seedAppointments);
    setInvoices(seedInvoices);
    setPayments(seedPayments);
    setVitals([vitalSigns]);
    setDentalCharts([aminaDentalChart]);
    setDiagnoses(aminaDiagnoses);
    setTreatmentPlans(aminaTreatmentPlans);
    setPrescriptions(aminaPrescriptions);
    setLabOrders(aminaLabOrders);
    setAuditLogs(aminaAuditLogs);
    setNotifications(seedNotifications);
    setReceipts([aminaReceipt]);
    if (isBrowser) {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const value = useMemo<ClinicState>(
    () => ({
      patients,
      appointments,
      invoices,
      payments,
      doctors: staff,
      vitals,
      dentalCharts,
      diagnoses,
      treatmentPlans,
      prescriptions,
      labOrders,
      auditLogs,
      notifications,
      receipts,
      isLoading,
      setAppointmentStatus,
      addPayment,
      addAppointment,
      updateAppointment,
      deleteAppointment,
      addPatient,
      updatePatient,
      deletePatient,
      addPrescription,
      updatePrescription,
      addLabOrder,
      updateLabOrder,
      updateDentalChart,
      addDiagnosis,
      addTreatmentPlan,
      addVitals,
      addNotification,
      markNotificationRead,
      resetDemoData,
      saveToLocalStorage,
    }),
    [
      patients,
      appointments,
      invoices,
      payments,
      vitals,
      dentalCharts,
      diagnoses,
      treatmentPlans,
      prescriptions,
      labOrders,
      auditLogs,
      notifications,
      receipts,
      isLoading,
      setAppointmentStatus,
      addPayment,
      addAppointment,
      updateAppointment,
      deleteAppointment,
      addPatient,
      updatePatient,
      deletePatient,
      addPrescription,
      updatePrescription,
      addLabOrder,
      updateLabOrder,
      updateDentalChart,
      addDiagnosis,
      addTreatmentPlan,
      addVitals,
      addNotification,
      markNotificationRead,
      resetDemoData,
      saveToLocalStorage,
    ],
  );

  return <ClinicContext.Provider value={value}>{children}</ClinicContext.Provider>;
}

export function useClinic(): ClinicState {
  const context = useContext(ClinicContext);
  if (!context) throw new Error("useClinic must be used inside a ClinicProvider");
  return context;
}

// Alias for backwards compatibility with new components
export const useClinicStore = useClinic;

export function usePatientLookup() {
  const { patients } = useClinic();
  return useCallback((id: string) => patients.find((patient) => patient.id === id), [patients]);
}

export function useVitalsForPatient(patientId: string) {
  const { vitals } = useClinic();
  return useCallback(() => vitals.filter((v) => v.patientId === patientId).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()), [vitals, patientId]);
}

export function useDentalChartForPatient(patientId: string) {
  const { dentalCharts } = useClinic();
  return dentalCharts.find((chart) => chart.patientId === patientId);
}

export function useDiagnosesForPatient(patientId: string) {
  const { diagnoses } = useClinic();
  return diagnoses.filter((d) => d.patientId === patientId);
}

export function useTreatmentPlansForPatient(patientId: string) {
  const { treatmentPlans } = useClinic();
  return treatmentPlans.filter((tp) => tp.patientId === patientId);
}

export function usePrescriptionsForPatient(patientId: string) {
  const { prescriptions } = useClinic();
  return prescriptions.filter((p) => p.patientId === patientId);
}

export function useLabOrdersForPatient(patientId: string) {
  const { labOrders } = useClinic();
  return labOrders.filter((lo) => lo.patientId === patientId);
}

export function staffById(id: string) {
  return staff.find((member) => member.id === id);
}

export function serviceById(id: string) {
  return services.find((service) => service.id === id);
}

export function invoiceTotal(invoice: Invoice) {
  return invoice.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
}
