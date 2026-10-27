# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` is the real entry point and accepts a provider whose stream rejects. The test observes the hook and caller boundary directly.

## Done when these pass

- [ ] **Wraps non-Error provider rejections for `onError` and preserves the caller rejection** — strings, plain objects, and `undefined` reach `onError` once as an `Error` with the original value as `cause`, while the caller receives that original value unchanged.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Exercise each specified non-`Error` rejection through the real orchestrator entry point.
- [ ] Verify the spec records the new guarantee and cites its acceptance test.

## Out of scope

- The behavior for an existing `Error`, already covered by the existing tests.
- `beforeSession` escaping the `try` and usage accounting across tool rounds.
- Updating the spec's flaw prose beyond replacing it with the behavior this ticket specifies, and consumer facing release notes.