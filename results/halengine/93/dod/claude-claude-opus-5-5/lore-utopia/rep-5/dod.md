# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere. A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage` with an installed `afterModelResponse` hook is the seam: a scripted provider whose rounds report known, different usage drives the real round loop, and the hook's `usage` argument is observed with no doubles.

## Done when these pass

- [ ] **reports the sum of every provider call in a turn that ran two tool rounds** — three provider calls (two tool rounds, then the answer) reporting 110/220/440 total tokens make the hook receive the field-by-field sum, not the last round's 440
  `src/orchestration/turnUsage.acceptance.test.ts`
- [ ] **counts the rounds that reported usage and reports nothing when no round did** — a round reporting no usage is skipped without making the sum `undefined`/`NaN`, and a turn where no round reported passes `undefined`
  `src/orchestration/turnUsage.acceptance.test.ts`

The no-tool path is pinned by the EXISTING `afterModelResponse › receives collected response text and usage` in `src/orchestration/chatOrchestrator.test.ts`, which must stay green and unedited: the hook's third argument stays a `UsageMetadata` equal to the single round's usage. A per-round breakdown, if chosen, therefore goes in an additional argument, not in place of the third.

## Facets

- [ ] Replace the `lastUsage` local in `src/orchestration/chatOrchestrator.ts` with a running sum across rounds (undefined until a round reports); first acceptance test goes green
- [ ] Skip rounds with no usage in the sum; second acceptance test goes green, existing `chatOrchestrator.test.ts` usage tests stay green unedited
- [ ] Make the hook's type say it is a sum (e.g. a named `TurnUsage`/doc comment on `afterModelResponse`, no `any`), and record in the issue/PR why the other shape was rejected
- [ ] Regenerate the `OrchestratorHooks` block in CLAUDE.md/docs if the declaration changes
- [ ] CHANGELOG `[Unreleased]` `### Changed` entry stating that `afterModelResponse` now reports a larger number for tool-using turns (MINOR bump)
- [ ] Spec already updated in this branch: `specs/hal-engine-config-hooks/spec.md` replaces the under-counting line with the two cited statements

## Out of scope

- The audit entry or billing record a consumer builds from the hook
- Token accounting for anything other than the orchestrator's provider calls (e.g. `generateStructured`)
- The shape of the `stop` chunk's own `usage`, which providers already populate
- The `onError` `instanceof Error` gate still recorded under "Measured semantics" in the spec