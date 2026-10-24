# Definition of Done

> what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `processMessage` is already the real entry point, and `afterModelResponse` already receives the turn's usage through it. The seam exists; only the value it carries is wrong.

## Done when these pass

- [ ] **reports the sum of every provider call in a turn that ran two tool rounds, skipping a round that reported none** — the hook gets one `usage` whose counts are the sum of all three provider calls (two tool rounds and the final answer), the silent round adds nothing, and nothing is `NaN`
  `src/orchestration/usageAcrossRounds.acceptance.test.ts`
- [ ] **receives collected response text and usage** — the no-tool turn still reports exactly its own usage object; existing test, must stay green and unedited
  `src/orchestration/chatOrchestrator.test.ts`
- [ ] **keeps the usage an earlier round reported when a later round reports none** — a single reporting round still sums to itself; existing test, must stay green and unedited
  `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [x] Accumulate `usage` across every provider call in `processMessageStream`, keeping one `usage` argument. Sum chosen over pass-both (total plus per-round breakdown): the ticket states no need for per-round data, and the wider surface is not justified by it
- [x] Skip rounds that report no usage when summing; a turn where nothing reported still passes `undefined`
- [x] Make the signature say it is a turn total, e.g. a named type or a doc line on `OrchestratorHooks.afterModelResponse`, so a reader does not have to open the orchestrator
- [x] Replace the under-counting statement in `specs/hal-engine-config-hooks/spec.md` with the summed behaviour, and cite the acceptance test on the replacement statement
- [x] CHANGELOG entry under a MINOR bump stating that existing `afterModelResponse` consumers will record larger numbers for turns that ran tools

## Out of scope

- The audit entry or billing record itself; that is the consumer's concern
- Token accounting for anything other than the provider calls the orchestrator makes
- The `stop` chunk's own `usage` shape; this ticket only aggregates it
- The `onError` gate on `instanceof Error` recorded in the same spec; a separate item