# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — The orchestrator accepts a provider and exposes the `afterModelResponse` hook, so a scripted provider and real tool registry exercise the turn through its existing entry point.

## Done when these pass

- [ ] **reports usage across all provider calls, including when some rounds omit usage** — Two tool rounds contribute all reported token counts, missing usage is ignored, and wholly absent usage remains absent.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **receives collected response text and usage** — The existing single-call hook behavior remains unchanged.
      `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [ ] Aggregate every provider call's usage, preserving absent usage when no call reports it.
- [ ] Make the hook's public type unambiguous about the chosen total and any breakdown, without `any`; record why the alternative was rejected.
- [ ] Update the config-hooks spec and changelog to describe the changed consumer-visible usage, including the appropriate minor version bump.
- [ ] Keep the existing no-tool test unchanged and pass the repository's CI checks.

## Out of scope

- Consumer audit or billing records, accounting outside orchestrator provider calls, and provider stop chunk usage shapes.