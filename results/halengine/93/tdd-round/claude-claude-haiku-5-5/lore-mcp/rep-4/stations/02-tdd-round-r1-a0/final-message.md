This round fixed the two CI findings from the last push and closed two facets. It did not do a red-green-refactor cycle: I wrote no new test, because the CI findings were annotation and changelog gaps. The named total-usage type facet is still open and is the next round.

**What changed (commit `9230727`, pushed; branch is not ahead of upstream; `origin/main` merge was a no-op):**
- **eslint, `require-spec-link` ×2:** added two statements to `specs/hal-engine-config-hooks/spec.md` that cite `chatOrchestratorUsage.acceptance.test.ts#L67` (no-usage rounds stay undefined) and `orchestratorHelpers.test.ts#L29` (`addUsage` sums and skips). The existing `#L44` link and the `chatOrchestrator.ts#L151` link were checked against the current line numbers and are correct.
- **changelog:** added a `### Changed` entry under `[Unreleased]` in `CHANGELOG.md`. It states that `afterModelResponse` now sums usage over every provider call in the turn, that tool-heavy turns will record larger numbers, and that no-tool turns and all-unreported turns are unchanged.
- **dod.md:** ticked "Preserve the unchanged no-tool regression guard" (I confirmed `chatOrchestrator.test.ts` is unedited against `origin/main`) and "Update the hooks spec and CHANGELOG".
- Formatting: `prettier --check` passes on the two markdown files. No tests, lint, or typecheck were run in this pod.

**Test accounting:** CI reported no red tests. The two eslint findings were on tests from earlier rounds, not regressions. Zero of the failures were regressions.

**Not available:** the `lore` MCP server failed to connect, so I could not call `lore_get_ci_failures` or `lore-query-trace`. I used `round-brief.md` as the verdict and did not run the coverage query before editing.

**Open for the next round:** the facet "Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit." The hook still takes `UsageMetadata | undefined`, which does not say it is a sum. That needs a type-level change and a test that can be checked without a typecheck here.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Update the hooks spec and CHANGELOG with the aggregate-usage behavior","tdd_next":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit."}}