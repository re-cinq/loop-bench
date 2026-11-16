# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage` with a rejecting provider and an `onError` hook is a real seam; no new module is needed.

## Done when these pass

- [ ] **calls onError once with an Error whose cause is %s, and the caller receives the original rejection** — for a string, a plain object and `undefined` rejection: `onError` called once with an `Error` whose `cause` is the rejection, and the caller receives the original value.
      `src/orchestration/chatOrchestrator.onError.acceptance.test.ts`

## Facets

- [ ] Wrap non-Error rejections (cause = original) before calling `onError`; rethrow the original
- [ ] Existing Error-instance tests stay green unedited (same instance reaches `onError`)
- [ ] Replace the recorded-flaw line in `specs/hal-engine-config-hooks/spec.md`; add CHANGELOG entry

## Out of scope

- `beforeSession` escaping the `try`
- Usage accounting across tool rounds (HALEngine#93)