import { PanelCard, EmptyState } from "@/components/shared/PanelCard";

export function Expenses() {
  return (
    <PanelCard title="Expenses" subtitle="Expense tracking and cost management">
      <EmptyState message="Expenses view coming soon." />
    </PanelCard>
  );
}
