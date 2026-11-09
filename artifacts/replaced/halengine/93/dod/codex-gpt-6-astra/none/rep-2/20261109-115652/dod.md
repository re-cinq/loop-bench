# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage` runs the real provider/tool loop and delivers usage to `afterModelResponse`. The ticket explicitly requests a scripted provider; these tests supply protocol chunks through that interface, with a real registry and arithmetic tool and no mocked orchestrator or dependencies.

## Done when these pass

- [ ] **reports the sum of every provider call after two tool rounds** — exactly one hook report sums all three provider calls, after two executed tools.
      `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`
- [ ] **sums reported rounds despite missing usage and reports nothing for an unmetered turn** — missing first, middle, or last usage preserves the sum; all-missing remains undefined; reuse of the orchestrator does not leak totals and a direct answer retains its usage.
      `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`

## Facets

- [ ] Sum input, output, and total token fields across the turn, keeping the single hook usage argument; do not mutate provider usage objects.
- [ ] Ignore absent usage, preserve undefined for entirely unmetered turns, and initialize accumulation separately for every turn.
- [ ] Make turn-total semantics explicit in the hook signature/type without public `any`; retain the existing `receives collected response text and usage` test unedited.
- [ ] Apply a MINOR version bump and add a consumer-facing CHANGELOG entry explaining the larger totals on tool-heavy turns; the spec records the sum-only decision and why a breakdown was rejected.
- [ ] Preserve spec links and run CI's required checks after implementation. The existing Lore list script emits only id/name/file (no spec field); test-side `@spec` anchors and statement-side named links record traceability without changing production or tooling in this tests-only ticket definition.

## Out of scope

- Per-provider-call breakdown, billing/audit storage, non-provider token costs, and changes to streamed stop-chunk usage.
- The spec's separate observation about non-Error rejections bypassing `onError`.