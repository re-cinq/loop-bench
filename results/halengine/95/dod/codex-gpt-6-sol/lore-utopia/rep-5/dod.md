# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage(...)` already exposes provider rejections and the `onError` hook. One acceptance test runs real rejected values through that path and observes the hook and caller.

## Done when these pass

- [ ] **calls onError with a caused Error for every non-Error provider rejection and rethrows the original value** — string, plain object, and `undefined` each invoke the hook once with a caused `Error`; an `Error` reaches it by identity, and every caller receives the exact original value.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Wrap each non-`Error` rejection for `onError`, preserving the original as `cause` and rethrowing it unchanged.
- [ ] Keep an existing `Error` as the same instance when passed to `onError`; preserve the existing tests.
- [ ] Update the spec's recorded flaw to the tested guarantee and add a consumer-facing CHANGELOG entry.
- [ ] Pass the repository's build, test, typecheck, eslint, and prettier checks in CI.

## Out of scope

- `beforeSession` escaping the `try` and usage accounting across tool rounds.