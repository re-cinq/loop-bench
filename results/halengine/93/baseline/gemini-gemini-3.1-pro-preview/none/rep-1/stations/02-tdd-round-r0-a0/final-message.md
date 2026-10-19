Branch is pushed and up to date. Summary of what this round delivered:

- **`AccumulatedUsageMetadata`** added to `src/types/ai.ts` (extends `UsageMetadata` with optional `providerCalls?: UsageMetadata[]`)
- **`accumulateUsage`** helper added to `orchestratorHelpers.ts`: single-round turns return usage unchanged (backwards compat); multi-round turns sum tokens and include a `providerCalls` breakdown; all-undefined rounds return `undefined`
- **`chatOrchestrator.ts`** loop now pushes each round's usage into `roundUsages[]` and calls `accumulateUsage(roundUsages)` before `afterModelResponse`
- **`afterModelResponse`** hook signature updated to `usage?: AccumulatedUsageMetadata`
- `AccumulatedUsageMetadata` exported from `src/index.ts`
- `specs/hal-engine-config-hooks/spec.md` updated to remove the under-counting note
- `CHANGELOG.md` entry added with migration note
- All four DoD facets ticked

Unrelated smell noticed: `chatOrchestrator.ts#L38–41` still has a multi-line JSDoc comment on `beforeToolCall`; `re-lint/max-comment-lines` enforces one-line max — it will surface as a lint finding if it wasn't already passing before this branch.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Define AccumulatedUsageMetadata, accumulateUsage helper, and wire accumulation into the orchestrator loop","tdd_next":"acceptance green"}}