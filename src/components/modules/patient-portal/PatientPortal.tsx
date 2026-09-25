import { useLocation } from "@tanstack/react-router";
import { CalendarDays, FileText, Receipt, Stethoscope, Users } from "lucide-react";
import { StatCard } from "@/components/shared/StatCard";
import { PanelCard } from "@/components/shared/PanelCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { useClinic, useDiagnosesForPatient, useTreatmentPlansForPatient, usePrescriptionsForPatient, invoiceTotal } from "@/lib/demo/store";
import { ksh } from "@/lib/demo/format";

export function PatientPortal() {
  const location = useLocation();
  const moduleSlug = location.pathname.split("/").pop() || "";

  // For demo, using Amina (PAT-005)
  const patientId = "PAT-005";
  const { patients, appointments, invoices, prescriptions } = useClinic();
  const patient = patients.find((p) => p.id === patientId);
  const myAppointments = appointments.filter((a) => a.patientId === patientId);
  const myInvoices = invoices.filter((inv) => inv.patientId === patientId);
  const myPrescriptions = usePrescriptionsForPatient(patientId);
  const diagnoses = useDiagnosesForPatient(patientId);
  const treatmentPlans = useTreatmentPlansForPatient(patientId);

  // Dashboard view
  if (moduleSlug === "patient" || moduleSlug === "") {
    const nextAppointment = myAppointments.find((a) => a.status === "SCHEDULED" || a.status === "CONFIRMED");
    const totalPaid = myInvoices.reduce((sum, inv) => sum + inv.amountPaid, 0);
    const totalDue = myInvoices.reduce((sum, inv) => {
      const total = invoiceTotal(inv);
      return sum + (total - inv.amountPaid);
    }, 0);

    return (
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="rounded-lg bg-gradient-to-r from-brand to-brand/80 p-6 text-white">
          <h1 className="text-2xl font-bold">Welcome back, {patient?.name}</h1>
          <p className="mt-2">Your health records and appointment information</p>
        </div>

        {/* Stats */}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="My Appointments" value={String(myAppointments.length)} hint="Total scheduled" icon={CalendarDays} />
          <StatCard label="Active Treatments" value={String(treatmentPlans.filter(tp => tp.status === "IN_PROGRESS").length)} hint="In progress" icon={Stethoscope} iconTone="bg-info-soft text-info" />
          <StatCard label="Total Paid" value={ksh(totalPaid)} hint="Lifetime payments" icon={Receipt} iconTone="bg-success-soft text-success" />
          <StatCard label="Balance Due" value={ksh(totalDue)} hint="Outstanding" icon={Users} iconTone="bg-warning-soft text-warning-foreground" />
        </div>

        {/* Next Appointment */}
        {nextAppointment && (
          <PanelCard title="Next Appointment" subtitle="Your upcoming visit">
            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div>
                <p className="font-semibold text-heading">{nextAppointment.date}</p>
                <p className="text-sm text-muted-foreground">{nextAppointment.time}</p>
              </div>
              <StatusBadge status={nextAppointment.status} />
            </div>
          </PanelCard>
        )}

        {/* Recent Activity */}
        <div className="grid gap-5 lg:grid-cols-2">
          <PanelCard title="Recent Prescriptions" subtitle="Latest medications">
            {myPrescriptions.length === 0 ? (
              <p className="text-sm text-muted-foreground">No prescriptions yet.</p>
            ) : (
              <div className="space-y-2">
                {myPrescriptions.slice(0, 3).map((prescription) => (
                  <div key={prescription.id} className="rounded-lg border border-border p-3">
                    <p className="font-medium text-heading">{prescription.medication}</p>
                    <p className="text-xs text-muted-foreground">{prescription.dosage} - {prescription.frequency}</p>
                  </div>
                ))}
              </div>
            )}
          </PanelCard>

          <PanelCard title="Account Summary" subtitle="Financial overview">
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg bg-secondary p-3">
                <span className="text-muted-foreground">Total Invoices</span>
                <span className="font-semibold text-heading">{myInvoices.length}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-success-soft/20 p-3">
                <span className="text-success">Paid</span>
                <span className="font-semibold text-success">{ksh(totalPaid)}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-warning-soft/20 p-3">
                <span className="text-warning-foreground">Due</span>
                <span className="font-semibold text-warning-foreground">{ksh(totalDue)}</span>
              </div>
            </div>
          </PanelCard>
        </div>
      </div>
    );
  }

  // Appointments view
  if (moduleSlug === "appointments") {
    return (
      <PanelCard title="My Appointments" subtitle="All scheduled and completed appointments">
        {myAppointments.length === 0 ? (
          <p className="text-sm text-muted-foreground">No appointments scheduled.</p>
        ) : (
          <div className="space-y-3">
            {myAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between rounded-lg border border-border p-4">
                <div>
                  <p className="font-semibold text-heading">{appointment.date}</p>
                  <p className="text-sm text-muted-foreground">{appointment.time}</p>
                </div>
                <StatusBadge status={appointment.status} />
              </div>
            ))}
          </div>
        )}
      </PanelCard>
    );
  }

  // Treatment view
  if (moduleSlug === "treatment") {
    return (
      <div className="space-y-6">
        <PanelCard title="My Diagnoses" subtitle="Clinical diagnoses">
          {diagnoses.length === 0 ? (
            <p className="text-sm text-muted-foreground">No diagnoses recorded.</p>
          ) : (
            <div className="space-y-3">
              {diagnoses.map((diagnosis) => (
                <div key={diagnosis.id} className="rounded-lg border border-border p-4">
                  <h4 className="font-semibold text-heading">{diagnosis.condition}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{diagnosis.description}</p>
                </div>
              ))}
            </div>
          )}
        </PanelCard>

        <PanelCard title="My Treatment Plans" subtitle="Active and completed treatments">
          {treatmentPlans.length === 0 ? (
            <p className="text-sm text-muted-foreground">No treatment plans.</p>
          ) : (
            <div className="space-y-3">
              {treatmentPlans.map((plan) => (
                <div key={plan.id} className="rounded-lg border border-border p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-heading">{plan.procedure}</h4>
                      <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
                    </div>
                    <span className={`rounded-full px-2 py-1 text-xs font-semibold ${plan.status === "COMPLETED" ? "bg-success-soft text-success" : "bg-info-soft text-info"
                      }`}>
                      {plan.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </PanelCard>
      </div>
    );
  }

  // Prescriptions view
  if (moduleSlug === "prescriptions") {
    return (
      <PanelCard title="My Prescriptions" subtitle="All prescribed medications">
        {myPrescriptions.length === 0 ? (
          <p className="text-sm text-muted-foreground">No prescriptions yet.</p>
        ) : (
          <div className="space-y-4">
            {myPrescriptions.map((prescription) => (
              <div key={prescription.id} className="rounded-lg border border-border p-4">
                <h4 className="font-semibold text-heading">{prescription.medication}</h4>
                <p className="mt-1 text-sm text-muted-foreground">{prescription.dosage}</p>
                <p className="text-sm text-muted-foreground">{prescription.frequency} for {prescription.duration}</p>
                <p className="mt-2 text-xs text-muted-foreground">Instructions: {prescription.instructions}</p>
              </div>
            ))}
          </div>
        )}
      </PanelCard>
    );
  }

  // Invoices view
  if (moduleSlug === "invoices") {
    return (
      <PanelCard title="My Invoices" subtitle="Billing records">
        {myInvoices.length === 0 ? (
          <p className="text-sm text-muted-foreground">No invoices yet.</p>
        ) : (
          <div className="space-y-3">
            {myInvoices.map((invoice) => {
              const total = invoiceTotal(invoice);
              const balance = total - invoice.amountPaid;
              return (
                <div key={invoice.id} className="rounded-lg border border-border p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-heading">{invoice.number}</p>
                      <p className="text-sm text-muted-foreground">{invoice.date}</p>
                      <p className="mt-2 text-sm">Total: {ksh(total)}</p>
                      <p className="text-sm">Balance: {ksh(balance)}</p>
                    </div>
                    <StatusBadge status={invoice.status} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </PanelCard>
    );
  }

  // Default stub for other modules
  return (
    <PanelCard title={moduleSlug.replace("-", " ").toUpperCase()} subtitle="Patient portal module">
      <p className="text-sm text-muted-foreground">This module is available in the patient portal.</p>
    </PanelCard>
  );
}
