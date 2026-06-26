export function formatCents(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export function parseDollarsToCents(value: string): number {
  const parsed = parseFloat(value.replace(/[^0-9.]/g, ""));
  if (!Number.isFinite(parsed) || parsed < 0) {
    throw new Error("Enter a valid amount.");
  }
  return Math.round(parsed * 100);
}
