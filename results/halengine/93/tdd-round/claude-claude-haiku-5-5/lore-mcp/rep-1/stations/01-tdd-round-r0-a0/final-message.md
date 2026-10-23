Round complete for the summing facet. I committed and pushed `ce0c19e`, and the branch is not ahead of its upstream.

**What changed**
- `src/orchestration/orchestratorHelpers.test.ts`: one new unit test, `addUsage`, which sums each token field for reported rounds, passes a single reported value through, and stays `undefined` when nothing reported. I wrote it first and confirmed it was red because `addUsage` did not exist.
- `src/orchestration/orchestratorHelpers.ts`: the least code to pass it, `addUsage(total, next)`.
- `src/orchestration/chatOrchestrator.ts`: the round loop now calls `lastUsage = addUsage(lastUsage, outcome.usage)` instead of keeping only the last round's usage. This is the call-site change that makes the hook receive the turn total.
- `.lore/dod.md`: ticked the summing facet.
- Formatted the changed files with prettier.

**Choices I made**
- I kept the hook's signature as one `UsageMetadata` argument, which is the accumulate-and-sum shape from the ticket. The public type naming is still open (facet 1), so the type does not yet say "this is a sum".

**Tests**
- Ran one test file, `src/orchestration/orchestratorHelpers.test.ts`, with `NODE_OPTIONS=--experimental-vm-modules` (the repo's own test script sets this flag): 5 of 5 passed.
- I did not run the acceptance tests or the existing hook guard `receives collected response text and usage`. The guard should still pass, since `addUsage(undefined, u)` returns `u`, but that is by reading, not by running. CI will judge it.
- No `round-brief.md` existed, so there was no CI verdict to act on. Regressions caused by me: none known; no CI verdict yet, so red tests I wrote: 0 known.

**Not done / noticed**
- `lore-query-trace` returned HTTP 403 (the token lacks trace read scope), so I could not check tests covering `chatOrchestrator.ts` through the graph. I checked by reading the code instead.
- Facets still open: naming the total-usage contract (facet 1), the existing guard, and the spec and CHANGELOG update. The spec at `specs/hal-engine-config-hooks/spec.md` already mentions the summed behaviour and cites the acceptance test, so the spec facet may be partly done; the CHANGELOG entry is not.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum each token field only for provider rounds that report usage, preserving undefined when none do","tdd_next":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit"}}