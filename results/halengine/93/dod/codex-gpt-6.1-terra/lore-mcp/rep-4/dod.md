# Definition of Done

> A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it.

**Strategy: `direct`** — The orchestrator accepts a provider and tool registry and exposes the hook, so a scripted sequence can exercise the real tool loop and observe its usage.

## Done when these pass

- [ ] **reports usage across every provider call, including when some calls omit it** — Two tool rounds account for all reported usage, tolerate missing rounds, and preserve the absence of usage when none report it.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Aggregate all provider-call usage and preserve undefined when no call reports usage.
- [ ] Make the hook's public type unambiguous, retaining the existing no-tool behavior and test; document the chosen shape and why the alternative was rejected.
- [ ] Update the recorded spec semantics and changelog, and make the appropriate minor version bump.

## Out of scope

- Consumer billing or audit records, accounting outside orchestrator provider calls, and the provider stop chunk's usage shape.