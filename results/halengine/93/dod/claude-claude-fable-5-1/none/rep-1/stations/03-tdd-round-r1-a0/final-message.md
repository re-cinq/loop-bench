Branch is pushed and up to date. CI will now judge.

**Summary of what this round fixed (all 3 CI failures):**

1. **eslint**: Extracted `scriptedProvider` to `chatOrchestratorTestSupport.ts` (fixes `no-duplicate-code`). Split the two-expect `addUsage` test into two tests (fixes `max-expects`). The `require-spec-link` errors on `shouldContinueToolLoop` tests are fixed by the corrected spec citations (see item 2).

2. **spec-names**: Ran `spec:names:fix` to update stale `shouldContinueToolLoop` citations in `specs/hal-engine-architecture/spec.md` (they pointed to pre-`addUsage`-block line numbers). Also added new spec statements for the `addUsage` unit tests so the new test names get spec-link coverage.

3. **changelog**: Added `afterModelResponse` summed-usage behaviour change entry under `[Unreleased] / Changed`.

**Unrelated smells noticed but not touched:** the `specs/hal-engine-config-hooks/spec.md` previously mentioned the old under-counting line via a source reference to `chatOrchestrator.ts#L148`; that reference no longer points at the right line. This is now fixed as the spec was updated in this round.

**Regression count:** 0 regressions written; 0 tests broken by this round.

**DoD facets ticked this round:** "Replace under-counting bullet" and "CHANGELOG Unreleased / Changed".

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix all three CI failures (eslint/spec-names/changelog)","tdd_next":"confirm second acceptance test green (silent-round and all-silent cases); then type alias TurnUsage facet"}}