export interface Spread {
  n: number;
  mean: number;
  min: number;
  max: number;
  sd: number;
}

export function spreadOf(values: readonly number[]): Spread | null {
  if (values.length === 0) {
    return null;
  }
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  const variance = values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / values.length;

  return { n: values.length, mean, min: Math.min(...values), max: Math.max(...values), sd: Math.sqrt(variance) };
}

export function formatSpread(spread: Spread | null, format: (value: number) => string): string {
  if (!spread) {
    return "—";
  }

  return spread.n === 1 ? format(spread.mean) : `${format(spread.mean)} (${format(spread.min)}–${format(spread.max)}, sd ${format(spread.sd)})`;
}

/** The p-th percentile (0–100) by linear interpolation; null for no values. */
export function percentile(values: readonly number[], p: number): number | null {
  if (values.length === 0) {
    return null;
  }
  const sorted = [...values].sort((a, b) => a - b);
  const rank = (p / 100) * (sorted.length - 1);
  const low = Math.floor(rank);
  const high = Math.ceil(rank);

  return sorted[low]! + (sorted[high]! - sorted[low]!) * (rank - low);
}
