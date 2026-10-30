# Definition of Done

> what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` accepts a scripted provider, a real tool registry, and hooks, so its public `processMessage` entry point can expose the turn total directly. One scenario covers multiple reported rounds, partially missing usage, and wholly missing usage; the existing no-tool-call test remains unedited.

## Done when these pass

- [ ] **reports the sum of every provider call and ignores rounds with no usage** — a turn with two tool rounds sums all three provider calls, missing rounds contribute nothing, and a turn with no reported usage remains `undefined`.
      `src/orchestration/chatOrchestratorUsage.acceptance.test.ts`

## Facets

- [ ] Accumulate each reported provider-call usage into the turn total without manufacturing a value when no call reports usage.
- [ ] Give the hook's public third parameter a type/name that identifies it unambiguously as the summed turn usage, without `any`.
- [ ] Replace the spec's recorded under-counting statement with the summed-turn behavior and link it to the acceptance test.
- [ ] Add a changelog entry explaining that existing hook consumers record larger totals for tool-heavy turns.
- [ ] Keep the existing no-tool-call usage test unedited and green.

## Out of scope

- Audit or billing storage, token accounting outside orchestrator provider calls, and providers' `stop` chunk usage shape.