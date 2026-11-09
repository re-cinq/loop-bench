# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — The orchestrator accepts a scripted provider and a real tool registry, and its hook exposes the usage reported after the turn.

## Done when these pass

- [ ] **reports usage across all provider calls, including when some rounds omit it** — Two tool rounds contribute all reported usage, missing reports are ignored, and no reports yield no usage.
      `src/orchestration/usage.acceptance.test.ts`

## Facets

- [ ] Aggregate provider-call usage across the turn, preserving absent usage when no round reports it.
- [ ] Make the hook's public type unambiguous about the chosen total or breakdown, and record why the other shape was rejected.
- [ ] Keep the existing no-tool usage test unchanged and passing.
- [ ] Update the spec, changelog and minor version for the changed consumer-visible usage.

## Out of scope

- Consumer billing or audit records, non-orchestrator token accounting, and provider stop chunk usage shapes.