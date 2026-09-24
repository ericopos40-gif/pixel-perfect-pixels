import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  hint?: string;
  hintTone?: "muted" | "success" | "warning" | "brand";
  icon: LucideIcon;
  iconTone?: string;
  className?: string;
}

const HINT_TONES = {
  muted: "text-muted-foreground",
  success: "text-success",
  warning: "text-warning-foreground",
  brand: "text-brand",
} as const;

export function StatCard({
  label,
  value,
  hint,
  hintTone = "muted",
  icon: Icon,
  iconTone = "bg-brand-soft text-brand",
  className,
}: StatCardProps) {
  return (
    <div className={cn("rounded-xl border border-border bg-card p-5 shadow-card", className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="mt-2 text-2xl font-bold text-heading">{value}</p>
          {hint ? <p className={cn("mt-1 text-xs font-medium", HINT_TONES[hintTone])}>{hint}</p> : null}
        </div>
        <span className={cn("flex size-11 shrink-0 items-center justify-center rounded-lg", iconTone)}>
          <Icon className="size-5" />
        </span>
      </div>
    </div>
  );
}
