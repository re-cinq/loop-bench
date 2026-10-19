# Definition of Done

> what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `afterModelResponse` is an existing public hook seam reached by `createChatOrchestrator`, and a real `ToolRegistry` can drive its provider round loop without mocks or stubs.

## Done when these pass

- [x] **reports usage from every provider call across two tool rounds** — sums the known usage from each provider call in a tool-driven turn.
      `src/orchestration/usageReporting.acceptance.test.ts`
- [x] **sums reported rounds while leaving a turn with no reported usage undefined** — ignores missing round usage without producing `undefined` or `NaN`, while reporting nothing when no round has usage.
      `src/orchestration/usageReporting.acceptance.test.ts`
- [x] **receives collected response text and usage** — existing no-tool coverage remains unedited and continues to pin the unchanged common path.
      `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [x] Aggregate usage from every provider round while preserving the existing single-call result.
- [x] Define an unambiguous public usage type/signature for the hook.
- [x] Replace the spec's under-counting statement and add the consumer-visible change to `CHANGELOG.md`.

## Out of scope

- Billing, audit records, or token accounting outside provider calls made by the orchestrator.
- The `stop` chunk usage shape and provider-specific usage calculation.