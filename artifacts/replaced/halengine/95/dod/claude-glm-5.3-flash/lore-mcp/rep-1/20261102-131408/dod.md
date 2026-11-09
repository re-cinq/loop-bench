# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator` is the real entry point, and a provider whose `sendMessage` throws a non-`Error` drives a turn straight into the `catch`. The acceptance tests call it today and fail on exactly the reported bypass.

## Done when these pass

- [ ] **calls onError once when the provider rejects with a string, wrapping it as the cause** — `onError` fires exactly once with an `Error` whose `cause` is the thrown string, and the caller still receives the string itself as the rejection
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **calls onError for a plain object and an undefined rejection too, wrapping either as the cause** — the same holds for a plain object and for `undefined`: `onError` once with an `Error` preserving the value as `cause`, caller still receives the original
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **hands an Error rejection to onError and the caller as the same instance, not a wrapper** — a rejection that is already an `Error` reaches `onError` and the caller unchanged; green on the base today, kept deliberately as the guard that outlaws an always-wrap fix
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [x] Acceptance file with the two red wrapping tests and the Error-identity guard, run red against the current `catch`
- [x] Spec: recorded-flaw section replaced by the new guarantee, each statement citing its test (done by this commit; anchors hand-set, `check-spec-anchor-names` and `check-spec-links` pass)
- [ ] `src/orchestration/chatOrchestrator.ts` `catch`: for a rejection that is not an `Error`, call `onError` with a wrapper `Error` carrying the original as `cause`; keep rethrowing the original value untouched
- [ ] `src/orchestration/chatOrchestrator.test.ts` stays unedited and green
- [ ] CHANGELOG `## [Unreleased]` entry saying what changes for an existing consumer (owed by the implementing round; `scripts/check-changelog.sh` gates it as soon as non-test `src/` changes)

## Out of scope

- `beforeSession` escaping the `try` (its own issue)
- Usage accounting across tool rounds (HALEngine#93)
- The `OrchestratorHooks.onError` signature stays `(session, error: Error)`; no new exported types