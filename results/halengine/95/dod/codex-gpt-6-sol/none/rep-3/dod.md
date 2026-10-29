# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` accepts a provider and an `onError` hook, so the test drives a rejecting provider through `processMessage` and observes both the hook and the caller.

## Done when these pass

- [ ] **reports every provider rejection to onError without changing the caller rejection** — string, plain object, and `undefined` rejections reach the hook once as an `Error` with the original as `cause`; the caller receives the exact original, and an existing `Error` reaches the hook unchanged.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Wrap every non-`Error` rejection for `onError`, preserving the original value as `cause`.
- [ ] Keep rethrowing the original rejection to the caller and pass an existing `Error` instance through unchanged.
- [ ] Update the config-hooks spec and CHANGELOG for consumers; keep the existing `Error` tests unedited.
- [ ] Pass the repository's build, test, typecheck, eslint, and prettier CI gates.

## Out of scope

- `beforeSession` escaping the `try` and usage accounting across tool rounds (HALEngine#93).