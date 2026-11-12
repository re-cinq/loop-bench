### Summary of Round

1. **Facet Closed**: `Update specs/hal-engine-config-hooks/spec.md with the new guarantee for beforeSession.`
   - Moved the `beforeSession` throw semantics to `## Installing hooks through config`, specifying that `onError` and `afterSession` run, the error propagates as a rejection, and `afterSession` can assume no tools were run and the turn was aborted before provider interaction (`[validated by: runs onError and afterSession when beforeSession throws](../../src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts#L40)`).
   - Removed the obsolete flaw entry from `## Measured semantics — out of scope` and adjusted the count from three properties to two properties.
   - Updated `.lore/dod.md` to check off the facet.
2. **Testing**: This was a specification update facet with no new test written this round; the round ran no tests here. Red tests: 0 were mine, 0 regressions. Spec anchor and placement verification scripts passed.
3. **Unrelated smells**: None acted upon.
4. **Push**: Committed as `95b4c1e`, pushed to `origin/loop-bench/94`, verified clean working tree and no drift against `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Update specs/hal-engine-config-hooks/spec.md with the new guarantee for beforeSession.","tdd_next":"Document in the CHANGELOG what changes for an existing consumer."}}