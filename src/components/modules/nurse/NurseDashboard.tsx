import { CheckCircle2, Clock, Users, Activity, Heart } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { StatCard } from "@/components/shared/StatCard";
import { PanelCard, EmptyState } from "@/components/shared/PanelCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { useClinicStore, staffById } from "@/lib/demo/store";

export function NurseDashboard() {
  const { appointments, patients, vitals } = useClinicStore();
  const waiting = appointments.filter((a) => ["CHECKED_IN", "WAITING"].includes(a.status));
  const withNurse = appointments.filter((a) => a.status === "WITH_NURSE");
  const readyForDentist = appointments.filter((a) => a.status === "WITH_NURSE" || a.status === "IN_ROOM");

  // Get patients with vitals recorded today
  const patientsWithVitalsToday = vitals.filter(v => {
    const vitalDate = new Date(v.recordedAt);
    const today = new Date();
    return vitalDate.toDateString() === today.toDateString();
  }).length;

  return (
    <div className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-4">
        <StatCard label="Waiting Now" value={String(waiting.length)} hint="Ready for vitals" icon={Clock} />
        <StatCard label="With Nurse" value={String(withNurse.length)} hint="Recording vitals" icon={Users} iconTone="bg-info-soft text-info" />
        <StatCard
          label="Ready for Dentist"
          value={String(readyForDentist.length)}
          hint="Vitals complete"
          icon={CheckCircle2}
          iconTone="bg-success-soft text-success"
        />
        <StatCard
          label="Vitals Recorded"
          value={String(patientsWithVitalsToday)}
          hint="Today"
          icon={Activity}
          iconTone="bg-purple-100 text-purple-600"
        />
      </div>

      <PanelCard
        title="Waiting Room"
        subtitle="Patients checked in, awaiting vitals"
        action={
          <Link
            to="/workspace/$role/$module"
            params={{ role: "nurse", module: "waiting-room" }}
            className="text-xs font-medium text-brand hover:underline"
          >
            View all
          </Link>
        }
        bodyClassName="p-0"
      >
        {waiting.length === 0 ? (
          <div className="p-5">
            <EmptyState message="No patients waiting currently." />
          </div>
        ) : (
          <div className="space-y-0 divide-y divide-border">
            {waiting.slice(0, 5).map((appointment) => {
              const patient = patients.find((p) => p.id === appointment.patientId);
              const patientVitals = vitals.find(v => v.patientId === appointment.patientId);
              const hasVitals = !!patientVitals;

              return (
                <div key={appointment.id} className="flex items-center justify-between px-5 py-4 hover:bg-secondary/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Link
                        to="/workspace/$role/$module"
                        params={{ role: "nurse", module: "patient-detail" }}
                        className="font-medium text-brand hover:underline"
                      >
                        {patient?.name}
                      </Link>
                      {hasVitals && (
                        <Badge className="bg-green-100 text-green-700 text-xs">
                          <Heart className="w-3 h-3 mr-1" />
                          Vitals Recorded
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">Checked in at {appointment.time}</p>
                    {patient?.allergies && patient.allergies.length > 0 && (
                      <p className="text-xs text-orange-600 mt-1">⚠️ Allergies: {patient.allergies.join(", ")}</p>
                    )}
                  </div>
                  <Link
                    to="/workspace/$role/$module"
                    params={{ role: "nurse", module: "vitals" }}
                    className="rounded-lg border border-brand bg-brand-soft px-3 py-1.5 text-xs font-medium text-brand hover:bg-brand hover:text-white transition-colors"
                  >
                    {hasVitals ? "Update Vitals" : "Record Vitals"}
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </PanelCard>

      <div className="grid gap-5 lg:grid-cols-2">
        <PanelCard title="Patients Ready for Dentist" subtitle="Vitals recorded, waiting for dentist">
          {readyForDentist.length === 0 ? (
            <EmptyState message="No patients ready for dentist yet." />
          ) : (
            <ul className="space-y-2">
              {readyForDentist.map((appointment) => {
                const patient = patients.find((p) => p.id === appointment.patientId);
                const dentist = staffById(appointment.dentistId);
                const patientVitals = vitals.find(v => v.patientId === appointment.patientId);

                return (
                  <li key={appointment.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                    <div className="flex-1">
                      <p className="font-medium text-heading">{patient?.name}</p>
                      <p className="text-xs text-muted-foreground">With {dentist?.name}</p>
                      {patientVitals && (
                        <div className="flex gap-3 mt-2 text-xs text-gray-600">
                          <span>BP: {patientVitals.bloodPressure}</span>
                          <span>HR: {patientVitals.heartRate} bpm</span>
                          <span>Temp: {patientVitals.temperature}°C</span>
                        </div>
                      )}
                    </div>
                    <StatusBadge status={appointment.status} />
                  </li>
                );
              })}
            </ul>
          )}
        </PanelCard>

        <PanelCard title="Today's Summary" subtitle="Patient flow overview">
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between rounded-lg bg-secondary p-3">
              <span className="text-muted-foreground">Total Checked In</span>
              <span className="font-semibold text-heading">{waiting.length + readyForDentist.length}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-secondary p-3">
              <span className="text-muted-foreground">Vitals Still Needed</span>
              <span className="font-semibold text-heading">{waiting.filter(a => {
                const hasVitals = vitals.some(v => v.patientId === a.patientId);
                return !hasVitals;
              }).length}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-secondary p-3">
              <span className="text-muted-foreground">Ready for Treatment</span>
              <span className="font-semibold text-heading">{readyForDentist.length}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-green-50 p-3 border border-green-200">
              <span className="text-green-700 font-medium">Vitals Completed Today</span>
              <span className="font-bold text-green-700">{patientsWithVitalsToday}</span>
            </div>
          </div>
        </PanelCard>
      </div>
    </div>
  );
}
