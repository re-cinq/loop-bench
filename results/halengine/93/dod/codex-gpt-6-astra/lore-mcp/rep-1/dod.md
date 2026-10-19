# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` drives the real round loop, tool registry and hook. The ticket explicitly requests a scripted provider with known counts; the acceptance fixture supplies those protocol values without mocking engine functions.

## Done when these pass

- [ ] **reports the sum of all three provider calls after two tool rounds** — one hook call contains all three token sums after two real tool executions.
      `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`
- [ ] **sums reported rounds across missing usage and preserves wholly absent usage** — omitted first, middle or last usage never erases reported totals; entirely absent usage remains undefined.
      `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`

## Facets

- [x] Accumulate each provider call's usage within the turn, preserving undefined when nothing reports.
- [ ] Keep `receives collected response text and usage` in `src/orchestration/chatOrchestrator.test.ts` unedited and green.
- [ ] Make the public hook signature explicitly describe a summed turn total, with no `any`; keep the single usage argument. The spec records why a breakdown was rejected.
- [x] Add the MINOR bump and CHANGELOG entry explaining the larger totals existing consumers will record for tool turns; review the updated spec against the implementation.
- [x] Pass CI's build, tests, typecheck, ESLint and formatting checks.

## Out of scope

- Billing or audit persistence, accounting outside orchestrator provider calls, changes to provider stop chunks, and per-round breakdown API.
- The spec's unrelated non-Error rejection semantics.
- Source-text assertions for documentation or type naming. Review and CI cover those obligations.
- Descriptor tooling changes: the existing Lore list adapter emits only id, name and file, not spec. Tests carry spec stamps and the spec carries named links; surfacing a spec descriptor field requires a separate tooling change.