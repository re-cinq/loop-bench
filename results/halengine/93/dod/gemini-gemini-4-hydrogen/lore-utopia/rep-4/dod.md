# Definition of Done

> `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone. For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — `createChatOrchestrator` already accepts a pluggable `AIProvider`, `ToolRegistry`, and `options.hooks.afterModelResponse`, so the acceptance tests drive multi-round turns through the real orchestrator entry point and fail today because `chatOrchestrator.ts` overwrites `lastUsage` per round instead of summing across rounds.

## Done when these pass

- [ ] **reports the sum of every provider call when a turn runs two tool rounds** — drives a turn through two tool rounds (three provider calls with distinct token counts) and checks that `afterModelResponse` receives the summed `inputTokens`, `outputTokens`, and `totalTokens`
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **counts every reporting round when some rounds omit usage, and passes undefined when none report** — verifies that omitted usage on a round does not produce `undefined` or `NaN` for the total, and that a turn where no round reports usage still passes `undefined`
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [x] **receives collected response text and usage** — existing test (must remain unedited) pinning that a no-tool turn reports the exact `UsageMetadata` shape as the third argument to `afterModelResponse`
  `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [ ] Replace `lastUsage = outcome.usage ?? lastUsage` in `src/orchestration/chatOrchestrator.ts` with round-by-round summation across all reporting provider calls, returning `undefined` when no round reports usage
- [ ] Decide between keeping one summed `usage` argument or also passing a per-round breakdown, make the `afterModelResponse` signature/type in `src/orchestration/chatOrchestrator.ts` (and `src/types/ai.ts` if a dedicated type is added) unambiguous without breaking the third `UsageMetadata` parameter, and record why the other shape was rejected
- [ ] Align `specs/hal-engine-config-hooks/spec.md` with the final signature if a fourth parameter or new type is added, and keep `example/full-config.ts` consistent
- [ ] Add a `CHANGELOG.md` entry explaining the behaviour change in what an existing consumer records on tool-heavy turns
- [ ] Verify `npm run build`, `npm test`, `npm run typecheck`, `npm run eslint` (`--max-warnings 0`), and `npm run prettier:check` pass with no `any` in the public API

## Out of scope

- The audit entry or billing record itself, which is a consumer's concern
- Token accounting for anything other than the provider calls the orchestrator makes
- The `stop` chunk's own `usage` shape, which providers already populate
- The `error instanceof Error` gate on `onError` in `src/orchestration/chatOrchestrator.ts`