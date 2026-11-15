# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a response body rejected directly by an HTTP client — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — the seam already exists. `createChatOrchestrator` returns an orchestrator whose `processMessage` and `processMessageStream` invoke the installed `OrchestratorHooks`. A test can drive `processMessage` with a provider that throws a string or a plain object and observe that `onError` is bypassed today because of the `error instanceof Error` gate in the `catch` block.

## Done when these pass

- [ ] **calls onError with an Error carrying the thrown string and runs afterSession while rethrowing** — when a turn rejects with a string (`'string boom'`), `onError` is called once with an `Error` instance whose `message` is `'string boom'`, `afterSession` runs after `onError`, and the rejection still propagates to the caller. Fails today because `onError` is skipped (`callOrder` is `['afterSession']` and `isError` is `false`).
      `src/orchestration/onErrorNonError.acceptance.test.ts`

- [ ] **calls onError with an Error carrying a readable message when the stream rejects with a plain object** — when a turn rejects with a plain object (`{code: 503, detail: 'upstream down'}`), `onError` is called once with an `Error` instance carrying a non-empty `message`, `afterSession` runs after `onError`, and the rejection still propagates to the caller. Fails today because `onError` is skipped (`callOrder` is `['afterSession']` and `isError` is `false`).
      `src/orchestration/onErrorNonError.acceptance.test.ts`

## Facets

- [x] In `src/orchestration/chatOrchestrator.ts`, coerce a caught non-`Error` rejection to an `Error` with a readable `message` (while passing an `Error` instance through unchanged) so `hooks.onError` always fires on any rejection inside the `try` block.
- [x] Confirm existing `Error`-instance tests in `src/orchestration/chatOrchestrator.test.ts` (`called with session and error when stream fails`, `error still propagates after onError hook`, `error path calls onError then afterSession`) remain green without modification.
- [x] A circular plain-object rejection still reaches `onError` (today `JSON.stringify` in `asError` would throw and mask the original rejection).
- [x] Add a `CHANGELOG.md` entry under `## [Unreleased]` describing the behaviour change for existing consumers.

- [x] Re-point every `[validated by]` link after each test insertion (`node scripts/repoint-spec-anchors.mjs` then `npm run spec:names -- --fix`): stale links reddened eslint `require-spec-link` and `spec-names` on 3885358.
- [x] Clear eslint on 063d36b: probe `JSON.stringify` alone in `jsonOf` (no-catch-as-control-flow), share an `onErrorOutcome` helper in `chatOrchestrator.test.ts` (no-duplicate-code), fixed timestamp in the acceptance fixture (no-nondeterministic-tests).

## Out of scope

- `beforeSession` escaping the `try` block (resolved separately in HALEngine#94).
- Usage accounting across tool rounds (resolved separately in HALEngine#93).
- Widening the `onError` hook parameter type away from `Error` (the ticket keeps `(session: ChatSession, error: Error) => Promise<void>`).