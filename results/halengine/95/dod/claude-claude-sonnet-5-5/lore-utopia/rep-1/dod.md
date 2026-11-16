# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage` with a provider that rejects is a real seam; the existing hooks tests already drive it the same way.

## Done when these pass

- [ ] **wraps a string / a plain object / undefined in an Error with the original as cause, and rethrows it unchanged** — `onError` is called once with an `Error` whose `cause` is the raw rejection, and the caller receives the original value.
  `src/orchestration/chatOrchestrator.onError.acceptance.test.ts`
- [ ] **Existing hook tests stay unedited and green** — an `Error` rejection still reaches `onError` as the same instance.
  `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [ ] Wrap non-Error rejections (with `cause`) and call `onError` in the `catch` of `src/orchestration/chatOrchestrator.ts`; rethrow the original.
- [ ] Replace the recorded-flaw line in `specs/hal-engine-config-hooks/spec.md` with the guarantee; add a CHANGELOG entry.

## Out of scope

- `beforeSession` escaping the `try`; usage accounting across tool rounds (HALEngine#93).