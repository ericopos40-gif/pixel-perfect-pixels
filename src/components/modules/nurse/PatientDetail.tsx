import { PanelCard } from "@/components/shared/PanelCard";
import { useClinic, useVitalsForPatient } from "@/lib/demo/store";

export function PatientDetail() {
  // For demo, using the golden patient (Amina - PAT-005)
  const patientId = "PAT-005";
  const { patients } = useClinic();
  const patient = patients.find((p) => p.id === patientId);
  const vitalsHistory = useVitalsForPatient(patientId)();

  if (!patient) {
    return <PanelCard title="Patient Not Found">Patient record not available.</PanelCard>;
  }

  const latestVitals = vitalsHistory[0];

  return (
    <div className="space-y-6">
      {/* Patient Header */}
      <PanelCard>
        <div className="flex items-start gap-4">
          <div className={`flex size-16 items-center justify-center rounded-lg text-2xl font-bold ${patient.avatarTone}`}>
            {patient.initials}
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-heading">{patient.name}</h2>
            <p className="text-sm text-muted-foreground">{patient.code}</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              <div>
                <span className="text-xs text-muted-foreground">Phone</span>
                <p className="font-medium">{patient.phone}</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">Gender</span>
                <p className="font-medium">{patient.gender}</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">Blood Group</span>
                <p className="font-medium">{patient.bloodGroup}</p>
              </div>
            </div>
            {patient.allergies.length > 0 && (
              <div className="mt-3 rounded-lg bg-warning-soft p-3">
                <p className="text-xs font-semibold text-warning-foreground">⚠️ Allergies: {patient.allergies.join(", ")}</p>
              </div>
            )}
          </div>
        </div>
      </PanelCard>

      {/* Latest Vitals */}
      {latestVitals && (
        <PanelCard title="Current Vitals" subtitle={`Recorded at ${latestVitals.time} on ${latestVitals.date}`}>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            <div className="rounded-lg bg-secondary p-4">
              <span className="block text-xs text-muted-foreground">Blood Pressure</span>
              <span className="mt-2 block text-2xl font-bold text-heading">{latestVitals.bloodPressure}</span>
              <span className="text-xs text-muted-foreground">mmHg</span>
            </div>
            <div className="rounded-lg bg-secondary p-4">
              <span className="block text-xs text-muted-foreground">Heart Rate</span>
              <span className="mt-2 block text-2xl font-bold text-heading">{latestVitals.heartRate}</span>
              <span className="text-xs text-muted-foreground">bpm</span>
            </div>
            <div className="rounded-lg bg-secondary p-4">
              <span className="block text-xs text-muted-foreground">Temperature</span>
              <span className="mt-2 block text-2xl font-bold text-heading">{latestVitals.temperature}</span>
              <span className="text-xs text-muted-foreground">°C</span>
            </div>
            <div className="rounded-lg bg-secondary p-4">
              <span className="block text-xs text-muted-foreground">O2 Saturation</span>
              <span className="mt-2 block text-2xl font-bold text-heading">{latestVitals.oxygenSaturation}%</span>
              <span className="text-xs text-muted-foreground">SpO2</span>
            </div>
            <div className="rounded-lg bg-secondary p-4">
              <span className="block text-xs text-muted-foreground">Respiratory Rate</span>
              <span className="mt-2 block text-2xl font-bold text-heading">{latestVitals.respiratoryRate}</span>
              <span className="text-xs text-muted-foreground">breaths/min</span>
            </div>
            <div className="rounded-lg bg-secondary p-4">
              <span className="block text-xs text-muted-foreground">Weight / Height</span>
              <span className="mt-2 block text-2xl font-bold text-heading">{latestVitals.weight}kg / {latestVitals.height}cm</span>
              <span className="text-xs text-muted-foreground">BMI</span>
            </div>
            <div className="rounded-lg bg-secondary p-4">
              <span className="block text-xs text-muted-foreground">Pain Score</span>
              <span className="mt-2 block text-2xl font-bold text-heading">{latestVitals.painScore} / 10</span>
              <span className="text-xs text-muted-foreground">Reported</span>
            </div>
            <div className="rounded-lg bg-secondary p-4">
              <span className="block text-xs text-muted-foreground">Status</span>
              <span className="mt-2 inline-flex rounded-full bg-success-soft px-2 py-1 text-xs font-semibold text-success">
                Ready
              </span>
            </div>
          </div>
          {latestVitals.notes && (
            <div className="mt-4 rounded-lg bg-secondary p-3">
              <p className="text-xs font-semibold text-muted-foreground">Nurse Notes:</p>
              <p className="mt-1 text-sm text-muted-foreground">{latestVitals.notes}</p>
            </div>
          )}
        </PanelCard>
      )}

      {/* Medical Alerts */}
      {patient.conditions.length > 0 && (
        <PanelCard title="Medical History" subtitle="Known conditions">
          <ul className="space-y-2">
            {patient.conditions.map((condition) => (
              <li key={condition} className="rounded-lg bg-warning-soft/20 p-2 text-sm text-warning-foreground">
                {condition}
              </li>
            ))}
          </ul>
        </PanelCard>
      )}
    </div>
  );
}
