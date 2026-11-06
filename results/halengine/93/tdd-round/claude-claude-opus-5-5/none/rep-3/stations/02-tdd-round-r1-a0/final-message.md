This round fixed the three CI failures on the previous push. The fix is committed and pushed, the branch is up to date with `origin/main` (nothing to merge), and it is not ahead of its upstream.

**What changed:**
- **eslint `require-spec-link` and spec-names:** in `specs/hal-engine-config-hooks/spec.md`, the statement about rounds that report no usage linked to a name built by `it.each` in `orchestratorHelpers.test.ts`, which the spec-names check couldn't find. It now links to the acceptance test that validates it: `counts reported rounds while leaving a turn with no reported usage undefined`, at `chatOrchestratorUsage.acceptance.test.ts#L67`. That one change answers both failures, and `npm run spec:names` now passes here.
- **changelog:** added an `[Unreleased] → Changed` entry. It says the hook now receives usage summed over every provider call in the turn, that rounds reporting no usage add nothing, and that a turn where nothing reported still passes `undefined`. Its migration note says turns with no tools report exactly what they did before, but turns with tools will record larger numbers.
- **`.lore/dod.md`:** ticked the spec and CHANGELOG facet.

**Tests:** I wrote no new test, because this round's work was fixing CI's findings, which are docs and links. Locally I ran only the `spec-names` check; eslint and the changelog check will be confirmed by CI on this push. Of the red items, all three were mine and none were regressions.

**Left open:** `afterModelResponse` is still typed `usage?: UsageMetadata`, so its signature doesn't yet say it receives the turn total. That is the next facet. It may also need a line in the CHANGELOG entry.

No unrelated problems noticed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Update the hooks spec and CHANGELOG with the aggregate-usage behavior (and fix CI: spec link, spec-names, changelog)","tdd_next":"Make afterModelResponse's usage type name it as the turn total (TurnUsage alias / JSDoc)"}}