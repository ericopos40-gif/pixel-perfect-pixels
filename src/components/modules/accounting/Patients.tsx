import { PanelCard } from "@/components/shared/PanelCard";

export function Patients() {
  return (
    <div className="space-y-6">
      <PanelCard title="Patient Accounts" subtitle="View patient financial records and balances">
        <div className="p-8 text-center text-muted-foreground">
          <p>Patient accounts module coming soon...</p>
        </div>
      </PanelCard>
    </div>
  );
}
