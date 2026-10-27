# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` exposes the real provider rejection path and accepts `onError` as a hook. A rejecting provider can exercise non-`Error` values through `processMessage` without doubles or production changes.

## Done when these pass

- [ ] **non-Error provider rejections** — String, plain-object, and `undefined` rejections call `onError` once with an `Error` whose `cause` is the original value, and preserve that value at the caller boundary.
  `src/orchestration/nonErrorRejection.acceptance.test.ts`

## Facets

- [ ] Verify each non-`Error` rejection is reported once as an `Error` carrying the original cause.
- [ ] Verify the caller receives the original rejection unchanged.
- [ ] Replace the spec's measured flaw with the new guarantee and link it to the acceptance test.

## Out of scope

- Changes to `beforeSession` escaping the `try` or usage accounting across tool rounds.