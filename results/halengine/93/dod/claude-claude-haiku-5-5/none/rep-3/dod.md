# Definition of Done

> what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — The seam exists: `createChatOrchestrator` takes the provider as a parameter, so a scripted provider can drive two tool rounds through the real `processMessage` entry point, and the `afterModelResponse` hook already receives the usage argument. The defect is in what that argument carries, not in how a test reaches it.

## Done when these pass

- [ ] **reports the summed usage of every provider call in a turn that ran two tool rounds** — three scripted provider calls report 10/20/30 input tokens; the hook must receive the sum, 60 input, 21 output, 81 total. Fails today with the final call alone (30 / 9 / 39).
      `src/orchestration/usageAcrossRounds.acceptance.test.ts`
- [ ] **still counts the rounds that reported when a middle round reports no usage** — the middle provider call reports nothing; the hook must receive the sum of the two calls that did report, 40 / 14 / 54, not `undefined`, `NaN`, or the final call alone. Fails today with the final call alone (30 / 9 / 39).
      `src/orchestration/usageAcrossRounds.acceptance.test.ts`

Existing tests that must stay green and must not be edited (they pin the no-tool path and the single-round path):

- **receives collected response text and usage** — a single-round turn still hands the hook exactly its one provider call's usage.
  `src/orchestration/chatOrchestrator.test.ts`
- **keeps the usage an earlier round reported when a later round reports none** — the earlier round's usage survives a later round with no usage.
  `src/orchestration/chatOrchestrator.test.ts`
- **hands afterModelResponse text ending in the sentence, and the usage of a run without the hook** — the budget path's usage is unchanged by the hook's presence.
  `src/orchestration/toolBudget.test.ts`

## Facets

- [ ] Shape decision: pass one summed `UsageMetadata` as the `usage` argument (the ticket's first option). The per-round breakdown is rejected for now: it doubles the hook surface for a consumer that has not asked for it, and a deployer who needs provider-call granularity can still count rounds in their own hooks.
- [ ] `chatOrchestrator.ts`: replace `lastUsage = outcome.usage ?? lastUsage` with an accumulator that adds each reporting round's usage to a running total, and leaves the total `undefined` when no round reported.
- [ ] No-tool path: a turn with one provider call reports that call's usage object unchanged (existing test above keeps it honest).
- [ ] `ChatOrchestratorOptions.hooks` / `OrchestratorHooks.afterModelResponse` in `chatOrchestrator.ts`: the one-line doc comment states that `usage` is summed across every provider call in the turn, so the type reads unambiguously at the declaration.
- [ ] `specs/hal-engine-config-hooks/spec.md` line 28: replace the under-counting statement with the summed behaviour and link it to the first acceptance test. Do not edit the `| Status |` row here (see the rules in the ticket).
- [ ] `CHANGELOG.md`: a MINOR-bump entry stating that existing `afterModelResponse` consumers will record larger usage numbers for turns that ran tools, and that single-round turns are unchanged.
- [ ] No `any` in the public API; `npm run build`, `npm run typecheck`, `npm run eslint` and `npm run prettier:check` pass in CI.

## Out of scope

- The audit entry or billing record itself; that is the consumer's concern.
- Token accounting for anything other than the provider calls the orchestrator makes.
- The `stop` chunk's own `usage` shape; providers already populate it and this ticket only aggregates it.
- The per-round breakdown shape. It was weighed and rejected above, so no test pins it.
- A turn where no round reports usage must still report `undefined`. This is a guard that passes today and is not an acceptance test here; the implementation must keep it.
- No spec parenthetical was added to `specs/hal-engine-config-hooks/spec.md`: the statement this test validates is the replacement the facet above writes, and the current line 28 describes the behaviour being removed.