# Definition of Done

> A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it.

**Strategy: `direct`** — `createChatOrchestrator` is the real entry point, its tool loop accepts a scripted `AIProvider`, and `afterModelResponse` exposes the usage reported for the completed turn. One three-call turn covers both accumulation and a round with absent usage.

## Done when these pass

- [ ] **reports the sum of every provider call that supplied usage across a tool turn** — the hook receives the sum of the first and last provider calls while a middle call with no usage neither erases nor corrupts that total.
      `src/orchestration/chatOrchestratorUsage.acceptance.test.ts`

## Facets

- [ ] Accumulate each reported round's `inputTokens`, `outputTokens`, and `totalTokens`, preserving `undefined` when no round reports usage.
- [ ] Make the hook parameter's public type/name unambiguously describe the turn-wide sum without introducing `any`.
- [ ] Keep the existing no-tool usage test unedited and green.
- [ ] Replace the config-hooks spec's under-counting description with the summed behavior and explain the consumer-visible change in the changelog.
- [ ] Pass the repository build, test, typecheck, eslint, and prettier checks.

## Out of scope

- Audit or billing storage, accounting outside orchestrator provider calls, and changes to provider `stop` chunk usage.