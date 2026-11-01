# Definition of Done

> A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage` already drives provider calls, real tool execution and the installed hook. Use the ticket's explicitly requested scripted provider with known usage values; choose the existing argument as the turn sum, rejecting a breakdown because this ticket needs turn accounting rather than a wider provider-call API.

## Done when these pass

- [ ] **reports the sum of all three provider calls after two tool rounds** — two actual tool executions and three provider calls produce one hook report containing all token counts.
      `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`
- [ ] **sums reported rounds despite missing usage and preserves absent and single-call usage** — missing first, middle or last usage cannot erase counted rounds; no reported usage stays undefined; single-call and zero usage stay unchanged.
      `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`

## Facets

- [ ] Sum inputTokens, outputTokens and totalTokens per turn and expose the sum once through afterModelResponse.
- [ ] Ignore missing usage without inventing a zero report for an entirely unreported turn; preserve single-call behavior and the unedited existing `receives collected response text and usage` test in `src/orchestration/chatOrchestrator.test.ts`.
- [ ] Make the public hook signature unambiguously identify turn-total usage without any public `any`; retain the existing single-argument shape chosen in the spec.
- [ ] Ship the revised spec contract with a MINOR version bump and a CHANGELOG entry explaining larger recorded totals for existing consumers of tool-heavy turns; record the sum-versus-breakdown decision in the issue.
- [ ] Let CI verify build, all tests, typecheck, zero-warning ESLint and formatting; runtime acceptance tests deliberately do not scan source text to enforce signatures or release prose.

## Out of scope

- Consumer billing records and audit entries, accounting outside orchestrator provider calls, and changes to provider stop-chunk usage.
- Non-Error rejection routing, the unrelated unlinked statement in the older hooks spec.
- A per-provider-call breakdown API.