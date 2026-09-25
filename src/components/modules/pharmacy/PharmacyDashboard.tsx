import { Clock, Package, Pill, CheckCircle2, AlertCircle, ArrowRight, Calendar } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { StatCard } from "@/components/shared/StatCard";
import { PanelCard } from "@/components/shared/PanelCard";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useClinicStore } from "@/lib/demo/store";

export function PharmacyDashboard() {
  const { prescriptions, patients } = useClinicStore();
  const pending = prescriptions.filter((p) => p.status === "ISSUED");
  const dispensed = prescriptions.filter((p) => p.status === "DISPENSED");
  const expired = prescriptions.filter((p) => p.status === "EXPIRED");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ISSUED":
        return <Badge className="bg-orange-100 text-orange-700"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case "DISPENSED":
        return <Badge className="bg-green-100 text-green-700"><CheckCircle2 className="w-3 h-3 mr-1" />Dispensed</Badge>;
      case "EXPIRED":
        return <Badge className="bg-red-100 text-red-700"><AlertCircle className="w-3 h-3 mr-1" />Expired</Badge>;
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
      <div className="grid gap-5 sm:grid-cols-4">
        <StatCard
          label="Pending Prescriptions"
          value={String(pending.length)}
          hint="Awaiting dispensing"
          icon={Clock}
          iconTone="bg-orange-100 text-orange-600"
        />
        <StatCard
          label="Dispensed Today"
          value={String(dispensed.length)}
          hint="Completed"
          icon={CheckCircle2}
          iconTone="bg-success-soft text-success"
        />
        <StatCard
          label="Total Prescriptions"
          value={String(prescriptions.length)}
          hint="All records"
          icon={Pill}
          iconTone="bg-blue-100 text-blue-600"
        />
        <StatCard
          label="Expired"
          value={String(expired.length)}
          hint="No longer valid"
          icon={AlertCircle}
          iconTone="bg-red-100 text-red-600"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <PanelCard
          title="Pending Prescriptions"
          subtitle="Prescriptions awaiting dispensing"
          action={
            <Link
              to="/workspace/$role/$module"
              params={{ role: "pharmacy", module: "prescriptions" }}
              className="text-xs font-medium text-brand hover:underline flex items-center gap-1"
            >
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          }
        >
          {pending.length === 0 ? (
            <p className="text-sm text-muted-foreground">No pending prescriptions.</p>
          ) : (
            <div className="space-y-3">
              {pending.slice(0, 5).map((prescription) => {
                const patient = patients.find(p => p.id === prescription.patientId);
                const initials = patient?.name.split(' ').map(n => n[0]).join('') || '??';

                return (
                  <div key={prescription.id} className="flex items-center gap-3 rounded-lg border border-orange-200 bg-orange-50 p-3 hover:bg-orange-100 transition-colors group">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-orange-100 text-orange-700">{initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-heading">{prescription.medication}</p>
                      <p className="text-xs text-muted-foreground">{patient?.name}</p>
                      <p className="text-xs text-gray-600 mt-1">
                        {prescription.dosage} • {prescription.frequency} • {prescription.duration}
                      </p>
                      <p className="text-xs text-orange-600 font-medium mt-1">Rx: {prescription.prescriptionNumber}</p>
                    </div>
                    <Link
                      to="/workspace/$role/$module"
                      params={{ role: "pharmacy", module: "prescriptions" }}
                    >
                      <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                        Dispense
                      </Button>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </PanelCard>

        <PanelCard title="Recently Dispensed" subtitle="Latest completed prescriptions">
          {dispensed.length === 0 ? (
            <p className="text-sm text-muted-foreground">No dispensed prescriptions yet.</p>
          ) : (
            <div className="space-y-3">
              {dispensed.slice(0, 5).map((prescription) => {
                const patient = patients.find(p => p.id === prescription.patientId);
                const initials = patient?.name.split(' ').map(n => n[0]).join('') || '??';

                return (
                  <div key={prescription.id} className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-green-100 text-green-700">{initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-heading">{prescription.medication}</p>
                      <p className="text-xs text-muted-foreground">{patient?.name}</p>
                      <p className="text-xs text-green-600 mt-1">
                        Dispensed: {formatDate(prescription.issuedDate)}
                      </p>
                    </div>
                    {getStatusBadge(prescription.status)}
                  </div>
                );
              })}
            </div>
          )}
        </PanelCard>
      </div>

      <PanelCard
        title="All Prescriptions"
        subtitle="Complete prescription records"
        bodyClassName="p-0"
      >
        {prescriptions.length === 0 ? (
          <div className="p-5">
            <p className="text-sm text-muted-foreground">No prescriptions recorded yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b">
                <tr className="text-left text-xs text-gray-600">
                  <th className="p-4 font-medium">Patient</th>
                  <th className="p-4 font-medium">Medication</th>
                  <th className="p-4 font-medium">Dosage & Frequency</th>
                  <th className="p-4 font-medium">Duration</th>
                  <th className="p-4 font-medium">Issued Date</th>
                  <th className="p-4 font-medium">Rx Number</th>
                  <th className="p-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {prescriptions.map((prescription) => {
                  const patient = patients.find(p => p.id === prescription.patientId);
                  const initials = patient?.name.split(' ').map(n => n[0]).join('') || '??';

                  return (
                    <tr key={prescription.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">{initials}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{patient?.name}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-gray-900">{prescription.medication}</p>
                          {prescription.notes && (
                            <p className="text-xs text-gray-500 mt-1">{prescription.notes}</p>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-gray-700">
                        {prescription.dosage} • {prescription.frequency}
                      </td>
                      <td className="p-4 text-gray-600">{prescription.duration}</td>
                      <td className="p-4 text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          {formatDate(prescription.issuedDate)}
                        </div>
                      </td>
                      <td className="p-4 text-gray-600 font-mono text-xs">{prescription.prescriptionNumber}</td>
                      <td className="p-4">{getStatusBadge(prescription.status)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </PanelCard>

      <div className="grid gap-5 sm:grid-cols-3">
        <PanelCard title="Dispensing Summary" subtitle="Today's activity">
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between rounded-lg bg-orange-50 border border-orange-200 p-3">
              <span className="text-orange-700 font-medium">Pending</span>
              <span className="font-bold text-orange-700">{pending.length}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-green-50 border border-green-200 p-3">
              <span className="text-green-700 font-medium">Dispensed</span>
              <span className="font-bold text-green-700">{dispensed.length}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-red-50 border border-red-200 p-3">
              <span className="text-red-700 font-medium">Expired</span>
              <span className="font-bold text-red-700">{expired.length}</span>
            </div>
          </div>
        </PanelCard>

        <PanelCard title="Most Prescribed" subtitle="Top medications">
          <div className="space-y-2 text-sm">
            {[
              { name: "Amoxicillin", count: 12 },
              { name: "Ibuprofen", count: 8 },
              { name: "Paracetamol", count: 6 },
            ].map((med, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 rounded bg-gray-50">
                <span className="text-gray-700">{med.name}</span>
                <Badge className="bg-blue-100 text-blue-700">{med.count}</Badge>
              </div>
            ))}
          </div>
        </PanelCard>

        <PanelCard title="Quick Stats" subtitle="Prescription insights">
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Total Prescriptions</span>
              <span className="font-semibold text-gray-900">{prescriptions.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Average per Day</span>
              <span className="font-semibold text-gray-900">{Math.round(prescriptions.length / 7)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Completion Rate</span>
              <span className="font-semibold text-green-600">
                {prescriptions.length > 0 ? Math.round((dispensed.length / prescriptions.length) * 100) : 0}%
              </span>
            </div>
          </div>
        </PanelCard>
      </div>
    </div>
  );
}
