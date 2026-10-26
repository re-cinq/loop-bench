Pushed cleanly, no merge needed.

**Summary of this round:** Fixed all ESLint CI failures in `src/orchestration/chatOrchestrator.acceptance.test.ts` — extracted a `runTwoRoundTurn` helper to eliminate 26 lines of duplicate code, reduced each test to a single `expect`, condensed 2-line comment blocks, and added `([validated by: ...])` spec links for all three acceptance tests in `specs/hal-engine-config-hooks/spec.md`. All 3 tests pass. Updated `.lore/dod.md` with corrected line numbers.

The remaining open facet is: **Update type signature of `afterModelResponse` hook parameter to make it unambiguous**.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix CI lint failures: duplicate code, multi-expect tests, comment line limits, missing spec links","tdd_next":"Update type signature of afterModelResponse hook parameter to make it unambiguous"}}