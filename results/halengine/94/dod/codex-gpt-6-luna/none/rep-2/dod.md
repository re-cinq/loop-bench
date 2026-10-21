# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` is the real lifecycle entry point and accepts the hooks directly. The acceptance test drives a real `beforeSession` rejection through that seam and checks the caller's rejection plus both cleanup/error hooks.

## Done when these pass

- [ ] **preserves the rejection and runs onError and afterSession with the session and original error** — a `beforeSession` rejection remains the caller-visible error, reaches `onError` with the session and original error, and runs `afterSession` with that session.
      `src/orchestration/beforeSessionFailure.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` into the lifecycle `try` path so its rejection reaches `catch` and `finally`.
- [ ] State in the spec what `afterSession` can assume after `beforeSession` fails.
- [ ] Document the consumer-visible change in the changelog.

## Out of scope

- `onError` behavior for non-`Error` rejections and usage accounting across tool rounds (HALEngine#93).
- Changes to successful `beforeSession` behavior.