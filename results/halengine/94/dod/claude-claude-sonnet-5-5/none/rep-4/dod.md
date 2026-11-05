# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage` is the real entry point and takes hooks as plain options, so the test can call it today and fail on behaviour.

## Done when these pass

- [ ] **rejects to the caller with the original error and fires onError with (session, error)** — a throwing `beforeSession` still rejects with the same error, and `onError` fires once with `(session, error)`.
      `src/orchestration/beforeSessionFailure.acceptance.test.ts`
- [ ] **still fires afterSession with the session** — `afterSession` fires once with the session after a throwing `beforeSession`.
      `src/orchestration/beforeSessionFailure.acceptance.test.ts`

## Facets

- [ ] Move the `beforeSession` call inside the `try` in `src/orchestration/chatOrchestrator.ts`.
- [ ] Replace the recorded-flaw line in `specs/hal-engine-config-hooks/spec.md` with the new guarantee, stating what `afterSession` can assume about how much of the turn happened, and link it to these tests.
- [ ] Add a CHANGELOG entry for existing consumers.

## Out of scope

- The `instanceof Error` gate on `onError`.
- Usage accounting across tool rounds (HALEngine#93).