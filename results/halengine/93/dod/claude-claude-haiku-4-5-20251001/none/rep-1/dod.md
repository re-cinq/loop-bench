# Definition of Done

> Report usage across every tool round, not just the last

**Strategy: `direct`** — The acceptance hook already exists and is called with `lastUsage`. The change modifies how `lastUsage` is accumulated in the orchestrator's round loop to sum usage across all rounds instead of keeping only the most recent round's usage.

## Done when these pass

- [ ] **sums usage from multiple tool rounds when both report usage** — Two tool rounds that each report usage have both their usage totals summed before being passed to the hook
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **reports unchanged usage for a turn with no tool calls** — A turn with no tool calls still reports the single usage value from its only round, unchanged from current behaviour
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **handles partial usage reporting across rounds** — When some rounds report usage and others don't, the reported values are summed and undefined/missing rounds don't break the total
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **reports no usage when no rounds report any** — A turn where no round reports usage still passes undefined to the hook
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **correctly accumulates usage from three tool rounds** — Three rounds with usage each sum all three to the hook
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [x] Write a helper function to accumulate UsageMetadata objects by summing their numeric fields
- [x] Modify chatOrchestrator.ts to accumulate usage across rounds instead of replacing it
- [x] Update the type signature or documentation of `afterModelResponse` hook to clarify the usage is summed (if a type change is made)
- [x] Update `specs/hal-engine-config-hooks/spec.md` to document that `afterModelResponse` now receives summed usage
- [x] Add CHANGELOG entry documenting this as a MINOR version bump and behaviour change for tool-heavy turns

## Out of scope

- Implementation details of the choice between accumulating vs passing a breakdown — that decision is separate from these tests
- Audit entry or billing record implementation
- Token accounting beyond provider calls the orchestrator makes
- Changes to the `stop` chunk's own `usage` shape