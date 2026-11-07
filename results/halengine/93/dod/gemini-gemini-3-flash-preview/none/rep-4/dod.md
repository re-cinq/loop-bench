# Definition of Done

> afterModelResponse is called once per user message after the round loop exits, and is passed the lastUsage local — the most recent round's usage, not a sum across tool rounds, so a deployer using the hook for billing or audit under-counts every turn that ran tools.

**Strategy: `direct`** — A seam exists in `afterModelResponse` hook which can be used to observe the usage reported by the orchestrator. I can use a scripted provider to return known usage across multiple rounds and assert on the summed total in the hook.

## Done when these pass

- [ ] **reports summed usage across multiple tool rounds** — A turn driven through two tool rounds reports usage covering every provider call in that turn, asserted against a scripted provider whose rounds report known, different token counts.
  `src/orchestration/usage-accumulation.acceptance.test.ts`
- [ ] **reports correct usage for single round turn** — A turn with no tool calls reports exactly what it reports today, pinned by the existing test remaining unedited.
  `src/orchestration/usage-accumulation.acceptance.test.ts`
- [ ] **ignores rounds with no usage without zeroing total** — A provider that reports no usage on some rounds does not make the total `undefined` or `NaN`: the rounds that reported are still counted, and a turn where nothing reported still reports nothing.
  `src/orchestration/usage-accumulation.acceptance.test.ts`
- [ ] **unambiguous usage type** — The type of what the hook receives makes the answer unambiguous, so a reader does not have to open the orchestrator to learn whether it is a sum.
  `src/orchestration/usage-accumulation.acceptance.test.ts`

## Facets

- [ ] Define `UsageMetadata` summation logic or update its type if needed.
- [ ] Update `chatOrchestrator.ts` to accumulate usage across rounds.
- [ ] Update `OrchestratorHooks` type for `afterModelResponse` to reflect accumulated usage.
- [ ] Update `specs/hal-engine-config-hooks/spec.md` and `CHANGELOG.md`.

## Out of scope

- Token accounting for anything other than the provider calls.
- The `stop` chunk's own `usage` shape.