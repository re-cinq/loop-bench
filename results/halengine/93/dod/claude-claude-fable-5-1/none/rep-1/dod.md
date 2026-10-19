# Definition of Done

> `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone. [...] For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — The seam exists today: `createChatOrchestrator` takes any `AIProvider`, a scripted provider can report a different `usage` on each round's `stop` chunk, and `hooks.afterModelResponse` receives the third argument. The acceptance tests drive the real tool loop and read what the hook is handed.

Decision recorded for the issue: accumulate across rounds and keep the single `usage` argument (the ticket's first shape). The second shape, passing a per-round breakdown as well, was rejected because the ticket itself requires the no-tool path to report exactly what it reports today, pinned by the existing `receives collected response text and usage` test which uses `toEqual` on the bare `UsageMetadata`; extending that object breaks the pin, and a fourth argument widens the public surface for a consumer nobody has named. The acceptance tests assert with `toMatchObject` on the summed fields, so a round that nevertheless adds a breakdown beside the sum (an extra field, or a fourth argument) still passes them.

Spec anchors: this repo exposes no `spec` descriptor field through `.lore/test-commands.yml` (the list command emits id, name and file only), so traceability is carried by the `([validated by: ...])` citations added to `specs/hal-engine-config-hooks/spec.md` under "Usage reported to afterModelResponse".

## Done when these pass

- [ ] **reports 33 input, 13 output and 46 total tokens when three provider calls report 10/5/15, 20/7/27 and 3/1/4** — a turn of two tool rounds (three provider calls) hands `afterModelResponse` the field-by-field sum of every call, not the last call's `3/1/4`
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **reports 15/5/20 when the middle of three calls reports no usage, and nothing when no call reports any** — a call with no `usage` on its stop chunk contributes nothing (no `undefined`, no `NaN`), and a turn where no call reported stays `undefined` rather than becoming zeros
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [x] **receives collected response text and usage** (existing, must stay green and unedited) — a turn with no tool calls reports exactly the one call's usage
  `src/orchestration/chatOrchestrator.test.ts`
- [x] **keeps the usage an earlier round reported when a later round reports none** (existing, must stay green and unedited) — under a sum, a silent later round leaves the earlier round's figures intact
  `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [x] Replace the `lastUsage = outcome.usage ?? lastUsage` assignment with a pure `addUsage(total, roundUsage)` that sums `inputTokens`, `outputTokens` and `totalTokens` and returns the other operand when one is `undefined`; first acceptance test green
- [ ] Confirm the second acceptance test is green under that function (a silent round is the `undefined` operand; a turn with no reporting round stays `undefined`)
- [ ] Make the type say it is a sum: rename the hook's parameter or alias the type (for example `usage?: TurnUsage` where `type TurnUsage = UsageMetadata`, documented as the turn's total across every provider call) without changing the runtime shape, so the existing no-tool test stays unedited and green
- [x] Replace the under-counting bullet in `specs/hal-engine-config-hooks/spec.md` "Measured semantics — out of scope" with a pointer to the new "Usage reported to afterModelResponse" section; re-run `npm run spec:names:fix` if test lines moved
- [x] CHANGELOG `Unreleased` / `Changed`: state that `afterModelResponse` now receives the turn's summed usage, that an existing consumer records a larger number for tool-heavy turns, and that a no-tool turn is unchanged; MINOR bump per the ticket
- [ ] Update the `OrchestratorHooks` block in `CLAUDE.md` and `README.md` if the parameter type or name changed (the block is generated from the declaration)

## Out of scope

- The audit entry or billing record itself; that is the consumer's concern
- Token accounting for anything other than the provider calls the orchestrator makes (`generateStructured`, tools, prompt building)
- The `stop` chunk's own `usage` shape, which providers already populate
- Per-round usage granularity as a new public surface (rejected above; a round may add it beside the sum without breaking these tests, but nothing requires it)