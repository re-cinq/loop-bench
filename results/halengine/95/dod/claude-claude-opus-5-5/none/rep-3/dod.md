# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage` with a provider that rejects with a raw value is the real entry point; the acceptance test calls it and observes the `onError` hook and the caller's rejection, no doubles needed.

## Done when these pass

- [ ] **calls onError once with an Error whose cause is %s, and still rejects with the original value** — for a string, a plain object and `undefined`: `onError` runs exactly once with an `Error` that has its own `cause` set to the raw value, and the caller receives the identical original value (`toBe`)
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **existing `onError` tests, unedited** — a rejection that is already an `Error` still reaches `onError` as itself (e.g. "runs onError then afterSession when it throws, and still rejects to the caller")
      `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [ ] In the `catch` of `src/orchestration/chatOrchestrator.ts`, call `onError` for every rejection, wrapping a non-`Error` as `new Error(..., {cause: error})`, passing an `Error` through as the same instance; re-throw the original `error` unchanged
- [ ] `specs/hal-engine-config-hooks/spec.md`: replace the "Measured semantics" recorded-flaw line with the new guarantee and link it to the acceptance test (`([validated by ...](../../src/orchestration/chatOrchestrator.acceptance.test.ts#Lnn))`)
- [ ] CHANGELOG entry: `onError` now fires for non-`Error` rejections, receiving a wrapper `Error` whose `cause` is the raw value; the value re-thrown to the caller is unchanged

## Out of scope

- `beforeSession` escaping the `try` (its own issue)
- Usage accounting across tool rounds (HALEngine#93)