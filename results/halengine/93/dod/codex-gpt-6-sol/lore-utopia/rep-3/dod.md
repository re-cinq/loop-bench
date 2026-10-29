# Definition of Done

> It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` already accepts a concrete provider, tool registry, and `afterModelResponse` hook. Scripted provider rounds exercise the actual turn loop and expose the missing accumulation.

## Done when these pass

- [ ] **sums usage from both tool rounds and the final provider call** — the hook receives componentwise totals for every provider call in a two-tool-round turn.
      `src/orchestration/chatOrchestratorUsage.acceptance.test.ts`
- [ ] **counts reported rounds across gaps and leaves an all-unreported turn without usage** — missing usage contributes nothing, reported rounds still sum, and a wholly unreported turn stays undefined.
      `src/orchestration/chatOrchestratorUsage.acceptance.test.ts`
- [x] **receives collected response text and usage** — the existing no-tool test remains unedited and pins the single-call value.
      `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [ ] Accumulate `inputTokens`, `outputTokens`, and `totalTokens` over all provider calls that report usage; preserve `undefined` when none report.
- [ ] Make the public hook argument explicitly denote turn-total usage, without `any`; retain the existing single-call behavior and signature compatibility.
- [ ] Record why a single summed usage value was chosen instead of a per-round breakdown.
- [x] Update the spec's former under-counting statement and cite the acceptance tests.
- [ ] Add a `CHANGELOG.md` migration note explaining that existing consumers now see larger counts on tool turns.
- [ ] Apply the required MINOR version bump and pass the repository CI gates, including build, tests, typecheck, ESLint, and Prettier.

## Out of scope

- Consumer billing or audit records, token accounting outside provider calls, and the provider's `stop` chunk usage shape.