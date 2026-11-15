# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` already accepts a scripted `AIProvider`, a `ToolRegistry`, and `OrchestratorHooks.afterModelResponse`, and the existing single-round test (`src/orchestration/chatOrchestrator.test.ts`, `'receives collected response text and usage'`) pins the 3rd hook argument as `{inputTokens, outputTokens, totalTokens}` assignable to `UsageMetadata | undefined`. Both multi-round summation and partial-usage accumulation can be asserted directly through `createChatOrchestrator(...).processMessage(...)` without constraining the implementer's choice between a single summed `usage` parameter and a summed parameter plus per-round breakdown.

## Done when these pass

- [ ] **sums token usage across every provider call in a multi-round tool turn** — drives a turn through two tool rounds (three provider calls) with distinct token counts and asserts `afterModelResponse` receives the sum of all three calls
      `src/orchestration/usageAggregation.acceptance.test.ts`

- [ ] **counts reported rounds when some rounds omit usage and still reports undefined when none do** — verifies omitted middle or final round usage does not drop earlier rounds or yield `NaN`/`undefined`, while all-omitted rounds still report `undefined`
      `src/orchestration/usageAggregation.acceptance.test.ts`

- [x] **receives collected response text and usage** — existing unedited test pinning that a single-round turn with no tool calls still reports the same usage shape and values
      `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [ ] Decide between keeping one summed `usage` parameter vs passing both summed usage and a per-round breakdown (while keeping the 3rd argument backwards-compatible for single-round turns), and record why the other option was rejected on the issue
- [ ] Update the `afterModelResponse` signature/type (e.g. a dedicated type/JSDoc) so callers know without reading `chatOrchestrator.ts` that `usage` is aggregated across the entire turn
- [ ] Replace `lastUsage` in `src/orchestration/chatOrchestrator.ts` with round-by-round accumulation across every `streamRound` outcome, skipping rounds with `undefined` usage and returning `undefined` when no round reported usage
- [ ] Replace the recorded `lastUsage` under-counting bullet under `Measured semantics — out of scope` in `specs/hal-engine-config-hooks/spec.md`, update any affected doc-blocks (e.g. `CLAUDE.md`, `specs/hal-engine-architecture/spec.md`), and add a `CHANGELOG.md` entry noting the increased reported usage for multi-round tool turns
- [ ] Run `npm run build`, `npm test`, `npm run typecheck`, `npm run eslint` (`--max-warnings 0`), and `npm run prettier:check` with no `any` in the public API

## Out of scope

- The audit entry or billing record itself (consumer concern)
- Token accounting for anything other than the provider calls the orchestrator makes
- Changing the `stop` chunk's own `usage` shape (`UsageMetadata` populated by providers)