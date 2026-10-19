# Definition of Done

> `afterModelResponse` ... is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` with a scripted provider and an `afterModelResponse` hook is a real seam today. The tests assume the first shape the ticket weighs: one `usage` argument, summed across rounds.

## Done when these pass

- [ ] **reports the sum of every provider call in a two-tool-round turn** — rounds of 100/200/300 input tokens report 600 in total.
      `src/orchestration/afterModelResponseUsage.acceptance.test.ts`
- [ ] **still counts the rounds that reported when others did not** — a silent round neither zeroes nor NaNs the total.
      `src/orchestration/afterModelResponseUsage.acceptance.test.ts`

## Facets

- [x] Accumulate usage per round in chatOrchestrator.ts and pass the sum (undefined when nothing reported)
- [x] Document the sum on the hook type; update the spec line and the CHANGELOG (MINOR)
- [x] Existing no-tool test stays unedited and green
- [x] Fix CI: add spec link for acceptance test line 56, deduplicate hooks pattern, reanchor stale spec citations

## Out of scope

- The audit/billing record, non-provider token accounting, the `stop` chunk's usage shape.
- Per-round breakdown (the rejected shape; record why in the issue).