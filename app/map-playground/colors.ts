export const INK = "#191715";
export const ALTERNATIVE_ROUTE = "#7a7a7a";

// Ordered so each color is far from the one before it; only the starting point is random.
const PALETTE = [
  "#2563eb",
  "#dc2626",
  "#16a34a",
  "#9333ea",
  "#ca8a04",
  "#0891b2",
  "#db2777",
  "#65a30d",
  "#4f46e5",
  "#0d9488",
];

let offset: number | null = null;

export function pointColor(index: number) {
  offset ??= Math.floor(Math.random() * PALETTE.length);
  return PALETTE[(offset + index) % PALETTE.length];
}
