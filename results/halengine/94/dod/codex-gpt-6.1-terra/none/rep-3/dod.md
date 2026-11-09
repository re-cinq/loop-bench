# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — The orchestrator's `processMessage` entry point accepts real lifecycle hooks and exposes the rejection to the caller.

## Done when these pass

- [ ] **reports and cleans up a failed beforeSession before rejecting the turn** — The original error reaches the caller, `onError` receives the session and error, and `afterSession` runs before input processing.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` into the existing error handling and cleanup boundary.
- [ ] Document that cleanup can run before input processing and update the changelog for consumers.
- [ ] Preserve the existing successful lifecycle behavior and existing tests.

## Out of scope

- Non-Error rejections and usage accounting across tool rounds.