# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a response body rejected directly by an HTTP client — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — the seam already exists. `createChatOrchestrator` returns an orchestrator whose `processMessage` and `processMessageStream` invoke the installed `OrchestratorHooks`. A test can drive `processMessage` with a provider that throws a string or a plain object and observe that `onError` is bypassed today because of the `error instanceof Error` gate in the `catch` block.

## Done when these pass

- [x] **calls onError with an Error carrying the thrown string and runs afterSession while rethrowing** — when a turn rejects with a string (`'string boom'`), `onError` is called once with an `Error` instance whose `message` is `'string boom'`, `afterSession` runs after `onError`, and the rejection still propagates to the caller. Fails today because `onError` is skipped (`callOrder` is `['afterSession']` and `isError` is `false`).
      `src/orchestration/onErrorNonError.acceptance.test.ts`

- [x] **calls onError with an Error carrying a readable message when the stream rejects with a plain object** — when a turn rejects with a plain object (`{code: 503, detail: 'upstream down'}`), `onError` is called once with an `Error` instance carrying a non-empty `message`, `afterSession` runs after `onError`, and the rejection still propagates to the caller. Fails today because `onError` is skipped (`callOrder` is `['afterSession']` and `isError` is `false`).
      `src/orchestration/onErrorNonError.acceptance.test.ts`

## Facets

- [x] In `src/orchestration/chatOrchestrator.ts`, coerce a caught non-`Error` rejection to an `Error` with a readable `message` (while passing an `Error` instance through unchanged) so `hooks.onError` always fires on any rejection inside the `try` block. Closed this round: `asError` wraps a non-`Error` in an `Error` (message = the thrown string, or a JSON rendering; original kept as `cause`), the original value is still rethrown untouched, and both acceptance tests above ran green locally.
- [ ] Confirm existing `Error`-instance tests in `src/orchestration/chatOrchestrator.test.ts` (`called with session and error when stream fails`, `error still propagates after onError hook`, `error path calls onError then afterSession`) remain green without modification. Left to CI: this pod runs only its own test file, and the verdict on the push is the confirmation.
- [x] Add a `CHANGELOG.md` entry under `## [Unreleased]` describing the behaviour change for existing consumers. Added under `### Fixed` with a migration note about hooks now seeing `cause` of any shape.
- [x] Repair the two eslint findings from CI's verdict on 4424a14: `no-catch-as-control-flow` at `chatOrchestrator.ts:176` (the JSON.stringify fallback now lives in a status-returning probe, `jsonString`, whose catch returns the `undefined` sentinel the rule's doc allows) and `no-nondeterministic-tests` at `onErrorNonError.acceptance.test.ts:12` (the entry timestamp is now the fixed `ENTRY_TIMESTAMP` constant). No behaviour change: `readableRejection` returns the same string for every input, and CI runs the acceptance tests against it.

## Out of scope

- `beforeSession` escaping the `try` block (resolved separately in HALEngine#94).
- Usage accounting across tool rounds (resolved separately in HALEngine#93).
- Widening the `onError` hook parameter type away from `Error` (the ticket keeps `(session: ChatSession, error: Error) => Promise<void>`).