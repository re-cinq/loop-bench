# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` is the real entry point and accepts both a provider and lifecycle hooks, so the rejection and its observations require no test doubles.

## Done when these pass

- [ ] **calls onError with a caused Error and rethrows each original rejection unchanged** — String, plain-object, and `undefined` provider rejections each call `onError` once with a caused `Error`, while the caller receives the identical original value.
      `src/orchestration/chatOrchestratorNonError.acceptance.test.ts`

## Facets

- [ ] Normalize each non-`Error` rejection before passing it to `onError`.
- [ ] Preserve existing `Error` identity when invoking `onError`.
- [ ] Rethrow the original rejection unchanged after `onError` returns.
- [ ] Document the consumer-visible hook behavior in `CHANGELOG.md`.

## Out of scope

- `beforeSession` placement relative to the orchestrator's `try` block.
- Usage accounting across tool rounds (HALEngine#93).