import { Link } from "@tanstack/react-router";
import { PanelCard, EmptyState } from "@/components/shared/PanelCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { useClinic, staffById, serviceById } from "@/lib/demo/store";

export function ClinicalAppointments() {
  const { appointments, patients } = useClinic();
  const myAppointments = appointments.filter((a) => a.dentistId === "STF-002"); // Dr. Sarah Kimani
  const today = myAppointments.filter((a) => a.date === "2025-09-20");

  return (
    <div className="space-y-6">
      <PanelCard title="Today's Appointments" subtitle="All my appointments for today" bodyClassName="p-0">
        {today.length === 0 ? (
          <div className="p-5">
            <EmptyState message="No appointments scheduled for today." />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-200 text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs tracking-wide text-muted-foreground uppercase">
                  <th className="px-5 py-3 font-semibold">Time</th>
                  <th className="px-5 py-3 font-semibold">Patient</th>
                  <th className="px-5 py-3 font-semibold">Service</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {today.map((appointment) => {
                  const patient = patients.find((p) => p.id === appointment.patientId);
                  return (
                    <tr key={appointment.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                      <td className="px-5 py-3 font-medium">{appointment.time}</td>
                      <td className="px-5 py-3">
                        <Link
                          to="/workspace/$role/$module"
                          params={{ role: "clinical", module: "patient-detail" }}
                          className="text-brand hover:underline font-medium"
                        >
                          {patient?.name}
                        </Link>
                      </td>
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
        )}
      </PanelCard>

      <PanelCard title="All Appointments" subtitle="All my scheduled appointments">
        <div className="text-sm text-muted-foreground">{myAppointments.length} total appointments on record.</div>
      </PanelCard>
    </div>
  );
}
