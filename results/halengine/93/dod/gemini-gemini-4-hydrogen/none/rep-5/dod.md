# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` already accepts a scripted `AIProvider`, a `ToolRegistry`, and `OrchestratorHooks.afterModelResponse`, so multi-round turns can be driven directly through the real orchestrator entry point.

## Done when these pass

- [ ] **sums usage across every provider call in a turn with two tool rounds** — drives two tool rounds (three provider calls) with distinct token counts and asserts `afterModelResponse` receives the summed `inputTokens`, `outputTokens`, and `totalTokens`
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **sums only the rounds that reported usage and passes undefined when none did** — verifies partial round reporting skips missing rounds without producing `undefined` or `NaN`, and a turn where no round reports usage passes `undefined`
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Decide between keeping one summed `usage` argument (with an unambiguous type/signature name) versus passing both the sum and a per-round breakdown (keeping the 3rd parameter compatible with the existing single-round test), and record the rationale on the issue.
- [ ] Accumulate `outcome.usage` across rounds in `src/orchestration/chatOrchestrator.ts` instead of overwriting `lastUsage`, leaving the accumulated total `undefined` when no round reports usage.
- [ ] Update the `OrchestratorHooks.afterModelResponse` type/signature in `src/orchestration/chatOrchestrator.ts` (and export any new type from `src/index.ts` if introduced) so the type makes turn-level aggregation unambiguous without `any`.
- [ ] Keep the existing single-round test (`receives collected response text and usage` in `src/orchestration/chatOrchestrator.test.ts`) unedited and passing, and add unit tests covering any chosen signature additions (such as per-round breakdown if chosen).
- [ ] Run `npm run docs:fix` to sync generated `OrchestratorHooks` doc-blocks (`CLAUDE.md`, `specs/hal-engine-architecture/spec.md`), refine `specs/hal-engine-config-hooks/spec.md` if the chosen signature adds parameters/types, and add a `CHANGELOG.md` entry noting the change for existing consumers.

## Out of scope

- Audit entry or billing record persistence (consumer concern)
- Token accounting for anything other than the provider calls made by the orchestrator
- Changing the `stop` chunk's own `usage` shape on providers