import { PanelCard } from "@/components/shared/PanelCard";
import { useClinic, useTreatmentPlansForPatient } from "@/lib/demo/store";

export function TreatmentPlans() {
  // For demo, using the golden patient (Amina - PAT-005)
  const patientId = "PAT-005";
  const treatmentPlans = useTreatmentPlansForPatient(patientId);

  return (
    <div className="space-y-6">
      <PanelCard title="Treatment Plans" subtitle="All treatment plans for this patient">
        {treatmentPlans.length === 0 ? (
          <p className="text-sm text-muted-foreground">No treatment plans.</p>
        ) : (
          <div className="space-y-4">
            {treatmentPlans.map((plan) => (
              <div key={plan.id} className="rounded-lg border border-border p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-heading">{plan.procedure}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
                      <div>
                        <span className="block text-xs text-muted-foreground">Estimated Cost</span>
                        <span className="mt-1 block font-semibold text-heading">KSh {plan.estimatedCost.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="block text-xs text-muted-foreground">Sessions</span>
                        <span className="mt-1 block font-semibold text-heading">
                          {plan.currentSession || 0} of {plan.estimatedSessions}
                        </span>
                      </div>
                      <div>
                        <span className="block text-xs text-muted-foreground">Created</span>
                        <span className="mt-1 block font-semibold text-heading text-sm">{plan.createdDate}</span>
                      </div>
                      {plan.plannedStartDate && (
                        <div>
                          <span className="block text-xs text-muted-foreground">Planned Start</span>
                          <span className="mt-1 block font-semibold text-heading text-sm">{plan.plannedStartDate}</span>
                        </div>
                      )}
                    </div>

                    {plan.notes && (
                      <div className="mt-4 rounded-lg bg-secondary p-3">
                        <p className="text-xs font-semibold text-muted-foreground">Notes:</p>
                        <p className="mt-1 text-sm text-muted-foreground">{plan.notes}</p>
                      </div>
                    )}
                  </div>

                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap ${plan.status === "COMPLETED"
                        ? "bg-success-soft text-success"
                        : plan.status === "IN_PROGRESS"
                          ? "bg-info-soft text-info"
                          : plan.status === "APPROVED"
                            ? "bg-brand-soft text-brand"
                            : plan.status === "PROPOSED"
                              ? "bg-warning-soft text-warning-foreground"
                              : "bg-secondary text-muted-foreground"
                      }`}
                  >
                    {plan.status}
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
