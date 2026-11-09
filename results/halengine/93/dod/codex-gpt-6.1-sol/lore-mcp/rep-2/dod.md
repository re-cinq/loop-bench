# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — `createChatOrchestrator` accepts an AIProvider, a real ToolRegistry and lifecycle hooks. A scripted provider supplies known usage through the real round loop; no module replacement is needed.

## Done when these pass

- [ ] **reports total usage across two tool rounds while preserving missing and direct usage** — observes one hook report covering all three provider calls, sparse usage, entirely absent usage and unchanged direct answers.
      `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`

## Facets

- [ ] Accumulate all three token fields across provider calls; preserve undefined when no call reports usage.
- [ ] Keep the existing no-tool test `receives collected response text and usage` unedited in `src/orchestration/chatOrchestrator.test.ts`.
- [ ] Keep one summed usage argument and make its total-turn semantics unambiguous in the public type; reject a per-round breakdown because this ticket needs a turn total and no consumer requirement justifies a wider surface.
- [ ] Preserve the new spec contract and add a MINOR version bump and changelog entry explaining that existing consumers record larger totals for tool-heavy turns.
- [ ] Pass the repository CI checks, including public API typing without any.

## Out of scope

- Billing or audit persistence, accounting outside orchestrator provider calls, and changes to provider stop-chunk usage.
- The separately recorded non-Error rejection behaviour in the hooks spec.
- A per-round public breakdown. The test descriptor script currently emits only id, name and file; the acceptance test carries an explicit spec stamp and the statement links to its declaration.