# Definition of Done

> what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — The seam exists: `createChatOrchestrator` takes a provider, a prompt builder, a tool registry and hooks, so a scripted provider with two tool rounds drives the real `afterModelResponse` call site. The tests fail because `chatOrchestrator.ts` keeps only the `lastUsage` local.

## Done when these pass

- [ ] **reports the sum of the usage of every provider call across two tool rounds** — a turn with two tool rounds and a final answer, each provider call reporting different known counts, hands `afterModelResponse` the total of all three
  `src/orchestration/afterModelResponseUsage.acceptance.test.ts`
- [ ] **adds up the rounds that reported and leaves out a round that reported none** — when the middle round reports no usage, the total is the sum of the two rounds that did report, not a number from one of them and not `NaN`
  `src/orchestration/afterModelResponseUsage.acceptance.test.ts`

Existing tests that must stay green (the no-tool path must not move):

- `src/orchestration/chatOrchestrator.test.ts` — `receives collected response text and usage` and `keeps the usage an earlier round reported when a later round reports none`, unedited
- `src/orchestration/toolBudget.test.ts` — `hands afterModelResponse text ending in the sentence, and the usage of a run without the hook`

## Facets

- [ ] Choose the shape: one summed `usage` argument, or summed total plus a per-round breakdown. Record the choice and why the other was rejected in the issue or spec.
- [ ] Sum `usage` across rounds in `src/orchestration/chatOrchestrator.ts` so both new tests pass, with a turn that ran no tools reporting exactly what it reports today.
- [ ] A turn where no round reported still reports `undefined`, not `0` or `NaN`. This already holds today and has no red test; keep it true when summing.
- [ ] Make the signature say the answer in `src/types/ai.ts` / `OrchestratorHooks.afterModelResponse`, so a reader need not open the orchestrator to learn it is a sum. Type-level only: no runtime test.
- [ ] Replace the under-counting bullet in `specs/hal-engine-config-hooks/spec.md` with the new behaviour and keep its trailing `validated by` link on the test above.
- [ ] CHANGELOG entry under Unreleased stating that `afterModelResponse` now receives the turn's total, so existing consumers record larger numbers for tool-heavy turns; MINOR bump per the ticket.

## Out of scope

- The audit entry or billing record itself; that is a consumer's concern.
- Token accounting for anything other than the provider calls the orchestrator makes.
- The `stop` chunk's own `usage` shape; providers already populate it, and this ticket only aggregates it.
- The `onError` gate on `error instanceof Error` (`specs/hal-engine-config-hooks/spec.md`, measured semantics); a separate change.