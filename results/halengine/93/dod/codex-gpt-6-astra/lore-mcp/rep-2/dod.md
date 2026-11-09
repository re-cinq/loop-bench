# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` already drives provider calls, real tool execution, and the installed hook. The ticket explicitly requests a scripted provider with known counts; the tests supply that protocol implementation without mocking the orchestrator, registry, or hooks.

## Done when these pass

- [ ] **sums usage from both tool rounds and the final provider call** — one hook report includes all three calls' input, output, and total counts after two real tool executions.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **sums reported rounds despite missing usage and preserves entirely absent usage** — missing first, middle, or last reports do not erase other rounds; no reports stays undefined and direct answers retain their counts.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Sum the reported usage per turn and deliver it once after the loop, preserving undefined when no call reports usage.
- [ ] Preserve the existing unedited `receives collected response text and usage` test in `src/orchestration/chatOrchestrator.test.ts`; keep the missing-usage matrix green.
- [ ] Make the public hook signature explicitly identify turn-total usage without any public `any`; retain the single argument as decided in the spec.
- [ ] Add the MINOR version bump and CHANGELOG entry describing increased recorded usage for existing tool-turn consumers; the spec now states the target behavior and rationale for rejecting a breakdown.
- [ ] Let CI run build, tests, typecheck, eslint, and prettier checks.

## Out of scope

- Billing/audit storage, usage outside orchestrator provider calls, and changing provider stop-chunk usage shapes.
- The spec's unrelated non-Error rejection behavior; it remains a recorded limitation.