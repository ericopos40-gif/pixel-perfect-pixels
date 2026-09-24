import { cn } from "@/lib/utils";

const TONES: Record<string, string> = {
  SCHEDULED: "bg-muted text-muted-foreground",
  CONFIRMED: "bg-brand-soft text-brand",
  CHECKED_IN: "bg-info-soft text-info",
  WAITING: "bg-warning-soft text-warning-foreground",
  WITH_NURSE: "bg-teal-soft text-teal",
  IN_ROOM: "bg-violet-soft text-violet",
  COMPLETED: "bg-success-soft text-success",
  CANCELLED: "bg-danger-soft text-destructive",
  NO_SHOW: "bg-danger-soft text-destructive",
  PAID: "bg-success-soft text-success",
  PENDING: "bg-warning-soft text-warning-foreground",
  PARTIAL: "bg-info-soft text-info",
  OVERDUE: "bg-danger-soft text-destructive",
  VOID: "bg-muted text-muted-foreground",
  AVAILABLE: "bg-success-soft text-success",
  ON_LEAVE: "bg-warning-soft text-warning-foreground",
  OFF_DUTY: "bg-muted text-muted-foreground",
  Active: "bg-success-soft text-success",
  Inactive: "bg-muted text-muted-foreground",
  Income: "bg-success-soft text-success",
  Expense: "bg-danger-soft text-destructive",
  Draft: "bg-muted text-muted-foreground",
  Published: "bg-success-soft text-success",
};

export function humanizeStatus(status: string) {
  if (!/[A-Z_]/.test(status) || status.includes(" ")) return status;
  return status
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap",
        TONES[status] ?? "bg-muted text-muted-foreground",
        className,
      )}
    >
      {humanizeStatus(status)}
    </span>
  );
}
