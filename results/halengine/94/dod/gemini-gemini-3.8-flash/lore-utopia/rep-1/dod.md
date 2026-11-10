# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — The `OrchestratorHooks` seam and `createChatOrchestrator` entry point exist; the acceptance test exercises `beforeSession` throwing during `processMessage` and observes the failure directly.

## Done when these pass

- [ ] **runs onError then afterSession when beforeSession throws, and still rejects to the caller** — When `beforeSession` rejects, `onError` and `afterSession` run in that order with the error and session, and the error still propagates to the caller.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` inside the `try` block in `src/orchestration/chatOrchestrator.ts` so its rejection enters the orchestrator's `catch` and `finally` handlers
- [ ] Verify that existing tests for `beforeSession` and full lifecycle order in `src/orchestration/chatOrchestrator.test.ts` and `src/config.test.ts` stay green without edits
- [ ] In `specs/hal-engine-config-hooks/spec.md`, replace the recorded-flaw bullet in `Measured semantics — out of scope` with the normative guarantee in `Installing hooks through config`
- [ ] Add a CHANGELOG entry under `Fixed` noting that `onError` and `afterSession` now run when `beforeSession` throws, along with the migration note for consumers

## Out of scope

- The `instanceof Error` gate on `onError` in `chatOrchestrator.ts` (tracked separately in issue #95)
- Usage accounting across tool rounds (HALEngine#93)