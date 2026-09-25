import { Link } from "@tanstack/react-router";
import { PanelCard, EmptyState } from "@/components/shared/PanelCard";
import { useClinic } from "@/lib/demo/store";

export function WaitingRoom() {
  const { appointments, patients } = useClinic();
  const waiting = appointments.filter((a) => ["CHECKED_IN", "WAITING"].includes(a.status));

  return (
    <div className="space-y-6">
      <PanelCard title="Waiting Room" subtitle="Patients checked in, awaiting vitals">
        {waiting.length === 0 ? (
          <EmptyState message="No patients waiting currently." />
        ) : (
          <div className="space-y-3">
            {waiting.map((appointment) => {
              const patient = patients.find((p) => p.id === appointment.patientId);
              return (
                <div key={appointment.id} className="rounded-lg border border-border p-4 hover:bg-secondary/30 transition-colors">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className={`flex size-12 items-center justify-center rounded-full text-lg font-bold ${patient?.avatarTone}`}>
                        {patient?.initials}
                      </div>
                      <div>
                        <h3 className="font-semibold text-heading">{patient?.name}</h3>
                        <p className="text-sm text-muted-foreground">{patient?.code} • {patient?.phone}</p>
                      </div>
                    </div>
                    <Link
                      to="/workspace/$role/$module"
                      params={{ role: "nurse", module: "vitals" }}
                      className="rounded-lg border border-brand bg-brand-soft px-4 py-2 text-sm font-medium text-brand hover:bg-brand hover:text-white transition-colors"
                    >
                      Record Vitals
                    </Link>
                  </div>
                  {patient?.allergies.length ? (
                    <div className="mt-3 rounded-lg bg-warning-soft/20 p-2">
                      <p className="text-xs font-semibold text-warning-foreground">⚠️ Allergies: {patient.allergies.join(", ")}</p>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        )}
      </PanelCard>
    </div>
  );
}
