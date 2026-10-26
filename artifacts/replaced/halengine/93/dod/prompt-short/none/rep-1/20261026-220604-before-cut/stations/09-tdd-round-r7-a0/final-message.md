All facets in `.lore/dod.md` are checked. The implementation is complete:

- `accumulateUsage` function accumulates token usage across rounds in `orchestratorHelpers.ts`
- `TurnUsageMetadata` type alias is exported from `src/types/ai.ts`
- `chatOrchestrator.ts` calls `accumulateUsage(lastUsage, outcome.usage)` on every round
- CHANGELOG entry and spec update are both in place
- Acceptance tests in `turn-usage.acceptance.test.ts` match the implementation exactly

The CI failure in the round brief is a MongoDB timeout in `mongoRedaction.test.ts` — a pre-existing integration test that needs a live MongoDB instance to start. The `mongoRedaction.test.ts` file was added in `fabb5df` (MongoDB session store feature), predating this ticket entirely. None of the changes on this branch touch MongoDB code. This is infrastructure flakiness, not a code regression introduced here.

No unrelated smells to name. Zero regressions written by this round.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_next":"acceptance green"}}