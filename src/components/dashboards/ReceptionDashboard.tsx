import { useMemo } from "react";
import { toast } from "sonner";
import { CalendarCheck, CheckCircle2, Clock3, Users, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/shared/StatCard";
import { EmptyState, PanelCard } from "@/components/shared/PanelCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { activities, DEMO_TODAY_LABEL, services } from "@/lib/demo/data";
import { ksh } from "@/lib/demo/format";
import { serviceById, staffById, useClinic } from "@/lib/demo/store";
import type { AppointmentStatus } from "@/lib/demo/types";

const QUEUE_ORDER: AppointmentStatus[] = ["IN_ROOM", "WITH_NURSE", "WAITING", "CHECKED_IN", "CONFIRMED", "SCHEDULED"];

export function ReceptionDashboard() {
  const { appointments, patients, invoices, setAppointmentStatus } = useClinic();

  const checkedIn = appointments.filter((item) =>
    ["CHECKED_IN", "WAITING", "WITH_NURSE", "IN_ROOM", "COMPLETED"].includes(item.status),
  );
  const waiting = appointments.filter((item) => item.status === "WAITING");
  const completed = appointments.filter((item) => item.status === "COMPLETED");
  const todaysRevenue = invoices
    .filter((invoice) => invoice.date === "2025-09-20")
    .reduce((sum, invoice) => sum + invoice.amountPaid, 0);

  const queue = useMemo(
    () =>
      [...appointments]
        .filter((item) => item.status !== "COMPLETED" && item.status !== "CANCELLED")
        .sort((a, b) => QUEUE_ORDER.indexOf(a.status) - QUEUE_ORDER.indexOf(b.status))
        .slice(0, 5),
    [appointments],
  );

  const serviceCounts = services
    .map((service) => ({
      name: service.category,
      count: appointments.filter((item) => item.serviceId === service.id).length,
    }))
    .reduce<Record<string, number>>((acc, item) => {
      acc[item.name] = (acc[item.name] ?? 0) + item.count;
      return acc;
    }, {});

  function advance(id: string, status: AppointmentStatus, patientName: string) {
    setAppointmentStatus(id, status);
    toast.success(
      status === "CHECKED_IN" ? `${patientName} checked in` : `${patientName} moved to ${status.toLowerCase().replace("_", " ")}`,
      { description: "The clinical team sees this change immediately." },
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Today's Appointments" value={String(appointments.length)} hint={DEMO_TODAY_LABEL} icon={CalendarCheck} />
        <StatCard
          label="Checked In"
          value={String(checkedIn.length)}
          hint="Patients already in the clinic"
          icon={CheckCircle2}
          iconTone="bg-success-soft text-success"
        />
        <StatCard
          label="Waiting Now"
          value={String(waiting.length)}
          hint="In the waiting room"
          icon={Clock3}
          iconTone="bg-warning-soft text-warning-foreground"
        />
        <StatCard
          label="Today's Revenue"
          value={ksh(todaysRevenue)}
          hint={`${completed.length} completed visits`}
          icon={Wallet}
          iconTone="bg-violet-soft text-violet"
        />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        <PanelCard title="Today's Appointments" subtitle="Move patients through the visit from here" bodyClassName="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-175 text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs tracking-wide text-muted-foreground uppercase">
                  <th className="px-5 py-3 font-semibold">Time</th>
                  <th className="px-5 py-3 font-semibold">Patient</th>
                  <th className="px-5 py-3 font-semibold">Service</th>
                  <th className="px-5 py-3 font-semibold">Doctor</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 text-right font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => {
                  const patient = patients.find((item) => item.id === appointment.patientId);
                  const next: AppointmentStatus | null =
                    appointment.status === "SCHEDULED" || appointment.status === "CONFIRMED"
                      ? "CHECKED_IN"
                      : appointment.status === "CHECKED_IN"
                        ? "WAITING"
                        : appointment.status === "WAITING"
                          ? "WITH_NURSE"
                          : appointment.status === "WITH_NURSE"
                            ? "IN_ROOM"
                            : appointment.status === "IN_ROOM"
                              ? "COMPLETED"
                              : null;
                  return (
                    <tr key={appointment.id} className="border-b border-border last:border-0">
                      <td className="px-5 py-3 font-medium text-heading">{appointment.time}</td>
                      <td className="px-5 py-3">
                        <span className="font-medium text-heading">{patient?.name}</span>
                        <span className="block text-xs text-muted-foreground">{patient?.phone}</span>
                      </td>
                      <td className="px-5 py-3 text-muted-foreground">{serviceById(appointment.serviceId)?.name}</td>
                      <td className="px-5 py-3 text-muted-foreground">{staffById(appointment.dentistId)?.name}</td>
                      <td className="px-5 py-3">
                        <StatusBadge status={appointment.status} />
                      </td>
                      <td className="px-5 py-3 text-right">
                        {next ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => advance(appointment.id, next, patient?.name ?? "Patient")}
                          >
                            {next === "CHECKED_IN" ? "Check in" : next === "COMPLETED" ? "Complete" : "Move on"}
                          </Button>
                        ) : (
                          <span className="text-xs text-muted-foreground">Done</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </PanelCard>

        <div className="space-y-5">
          <PanelCard title="Patient Queue" subtitle="Ordered by where each patient is now">
            {queue.length === 0 ? (
              <EmptyState message="The queue is clear." />
            ) : (
              <ul className="space-y-3">
                {queue.map((appointment, index) => {
                  const patient = patients.find((item) => item.id === appointment.patientId);
                  return (
                    <li key={appointment.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
                      <span className="flex size-7 items-center justify-center rounded-full bg-secondary text-xs font-bold text-heading">
                        {index + 1}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-heading">{patient?.name}</span>
                        <span className="block text-xs text-muted-foreground">{appointment.time}</span>
                      </span>
                      <StatusBadge status={appointment.status} />
                    </li>
                  );
                })}
              </ul>
            )}
          </PanelCard>

          <PanelCard title="Today's Services" subtitle="Visits by treatment area">
            <ul className="space-y-2.5">
              {Object.entries(serviceCounts)
                .filter(([, count]) => count > 0)
                .map(([name, count]) => (
                  <li key={name} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{name}</span>
                    <span className="font-semibold text-heading">{count}</span>
                  </li>
                ))}
            </ul>
          </PanelCard>

          <PanelCard title="Recent Activities">
            <ul className="space-y-3">
              {activities.map((entry) => (
                <li key={entry.id} className="flex gap-3">
                  <span className={`mt-1 size-2.5 shrink-0 rounded-full ${entry.tone}`} />
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-heading">{entry.message}</span>
                    <span className="block text-xs text-muted-foreground">
                      {entry.detail} · {entry.time}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </PanelCard>
        </div>
      </div>

      <PanelCard title="Recent Patients" subtitle="Most recently seen at the front desk" bodyClassName="p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-150 text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs tracking-wide text-muted-foreground uppercase">
                <th className="px-5 py-3 font-semibold">Patient</th>
                <th className="px-5 py-3 font-semibold">Patient ID</th>
                <th className="px-5 py-3 font-semibold">Phone</th>
                <th className="px-5 py-3 font-semibold">Last Visit</th>
                <th className="px-5 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {patients.slice(0, 6).map((patient) => (
                <tr key={patient.id} className="border-b border-border last:border-0">
                  <td className="px-5 py-3">
                    <span className="flex items-center gap-3">
                      <span className={`flex size-9 items-center justify-center rounded-full text-xs font-bold ${patient.avatarTone}`}>
                        {patient.initials}
                      </span>
                      <span className="font-medium text-heading">{patient.name}</span>
                    </span>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{patient.code}</td>
                  <td className="px-5 py-3 text-muted-foreground">{patient.phone}</td>
                  <td className="px-5 py-3 text-muted-foreground">{patient.lastVisit}</td>
                  <td className="px-5 py-3">
                    <StatusBadge status={patient.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PanelCard>

      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Users className="size-3.5" /> {patients.length} patients in the demonstration data set.
      </div>
    </div>
  );
}
