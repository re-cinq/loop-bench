# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage` is a real entry point; a provider that rejects with a non-Error drives the `catch` today.

## Done when these pass

- [ ] **calls onError once with an Error whose cause is a string / a plain object / undefined, and rejects with the original** — `onError` runs once with an `Error` whose `cause` is the raw rejection; the caller receives the original value unchanged.
  `src/orchestration/chatOrchestrator.onError.acceptance.test.ts`

## Facets

- [ ] Wrap non-Error rejections (cause = original) and call `onError`; rethrow the original.
- [ ] Existing chatOrchestrator tests stay unedited and green (Error instance passes through as-is).
- [ ] CHANGELOG entry for existing consumers.

## Out of scope

- `beforeSession` escaping the `try`; usage accounting across tool rounds (HALEngine#93).