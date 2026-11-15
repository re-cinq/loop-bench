# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage` with a provider that rejects with an arbitrary value is the real entry point and already reaches the `catch`; no double is needed.

## Done when these pass

- [ ] **calls onError once with an Error whose cause is %s, and the caller still receives the original rejection** (string, plain object, `undefined`) — `onError` fires exactly once with an `Error` whose `cause` is the original value, and `processMessage` still rejects with that original value by identity
      `src/orchestration/onErrorNonError.acceptance.test.ts`
- [ ] The existing `src/orchestration/chatOrchestrator.test.ts` stays green and unedited (an `Error` rejection reaches `onError` as itself)

## Facets

- [ ] Replace the `instanceof Error` gate in `src/orchestration/chatOrchestrator.ts` with: pass an `Error` through as-is, wrap anything else as `new Error(..., {cause: error})`; re-throw the original value
- [ ] Add a CHANGELOG `### Fixed` entry saying `onError` now fires for non-`Error` rejections and what a consumer's hook will see (`error.cause`)
- [x] `specs/hal-engine-config-hooks/spec.md`: recorded-flaw section replaced by the "Error reporting" guarantee, linked to the acceptance test

## Out of scope

- `beforeSession` escaping the `try` (its own issue)
- Usage accounting across tool rounds (HALEngine#93)
- Changing the value re-thrown to the caller