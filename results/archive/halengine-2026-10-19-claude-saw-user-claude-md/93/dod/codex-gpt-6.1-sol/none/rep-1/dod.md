# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — Call createChatOrchestrator.processMessage with a scripted provider, a real ToolRegistry, and a recording afterModelResponse hook. Keep one usage argument containing the sum; a breakdown adds surface that turn accounting does not need.

## Done when these pass

- [ ] **reports the sum of all three provider calls across two tool rounds** — one hook invocation includes input, output, and total tokens from all provider calls.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **sums reported rounds around missing usage and preserves absent and single-call usage** — missing reports at any position do not erase counted rounds; no reports stays undefined and no-tool usage stays unchanged.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [x] Accumulate all three token fields across provider calls without mutating provider reports; ignore missing usage and preserve undefined when nothing reported.
- [x] Keep the existing receives collected response text and usage test in src/orchestration/chatOrchestrator.test.ts unedited and green.
- [x] Make the public hook signature unambiguous about turn totals (for example name its parameter totalUsage), retaining the UsageMetadata shape and no any.
- [x] Add a MINOR version bump and a CHANGELOG entry explaining that existing consumers now record larger totals for tool turns; retain the summed-value decision and rejection of a breakdown in the spec.
- [x] Pass CI build, tests, typecheck, eslint, and prettier checks.

## Out of scope

- Billing or audit records, accounting outside orchestrator provider calls, stop chunk usage changes, and the unrelated onError rejection semantics.
- Lore descriptor tooling currently emits only id, name, and file; spec anchors are stamped in the tests and linked inline, without changing that tooling in this ticket.