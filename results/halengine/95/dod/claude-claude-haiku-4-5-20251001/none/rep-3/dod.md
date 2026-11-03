# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — A direct seam already exists: the provider's rejection surfaces through the catch block at `src/orchestration/chatOrchestrator.ts#L150`. The acceptance tests can call the real orchestrator today and verify the hook fires or fails to fire.

## Done when these pass

- [ ] **calls onError with an Error wrapping a string rejection, and the caller receives the original string** — Verifies the orchestrator wraps non-Error rejections with Error and passes the wrapper to onError while leaving the caller's thrown value unchanged
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **calls onError with an Error wrapping a plain object rejection, and the caller receives the original object** — Verifies the same wrapping behavior for plain object rejections
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **calls onError with an Error wrapping an undefined rejection, and the caller receives the original undefined** — Verifies the same wrapping behavior for undefined rejections
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **passes an Error rejection as the same instance to onError, not wrapped** — Verifies that rejections that are already Error instances pass through unchanged and do not get wrapped, pinning the existing behavior
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Wrap non-Error rejections in Error with the original as `cause` when calling onError
- [ ] Rethrow the original rejection to the caller unchanged after onError returns
- [ ] Handle Error rejections as unchanged (no wrapping) to maintain compatibility with existing tests

## Out of scope

- Changes to specs or CHANGELOG (handled by the implementation ticket)
- Modifications to session save or tool budget logic