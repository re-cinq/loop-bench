# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — The `afterModelResponse` hook is exposed through the `OrchestratorHooks` interface and called by `ChatOrchestrator`. I will write a new acceptance test that uses a scripted provider to verify that the hook receives summed usage across multiple rounds, while ensuring compatibility with existing single-round behavior.

## Done when these pass

- [ ] **reports aggregated usage across all tool rounds** — A turn with two provider calls (one for tools, one for final answer) reports a sum of their usage.
      `src/orchestration/usage-reporting.acceptance.test.ts`
- [ ] **reports exactly what it reports today for turns with no tool calls** — A single-round turn receives usage identical to what the provider reported, maintaining the same object structure.
      `src/orchestration/usage-reporting.acceptance.test.ts`
- [ ] **handles missing usage in some rounds gracefully** — When some provider rounds report no usage, the total remains a valid sum of the available usage data, and a turn with no usage at all still reports undefined.
      `src/orchestration/usage-reporting.acceptance.test.ts`

## Facets

- [x] Define `TurnUsage` or `AggregatedUsage` to make the hook signature unambiguous.
- [x] Update `OrchestratorHooks['afterModelResponse']` signature to pass both total and per-round breakdown.
- [x] Update `ChatOrchestrator` round loop to accumulate usage and breakdown.
- [x] Update `specs/hal-engine-config-hooks/spec.md` and `CHANGELOG.md`.

## Out of scope

- Token accounting for anything other than provider calls.
- Audit entries or billing records themselves.