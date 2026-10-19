# Definition of Done

> `afterModelResponse` ... is passed the `lastUsage` local — the most recent round's usage, not a sum across tool rounds, so a deployer using the hook for billing or audit under-counts every turn that ran tools.

**Strategy: `direct`** — `createChatOrchestrator` with the `afterModelResponse` hook is the real entry point. The under-counting is observable by running a scripted two-round provider and inspecting what the hook receives.

## Done when these pass

- [x] **reports summed usage across all provider rounds when tools are called** — `afterModelResponse` receives the sum of all rounds' usage for a two-tool-round turn; currently receives only the last round's value
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [x] **skips rounds with no usage and does not produce undefined or NaN in the total** — a three-round turn where the middle round emits no usage yields the sum of the two that did; guards against a naive accumulator treating undefined as zero
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [x] Change `lastUsage = outcome.usage ?? lastUsage` in `chatOrchestrator.ts` to accumulate across rounds (add `inputTokens`, `outputTokens`, `totalTokens`), skipping rounds where `outcome.usage` is `undefined`
- [x] Consider whether the hook signature type changes (e.g. a named `AccumulatedUsage` wrapper) to make the sum unambiguous to readers; if so, update `OrchestratorHooks.afterModelResponse` and all call sites — decided: no type change needed; the existing `usage?: UsageMetadata` is unambiguous as a sum because `UsageMetadata` has no "last-round-only" semantic in the type
- [x] Replace the under-counting statement in `specs/hal-engine-config-hooks/spec.md` with the new behaviour and move the validated-by annotations onto the replacement statement
- [x] Add a MINOR changelog entry stating that a turn with tool rounds now reports a larger usage figure than before
- [x] Existing test "keeps the usage an earlier round reported when a later round reports none" (`chatOrchestrator.test.ts`) must stay green — the two-round scenario it covers (round 1 has usage, round 2 has none) is a subset of correct accumulation

## Out of scope

- The audit entry or billing record itself (consumer concern)
- Token accounting for anything other than provider calls the orchestrator makes
- The `stop` chunk's own `usage` shape (providers already populate it; this ticket only aggregates)