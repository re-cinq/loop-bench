// Every instruction file an agent CLI would pick up from the folders above where it runs. A bench run must see none.
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const INSTRUCTION_FILES = ["CLAUDE.md", ".claude/CLAUDE.md", "CLAUDE.local.md", "AGENTS.md", "GEMINI.md", ".gemini/GEMINI.md"];

export function ancestorInstructionFiles(dir: string): string[] {
  const found: string[] = [];
  let current = resolve(dir);

  for (;;) {
    found.push(...INSTRUCTION_FILES.map((file) => join(current, file)).filter((path) => existsSync(path)));
    const parent = dirname(current);

    if (parent === current) {
      return found;
    }
    current = parent;
  }
}
