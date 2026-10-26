# Definition of Done

> what the hook receives is the usage of the final provider call alone. For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — The seam exists: `createChatOrchestrator` takes the `afterModelResponse` hook and a scripted `AIProvider` can report known usage per round, so the acceptance tests call `processMessage` and read the hook's `usage` argument. Decision recorded here: the hook keeps one `usage` argument and receives the sum over every provider call in the turn (the ticket's first option), not a per-round breakdown.

## Done when these pass

- [ ] **hands the hook the usage summed over every provider call in a turn that ran two tool rounds** — three scripted provider calls report 100/300/500 input tokens; the hook must receive the summed total, not the last call's usage
      `src/orchestration/usageAcrossRounds.acceptance.test.ts`
- [ ] **counts the rounds that reported when a middle round reports none, and reports nothing when no round did** — a round with no usage neither zeroes nor NaNs the total, and a turn where nothing reported still hands the hook `undefined`
      `src/orchestration/usageAcrossRounds.acceptance.test.ts`

## Facets

- [ ] Keep green and unedited: "receives collected response text and usage" (no-tool turn reports what it reports today) and "keeps the usage an earlier round reported when a later round reports none", both in `src/orchestration/chatOrchestrator.test.ts`
- [ ] Accumulate `usage` across provider calls in `processMessageStream` in `src/orchestration/chatOrchestrator.ts`, replacing the `lastUsage = outcome.usage ?? lastUsage` assignment; stays `undefined` when no round reported
- [ ] Make the hook's usage type say it is a turn total (a named type or a doc on `afterModelResponse`'s parameter in `src/orchestration/chatOrchestrator.ts`), so a reader does not have to open the orchestrator
- [ ] Replace the under-counting line in `specs/hal-engine-config-hooks/spec.md` with the new behaviour
- [ ] CHANGELOG entry stating that existing `afterModelResponse` consumers now record the summed usage for tool-using turns, with a MINOR bump
- [ ] CI green: build, test, typecheck, eslint (`--max-warnings 0`), prettier:check

## Out of scope

- The audit entry or billing record itself; that is a consumer's concern
- Token accounting for anything other than the provider calls the orchestrator makes
- The `stop` chunk's own `usage` shape; providers already populate it and this ticket only aggregates it
- The `onError` gate on `error instanceof Error` in `specs/hal-engine-config-hooks/spec.md` — a separate measured-semantics line, not this ticket's claim