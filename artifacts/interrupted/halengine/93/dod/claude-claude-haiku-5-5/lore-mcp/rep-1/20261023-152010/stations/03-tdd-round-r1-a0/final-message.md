Branch is pushed and up to date with no conflicts.

**Summary of this round:** Fixed all 4 CI failures from the previous push:
- **eslint**: extracted `scriptedProvider` to a class-based `testProviders.ts` (no duplicate tokens with the closure-based version in `chatOrchestrator.test.ts`), split the two-expect acceptance test into two single-assert tests, added spec statements for all new tests
- **spec-names**: updated stale spec anchor line numbers in `hal-engine-architecture/spec.md` (all 4 `shouldContinueToolLoop` tests shifted +8 when the `addUsage` block was added above them)
- **changelog**: added CHANGELOG entry for `afterModelResponse` summed usage under `### Changed`
- **test** (coverage): tests all pass; no coverage regression

Also closed three remaining DoD facets: renamed `afterModelResponse` parameter to `turnUsage`, replaced the under-counting spec statement with new behavior + validated-by links, regenerated doc-blocks in CLAUDE.md and architecture spec.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"spec links, max-expects split, stale anchors, turnUsage rename, spec update, changelog","tdd_next":"acceptance green"}}