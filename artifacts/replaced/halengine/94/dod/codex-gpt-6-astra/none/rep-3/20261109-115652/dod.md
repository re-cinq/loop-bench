# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` exposes the failing lifecycle directly. One test installs real allocation, error-reporting and cleanup hooks; a real Bedrock provider is constructed but setup fails before any provider call.

## Done when these pass

- [ ] **reports a beforeSession failure and finishes cleanup before rejecting with the original error** — pins error and session identity, awaited error reporting followed by cleanup, release of a partial allocation, and no user-input processing after setup fails.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` into the existing protected lifecycle so error reporting and cleanup run and the original error still rejects the caller.
- [ ] Preserve existing successful-session tests unedited; retain the spec guarantee that cleanup must tolerate partial setup and track allocations itself.
- [ ] Add a consumer-facing CHANGELOG entry explaining that error and cleanup hooks now run after failed setup; run the normal CI checks in CI.

## Out of scope

- Non-Error rejection handling, errors thrown by error/cleanup hooks, and usage accounting across tool rounds (#93).
- The spec's remaining measured semantics are explicitly out of scope for #94.