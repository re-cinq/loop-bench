# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone. ... A deployer billing or budgeting from this hook under-counts exactly the expensive turns.

**Strategy: `direct`** — The orchestrator already has the `afterModelResponse` hook seam. I'll call `processMessage` with a provider that simulates multiple rounds with known token counts and verify that the hook receives the sum.

## Done when these pass

- [ ] **reports summed usage across two tool rounds** — A turn with tool calls should report the sum of input, output, and total tokens from all rounds.
      `src/orchestration/UsageAcrossRounds.acceptance.test.ts`
- [ ] **handles missing usage data gracefully** — If some rounds report usage and others don't, the sum should still be correct (not NaN or undefined) based on the reporting rounds.
      `src/orchestration/UsageAcrossRounds.acceptance.test.ts`
- [ ] **reports original usage for turns with no tools** — A single-round turn should report exactly what it did before, ensuring no regression for the common case.
      `src/orchestration/UsageAcrossRounds.acceptance.test.ts`
- [ ] **reports undefined if no rounds report usage** — A turn where nothing reported still reports nothing.
      `src/orchestration/UsageAcrossRounds.acceptance.test.ts`

## Facets

- [ ] Accumulate usage across rounds in `src/orchestration/chatOrchestrator.ts`.
- [ ] Ensure `afterModelResponse` receives the accumulated total.
- [ ] Update `specs/hal-engine-config-hooks/spec.md` and `CHANGELOG.md`.

## Out of scope

- Token accounting for non-provider calls.
- Consumer-side billing/audit logic.