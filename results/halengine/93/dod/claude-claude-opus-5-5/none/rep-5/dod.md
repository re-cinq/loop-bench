# Definition of Done

> A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it.

**Strategy: `direct`** — `createChatOrchestrator` with a scripted `AIProvider` and a real `ToolRegistry` already drives a multi-round turn into `afterModelResponse`; the tests observe the `usage` argument that hook receives. Shape chosen: the third argument stays a `UsageMetadata` and becomes the turn's sum, because the existing no-tool test (`chatOrchestrator.test.ts` › "receives collected response text and usage") must stay unedited and asserts that argument `toEqual` the single round's `UsageMetadata`. A per-round breakdown, if wanted, can only be added as an additional argument.

## Done when these pass

- [ ] **reports the sum of every provider call in a turn that ran two tool rounds** — three provider calls with distinct token counts; the hook receives their field-wise sum, not the last call's
      `src/orchestration/turnUsage.acceptance.test.ts`
- [ ] **counts the rounds that reported usage when others report none, and reports nothing when none did** — a silent round neither drops the others nor yields `undefined`/`NaN`; an all-silent turn still reports `undefined`
      `src/orchestration/turnUsage.acceptance.test.ts`
- [ ] **receives collected response text and usage** (existing, must stay green and UNEDITED) — a no-tool turn reports exactly what it reports today
      `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [ ] Accumulate usage across rounds in `processMessageStream` (replace `lastUsage = outcome.usage ?? lastUsage` with a field-wise sum that stays `undefined` until a round reports)
- [ ] Make the hook's type say it is a sum: rename the parameter (e.g. `turnUsage`) and add a one-line doc comment on `afterModelResponse` in `OrchestratorHooks`; regenerate the CLAUDE.md hooks block if it is generated from the declaration
- [ ] Remove the under-counting bullet under "Measured semantics — out of scope" in `specs/hal-engine-config-hooks/spec.md` (the new "Usage reported to afterModelResponse" section replaces it), and fix the section's "two properties" count
- [ ] CHANGELOG entry stating that existing consumers now record larger usage for tool-calling turns (MINOR bump), and record in the issue why the per-round breakdown shape was rejected

## Out of scope

- The audit entry or billing record itself
- Token accounting for anything other than the orchestrator's provider calls (e.g. `generateStructured`)
- The `stop` chunk's own `usage` shape