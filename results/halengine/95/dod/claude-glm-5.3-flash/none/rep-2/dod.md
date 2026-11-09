# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator` is the real entry point, and a provider that rejects with an arbitrary value is plain test setup, so the acceptance test calls the orchestrator and fails on behaviour today. No doubles are needed beyond the inline provider the existing suite already hand-rolls.

## Done when these pass

- [ ] **calls onError with an Error whose cause is the rejection, for a string, an object and undefined** — a provider rejecting with a string, a plain object, or `undefined` calls `onError` exactly once with an `Error` whose `cause` is that value, while the caller still receives the original rejection unchanged
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **passes a rejection that is already an Error to onError as the same instance** — criterion 3's guard. It passes today by design: the Error path is already correct, which is exactly the asymmetry this ticket fixes, so no honest red test exists for it. No existing test pins instance identity (they pin message and propagation only) and criterion 3 says "as the same instance, not a wrapper", so the property is pinned here rather than nowhere. It must still be green after the fix
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [x] `specs/hal-engine-config-hooks/spec.md`: the recorded-flaw section replaced by the new guarantee, citing the acceptance tests (done here — `re-lint/require-spec-link` refuses an uncited test, so the statement cannot wait for the fix)
- [x] acceptance tests written and failing for the ticket's stated reason
- [ ] `src/orchestration/chatOrchestrator.ts`: in the `catch`, call `onError` for every rejection, wrapping whatever is not already an `Error` in one whose `cause` is the original value, and re-throw the original unchanged
- [ ] existing tests stay unedited and green: `runs onError then afterSession when it throws, and still rejects to the caller`, `called with session and error when stream fails`, `error still propagates after onError hook`, `error path calls onError then afterSession` (`src/orchestration/chatOrchestrator.test.ts`)
- [ ] CHANGELOG entry under `## [Unreleased]` saying what changes for an existing consumer — CI's "Changelog entry" step fails the PR once `src/` changes without it

## Out of scope

- `beforeSession` escaping the `try` (its own issue)
- usage accounting across tool rounds (HALEngine#93)
- the shape of the rejection at the caller boundary: it stays exactly what it is today, wrapped or not