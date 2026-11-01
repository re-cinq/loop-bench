# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` already exposes the running `afterModelResponse` hook, so scripted provider rounds can verify its reported usage through the real tool loop. The existing single-round hook test remains the unchanged no-tool regression guard.

## Done when these pass

- [ ] **reports the summed usage from every provider call in a turn with two tool rounds** — `afterModelResponse` receives the total of all three provider calls made by a two-tool-round turn.
      `src/orchestration/chatOrchestratorUsage.acceptance.test.ts`
- [ ] **counts reported rounds while leaving a turn with no reported usage undefined** — missing round usage does not poison reported totals, while an entirely unreported turn remains undefined.
      `src/orchestration/chatOrchestratorUsage.acceptance.test.ts`

## Facets

- [x] Add pure field-by-field aggregation for reported usage across provider calls.

- [x] Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit.
- [x] Sum each token field only for provider rounds that report usage, preserving `undefined` when none do.
- [x] Preserve the unchanged no-tool regression guard, `receives collected response text and usage`, in `src/orchestration/chatOrchestrator.test.ts`.
- [x] Update the hooks spec and CHANGELOG with the aggregate-usage behavior and its impact on existing consumers.

- [x] Repair the CI-reported `prefer-early-return` finding in the turn usage hook contract fixture without changing its behavior.

## Out of scope

- Audit or billing records created by consumers, non-provider token accounting, and the provider `stop` chunk usage shape.

## Current round

Repaired the sole finding in the supplied CI verdict: the turn usage hook contract fixture now returns after its tool-use stop chunk instead of using an else branch. The fixture still emits exactly the same chunks for each provider call, and its assertion and spec descriptor are unchanged. The test declaration remains at line 22, preserving its spec citation. No new behavior required a test, and no tests or lint were run locally under this repair round's execution restrictions. The verdict reports zero failing ticket tests and zero regression tests; it reports one lint error. All implementation facets remain closed, with acceptance and lint status awaiting CI on this push.