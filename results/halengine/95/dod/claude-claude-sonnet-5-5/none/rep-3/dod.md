# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessageStream` is the real entry point; a provider that throws a non-Error exercises the `catch` today.

## Done when these pass

- [ ] **onError receives every rejection** — a string, plain object and `undefined` rejection each call `onError` once with an `Error` whose `cause` is the original, and the caller still gets the original value.
  `src/orchestration/onErrorRejections.acceptance.test.ts`
- [ ] Existing `chatOrchestrator.test.ts` stays unedited and green (an `Error` reaches `onError` as itself).

## Facets

- [ ] Wrap non-Error rejections with `new Error(..., {cause})` in the `catch`, call `onError`, rethrow the original.
- [ ] Replace the recorded-flaw line in `specs/hal-engine-config-hooks/spec.md` with the guarantee; add a CHANGELOG entry.

## Out of scope

- `beforeSession` escaping the `try`; usage accounting across tool rounds (HALEngine#93).