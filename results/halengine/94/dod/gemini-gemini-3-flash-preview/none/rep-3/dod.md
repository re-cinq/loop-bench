# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — A seam exists in `createChatOrchestrator` where we can pass custom hooks and observe if they are called when `beforeSession` throws.

## Done when these pass

- [ ] **runs onError and afterSession when beforeSession throws** — Verifies that both hooks are called when `beforeSession` rejects, and that the original error is still propagated to the caller. [RED]
  `src/orchestration/beforeSession-failure.acceptance.test.ts`

## Facets

- [x] Create `src/orchestration/beforeSession-failure.acceptance.test.ts` with the failing test case.
- [ ] Move `beforeSession` call inside the `try` block in `src/orchestration/chatOrchestrator.ts`.
- [x] Update `specs/hal-engine-config-hooks/spec.md` to reflect the new guarantee.
- [x] Update `CHANGELOG.md` with the change.

## Out of scope

- The `instanceof Error` gate on `onError` (owned by its own issue).
- Usage accounting across tool rounds (HALEngine#93).