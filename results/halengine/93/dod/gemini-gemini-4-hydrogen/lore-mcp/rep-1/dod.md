# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` and `OrchestratorHooks.afterModelResponse` already expose the round-loop and hook seam directly. Both acceptance tests drive a scripted `AIProvider` through `processMessage` and fail today because `chatOrchestrator.ts` overwrites `lastUsage` on each round instead of summing across rounds.

## Done when these pass

- [ ] **sums token usage across all provider calls in a turn with two tool rounds** — `afterModelResponse` receives summed `inputTokens`, `outputTokens`, and `totalTokens` across all three provider calls in a two-tool-round turn
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **counts reported rounds when some omit usage and reports undefined when none report** — omitted usage on intermediate rounds does not yield `NaN` or `undefined` while reported rounds are summed, and a turn with no usage on any round still passes `undefined`
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **receives collected response text and usage** — existing single-round turn without tool calls reports the exact `UsageMetadata` unchanged (must remain unedited)
  `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [ ] Decide between keeping one summed usage argument vs passing both the summed total and a per-round breakdown (keeping the 3rd argument as summed `{inputTokens, outputTokens, totalTokens}` so single-round behaviour is unchanged), and update the `OrchestratorHooks.afterModelResponse` signature/type (and exports in `src/index.ts` if a new type is introduced) so the sum semantics are unambiguous
- [ ] Replace `lastUsage` overwriting in `src/orchestration/chatOrchestrator.ts` with round-by-round accumulation that ignores rounds without usage and passes `undefined` when no round reported usage
- [ ] Update `specs/hal-engine-config-hooks/spec.md` (and `specs/hal-engine-architecture/spec.md` doc-block/prose if the hook signature changed, running `npm run docs:fix` and `npm run spec:names:fix`) to reflect the chosen signature and record why the alternative was rejected
- [ ] Add a `CHANGELOG.md` entry under `## [Unreleased]` explaining the change in what existing consumers record for tool-heavy turns
- [ ] Verify `npm run verify` passes with zero `any` in the public API

## Out of scope

- The audit entry or billing record itself, which is a consumer's concern
- Token accounting for anything other than the provider calls the orchestrator makes
- The `stop` chunk's own `usage` shape, which providers already populate and this issue only aggregates
- `onError` gating on `error instanceof Error` (tracked separately in `specs/hal-engine-config-hooks/spec.md`)