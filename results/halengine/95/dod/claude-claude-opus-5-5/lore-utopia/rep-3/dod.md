# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` takes the provider and the `onError` hook directly, so a provider that rejects with a non-`Error` value drives the real `catch` and the test observes the hook and the caller's rejection with no doubles.

## Done when these pass

- [ ] **calls onError once with an Error whose cause is %s, and still rejects with the original value** — for a string, a plain object and `undefined`: `onError` fires once with an `Error` whose `cause` is the raw value, and `processMessage` still rejects with that exact value
      `src/orchestration/onErrorNonError.acceptance.test.ts`
- [ ] **Existing `onError` tests in `src/orchestration/chatOrchestrator.test.ts`, unedited** — a rejection that already is an `Error` reaches `onError` as the same instance, not a wrapper
      `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [ ] In the `catch` of `processMessageStream`, call `onError` for every rejection, wrapping a non-`Error` in `new Error(..., {cause: error})`; keep `throw error` re-throwing the original
- [ ] Delete the "Measured semantics — out of scope" section of `specs/hal-engine-config-hooks/spec.md` (the new guarantee is already stated under "onError for every rejection")
- [ ] CHANGELOG entry: `onError` now fires for non-`Error` rejections, receiving a wrapper whose `cause` is the raw value; the caller's rejection is unchanged

## Out of scope

- `beforeSession` escaping the `try` (its own issue)
- Usage accounting across tool rounds (HALEngine#93)