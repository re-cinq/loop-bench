# Definition of Done

> `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — The real `createChatOrchestrator` entry point accepts a scripted provider, a real tool registry, and an `afterModelResponse` hook, so the complete multi-round turn is observable without changing production code.

## Done when these pass

- [ ] **sums every reported provider round and reports nothing only when every round omits usage** — A two-tool-round turn sums every provider call that reports usage, ignores omitted usage, and preserves `undefined` when no call reports usage.
      `src/orchestration/chatOrchestratorUsage.acceptance.test.ts`

## Facets

- [x] Accumulate each round's `inputTokens`, `outputTokens`, and `totalTokens` for the turn.
- [x] Keep the no-tool path's existing reported value unchanged and preserve `undefined` when every round omits usage.
- [x] Make the public hook signature unambiguously name the value as turn-total usage without introducing `any`.
- [x] Replace the spec's under-counting statement with the summed behavior and record the consumer-visible change under `CHANGELOG.md`'s Unreleased section.
- [x] Keep the repository's build, test, typecheck, ESLint, and Prettier gates green.

## Out of scope

- Audit or billing storage, token accounting outside orchestrator provider calls, and changes to provider `stop` chunk usage.