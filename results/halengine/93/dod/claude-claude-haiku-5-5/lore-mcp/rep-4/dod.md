# Definition of Done

> It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — The seam exists: `createChatOrchestrator(provider, promptBuilder, registry, {hooks})` and `processMessage` are the real entry points, and a scripted `AIProvider` that reports known per-round usage drives them. The red bar is run in this pod: the hook receives only the last round's usage (`500/60/560` where `900/120/1020` is expected).

## Done when these pass

- [ ] **reports the sum of every provider call in a turn that ran two tool rounds** — a three-call turn (two tool rounds, then a final answer) with usage 120, 340 and 560 tokens reports 1020 total, not the final call's 560.
  `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`
- [ ] **counts the rounds that reported usage and reports nothing when no round did** — a round that reports no usage is skipped in the sum (no `undefined`, no `NaN`), and a turn where nothing reported passes `undefined`.
  `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`
- [ ] **receives collected response text and usage** — existing test, not edited; a turn with no tool calls still hands the hook exactly its one provider call's usage. It passes today and must stay green unedited.
  `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [x] Red: both acceptance tests fail, each reporting only the last round's usage, against the claim quoted above.
- [x] Green: `chatOrchestrator.ts` accumulates `outcome.usage` across rounds, skipping rounds that report none, and passes `undefined` when no round reported. The single `usage` argument keeps its type.
- [ ] Document on `OrchestratorHooks.afterModelResponse` that `usage` is the sum over every provider call in the turn, so the type's reader does not need the orchestrator.
- [x] CHANGELOG `[Unreleased]` entry under `Changed`: `afterModelResponse` usage now covers every provider call in the turn, so tool-heavy turns record a larger number; MINOR bump.
- [ ] Spec: the "Usage reported to afterModelResponse" section in `specs/hal-engine-config-hooks/spec.md` is green once the first two tests pass.

## Out of scope

- The "both" shape (summed total plus a per-round array) is rejected for this ticket. Today no consumer receives per-round usage, so a per-round array would widen the public surface for nothing; a later ticket can add it if a consumer asks.
- The audit entry or billing record itself is the consumer's concern.
- Token accounting for anything other than the provider calls the orchestrator makes.
- The `stop` chunk's own `usage` shape, which providers already populate.
- "The type makes the answer unambiguous" is a type and documentation property, not a runtime behaviour, so it is a facet and not an acceptance test.
- The `onError` gate on `error instanceof Error` in the same spec section is a separate, neighbouring problem. It is out of scope here.