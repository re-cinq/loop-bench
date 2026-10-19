# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — The orchestrator hook `afterModelResponse` is directly observable through the `chatOrchestrator` factory and a mock provider seam, allowing us to assert the accumulated usage.

## Done when these pass

- [ ] **reports usage covering every provider call in a multi-round turn** — validates that the hook receives the accumulated sum of token usage across all provider rounds
  `src/orchestration/turn-usage.acceptance.test.ts`
- [ ] **accumulates usage safely when some rounds report no usage** — validates that rounds with missing usage don't corrupt the accumulated total
  `src/orchestration/turn-usage.acceptance.test.ts`

## Facets

- [x] Update `chatOrchestrator.ts` to sum the usage across rounds instead of keeping only `lastUsage`
- [x] Introduce a type alias like `TurnUsageMetadata` for the hook parameter to make the accumulated nature unambiguous
- [x] Add a CHANGELOG entry stating the change in what an existing consumer will record

## Out of scope

- the audit entry or billing record itself, which is a consumer's concern
- token accounting for anything other than the provider calls the orchestrator makes
- the `stop` chunk's own `usage` shape, which providers already populate and this issue only aggregates