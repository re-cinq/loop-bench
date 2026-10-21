# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` already exposes the running `afterModelResponse` hook, so scripted provider rounds can verify its reported usage through the real tool loop. The existing single-round hook test remains the unchanged no-tool regression guard.

## Done when these pass

- [ ] **reports the summed usage from every provider call in a turn with two tool rounds** — `afterModelResponse` receives the total of all three provider calls made by a two-tool-round turn.
      `src/orchestration/chatOrchestratorUsage.acceptance.test.ts`
- [ ] **counts reported rounds while leaving a turn with no reported usage undefined** — missing round usage does not poison reported totals, while an entirely unreported turn remains undefined.
      `src/orchestration/chatOrchestratorUsage.acceptance.test.ts`

## Facets

- [x] Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit. — `TurnUsage` (exported from `src/types/ai.ts`) now types the hook's third argument; the orchestrator accumulates per-round usage and passes `sumReportedUsage(roundUsages)`.
- [x] Sum each token field only for provider rounds that report usage, preserving `undefined` when none do. — `sumReportedUsage` in `src/orchestration/orchestratorHelpers.ts`, pinned by `sums reported rounds while staying undefined when none reported` in `src/orchestration/orchestratorHelpers.test.ts`.
- [ ] Preserve the unchanged no-tool regression guard, `receives collected response text and usage`, in `src/orchestration/chatOrchestrator.test.ts`. — left unedited this round; CI's run on this branch is its verdict.
- [x] Update the hooks spec and CHANGELOG with the aggregate-usage behavior and its impact on existing consumers. — config-hooks line was replaced by the earlier round; this round added the architecture-spec sum statement, synced the generated `OrchestratorHooks` blocks, and wrote the Unreleased/Changed entry (with the rejected per-round-breakdown shape recorded there, since the issue itself cannot be edited from here).
- [x] Cite `counts reported rounds while leaving a turn with no reported usage undefined` from a spec statement, so the traceability gate (`re-lint/require-spec-link`) passes. — CI's lint step named `chatOrchestratorUsage.acceptance.test.ts#L67` as uncited; the statement now sits beside the summed-usage statement in `specs/hal-engine-config-hooks/spec.md`.

## Out of scope

- Audit or billing records created by consumers, non-provider token accounting, and the provider `stop` chunk usage shape.