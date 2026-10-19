# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — The orchestrator seam already exists: we can directly provide a scripted provider and an `afterModelResponse` hook through configuration and observe the reported usage.

## Done when these pass

- [ ] **A turn driven through two tool rounds reports usage covering every provider call in that turn. ([validated by name](src/orchestration/after-model-response-usage.acceptance.test.ts#L71))** — verifies that the usage reported to the hook accumulates all tokens across tool rounds.
      `src/orchestration/after-model-response-usage.acceptance.test.ts`
- [ ] **A provider that reports no usage on some rounds does not make the total undefined or NaN. ([validated by name](src/orchestration/after-model-response-usage.acceptance.test.ts#L85))** — verifies that missing round usages are correctly treated as 0 instead of propagating undefined.
      `src/orchestration/after-model-response-usage.acceptance.test.ts`
- [ ] **A turn where nothing reported still reports nothing. ([validated by name](src/orchestration/after-model-response-usage.acceptance.test.ts#L95))** — verifies that when no usage is provided at all, `undefined` is reported.
      `src/orchestration/after-model-response-usage.acceptance.test.ts`
- [ ] **receives collected response text and usage** — the existing test pinning the behaviour for a single round without tools must stay green.
      `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [x] Change `chatOrchestrator` to accumulate `usage` across tool rounds instead of overwriting it
- [x] Update `UsageMetadata` types or parameter names if decided by the implementer to make the signature unambiguous
- [x] Update `specs/hal-engine-config-hooks/spec.md` replacing the under-counting statement with the new behaviour
- [x] Write a CHANGELOG entry stating the change

## Out of scope

- The audit entry or billing record itself
- Token accounting for anything other than the provider calls the orchestrator makes
- The `stop` chunk's own `usage` shape (providers already populate this)