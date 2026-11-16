# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — The seam already exists: `createChatOrchestrator` accepts `hooks.onError` and the `catch` block at `src/orchestration/chatOrchestrator.ts:L150` is where the gate sits. The acceptance tests call `processMessage` with a provider that rejects with a non-Error value and assert that `onError` is called with a wrapped `Error` whose `cause` is the original value.

## Done when these pass

- [ ] **calls onError with an Error whose cause is the string when the provider rejects with a string** — `onError` fires once with an `Error` whose `.cause` is the original string; the string still propagates to the caller
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **calls onError with an Error whose cause is the plain object when the provider rejects with a plain object** — same contract as the string case, for a plain object rejection
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **calls onError with an Error whose cause is undefined when the provider rejects with undefined** — same contract as the string case, for an `undefined` rejection
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Remove the `instanceof Error` guard on `hooks.onError` in `chatOrchestrator.ts:L150`
- [ ] Wrap non-Error rejections: `const e = error instanceof Error ? error : new Error('...', {cause: error})` before calling `onError`
- [ ] Keep `throw error` (re-throw the original, not the wrapper) so caller shape is unchanged
- [ ] Update `specs/hal-engine-config-hooks/spec.md`: replace the recorded-flaw entry under "Measured semantics" with the new guarantee (the new spec statements already added in this round)
- [ ] Add a CHANGELOG entry for existing consumers of `onError`

## Out of scope

- `beforeSession` escaping the outer `try` (its own issue)
- Usage accounting across tool rounds (HALEngine#93)
- Any other hook that may have similar instanceof guards