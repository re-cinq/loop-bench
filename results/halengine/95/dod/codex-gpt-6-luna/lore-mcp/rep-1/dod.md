# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` is the real entry point and accepts a provider plus hooks, so the test can observe the provider rejection, `onError`, and the caller boundary without doubles.

## Done when these pass

- [ ] **Non-Error provider rejections call `onError` and preserve the caller rejection** — string, plain object, and `undefined` each reach the hook once as an `Error` caused by the original value, while the caller receives that original value.
      `src/orchestration/nonErrorRejection.acceptance.test.ts`

## Facets

- [ ] Pin the missing callback for non-`Error` provider rejection values.
- [ ] Pin wrapper cause identity and unchanged caller rejection for string, object, and `undefined`.

## Out of scope

- Already-`Error` identity, already covered by existing tests.
- `beforeSession` escaping the `try` and usage accounting across tool rounds.
- Changelog and build, typecheck, lint, and formatting outcomes; those are implementation and CI criteria in the ticket.