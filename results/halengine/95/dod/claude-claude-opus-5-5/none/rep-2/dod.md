# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage` with a real provider that rejects is the seam; the test drives a string, a plain object and `undefined` rejection through it and observes the `onError` hook and the caller's rejection.

## Done when these pass

- [ ] **calls onError once with an Error whose cause is %s, and the caller still receives the original rejection** (one case each for a string, a plain object and `undefined`) — `onError` fires exactly once with an `Error` whose `cause` is the original value, and the caller's rejection is that same value (`Object.is`), not the wrapper
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **Existing `onError` tests stay green and unedited** — `called with session and error when stream fails`, `error still propagates after onError hook`, `runs onError then afterSession when it throws, and still rejects to the caller`, `error path calls onError then afterSession`
      `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [ ] In the `catch` of `src/orchestration/chatOrchestrator.ts`, call `onError` for every rejection: pass an `Error` through as the same instance, wrap anything else in `new Error(..., {cause: error})`; re-throw the original `error` unchanged
- [ ] CHANGELOG `[Unreleased]` → `### Fixed`: `onError` now fires for non-`Error` rejections, receiving an `Error` with the raw value as `cause`; the value the caller receives is unchanged
- [x] `specs/hal-engine-config-hooks/spec.md`: the "Measured semantics" flaw line is replaced by the new guarantee, linked to the acceptance test (done in this DoD commit)

## Out of scope

- `beforeSession` escaping the `try` (its own issue)
- Usage accounting across tool rounds (HALEngine#93)
- The existing tests check that an `Error` reaches `onError` by `message` only, not by identity, so a wrapper that copies the message would still pass them. This DoD does not add a stricter test: one would pass today and is not red.