# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — the seam exists: `createChatOrchestrator` accepts `hooks.onError`, and a recording hook plus a provider that rejects with a non-Error value is enough to observe whether `onError` fires. The fix lives entirely in the `catch` block at `src/orchestration/chatOrchestrator.ts:L150`.

## Done when these pass

- [ ] **calls onError once with an Error wrapping the string as cause, re-throws the original string** — `onError` is called once, the error it receives is an `Error` instance whose `cause` is the thrown string, and the caller gets back the original string
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **calls onError once with an Error wrapping the plain object as cause, re-throws it unchanged** — same guarantee holds for a plain-object rejection
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **calls onError once with an Error wrapping undefined as cause, re-throws undefined** — same guarantee holds when nothing concrete was thrown
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] In the `catch` block, replace `if (hooks?.onError && error instanceof Error)` with unconditional call: wrap non-Error values in `new Error(...)` with the original as `cause` before passing to `onError`
- [ ] Re-throw the ORIGINAL value (not the wrapper), so the caller's rejection shape is unchanged
- [ ] Verify existing `beforeSession` and `afterSession` tests (which throw real `Error` instances) still pass — the Error case must reach `onError` as the same instance, not a wrapper

## Out of scope

- `beforeSession` escaping the outer `try` (its own issue)
- Usage accounting across tool rounds (HALEngine#93)
- CHANGELOG update and spec Status bump (implementation work, not DoD)