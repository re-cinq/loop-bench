I have completed the single TDD round. The requested change involved fixing an issue where usage counters were being overwritten instead of aggregated across multiple tool rounds in `chatOrchestrator.ts`. 

To achieve this, I wrote a test for a new function `aggregateUsage` in `orchestratorHelpers.test.ts` to ensure `undefined` properties were appropriately handled and tokens correctly summed. This logic was then introduced in `chatOrchestrator.ts`, where `lastUsage` was renamed to `totalUsage` and `UsageMetadata` aggregation handled properly on each turn. 

I updated the `CHANGELOG.md` file appropriately and marked the facets as done within `.lore/dod.md`. The code changes were properly formatted, committed, and pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit","tdd_next":"acceptance green"}}