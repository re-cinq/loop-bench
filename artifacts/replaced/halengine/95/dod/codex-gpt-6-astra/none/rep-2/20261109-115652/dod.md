# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` exposes the catch path through installed lifecycle hooks. A real rejecting `beforeModelResponse` hook exercises that shared path without mocking a provider or making network requests; the provider and hooks share the same catch.

## Done when these pass

- [ ] **reports every rejection as an Error without changing the caller rejection** — strings, objects and `undefined` each reach the hook exactly once as an Error retaining the original cause; existing Errors retain identity and all caller rejections stay unchanged.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Remove the Error-only gate and normalize only the value passed to `onError`, preserving the thrown value.
- [ ] Keep the existing provider-error tests in `src/orchestration/chatOrchestrator.test.ts` unedited and green in CI.
- [ ] Retain the linked replacement guarantee in the config-hooks spec and add a consumer-facing CHANGELOG entry when implementing the fix.
- [ ] Run the ticket's build, test, typecheck, ESLint and formatting checks in CI.

## Out of scope

- `beforeSession` placement and usage accounting across tool rounds (#93).
- Provider adapters' own error translation and errors thrown by `onError` itself.
- Changing Lore's list adapter: it currently emits only id, name and file; the test carries its spec anchor in a comment and the spec carries the validating link.