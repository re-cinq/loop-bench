# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage` is the real entry point, and a provider whose `sendMessage` throws a non-`Error` value drives the `catch` in `src/orchestration/chatOrchestrator.ts` without any double.

## Done when these pass

- [ ] **onError for a rejection that is not an Error › calls onError once with an Error whose cause is %s, and the caller still receives the original rejection** — for a string, a plain object and `undefined`: `onError` fires exactly once with an `Error` whose own `cause` is the thrown value, and `processMessage` rejects with that very value (`toBe`), unwrapped
      `src/orchestration/onErrorNonError.acceptance.test.ts`
- [ ] **Existing `ChatOrchestrator hooks › onError` tests stay green and unedited** — they show that a rejection that is already an `Error` (including an `AIError`) still reaches `onError` and the caller as before
      `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [ ] In the `catch` of `chatOrchestrator.ts`, call `onError` for every rejection, wrapping a non-`Error` value as `new Error(..., {cause: value})` and passing an `Error` through as the same instance; keep `throw error` re-throwing the original value
- [ ] In `specs/hal-engine-config-hooks/spec.md`, replace the "Measured semantics — out of scope" `instanceof Error` line with the new guarantee, linked as `([validated by: calls onError once with an Error whose cause is %s, and the caller still receives the original rejection](../../src/orchestration/onErrorNonError.acceptance.test.ts#L37))` (re-check the line number after formatting); leave `| Status |` alone
- [ ] Add a CHANGELOG entry saying what changes for an existing consumer: `onError` now also fires for non-`Error` rejections, with the raw value on `error.cause`

## Out of scope

- `beforeSession` escaping the `try` (its own issue)
- Usage accounting across tool rounds (HALEngine#93)
- Changing the value re-thrown to the caller: it stays exactly as thrown