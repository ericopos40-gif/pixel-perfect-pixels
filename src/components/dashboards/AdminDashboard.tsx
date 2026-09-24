import { Link } from "@tanstack/react-router";
import { CalendarDays, CalendarPlus, FileBarChart, FilePlus2, Stethoscope, UserPlus, Users, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/shared/StatCard";
import { PanelCard, EmptyState } from "@/components/shared/PanelCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { DonutChart, GroupedBarChart, TrendLineChart } from "./charts";
import { activities, adminAppointmentsOverview, monthlyRevenue, patientsByService } from "@/lib/demo/data";
import { countOf, ksh } from "@/lib/demo/format";
import { serviceById, staffById, useClinic } from "@/lib/demo/store";

export function AdminDashboard() {
  const { appointments, patients } = useClinic();
  const today = appointments;
  const upcoming = today.filter((item) => item.status === "SCHEDULED" || item.status === "CONFIRMED");

  return (
    <div className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Patients" value={countOf(12480)} hint="+248 this month" hintTone="success" icon={Users} />
        <StatCard
          label="Today's Appointments"
          value="28"
          hint={`${today.length} in this clinic's live schedule`}
          icon={CalendarDays}
          iconTone="bg-violet-soft text-violet"
        />
        <StatCard
          label="Total Revenue"
          value={ksh(245680)}
          hint="+12.4% vs last month"
          hintTone="success"
          icon={Wallet}
          iconTone="bg-success-soft text-success"
        />
        <StatCard
          label="Active Doctors"
          value="5"
          hint="4 available, 1 on leave"
          icon={Stethoscope}
          iconTone="bg-warning-soft text-warning-foreground"
        />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.4fr_1fr]">
        <PanelCard title="Appointments Overview" subtitle="Completed, scheduled and cancelled over the past week">
          <GroupedBarChart
            data={adminAppointmentsOverview}
            series={[
              { key: "completed", label: "Completed", color: "var(--chart-2)" },
              { key: "scheduled", label: "Scheduled", color: "var(--chart-1)" },
              { key: "cancelled", label: "Cancelled", color: "var(--chart-4)" },
            ]}
          />
        </PanelCard>
        <PanelCard title="Patients by Service" subtitle="Share of visits by treatment area">
          <DonutChart data={patientsByService} />
        </PanelCard>
      </div>

      <PanelCard title="Monthly Revenue" subtitle="Collected revenue for 2025 (KSh)">
        <TrendLineChart
          data={monthlyRevenue}
          series={[{ key: "revenue", label: "Revenue", color: "var(--chart-1)" }]}
        />
      </PanelCard>

      <div className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <PanelCard
          title="Recent Appointments"
          subtitle="Today's schedule across all dentists"
          action={
            <Button asChild variant="outline" size="sm">
              <Link to="/workspace/$role/$module" params={{ role: "admin", module: "appointments" }}>
                View all
              </Link>
            </Button>
          }
          bodyClassName="p-0"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-150 text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs tracking-wide text-muted-foreground uppercase">
                  <th className="px-5 py-3 font-semibold">Patient</th>
                  <th className="px-5 py-3 font-semibold">Time</th>
                  <th className="px-5 py-3 font-semibold">Doctor</th>
                  <th className="px-5 py-3 font-semibold">Service</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {today.map((appointment) => {
                  const patient = patients.find((item) => item.id === appointment.patientId);
                  return (
                    <tr key={appointment.id} className="border-b border-border last:border-0">
                      <td className="px-5 py-3 font-medium text-heading">{patient?.name}</td>
                      <td className="px-5 py-3 text-muted-foreground">{appointment.time}</td>
                      <td className="px-5 py-3 text-muted-foreground">{staffById(appointment.dentistId)?.name}</td>
                      <td className="px-5 py-3 text-muted-foreground">{serviceById(appointment.serviceId)?.name}</td>
                      <td className="px-5 py-3">
                        <StatusBadge status={appointment.status} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </PanelCard>

        <div className="space-y-5">
          <PanelCard title="Next Appointments" subtitle="Waiting to be seen">
            {upcoming.length === 0 ? (
              <EmptyState message="No upcoming appointments left today." />
            ) : (
              <ul className="space-y-3">
                {upcoming.slice(0, 3).map((appointment) => {
                  const patient = patients.find((item) => item.id === appointment.patientId);
                  return (
                    <li key={appointment.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
                      <span
                        className={`flex size-10 items-center justify-center rounded-full text-xs font-bold ${patient?.avatarTone}`}
                      >
                        {patient?.initials}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-heading">{patient?.name}</span>
                        <span className="block text-xs text-muted-foreground">
                          {appointment.time} · {serviceById(appointment.serviceId)?.name}
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </PanelCard>

          <PanelCard title="Quick Actions">
            <div className="grid grid-cols-2 gap-3">
              <QuickAction to="appointments" icon={CalendarPlus} label="Book Appointment" />
              <QuickAction to="patients" icon={UserPlus} label="Add Patient" />
              <QuickAction to="records" icon={FilePlus2} label="Update Records" />
              <QuickAction to="reports" icon={FileBarChart} label="Generate Report" />
            </div>
          </PanelCard>

          <PanelCard title="Recent Activity">
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
    </div>
  );
}

function QuickAction({
  to,
  icon: Icon,
  label,
}: {
  to: string;
  icon: typeof CalendarPlus;
  label: string;
}) {
  return (
    <Link
      to="/workspace/$role/$module"
      params={{ role: "admin", module: to }}
      className="flex flex-col items-center gap-2 rounded-lg border border-border p-4 text-center text-xs font-semibold text-heading transition-colors hover:border-brand hover:bg-brand-soft"
    >
      <Icon className="size-5 text-brand" />
      {label}
    </Link>
  );
}
