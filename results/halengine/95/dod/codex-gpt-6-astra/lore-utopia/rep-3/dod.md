# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — Both public message APIs reach the same orchestrator catch. An installed `afterModelResponse` hook rejects with real values after the production local provider runs, exercising that catch without replacing a provider or mocking a dependency.

## Done when these pass

- [ ] **reports every rejection once as an Error while preserving the original caller rejection** — Strings, plain objects and `undefined` must reach the hook once as Errors with the exact original cause; existing Errors retain identity and both caller APIs retain the original rejection.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Normalize non-Error values only for `onError` in the shared catch, preserving the original throw and Error instances.
- [ ] Keep existing Error-path tests in `src/orchestration/chatOrchestrator.test.ts` unedited and green; the new test additionally checks identity.
- [ ] Implement the linked rejection guarantee in `specs/hal-engine-config-hooks/spec.md` and add a consumer-facing CHANGELOG entry.
- [ ] Pass the repository CI checks for build, tests, types, ESLint and formatting.

## Out of scope

- Moving `beforeSession`, usage accounting across tool rounds, and failures thrown by `onError` itself.
- Provider-specific error mapping: the acceptance test targets the shared catch via a lifecycle callback; production provider adapters are not replaced with rejecting test doubles.
- Changing Lore descriptor tooling: the current list command emits only id, name and file; the test carries its spec anchor as a comment and the spec supplies the validated-by link.