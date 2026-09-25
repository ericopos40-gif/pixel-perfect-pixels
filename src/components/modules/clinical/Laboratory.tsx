import { PanelCard } from "@/components/shared/PanelCard";
import { useClinic, useLabOrdersForPatient } from "@/lib/demo/store";

export function Laboratory() {
  // For demo, using the golden patient (Amina - PAT-005)
  const patientId = "PAT-005";
  const labOrders = useLabOrdersForPatient(patientId);

  return (
    <div className="space-y-6">
      <PanelCard title="Laboratory Orders" subtitle="Lab requests and results">
        {labOrders.length === 0 ? (
          <p className="text-sm text-muted-foreground">No lab orders yet.</p>
        ) : (
          <div className="space-y-4">
            {labOrders.map((order) => (
              <div key={order.id} className="rounded-lg border border-border p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-heading">{order.testType}</h3>
                    <p className="mt-1 text-sm font-medium text-muted-foreground">Order: {order.labOrderNumber}</p>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
                      <div>
                        <span className="block text-xs text-muted-foreground">Priority</span>
                        <span className="mt-1 inline-flex rounded-full px-2 py-0.5 text-xs font-semibold bg-brand-soft text-brand">
                          {order.priority}
                        </span>
                      </div>
                      <div>
                        <span className="block text-xs text-muted-foreground">Created</span>
                        <span className="mt-1 block font-medium text-heading text-sm">{order.createdDate}</span>
                      </div>
                      {order.collectedDate && (
                        <div>
                          <span className="block text-xs text-muted-foreground">Sample Collected</span>
                          <span className="mt-1 block font-medium text-heading text-sm">{order.collectedDate}</span>
                        </div>
                      )}
                      {order.resultDate && (
                        <div>
                          <span className="block text-xs text-muted-foreground">Result Date</span>
                          <span className="mt-1 block font-medium text-heading text-sm">{order.resultDate}</span>
                        </div>
                      )}
                    </div>

                    {order.result && (
                      <div className="mt-4 rounded-lg bg-success-soft/20 border border-success/30 p-3">
                        <p className="text-xs font-semibold text-success">Result:</p>
                        <p className="mt-1 text-sm text-heading">{order.result}</p>
                      </div>
                    )}

                    {order.notes && (
                      <div className="mt-3 rounded-lg bg-secondary p-3">
                        <p className="text-xs font-semibold text-muted-foreground">Notes:</p>
                        <p className="mt-1 text-sm text-muted-foreground">{order.notes}</p>
                      </div>
                    )}
                  </div>

                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap ${order.status === "COMPLETED"
                        ? "bg-success-soft text-success"
                        : order.status === "RESULT_READY"
                          ? "bg-info-soft text-info"
                          : order.status === "PROCESSING"
                            ? "bg-warning-soft text-warning-foreground"
                            : order.status === "SAMPLE_COLLECTED"
                              ? "bg-brand-soft text-brand"
                              : "bg-secondary text-muted-foreground"
                      }`}
                  >
                    {order.status}
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
