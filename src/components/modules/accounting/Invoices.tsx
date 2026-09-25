import { Link } from "@tanstack/react-router";
import { PanelCard, EmptyState } from "@/components/shared/PanelCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { useClinic, invoiceTotal } from "@/lib/demo/store";
import { ksh } from "@/lib/demo/format";

export function Invoices() {
  const { invoices, patients } = useClinic();

  return (
    <div className="space-y-6">
      <PanelCard title="Invoices" subtitle="All patient invoices and billing records" bodyClassName="p-0">
        {invoices.length === 0 ? (
          <div className="p-5">
            <EmptyState message="No invoices yet." />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-200 text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs tracking-wide text-muted-foreground uppercase">
                  <th className="px-5 py-3 font-semibold">Invoice</th>
                  <th className="px-5 py-3 font-semibold">Patient</th>
                  <th className="px-5 py-3 font-semibold">Date</th>
                  <th className="px-5 py-3 font-semibold">Total</th>
                  <th className="px-5 py-3 font-semibold">Paid</th>
                  <th className="px-5 py-3 font-semibold">Balance</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => {
                  const patient = patients.find((p) => p.id === invoice.patientId);
                  const total = invoiceTotal(invoice);
                  const balance = total - invoice.amountPaid;
                  return (
                    <tr key={invoice.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                      <td className="px-5 py-3">
                        <Link
                          to="/workspace/$role/$module"
                          params={{ role: "accounts", module: "invoice-detail" }}
                          className="font-medium text-brand hover:underline"
                        >
                          {invoice.number}
                        </Link>
                      </td>
                      <td className="px-5 py-3 font-medium">{patient?.name}</td>
                      <td className="px-5 py-3 text-muted-foreground">{invoice.date}</td>
                      <td className="px-5 py-3 font-medium">{ksh(total)}</td>
                      <td className="px-5 py-3 text-success">{ksh(invoice.amountPaid)}</td>
                      <td className="px-5 py-3 font-medium text-heading">{ksh(balance)}</td>
                      <td className="px-5 py-3">
                        <StatusBadge status={invoice.status} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </PanelCard>
    </div>
  );
}
