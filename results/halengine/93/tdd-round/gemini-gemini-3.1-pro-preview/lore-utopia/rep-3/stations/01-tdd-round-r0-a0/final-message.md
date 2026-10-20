I have successfully completed exactly ONE red-green-refactor TDD round for the new aggregated usage behavior.

1. Wrote failing unit tests for `aggregateUsage` inside `src/orchestration/orchestratorHelpers.test.ts` asserting it handles sums appropriately as well as missing round data.
2. Made it green by implementing `aggregateUsage` in `src/orchestration/orchestratorHelpers.ts`.
3. Created the explicit `TotalUsage` interface contract in `src/types/ai.ts` and updated `src/orchestration/chatOrchestrator.ts` to fold usage metrics natively over multiple rounds.
4. Assured tests ran cleanly without error.
5. Formatted code via `prettier` and committed to the branch without any regressions.

I had 0 red tests of my own remain and there were 0 regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum each token field only for provider rounds that report usage, preserving `undefined` when none do.","tdd_next":"Update the hooks spec and CHANGELOG with the aggregate-usage behavior and its impact on existing consumers."}}