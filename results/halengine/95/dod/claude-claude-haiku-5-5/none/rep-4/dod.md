# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — The seam exists: `createChatOrchestrator(...).processMessage` with an `onError` hook and a provider whose `sendMessage` throws a non-Error value. The tests call that entry point today and fail because the `catch` in `src/orchestration/chatOrchestrator.ts` gates `onError` on `error instanceof Error`.

## Done when these pass

- [ ] **calls onError once with an Error whose cause is a thrown string, and the caller still gets the string** — a string rejection reaches `onError` once, wrapped in an `Error` whose `cause` is the string, and the caller still receives the string
  `src/orchestration/nonErrorRejection.acceptance.test.ts`
- [ ] **calls onError once with an Error whose cause is a plain object, and the caller still gets that same object** — an object rejection reaches `onError` once, wrapped with the same object as `cause`, and the caller receives the same instance
  `src/orchestration/nonErrorRejection.acceptance.test.ts`
- [ ] **calls onError once with an Error when the rejection is undefined, and the caller still gets undefined** — an `undefined` rejection reaches `onError` once as an `Error`, and the caller still rejects with `undefined`
  `src/orchestration/nonErrorRejection.acceptance.test.ts`

## Facets

- [ ] Remove the `error instanceof Error` gate in the orchestrator `catch` and wrap non-Error rejections in an `Error` with `cause` set to the original value, leaving the re-thrown value unchanged
- [ ] Replace the recorded-flaw line in `specs/hal-engine-config-hooks/spec.md` with the new guarantee
- [ ] Add a CHANGELOG entry describing what changes for an existing consumer whose `onError` receives an `Error` for non-Error rejections

## Out of scope

- `beforeSession` escaping the `try` (its own issue)
- Usage accounting across tool rounds (HALEngine#93)
- Identity of an `Error` rejection reaching `onError`: it already holds today and is not a red test