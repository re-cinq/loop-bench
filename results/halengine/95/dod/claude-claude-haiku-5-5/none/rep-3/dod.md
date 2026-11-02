# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — The seam exists: `createChatOrchestrator` and its `onError` hook are called directly through `processMessage`, with a provider that rejects with the chosen value. The gate in `src/orchestration/chatOrchestrator.ts` is the only thing between the rejection and the hook.

## Done when these pass

- [ ] **calls onError once with an Error whose cause is a rejected string, and the caller still gets the string** — a string rejection reaches `onError` exactly once as an `Error` whose `cause` is that string, and the caller still receives the original string
      `src/orchestration/onErrorNonError.acceptance.test.ts`
- [ ] **calls onError once with an Error whose cause is a rejected plain object or undefined, and the caller still gets that value** — a plain-object rejection and an `undefined` rejection each reach `onError` once as an `Error` whose `cause` is the value, and the caller still receives the value unchanged
      `src/orchestration/onErrorNonError.acceptance.test.ts`

## Facets

- [ ] Wrap a non-`Error` rejection in an `Error` with `cause` set to the original value, and call `onError` with it, in the `catch` of `src/orchestration/chatOrchestrator.ts` (the two tests above)
- [ ] Rethrow the original value at the caller boundary, unchanged
- [ ] Replace the recorded-flaw line under "Measured semantics — out of scope" in `specs/hal-engine-config-hooks/spec.md` with the new guarantee, and add its `validated by` link to the two tests above
- [ ] Add a CHANGELOG entry under Unreleased saying what an existing consumer sees: `onError` now fires for non-`Error` rejections, receiving a wrapper `Error` whose `cause` is the original value
- [ ] Guard, already green and not written as a new test: an `Error` rejection reaches `onError` as the same instance. The existing test "called with session and error when stream fails" checks only the message, so identity is not yet pinned

## Out of scope

- `beforeSession` escaping the `try` (its own issue)
- Usage accounting across tool rounds (HALEngine#93)
- Changing what the caller receives at the rejection boundary
- The CI jobs `npm run build`, `npm test`, `npm run typecheck`, `npm run eslint` and `npm run prettier:check` are the next round's concern beyond these two tests