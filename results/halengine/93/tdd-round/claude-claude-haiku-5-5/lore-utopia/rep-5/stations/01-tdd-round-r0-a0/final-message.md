The round closed the "sum each token field" facet and pushed it to `loop-bench/93`. Facet 1 (the named total-usage type) is the next round's work.

**What changed**
- `src/orchestration/orchestratorHelpers.ts`: new `addUsage(total, next)`. It sums `inputTokens`, `outputTokens` and `totalTokens` across rounds that reported usage. A round that reported nothing adds nothing, and a turn where nothing reported stays `undefined`.
- `src/orchestration/chatOrchestrator.ts`: the round loop now does `lastUsage = addUsage(lastUsage, outcome.usage)` instead of keeping only the last round's usage.
- `src/orchestration/orchestratorHelpers.test.ts`: three new unit tests for `addUsage`, written red first (the import failed) and green after the implementation.
- `.lore/dod.md`: ticked the summing facet.

**Tests**
- Ran by file with Jest under `node --experimental-vm-modules`, the same flag `npm test` uses. `npx jest` on its own fails on ESM, so I did not use it. The runner is Jest, not Vitest as the brief said.
- `orchestratorHelpers.test.ts` and `chatOrchestrator.test.ts` pass, 31 of 31. The no-tool guard `receives collected response text and usage` is unedited and green.
- I did not run the acceptance test file `chatOrchestratorUsage.acceptance.test.ts`, per the brief. CI will judge it. I expect the summing change to move it toward green, but I have not confirmed that.
- Red tests I wrote this round: 1 (`addUsage` import failing). Regressions: 0 seen.
- Prettier ran on the changed files; no lint or typecheck was run here.

**Still open for later rounds**
- Facet 1: a named total-usage contract type so the hook's signature says it is a sum. I have not changed the `afterModelResponse` signature yet.
- Facet 4: the CHANGELOG entry, which states the change in what an existing consumer records. `specs/hal-engine-config-hooks/spec.md` already describes the summed behaviour (line 28), but the CHANGELOG has nothing yet.
- Facet 3 (the guard) is verified green but not ticked, since it was preserved rather than changed.

**Branch state**
- Commit `12dd734` is pushed. `origin/main` was already merged in, and the branch is not ahead of its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum each token field only for provider rounds that report usage, preserving undefined when none do","tdd_next":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit"}}