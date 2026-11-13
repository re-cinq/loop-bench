# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.
>
> For a turn that answered directly, that is the whole turn. For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere. A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it.

**Strategy: `direct`** — `createChatOrchestrator` and `OrchestratorHooks.afterModelResponse` already expose the lifecycle seam directly, and a scripted `AIProvider` drives multi-round tool turns end-to-end without mocks or stubs.

## Done when these pass

- [ ] **afterModelResponse usage across tool rounds › reports the sum of every provider call across two tool rounds** — A turn executing two tool rounds (three provider calls with distinct `inputTokens`, `outputTokens`, and `totalTokens`) hands `afterModelResponse` the sum across all three calls rather than only the final call's usage.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **afterModelResponse usage across tool rounds › sums the rounds that reported usage and reports undefined when none did** — A multi-round turn where only some rounds report usage hands `afterModelResponse` the sum of the reporting rounds (neither `undefined` nor `NaN`), and a turn where no round reports usage hands `undefined`.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Accumulate `inputTokens`, `outputTokens`, and `totalTokens` across every round that reports `usage` in `src/orchestration/chatOrchestrator.ts`, leaving the turn's usage `undefined` when no round reported any and keeping the existing unedited single-round test (`src/orchestration/chatOrchestrator.test.ts` `#L236`) green.
- [ ] Weigh the two signature options in the ticket (sum-only third parameter with an unambiguous type/name vs. sum third parameter plus optional per-round breakdown), make the type of what `afterModelResponse` receives unambiguous in the public API (re-exporting any new public type from `src/index.ts`), and record why the other shape was rejected in the PR/spec.
- [ ] Sync `<!-- doc-block: src/orchestration/chatOrchestrator.ts#OrchestratorHooks -->` in `CLAUDE.md` and `specs/hal-engine-architecture/spec.md` (`npm run docs:fix`) and verify `specs/hal-engine-config-hooks/spec.md` matches the chosen signature shape.
- [ ] Add an entry under `## [Unreleased]` in `CHANGELOG.md` stating the behaviour change in what an existing `afterModelResponse` consumer records on multi-round turns.

## Out of scope

- Audit entry or billing record persistence itself, which belongs to the consumer.
- Token accounting for anything other than the provider calls `chatOrchestrator` makes.
- Changing the `stop` chunk's per-round `usage` shape emitted by providers.
- Changing the `error instanceof Error` gate on `onError` in `src/orchestration/chatOrchestrator.ts`.