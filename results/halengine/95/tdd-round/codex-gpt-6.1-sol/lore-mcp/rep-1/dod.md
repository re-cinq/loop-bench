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
- [ ] Confirm existing `Error`-instance tests in `src/orchestration/chatOrchestrator.test.ts` (`called with session and error when stream fails`, `error still propagates after onError hook`, `error path calls onError then afterSession`) remain green without modification.
- [x] Handle rejection objects whose string conversion throws, preserving the caller rejection and still calling `onError`.
- [x] Add a `CHANGELOG.md` entry under `## [Unreleased]` describing the behaviour change for existing consumers.

- [x] Repair CI findings in the unprintable-rejection test by using one assertion and direct Error access.

## Out of scope

- `beforeSession` escaping the `try` block (resolved separately in HALEngine#94).
- Usage accounting across tool rounds (resolved separately in HALEngine#93).
- Widening the `onError` hook parameter type away from `Error` (the ticket keeps `(session: ChatSession, error: Error) => Promise<void>`).

Round verification: `src/orchestration/onErrorCause.test.ts` failed once because `onError` was skipped, then passed after wrapping and after refactoring the assertion. Existing Error-instance and acceptance tests are reserved for CI. No CI verdict was available for this branch.

Round verification: the unprintable-rejection test failed with zero hook calls, then passed after safe conversion. Repaired the previous CI findings (test layer import, malformed spec citation, nondeterministic acceptance fixture, and changelog). Existing Error-instance tests remain CI-only; no behavioral test regressions were reported in the round brief.

Round verification: repaired both CI-reported lint findings without changing production behavior or acceptance tests. The focused unprintable-rejection test remains the local green bar; existing Error-instance tests remain reserved for CI. CI reported zero behavioral test failures and two lint findings in the previous round’s test.