The DoD already has all facets checked — no tick changes needed. All 5 eslint errors and the spec-names failure from the round brief are addressed:

- `re-lint/callee-below-caller`: moved `makeToolOrchestrator` below `runRounds`
- `re-lint/no-duplicate-code` (×2): extracted `threeRoundWithMiddleEmpty` helper
- `re-lint/require-spec-link` (×2): fixed by correcting spec link line numbers
- `spec-names` check: all 8 citations in `specs/hal-engine-config-hooks/spec.md` repointed via `check-spec-anchor-names.mjs --fix`

0 regressions introduced; 0 tests I wrote (this round fixed CI infrastructure failures, not new behaviour).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix eslint callee-below-caller, no-duplicate-code, require-spec-link and spec-names CI failures","tdd_next":"acceptance green"}}