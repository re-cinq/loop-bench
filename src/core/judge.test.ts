import { describe, expect, it } from "vitest";
import { buildJudgePrompt, parseJudgeOutput } from "./judge.js";

describe("parseJudgeOutput", () => {
  it("reads scores 4, 3, 5 from a bare JSON reply", () => {
    expect(parseJudgeOutput('{"correctness":4,"completeness_vs_ticket":3,"closeness_to_reference":5,"rationale":"ok"}')).toEqual({
      correctness: 4,
      completeness_vs_ticket: 3,
      closeness_to_reference: 5,
      rationale: "ok",
    });
  });

  it("reads the JSON out of a fenced block with prose around it", () => {
    const text = 'Here:\n```json\n{"correctness":2,"completeness_vs_ticket":2,"closeness_to_reference":1,"rationale":"thin"}\n```\nDone.';

    expect(parseJudgeOutput(text)?.correctness).toBe(2);
  });

  it("returns null for a score of 7", () => {
    expect(parseJudgeOutput('{"correctness":7,"completeness_vs_ticket":3,"closeness_to_reference":5,"rationale":"x"}')).toBeNull();
  });
});

describe("buildJudgePrompt", () => {
  it("caps a 20-character diff at 10 and says how much was cut", () => {
    const prompt = buildJudgePrompt({ ticket: "t", referenceDiff: "r".repeat(20), candidateDiff: "c", dodMarkdown: null, diffCapChars: 10 });

    expect(prompt).toContain(`${"r".repeat(10)}\n...(truncated 10 characters)`);
    expect(prompt).not.toContain("definition of done");
  });

  it("writes a hunk header and a decorator without an at sign, which gemini-cli would read as a file", () => {
    const prompt = buildJudgePrompt({ ticket: "t", referenceDiff: "@@ -1 +1 @@\n@Injectable()", candidateDiff: "c", dodMarkdown: null, diffCapChars: 100 });

    expect(prompt).toContain("## -1 +1 ##\n(at)Injectable()");
    expect(prompt).not.toContain("@");
  });
});
