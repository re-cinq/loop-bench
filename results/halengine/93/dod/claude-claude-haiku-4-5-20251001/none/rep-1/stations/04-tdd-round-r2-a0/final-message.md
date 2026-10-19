Branch is up to date. This round fixed all 4 ESLint errors from the previous CI failure:

1. **`chatOrchestrator.acceptance.test.ts:10`** — moved `createSession` below `runWithUsageHook` (callee-below-caller)
2. **`orchestratorHelpers.test.ts:35`** — split the 2-expect test into two single-expect tests (max-expects)
3. **`orchestratorHelpers.test.ts:35`** — added spec link for new test at L35 in spec.md (require-spec-link)
4. **`orchestratorHelpers.test.ts:41`** (now L45) — added spec link for the "undefined" test in spec.md (require-spec-link)

All test line numbers in the spec were verified correct after the edits. The round ran no local tests due to Jest ESM configuration preventing direct execution; CI is the judge.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix all CI ESLint errors from round 4","tdd_next":"acceptance green"}}