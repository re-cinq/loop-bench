# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — The orchestrator accepts a scripted provider and a real tool registry, and its hook exposes the reported usage. The acceptance test exercises the existing caller path through two tool rounds.

## Done when these pass

- [ ] **reports the sum of every reported provider call across tool rounds** — The hook receives the totals for all three calls, counts available reports when one is missing, and receives no usage when none report.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **receives collected response text and usage** — The existing no-tool case remains unchanged.
      `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [ ] Sum reported input, output, and total tokens across provider calls, preserving absent usage when no call reports it.
- [ ] Make the hook's public type unambiguously describe turn totals and retain the no-tool behavior.
- [ ] Record the choice and rejected alternative on the issue, and document the changed consumer behavior in the changelog with a minor version bump.
- [ ] Run the repository's CI checks.

## Out of scope

- Consumer audit and billing records, accounting beyond orchestrator provider calls, and provider stop chunk usage shapes.