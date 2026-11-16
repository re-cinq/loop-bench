# Definition of Done

> It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` already exposes `OrchestratorHooks.afterModelResponse` as the direct seam for observing turn usage across scripted provider rounds.

## Done when these pass

- [ ] **reports the sum of three provider calls when a turn runs two tool rounds** — Asserts that a turn running two tool rounds (three provider calls with distinct token counts) hands `afterModelResponse` the summed `inputTokens`, `outputTokens`, and `totalTokens` across all three calls.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **counts the rounds that reported usage when one round reports none, and reports nothing when no round did** — Asserts that rounds omitting `usage` neither reset the sum nor produce `undefined`/`NaN`, while a turn where no round reported usage still passes `undefined`.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **receives collected response text and usage** — Existing no-tool test must remain unedited and passing so single-round behaviour does not change.
  `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [ ] Accumulate `outcome.usage` across every round in `src/orchestration/chatOrchestrator.ts` instead of overwriting `lastUsage`, leaving `undefined` when no round reported usage.
- [ ] Keep the summed `UsageMetadata` in `afterModelResponse`'s 3rd `usage` parameter (so `src/orchestration/chatOrchestrator.test.ts#L236` remains unedited), decide whether to also add a per-round breakdown parameter, and make the public TypeScript signature unambiguous without `any` (recording the rejected option on the issue).
- [ ] Keep `specs/hal-engine-config-hooks/spec.md` citations aligned, add a `CHANGELOG.md` entry noting the increased usage numbers for tool-heavy turns, and ensure `npm run verify` and `npm run build` pass.

## Out of scope

- The audit entry or billing record itself, which is a consumer's concern.
- Token accounting for anything other than the provider calls the orchestrator makes.
- The `stop` chunk's own `usage` shape, which providers already populate.
- The `error instanceof Error` gate on `onError` in `src/orchestration/chatOrchestrator.ts`.