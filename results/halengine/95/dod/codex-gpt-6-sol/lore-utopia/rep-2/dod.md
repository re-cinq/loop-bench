# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` accepts a provider and `onError` hook, and `processMessage` exposes the caller's rejection. The acceptance test exercises all three values through that entry point.

## Done when these pass

- [ ] **calls onError for non-Error provider rejections and preserves caller rejection** — a string, plain object, and `undefined` each call the hook once with an `Error` caused by the original value, while the caller receives that value unchanged.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [x] Add the red acceptance test and cite it from the spec guarantee.
- [ ] Normalize non-`Error` rejections for `onError` while rethrowing the original value.
- [ ] Keep existing `Error` instances unchanged in `onError`, as pinned by the existing orchestrator tests.
- [ ] Add a CHANGELOG entry explaining the hook change to existing consumers.
- [ ] Make the acceptance test and required CI checks pass.

## Out of scope

- `beforeSession` escaping the `try` and usage accounting across tool rounds.