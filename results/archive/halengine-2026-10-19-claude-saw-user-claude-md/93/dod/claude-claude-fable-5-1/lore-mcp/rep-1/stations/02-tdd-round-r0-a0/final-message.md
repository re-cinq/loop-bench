Branch is up to date and pushed. The round closed both accumulation facets:

- Added `addUsage(acc, next)` to `orchestratorHelpers.ts` — sums fields when both present, returns whichever is defined when one is absent, returns `undefined` when neither is
- Changed `chatOrchestrator.ts` line 117 from `lastUsage = outcome.usage ?? lastUsage` to `lastUsage = addUsage(lastUsage, outcome.usage)`
- 8 unit tests green (4 new `addUsage` tests + 4 existing `shouldContinueToolLoop` tests)
- No smells noticed worth naming beyond the scope of this ticket

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"accumulate usage across tool rounds (facets 1 & 2)","tdd_next":"make the signature say it is a sum (OrchestratorHooks type annotation facet)"}}