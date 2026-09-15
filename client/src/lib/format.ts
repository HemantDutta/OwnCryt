export function formatInrRange(min: number, max?: number): string {
  const fmt = (n: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(n);
  if (max && max !== min) return `${fmt(min)} – ${fmt(max)}`;
  return fmt(min);
}

export function statusLabel(status: "coming-soon" | "in-development"): string {
  return status === "coming-soon" ? "Coming soon" : "In development";
}
