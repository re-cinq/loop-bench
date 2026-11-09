# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — The orchestrator accepts a scripted provider and a real tool registry, and its `afterModelResponse` hook exposes the turn's usage.

## Done when these pass

- [ ] **reports turn usage across provider calls including when some rounds omit usage** — Two tool rounds include all three calls, missing reports are ignored, and no reports produce no usage.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Aggregate reported usage across all provider calls, retaining absent usage when none is reported.
- [ ] Make the hook's public type unambiguous about the total and decide whether to expose a per-round breakdown, recording why the other shape was rejected.
- [ ] Preserve the existing no-tool behavior and its unedited test; update the spec and changelog for consumers, and make the appropriate minor version bump.
- [ ] Pass the ticket's CI checks without `any` in the public API.

## Out of scope

- Consumer audit and billing records, accounting beyond orchestrator provider calls, and provider stop chunk usage shapes.