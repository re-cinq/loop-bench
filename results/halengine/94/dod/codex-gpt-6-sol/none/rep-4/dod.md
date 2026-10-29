# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` already accepts lifecycle hooks through its options. A throwing `beforeSession` can be exercised through that entry point with a real session and provider.

## Done when these pass

- [ ] **rejects with the original error after onError and afterSession run for the same unstarted session** — preserves the caller's rejection, passes the original error and session to `onError`, then runs `afterSession` before any later turn hook.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` into the existing `try` so its failure reaches `onError` and `afterSession`.
- [ ] Keep the original rejection and current successful-session behavior; leave existing tests unedited.
- [x] Document that `afterSession` also runs after partial `beforeSession` execution and must inspect its own allocation state.
- [ ] Replace the recorded flaw in the spec and add a consumer-facing CHANGELOG entry.
- [ ] Pass the repository CI build, tests, typecheck, lint, and format gates.

## Out of scope

- Non-`Error` rejections and the `onError` `instanceof Error` gate.
- Usage accounting across tool rounds.