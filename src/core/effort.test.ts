import { describe, expect, it } from "vitest";
import { claudeAdapter } from "../harness/claude.js";
import { codexAdapter } from "../harness/codex.js";
import { effortLabel } from "./effort.js";

const spec = { model: "m", prompt: "p", workspaceDir: "/w", homeDir: "/h", mcp: null, extraEnv: {}, gemini: null, userHome: "/u" };

describe("effort", () => {
  it("labels an unset effort by the CLI that chose it: codex gpt-6.1-sol low, gemini and claude by their documented defaults", () => {
    expect(effortLabel("codex", "gpt-6.1-sol", undefined)).toBe("low (codex default)");
    expect(effortLabel("gemini", "gemini-4-argon", undefined)).toBe("medium (gemini-cli default)");
    expect(effortLabel("gemini", "gemini-3.1-pro-preview", undefined)).toBe("high (gemini-cli default)");
    expect(effortLabel("gemini", "gemini-4-carbon", undefined)).toBe("medium (gemini-cli default)");
    expect(effortLabel("gemini", "gemini-3.8-flash", undefined)).toBe("high (gemini-cli default)");
    expect(effortLabel("claude", "claude-opus-5-5", undefined)).toBe("medium (claude CLI default)");
    expect(effortLabel("claude", "claude-fable-5-1", undefined)).toBe("high (claude CLI default)");
    expect(effortLabel("claude", "claude-opus-5-5", "high")).toBe("high");
  });

  it("passes high as --effort to claude and as model_reasoning_effort to codex, and nothing when unset", () => {
    expect(claudeAdapter.command({ ...spec, effort: "high" }).args).toContain("--effort");
    expect(claudeAdapter.command(spec).args).not.toContain("--effort");
    expect(codexAdapter.command({ ...spec, effort: "high" }).args.slice(0, 2)).toEqual(["-c", 'model_reasoning_effort="high"']);
  });
});
