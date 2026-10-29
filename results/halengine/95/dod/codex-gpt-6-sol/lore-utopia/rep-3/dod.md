# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` accepts a provider and hooks, and `processMessage` reaches the catch that drops non-`Error` values. The acceptance test supplies a rejecting provider through that seam and observes both the hook and caller.

## Done when these pass

- [ ] **calls onError once with an Error caused by each non-Error rejection and rethrows the original value** — string, plain object, and `undefined` each reach the hook once with their original value as `cause`; the caller receives the original rejection, and an existing `Error` keeps its identity.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Normalize non-`Error` rejections for `onError`, preserving the original as `cause` and rethrowing the original value to the caller.
- [ ] Keep an existing `Error` instance unchanged when passing it to `onError`.
- [ ] Add a consumer-facing `CHANGELOG.md` entry describing the newly reported failures and preserved caller rejection.
- [ ] Pass the repository's build, test, typecheck, eslint, and prettier checks in CI.

## Out of scope

- `beforeSession` escaping the `try` and usage accounting across tool rounds.