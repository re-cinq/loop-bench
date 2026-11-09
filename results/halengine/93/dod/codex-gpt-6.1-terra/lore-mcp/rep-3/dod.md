# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — The orchestrator accepts a scripted provider and a real tool registry, and exposes the result through `afterModelResponse`. The existing single-call test pins the unchanged common path.

## Done when these pass

- [ ] **reports usage across tool rounds even when some rounds omit it** — The hook receives the sum of reported usage across two tool rounds and the final call, ignoring missing usage and preserving absence when none is reported.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Aggregate usage across provider calls, including missing usage, without changing single-call results.
- [ ] Make the hook's public type unambiguous, decide whether to expose a breakdown, and record the rejected option's rationale in the issue.
- [ ] Update the spec and changelog, including the effect on existing consumers, and make the appropriate minor version bump.
- [ ] Keep the existing single-call test unedited and satisfy the repository's CI checks without public API `any`.

## Out of scope

- Consumer billing or audit records, accounting for other calls, and the provider stop chunk's usage shape.