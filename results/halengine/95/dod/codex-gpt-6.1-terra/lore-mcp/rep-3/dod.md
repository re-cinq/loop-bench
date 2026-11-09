# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` accepts a provider and hooks, so the real message path exposes both the hook call and the caller's rejection.

## Done when these pass

- [ ] **reports every provider rejection to onError without changing what the caller receives** — Non-Error rejections are wrapped with the original cause, Error instances retain identity, and all original rejections reach the caller unchanged.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Call `onError` once for caught non-Error rejections with an Error preserving the original as its cause, and rethrow the original value.
- [ ] Preserve the existing Error instance passed to the hook and existing Error behavior.
- [ ] Update the changelog for consumers and ensure the spec's error reporting guarantee describes the implemented behavior.
- [ ] Pass the repository's CI checks, including existing tests.

## Out of scope

- Usage accounting across tool rounds and changes to the scope of the orchestrator's try block.