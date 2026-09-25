import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PanelCard } from "@/components/shared/PanelCard";
import { useClinic, useDiagnosesForPatient, useTreatmentPlansForPatient, usePrescriptionsForPatient, useDentalChartForPatient } from "@/lib/demo/store";

export function PatientDetail() {
  // For demo, using the golden patient (Amina - PAT-005)
  const patientId = "PAT-005";
  const { patients } = useClinic();
  const patient = patients.find((p) => p.id === patientId);
  const diagnoses = useDiagnosesForPatient(patientId);
  const treatmentPlans = useTreatmentPlansForPatient(patientId);
  const prescriptions = usePrescriptionsForPatient(patientId);
  const dentalChart = useDentalChartForPatient(patientId);

  if (!patient) {
    return <PanelCard title="Patient Not Found">Patient record not available.</PanelCard>;
  }

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

      {/* Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 sm:grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="dental-chart">Dental Chart</TabsTrigger>
          <TabsTrigger value="diagnoses">Diagnoses</TabsTrigger>
          <TabsTrigger value="treatment">Treatment</TabsTrigger>
          <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <PanelCard title="Medical History" subtitle="Known conditions and alerts">
              {patient.conditions.length === 0 ? (
                <p className="text-sm text-muted-foreground">No known conditions.</p>
              ) : (
                <ul className="space-y-2">
                  {patient.conditions.map((condition) => (
                    <li key={condition} className="text-sm">
                      {condition}
                    </li>
                  ))}
                </ul>
              )}
            </PanelCard>

            <PanelCard title="Visit History" subtitle="Recent visits">
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Last Visit:</span>
                  <p className="font-medium">{patient.lastVisit}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Registered:</span>
                  <p className="font-medium">{patient.registeredOn}</p>
                </div>
              </div>
            </PanelCard>
          </div>
        </TabsContent>

        {/* Dental Chart Tab */}
        <TabsContent value="dental-chart" className="space-y-5">
          <PanelCard title="Dental Chart" subtitle="Teeth conditions and history">
            {dentalChart ? (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Last updated: {dentalChart.lastUpdated}</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {Object.entries(dentalChart.teeth).map(([, tooth]) => (
                    <div key={tooth.toothNumber} className="rounded-lg border border-border p-3">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">Tooth {tooth.toothNumber}</span>
                        <span className={`rounded-full px-2 py-1 text-xs font-semibold ${tooth.condition === "HEALTHY" ? "bg-success-soft text-success" : "bg-warning-soft text-warning-foreground"
                          }`}>
                          {tooth.condition}
                        </span>
                      </div>
                      {tooth.notes && <p className="mt-2 text-xs text-muted-foreground">{tooth.notes}</p>}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No dental chart available.</p>
            )}
          </PanelCard>
        </TabsContent>

        {/* Diagnoses Tab */}
        <TabsContent value="diagnoses" className="space-y-5">
          <PanelCard title="Diagnoses" subtitle="Clinical diagnoses">
            {diagnoses.length === 0 ? (
              <p className="text-sm text-muted-foreground">No diagnoses recorded.</p>
            ) : (
              <div className="space-y-3">
                {diagnoses.map((diagnosis) => (
                  <div key={diagnosis.id} className="rounded-lg border border-border p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-heading">{diagnosis.condition}</h4>
                        <p className="mt-1 text-sm text-muted-foreground">{diagnosis.description}</p>
                      </div>
                      <span className={`rounded-full px-2 py-1 text-xs font-semibold whitespace-nowrap ${diagnosis.status === "ACTIVE" ? "bg-info-soft text-info" : "bg-success-soft text-success"
                        }`}>
                        {diagnosis.status}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">Diagnosed: {diagnosis.date}</p>
                  </div>
                ))}
              </div>
            )}
          </PanelCard>
        </TabsContent>

        {/* Treatment Tab */}
        <TabsContent value="treatment" className="space-y-5">
          <PanelCard title="Treatment Plans" subtitle="Active and completed treatments">
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
                      <span className={`rounded-full px-2 py-1 text-xs font-semibold whitespace-nowrap ${plan.status === "COMPLETED" ? "bg-success-soft text-success" :
                          plan.status === "IN_PROGRESS" ? "bg-info-soft text-info" :
                            "bg-secondary text-muted-foreground"
                        }`}>
                        {plan.status}
                      </span>
                    </div>
                    <div className="mt-3 grid gap-2 text-xs text-muted-foreground sm:grid-cols-3">
                      <div>
                        <span>Estimated Cost:</span>
                        <p className="font-medium text-heading">KSh {plan.estimatedCost.toLocaleString()}</p>
                      </div>
                      <div>
                        <span>Sessions:</span>
                        <p className="font-medium text-heading">{plan.currentSession || 0} / {plan.estimatedSessions}</p>
                      </div>
                      <div>
                        <span>Created:</span>
                        <p className="font-medium text-heading">{plan.createdDate}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </PanelCard>
        </TabsContent>

        {/* Prescriptions Tab */}
        <TabsContent value="prescriptions" className="space-y-5">
          <PanelCard title="Prescriptions" subtitle="Issued prescriptions">
            {prescriptions.length === 0 ? (
              <p className="text-sm text-muted-foreground">No prescriptions.</p>
            ) : (
              <div className="space-y-3">
                {prescriptions.map((prescription) => (
                  <div key={prescription.id} className="rounded-lg border border-border p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-heading">{prescription.medication}</h4>
                        <p className="mt-1 text-sm text-muted-foreground">{prescription.dosage}</p>
                      </div>
                      <span className={`rounded-full px-2 py-1 text-xs font-semibold whitespace-nowrap ${prescription.status === "DISPENSED" ? "bg-success-soft text-success" :
                          prescription.status === "ISSUED" ? "bg-info-soft text-info" :
                            "bg-secondary text-muted-foreground"
                        }`}>
                        {prescription.status}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">{prescription.frequency} for {prescription.duration}</p>
                    <p className="mt-1 text-xs text-muted-foreground">Instructions: {prescription.instructions}</p>
                  </div>
                ))}
              </div>
            )}
          </PanelCard>
        </TabsContent>

        {/* Clinical Notes Tab */}
        <TabsContent value="notes" className="space-y-5">
          <PanelCard title="Clinical Notes" subtitle="Notes from treatments">
            {treatmentPlans.length > 0 && treatmentPlans[0].notes ? (
              <div className="space-y-3">
                {treatmentPlans.filter((tp) => tp.notes).map((plan) => (
                  <div key={plan.id} className="rounded-lg bg-secondary p-4">
                    <p className="text-sm font-medium text-heading">{plan.procedure}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{plan.notes}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No clinical notes available.</p>
            )}
          </PanelCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}
