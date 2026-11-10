# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — The orchestrator lifecycle hook seam already exists on `createChatOrchestrator`. Calling `processMessage` with a throwing `beforeSession` hook observes whether `onError` and `afterSession` fire before the error reaches the caller.

## Done when these pass

- [ ] **runs onError then afterSession when beforeSession throws, and still rejects to the caller** — When `beforeSession` throws, `onError` receives the error and session, `afterSession` receives the session, and the caller receives the original rejection.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` invocation inside the `try` block in `src/orchestration/chatOrchestrator.ts`
- [ ] Keep existing tests in `src/orchestration/chatOrchestrator.test.ts` and `src/config.test.ts` green unedited
- [ ] Document in `CHANGELOG.md` that `onError` and `afterSession` now run when `beforeSession` throws

## Out of scope

- The `instanceof Error` gate on `onError` (owned by its own issue)
- Usage accounting across tool rounds (HALEngine#93)