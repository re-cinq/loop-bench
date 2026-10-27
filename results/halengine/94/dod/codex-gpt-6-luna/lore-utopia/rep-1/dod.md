# Definition of Done

> Neither onError nor afterSession runs.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage()` is the real entry point and exposes the lifecycle hooks directly. One acceptance test checks caller rejection, hook arguments and order, and that the failed startup prevents the turn from progressing.

## Done when these pass

- [ ] **reports the failure and runs afterSession without starting the turn** — a failed `beforeSession` rejects unchanged, invokes `onError` with the session and error, then invokes `afterSession` without entering user-input processing.
      `src/orchestration/beforeSessionFailure.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` into the protected lifecycle so its rejection reaches `onError` and cleanup.
- [ ] Record in the spec that `afterSession` can run when only `beforeSession` ran.

## Out of scope

- The existing `instanceof Error` gate for non-Error rejections.
- Usage accounting across tool rounds (HALEngine#93).