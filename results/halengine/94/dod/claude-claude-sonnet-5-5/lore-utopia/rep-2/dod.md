# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createHalEngine(...).orchestrator.processMessage` is a real entry point that takes hooks, so the behaviour is observable today with no seam work.

## Done when these pass

- [ ] **still rejects to the caller, and fires onError with the session and the thrown Error** — the original error is the rejection, and `onError(session, error)` fires once.
      `src/orchestration/beforeSessionFailure.acceptance.test.ts`
- [ ] **still runs afterSession, so a resource allocated in beforeSession can be released** — order is beforeSession, onError, afterSession.
      `src/orchestration/beforeSessionFailure.acceptance.test.ts`

## Facets

- [ ] Move the `beforeSession` call inside the `try` in `chatOrchestrator.ts`.
- [ ] Replace the recorded-flaw line in the spec with the guarantee, stating what `afterSession` can assume about how much of the turn ran; add a CHANGELOG entry.

## Out of scope

- The `instanceof Error` gate on `onError`.
- Usage accounting across tool rounds (HALEngine#93).