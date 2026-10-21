# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a response body rejected directly by an HTTP client — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — the seam already exists. `createChatOrchestrator` returns an orchestrator whose `processMessage` and `processMessageStream` invoke the installed `OrchestratorHooks`. A test can drive `processMessage` with a provider that throws a string or a plain object and observe that `onError` is bypassed today because of the `error instanceof Error` gate in the `catch` block.

## Done when these pass

- [x] **calls onError with an Error carrying the thrown string and runs afterSession while rethrowing** — when a turn rejects with a string (`'string boom'`), `onError` is called once with an `Error` instance whose `message` is `'string boom'`, `afterSession` runs after `onError`, and the rejection still propagates to the caller. Fails today because `onError` is skipped (`callOrder` is `['afterSession']` and `isError` is `false`).
      `src/orchestration/onErrorNonError.acceptance.test.ts`

- [x] **calls onError with an Error carrying a readable message when the stream rejects with a plain object** — when a turn rejects with a plain object (`{code: 503, detail: 'upstream down'}`), `onError` is called once with an `Error` instance carrying a non-empty `message`, `afterSession` runs after `onError`, and the rejection still propagates to the caller. Fails today because `onError` is skipped (`callOrder` is `['afterSession']` and `isError` is `false`).
      `src/orchestration/onErrorNonError.acceptance.test.ts`

## Facets

- [x] In `src/orchestration/chatOrchestrator.ts`, coerce a caught non-`Error` rejection to an `Error` with a readable `message` (while passing an `Error` instance through unchanged) so `hooks.onError` always fires on any rejection inside the `try` block.
- [x] Confirm existing `Error`-instance tests in `src/orchestration/chatOrchestrator.test.ts` (`called with session and error when stream fails`, `error still propagates after onError hook`, `error path calls onError then afterSession`) remain green without modification.
- [x] Add a `CHANGELOG.md` entry under `## [Unreleased]` describing the behaviour change for existing consumers.
- [x] Unit-level pin of the coercion contract in `src/orchestration/chatOrchestrator.test.ts` (`wraps a rejection that is not an Error so onError still fires, while an Error passes through unchanged`), cited from `specs/hal-engine-config-hooks/spec.md` — written red, then green this round.
- [x] Acceptance coverage for a rejection with `undefined` (ticket criterion 2): the acceptance file pins string and plain object only; the unit test above pins `undefined` in the meantime. Closed as `calls onError with an Error carrying a readable message when the stream rejects with undefined`, cited from `specs/hal-engine-config-hooks/spec.md`.
- [ ] CI gates green on the pushed head: `npm run build`, `npm run typecheck`, `npm run eslint` (`--max-warnings 0`) and `npm run prettier:check` (ticket criterion 5). The eslint findings on e20e70e (54-token clone between the plain-object and `undefined` acceptance cases) are fixed by extracting the shared assertion into `expectTurnRejectedThroughOnError`, with the spec's `#Lnn` anchors repointed by name; the gates remain CI's verdict on this push, since this pod cannot run them.

## Out of scope

- `beforeSession` escaping the `try` block (resolved separately in HALEngine#94).
- Usage accounting across tool rounds (resolved separately in HALEngine#93).
- Widening the `onError` hook parameter type away from `Error` (the ticket keeps `(session: ChatSession, error: Error) => Promise<void>`).