# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` already accepts a pluggable `AIProvider` and `OrchestratorHooks` (`afterModelResponse`), so the acceptance tests drive the real round loop directly with scripted tool-round responses and fail today because `lastUsage` overwrites rather than sums round usage.

## Done when these pass

- [ ] **reports the sum of every provider call when a turn runs two tool rounds** — `afterModelResponse` receives `{inputTokens, outputTokens, totalTokens}` summed across all three provider calls in a two-tool-round turn
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **sums only the rounds that reported usage and reports undefined when none did** — rounds omitting `usage` are skipped without yielding `undefined` or `NaN`, and a turn with no reported usage passes `undefined`
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Replace `lastUsage` overwriting in `src/orchestration/chatOrchestrator.ts` with cross-round accumulation so `afterModelResponse` receives the summed `inputTokens`, `outputTokens`, and `totalTokens` across all rounds while skipping rounds with `undefined` usage and passing `undefined` when no round reported usage
- [ ] Decide between keeping a single summed `usage` argument vs adding an optional 4th per-round breakdown argument (the 3rd argument must remain `UsageMetadata` so the unedited test `receives collected response text and usage` in `src/orchestration/chatOrchestrator.test.ts#L236` keeps passing), make the signature/type unambiguous, and record why the rejected option was not chosen
- [ ] Keep existing `src/orchestration/chatOrchestrator.test.ts` tests (`receives collected response text and usage` and `keeps the usage an earlier round reported when a later round reports none`) unedited and passing
- [ ] Update `CHANGELOG.md` under `## [Unreleased]` to state the behaviour change in what an existing consumer records on tool-calling turns, and verify `npm run verify` passes with no `any` in the public API

## Out of scope

- Audit entry or billing record persistence itself (consumer concern)
- Token accounting for anything other than provider calls the orchestrator makes, or changing the `stop` chunk's `usage` shape
- Changing `onError`'s `instanceof Error` gate in `src/orchestration/chatOrchestrator.ts`