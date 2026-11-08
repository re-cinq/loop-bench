# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. ... `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — I will call the orchestrator's `sendMessage` entry point with a scripted provider that yields multiple tool rounds, each reporting different usage metrics. The acceptance test will verify that the `afterModelResponse` hook receives the aggregated total of all rounds.

## Done when these pass

- [x] **reports aggregated usage across multiple tool rounds** — A turn with two tool rounds receives a `usage` object in `afterModelResponse` that is the sum of input, output, and total tokens from all provider calls.
      `src/orchestration/usage-reporting.acceptance.test.ts`
- [x] **reports exact usage for turns without tools** — A turn that answers immediately (zero tool rounds) reports exactly what the single provider call reported, ensuring no regression for the common case.
      `src/orchestration/usage-reporting.acceptance.test.ts`
- [x] **ignores rounds with missing usage metadata** — When some provider rounds report usage and others do not, the total still sums the reported values without becoming `NaN` or `undefined`.
      `src/orchestration/usage-reporting.acceptance.test.ts`
- [x] **exposes usage granularity in the hook signature** — The `afterModelResponse` signature uses a type that unambiguously distinguishes between the total sum and the per-round breakdown.
      `src/orchestration/usage-reporting.acceptance.test.ts`

## Facets

- [x] Create acceptance test file reproducing the under-counting.
- [ ] Update `UsageMetadata` or introduce a new type to support aggregated reporting.
- [ ] Modify `chatOrchestrator.ts` to accumulate usage across all rounds.
- [ ] Update `OrchestratorHooks` and `afterModelResponse` call site.
- [x] Update `specs/hal-engine-config-hooks/spec.md` and `CHANGELOG.md`.

## Out of scope

- Token accounting for non-provider calls (e.g., tool execution overhead).
- Changes to the `stop` chunk's own `usage` shape.
- Implementing the actual billing or audit logic in the hook.