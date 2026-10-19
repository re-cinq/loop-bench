export interface PatchLine {
  kind: " " | "+" | "-";
  text: string;
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
