import { PanelCard } from "@/components/shared/PanelCard";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useClinicStore } from "@/lib/demo/store";
import { Link } from "@tanstack/react-router";
import { Flask, Clock, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";

export function LabDashboard() {
  const { labOrders, patients } = useClinicStore();
  const pending = labOrders.filter((lo) => lo.status === "REQUESTED");
  const processing = labOrders.filter((lo) => lo.status === "PROCESSING");
  const ready = labOrders.filter((lo) => lo.status === "RESULT_READY");
  const completed = labOrders.filter((lo) => lo.status === "COMPLETED");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return <Badge className="bg-green-100 text-green-700"><CheckCircle2 className="w-3 h-3 mr-1" />Completed</Badge>;
      case "RESULT_READY":
        return <Badge className="bg-blue-100 text-blue-700"><Flask className="w-3 h-3 mr-1" />Ready</Badge>;
      case "PROCESSING":
        return <Badge className="bg-orange-100 text-orange-700"><Clock className="w-3 h-3 mr-1" />Processing</Badge>;
      case "REQUESTED":
        return <Badge className="bg-gray-100 text-gray-700"><AlertCircle className="w-3 h-3 mr-1" />Pending</Badge>;
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
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-orange-700 font-medium">Pending Orders</p>
              <p className="mt-2 text-3xl font-bold text-orange-700">{pending.length}</p>
              <p className="text-xs text-orange-600">Awaiting processing</p>
            </div>
            <AlertCircle className="w-8 h-8 text-orange-400" />
          </div>
        </div>
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-yellow-700 font-medium">Processing</p>
              <p className="mt-2 text-3xl font-bold text-yellow-700">{processing.length}</p>
              <p className="text-xs text-yellow-600">In progress</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-blue-700 font-medium">Results Ready</p>
              <p className="mt-2 text-3xl font-bold text-blue-700">{ready.length}</p>
              <p className="text-xs text-blue-600">For review</p>
            </div>
            <Flask className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        <div className="rounded-lg border border-green-200 bg-green-50 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-green-700 font-medium">Completed</p>
              <p className="mt-2 text-3xl font-bold text-green-700">{completed.length}</p>
              <p className="text-xs text-green-600">This week</p>
            </div>
            <CheckCircle2 className="w-8 h-8 text-green-400" />
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <PanelCard
          title="Pending Lab Orders"
          subtitle="Orders awaiting processing"
          action={
            <Link
              to="/workspace/$role/$module"
              params={{ role: "laboratory", module: "orders" }}
              className="text-xs font-medium text-brand hover:underline flex items-center gap-1"
            >
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          }
        >
          {pending.length === 0 ? (
            <p className="text-sm text-muted-foreground">No pending orders.</p>
          ) : (
            <div className="space-y-3">
              {pending.slice(0, 5).map((order) => {
                const patient = patients.find(p => p.id === order.patientId);
                const initials = patient?.name.split(' ').map(n => n[0]).join('') || '??';

                return (
                  <Link
                    key={order.id}
                    to="/workspace/$role/$module"
                    params={{ role: "laboratory", module: "order-detail" }}
                    className="flex items-center gap-3 rounded-lg border border-border p-3 hover:bg-secondary/50 transition-colors group"
                  >
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-orange-100 text-orange-700">{initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-heading">{order.testType}</p>
                      <p className="text-xs text-muted-foreground">{patient?.name} • {order.labOrderNumber}</p>
                      <p className="text-xs text-gray-500 mt-1">Ordered: {formatDate(order.orderedDate)}</p>
                    </div>
                    {getStatusBadge(order.status)}
                    <ArrowRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                );
              })}
            </div>
          )}
        </PanelCard>

        <PanelCard
          title="Results Ready for Review"
          subtitle="Tests completed, awaiting doctor review"
        >
          {ready.length === 0 ? (
            <p className="text-sm text-muted-foreground">No results ready for review.</p>
          ) : (
            <div className="space-y-3">
              {ready.slice(0, 5).map((order) => {
                const patient = patients.find(p => p.id === order.patientId);
                const initials = patient?.name.split(' ').map(n => n[0]).join('') || '??';

                return (
                  <Link
                    key={order.id}
                    to="/workspace/$role/$module"
                    params={{ role: "laboratory", module: "order-detail" }}
                    className="flex items-center gap-3 rounded-lg border border-blue-200 bg-blue-50 p-3 hover:bg-blue-100 transition-colors group"
                  >
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-blue-100 text-blue-700">{initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-heading">{order.testType}</p>
                      <p className="text-xs text-muted-foreground">{patient?.name} • {order.labOrderNumber}</p>
                      <p className="text-xs text-blue-600 mt-1 font-medium">Ready for doctor review</p>
                    </div>
                    {getStatusBadge(order.status)}
                    <ArrowRight className="w-4 h-4 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                );
              })}
            </div>
          )}
        </PanelCard>
      </div>

      <PanelCard
        title="Recent Lab Activity"
        subtitle="All laboratory orders and their status"
        bodyClassName="p-0"
      >
        {labOrders.length === 0 ? (
          <div className="p-5">
            <p className="text-sm text-muted-foreground">No lab orders yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b">
                <tr className="text-left text-xs text-gray-600">
                  <th className="p-4 font-medium">Patient</th>
                  <th className="p-4 font-medium">Test Type</th>
                  <th className="p-4 font-medium">Order Number</th>
                  <th className="p-4 font-medium">Ordered Date</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {labOrders.map((order) => {
                  const patient = patients.find(p => p.id === order.patientId);
                  const initials = patient?.name.split(' ').map(n => n[0]).join('') || '??';

                  return (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">{initials}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{patient?.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-gray-700">{order.testType}</td>
                      <td className="p-4 text-gray-600">{order.labOrderNumber}</td>
                      <td className="p-4 text-gray-600">{formatDate(order.orderedDate)}</td>
                      <td className="p-4">{getStatusBadge(order.status)}</td>
                      <td className="p-4">
                        <Link
                          to="/workspace/$role/$module"
                          params={{ role: "laboratory", module: "order-detail" }}
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
        )}
      </PanelCard>
    </div>
  );
}
