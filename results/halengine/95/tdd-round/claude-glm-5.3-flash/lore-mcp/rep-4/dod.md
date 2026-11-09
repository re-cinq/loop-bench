# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a response body rejected directly by an HTTP client — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — the seam already exists. `createChatOrchestrator` returns an orchestrator whose `processMessage` and `processMessageStream` invoke the installed `OrchestratorHooks`. A test can drive `processMessage` with a provider that throws a string or a plain object and observe that `onError` is bypassed today because of the `error instanceof Error` gate in the `catch` block.

## Done when these pass

- [ ] **calls onError with an Error carrying the thrown string and runs afterSession while rethrowing** — when a turn rejects with a string (`'string boom'`), `onError` is called once with an `Error` instance whose `message` is `'string boom'`, `afterSession` runs after `onError`, and the rejection still propagates to the caller. Fails today because `onError` is skipped (`callOrder` is `['afterSession']` and `isError` is `false`).
      `src/orchestration/onErrorNonError.acceptance.test.ts`

- [ ] **calls onError with an Error carrying a readable message when the stream rejects with a plain object** — when a turn rejects with a plain object (`{code: 503, detail: 'upstream down'}`), `onError` is called once with an `Error` instance carrying a non-empty `message`, `afterSession` runs after `onError`, and the rejection still propagates to the caller. Fails today because `onError` is skipped (`callOrder` is `['afterSession']` and `isError` is `false`).
      `src/orchestration/onErrorNonError.acceptance.test.ts`

## Facets

- [x] In `src/orchestration/chatOrchestrator.ts`, coerce a caught non-`Error` rejection to an `Error` with a readable `message` (while passing an `Error` instance through unchanged) so `hooks.onError` always fires on any rejection inside the `try` block. Closed by the `asError` helper: an `Error` passes through, a string becomes the `message` directly, anything else gets `non-error rejection: <json>` with the original as `cause`; the `instanceof Error` gate is gone from the `catch`, and the rethrow is untouched.
- [x] Confirm existing `Error`-instance tests in `src/orchestration/chatOrchestrator.test.ts` (`called with session and error when stream fails`, `error still propagates after onError hook`, `error path calls onError then afterSession`) remain green without modification. Both runs green (26/26 before the fix, 27/27 after); the only edit to the file is the shared `createErrorProvider` helper's parameter widening `Error` → `unknown`, so a test can hand it a non-`Error` rejection — those three tests' bodies are untouched.
- [x] Add a `CHANGELOG.md` entry under `## [Unreleased]` describing the behaviour change for existing consumers.
- [x] Pin the third value of the ticket's second acceptance criterion: a rejection with `undefined` reaches `onError` as a wrapped `Error` with a readable message while the caller still receives `undefined`. The coercion already covers it (`describeRejection` falls back to `String()` because `JSON.stringify(undefined)` is `undefined`), but no test pins it — the acceptance file covers string and plain object only. Closed by `wraps an undefined rejection in an Error for onError while the caller still receives undefined` in `src/orchestration/chatOrchestrator.test.ts`, driving the turn through the shared `rejectionTurn` helper; the spec's non-Error statement now names `undefined` and cites it.

## Out of scope

- `beforeSession` escaping the `try` block (resolved separately in HALEngine#94).
- Usage accounting across tool rounds (resolved separately in HALEngine#93).
- Widening the `onError` hook parameter type away from `Error` (the ticket keeps `(session: ChatSession, error: Error) => Promise<void>`).