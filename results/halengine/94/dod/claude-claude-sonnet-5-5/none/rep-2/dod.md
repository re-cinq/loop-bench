# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createHalEngine(...).orchestrator.processMessage` is a real entry point that takes hooks, so the tests drive it with a throwing `beforeSession` and no doubles.

## Done when these pass

- [ ] **still rejects the caller with the thrown error and fires onError with (session, error)** — the rejection is unchanged and `onError` receives the same `(session, error)` shape as any other failure.
      `src/beforeSessionFailure.acceptance.test.ts`
- [ ] **fires afterSession, so what beforeSession allocated can be released** — `afterSession` runs after a throwing `beforeSession`.
      `src/beforeSessionFailure.acceptance.test.ts`

## Facets

- [ ] Move the `beforeSession` call inside the `try` in `src/orchestration/chatOrchestrator.ts`.
- [ ] Decide and record in the spec what `afterSession` can assume about how much of the turn ran; replace the recorded-flaw line in `specs/hal-engine-config-hooks/spec.md`.
- [ ] Add a CHANGELOG entry for existing consumers.

## Out of scope

- The `instanceof Error` gate on `onError`.
- Usage accounting across tool rounds (HALEngine#93).
- Signalling to `afterSession` that the session never started: the tests pin only that it fires.