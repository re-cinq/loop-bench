# Definition of Done

> A rejection that is not an `Error` bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` is called with a provider whose `sendMessage` rejects with a non-`Error` value, and the orchestrator's `catch` is reached through the real entry point. The seam already exists, so no replacement module is needed.

## Done when these pass

- [ ] **calls onError once with an Error whose cause is a string, and still rejects the caller unchanged** — a string rejection reaches `onError` once, wrapped in an `Error` with the string as `cause`; the caller receives the same string.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **calls onError once with an Error whose cause is a plain object, and still rejects the caller unchanged** — the same guarantee for a plain-object rejection, with the caller receiving the same object reference.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **calls onError once with an Error whose cause is undefined, and still rejects the caller unchanged** — the same guarantee for an `undefined` rejection; `cause` is present on the wrapper and is `undefined`.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Red: the three acceptance cases fail because `onError` is called zero times for a non-`Error` rejection (`expected length 1, received 0`).
- [ ] Green: in the `catch` of `processMessageStream`, wrap a non-`Error` rejection in an `Error` with `cause` set to the original value, and call `onError` for every rejection.
- [ ] Green: the caller boundary still re-throws the original value (`throw error` keeps the unwrapped rejection; only the hook sees the wrapper).
- [ ] Green: existing `chatOrchestrator.test.ts` tests stay unedited and pass, including the `Error` instance identity they already pin.
- [ ] Docs: `specs/hal-engine-config-hooks/spec.md` replaces the recorded-flaw line (line 28) with the new guarantee, and `CHANGELOG.md` says what changes for an existing consumer. Neither is a test; both are part of the implementation round.
- [ ] CI: `npm run build`, `npm test`, `npm run typecheck`, `npm run eslint` and `npm run prettier:check` pass.

## Out of scope

- `beforeSession` escaping the `try` (its own issue).
- Usage accounting across tool rounds (HALEngine#93).
- The spec and CHANGELOG edits listed under Facets are not acceptance tests and are not written in this round.
- The `Error` instance identity case is already pinned by the existing `chatOrchestrator.test.ts` suite; no new test is written for it.