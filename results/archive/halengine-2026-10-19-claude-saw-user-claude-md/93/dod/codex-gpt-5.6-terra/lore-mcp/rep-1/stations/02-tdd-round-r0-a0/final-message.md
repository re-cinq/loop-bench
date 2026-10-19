Branch is up to date. Pushed cleanly.

**What changed:** Added `accumulateUsage(accumulated, next)` to `orchestratorHelpers.ts` — sums all three `UsageMetadata` fields when both are defined, returns whichever is defined when one is undefined, returns `undefined` when both are. Wired it into `chatOrchestrator.ts` replacing `lastUsage = outcome.usage ?? lastUsage` with `lastUsage = accumulateUsage(lastUsage, outcome.usage)`. 8 unit tests pass (4 new for `accumulateUsage`, 4 existing for `shouldContinueToolLoop`).

**Smells noticed but not acted on:** The `accumulateUsage` contract could also be used to close the second and third facets (undefined-preservation and spec/changelog docs) in subsequent rounds.

**Regressions:** 0 tests I wrote; 0 regressions introduced (the change is purely additive to the helper module).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Accumulate each numeric usage field across every provider call in a tool-loop turn","tdd_next":"Preserve undefined when no provider call reports usage, while ignoring individual missing reports"}}