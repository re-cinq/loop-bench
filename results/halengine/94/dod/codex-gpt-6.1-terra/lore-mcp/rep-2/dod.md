# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator` exposes the lifecycle hooks and processes a real session through its public entry point.

## Done when these pass

- [ ] **reports the error and runs cleanup before rejecting when beforeSession throws** — The original error reaches the caller, `onError` receives the session and error, and `afterSession` receives the session after it, before any input processing.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` into the existing error and cleanup boundary while preserving the rejection and existing successful lifecycle.
- [ ] Document that cleanup may run after incomplete initialization and before input or model processing, and describe the consumer-facing change in the CHANGELOG.
- [ ] Keep the existing non-throwing lifecycle tests passing and complete the ticket's CI checks.

## Out of scope

- Non-`Error` throws and usage accounting across tool rounds.