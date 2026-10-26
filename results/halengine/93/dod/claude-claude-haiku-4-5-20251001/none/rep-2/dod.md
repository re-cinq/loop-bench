# Definition of Done

> `afterModelResponse` is called once per user message after the round loop exits, and is passed the `lastUsage` local — the most recent round's usage, not a sum across tool rounds, so a deployer using the hook for billing or audit under-counts every turn that ran tools.

**Strategy: `direct`** — The `afterModelResponse` hook call site already exists in `chatOrchestrator.ts` line 148. The acceptance tests call the real orchestrator entry point and observe the usage passed to the hook.

## Done when these pass

- [ ] **reports usage covering every provider call in a turn with two tool rounds, summed from each round** — Validates that multiple tool rounds report summed usage, not just the final round
  `src/orchestration/chatOrchestrator-usage-accumulation.acceptance.test.ts`
- [ ] **reports exactly what it reports today for a turn with no tool calls, unchanged** — Validates backward compatibility for the common case
  `src/orchestration/chatOrchestrator-usage-accumulation.acceptance.test.ts`
- [ ] **handles undefined usage in some rounds and still counts the reported rounds** — Validates that partial reporting works
  `src/orchestration/chatOrchestrator-usage-accumulation.acceptance.test.ts`
- [ ] **reports undefined when no rounds report usage** — Validates the edge case where nothing reported
  `src/orchestration/chatOrchestrator-usage-accumulation.acceptance.test.ts`

## Facets

- [ ] Accumulate usage across all rounds in the tool loop (sum inputTokens, outputTokens, totalTokens from each round)
- [ ] Update `OrchestratorHooks.afterModelResponse` type signature to clarify usage is summed/accumulated
- [ ] Update spec `specs/hal-engine-config-hooks/spec.md` line 28 to document the new behavior
- [ ] Add CHANGELOG entry under `[Unreleased] → Changed` documenting the behavior change and MINOR version bump

## Out of scope

- The audit entry or billing record itself (consumer's concern)
- Token accounting for anything other than provider calls the orchestrator makes
- The `stop` chunk's own `usage` shape