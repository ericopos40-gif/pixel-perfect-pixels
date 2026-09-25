import { Button } from "@/components/ui/button";
import { PanelCard } from "@/components/shared/PanelCard";
import { toast } from "sonner";
import { useClinic } from "@/lib/demo/store";

export function Prescriptions() {
  const { prescriptions, patients } = useClinic();

  const handleDispense = (prescriptionId: string, medication: string) => {
    toast.success(`${medication} dispensed`, {
      description: "Inventory updated. Patient notified.",
    });
  };

  return (
    <div className="space-y-6">
      <PanelCard title="Prescriptions" subtitle="All prescriptions pending dispensing">
        {prescriptions.length === 0 ? (
          <p className="text-sm text-muted-foreground">No prescriptions to dispense.</p>
        ) : (
          <div className="space-y-4">
            {prescriptions.map((prescription) => {
              const patient = patients.find((p) => p.id === prescription.patientId);
              return (
                <div key={prescription.id} className="rounded-lg border border-border p-5 hover:bg-secondary/30 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-heading">{prescription.medication}</h3>
                      <p className="mt-1 text-sm font-medium text-muted-foreground">Rx: {prescription.prescriptionNumber}</p>
                      <p className="mt-2 text-sm">
                        <span className="font-medium">Patient:</span> {patient?.name}
                      </p>
                      <div className="mt-3 grid gap-2 sm:grid-cols-3">
                        <div>
                          <span className="text-xs text-muted-foreground">Dosage</span>
                          <p className="font-medium">{prescription.dosage}</p>
                        </div>
                        <div>
                          <span className="text-xs text-muted-foreground">Frequency</span>
                          <p className="font-medium">{prescription.frequency}</p>
                        </div>
                        <div>
                          <span className="text-xs text-muted-foreground">Duration</span>
                          <p className="font-medium">{prescription.duration}</p>
                        </div>
                      </div>
                      <div className="mt-3 rounded-lg bg-secondary p-3">
                        <p className="text-xs font-semibold text-muted-foreground">Instructions:</p>
                        <p className="mt-1 text-sm text-muted-foreground">{prescription.instructions}</p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-3">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${prescription.status === "DISPENSED"
                            ? "bg-success-soft text-success"
                            : prescription.status === "ISSUED"
                              ? "bg-info-soft text-info"
                              : "bg-secondary text-muted-foreground"
                          }`}
                      >
                        {prescription.status}
                      </span>
                      {prescription.status === "ISSUED" && (
                        <Button
                          size="sm"
                          onClick={() => handleDispense(prescription.id, prescription.medication)}
                        >
                          Dispense
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </PanelCard>
    </div>
  );
}
