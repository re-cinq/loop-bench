# Definition of Done

> `afterModelResponse` [...] is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` with a scripted provider and a real `ToolRegistry` drives a turn through several tool rounds today, and the `afterModelResponse` hook is the real place to observe the reported usage. Shape chosen: sum every round into the existing single `usage` argument (rejected: total plus per-round breakdown, a wider surface with no consumer yet; recorded in the spec).

## Done when these pass

- [ ] **reports the sum of every provider call in a turn driven through two tool rounds** — three provider calls reporting 110, 220 and 330 tokens hand the hook their field-by-field sum, not the last call's
  `src/orchestration/turnUsage.acceptance.test.ts`
- [ ] **counts only the rounds that reported usage, and reports nothing when no round did** — a round with no usage adds nothing and causes no `undefined`/`NaN`; a turn where no round reported passes `undefined`
  `src/orchestration/turnUsage.acceptance.test.ts`
- [ ] **receives collected response text and usage** (EXISTING, must stay green and UNEDITED) — a turn with no tool calls reports exactly what it reports today
  `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [ ] Replace `lastUsage` in `processMessageStream` with a running sum that stays `undefined` until a round reports usage
- [ ] Make the signature say it is a sum: rename the `afterModelResponse` parameter (e.g. `turnUsage`) and add a one-line doc comment saying it sums every provider call in the turn; no `any`
- [ ] Regenerate the `OrchestratorHooks` block in CLAUDE.md if the declaration changed (it is generated from the declaration)
- [ ] CHANGELOG entry (MINOR): existing consumers now record a larger number for turns that ran tools; no-tool turns are unchanged
- [ ] Check `src/orchestration/toolBudget.test.ts` "hands afterModelResponse ... usage" and "keeps the usage an earlier round reported when a later round reports none" still pass (both stay valid under a sum)

## Out of scope

- The audit entry or billing record itself, and any `UsageStore` wiring
- Token accounting for calls other than the orchestrator's provider calls (e.g. `generateStructured`)
- The `stop` chunk's own `usage` shape
- The `onError` `instanceof Error` gate still recorded under Measured semantics in the spec