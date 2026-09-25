import { Button } from "@/components/ui/button";
import { PanelCard } from "@/components/shared/PanelCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { useClinic, invoiceTotal } from "@/lib/demo/store";
import { ksh } from "@/lib/demo/format";
import { toast } from "sonner";

export function InvoiceDetail() {
  // For demo, using Amina's invoice
  const { invoices, patients, payments, addPayment } = useClinic();
  const invoice = invoices.find((inv) => inv.number === "INV-2025-0143");

  if (!invoice) {
    return <PanelCard title="Invoice Not Found">Invoice not available.</PanelCard>;
  }

  const patient = patients.find((p) => p.id === invoice.patientId);
  const total = invoiceTotal(invoice);
  const balance = total - invoice.amountPaid;
  const invoicePayments = payments.filter((p) => p.invoiceNumber === invoice.number);

  const handleRecordPayment = () => {
    if (balance <= 0) {
      toast.error("Invoice already paid in full");
      return;
    }

    addPayment({
      invoiceNumber: invoice.number,
      amount: balance,
      method: "M-Pesa",
    });

    toast.success("Payment recorded", {
      description: `${ksh(balance)} received via M-Pesa`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Invoice Header */}
      <PanelCard>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-heading">{invoice.number}</h2>
            <p className="mt-1 text-sm text-muted-foreground">Issued: {invoice.date}</p>
            <p className="mt-2 text-lg font-medium">Patient: {patient?.name}</p>
            <p className="text-sm text-muted-foreground">{patient?.code}</p>
          </div>
          <StatusBadge status={invoice.status} />
        </div>
      </PanelCard>

      {/* Invoice Items */}
      <PanelCard title="Invoice Items" subtitle="Services and charges" bodyClassName="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs tracking-wide text-muted-foreground uppercase">
                <th className="px-5 py-3 font-semibold">Description</th>
                <th className="px-5 py-3 font-semibold text-right">Qty</th>
                <th className="px-5 py-3 font-semibold text-right">Unit Price</th>
                <th className="px-5 py-3 font-semibold text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, index) => (
                <tr key={index} className="border-b border-border last:border-0">
                  <td className="px-5 py-3">{item.description}</td>
                  <td className="px-5 py-3 text-right">{item.quantity}</td>
                  <td className="px-5 py-3 text-right">{ksh(item.unitPrice)}</td>
                  <td className="px-5 py-3 text-right font-medium">{ksh(item.quantity * item.unitPrice)}</td>
                </tr>
              ))}
              <tr className="border-t-2 border-border bg-secondary/30">
                <td colSpan={3} className="px-5 py-3 text-right font-semibold">
                  Total
                </td>
                <td className="px-5 py-3 text-right text-lg font-bold text-heading">{ksh(total)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </PanelCard>

      {/* Payment Summary */}
      <PanelCard title="Payment Summary">
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-lg bg-secondary p-4">
            <span className="text-muted-foreground">Invoice Total</span>
            <span className="text-xl font-bold text-heading">{ksh(total)}</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-success-soft/20 p-4">
            <span className="text-success">Amount Paid</span>
            <span className="text-xl font-bold text-success">{ksh(invoice.amountPaid)}</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-warning-soft/20 p-4">
            <span className="text-warning-foreground">Balance Due</span>
            <span className="text-xl font-bold text-warning-foreground">{ksh(balance)}</span>
          </div>
        </div>
      </PanelCard>

      {/* Payment History */}
      <PanelCard title="Payment History" subtitle="All payments received">
        {invoicePayments.length === 0 ? (
          <p className="text-sm text-muted-foreground">No payments recorded yet.</p>
        ) : (
          <div className="space-y-3">
            {invoicePayments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <p className="font-medium text-heading">{ksh(payment.amount)}</p>
                  <p className="text-xs text-muted-foreground">
                    {payment.date} • {payment.method} • Ref: {payment.reference}
                  </p>
                </div>
                <span className="inline-flex rounded-full bg-success-soft px-2 py-1 text-xs font-semibold text-success">
                  Paid
                </span>
              </div>
            ))}
          </div>
        )}
      </PanelCard>

      {/* Actions */}
      {balance > 0 && (
        <div className="flex gap-3">
          <Button onClick={handleRecordPayment} className="flex-1">
            Record Payment ({ksh(balance)})
          </Button>
          <Button variant="outline" className="flex-1">
            Send Reminder
          </Button>
        </div>
      )}
    </div>
  );
}
