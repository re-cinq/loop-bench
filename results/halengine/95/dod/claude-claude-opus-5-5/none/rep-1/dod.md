# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage` with an `onError` hook and a provider that rejects with an arbitrary value is the real entry point; the tests drive it with no doubles and observe the hook and the caller's rejection.

## Done when these pass

- [ ] **calls onError once with an Error caused by a rejected string, and rethrows the string unchanged** — a string rejection reaches `onError` once as an `Error` with `cause` set to the string; the caller still gets the string
      `src/orchestration/onErrorNonError.acceptance.test.ts`
- [ ] **calls onError once with an Error caused by a rejected plain object, and rethrows the same object** — same for a plain object, and both `cause` and the caller's rejection are the identical object
      `src/orchestration/onErrorNonError.acceptance.test.ts`
- [ ] **calls onError once with an Error caused by a rejected undefined, and rethrows undefined** — same for `undefined`
      `src/orchestration/onErrorNonError.acceptance.test.ts`

The existing `src/orchestration/chatOrchestrator.test.ts` tests must stay green and unedited (the ticket's "an `Error` reaches `onError` as the same instance" criterion).

## Facets

- [ ] In the `catch` of `src/orchestration/chatOrchestrator.ts`, drop the `instanceof Error` gate: pass an `Error` through as-is, wrap anything else in `new Error(..., {cause: error})`, and keep `throw error` rethrowing the original value
- [ ] Add a CHANGELOG entry saying what changes for an existing consumer (`onError` now fires for non-`Error` rejections, with the raw value on `cause`)
- [x] `specs/hal-engine-config-hooks/spec.md`: the "Measured semantics" flaw line is replaced by an "Error reporting" section linked to the tests above (done in the DoD commit)

## Out of scope

- `beforeSession` escaping the `try` (its own issue)
- Usage accounting across tool rounds (HALEngine#93)
- Changing the shape of the value rethrown to the caller