# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — The orchestrator accepts a scripted provider and invokes the real afterModelResponse hook after its tool loop. Its observable usage argument exposes the undercount directly.

## Done when these pass

- [ ] **reports usage across every provider call in a turn** — Sums two tool rounds and the final provider call, preserves reported usage when some rounds omit it, reports nothing when all omit it, and preserves single-call usage.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Aggregate reported usage across provider calls, retaining undefined when no call reports usage.
- [ ] Make the public hook type unambiguous about the chosen total and document the choice and alternative.
- [ ] Update the hooks spec and changelog to describe the changed consumer-visible usage; apply the appropriate minor version bump.
- [ ] Keep the existing no-tool hook test unchanged and passing, and satisfy the ticket's CI checks.

## Out of scope

- Consumer audit or billing records, accounting beyond orchestrator provider calls, and provider stop chunk usage shapes.