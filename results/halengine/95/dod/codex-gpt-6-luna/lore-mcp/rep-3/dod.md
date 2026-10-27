# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` accepts a provider and hooks directly, so the acceptance test drives a provider rejection through the real orchestrator and observes both `onError` and the caller boundary.

## Done when these pass

- [ ] **Non-Error provider rejections reach onError and remain unchanged for the caller** — pins the string, plain object, and `undefined` rejection cases, including the wrapped hook error's `cause`.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Add the red acceptance test for non-`Error` provider rejections and link the guarantee in the hook spec.

## Out of scope

- Wrapping or changing an `Error` rejection.
- `beforeSession` escaping the `try` and usage accounting across tool rounds.