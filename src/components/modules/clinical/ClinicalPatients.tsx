import { Link } from "@tanstack/react-router";
import { PanelCard } from "@/components/shared/PanelCard";
import { useClinic } from "@/lib/demo/store";
import { countOf } from "@/lib/demo/format";

export function ClinicalPatients() {
  const { patients } = useClinic();

  return (
    <div className="space-y-6">
      <PanelCard title="My Patients" subtitle="All patients I have treated" bodyClassName="p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-150 text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs tracking-wide text-muted-foreground uppercase">
                <th className="px-5 py-3 font-semibold">Patient</th>
                <th className="px-5 py-3 font-semibold">Patient ID</th>
                <th className="px-5 py-3 font-semibold">Phone</th>
                <th className="px-5 py-3 font-semibold">Last Visit</th>
                <th className="px-5 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                  <td className="px-5 py-3">
                    <Link
                      to="/workspace/$role/$module"
                      params={{ role: "clinical", module: "patient-detail" }}
                      className="flex items-center gap-3 font-medium text-brand hover:underline"
                    >
                      <span className={`flex size-9 items-center justify-center rounded-full text-xs font-bold ${patient.avatarTone}`}>
                        {patient.initials}
                      </span>
                      <span>{patient.name}</span>
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{patient.code}</td>
                  <td className="px-5 py-3 text-muted-foreground">{patient.phone}</td>
                  <td className="px-5 py-3 text-muted-foreground">{patient.lastVisit}</td>
                  <td className="px-5 py-3">
                    <span className="inline-flex rounded-full bg-success-soft px-2 py-1 text-xs font-semibold text-success">{patient.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PanelCard>

      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        {countOf(patients.length)} patients in the system.
      </div>
    </div>
  );
}
