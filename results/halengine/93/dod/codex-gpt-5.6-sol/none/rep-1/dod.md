# Definition of Done

> what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` accepts a scripted provider and the real tool registry, and `afterModelResponse` directly exposes the turn usage. The acceptance test drives complete tool turns through that public orchestrator seam.

## Done when these pass

- [ ] **reports the summed usage of every provider call while preserving absent usage** — a multi-tool turn sums distinct counts from every provider call, ignores rounds with no usage, and reports `undefined` only when no round reports usage
      `src/orchestration/usageAcrossRounds.acceptance.test.ts`

## Facets

- [ ] Accumulate each reported round's input, output, and total token counts for `afterModelResponse`.
- [ ] Give the hook's aggregate a public type and parameter name that identify it unambiguously as whole-turn usage, without `any`.
- [ ] Preserve the existing direct-turn result and its unedited test.
- [ ] Replace the spec's recorded under-counting statement with the summed semantics and record the consumer-visible change in the changelog.
- [ ] Complete the repository's CI verification gates, including build, tests, typecheck, eslint, and Prettier.

## Out of scope

- Audit or billing storage, token accounting outside orchestrator provider calls, and changes to provider stop-chunk usage.