# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage` is a real entry point; a provider that rejects with a non-Error value shows the missing `onError` call today.

## Done when these pass

- [ ] **calls onError once with an Error caused by a string / a plain object / undefined, and the caller gets the original** — `onError` runs exactly once with an `Error` whose `cause` is the raw rejection, and the caller still receives the unchanged rejection. Spec anchor: `specs/hal-engine-config-hooks/spec.md#measured-semantics`.
  `src/orchestration/chatOrchestrator.nonErrorRejection.acceptance.test.ts`
- [ ] **Existing chatOrchestrator.test.ts stays unedited and green** — an `Error` rejection reaches `onError` as the same instance.
  `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [ ] Drop the `instanceof Error` gate in the `catch`; wrap non-Errors with `new Error(..., {cause})`, re-throw the original.
- [ ] Replace the recorded-flaw line in `specs/hal-engine-config-hooks/spec.md` with the new guarantee, linked to the acceptance test.
- [ ] Add a CHANGELOG entry for existing consumers.

## Out of scope

- `beforeSession` escaping the `try`; usage accounting across tool rounds (HALEngine#93).