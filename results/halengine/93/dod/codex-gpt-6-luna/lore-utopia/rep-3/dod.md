# Definition of Done

> A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it.

**Strategy: `direct`** — `afterModelResponse` is an existing hook reached through `processMessage`, and the orchestrator test seam accepts a scripted provider and real tool registry. Acceptance tests observe the hook argument over actual tool rounds.

## Done when these pass

- [ ] **reports the sum from every provider call across two tool rounds** — the hook receives totals summed from the question round and both tool rounds.
      `src/orchestration/toolRoundUsage.acceptance.test.ts`
- [ ] **counts reported rounds when other rounds omit usage and reports undefined when none do** — all reported rounds are summed despite an omitted round, and no reported usage remains undefined.
      `src/orchestration/toolRoundUsage.acceptance.test.ts`

## Facets

- [ ] Accumulate input, output, and total token counts from each provider call without producing undefined or NaN when a round omits usage.
- [ ] Keep the existing `receives collected response text and usage` test unedited; it pins the no-tool path.
- [ ] Make the `afterModelResponse` usage type explicitly describe the accumulated total.
- [ ] Replace the spec's recorded under-counting behavior with the new aggregate behavior.
- [ ] Add a changelog entry and MINOR version bump describing the changed usage existing consumers record.

## Out of scope

- Creating audit or billing records for consumers.
- Accounting for anything other than provider calls made by the orchestrator.
- Changing the `stop` chunk's own usage shape.