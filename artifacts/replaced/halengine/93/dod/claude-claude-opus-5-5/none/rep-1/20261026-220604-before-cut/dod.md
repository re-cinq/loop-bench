# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere. A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it.

**Strategy: `direct`** — `createChatOrchestrator` with a scripted `AIProvider` and a real `ToolRegistry` already drives a multi-round turn end to end, and the `afterModelResponse` hook is the observation point. The tests fail today because the hook receives `lastUsage`, the final round's usage only.

## Done when these pass

- [ ] **covers every provider call of a turn driven through two tool rounds** — three provider calls reporting 110, 220 and 440 tokens; the hook's usage must be the sum (700/70/770), not 400/40/440
      `src/orchestration/turnUsage.acceptance.test.ts`
- [ ] **counts the rounds that reported usage, and reports none when no round did** — a round with no usage adds nothing (no `undefined`/`NaN`), the reporting rounds still sum, and a turn where no round reported passes `undefined`
      `src/orchestration/turnUsage.acceptance.test.ts`
- [ ] The existing no-tool test stays green UNEDITED: **receives collected response text and usage**
      `src/orchestration/chatOrchestrator.test.ts`

The assertions use `toMatchObject`/`objectContaining` on the usage argument, so either shape the ticket weighs passes — a summed `usage` alone, or the sum in that argument plus a per-round breakdown beside it. The decision, and why the other shape was rejected, belongs on the issue.

## Facets

- [x] Accumulate usage across rounds in `processMessageStream` instead of `lastUsage = outcome.usage ?? lastUsage`, leaving it `undefined` when no round reports
- [x] Make the `afterModelResponse` signature say it is a turn total (name/type/doc comment in `OrchestratorHooks`; regenerate the CLAUDE.md block if it is generated from the declaration)
- [x] CHANGELOG entry stating that an existing consumer now records larger usage for tool turns (MINOR bump)
- [x] Spec `specs/hal-engine-config-hooks/spec.md` already carries the new statements, linked to these tests; re-anchor if the test file moves

## Out of scope

- The audit entry or billing record itself
- Token accounting for anything other than the orchestrator's provider calls
- The `stop` chunk's own `usage` shape
- The `onError` `instanceof Error` gate recorded under Measured semantics