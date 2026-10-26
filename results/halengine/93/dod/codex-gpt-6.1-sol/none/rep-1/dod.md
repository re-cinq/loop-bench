# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — Drive the real orchestrator with a scripted provider and real ToolRegistry, observing the afterModelResponse hook. Keep one usage argument containing the sum; a breakdown adds surface the billing seam does not require.

## Done when these pass

- [ ] **reports summed usage for every provider call while preserving missing usage and direct answers** — Two tool rounds plus their final answer contribute all three token fields; missing reports are ignored, no reports stays undefined, and direct answers are unchanged. Also checks one hook call and the actual provider/tool call counts. Spec anchor: `specs/hal-engine-config-hooks/spec.md#8` (the new Turn usage statement); the current Lore Jest descriptor adapter emits only id/name/file, so the anchor is stamped in the test and linked from the spec.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Accumulate reported usage across all provider calls without manufacturing usage when none is reported.
- [ ] Keep the existing “receives collected response text and usage” no-tool test in chatOrchestrator.test.ts unedited and green.
- [ ] Make the public hook signature explicitly identify usage as the turn total, with no any; retain the existing single argument shape.
- [ ] Keep the spec's new aggregate semantics and decision rationale accurate; record the larger tool-turn totals in CHANGELOG and make the requested MINOR version bump.
- [ ] Run the repository CI checks for build, tests, types, lint and formatting in the implementation round.

## Out of scope

- Per-round breakdown, billing/audit persistence, non-provider accounting, stop-chunk usage changes, and the unrelated non-Error rejection behaviour recorded in the spec.