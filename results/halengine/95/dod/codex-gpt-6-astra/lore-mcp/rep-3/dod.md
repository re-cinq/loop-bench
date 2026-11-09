# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator().processMessageStream()` exposes an async generator whose native `throw` entry point reaches the same catch as a provider rejection. The test advances the shipped mock provider, injects real rejection values without doubles, and observes the installed hook and caller boundary.

## Done when these pass

- [ ] **reports every rejection once as an Error while preserving the original rejection** — Strings, plain objects, and `undefined` each produce exactly one hook call with an Error carrying the original cause; existing Errors retain identity, and every original rejection reaches the caller unchanged.
      `src/orchestration/onError.acceptance.test.ts`

## Facets

- [ ] Normalize non-Error values only for the onError callback, preserving the original throw and existing Error identity.
- [ ] Keep existing Error-path tests unedited and green in CI.
- [ ] Implement the linked rejection-reporting guarantee and add a consumer-facing CHANGELOG entry describing the additional hook calls and cause preservation.
- [ ] Pass the repository's build, tests, typecheck, eslint, and formatting checks in CI.

## Out of scope

- beforeSession placement, usage accounting across tool rounds, and failures thrown by onError itself.
- Provider SDK error mapping; this test exercises the shared orchestrator catch through native generator rejection injection.