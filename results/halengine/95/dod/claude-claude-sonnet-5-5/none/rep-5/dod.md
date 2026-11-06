# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage` is a real entry point and a provider that throws a non-Error drives the `catch` today; no seam is missing.

## Done when these pass

- [ ] **wraps %s in an Error with the original as cause and rethrows the original** (string, plain object, `undefined`) — `onError` is called once with an `Error` whose `cause` is the raw rejection, and the caller still receives the original value.
  `src/orchestration/chatOrchestrator.onError.acceptance.test.ts`
- [ ] **Existing `chatOrchestrator.test.ts` stays unedited and green** — an `Error` rejection still reaches `onError` as the same instance.
  `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [ ] Wrap non-Error rejections in an `Error` with `cause` before calling `onError`; rethrow the original.
- [ ] Replace the recorded-flaw line in `specs/hal-engine-config-hooks/spec.md` with the new guarantee, linked to the acceptance test (the implementer adds the `validated by` link once behaviour exists).
- [ ] Add a CHANGELOG entry describing the change for existing consumers.

## Out of scope

- `beforeSession` escaping the `try` (its own issue).
- Usage accounting across tool rounds (HALEngine#93).