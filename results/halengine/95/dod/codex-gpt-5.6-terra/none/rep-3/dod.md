# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` accepts a real provider and hooks, so its public `processMessage` path can observe both the hook argument and the caller-facing rejection.

## Done when these pass

- [ ] **calls onError once for every rejection, preserving its cause and the caller rejection** — strings, plain objects, and `undefined` are wrapped for `onError` while the original value is rethrown; an existing `Error` is passed through unchanged.
      `src/orchestration/chatOrchestratorOnError.acceptance.test.ts`

## Facets

- [ ] Normalize every caught rejection to an `Error` only for the `onError` hook, preserving non-Error values as `cause`.
- [ ] Keep the value rethrown to the caller unchanged.
- [ ] Replace the spec's recorded flaw with the guarantee and describe the consumer-visible change in the changelog.

## Out of scope

- `beforeSession` escaping the `try` and usage accounting across tool rounds.