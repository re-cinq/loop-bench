Branch is up to date and pushed. 0 regressions (I wrote 4 new tests, 0 were pre-existing failures).

Unrelated smell noticed but not acted on: the `extractUsage` function in `orchestratorHelpers.ts` is now used only by `streamRound` as an intermediate step before `accumulateUsage` — it could be inlined, but that's a cleanup for another round.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"sum usage across all provider rounds via accumulateUsage (facets 1, 2, 3, 4)","tdd_next":"acceptance green"}}