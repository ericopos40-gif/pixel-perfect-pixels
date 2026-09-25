import { Button } from "@/components/ui/button";
import { PanelCard } from "@/components/shared/PanelCard";
import { useClinic } from "@/lib/demo/store";

export function LabOrderDetail() {
  // For demo, using the golden lab order (Amina's culture test)
  const { labOrders, patients } = useClinic();
  const order = labOrders[0]; // The first order is Amina's

  if (!order) {
    return <PanelCard title="Lab Order Not Found">Order not available.</PanelCard>;
  }

  const patient = patients.find((p) => p.id === order.patientId);

  return (
    <div className="space-y-6">
      {/* Order Header */}
      <PanelCard>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-heading">{order.testType}</h2>
            <p className="mt-1 text-sm text-muted-foreground">Order: {order.labOrderNumber}</p>
            <p className="mt-2 font-medium text-heading">Patient: {patient?.name}</p>
          </div>
          <span
            className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${order.status === "COMPLETED"
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
        </div>
      </PanelCard>

      {/* Order Timeline */}
      <PanelCard title="Order Timeline" subtitle="Process tracking">
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="flex size-8 items-center justify-center rounded-full bg-success text-xs font-bold text-white">✓</div>
              <div className="mt-2 h-8 w-0.5 bg-border" />
            </div>
            <div>
              <p className="font-medium text-heading">Order Created</p>
              <p className="text-sm text-muted-foreground">{order.createdDate}</p>
            </div>
          </div>

          {order.collectedDate && (
            <>
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex size-8 items-center justify-center rounded-full bg-success text-xs font-bold text-white">✓</div>
                  <div className="mt-2 h-8 w-0.5 bg-border" />
                </div>
                <div>
                  <p className="font-medium text-heading">Sample Collected</p>
                  <p className="text-sm text-muted-foreground">{order.collectedDate}</p>
                </div>
              </div>
            </>
          )}

          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="flex size-8 items-center justify-center rounded-full bg-info text-xs font-bold text-white">●</div>
              <div className="mt-2 h-8 w-0.5 bg-border" />
            </div>
            <div>
              <p className="font-medium text-heading">Processing</p>
              <p className="text-sm text-muted-foreground">In progress</p>
            </div>
          </div>

          {order.resultDate && (
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex size-8 items-center justify-center rounded-full bg-warning-foreground text-xs font-bold text-white">✓</div>
              </div>
              <div>
                <p className="font-medium text-heading">Result Ready</p>
                <p className="text-sm text-muted-foreground">{order.resultDate}</p>
              </div>
            </div>
          )}
        </div>
      </PanelCard>

      {/* Lab Result */}
      {order.result && (
        <PanelCard title="Lab Result" subtitle="Test results and findings">
          <div className="rounded-lg bg-success-soft/20 border border-success/30 p-4">
            <p className="text-sm font-medium text-heading">{order.result}</p>
          </div>
        </PanelCard>
      )}

      {/* Actions */}
      {order.status === "RESULT_READY" && (
        <div className="flex gap-3">
          <Button className="flex-1">Mark as Reviewed</Button>
          <Button variant="outline" className="flex-1">
            Print Report
          </Button>
        </div>
      )}
    </div>
  );
}
