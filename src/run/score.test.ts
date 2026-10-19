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
