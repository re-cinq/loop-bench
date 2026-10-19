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
