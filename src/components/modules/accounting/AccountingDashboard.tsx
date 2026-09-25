import { CreditCard, TrendingUp, Wallet, AlertCircle, DollarSign, Receipt, ArrowRight, Calendar, User } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { StatCard } from "@/components/shared/StatCard";
import { PanelCard } from "@/components/shared/PanelCard";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ksh } from "@/lib/demo/format";
import { useClinicStore, invoiceTotal } from "@/lib/demo/store";

export function AccountingDashboard() {
  const { invoices, payments, patients } = useClinicStore();
  const todayRevenue = payments.filter((p) => p.date === "2025-09-20").reduce((sum, p) => sum + p.amount, 0);
  const outstanding = invoices.filter((inv) => inv.status === "PENDING" || inv.status === "OVERDUE").reduce((sum, inv) => {
    const total = invoiceTotal(inv);
    return sum + (total - inv.amountPaid);
  }, 0);
  const totalPaid = invoices.filter((inv) => inv.status === "PAID").reduce((sum, inv) => sum + invoiceTotal(inv), 0);
  const totalRevenue = invoices.reduce((sum, inv) => sum + invoiceTotal(inv), 0);

  const pendingInvoices = invoices.filter((inv) => inv.status === "PENDING");
  const overdueInvoices = invoices.filter((inv) => inv.status === "OVERDUE");
  const paidInvoices = invoices.filter((inv) => inv.status === "PAID");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PAID":
        return <Badge className="bg-green-100 text-green-700">Paid</Badge>;
      case "PENDING":
        return <Badge className="bg-orange-100 text-orange-700">Pending</Badge>;
      case "OVERDUE":
        return <Badge className="bg-red-100 text-red-700">Overdue</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-700">{status}</Badge>;
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Today's Revenue"
          value={ksh(todayRevenue)}
          hint="Cash collected"
          icon={CreditCard}
          iconTone="bg-green-100 text-green-600"
        />
        <StatCard
          label="Total Revenue"
          value={ksh(totalRevenue)}
          hint="All time"
          icon={TrendingUp}
          iconTone="bg-blue-100 text-blue-600"
        />
        <StatCard
          label="Outstanding"
          value={ksh(outstanding)}
          hint="Unpaid invoices"
          icon={AlertCircle}
          iconTone="bg-orange-100 text-orange-600"
        />
        <StatCard
          label="Collected"
          value={ksh(totalPaid)}
          hint="Paid invoices"
          icon={Wallet}
          iconTone="bg-green-100 text-green-600"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <PanelCard
          title="Pending Invoices"
          subtitle={`${pendingInvoices.length} invoices awaiting payment`}
          action={
            <Link
              to="/workspace/$role/$module"
              params={{ role: "accounts", module: "invoices" }}
              className="text-xs font-medium text-brand hover:underline flex items-center gap-1"
            >
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          }
        >
          {pendingInvoices.length === 0 ? (
            <p className="text-sm text-muted-foreground">No pending invoices.</p>
          ) : (
            <div className="space-y-3">
              {pendingInvoices.slice(0, 5).map((invoice) => {
                const patient = patients.find(p => p.id === invoice.patientId);
                const initials = patient?.name.split(' ').map(n => n[0]).join('') || '??';
                const total = invoiceTotal(invoice);
                const balance = total - invoice.amountPaid;

                return (
                  <Link
                    key={invoice.id}
                    to="/workspace/$role/$module"
                    params={{ role: "accounts", module: "invoices" }}
                    className="flex items-center gap-3 rounded-lg border border-orange-200 bg-orange-50 p-3 hover:bg-orange-100 transition-colors group"
                  >
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-orange-100 text-orange-700">{initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-heading">{patient?.name}</p>
                      <p className="text-xs text-muted-foreground">Invoice: {invoice.invoiceNumber}</p>
                      <p className="text-xs text-orange-600 font-medium mt-1">
                        Balance: {ksh(balance)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{ksh(total)}</p>
                      {getStatusBadge(invoice.status)}
                    </div>
                    <ArrowRight className="w-4 h-4 text-orange-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                );
              })}
            </div>
          )}
        </PanelCard>

        <PanelCard
          title="Recent Payments"
          subtitle={`${payments.length} payments recorded`}
          action={
            <Link
              to="/workspace/$role/$module"
              params={{ role: "accounts", module: "payments" }}
              className="text-xs font-medium text-brand hover:underline flex items-center gap-1"
            >
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          }
        >
          {payments.length === 0 ? (
            <p className="text-sm text-muted-foreground">No payments recorded yet.</p>
          ) : (
            <div className="space-y-3">
              {payments.slice(0, 5).map((payment) => {
                const invoice = invoices.find(inv => inv.id === payment.invoiceId);
                const patient = patients.find(p => p.id === invoice?.patientId);
                const initials = patient?.name.split(' ').map(n => n[0]).join('') || '??';

                return (
                  <div key={payment.id} className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-green-100 text-green-700">{initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-heading">{patient?.name}</p>
                      <p className="text-xs text-muted-foreground">{payment.method}</p>
                      <p className="text-xs text-green-600 mt-1">
                        {formatDate(payment.date)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-700">{ksh(payment.amount)}</p>
                      <Badge className="bg-green-100 text-green-700">Received</Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </PanelCard>
      </div>

      <PanelCard
        title="All Invoices"
        subtitle="Complete invoice records"
        bodyClassName="p-0"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b">
              <tr className="text-left text-xs text-gray-600">
                <th className="p-4 font-medium">Invoice #</th>
                <th className="p-4 font-medium">Patient</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Total Amount</th>
                <th className="p-4 font-medium">Paid</th>
                <th className="p-4 font-medium">Balance</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => {
                const patient = patients.find(p => p.id === invoice.patientId);
                const initials = patient?.name.split(' ').map(n => n[0]).join('') || '??';
                const total = invoiceTotal(invoice);
                const balance = total - invoice.amountPaid;

                return (
                  <tr key={invoice.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-mono text-xs text-gray-600">{invoice.invoiceNumber}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">{initials}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{patient?.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        {formatDate(invoice.date)}
                      </div>
                    </td>
                    <td className="p-4 font-semibold text-gray-900">{ksh(total)}</td>
                    <td className="p-4 text-green-600">{ksh(invoice.amountPaid)}</td>
                    <td className="p-4">
                      <span className={balance > 0 ? "text-orange-600 font-medium" : "text-green-600"}>
                        {ksh(balance)}
                      </span>
                    </td>
                    <td className="p-4">{getStatusBadge(invoice.status)}</td>
                    <td className="p-4">
                      <Link
                        to="/workspace/$role/$module"
                        params={{ role: "accounts", module: "invoices" }}
                        className="text-blue-600 hover:underline text-xs font-medium"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </PanelCard>

      <div className="grid gap-5 sm:grid-cols-3">
        <PanelCard title="Invoice Summary" subtitle="Status breakdown">
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between rounded-lg bg-green-50 border border-green-200 p-3">
              <span className="text-green-700 font-medium">Paid</span>
              <span className="font-bold text-green-700">{paidInvoices.length}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-orange-50 border border-orange-200 p-3">
              <span className="text-orange-700 font-medium">Pending</span>
              <span className="font-bold text-orange-700">{pendingInvoices.length}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-red-50 border border-red-200 p-3">
              <span className="text-red-700 font-medium">Overdue</span>
              <span className="font-bold text-red-700">{overdueInvoices.length}</span>
            </div>
          </div>
        </PanelCard>

        <PanelCard title="Payment Methods" subtitle="Collection breakdown">
          <div className="space-y-2 text-sm">
            {[
              { method: "M-PESA", count: payments.filter(p => p.method === "M-PESA").length },
              { method: "Cash", count: payments.filter(p => p.method === "CASH").length },
              { method: "Card", count: payments.filter(p => p.method === "CARD").length },
              { method: "Insurance", count: payments.filter(p => p.method === "INSURANCE").length },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 rounded bg-gray-50">
                <span className="text-gray-700">{item.method}</span>
                <Badge className="bg-blue-100 text-blue-700">{item.count}</Badge>
              </div>
            ))}
          </div>
        </PanelCard>

        <PanelCard title="Financial Stats" subtitle="Key metrics">
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Total Invoices</span>
              <span className="font-semibold text-gray-900">{invoices.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Collection Rate</span>
              <span className="font-semibold text-green-600">
                {invoices.length > 0 ? Math.round((paidInvoices.length / invoices.length) * 100) : 0}%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Avg Invoice Value</span>
              <span className="font-semibold text-gray-900">
                {invoices.length > 0 ? ksh(Math.round(totalRevenue / invoices.length)) : ksh(0)}
              </span>
            </div>
          </div>
        </PanelCard>
      </div>
    </div>
  );
}
