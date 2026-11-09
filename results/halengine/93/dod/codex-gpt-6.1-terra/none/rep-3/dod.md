# Definition of Done

> `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — The orchestrator accepts a provider and tool registry and exposes the hook, allowing the real tool loop to be exercised with scripted provider rounds.

## Done when these pass

- [ ] **reports usage across all provider calls, including when some rounds omit it** — Two tool rounds contribute all reported usage; missing usage does not erase reported counts and entirely missing usage remains absent.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **receives collected response text and usage** — The existing direct-answer behavior remains unchanged.
      `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [ ] Aggregate usage across provider calls, retaining absence when no call reports usage.
- [ ] Make the hook's public type unambiguously describe the chosen total or breakdown, without `any`.
- [ ] Record the choice and rejected alternative, update the hook spec, and add the minor version bump and changelog entry describing the changed recorded usage.
- [ ] Keep the existing no-tool test unedited and pass the ticket's CI checks.

## Out of scope

- Consumer billing or audit records, non-provider token accounting, and the provider stop chunk's usage shape.