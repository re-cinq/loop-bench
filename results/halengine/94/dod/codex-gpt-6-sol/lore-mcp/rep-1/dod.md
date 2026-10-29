# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` is the existing entry point and accepts real hooks. One test can observe the original rejection and the error and cleanup hooks on the failed setup path.

## Done when these pass

- [ ] **calls onError and afterSession after beforeSession throws while preserving the rejection** — the same error reaches the caller and `onError`, then `afterSession` runs with the session before any input stage.
      `src/orchestration/beforeSessionFailure.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` inside the orchestrator's `try` so its failure reaches `catch` and `finally`.
- [ ] Keep the non-throwing hook order and rejection behavior pinned by the existing orchestrator tests.
- [ ] Document in the spec that `afterSession` may run after incomplete setup, and explain the consumer impact in `CHANGELOG.md`.

## Out of scope

- Non-`Error` throws and usage accounting across tool rounds.