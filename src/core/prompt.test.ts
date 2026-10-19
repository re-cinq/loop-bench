import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { buildStationPrompt, localizeWorkspacePaths, placeholdersIn, stripFrontmatter } from "./prompt.js";

const PROMPTS = join(import.meta.dirname, "../../prompts");
const stations = readdirSync(PROMPTS, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && entry.name !== "skills" && entry.name !== "hooks")
  .map((entry) => entry.name);

describe("synced prompts", () => {
  it.each(stations)("%s/baseline.md has {ticket_path} as its only placeholder", (station) => {
    const body = stripFrontmatter(readFileSync(join(PROMPTS, station, "baseline.md"), "utf8"));

    expect(placeholdersIn(body)).toEqual(["ticket_path"]);
  });

  it("the guard script and both hook bundles are present", () => {
    expect(readFileSync(join(PROMPTS, "skills/lore-context/guard-tests.sh"), "utf8")).toContain("LORE_TEST_POLICY");
    expect(readFileSync(join(PROMPTS, "hooks/claude/.claude/settings.json"), "utf8")).toContain("PreToolUse");
    expect(readFileSync(join(PROMPTS, "hooks/gemini/.gemini/settings.json"), "utf8")).toContain("BeforeTool");
  });
});

describe("localizeWorkspacePaths", () => {
  it("rewrites /workspace/target and /workspace/round-brief.md but not the word workspace in prose", () => {
    const body = "cd /workspace/target; read /workspace/round-brief.md; NEVER run a workspace build (`/workspace`).";

    expect(localizeWorkspacePaths(body, "/runs/1/ws")).toBe(
      "cd /runs/1/ws/target; read /runs/1/ws/round-brief.md; NEVER run a workspace build (`/runs/1/ws`).",
    );
  });

  it("leaves a body without the token unchanged", () => {
    expect(localizeWorkspacePaths("npm run build in the workspace", "/x")).toBe("npm run build in the workspace");
  });
});

describe("buildStationPrompt", () => {
  it("leaves a ticket path under /home/u/workspace untouched", () => {
    const built = buildStationPrompt({
      markdown: "cd /workspace/target and read `{ticket_path}`.",
      workspaceDir: "/home/u/workspace/runs/1/workspace",
      ticketPath: "/home/u/workspace/runs/1/workspace/ticket.md",
      header: { repo: "o/r", ticketNumber: 1, ticketTitle: "t" },
    });

    expect(built.prompt).toContain("cd /home/u/workspace/runs/1/workspace/target and read `/home/u/workspace/runs/1/workspace/ticket.md`.");
  });

  it("starts with the Repository and Ticket header and records both hashes", () => {
    const built = buildStationPrompt({
      markdown: "---\nmodel: x\n---\nRead `{ticket_path}` in /workspace.",
      workspaceDir: "/w",
      ticketPath: "/w/ticket.md",
      header: { repo: "re-cinq/HALEngine", ticketNumber: 93, ticketTitle: "Report usage" },
    });

    expect(built.prompt).toBe("Repository: re-cinq/HALEngine\nTicket: #93 Report usage\n\nRead `/w/ticket.md` in /w.");
    expect(built.sha256Verbatim).toMatch(/^[0-9a-f]{64}$/);
    expect(built.sha256Sent).not.toBe(built.sha256Verbatim);
  });
});
