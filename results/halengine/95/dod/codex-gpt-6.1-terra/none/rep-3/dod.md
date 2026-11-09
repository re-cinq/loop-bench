# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — The orchestrator's lifecycle hook entry point reaches the same error handling path as a provider rejection, using the repository's built-in provider and real rejection values.

## Done when these pass

- [ ] **reports every rejection to onError while preserving the caller rejection** — String, object and undefined rejections reach the hook once as Errors with the original cause; existing Errors retain their identity and all original rejections reach the caller unchanged.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Call `onError` once for every caught rejection, wrapping non-Errors with their original value as `cause` and preserving Error identity and caller rejection values.
- [ ] Replace the spec's recorded flaw with the guarantee and describe the consumer-visible change in the changelog.
- [ ] Keep the existing Error tests unedited and pass the repository's CI checks.

## Out of scope

- Usage accounting across tool rounds and changes to `beforeSession` placement.