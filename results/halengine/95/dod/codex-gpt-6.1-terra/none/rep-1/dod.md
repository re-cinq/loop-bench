# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — The real orchestrator accepts lifecycle hooks and exposes `processMessage`; a rejecting hook exercises the same catch that handles provider failures.

## Done when these pass

- [ ] **reports every rejection to onError while preserving the caller rejection** — String, object and undefined rejections reach the hook as Errors with the original cause; Error instances and all caller rejections retain their identity.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Call `onError` once for non-Error rejections with an Error carrying the original cause, and rethrow the original value.
- [ ] Preserve existing Error identity and existing tests.
- [ ] Replace the recorded flaw in the spec with the guarantee and document the consumer-facing change in the CHANGELOG.

## Out of scope

- Usage accounting across tool rounds and unrelated lifecycle changes.