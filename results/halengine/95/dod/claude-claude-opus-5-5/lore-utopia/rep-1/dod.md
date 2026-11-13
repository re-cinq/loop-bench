# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage` is the real entry point, and a provider whose stream throws an arbitrary value reaches the `catch` in `src/orchestration/chatOrchestrator.ts` today. No double is needed: the provider is a real `AIProvider` that rejects.

## Done when these pass

- [ ] **onError for a rejection that is not an Error › calls onError once with an Error whose cause is a string / a plain object / undefined, and the caller still receives the original rejection** — for each of the three values, `onError` fires exactly once with an `Error` whose own `cause` is the rejected value, and `processMessage` still rejects with that same value (`toBe`), not the wrapper.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Wrap a non-`Error` rejection in `new Error(..., {cause: error})` before calling `onError`; keep `throw error` re-throwing the original value.
- [ ] An `Error` rejection still reaches `onError` as the same instance: the existing `onError` tests in `src/orchestration/chatOrchestrator.test.ts` stay green and unedited.
- [ ] `specs/hal-engine-config-hooks/spec.md`: replace the recorded-flaw line under "Measured semantics" with the new guarantee, linked to the acceptance test (`([validated by: ...](../../src/orchestration/chatOrchestrator.acceptance.test.ts#L31))`).
- [ ] `CHANGELOG.md` `[Unreleased]` › `### Changed`: say that `onError` now also fires for non-`Error` rejections, with the original value as `cause`.

## Out of scope

- `beforeSession` escaping the `try` (its own issue).
- Usage accounting across tool rounds (HALEngine#93).
- Changing what the caller receives: the re-thrown value stays exactly as it is today.