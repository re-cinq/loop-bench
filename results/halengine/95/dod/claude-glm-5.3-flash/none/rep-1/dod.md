# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator` with a provider whose `sendMessage` generator rejects with a non-`Error` value and an installed `onError` hook. The acceptance tests call the real entry point today and fail on behaviour (`onErrorCalls: 0` where 1 is owed), with no mock of the code under change.

## Done when these pass

- [ ] **calls onError once for a string rejection, with an Error whose cause is that string, and rejects the caller with it** — a provider rejecting with a string reaches `onError` exactly once, wrapped so `cause` is the string, and the caller's rejection is still the string
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **treats a plain object and undefined the same way: each reaches onError once as its cause, unchanged to the caller** — the same guarantee holds for every non-`Error` shape, by identity of the original value on both sides
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] the existing `onError` tests in `src/orchestration/chatOrchestrator.test.ts` (`runs onError then afterSession when it throws, and still rejects to the caller`, `called with session and error when stream fails`, `error still propagates after onError hook`) stay UNEDITED and green — a rejection that is already an `Error` reaches `onError` as that same instance, and no wrapper may appear at the caller boundary

Both acceptance tests are RED as committed (run below); the third item is the existing suite's job and must remain so.

## Facets

- [x] red acceptance tests in `src/orchestration/chatOrchestrator.acceptance.test.ts` (fails: `onErrorCalls: 0`)
- [x] `specs/hal-engine-config-hooks/spec.md` replaces its recorded-flaw section with the new guarantee, citing the acceptance tests (anchors verified by `node scripts/check-spec-anchor-names.mjs`)
- [ ] `src/orchestration/chatOrchestrator.ts`: in the `catch`, call `onError` for every rejection — wrap whatever is not already an `Error` in one that carries the original as `cause`; keep re-throwing the original value untouched
- [ ] `CHANGELOG.md`: `## [Unreleased]` entry saying what changes for an existing consumer — `onError` now also fires for rejections that are not `Error`s, and receives a wrapper whose `cause` holds the original
- [ ] the string test goes green
- [ ] the plain-object/`undefined` test goes green
- [ ] `src/orchestration/chatOrchestrator.test.ts` unedited, still green

## Out of scope

- `beforeSession` escaping the `try` (its own issue)
- usage accounting across tool rounds (HALEngine#93)
- the re-thrown value at the caller boundary changing shape — the ticket pins it to stay exactly what it is today, and the tests hold that line