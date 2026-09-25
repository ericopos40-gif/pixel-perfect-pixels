import { Link } from "@tanstack/react-router";
import { PanelCard, EmptyState } from "@/components/shared/PanelCard";
import { useClinic } from "@/lib/demo/store";

export function LabOrders() {
  const { labOrders, patients } = useClinic();

  return (
    <div className="space-y-6">
      <PanelCard title="Lab Orders" subtitle="All laboratory requests">
        {labOrders.length === 0 ? (
          <EmptyState message="No lab orders yet." />
        ) : (
          <div className="space-y-3">
            {labOrders.map((order) => {
              const patient = patients.find((p) => p.id === order.patientId);
              return (
                <div key={order.id} className="rounded-lg border border-border p-4 hover:bg-secondary/30 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-heading">{order.testType}</h3>
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded-full ${order.priority === "URGENT"
                              ? "bg-destructive/20 text-destructive"
                              : "bg-brand-soft text-brand"
                            }`}
                        >
                          {order.priority}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">Order: {order.labOrderNumber}</p>
                      <p className="text-sm font-medium text-heading mt-2">Patient: {patient?.name}</p>
                      <p className="text-xs text-muted-foreground">Created: {order.createdDate}</p>
                    </div>

                    <div className="text-right">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${order.status === "COMPLETED"
                            ? "bg-success-soft text-success"
                            : order.status === "RESULT_READY"
                              ? "bg-info-soft text-info"
                              : order.status === "PROCESSING"
                                ? "bg-warning-soft text-warning-foreground"
                                : "bg-secondary text-muted-foreground"
                          }`}
                      >
                        {order.status}
                      </span>
                      <Link
                        to="/workspace/$role/$module"
                        params={{ role: "laboratory", module: "order-detail" }}
                        className="mt-3 inline-flex rounded-lg border border-brand bg-brand-soft px-3 py-1.5 text-xs font-medium text-brand hover:bg-brand hover:text-white transition-colors"
                      >
                        View Details
                      </Link>
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
