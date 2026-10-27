# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` already accepts a real `AIProvider`, `ToolRegistry`, and `afterModelResponse` hook, so acceptance tests can drive multi-round tool turns through the production entry point without mocks or a replacement seam.

## Done when these pass

- [ ] **reports the sum of usage from every provider call across two tool rounds** — the hook receives the summed input, output, and total tokens from both tool rounds and the final provider call.
      `src/orchestration/usage.acceptance.test.ts`
- [ ] **sums reported rounds around a missing usage value and leaves all-missing usage undefined** — reported rounds contribute to the total despite an omitted round, while a turn with no usage remains `undefined` rather than `NaN`.
      `src/orchestration/usage.acceptance.test.ts`

## Facets

- [ ] Aggregate each provider round's reported `UsageMetadata` before invoking `afterModelResponse`, preserving the existing `UsageMetadata` hook shape.
- [ ] Keep the no-tool behavior unchanged; the existing `receives collected response text and usage` test in `src/orchestration/chatOrchestrator.test.ts` remains unedited and green.
- [ ] Make the public hook type and its documentation state clearly that `usage` is the per-turn sum, with no `any` in the public API.
- [ ] Replace the spec's under-counting sentence with the aggregate and missing-usage behavior, keeping the acceptance links anchored to the test titles.
- [ ] Add a CHANGELOG entry describing the MINOR behavior change for existing consumers that record `afterModelResponse` usage.
- [ ] Keep build, full test, typecheck, eslint, and prettier checks green in CI.

## Out of scope

- Audit entries, billing records, and budgeting consumers of the hook.
- Usage accounting for anything other than provider calls made by the orchestrator.
- Changes to the `stop` chunk's provider usage shape or unrelated hook behavior.