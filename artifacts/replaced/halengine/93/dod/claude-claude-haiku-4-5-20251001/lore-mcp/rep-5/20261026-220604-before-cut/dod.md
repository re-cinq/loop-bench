# Definition of Done

> `afterModelResponse` hook is passed the `lastUsage` local — the most recent round's usage, not a sum across tool rounds, so a deployer using the hook for billing or audit under-counts every turn that ran tools.

**Strategy: `direct`** — The `lastUsage` local in `src/orchestration/chatOrchestrator.ts` is the seam where usage is accumulated across rounds before passing to the hook. The acceptance tests call the real orchestrator entry point and fail on the current behaviour.

## Done when these pass

- [x] **Accumulated usage across tool rounds** — A turn with two tool rounds reports usage covering every provider call, with accumulated token counts
      `src/orchestration/chatOrchestrator.acceptance.test.ts#L45`

- [x] **Single round unchanged** — A turn with no tool calls reports exactly what it reports today
      `src/orchestration/chatOrchestrator.acceptance.test.ts#L55`

- [x] **Handles partial usage** — When some rounds report no usage, the accumulated total includes the rounds that did report
      `src/orchestration/chatOrchestrator.acceptance.test.ts#L79`

## Facets

- [x] Modify orchestrator to accumulate `usage` across all rounds before passing to `afterModelResponse` hook
- [x] Update type signature of `afterModelResponse` hook parameter to make it unambiguous whether a sum or breakdown is being passed
- [x] Update `specs/hal-engine-config-hooks/spec.md` to document the new accumulated usage behaviour
- [x] Update CHANGELOG with migration note for deployers using the hook for billing/audit

## Out of scope

- Audit entry or billing record implementation (consumer's concern)
- Token accounting for anything other than provider calls
- The `stop` chunk's own `usage` shape (providers already populate this)