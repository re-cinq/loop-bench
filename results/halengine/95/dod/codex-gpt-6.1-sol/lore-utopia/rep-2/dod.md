# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — Both public orchestrator methods reach the same catch block. Real rejecting lifecycle hooks exercise it without mocks or stubs; the installed provider is never reached. Provider rejections enter the same handler.

## Done when these pass

- [ ] **reports non-Error rejections once with their original cause and preserves caller rejection identity** — String, plain object and undefined rejections notify once with an Error and identical cause, preserving the original caller rejection through both APIs.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Normalize non-Error rejections for onError, preserving their cause and original rethrow.
- [ ] Preserve existing Error instance identity, with existing tests unedited.
- [ ] Keep the new spec guarantee and add a consumer-facing CHANGELOG entry.
- [ ] Pass the repository CI checks, including existing provider rejection tests.

## Out of scope

- Changes to beforeSession handling and usage accounting across tool rounds.
- Rejection message wording, hook failures and provider implementations.