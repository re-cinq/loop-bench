Pushed and up to date. Here's the summary:

**Round closed — facet 1 of 4:** Added `accumulateUsage` to `orchestratorHelpers.ts` that sums `inputTokens`/`outputTokens`/`totalTokens` across rounds, returns `undefined` only when both inputs are undefined. Updated `chatOrchestrator.ts` to use it instead of `lastUsage = outcome.usage ?? lastUsage`. The unit test (`orchestratorHelpers.test.ts`) covers all four cases (both defined, first undefined, second undefined, both undefined) and runs green. CI will run the acceptance test `turnUsage.acceptance.test.ts`.

**Unrelated smells noticed (not acted on):** The `UsageMetadata` type import in `chatOrchestrator.ts` at line 10 is a type-only import but not annotated `import type` (it is already using `import type` via the destructured form — actually it IS already in the `import type {…}` block, so no issue).

**Next facet:** Name the hook's usage type as a turn total in the public signature without `any`; keep the same `UsageMetadata` fields for existing consumers.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Accumulate inputTokens/outputTokens/totalTokens from each provider call; undefined only when none report","tdd_next":"Name the hook's usage type as a turn total in the public signature without any; keep same UsageMetadata fields"}}