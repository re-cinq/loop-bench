# Definition of Done

> `afterModelResponse` is called once per user message after the round loop exits, and is passed the `lastUsage` local — the most recent round's usage, not a sum across tool rounds, so a deployer using the hook for billing or audit under-counts every turn that ran tools.

**Strategy: `direct`** — `createChatOrchestrator` is a callable seam; a scripted provider drives multi-round tool turns with known per-round usage, and the `afterModelResponse` hook is intercepted to assert what it receives. No stub or double needed.

## Done when these pass

- [ ] **two-round turn reports sum of both rounds usage to afterModelResponse** — `afterModelResponse` receives the accumulated total of all rounds' token counts, not only the last round's
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **a round with no usage does not drop reported rounds from the total** — rounds that reported usage are summed even when intermediate rounds report no usage; the total is not NaN or undefined
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [x] Replace `lastUsage = outcome.usage ?? lastUsage` in `chatOrchestrator.ts` with per-field accumulation that skips undefined rounds
- [x] Decide and implement the shape change for `afterModelResponse`'s third argument — accumulated sum keeping `UsageMetadata`, or a richer type; document the rejected option in `adrs/` or the spec — decision: keep `UsageMetadata` with summed semantics; a richer breakdown type would widen the public API surface for a consumer need no test demonstrates
- [x] Update `specs/hal-engine-config-hooks/spec.md`: replace the "Measured semantics — out of scope" note with a proper spec statement describing the new accumulation behaviour and link it to the acceptance test
- [x] Add a CHANGELOG entry (MINOR) stating that `afterModelResponse` now receives the sum of all provider calls in the turn, not the last one

## Out of scope

- Audit entry or billing record (a consumer's concern)
- Token accounting for anything beyond the orchestrator's own provider calls
- The `stop` chunk's `usage` shape, which providers already populate