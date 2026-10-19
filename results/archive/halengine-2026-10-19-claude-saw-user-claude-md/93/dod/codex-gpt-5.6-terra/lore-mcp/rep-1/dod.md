# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — The orchestrator's public factory accepts a provider, a real tool registry, and `afterModelResponse`, so the acceptance tests can drive the complete tool loop and observe the hook's usage argument.

## Done when these pass

- [ ] **reports the summed usage of every provider call across two tool rounds** — `afterModelResponse` receives a sum rather than the final provider call's usage.
      `src/orchestration/toolRoundUsage.acceptance.test.ts`
- [ ] **counts reported rounds while leaving a turn with no reported usage undefined** — Missing provider usage neither poisons reported totals nor invents a usage value.
      `src/orchestration/toolRoundUsage.acceptance.test.ts`

## Facets

- [x] Accumulate each numeric usage field across every provider call in a tool-loop turn.
- [x] Preserve `undefined` when no provider call reports usage, while ignoring individual missing reports.
- [x] Document the summed hook contract and its compatibility change in the config-hooks spec and CHANGELOG.

## Out of scope

- Audit or billing consumers, accounting beyond provider calls, and providers' individual `stop` chunk shapes.