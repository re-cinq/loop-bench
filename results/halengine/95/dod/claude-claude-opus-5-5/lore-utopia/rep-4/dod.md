# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage` is the real entry point and a provider whose stream rejects with an arbitrary value drives the `catch` at `src/orchestration/chatOrchestrator.ts:150` with no double. The tests fail today with `onErrorCalls: 0`; the caller-side assertions already pass and must stay passing.

## Done when these pass

- [ ] **calls onError once with an Error whose cause is the rejected string, and rejects the caller with the string** — a string rejection reaches `onError` once, wrapped in an `Error` whose `cause` is that string; the caller's rejection is the original string
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **calls onError once with an Error whose cause is the rejected plain object, and rejects the caller with it** — the same for a plain object (`cause` is the same instance)
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **calls onError once with an Error whose cause is undefined, and rejects the caller with undefined** — the same for `undefined`
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] Existing `ChatOrchestrator hooks › onError` tests in `src/orchestration/chatOrchestrator.test.ts` stay green and UNEDITED — they pin that an `Error` rejection reaches `onError` as itself, not a wrapper

## Facets

- [ ] In the `catch`, call `onError` for every rejection: pass an `Error` through as-is, wrap anything else in `new Error(..., {cause: error})`, and re-throw the original `error` unchanged
- [ ] CHANGELOG entry: `onError` now fires for non-`Error` rejections, receiving an `Error` wrapper whose `cause` is the raw value; the caller's rejection is unchanged
- [ ] Spec already updated on this branch: `specs/hal-engine-config-hooks/spec.md` drops the "Measured semantics" flaw line and states the guarantee, citing the three tests (CI's `spec:names` / `check:spec-links` verify the citations)

## Out of scope

- `beforeSession` escaping the `try` (its own issue)
- Usage accounting across tool rounds (HALEngine#93)
- The `processMessageStream` path's own error handling, beyond sharing the same `catch`