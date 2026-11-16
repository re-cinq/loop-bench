# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage` with a rejecting provider and an `onError` hook is the real entry point; the `instanceof Error` gate in its `catch` is the behaviour under test.

## Done when these pass

- [ ] **calls onError once with an Error causing a string / a plain object / undefined and rethrows the original** — `onError` fires once with an `Error` whose `cause` is the raw rejection, and the caller receives the original value.
  `src/orchestration/chatOrchestrator.onError.acceptance.test.ts`
- [ ] Existing `src/orchestration/chatOrchestrator.test.ts` stays unedited and green (an `Error` reaches `onError` as the same instance).

## Facets

- [ ] Wrap non-Error rejections in `new Error(..., {cause})` for `onError`; rethrow the original.
- [ ] Replace the recorded-flaw line in `specs/hal-engine-config-hooks/spec.md` with the new guarantee, linked to the test.
- [ ] CHANGELOG entry for existing consumers.

## Out of scope

- `beforeSession` escaping the `try`; usage accounting across tool rounds (HALEngine#93).