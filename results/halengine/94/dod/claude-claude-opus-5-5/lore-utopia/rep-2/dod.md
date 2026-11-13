# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage` is the real entry point and already accepts hooks; a `beforeSession` that throws drives the failing path today with a real provider and no doubles.

## Done when these pass

- [ ] **beforeSession failure › rejects with the beforeSession error after firing onError with it and then afterSession** — a throwing `beforeSession` still rejects the caller with the same error object, `onError` receives `(session, thatError)`, and `afterSession` fires after it; no other hook runs in between.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move the `beforeSession` call in `src/orchestration/chatOrchestrator.ts` inside the `try`, so the acceptance test goes green.
- [ ] Keep `src/orchestration/chatOrchestrator.test.ts` and `src/config.test.ts` green and unedited (non-throwing `beforeSession` behaves as today).
- [ ] Re-point the `chatOrchestrator.ts#L148` / `#L150` links in `specs/hal-engine-config-hooks/spec.md` (Measured semantics) to the lines they name after the move.
- [ ] Add a CHANGELOG entry saying what changes for an existing consumer: `onError` and `afterSession` now fire when `beforeSession` throws, so `afterSession` must tolerate a session whose `beforeSession` failed.
- [ ] Update the `afterSession always fires` line in CLAUDE.md / docs if they describe the old exception.

## Out of scope

- The `instanceof Error` gate on `onError` (its own issue).
- Usage accounting across tool rounds (HALEngine#93).