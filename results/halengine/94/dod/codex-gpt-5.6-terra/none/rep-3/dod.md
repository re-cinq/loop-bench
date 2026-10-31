# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage()` is the real lifecycle entry point and accepts installed hooks. The acceptance test drives a throwing `beforeSession` through that seam and observes the caller rejection and lifecycle callbacks.

## Done when these pass

- [ ] **reports and cleans up a beforeSession failure before rejecting the same error** — a throwing `beforeSession` keeps its original rejection while `onError` receives that session and error and `afterSession` follows it; no later lifecycle hook ran.
      `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` into the existing `try` so its failures use the current `catch` and `finally` paths.
- [ ] Replace the recorded-flaw statement in the hooks spec with the resulting guarantee and state that `afterSession` follows a turn that stopped before any later lifecycle or model work.
- [ ] Add an Unreleased CHANGELOG entry explaining that cleanup hooks now run after a failed `beforeSession`.

## Out of scope

- The `instanceof Error` gate on `onError`.
- Usage accounting across tool rounds (HALEngine#93).