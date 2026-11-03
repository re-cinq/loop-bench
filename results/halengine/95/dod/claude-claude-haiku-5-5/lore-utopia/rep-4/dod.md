# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — The seam exists: `createChatOrchestrator` with `hooks.onError` and a provider that rejects with a chosen value can be driven today, and the failure is observable as `onError` never being called.

## Done when these pass

- [ ] **calls onError once with an Error wrapping a string, and still rejects the caller with the original** — `onError` runs exactly once with an `Error` whose `cause` is the rejected string, and `processMessage` rejects with that same string unchanged
      `src/orchestration/chatOrchestrator.onError.acceptance.test.ts`
- [ ] **calls onError once with an Error wrapping a plain object, and still rejects the caller with the original** — the same guarantee for a plain object rejection
      `src/orchestration/chatOrchestrator.onError.acceptance.test.ts`
- [ ] **calls onError once with an Error wrapping undefined, and still rejects the caller with the original** — the same guarantee for an `undefined` rejection
      `src/orchestration/chatOrchestrator.onError.acceptance.test.ts`

## Facets

- [ ] Wrap a non-`Error` rejection in an `Error` (with `cause`) before calling `onError` in the `catch` of `processMessageStream` in `src/orchestration/chatOrchestrator.ts`, and re-throw the original value
- [ ] Replace the recorded-flaw line under "Measured semantics" in `specs/hal-engine-config-hooks/spec.md` with the new guarantee, and link it to the acceptance test
- [ ] Add a CHANGELOG entry under Unreleased/Changed saying an existing `onError` consumer now receives calls for non-`Error` rejections, as an `Error` with `cause`

## Out of scope

- `beforeSession` escaping the `try` (its own issue)
- Usage accounting across tool rounds (HALEngine#93)
- Changing the value rethrown to the caller
- Any change to a rejection that is already an `Error`: it must still reach `onError` as the same instance, pinned by the existing tests in `src/orchestration/chatOrchestrator.test.ts`, which stay unedited