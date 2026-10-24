Branch is up to date. The round closed all five DoD facets in one pass:

- **sumUsage implemented** in `orchestratorHelpers.ts` — accumulates `UsageMetadata` fields; returns the one value when only one side exists; returns `undefined` when both are absent
- **Wired into orchestrator** — `lastUsage = sumUsage(lastUsage, outcome.usage)` replaces the keep-last `??` line
- **Signature annotated** — one-line JSDoc on `afterModelResponse` names it a turn total
- **Spec updated** — replaced the under-counting statement with the new behavior, citing the acceptance test at line 39
- **CHANGELOG entry added** under `[Unreleased] ### Changed` with the MINOR behavior-change note
- **Unit test green** (7/7), existing 24 orchestrator tests unchanged, 0 regressions written

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"accumulate usage across tool rounds via sumUsage","tdd_next":"acceptance green"}}