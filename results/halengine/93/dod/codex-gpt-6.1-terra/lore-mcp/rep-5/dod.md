# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — The orchestrator accepts a provider and exposes the afterModelResponse hook, so a scripted provider can drive real tool rounds through the existing entry point.

## Done when these pass

- [ ] **reports usage across every provider call, including when some rounds omit it** — Two tool rounds contribute all reported token counts; missing reports are ignored and an entirely unreported turn remains undefined.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **receives collected response text and usage** — The existing single-call behavior remains unchanged.
      `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [ ] Choose and document the hook usage shape and why the alternative was rejected; make its type unambiguous without `any`.
- [ ] Aggregate usage across provider calls, preserving missing-usage and single-call behavior.
- [ ] Update the spec and changelog to describe the chosen behavior and its effect on existing consumers; apply the appropriate version bump.
- [ ] Keep the existing single-call test unedited and pass the repository checks in CI.

## Out of scope

- Consumer billing and audit records, accounting outside orchestrator provider calls, and provider stop chunk usage shapes.