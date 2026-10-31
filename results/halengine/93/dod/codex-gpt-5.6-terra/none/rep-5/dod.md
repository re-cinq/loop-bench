# Definition of Done

> A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it.

**Strategy: `direct`** — `createChatOrchestrator` accepts a provider, a real tool registry, and `afterModelResponse`, so an acceptance test can drive the production round loop and observe the hook value.

## Done when these pass

- [ ] **reports the sum of reported provider usage and remains undefined when no round reports usage** — tool-heavy turns give `afterModelResponse` a total across provider calls while omitted round usage is ignored and wholly absent usage remains absent.
      `src/orchestration/chatOrchestratorUsage.acceptance.test.ts`

## Facets

- [ ] Accumulate each reported provider round's token fields before calling `afterModelResponse`.
- [ ] Preserve `undefined` when no provider round reports usage and retain the existing no-tool usage test unchanged.
- [ ] Document the accumulated `usage` contract and changelog the changed value seen by existing consumers.

## Out of scope

- Consumer billing or audit persistence, non-provider token accounting, and changing stop-chunk usage metadata.