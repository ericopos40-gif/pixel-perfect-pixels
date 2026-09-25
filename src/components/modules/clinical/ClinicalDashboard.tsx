import { CalendarDays, Clock, Stethoscope, Users } from "lucide-react";
import { StatCard } from "@/components/shared/StatCard";
import { PanelCard, EmptyState } from "@/components/shared/PanelCard";
import { countOf } from "@/lib/demo/format";
import { useClinic } from "@/lib/demo/store";

export function ClinicalDashboard() {
  const { appointments, treatmentPlans } = useClinic();
  const todayAppointments = appointments.filter((a) => a.date === "2025-09-20");
  const myAppointments = todayAppointments.filter((a) => a.dentistId === "STF-002"); // Dr. Sarah Kimani

  return (
    <div className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Today's Appointments" value={String(myAppointments.length)} hint="Scheduled visits" icon={CalendarDays} />
        <StatCard
          label="Active Treatment Plans"
          value={String(treatmentPlans.filter((tp) => tp.status === "IN_PROGRESS").length)}
          hint="In progress"
          icon={Stethoscope}
          iconTone="bg-info-soft text-info"
        />
        <StatCard label="Patients Waiting" value="1" hint="In the waiting room" icon={Clock} iconTone="bg-warning-soft text-warning-foreground" />
        <StatCard label="Total Patients" value={countOf(1200)} hint="Under my care" icon={Users} iconTone="bg-success-soft text-success" />
      </div>

      <PanelCard title="Quick Actions" subtitle="Common tasks for today">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-border p-4 text-center text-sm font-medium text-muted-foreground">Patient Records</div>
          <div className="rounded-lg border border-border p-4 text-center text-sm font-medium text-muted-foreground">Dental Chart</div>
          <div className="rounded-lg border border-border p-4 text-center text-sm font-medium text-muted-foreground">Treatment Plan</div>
        </div>
      </PanelCard>

      <PanelCard title="Recent Activity" subtitle="Latest clinical actions">
        <EmptyState message="Activity will appear here as you work with patients." />
      </PanelCard>
    </div>
  );
}
