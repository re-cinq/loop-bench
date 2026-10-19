# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` exposes the real round loop and hook. The ticket explicitly calls for a scripted provider with known counts; the acceptance fixture supplies that protocol input while the real registry executes tools and the real orchestrator reports usage.

## Done when these pass

- [ ] **reports the sum of every provider call per turn, preserving absent usage and direct replies** — Two tool rounds and a final answer contribute all three token fields; leading, middle and trailing missing reports preserve known totals; all-missing turns stay undefined; a later direct reply remains unchanged. Frozen provider usage also prevents mutation of provider-owned counts.
      `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`

## Facets

- [x] Sum reported usage per message without mutating provider values, treating missing rounds as absent and resetting between turns.
- [x] Fix CI failures from last push: duplicate-code lint in chatOrchestrator.test.ts, else-branch lint in acceptance test, spec.md status mismatch, stale spec-names line numbers, missing CHANGELOG entry.
- [ ] Make the public hook parameter type explicitly represent turn-total usage, without `any`; retain the single summed argument chosen in the spec rather than widening the API with a breakdown.
- [ ] Preserve the unedited existing `receives collected response text and usage` test in `src/orchestration/chatOrchestrator.test.ts`; CI runs this regression alongside the acceptance test.
- [ ] Add a MINOR version bump and consumer-facing CHANGELOG entry explaining increased recorded usage on tool-heavy turns; the spec records the chosen contract and rejected alternative. (CHANGELOG entry added; version bump is a release concern.)

## Out of scope

- Audit and billing storage, usage outside orchestrator provider calls, and changes to provider stop-chunk shapes.
- The spec's unrelated non-Error rejection behaviour.
- Runtime tests of type names or release prose: public declaration clarity and release metadata require review and CI, not source-text assertions.