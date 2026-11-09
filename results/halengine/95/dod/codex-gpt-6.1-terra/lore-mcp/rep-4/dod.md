# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — The orchestrator's lifecycle hooks can reject with real values through the same catch used for provider failures, without a test double or network call.

## Done when these pass

- [ ] **reports every rejection as an Error and preserves the caller rejection** — String, object and undefined rejections reach the hook once as Errors with the original cause, existing Errors keep their identity, and all original rejections reach the caller unchanged.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Report non-Error rejections to `onError` as Errors with the original value as cause, preserving existing Error identity and the original caller rejection.
- [ ] Replace the recorded flaw in the hooks spec with the guarantee and update the CHANGELOG for existing consumers.
- [ ] Keep the existing Error-path tests and repository CI checks green.

## Out of scope

- Usage accounting across tool rounds and unrelated lifecycle changes.