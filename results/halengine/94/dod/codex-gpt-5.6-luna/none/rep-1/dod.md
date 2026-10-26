# Definition of Done

> Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` is the real lifecycle entry point and accepts real provider, session, and hook values. The acceptance test drives that seam without mocks or source-text assertions.

## Done when these pass

- [ ] **propagates the failure, calls onError, and still calls afterSession** — a throwing `beforeSession` rejects with the same `Error`, invokes `onError` with the session and error, then invokes `afterSession` with the session.
      `src/orchestration/beforeSessionFailure.acceptance.test.ts`

## Facets

- [x] Move `beforeSession` inside the existing `try` boundary.
- [x] Update the lifecycle spec to state that cleanup runs after failed session setup.
- [x] Add the consumer-facing change to the Unreleased changelog.

## Out of scope

- Non-`Error` throws and their `onError` behavior.
- Usage accounting across tool rounds.
- Changes to the existing successful-session hook behavior.