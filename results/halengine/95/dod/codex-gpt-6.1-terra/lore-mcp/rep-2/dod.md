# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — The orchestrator's public message entry point and lifecycle hooks expose the shared catch path directly. A real hook rejection exercises that path with each required value.

## Done when these pass

- [ ] **reports every rejection to onError while preserving the caller rejection** — Non-Error values reach the hook once as Error causes, existing Errors retain identity, and callers receive the original rejection.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Call `onError` for non-Error rejections, wrapping each with its original value as the cause while preserving Error identity and the caller rejection.
- [ ] Keep the existing Error hook tests unedited and green.
- [ ] Update the config hooks spec and CHANGELOG to describe the new consumer-visible guarantee.
- [ ] Pass the repository build, tests, typecheck, eslint and prettier checks in CI.

## Out of scope

- Usage accounting across tool rounds and unrelated lifecycle changes.