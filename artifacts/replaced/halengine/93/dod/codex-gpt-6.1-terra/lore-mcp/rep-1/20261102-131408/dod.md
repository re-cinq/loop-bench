# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — The orchestrator accepts a scripted provider and a real tool registry, and its afterModelResponse hook exposes the reported usage.

## Done when these pass

- [ ] **reports usage across every provider call, including when some rounds omit it** — Two tool rounds contribute all reported token counts; missing usage is ignored and an entirely unreported turn remains undefined.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **receives collected response text and usage** — The existing single-call behavior remains unchanged.
      `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [ ] Accumulate usage across provider calls, including partially and wholly unreported usage.
- [ ] Make the hook's usage semantics unambiguous in its public type and choose and explain the API shape.
- [ ] Preserve the existing single-call behavior and document the consumer-visible change in the changelog, including the appropriate minor version bump.
- [ ] Verify the updated spec and required CI checks.

## Out of scope

- Consumer audit or billing records, accounting outside orchestrator provider calls, and changes to provider stop chunk usage.