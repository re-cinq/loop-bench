# Definition of Done

> For a turn that answered directly, that is the whole turn. For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere. A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage` with an `afterModelResponse` hook is the real seam: a scripted provider whose rounds report known, different usage drives the turn, and the hook's `usage` argument is asserted. Today it receives `lastUsage` (final round only), so both tests fail on behaviour. The tests pin the summed `UsageMetadata` as the hook's third argument, which works with either shape the ticket weighs (sum only, or sum plus a per-round breakdown as an extra argument).

## Done when these pass

- [ ] **sums the usage of every provider call in a turn driven through two tool rounds** — three provider calls reporting 110, 320 and 540 total tokens reach `afterModelResponse` as their field-wise sum (900 / 70 / 970), not the last round's 500 / 40 / 540
  `src/orchestration/turnUsage.acceptance.test.ts`
- [ ] **counts the rounds that reported usage, and reports nothing when no round did** — a round with no `usage` is skipped (not `undefined`/`NaN`), and a turn where no round reported still passes `undefined`
  `src/orchestration/turnUsage.acceptance.test.ts`
- [ ] **receives collected response text and usage** (existing, must stay green and unedited) — a no-tool turn reports exactly what it does today
  `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [ ] Accumulate usage across rounds in `processMessageStream` (`src/orchestration/chatOrchestrator.ts`, the `lastUsage` local), skipping rounds without usage and leaving it `undefined` when none reported
- [ ] Make the hook's type say it is a sum: rename the parameter (e.g. `turnUsage`) and give it a one-line doc comment on `OrchestratorHooks.afterModelResponse`; optionally add a per-round breakdown argument. Regenerate the CLAUDE.md hooks block from the declaration
- [ ] Record in the issue/PR why the other shape (sum only vs sum plus breakdown) was rejected
- [ ] Replace the under-counting line under "Measured semantics" in `specs/hal-engine-config-hooks/spec.md` with the new behaviour, cited `([validated by: sums the usage of every provider call in a turn driven through two tool rounds](../../src/orchestration/turnUsage.acceptance.test.ts#L54))` and the partial-usage test (`#L60`); re-verify the `chatOrchestrator.ts#L148`/`#L150` links that the edit shifts
- [ ] CHANGELOG entry stating that existing `afterModelResponse` consumers will record larger usage for tool-calling turns (MINOR bump)
- [ ] Existing tests that may encode the old last-round value — `keeps the usage an earlier round reported when a later round reports none` (`chatOrchestrator.test.ts`) and `hands afterModelResponse text ending in the sentence, and the usage of a run without the hook` (`toolBudget.test.ts`) — should stay green under a sum; check them

## Out of scope

- The audit entry or billing record itself (a consumer's concern)
- Token accounting for anything other than the orchestrator's provider calls (e.g. `generateStructured`)
- The `stop` chunk's own `usage` shape, which providers already populate