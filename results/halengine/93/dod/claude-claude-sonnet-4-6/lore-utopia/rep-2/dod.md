# Definition of Done

> `afterModelResponse` is called once per user message after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — The seam already exists: `createChatOrchestrator` takes an `OrchestratorHooks` argument and calls `afterModelResponse` with the accumulated usage. The acceptance test drives two scripted tool rounds through the real orchestrator and asserts that the hook receives the sum of both rounds' token counts, which the current `lastUsage = outcome.usage ?? lastUsage` pattern cannot satisfy.

## Done when these pass

- [ ] **afterModelResponse receives summed usage when two tool rounds each report known different token counts** — asserts the hook receives the arithmetic sum of `inputTokens`, `outputTokens`, and `totalTokens` across both tool rounds, against a scripted provider whose two rounds emit known, different `UsageMetadata` values
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Change `lastUsage = outcome.usage ?? lastUsage` in `chatOrchestrator.ts` to accumulate (add fields) across rounds that report usage, leaving rounds with no usage unfelt
- [ ] Update the `afterModelResponse` signature comment or parameter name in `OrchestratorHooks` to make clear the value is a per-turn total, not a per-round figure (criterion 4)
- [ ] Update `specs/hal-engine-config-hooks/spec.md`: replace the "Measured semantics — out of scope" bullet that records the under-counting with the new accumulated-usage behaviour; add a CHANGELOG entry for the MINOR bump stating what an existing consumer will now record
- [ ] Verify the existing test `afterModelResponse — receives collected response text and usage` (chatOrchestrator.test.ts) stays green — it exercises a no-tool-call turn where the single-round total equals the round's usage, so it pins criterion 2 without edits

## Out of scope

- Audit entry or billing record logic (a consumer's concern, not the engine's)
- Token accounting for anything other than the provider calls the orchestrator makes
- The `stop` chunk's own `usage` shape, which providers already populate
- The `catch` gate on `onError` (the second "measured semantics" bullet — a separate issue)
- Criterion 3 (no NaN when some rounds report no usage) has no failing test today: the current `?? lastUsage` fallback already preserves partial reports without NaN; a correct sum implementation inherits this property, so no additional acceptance test is owed