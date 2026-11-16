# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` already accepts a scripted `AIProvider`, `ToolRegistry`, and `hooks.afterModelResponse`, so the acceptance tests call `processMessage` directly and fail today because only the final round's usage reaches the hook.

## Done when these pass

- [ ] **reports the sum of every provider call when a turn runs two tool rounds** — `afterModelResponse` receives the summed `inputTokens`, `outputTokens`, and `totalTokens` across all three provider calls in a turn with two tool rounds
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **counts reporting rounds when another reports none, and passes undefined when none did** — rounds omitting `usage` neither produce `undefined` nor `NaN` when other rounds report usage, and a turn where no round reports usage passes `undefined`
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **receives collected response text and usage** — existing unedited no-tool test confirms the third argument to `afterModelResponse` keeps the exact `UsageMetadata` shape on a single-round turn
      `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [ ] Accumulate `UsageMetadata` across rounds in `src/orchestration/chatOrchestrator.ts` (replacing `lastUsage = outcome.usage ?? lastUsage`) and return `undefined` when no round reported usage
- [ ] Make the `afterModelResponse` signature and exported type unambiguous about reporting the turn's summed usage (keeping the 3rd argument as `UsageMetadata` so the unedited no-tool test stays green; if per-round granularity is also exposed, add it as an optional extra surface rather than changing the 3rd argument's shape)
- [ ] Add a `CHANGELOG.md` entry under `## [Unreleased]` noting the behaviour change for tool-heavy turns (and run `npm run docs:fix` if `OrchestratorHooks` declaration changes in `src/orchestration/chatOrchestrator.ts`)
- [ ] Verify `npm run verify` passes (including `typecheck`, `eslint`, `prettier:check`, `test:coverage`, `build`, `spec:names`, `check:spec-links`, `check:spec-status`)

## Out of scope

- Audit entry or billing record persistence (consumer responsibility)
- Token accounting for anything other than the provider calls the orchestrator makes
- Changing the `stop` chunk's own `usage` shape on `MessageChunk`
- Changing the `onError` `instanceof Error` gate in `src/orchestration/chatOrchestrator.ts`