# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage()` is the real lifecycle entry point. A concrete configured provider lets the test reach the failing hook without a test double; the provider is never called after the failure.

## Done when these pass

- [ ] **rejects unchanged while reporting and cleaning up a failed beforeSession** — a `beforeSession` error reaches the caller unchanged, then invokes `onError` with the same session and error and `afterSession` with the session, without later lifecycle work.
      `src/orchestration/beforeSessionFailure.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` inside the lifecycle `try` so its failure reaches the existing catch/finally path.
- [ ] Preserve the failed hook's error and invoke `onError` before `afterSession`.
- [ ] Document that `afterSession` can run before any post-`beforeSession` lifecycle phase or provider work.
- [ ] Add the consumer-facing CHANGELOG note required by the ticket.

## Out of scope

- Non-`Error` rejections bypassing `onError`.
- Usage accounting across tool rounds.