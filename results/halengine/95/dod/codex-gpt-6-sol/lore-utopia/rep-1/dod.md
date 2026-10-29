# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` accepts an `AIProvider` and an `onError` hook, so a provider rejection can be observed through `processMessage` without changing the entry point.

## Done when these pass

- [ ] **reports every provider rejection to onError without changing the caller value** — string, plain object, and `undefined` each reach the hook exactly once as an `Error` carrying the original cause; an existing `Error` reaches it as the same instance; the caller receives every original rejection.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Normalize non-`Error` rejections for `onError`, preserving the original value as `cause` and rethrowing it unchanged.
- [ ] Keep existing `Error` instances unchanged when passing them to `onError`.
- [ ] Add a consumer-facing CHANGELOG entry explaining that hooks now see previously omitted failures.
- [ ] Run the required CI gates after implementation.

## Out of scope

- `beforeSession` escaping the `try` and usage accounting across tool rounds.