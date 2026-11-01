# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage()` is the real public entry point, and a provider rejection reaches its existing `catch` directly. The acceptance test observes both the hook and caller boundaries without mocks.

## Done when these pass

- [ ] **calls onError once with an Error caused by a non-Error rejection while preserving the caller rejection** — string, plain-object, and `undefined` provider rejections all notify the hook with an `Error` whose `cause` is the original value while the caller sees that exact value.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Make the orchestrator notify `onError` for every rejection, wrapping only non-`Error` values with their original rejection as `cause`.
- [ ] Preserve the existing `Error` instance behavior covered by the unedited orchestrator tests.
- [ ] Replace the recorded-flaw prose in the config-hooks spec with the guarantee and add the consumer-facing CHANGELOG entry.

## Out of scope

- `beforeSession` escaping the `try` and usage accounting across tool rounds.