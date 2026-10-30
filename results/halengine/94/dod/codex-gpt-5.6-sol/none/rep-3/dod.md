# Definition of Done

> Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — The public orchestrator's `processMessage` entry point exposes the rejection, and its installed lifecycle hooks expose the error, session, and cleanup order without a test double.

## Done when these pass

- [ ] **reports and cleans up a beforeSession failure before rejecting with the original error** — A failed setup reaches `onError` with the original session and error, runs `afterSession` for the partially initialized session, and preserves the rejection.
      `src/orchestration/beforeSessionFailure.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` into the lifecycle error boundary so `onError` and `afterSession` run before the original error is rethrown.
- [ ] Document that `afterSession` may receive a session whose `beforeSession` hook was entered but did not complete and whose later turn stages never began.
- [ ] Add the consumer-visible hook behavior change to the changelog.
- [ ] Keep the existing non-throwing `beforeSession` tests unedited and green.

## Out of scope

- Non-`Error` thrown values reaching `onError`, and usage accounting across tool rounds.