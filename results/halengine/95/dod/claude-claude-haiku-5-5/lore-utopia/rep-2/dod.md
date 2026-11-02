# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — The `catch` in `processMessageStream` (`src/orchestration/chatOrchestrator.ts`) is reachable through `createChatOrchestrator(...).processMessage`, with a provider whose `sendMessage` throws a non-Error value. The seam exists today; the tests fail on the `instanceof Error` gate.

## Done when these pass

- [ ] **calls onError once with an Error whose cause is a rejected string, and the caller still gets that string** — a provider rejecting with `'boom'` must reach `onError` exactly once as an `Error` whose `cause` is `'boom'`, and the caller must still see `'boom'` unchanged.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **calls onError once with an Error wrapping a rejected plain object or undefined, and the caller gets each unchanged** — the same guarantee for a plain-object rejection and for an `undefined` rejection, with the caller receiving each value as thrown.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Red: both acceptance tests fail with `onErrorCount` 0 (the gate bypasses `onError`).
- [ ] Green: wrap a non-`Error` rejection in an `Error` with `cause` set to the original value, and call `onError` with it; re-throw the original value to the caller.
- [ ] Spec: replace the recorded-flaw line in `specs/hal-engine-config-hooks/spec.md` with the new guarantee, linking these tests.
- [ ] CHANGELOG: state what changes for an existing consumer (`onError` now fires for non-`Error` rejections, receiving a wrapped `Error`).
- [ ] CI: `npm run build`, `npm test`, `npm run typecheck`, `npm run eslint` (`--max-warnings 0`) and `npm run prettier:check` pass.

## Out of scope

- A rejection that is already an `Error` reaching `onError` as the same instance: already true, pinned by the existing tests in `src/orchestration/chatOrchestrator.test.ts`, which must stay unedited.
- `beforeSession` escaping the `try` (its own issue).
- Usage accounting across tool rounds (HALEngine#93).
- Changing the value re-thrown to the caller; it stays exactly as thrown today.