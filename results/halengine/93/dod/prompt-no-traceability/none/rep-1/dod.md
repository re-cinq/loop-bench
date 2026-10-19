# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — The `afterModelResponse` hook is an exposed public callback that receives the usage value, allowing us to test the usage accounting behaviour directly by asserting on the usage passed to it from a scripted provider.

## Done when these pass

- [x] **reports sum of usage covering every provider call in a turn with multiple rounds** — ensures that the hook receives the accumulated token usage across all tool rounds, not just the last round
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [x] **handles missing usage on some rounds without turning the sum into NaN or losing the counted rounds** — ensures that rounds returning undefined usage don't corrupt the sum or discard previously accumulated rounds
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [x] Update `chatOrchestrator.ts` to sum the usage from each round instead of storing only the last usage
- [x] Ensure that summing handles rounds with `undefined` usage safely
- [x] Update `specs/hal-engine-config-hooks/spec.md` and CHANGELOG to reflect the usage aggregation change

## Out of scope

- The audit entry or billing record itself
- Token accounting for anything other than the provider calls the orchestrator makes
- The `stop` chunk's own `usage` shape