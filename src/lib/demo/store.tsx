import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import {
  appointments as seedAppointments,
  invoices as seedInvoices,
  patients as seedPatients,
  payments as seedPayments,
  services,
  staff,
} from "./data";
import type { Appointment, AppointmentStatus, Invoice, Patient, Payment } from "./types";

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
  setAppointmentStatus: (id: string, status: AppointmentStatus) => void;
  addPayment: (input: { invoiceNumber: string; amount: number; method: Payment["method"] }) => void;
  resetDemoData: () => void;
}

const ClinicContext = createContext<ClinicState | null>(null);

export function ClinicProvider({ children }: { children: ReactNode }) {
  const [patients, setPatients] = useState<Patient[]>(seedPatients);
  const [appointments, setAppointments] = useState<Appointment[]>(seedAppointments);
  const [invoices, setInvoices] = useState<Invoice[]>(seedInvoices);
  const [payments, setPayments] = useState<Payment[]>(seedPayments);

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

  const resetDemoData = useCallback(() => {
    setPatients(seedPatients);
    setAppointments(seedAppointments);
    setInvoices(seedInvoices);
    setPayments(seedPayments);
  }, []);

  const value = useMemo<ClinicState>(
    () => ({ patients, appointments, invoices, payments, setAppointmentStatus, addPayment, resetDemoData }),
    [patients, appointments, invoices, payments, setAppointmentStatus, addPayment, resetDemoData],
  );

  return <ClinicContext.Provider value={value}>{children}</ClinicContext.Provider>;
}

export function useClinic(): ClinicState {
  const context = useContext(ClinicContext);
  if (!context) throw new Error("useClinic must be used inside a ClinicProvider");
  return context;
}

export function usePatientLookup() {
  const { patients } = useClinic();
  return useCallback((id: string) => patients.find((patient) => patient.id === id), [patients]);
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
