// Structural comparison of the agent's diff with the merged pull request's.

export interface FileChange {
  path: string;
  additions: number;
  deletions: number;
}

export interface Structural {
  additions: number;
  deletions: number;
  files: number;
  production_files: number;
  test_files: number;
  jaccard_files: number;
}

export function parseNumstat(text: string): FileChange[] {
  return text
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line) => {
      const [additions = "0", deletions = "0", ...rest] = line.split("\t");

      return { path: rest.join("\t"), additions: countOf(additions), deletions: countOf(deletions) };
    });
}

// Binary files show as "-".
function countOf(value: string): number {
  const parsed = Number.parseInt(value, 10);

  return Number.isNaN(parsed) ? 0 : parsed;
}

export function structuralMetrics(candidate: readonly FileChange[], reference: readonly FileChange[], testFilePattern: RegExp): Structural {
  const candidatePaths = new Set(candidate.map((change) => change.path));
  const referencePaths = new Set(reference.map((change) => change.path));
  const union = new Set([...candidatePaths, ...referencePaths]);
  const intersection = [...candidatePaths].filter((path) => referencePaths.has(path));

  return {
    additions: candidate.reduce((sum, change) => sum + change.additions, 0),
    deletions: candidate.reduce((sum, change) => sum + change.deletions, 0),
    files: candidatePaths.size,
    production_files: [...candidatePaths].filter((path) => !testFilePattern.test(path)).length,
    test_files: [...candidatePaths].filter((path) => testFilePattern.test(path)).length,
    jaccard_files: union.size === 0 ? 1 : intersection.length / union.size,
  };
}
