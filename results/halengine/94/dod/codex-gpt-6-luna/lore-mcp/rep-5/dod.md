# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` is the real entry point and accepts lifecycle hooks directly, so the failure can be exercised without doubles.

## Done when these pass

- [ ] **Runs onError and afterSession while preserving the rejection** — a thrown `beforeSession` error reaches the caller unchanged, is passed with its session to `onError`, and triggers `afterSession` after only the failed setup hook.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Pin the failed `beforeSession` lifecycle through the orchestrator entry point.
- [ ] Record that `afterSession` may run after setup failed and must tolerate partial initialization.

## Out of scope

- Handling non-`Error` rejections in `onError`.
- Usage accounting across tool rounds.