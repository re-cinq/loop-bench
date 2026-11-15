# Definition of Done

> It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` already exposes `OrchestratorHooks.afterModelResponse` directly over the round loop, so acceptance tests can drive multi-round turns through the real orchestrator and fail today on the `lastUsage` overwrite.

## Done when these pass

- [ ] **reports the sum of all three provider calls when a turn runs two tool rounds** — drives two tool rounds (three provider calls) with distinct token counts and asserts `afterModelResponse` receives the summed `inputTokens`, `outputTokens`, and `totalTokens`
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **counts reporting rounds when another round reports none, and reports undefined when none do** — verifies an intermediate round omitting `usage` does not drop earlier rounds or yield `undefined`/`NaN`, and a turn where no round reports usage still passes `undefined`
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Replace `lastUsage` in `src/orchestration/chatOrchestrator.ts` with round-by-round usage accumulation that skips `undefined` rounds, returns `undefined` when no round reported usage, and leaves the existing no-tool test `receives collected response text and usage` in `src/orchestration/chatOrchestrator.test.ts` passing unedited.
- [ ] Decide between a single summed `usage` argument and also passing a per-round breakdown, record why the other shape was rejected on the issue, and make the `OrchestratorHooks.afterModelResponse` type/signature unambiguously show it is a sum without introducing `any` (keeping the 3rd `usage` parameter compatible with `UsageMetadata | undefined`).
- [ ] Sync `doc-block` references if `OrchestratorHooks` changed (`npm run docs:fix`), and add a `CHANGELOG.md` entry documenting the larger usage totals an existing consumer will record on tool-heavy turns.
- [ ] Run `npm run verify` to confirm `build`, `test:coverage`, `typecheck`, `eslint` (`--max-warnings 0`), `prettier:check`, and doc/spec gates all pass.

## Out of scope

- The audit entry or billing record itself, which is a consumer's concern.
- Token accounting for anything other than the provider calls the orchestrator makes.
- Changing the `stop` chunk's own `usage` shape on `AIProvider`.
- Gating `onError` on `error instanceof Error` in `src/orchestration/chatOrchestrator.ts`.