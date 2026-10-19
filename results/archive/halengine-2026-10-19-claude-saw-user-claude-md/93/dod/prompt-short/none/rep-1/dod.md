# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — The orchestrator seam already exists (`createChatOrchestrator`) and we can inject a scripted provider with known usage to observe what `afterModelResponse` receives.

## Done when these pass

- [ ] **reports usage covering every provider call in that turn, asserted against a scripted provider whose rounds report known, different token counts**
      `src/orchestration/usageReporting.acceptance.test.ts`
- [ ] **a provider that reports no usage on some rounds does not make the total undefined or NaN: the rounds that reported are still counted**
      `src/orchestration/usageReporting.acceptance.test.ts`
- [ ] **a turn where nothing reported still reports nothing**
      `src/orchestration/usageReporting.acceptance.test.ts`

## Facets

- [x] Accumulate `inputTokens`, `outputTokens`, and `totalTokens` across all rounds into a sum.
- [x] Keep the existing behaviour unchanged when a turn requires no tool calls.
- [x] Handle missing usage in some rounds without corrupting the total sum.
- [x] Ensure a turn where no usage was reported across any round correctly reports `undefined` instead of `0`.
- [ ] Update `UsageMetadata` type or argument typing in `OrchestratorHooks` to make it unambiguous that it's a sum.
- [x] Update `specs/hal-engine-config-hooks/spec.md` to reflect the new behaviour.
- [x] Add a CHANGELOG entry for the minor version bump.

## Out of scope

- The audit entry or billing record itself.
- Token accounting for anything other than the provider calls the orchestrator makes.
- The `stop` chunk's own `usage` shape.