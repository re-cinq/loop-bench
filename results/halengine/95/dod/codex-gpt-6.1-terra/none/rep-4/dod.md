# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — The orchestrator's public message entry point and lifecycle hooks exercise the existing catch path with real thrown values.

## Done when these pass

- [ ] **reports every rejection to onError while preserving the caller rejection** — Non-Error values reach the hook once as Errors with their original cause, existing Errors retain their identity, and every rejection reaches the caller unchanged.
      `src/orchestration/onError.acceptance.test.ts`

## Facets

- [ ] Wrap non-Error rejections for `onError` while preserving the original rejection at the caller boundary and existing Error identity.
- [ ] Replace the spec's recorded flaw with the new guarantee and describe the consumer-visible change in the changelog.
- [ ] Verify the repository's required CI checks pass.

## Out of scope

- Usage accounting across tool rounds and unrelated lifecycle changes.