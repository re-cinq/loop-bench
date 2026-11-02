# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — the seam exists: `createChatOrchestrator` takes `hooks.onError` and the `catch` in `processMessageStream` is the real entry point. The tests call `processMessage` with a provider that rejects with a non-Error value.

## Done when these pass

- [ ] **calls onError once with an Error whose cause is a thrown string, and the caller still gets the string** — a string rejection reaches `onError` once, wrapped in an `Error` whose `cause` is that string, and the caller's rejection is unchanged.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **calls onError once with an Error whose cause is a plain object / undefined, and the caller still gets it** — the same guarantee for a plain-object rejection and for `undefined`.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

Existing tests that must stay green and stay unedited: `src/orchestration/chatOrchestrator.test.ts` (`onError` describe block, including the Error-identity behaviour).

## Facets

- [ ] Wrap a non-Error rejection in an `Error` with `cause` set to the original, and call `onError` with it, in the `catch` of `processMessageStream` (`src/orchestration/chatOrchestrator.ts`).
- [ ] Keep an existing `Error` as the same instance passed to `onError`.
- [ ] Re-throw the original rejection value at the caller boundary, unchanged.
- [ ] Replace the recorded-flaw bullet in `specs/hal-engine-config-hooks/spec.md` with the new guarantee, and add the CHANGELOG entry for existing consumers.

## Out of scope

- `beforeSession` escaping the `try` (its own issue).
- Usage accounting across tool rounds (re-cinq/HALEngine#93).
- Any change to the type of `OrchestratorHooks.onError` (`error: Error`) beyond what the wrapping requires.
- Spec and CHANGELOG wording: the recorded-flaw bullet has no `validated by` link yet, because the guarantee does not exist until the implementation lands.