// The HOME a station runs under: the lore skills and hook bundle, the harness's own files, and nothing of the user's but credentials.
import { chmodSync, cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { geminiSettings } from "./gemini.js";
import type { HarnessAdapter, InvocationSpec } from "./harness.js";

export interface ScratchHomeInput {
  spec: InvocationSpec;
  adapter: HarnessAdapter;
  promptsDir: string;
  skills: readonly string[];
}

export function buildScratchHome({ spec, adapter, promptsDir, skills }: ScratchHomeInput): void {
  mkdirSync(spec.homeDir, { recursive: true });
  const skillsDir = join(spec.homeDir, ".claude", "skills");

  for (const skill of skills) {
    cpSync(join(promptsDir, "skills", skill), join(skillsDir, skill), { recursive: true });
  }
  if (existsSync(join(skillsDir, "lore-context", "guard-tests.sh"))) {
    chmodSync(join(skillsDir, "lore-context", "guard-tests.sh"), 0o755);
  }
  writeFile(join(spec.homeDir, ".claude", "settings.json"), readFileSync(join(promptsDir, "hooks", "claude", ".claude", "settings.json"), "utf8"));
  writeFile(join(spec.homeDir, ".gemini", "settings.json"), geminiSettings(spec, readFileSync(join(promptsDir, "hooks", "gemini", ".gemini", "settings.json"), "utf8")));

  for (const file of adapter.homeFiles(spec)) {
    writeFile(file.path, file.content);
    if (file.mode !== undefined) {
      chmodSync(file.path, file.mode);
    }
  }
  for (const [from, to] of adapter.credentialCopies(spec)) {
    const source = join(spec.userHome, from);

    if (existsSync(source)) {
      mkdirSync(dirname(join(spec.homeDir, to)), { recursive: true });
      cpSync(source, join(spec.homeDir, to));
    }
  }
}

function writeFile(path: string, content: string): void {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content);
}
