# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — `createChatOrchestrator` is the real entry point, and its provider and `afterModelResponse` hook can be driven directly with scripted provider rounds. The existing tool loop is the seam needed to observe usage over a turn.

## Done when these pass

- [ ] **sums the usage of every round, not only the last** — reports usage from two tool rounds and the final provider call as one total.
      `src/orchestration/usageAcrossRounds.acceptance.test.ts`
- [ ] **counts every reporting round when a round between them reports no usage** — missing round usage neither erases reported counts nor creates `NaN`.
      `src/orchestration/usageAcrossRounds.acceptance.test.ts`

## Facets

- [ ] Red: both acceptance tests fail because the hook receives only the last round's usage.
- [ ] Green: aggregate the reported usage across provider rounds while preserving `undefined` when no round reports usage.
- [ ] Preserve the existing no-tool `receives collected response text and usage` test unchanged; a single provider call continues to report its usage as-is.
- [ ] Clarify the public hook argument's type so its summed meaning is apparent without reading the orchestrator.
- [ ] Replace the spec's under-counting description with the aggregate behavior and add the changelog note describing the changed value existing consumers record.

## Out of scope

- Creating audit or billing records, and accounting for activity outside provider calls made by the orchestrator.
- Changing the `stop` chunk's usage shape.