# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` already exposes the running `afterModelResponse` hook, so scripted provider rounds can verify its reported usage through the real tool loop. The existing single-round hook test remains the unchanged no-tool regression guard.

## Done when these pass

- [ ] **reports the summed usage from every provider call in a turn with two tool rounds** — `afterModelResponse` receives the total of all three provider calls made by a two-tool-round turn.
      `src/orchestration/chatOrchestratorUsage.acceptance.test.ts`
- [ ] **counts reported rounds while leaving a turn with no reported usage undefined** — missing round usage does not poison reported totals, while an entirely unreported turn remains undefined.
      `src/orchestration/chatOrchestratorUsage.acceptance.test.ts`

## Facets

- [x] Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit. (Round 4: `TurnUsage` in `src/types/ai.ts`, returned by `addUsage` and passed to `afterModelResponse`, exported from the package root. Its RED test is a compile-time import in `orchestratorHelpers.test.ts`; Jest transpiles only (`isolatedModules`), so the red shows in CI's typecheck, not in the local run.)
- [x] Sum each token field only for provider rounds that report usage, preserving `undefined` when none do. (Round 5: verified by reading `addUsage`; its tests are green in CI's Test step.)
- [x] Sum of two reported rounds is in place as `addUsage` in `src/orchestration/orchestratorHelpers.ts` (round 1 closed the two-defined case), and `addUsage` accepts an unreported round (`undefined`) and keeps the other total (round 2 closed that). The orchestrator loop now folds rounds through `addUsage` in place of `lastUsage` (round 3), and an empty running total starts from the first reported round.
- [x] Preserve the unchanged no-tool regression guard, `receives collected response text and usage`, in `src/orchestration/chatOrchestrator.test.ts`. (Round 5: `git diff origin/main` shows that test unedited.)
- [x] Update the hooks spec and CHANGELOG with the aggregate-usage behavior and its impact on existing consumers. (Round 5: spec statements at the measured-semantics section now cite the orchestrator sum test and the `TurnUsage` type test, closing the `require-spec-link` findings.)
- [ ] Correct the `OrchestratorHooks` block in `CLAUDE.md`, which still declares `afterModelResponse` with `usage?: UsageMetadata` rather than `turnUsage?: TurnUsage` (found in round 5).

## Out of scope

- Audit or billing records created by consumers, non-provider token accounting, and the provider `stop` chunk usage shape.