# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — The orchestrator lifecycle hooks are called directly in `processMessageStream` created by `createChatOrchestrator`. A test installs a throwing `beforeSession` hook along with recording `onError` and `afterSession` hooks, drives `processMessage`, and asserts through the real entry point that `onError` and `afterSession` run.

## Done when these pass

- [ ] **runs onError then afterSession when beforeSession throws, and still rejects to the caller** — A `beforeSession` hook that throws rejects to the caller, and also invokes `onError` with the session and thrown error, followed by `afterSession`. Today, because `beforeSession` is awaited outside the `try` block, the throw escapes immediately: `onError` is never invoked and `afterSession` is skipped.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` call inside the `try` block in `src/orchestration/chatOrchestrator.ts` so throws are caught by `catch` (`onError`) and cleaned up in `finally` (`afterSession`).
- [ ] Ensure non-throwing `beforeSession` behavior is completely preserved and existing lifecycle tests remain green.
- [ ] Record in `specs/hal-engine-config-hooks/spec.md` what assumptions `afterSession` can make when `beforeSession` throws, and document the change in `CHANGELOG.md`.

## Out of scope

- The `instanceof Error` gate on `onError` (its own issue).
- Usage accounting across tool rounds (HALEngine#93).