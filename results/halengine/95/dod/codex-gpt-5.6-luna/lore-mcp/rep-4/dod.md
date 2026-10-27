# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage(...)` is the real entry point and accepts a provider whose stream can reject with any JavaScript value.

## Done when these pass

- [ ] **calls onError with a caused Error while preserving the original caller rejection** — string, plain-object, and `undefined` provider rejections invoke `onError` once with an `Error` whose `cause` is the original value, while the caller receives that value unchanged.
      `src/orchestration/onErrorNonErrorRejection.acceptance.test.ts`

## Facets

- [ ] Make every rejection reach `onError`, wrapping only values that are not already `Error` instances and retaining their original `cause`.
- [ ] Preserve the original rejection at the caller boundary and preserve existing same-instance handling for `Error` rejections.
- [ ] Replace the spec's recorded-flaw text with the guarantee and document the consumer-visible change in `CHANGELOG.md`.

## Out of scope

- `beforeSession` escaping the `try` and usage accounting across tool rounds remain separate issues.