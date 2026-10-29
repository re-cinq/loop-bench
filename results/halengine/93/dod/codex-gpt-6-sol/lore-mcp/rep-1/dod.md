# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator().processMessage` already accepts a provider, real tool registry and `afterModelResponse` hook. A scripted provider can drive every round and expose the hook's reported usage.

## Done when these pass

- [ ] **reports total provider usage across tool rounds, ignoring rounds without usage** — The hook receives sums from every reported provider call; missing usage contributes nothing, and a turn with no reported usage yields `undefined`.
      `src/orchestration/turnUsage.acceptance.test.ts`

## Facets

- [ ] Sum `inputTokens`, `outputTokens` and `totalTokens` across provider calls without manufacturing usage when no call reports it.
- [ ] Keep the existing no-tool usage test unedited and green.
- [ ] Make the hook signature identify the argument as a turn total, without `any` in the public API.
- [ ] Record the sum decision and why a per-round breakdown was rejected in the issue, and update the spec and CHANGELOG with the changed value existing consumers record.
- [ ] Pass the repository's build, test, typecheck, eslint and prettier checks in CI.

## Out of scope

- Consumer audit and billing records, usage outside orchestrator provider calls, and the provider's `stop` chunk shape.
- `onError` behavior for thrown non-`Error` values.