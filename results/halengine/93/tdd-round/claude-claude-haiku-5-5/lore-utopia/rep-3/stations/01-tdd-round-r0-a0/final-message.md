This round closed the summing facet. The branch is pushed and in sync with its upstream, and the merge with `origin/main` needed nothing.

**What changed**
- `src/orchestration/chatOrchestrator.test.ts`: added one unit test, "sums the usage of every round that reports it". It drives a two-round turn with known counts and expects the hook to get the sum. It failed red first, with the hook receiving only the last round's 5/4/9 instead of 7/5/12.
- `src/orchestration/chatOrchestrator.ts`: `lastUsage` is now `totalUsage`, and each round goes through a small `addUsage` helper. It adds each token field for rounds that report usage, leaves the total alone for rounds that report none, and stays `undefined` when nothing reported. The no-tool path is unchanged.
- `.lore/dod.md`: ticked the summing facet.
- Formatter run with Prettier on the two source files. Nothing else was run.

**Verification**
- Ran the orchestrator unit file locally with Jest: 25 of 25 pass, including the unedited no-tool guard and the existing gap test. The repo uses Jest, not Vitest as the example in the brief suggested.
- I did not run the acceptance test file or anything else from `.lore/dod.md`, per the brief. I expect the summing acceptance test to go green in CI, but that is unverified.
- No typecheck, lint, or build was run in this pod.

**CI and graph**
- No `round-brief.md` exists, so there is no previous red verdict to fix.
- `lore_get_ci_failures` and `lore-query-trace` both returned HTTP 403 with this token. I did not look for another token. I could not check CI's verdict on this branch, nor which tests cover `chatOrchestrator.ts`.
- Because of that I cannot give a count of red tests that were mine versus regressions. CI should be checked on the pushed commit.

**Still open**
- Facet 1: name the total-usage contract in the public type. The local variable is renamed, but the public signature is unchanged.
- Facet 4: update the hooks spec and CHANGELOG. The spec already claims the summed behaviour, but its status and the CHANGELOG entry still need doing.

**Noticed, not touched:** nothing unrelated came up this round.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum each token field only for provider rounds that report usage, preserving undefined when none do.","tdd_next":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit."}}