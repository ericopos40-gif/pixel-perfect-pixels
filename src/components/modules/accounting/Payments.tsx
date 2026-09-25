import { PanelCard } from "@/components/shared/PanelCard";
import { useClinic } from "@/lib/demo/store";
import { ksh } from "@/lib/demo/format";

export function Payments() {
  const { payments, patients } = useClinic();

  return (
    <div className="space-y-6">
      <PanelCard title="Payments" subtitle="All payment records and receipts" bodyClassName="p-0">
        {payments.length === 0 ? (
          <div className="p-5">
            <p className="text-sm text-muted-foreground">No payments recorded.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-175 text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs tracking-wide text-muted-foreground uppercase">
                  <th className="px-5 py-3 font-semibold">Date</th>
                  <th className="px-5 py-3 font-semibold">Patient</th>
                  <th className="px-5 py-3 font-semibold">Invoice</th>
                  <th className="px-5 py-3 font-semibold">Amount</th>
                  <th className="px-5 py-3 font-semibold">Method</th>
                  <th className="px-5 py-3 font-semibold">Reference</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => {
                  const patient = patients.find((p) => p.id === payment.patientId);
                  return (
                    <tr key={payment.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                      <td className="px-5 py-3 font-medium">{payment.date}</td>
                      <td className="px-5 py-3">{patient?.name}</td>
                      <td className="px-5 py-3 text-muted-foreground">{payment.invoiceNumber}</td>
                      <td className="px-5 py-3 font-semibold text-success">{ksh(payment.amount)}</td>
                      <td className="px-5 py-3">
                        <span className="inline-flex rounded-full bg-secondary px-2 py-1 text-xs font-medium">{payment.method}</span>
                      </td>
                      <td className="px-5 py-3 text-xs text-muted-foreground font-mono">{payment.reference}</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-border bg-secondary/30">
                  <td colSpan={3} className="px-5 py-3 text-right font-semibold">
                    Total
                  </td>
                  <td className="px-5 py-3 font-bold text-success">
                    {ksh(payments.reduce((sum, p) => sum + p.amount, 0))}
                  </td>
                  <td colSpan={2}></td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </PanelCard>

      <div className="grid gap-5 md:grid-cols-3">
        <div className="rounded-lg border border-border p-4">
          <p className="text-xs text-muted-foreground">Total Payments</p>
          <p className="mt-2 text-2xl font-bold text-heading">{payments.length}</p>
        </div>
        <div className="rounded-lg border border-border p-4">
          <p className="text-xs text-muted-foreground">Total Amount</p>
          <p className="mt-2 text-2xl font-bold text-success">{ksh(payments.reduce((sum, p) => sum + p.amount, 0))}</p>
        </div>
        <div className="rounded-lg border border-border p-4">
          <p className="text-xs text-muted-foreground">Average Payment</p>
          <p className="mt-2 text-2xl font-bold text-info">
            {ksh(payments.length > 0 ? payments.reduce((sum, p) => sum + p.amount, 0) / payments.length : 0)}
          </p>
        </div>
      </div>
    </div>
  );
}
