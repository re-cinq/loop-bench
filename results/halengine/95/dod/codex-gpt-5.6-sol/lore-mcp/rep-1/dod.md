# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` exposes the real provider, hook, and caller boundaries through `processMessage`, so the rejection and both observations can be exercised without doubles.

## Done when these pass

- [ ] **calls onError with a cause-preserving Error and rethrows the original rejection** — A string, plain object, or `undefined` rejection reaches `onError` once as an `Error` preserving the raw value as `cause`, while the caller receives the original value; an existing `Error` reaches both unchanged.
      `src/orchestration/chatOrchestratorNonErrorRejection.acceptance.test.ts`

## Facets

- [ ] Normalize every non-`Error` rejection before calling `onError`, preserving the original value as `cause`.
- [ ] Rethrow the original rejection unchanged after the hook runs.
- [ ] Replace the spec's recorded flaw with the guaranteed rejection behavior and its acceptance-test link.
- [ ] Add a CHANGELOG entry explaining the newly reported non-`Error` rejections to existing consumers.
- [ ] Keep the existing `Error` hook tests unedited and green.
- [ ] Pass the repository's build, test, typecheck, eslint, and prettier checks.

## Out of scope

- `beforeSession` placement outside the orchestrator error boundary.
- Usage accounting across tool rounds (HALEngine#93).