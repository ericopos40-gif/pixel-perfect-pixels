import { useState } from "react";
import { PanelCard } from "@/components/shared/PanelCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useClinicStore } from "@/lib/demo/store";
import { Search, Eye, Download, DollarSign, AlertCircle, TrendingUp } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Billing() {
  const { invoices, patients } = useClinicStore();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredInvoices = invoices.filter((invoice) => {
    const patient = patients.find((p) => p.id === invoice.patientId);
    if (!patient) return false;
    return (
      invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.code.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.total, 0);
  const paidAmount = invoices.reduce((sum, inv) => sum + inv.paid, 0);
  const pendingAmount = invoices
    .filter((inv) => inv.status === "pending" || inv.status === "overdue")
    .reduce((sum, inv) => sum + (inv.total - inv.paid), 0);
  const overdueAmount = invoices
    .filter((inv) => inv.status === "overdue")
    .reduce((sum, inv) => sum + (inv.total - inv.paid), 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-orange-100 text-orange-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      case "partial":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <PanelCard
      title="Billing & Payments"
      subtitle="Quick access to invoices and payment processing"
    >
      <div className="space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search by invoice number, patient name, or code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Financial Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-5 h-5 text-blue-600" />
              <TrendingUp className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-blue-600">
              KSh {totalRevenue.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Revenue</div>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-600">
              KSh {paidAmount.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Paid</div>
          </div>

          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-5 h-5 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-orange-600">
              KSh {pendingAmount.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>

          <div className="bg-red-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <div className="text-2xl font-bold text-red-600">
              KSh {overdueAmount.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Overdue</div>
          </div>
        </div>

        {/* Invoice Summary by Status */}
        <div className="grid grid-cols-4 gap-4">
          <div className="border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-gray-800">{invoices.length}</div>
            <div className="text-sm text-gray-600">Total Invoices</div>
          </div>
          <div className="border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {invoices.filter((inv) => inv.status === "paid").length}
            </div>
            <div className="text-sm text-gray-600">Paid</div>
          </div>
          <div className="border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {invoices.filter((inv) => inv.status === "pending").length}
            </div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
          <div className="border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {invoices.filter((inv) => inv.status === "overdue").length}
            </div>
            <div className="text-sm text-gray-600">Overdue</div>
          </div>
        </div>

        {/* Recent Invoices Table */}
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b">
            <h3 className="font-semibold">Recent Invoices</h3>
          </div>
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-3 text-sm font-medium text-gray-600">Invoice</th>
                <th className="text-left p-3 text-sm font-medium text-gray-600">Patient</th>
                <th className="text-left p-3 text-sm font-medium text-gray-600">Date</th>
                <th className="text-left p-3 text-sm font-medium text-gray-600">Amount</th>
                <th className="text-left p-3 text-sm font-medium text-gray-600">Paid</th>
                <th className="text-left p-3 text-sm font-medium text-gray-600">Balance</th>
                <th className="text-left p-3 text-sm font-medium text-gray-600">Status</th>
                <th className="text-left p-3 text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.slice(0, 10).map((invoice) => {
                const patient = patients.find((p) => p.id === invoice.patientId);
                const balance = invoice.total - invoice.paid;

                return (
                  <tr key={invoice.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <span className="font-mono text-sm font-medium">
                        {invoice.invoiceNumber}
                      </span>
                    </td>
                    <td className="p-3">
                      <div>
                        <div className="font-medium">{patient?.name}</div>
                        <div className="text-sm text-gray-500">{patient?.code}</div>
                      </div>
                    </td>
                    <td className="p-3 text-sm">{invoice.date}</td>
                    <td className="p-3 font-medium">
                      KSh {invoice.total.toLocaleString()}
                    </td>
                    <td className="p-3 text-sm text-green-600">
                      KSh {invoice.paid.toLocaleString()}
                    </td>
                    <td className="p-3 font-medium">
                      <span className={balance > 0 ? "text-red-600" : "text-gray-600"}>
                        KSh {balance.toLocaleString()}
                      </span>
                    </td>
                    <td className="p-3">
                      <Badge className={getStatusColor(invoice.status)}>
                        {invoice.status}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Link
                          to="/workspace/$role/$module"
                          params={{ role: "accounts", module: "invoices" }}
                          search={{ invoiceId: invoice.id }}
                        >
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredInvoices.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No invoices found matching your search
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex gap-3">
          <Link to="/workspace/$role/$module" params={{ role: "accounts", module: "invoices" }}>
            <Button variant="outline">View All Invoices</Button>
          </Link>
          <Link to="/workspace/$role/$module" params={{ role: "accounts", module: "payments" }}>
            <Button variant="outline">View Payments</Button>
          </Link>
          <Button>Generate Report</Button>
        </div>
      </div>
    </PanelCard>
  );
}
