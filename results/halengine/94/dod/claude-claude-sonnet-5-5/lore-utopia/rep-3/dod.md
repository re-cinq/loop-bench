# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage` is a real entry point that accepts hooks, so a throwing `beforeSession` can be driven today with no seam work.

## Done when these pass

- [ ] **rejects with the original error and still runs onError and afterSession** — a throwing `beforeSession` still rejects the caller with the same error, `onError` fires with `(session, error)`, and `afterSession` fires.
      `src/orchestration/beforeSessionFailure.acceptance.test.ts`

## Facets

- [ ] Move the `beforeSession` call inside the `try` in `src/orchestration/chatOrchestrator.ts`.
- [ ] Replace the recorded-flaw line in `specs/hal-engine-config-hooks/spec.md` with the new guarantee, including what a hook can assume about how much of the turn happened.
- [ ] Add a CHANGELOG entry for existing consumers.

## Out of scope

- The `instanceof Error` gate on `onError`.
- Usage accounting across tool rounds (HALEngine#93).