# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — Call the real orchestrator with the built-in provider and a lifecycle hook that rejects with real values. The hook and provider failures share the reported catch gate; no provider double is needed.

## Done when these pass

- [ ] **reports every rejection once as an Error while preserving the caller rejection** — Strings, objects and undefined reach onError once as an Error with the original cause, existing Errors retain identity, and both caller APIs retain the original rejection.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Normalize non-Error rejections only for onError, preserving the original thrown value and existing Error identity.
- [ ] Keep the existing Error rejection tests unedited and green in CI.
- [ ] Implement the linked error-reporting guarantee in the spec and add a consumer-facing CHANGELOG entry.
- [ ] Pass the repository CI checks, including build, tests, typecheck, eslint and prettier.

## Out of scope

- beforeSession placement and usage accounting across tool rounds.
- Changing rejection shapes at the caller boundary or defining failures thrown by onError itself.