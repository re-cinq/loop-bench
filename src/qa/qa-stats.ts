// The statistics the context-qa report needs beyond a spread: the coefficient of variation, and an exact McNemar test on paired outcomes.

/** Standard deviation over mean; null when the mean is 0 or there are fewer than two values. */
export function coefficientOfVariation(values: readonly number[]): number | null {
  if (values.length < 2) {
    return null;
  }
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;

  if (mean === 0) {
    return null;
  }
  const variance = values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / values.length;

  return Math.sqrt(variance) / mean;
}

/** Two-sided exact McNemar p-value from the discordant pairs: b questions only the first arm got right, c only the second. */
export function mcnemarExact(b: number, c: number): number {
  const n = b + c;

  if (n === 0) {
    return 1;
  }
  const k = Math.min(b, c);
  let tail = 0;

  for (let i = 0; i <= k; i += 1) {
    tail += binomial(n, i) / 2 ** n;
  }

  return Math.min(1, 2 * tail);
}

function binomial(n: number, k: number): number {
  let result = 1;

  for (let i = 1; i <= k; i += 1) {
    result = (result * (n - k + i)) / i;
  }

  return result;
}
