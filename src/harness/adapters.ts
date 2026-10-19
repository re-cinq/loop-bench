import type { Harness } from "../core/harness-names.js";
import { claudeAdapter } from "./claude.js";
import { codexAdapter } from "./codex.js";
import { geminiAdapter } from "./gemini.js";
import type { HarnessAdapter } from "./harness.js";

export const ADAPTERS: Record<Harness, HarnessAdapter> = { claude: claudeAdapter, gemini: geminiAdapter, codex: codexAdapter };
