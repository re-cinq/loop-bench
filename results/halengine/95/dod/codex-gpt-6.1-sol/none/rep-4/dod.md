# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — The real orchestrator's lifecycle hook is a callable rejection seam sharing the provider's catch path. The acceptance test rejects from that hook with real values and records onError calls; it uses no doubles or network requests.

## Done when these pass

- [ ] **reports every non-Error rejection once with its cause while preserving the caller rejection** — Strings, plain objects and undefined each notify once with an Error preserving the original cause and caller rejection identity.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Notify onError for non-Error rejections, wrapping only the hook argument and preserving the cause and original thrown value.
- [ ] Keep existing Error-instance tests unedited and passing.
- [ ] Retain the spec's new guarantee and add a CHANGELOG entry explaining the change for existing consumers.
- [ ] Pass the repository's build, tests, typecheck, eslint and formatting checks in CI.

## Out of scope

- beforeSession placement and usage accounting across tool rounds (HALEngine#93).
- Hook failures masking an earlier rejection and provider-specific error translation.