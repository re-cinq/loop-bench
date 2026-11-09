# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — The orchestrator's processMessage entry point runs scripted provider rounds and exposes the reported usage through afterModelResponse.

## Done when these pass

- [ ] **reports usage across every provider call in a turn** — Counts all reported usage over two tool rounds, excludes missing reports, and preserves absence when no call reports usage.
      `src/orchestration/chatOrchestratorUsage.acceptance.test.ts`

## Facets

- [ ] Aggregate usage across provider calls, including when some or all reports are absent.
- [ ] Preserve the existing single-call hook behavior and its unedited test.
- [ ] Make the hook's public type unambiguous, choose and document the API shape and rejected alternative, and avoid public `any`.
- [ ] Update the spec, changelog, and minor version to describe the change for existing consumers; pass CI checks.

## Out of scope

- Consumer billing or audit records, accounting outside orchestrator provider calls, and provider stop chunk usage shape.