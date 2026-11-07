# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` with a provider whose `sendMessage` throws a non-`Error` value drives the real `catch`; the test observes `onError` and the caller's rejection with no doubles.

## Done when these pass

- [ ] **onError for a rejection that is not an Error** — for a string, a plain object and `undefined`, `onError` runs once with an `Error` whose `cause` is the original value, and `processMessage` rejects with that same original value (identity, not a copy)
      `src/orchestration/onErrorNonError.acceptance.test.ts`
- [ ] **onError › called with session and error when stream fails**, **error still propagates after onError hook**, **beforeSession › runs onError then afterSession when it throws, and still rejects to the caller** — existing tests, left unedited, stay green: an `Error` rejection still reaches `onError` as itself
      `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [ ] In the `catch` of `processMessageStream`, call `onError` for every rejection: pass an `Error` through as-is, wrap anything else in `new Error(..., {cause: error})`; re-throw the original `error` unchanged
- [ ] CHANGELOG entry: `onError` now fires for non-`Error` rejections, receiving a wrapper `Error` whose `cause` is the raw value; what the caller receives does not change
- [x] `specs/hal-engine-config-hooks/spec.md`: the recorded-flaw "Measured semantics" section is replaced by the new guarantee, cited to the acceptance test (done with this DoD)

## Out of scope

- `beforeSession` escaping the `try` (its own issue)
- Usage accounting across tool rounds (HALEngine#93)
- Changing the `onError` hook signature: it stays `(session, error: Error)`