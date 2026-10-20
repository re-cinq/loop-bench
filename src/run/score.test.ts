import { describe, expect, it } from "vitest";
import { acceptanceFilesOf } from "./score.js";

describe("acceptanceFilesOf", () => {
  it("reads src/usage.acceptance.test.ts from the Done when these pass section and ignores the Facets section", () => {
    const dod = `# Definition of Done

> claim

**Strategy: \`direct\`** — seam.

## Done when these pass

- [ ] **reports usage** — the behaviour
  \`src/usage.acceptance.test.ts\`

## Facets

- [ ] write \`src/other.test.ts\`
`;

    expect(acceptanceFilesOf(dod, ["fallback.test.ts"])).toEqual(["src/usage.acceptance.test.ts"]);
  });

  it("falls back to the added test files when the section names none", () => {
    expect(acceptanceFilesOf("# Definition of Done\n\n## Facets\n- x", ["a.test.ts"])).toEqual(["a.test.ts"]);
  });
});

import { isInfraError } from "./station.js";

describe("isInfraError", () => {
  it("an expired Google login (invalid_rapt) on a nonzero exit is infrastructure, a red test is not", () => {
    expect(isInfraError({ exitCode: 1, stdout: '{"error":"invalid_grant","error_subtype":"invalid_rapt"}', stderr: "" })).toBe(true);
    expect(isInfraError({ exitCode: 1, stdout: "Tests: 1 failed", stderr: "" })).toBe(false);
    expect(isInfraError({ exitCode: 1, stdout: '{"type":"turn.failed","error":{"message":"You\u2019ve hit your usage limit. Upgrade to Pro"}}', stderr: "" })).toBe(true);
    expect(isInfraError({ exitCode: 0, stdout: "invalid_grant mentioned in a file the agent read", stderr: "" })).toBe(false);
  });
});

import { withoutTools } from "./score.js";

describe("withoutTools", () => {
  it("gemini judge runs without --yolo and without the bypass policy", () => {
    expect(withoutTools("gemini", ["--prompt", "p", "--yolo", "--policy", "/h/p.toml", "--skip-trust"])).toEqual(["--prompt", "p", "--skip-trust"]);
  });
});

import { isTestSupport } from "./score.js";

describe("isTestSupport", () => {
  it("orchestratorTestSupport.ts and a.test.ts are support, chatOrchestrator.ts and spec.md are not", () => {
    expect(["src/orchestration/orchestratorTestSupport.ts", "src/a.test.ts", "src/orchestration/chatOrchestrator.ts", "specs/x/spec.md"].map(isTestSupport)).toEqual([true, true, false, false]);
  });
});
