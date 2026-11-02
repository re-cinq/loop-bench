# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — The orchestrator entry point `processMessage` is callable today with a `beforeSession` hook that throws, so the acceptance tests reach the real seam and fail on the missing `onError` and `afterSession` calls.

## Done when these pass

- [ ] **hands the same error and session to onError, and still rejects the caller with it** — a `beforeSession` that throws reaches `onError` with the same session and the same error object, and the caller still receives that rejection
      `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`
- [ ] **still runs afterSession, so a hook that released a resource in beforeSession is not skipped** — a `beforeSession` that throws still lets `afterSession` run
      `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`

## Facets

- [ ] Move the `beforeSession` call inside the `try` in `processMessageStream` so its throw reaches the existing `catch` and `finally`
- [ ] Confirm `onError` receives the same `(session, error)` shape as other orchestrator failures
- [ ] Decide and record in `specs/hal-engine-config-hooks/spec.md` what a hook can assume when `afterSession` runs after a failed `beforeSession`: the decision in the ticket is that it runs, so the spec must say the session never started
- [ ] Replace the recorded-flaw bullet for `beforeSession` in `specs/hal-engine-config-hooks/spec.md` with the new guarantee, and link it to the tests above
- [ ] Add a CHANGELOG entry saying what changes for an existing consumer whose `beforeSession` throws
- [ ] The non-throwing path stays unchanged; the existing tests in `src/orchestration/chatOrchestrator.test.ts` must remain unedited and green

## Out of scope

- The `instanceof Error` gate on `onError` (its own issue)
- Usage accounting across tool rounds (HALEngine#93)
- Editing `| Status |` on any spec
- Spec test-link stamping: the `specs/` statement this work validates is written when the flaw line is replaced, in the implementation round

## Red bar

Run locally with `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`: both tests fail on the missing `onError` and `afterSession` calls. CI's "Test" job in `.github/workflows/ci.yml` runs the full Jest suite on every push.