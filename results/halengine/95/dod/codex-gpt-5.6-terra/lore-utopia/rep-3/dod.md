# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` accepts an `AIProvider` whose stream is the real rejection boundary, and its `onError` hook is directly observable through `processMessage`.

## Done when these pass

- [ ] **calls onError once with an Error retaining each rejection as its cause and rethrows the original value** — string, plain-object, and `undefined` provider rejections each notify the hook exactly once with an `Error` that retains the raw cause, while callers receive the unchanged rejection.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Call `onError` for every caught rejection, wrapping only values that are not already `Error` instances and retaining the raw value as `cause`.
- [ ] Preserve the rejection value re-thrown to the caller, replace the recorded-flaw spec text with the guarantee, and document the consumer-facing change in `CHANGELOG.md`.

## Out of scope

- `beforeSession` escaping the `try` and usage accounting across tool rounds.