# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — The `ChatOrchestrator` exposes hooks through its options, and `processMessageStream` is the entry point that manages the hook lifecycle. Acceptance tests can exercise this by passing throwing hooks to the orchestrator.

## Done when these pass

- [ ] **runs onError and afterSession when beforeSession throws** — When `beforeSession` throws, `onError` and `afterSession` both fire, and the rejection propagates.
  `src/orchestration/beforeSession-error.acceptance.test.ts`
- [ ] **runs afterSession when beforeSession succeeds** — When `beforeSession` succeeds, `afterSession` still fires at the end of the session.
  `src/orchestration/beforeSession-error.acceptance.test.ts`
- [x] **existing hook tests pass** — Ensure no regression in existing hook behavior.
  `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [ ] Move `beforeSession` call inside the `try` block in `src/orchestration/chatOrchestrator.ts`.
- [ ] Update `specs/hal-engine-config-hooks/spec.md` with the new guarantee (done in DoD phase).
- [ ] Update `CHANGELOG.md` (done in DoD phase).

## Out of scope

- `instanceof Error` gate on `onError`.
- Usage accounting across tool rounds (HALEngine#93).