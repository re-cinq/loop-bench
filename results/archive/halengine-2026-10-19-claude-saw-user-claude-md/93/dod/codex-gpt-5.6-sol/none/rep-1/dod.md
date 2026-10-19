# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — The public `createChatOrchestrator` entry point already accepts a scripted provider, a real tool registry, and `afterModelResponse`, so the complete turn can be exercised without doubles or production changes.

## Done when these pass

- [ ] **reports the sum of every provider call in a turn with two tool rounds** — A three-call turn reports the field-wise sum rather than only its final call.
      `src/orchestration/chatOrchestratorUsage.acceptance.test.ts`
- [ ] **sums the rounds that report usage and reports nothing when none do** — Missing per-call usage neither poisons reported totals nor invents usage for an entirely unreported turn.
      `src/orchestration/chatOrchestratorUsage.acceptance.test.ts`

## Facets

- [x] Replace the last-round accumulator with field-wise aggregation over every provider call that reports usage.
- [ ] Make the public hook parameter type unambiguously describe aggregate turn usage without introducing `any`.
- [ ] Preserve the existing no-tool-call hook behaviour and its existing test unchanged.
- [x] Update the changelog with the larger value existing consumers will record for tool-heavy turns and the required MINOR version impact.
- [ ] Make the full build, test, typecheck, ESLint, and Prettier CI checks pass.

## Out of scope

- Audit or billing persistence, token accounting outside orchestrator provider calls, and changes to providers' stop-chunk usage shape.