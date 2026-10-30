# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` is the existing public seam that exposes both the `onError` hook and the rejection returned to its caller.

## Done when these pass

- [ ] **reports every non-Error rejection through onError without changing the caller rejection** — A string, plain object, and `undefined` each call `onError` once with an `Error` whose cause is the original value, while the caller receives that original value unchanged.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Normalize every caught non-`Error` value to an `Error` with the original value as its cause before calling `onError`.
- [ ] Preserve an existing `Error` instance when passing it to `onError`.
- [ ] Re-throw the original rejection value after `onError` returns.
- [ ] Replace the spec's recorded-flaw statement with the guaranteed rejection semantics and its validation link.
- [ ] Add a CHANGELOG entry describing the new `onError` behavior for existing consumers.

## Out of scope

- `beforeSession` escaping the orchestrator's `try` block.
- Usage accounting across tool rounds (HALEngine#93).