I have completed the red-green-refactor cycle.

I added the `TurnUsage` type to make the total-usage contract explicit and implemented `aggregateUsage` in `orchestratorHelpers.ts` to accumulate token counts correctly across rounds, preserving `undefined` when no rounds report usage. I then updated `chatOrchestrator.ts` to use this accumulator and pass `totalUsage` to `hooks.afterModelResponse`. The new unit test in `orchestratorHelpers.test.ts` passes, as does the unchanged single-round regression guard in `chatOrchestrator.test.ts`. I also updated the `.lore/dod.md` checklist.

0 red tests were mine, and 0 were regressions (this is the first round and no CI build was present).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum each token field only for provider rounds that report usage, preserving undefined when none do.","tdd_next":"Update the hooks spec and CHANGELOG with the aggregate-usage behavior and its impact on existing consumers."}}