# Definition of Done

> so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — The seam exists: `createChatOrchestrator` takes a scripted `AIProvider` and an `afterModelResponse` hook, and the turn's usage reaches the hook as the `lastUsage` local. Both tests call `processMessage` through the real entry point and fail on the value the hook receives.

## Done when these pass

- [ ] **reports the sum of every provider call in a turn that ran two tool rounds** — a turn with two tool rounds and a final answer, each reporting known different token counts, hands `afterModelResponse` the sum of all three
      `src/orchestration/chatOrchestrator.turnUsage.acceptance.test.ts`
- [ ] **keeps the usage of an earlier round when a round in between reports none** — a silent tool round between two reporting rounds neither drops the earlier usage nor makes the total `undefined` or `NaN`
      `src/orchestration/chatOrchestrator.turnUsage.acceptance.test.ts`

Existing tests that must stay green (no edits to them):

- **receives collected response text and usage** — a turn with no tool calls still reports exactly the usage it reports today
  `src/orchestration/chatOrchestrator.test.ts`
- **keeps the usage an earlier round reported when a later round reports none** — still holds under summing, since the only reporting round is the one counted
  `src/orchestration/chatOrchestrator.test.ts`
- **joins the text of every round, not only the last** — the tool loop still runs both rounds
  `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [x] Sum the usage of every provider call in the turn and pass that single total as the `afterModelResponse` usage argument
- [ ] Rename the argument's type or parameter so a reader can tell it is a turn total, not one provider call (the type change is not runtime-testable; review judges it)
- [x] Skip rounds that report no usage in the sum, so a silent round neither resets nor poisons the total
- [x] Keep `usage` `undefined` when no round reported at all; pinned by `reports nothing when no round in the turn reports usage` in the acceptance test
- [x] Replace the under-counting sentence in `specs/hal-engine-config-hooks/spec.md` with the new behaviour
- [x] Add a CHANGELOG entry stating the number an existing consumer will now record for tool-heavy turns, with a MINOR bump
- [ ] Record why the per-round breakdown shape was rejected (wider surface, consumers keep one argument) in the issue

## Out of scope

- The audit entry or billing record itself; that is a consumer's concern
- Token accounting for anything other than the provider calls the orchestrator makes
- The `stop` chunk's own `usage` shape; providers already populate it, and this ticket only aggregates it
- Passing the per-round breakdown alongside the total (the rejected second shape)