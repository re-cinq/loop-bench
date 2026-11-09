# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — the seam already exists: a provider whose `sendMessage` generator throws a non-`Error` value, driven through `createChatOrchestrator(...).processMessage`, reaches the `catch` at `src/orchestration/chatOrchestrator.ts:150` by the real caller path. The three `it.each` cases are red today with `onError` never firing (`Received array: []`), exactly the reported bypass; the fourth test pins the already-`Error` identity and is green now, guarding the fix against over-wrapping.

## Done when these pass

- [ ] **wraps a rejection that is a string / a plain object / undefined in an Error for onError, keeping the original as cause, and still rejects the caller with it** (one `it.each`, three cases) — `onError` fires exactly once for a non-`Error` rejection, receives an `Error` whose `cause` is the original value, and the caller's rejection stays the original value unchanged
  `src/orchestration/chatOrchestrator.onError.acceptance.test.ts`
- [ ] **hands a rejection that is already an Error to onError as the same instance, not a wrapper** — the existing `Error` path keeps instance identity (ticket criterion 3), and the repo's existing `onError` tests stay unedited and green
  `src/orchestration/chatOrchestrator.onError.acceptance.test.ts`

## Facets

- [ ] In the `catch` of `processMessageStream` (`src/orchestration/chatOrchestrator.ts:150`), call `onError` for every rejection: wrap whatever is not already an `Error` in one whose `cause` is the original value, pass the original `Error` through as the same instance, and rethrow the original value unchanged so nothing downstream changes shape.
- [ ] Replace the "Measured semantics — out of scope" section of `specs/hal-engine-config-hooks/spec.md` (the recorded-flaw line citing `chatOrchestrator.ts#L150`) with the new guarantee, citing the acceptance test in the repo's established form, e.g. `- The orchestrator calls onError for every rejection, wrapping a rejection that is not an Error in one whose cause is the original value, and the caller still receives the original rejection ([validated by: wraps a rejection that is a string in an Error for onError, keeping the original as cause, and still rejects the caller with it](../../src/orchestration/chatOrchestrator.onError.acceptance.test.ts#L45)).`
- [ ] Add a CHANGELOG entry saying what changes for an existing consumer: `onError` now also fires for non-`Error` rejections and receives an `Error` wrapper (original preserved as `cause`), while the value their caller sees on rejection is unchanged.
- [ ] CI green on push: `npm run build`, `npm test`, `npm run typecheck`, `npm run eslint`, `npm run prettier:check`.

## Out of scope

- `beforeSession` escaping the `try` (its own issue).
- Usage accounting across tool rounds (HALEngine#93).
- Non-`Error` throws from other seams (`beforeToolCall` policy decline, tool executors, session-store save): the ticket claims the `catch` gate only, and their local handling is untouched.