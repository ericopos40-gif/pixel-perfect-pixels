import { PanelCard } from "@/components/shared/PanelCard";
import { useClinic, usePrescriptionsForPatient } from "@/lib/demo/store";

export function Prescriptions() {
  // For demo, using the golden patient (Amina - PAT-005)
  const patientId = "PAT-005";
  const prescriptions = usePrescriptionsForPatient(patientId);

  return (
    <div className="space-y-6">
      <PanelCard title="Prescriptions" subtitle="All issued prescriptions">
        {prescriptions.length === 0 ? (
          <p className="text-sm text-muted-foreground">No prescriptions issued.</p>
        ) : (
          <div className="space-y-4">
            {prescriptions.map((prescription) => (
              <div key={prescription.id} className="rounded-lg border border-border p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-heading">{prescription.medication}</h3>
                    <p className="mt-1 text-sm font-medium text-muted-foreground">Rx: {prescription.prescriptionNumber}</p>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
                      <div>
                        <span className="block text-xs text-muted-foreground">Dosage</span>
                        <span className="mt-1 block font-medium text-heading">{prescription.dosage}</span>
                      </div>
                      <div>
                        <span className="block text-xs text-muted-foreground">Frequency</span>
                        <span className="mt-1 block font-medium text-heading">{prescription.frequency}</span>
                      </div>
                      <div>
                        <span className="block text-xs text-muted-foreground">Duration</span>
                        <span className="mt-1 block font-medium text-heading">{prescription.duration}</span>
                      </div>
                      <div>
                        <span className="block text-xs text-muted-foreground">Route</span>
                        <span className="mt-1 block font-medium text-heading">{prescription.route}</span>
                      </div>
                    </div>

                    <div className="mt-4 rounded-lg bg-secondary p-3">
                      <p className="text-xs font-semibold text-muted-foreground">Instructions:</p>
                      <p className="mt-1 text-sm text-muted-foreground">{prescription.instructions}</p>
                    </div>

                    <div className="mt-3 text-xs text-muted-foreground">
                      <p>Issued: {prescription.date}</p>
                      {prescription.dispensedDate && <p>Dispensed: {prescription.dispensedDate}</p>}
                    </div>
                  </div>

                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap ${prescription.status === "DISPENSED"
                        ? "bg-success-soft text-success"
                        : prescription.status === "ISSUED"
                          ? "bg-info-soft text-info"
                          : prescription.status === "PENDING"
                            ? "bg-warning-soft text-warning-foreground"
                            : "bg-secondary text-muted-foreground"
                      }`}
                  >
                    {prescription.status}
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
