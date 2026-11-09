# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator` is the real entry point, and a provider whose `sendMessage` rejects with the raw value drives the `catch` gate in `processMessageStream` today, so the tests fail on the missing behaviour rather than on a missing seam. No production code is written in this commit; the spec statement the tests validate is cited here, the `catch` fix and the CHANGELOG entry are what remains.

## Done when these pass

- [ ] **calls onError once with an Error carrying the rejected value as its cause, and still rejects the caller with that value** — RED today: for a rejection with a string, a plain object and `undefined`, `onError` fires zero times and no `Error` reaches the hook, while `callerReceivedOriginal` already passes. The fix wraps the value in an `Error` carrying it as `cause`, calls `onError` exactly once, and leaves the caller's rejection identical.
  `src/orchestration/chatOrchestrator.onError.acceptance.test.ts`

- [ ] **hands a rejection that is already an Error to onError as the same instance and still rejects the caller with it** — GREEN today, and the guarantee the fix must not break: an `AIError` rejection reaches `onError` unwrapped (`Object.is` identity, so no wrapper) and is exactly what the caller receives. No existing test pins instance identity, so this pins the ticket's third criterion; it must stay green without being edited.
  `src/orchestration/chatOrchestrator.onError.acceptance.test.ts`

## Facets

- [ ] red bar reproduced: first test fails with `onErrorCalls: 0` against `1` while `callerReceivedOriginal: true`
- [ ] `src/orchestration/chatOrchestrator.ts`: in the `catch`, wrap a rejection that is not an `Error` in one carrying it as `cause`, call `onError` with that wrapper, and re-throw the original value unchanged; an already-`Error` rejection keeps reaching `onError` as the same instance
- [ ] `specs/hal-engine-config-hooks/spec.md`: the recorded-flaw line under "Measured semantics — out of scope" is replaced by the new guarantee citing both acceptance tests (done in this commit)
- [ ] `CHANGELOG.md`: an entry under `[Unreleased]` saying what changes for an existing consumer — an `onError` hook now also fires for rejections that are not `Error`s and receives a wrapper whose `cause` is the raw value
- [ ] gates: `npm run build`, `npm test`, `npm run typecheck`, `npm run eslint` (`--max-warnings 0`) and `npm run prettier:check` — CI's Verify job in `.github/workflows/ci.yml` runs them on every push

## Out of scope

- `beforeSession` escaping the `try` (its own issue)
- usage accounting across tool rounds (HALEngine#93)
- the wrapper's `message` text: the hook-observable contract is `cause`, and the ticket specifies no consumer-facing message