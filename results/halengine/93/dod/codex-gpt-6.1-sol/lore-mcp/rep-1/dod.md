# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — `createChatOrchestrator` accepts a scripted provider and a real tool registry, exposing the hook through the running turn. Keep the existing usage argument and make it the sum: existing consumers retain their shape; a per-round breakdown adds surface beyond the billing total required here.

## Done when these pass

- [ ] **reports the sum of every provider call once per turn, preserving missing usage and direct answers** — Executes two tool rounds and the final provider call with distinct counts; covers missing usage at every position, no usage, direct answers and reported zero, asserting one hook invocation and real tool execution.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Accumulate all three token fields across provider calls, retaining undefined only when no call reported usage.
- [ ] Preserve the unedited existing `receives collected response text and usage` test in `src/orchestration/chatOrchestrator.test.ts` and keep single-call usage unchanged.
- [ ] Make the public hook signature unambiguously describe turn totals (for example a named turn-total type and parameter), with no public API `any`.
- [ ] Retain the new normative turn-usage spec statement; document the choice of sum over breakdown, add a consumer-facing CHANGELOG entry describing larger tool-turn totals, and make a MINOR version bump.
- [ ] Pass CI's build, tests, typecheck, eslint with zero warnings, and prettier checks.

## Out of scope

- Consumer audit and billing records, usage outside orchestrator provider calls, and changes to provider stop-chunk usage shapes.
- Per-provider-call breakdown API and the separately recorded non-Error rejection behaviour.