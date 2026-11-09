# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a response body rejected directly by an HTTP client — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — the seam already exists. `createChatOrchestrator` returns an orchestrator whose `processMessage` and `processMessageStream` invoke the installed `OrchestratorHooks`. A test can drive `processMessage` with a provider that throws a string or a plain object and observe that `onError` is bypassed today because of the `error instanceof Error` gate in the `catch` block.

## Done when these pass

- [ ] **calls onError with an Error carrying the thrown string and runs afterSession while rethrowing** — when a turn rejects with a string (`'string boom'`), `onError` is called once with an `Error` instance whose `message` is `'string boom'`, `afterSession` runs after `onError`, and the rejection still propagates to the caller. Fails today because `onError` is skipped (`callOrder` is `['afterSession']` and `isError` is `false`).
      `src/orchestration/onErrorNonError.acceptance.test.ts`

- [ ] **calls onError with an Error carrying a readable message when the stream rejects with a plain object** — when a turn rejects with a plain object (`{code: 503, detail: 'upstream down'}`), `onError` is called once with an `Error` instance carrying a non-empty `message`, `afterSession` runs after `onError`, and the rejection still propagates to the caller. Fails today because `onError` is skipped (`callOrder` is `['afterSession']` and `isError` is `false`).
      `src/orchestration/onErrorNonError.acceptance.test.ts`

- [ ] **calls onError with an Error whose cause is the undefined rejection and still rejects with undefined** — when a turn rejects with `undefined`, `onError` is called once with an `Error` instance whose `cause` is `undefined` and whose `message` is non-empty, `afterSession` runs after `onError`, and the caller still receives `undefined`.
      `src/orchestration/onErrorNonError.acceptance.test.ts`

## Facets

- [x] In `src/orchestration/chatOrchestrator.ts`, coerce a caught non-`Error` rejection to an `Error` with a readable `message` (while passing an `Error` instance through unchanged) so `hooks.onError` always fires on any rejection inside the `try` block.
- [x] Confirm existing `Error`-instance tests in `src/orchestration/chatOrchestrator.test.ts` (`called with session and error when stream fails`, `error still propagates after onError hook`, `error path calls onError then afterSession`) remain green without modification — CI on 8ab3faa reported only the eslint failure, so the Test job (which runs them) was green.
- [x] Add a `CHANGELOG.md` entry under `## [Unreleased]` describing the behaviour change for existing consumers.
- [x] Pin the `undefined` half of acceptance criterion 2: no test asserts that a turn rejecting with `undefined` calls `onError` with an `Error` whose `cause` is `undefined` while the caller still receives `undefined` (the coercion handles it; only the string and plain-object cases are asserted) — written this round as the third acceptance bullet above.
- [x] Fix the eslint finding CI named on 8ab3faa (`re-lint/no-nondeterministic-tests` at `src/orchestration/onErrorNonError.acceptance.test.ts:12:48`): the session timestamp is now the fixed `SENT_AT` constant, matching `chatOrchestrator.test.ts`.
- [x] Fix the three eslint findings CI named on 0285744a, all in `src/orchestration/onErrorNonError.acceptance.test.ts`: `re-lint/no-duplicate-code` at 40:67 and 97:72 (the undefined-rejection test re-implemented the `turnOutcome` scaffold inline) and `re-lint/max-expects` at 84:3 (five expects). The test now drives the shared `turnOutcome` helper and asserts its five facts (rejects with `undefined`, hook order, `Error` instance, `cause` is `undefined`, non-empty `message`) through one projection `toEqual`; the helper exposes the coerced error's `cause`, and the string test projects the same four facts it already asserted. Spec anchors re-pointed by hand to the moved `it` lines (L56/L72/L90); `spec:names` and `check:spec-links` pass.

## Out of scope

- `beforeSession` escaping the `try` block (resolved separately in HALEngine#94).
- Usage accounting across tool rounds (resolved separately in HALEngine#93).
- Widening the `onError` hook parameter type away from `Error` (the ticket keeps `(session: ChatSession, error: Error) => Promise<void>`).