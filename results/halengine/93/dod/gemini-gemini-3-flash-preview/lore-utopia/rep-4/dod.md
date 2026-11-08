# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local ... what the hook receives is the usage of the final provider call alone. ... A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it.

**Strategy: `direct`** — The `ChatOrchestrator` already exposes the `afterModelResponse` hook. Acceptance tests will provide a scripted provider simulating multiple rounds and verify the hook receives the summed total of all rounds.

## Done when these pass

- [ ] **reports summed usage across multiple tool rounds** — A turn with tool calls receives the sum of input, output, and total tokens from all provider rounds.
      `src/orchestration/UsageAggregation.acceptance.test.ts`

- [ ] **reports single-round usage when no tools are called** — A turn without tool calls reports exactly what it reports today, matching the existing behavior pinned in `chatOrchestrator.test.ts`.
      `src/orchestration/UsageAggregation.acceptance.test.ts`

- [ ] **handles missing usage on some rounds gracefully** — If some rounds report usage and others don't, the total is the sum of those that did, without becoming NaN or undefined.
      `src/orchestration/UsageAggregation.acceptance.test.ts`

- [ ] **reports nothing when no rounds report usage** — If no provider rounds report usage, the hook receives undefined, matching today's behavior.
      `src/orchestration/UsageAggregation.acceptance.test.ts`

- [ ] **unambiguous hook signature** — The hook receives an argument named `totalUsage` (or similar) indicating it is a sum, verified by the type definition change.
      `src/orchestration/UsageAggregation.acceptance.test.ts`

## Facets

- [ ] **write acceptance tests** — Implement the tests in `src/orchestration/UsageAggregation.acceptance.test.ts`.
- [ ] **rename usage to totalUsage** — Rename the argument in `OrchestratorHooks` to make the sum explicit.
- [ ] **accumulate usage in orchestrator** — Modify the round loop to sum tokens instead of overwriting.
- [ ] **update spec** — Record the new "total usage summed" behavior in `specs/hal-engine-config-hooks/spec.md`.
- [ ] **add changelog entry** — Record the behavior change and minor version bump in `CHANGELOG.md`.

## Out of scope

- Token accounting for anything other than the provider calls.
- Consumer-side audit/billing logic.