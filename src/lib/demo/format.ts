export function ksh(amount: number, withPrefix = true): string {
  const formatted = new Intl.NumberFormat("en-KE", { maximumFractionDigits: 0 }).format(amount);
  return withPrefix ? `KSh ${formatted}` : formatted;
}

export function countOf(value: number): string {
  return new Intl.NumberFormat("en-KE").format(value);
}

export function initialsOf(name: string): string {
  return name
    .replace(/^Dr\.?\s+/i, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
