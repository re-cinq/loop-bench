# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage` already drives the real tool loop and calls the installed hook. The ticket's scripted provider supplies known usage through real stream chunks, with a real ToolRegistry and echo executor; no orchestration or accounting functions are replaced.

## Done when these pass

- [ ] **reports the sum of every provider call once per turn, preserving absent usage and the no-tool result** — Two tool rounds plus the final answer contribute to all three token totals, missing first/middle/last usage is ignored, all-missing remains undefined, and direct turns retain their results; the hook fires exactly once.
      `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`

## Facets

- [ ] Accumulate all reported usage within each turn and pass that total once to afterModelResponse; preserve undefined when nothing reported.
- [ ] Keep the existing `receives collected response text and usage` test in `src/orchestration/chatOrchestrator.test.ts` unedited and green in CI.
- [ ] Make the public hook parameter/type explicitly identify total turn usage, without any in the public API; keep the existing third-argument shape instead of adding a per-round breakdown.
- [ ] Deliver the MINOR version bump and CHANGELOG entry explaining increased counts for existing consumers of tool-heavy turns; the spec records the chosen sum contract and why the wider shape was rejected.

## Out of scope

- Audit/billing storage, accounting outside orchestrator provider calls, stop-chunk usage changes, and the spec's separate non-Error rejection behaviour.
- A per-round breakdown: the existing argument shape serves the requested billing/budget use case without widening the surface.
- Source-text assertions about types, release notes or version numbers; these facets require implementation review and CI.