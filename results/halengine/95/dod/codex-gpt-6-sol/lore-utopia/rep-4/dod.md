# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` already accepts a provider and `onError` hook; `processMessage` reaches the provider rejection through the real caller path.

## Done when these pass

- [ ] **calls onError once for every provider rejection, preserving its cause and the caller rejection** — string, plain object, and `undefined` rejections reach `onError` as `Error` instances with the original cause; existing `Error` instances and caller rejections retain identity.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Wrap each non-`Error` rejection with its original value as `cause` when calling `onError`.
- [ ] Keep the value rethrown to the caller unchanged and pass existing `Error` instances through unchanged.
- [ ] Add a CHANGELOG entry explaining the newly reported failures to consumers of `onError`.
- [ ] Pass CI's build, test, typecheck, ESLint, and Prettier gates.

## Out of scope

- `beforeSession` escaping the `try` and usage accounting across tool rounds (HALEngine#93).