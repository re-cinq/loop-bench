# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` already exposes the running `afterModelResponse` hook, so scripted provider rounds can verify its reported usage through the real tool loop. The existing single-round hook test remains the unchanged no-tool regression guard.

## Done when these pass

- [ ] **reports the summed usage from every provider call in a turn with two tool rounds** — `afterModelResponse` receives the total of all three provider calls made by a two-tool-round turn.
      `src/orchestration/chatOrchestratorUsage.acceptance.test.ts`
- [ ] **counts reported rounds while leaving a turn with no reported usage undefined** — missing round usage does not poison reported totals, while an entirely unreported turn remains undefined.
      `src/orchestration/chatOrchestratorUsage.acceptance.test.ts`

## Facets

- [x] Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit.
- [x] Sum each token field only for provider rounds that report usage, preserving `undefined` when none do.
- [x] Preserve the unchanged no-tool regression guard, `receives collected response text and usage`, in `src/orchestration/chatOrchestrator.test.ts`.
- [x] Update the hooks spec and CHANGELOG with the aggregate-usage behavior and its impact on existing consumers.

- [x] Rename or document `afterModelResponse`'s `usage` parameter (e.g. a `TurnUsage` alias / JSDoc) so its type states it is the turn total — the orchestrator now sums via `addRoundUsage`, but the hook signature still reads `usage?: UsageMetadata`.

## Out of scope

- Audit or billing records created by consumers, non-provider token accounting, and the provider `stop` chunk usage shape.
- [x] Re-anchor the spec's `onError` citation to `chatOrchestrator.ts#L152` (the `instanceof Error` guard), which the two lines added to the orchestrator had shifted.
- [ ] CI's `test` step on 13ab565 timed out after the suite finished (coverage table printed, then jest held open on a `src/transport/ws` connectionHandler log, "Cannot log after tests are done"). The branch diff touches no transport code; re-run to confirm a runner hang, not a red test.
- [ ] CI's `test` step on 19001b9 timed out the same way (coverage table printed, then the same `src/transport/ws` "Cannot log after tests are done" disconnect log). Second identical hang in code this branch does not touch: suspect an open ws handle on main (no `--forceExit`/`--detectOpenHandles`), out of #93's scope.