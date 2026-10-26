The round fixed both CI failures:

1. **ESLint `re-lint/require-spec-link`**: Added 4 spec statements in `specs/hal-engine-architecture/spec.md` under a new "Usage accumulation" subsection, linking to each `accumulateUsage` test by name and correct line number.

2. **ESLint `re-lint/max-expects`**: Split the 2-expect test "returns the defined side when only one side has usage" into two single-assert tests — "returns incoming usage when the running total is undefined" and "returns the running total when incoming usage is undefined".

3. **`spec-names` stale anchors**: Updated the 4 `shouldContinueToolLoop` test anchors in the spec from the origin/main line numbers (L11, L15, L19, L23) to the current file positions (L13, L17, L21, L25).

No regressions — 8 tests in `orchestratorHelpers.test.ts` pass and `check-spec-anchor-names` reports 593 clean citations.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"CI gate failures: spec links, max-expects, stale anchors","tdd_next":"acceptance green"}}