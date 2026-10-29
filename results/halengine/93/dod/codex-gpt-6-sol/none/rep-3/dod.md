# Definition of Done

> It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` accepts a real scripted provider and an `afterModelResponse` hook, so a test can drive two tool rounds and observe the hook directly. Keep the single `usage` argument and sum reported rounds; a breakdown was rejected because it widens the public hook surface without serving the common billing case.

## Done when these pass

- [ ] **reports summed provider usage across two tool rounds and skips rounds without usage** — the hook receives all reported token counts, ignores missing rounds, and receives `undefined` when none report usage.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Accumulate `inputTokens`, `outputTokens`, and `totalTokens` across provider calls, preserving `undefined` if no call reports usage.
- [ ] Rename the public hook argument to `totalUsage` and document that it sums reported provider calls, without introducing `any`.
- [ ] Keep the existing no-tool usage test in `src/orchestration/chatOrchestrator.test.ts` unedited and green in CI.
- [ ] State the change to existing consumers in `CHANGELOG.md` and make the MINOR version bump.
- [ ] Run the named acceptance test and existing no-tool test, then pass CI's build, full test, typecheck, eslint, and prettier gates.

## Out of scope

- Consumer audit or billing records, accounting beyond orchestrator provider calls, and the stop chunk's own usage shape.