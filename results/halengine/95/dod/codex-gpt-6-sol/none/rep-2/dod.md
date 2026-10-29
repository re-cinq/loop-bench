# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` accepts an `AIProvider` and hooks, so a provider rejection can be observed through `processMessage` today. The acceptance test covers the hook argument and caller rejection for the three reported non-`Error` values.

## Done when these pass

- [ ] **reports every provider rejection and preserves the caller value** — string, object, and `undefined` reach the hook as an `Error` with the original as `cause`; an existing `Error` reaches it unchanged, and the caller receives every original value.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Wrap each non-`Error` rejection for `onError`, preserving the raw value as `cause`.
- [ ] Keep the original rejection value at the caller boundary and the existing `Error` instance behavior.
- [ ] Update the CHANGELOG for consumers who observe `onError`.
- [ ] Pass the named acceptance test and the ticket's CI checks.

## Out of scope

- `beforeSession` escaping the `try` and usage accounting across tool rounds (HALEngine#93).