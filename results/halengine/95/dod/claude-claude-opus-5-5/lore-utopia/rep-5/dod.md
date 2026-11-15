# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage` with a provider whose stream rejects is the real entry point and already exposes the `onError` hook; the tests drive it with real values and fail on behaviour (`onError` is never called).

## Done when these pass

- [ ] **calls onError once with an Error whose cause is %s, and the caller still receives the original rejection** — for a string, a plain object and `undefined` rejection: `onError` runs exactly once with an `Error` carrying an own `cause` equal to the original value, and `processMessage` rejects with that same original value (identity, not a copy).
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Wrap a non-`Error` rejection in `new Error(..., {cause: error})` before calling `onError` in the `catch` of `src/orchestration/chatOrchestrator.ts`; keep `throw error` re-throwing the original value.
- [ ] Pass an `Error` rejection to `onError` as the same instance (existing tests in `src/orchestration/chatOrchestrator.test.ts` and `src/config.test.ts` stay unedited and green).
- [ ] CHANGELOG entry: `onError` now fires for non-`Error` rejections, receiving a wrapper whose `cause` is the raw value; the caller-visible rejection is unchanged.
- [ ] Spec `specs/hal-engine-config-hooks/spec.md`: the recorded-flaw section is already replaced by the new guarantee in this commit; re-anchor its `#L40` link if the test file moves.

## Out of scope

- `beforeSession` escaping the `try` (its own issue).
- Usage accounting across tool rounds (HALEngine#93).
- Any change to the shape of the value the caller receives.