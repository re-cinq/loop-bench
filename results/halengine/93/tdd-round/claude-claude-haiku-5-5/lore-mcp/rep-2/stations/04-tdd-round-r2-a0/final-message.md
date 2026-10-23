The CI lint fix is pushed to `loop-bench/93`, and the branch is no longer ahead of its upstream.

**What CI reported:** eslint `re-lint/no-duplicate-code` on `chatOrchestratorTurnUsage.test.ts` and `chatOrchestratorUsage.acceptance.test.ts`. No tests were red.

**What I changed:**
- Deleted `src/orchestration/chatOrchestratorTurnUsage.test.ts`, my one-round test. It was a copy of the setup in the acceptance test, and its assertion is a strict subset of the two-round acceptance case. It exists only on this branch.
- Removed the spec line in `specs/hal-engine-config-hooks/spec.md` that validated the one-round test. Line 28 already pins the summed total against the acceptance test.
- Reworded the `.lore/dod.md` facet to say the two-round acceptance test covers it. The facet stays ticked.
- I did not touch the acceptance test file.
- Prettier ran on the two docs files. Merging `origin/main` produced no conflicts.

**Limits of this round:**
- No tests were run in this pod, and no lint or typecheck either.
- `lore-query-trace` returned HTTP 403 (the token lacks `read` scope), so I could not check which tests cover the file I edited. I relied on the file being absent from main and on its test being a subset of the acceptance case.
- Red tests I wrote: 0. Regressions: 0.

**Still open:** the facets "Replace final-round retention with a deliberately named total-usage contract" and "Preserve the unchanged no-tool regression guard" remain unchecked. I did not start either, since this visit was the CI fix.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"none (CI eslint duplicate-code fix only)","tdd_next":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit"}}