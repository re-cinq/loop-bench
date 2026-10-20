export interface PatchLine {
  kind: " " | "+" | "-";
  text: string;
  /** Line number before the change; null on an added line. */
  oldNo: number | null;
  /** Line number after the change; null on a removed line. */
  newNo: number | null;
}

export interface PatchHunk {
  header: string;
  lines: PatchLine[];
}

export interface PatchFile {
  path: string;
  oldPath: string;
  status: "added" | "deleted" | "modified" | "renamed";
  additions: number;
  deletions: number;
  binary: boolean;
  hunks: PatchHunk[];
}

export function parsePatch(text: string): PatchFile[];
export function isTestPath(path: string): boolean;
