# Definition of Done

> A rejection that is not an Error — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses onError entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` is an existing entry point that accepts a real provider and hooks. The acceptance test drives provider rejections through that path and observes both the hook and the caller.

## Done when these pass

- [ ] **Calls onError for every non-Error rejection and preserves the caller rejection** — string, plain object, and `undefined` are reported once as an `Error` with the original value as `cause`, while the caller receives the original rejection.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Call `onError` for all rejections, wrapping non-`Error` values with their original value as `cause`.
- [ ] Preserve the original rejection at the caller boundary.

## Out of scope

- Rejections that are already `Error` instances, whose identity is covered by the existing suite.
- `beforeSession` escaping the `try` and usage accounting across tool rounds.