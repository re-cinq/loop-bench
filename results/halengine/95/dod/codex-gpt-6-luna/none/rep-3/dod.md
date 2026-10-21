# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` is the real entry point and exposes provider rejections and the `onError` hook without doubles.

## Done when these pass

- [ ] **Non-Error provider rejections call onError and preserve the caller rejection** — string, plain object, and `undefined` each reach the hook once as an `Error` caused by the original, while the caller receives the original value unchanged.
      `src/orchestration/nonErrorRejection.acceptance.test.ts`

## Facets

- [ ] Pin the string, plain-object, and `undefined` rejection cases through the orchestrator entry point.
- [ ] Record the new rejection guarantee in the config-hooks spec.

## Out of scope

- Already-`Error` rejection identity, which existing tests cover.
- `beforeSession` escaping the `try` and usage accounting across tool rounds.
- Changelog, build, typecheck, lint, and formatter requirements from the implementation ticket; this round defines executable behavior only.