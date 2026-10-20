# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` already exposes the running `afterModelResponse` hook, so scripted provider rounds can verify its reported usage through the real tool loop. The existing single-round hook test remains the unchanged no-tool regression guard.

## Done when these pass

- [ ] **reports the summed usage from every provider call in a turn with two tool rounds** — `afterModelResponse` receives the total of all three provider calls made by a two-tool-round turn.
      `src/orchestration/chatOrchestratorUsage.acceptance.test.ts`
- [ ] **counts reported rounds while leaving a turn with no reported usage undefined** — missing round usage does not poison reported totals, while an entirely unreported turn remains undefined.
      `src/orchestration/chatOrchestratorUsage.acceptance.test.ts`

## Facets

- [ ] Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit.
- [x] Sum each token field from two reported rounds in a pure operation.
- [x] Integrate the sum into the round loop, skipping missing usage and preserving `undefined` when none report.
- [ ] Preserve the unchanged no-tool regression guard, `receives collected response text and usage`, in `src/orchestration/chatOrchestrator.test.ts`.
- [x] Update the hooks spec and CHANGELOG with the aggregate-usage behavior and its impact on existing consumers.

- [ ] Record the aggregate-only API decision and MINOR release bump alongside the public type contract.

- [x] Repair the CI-reported max-expects violation in the missing-usage test while preserving both assertions.

## Out of scope

- Audit or billing records created by consumers, non-provider token accounting, and the provider `stop` chunk usage shape.