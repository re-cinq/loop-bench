# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — The public orchestrator catches lifecycle-hook and provider rejections in the same block. A throwing lifecycle hook exercises that block with real values and the shipped provider, without mocks or stubs.

## Done when these pass

- [ ] **reports every rejection as an Error while preserving the original caller rejection** — Strings, plain objects and undefined each reach onError once as an Error preserving the cause; existing Errors retain identity and all caller rejections retain identity.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Remove the Error-only reporting gate and normalize non-Error rejections with their original cause while rethrowing the original value.
- [ ] Keep the existing Error-path tests unedited and passing; verify provider rejections follow the same reporting contract.
- [ ] Keep the spec's new rejection guarantee and add a consumer-facing CHANGELOG entry explaining the additional onError calls.
- [ ] Pass the repository's build, tests, typecheck, eslint and formatting gates in CI.

## Out of scope

- Changes to beforeSession placement or usage accounting across tool rounds.
- Changes to how a throwing onError hook propagates.