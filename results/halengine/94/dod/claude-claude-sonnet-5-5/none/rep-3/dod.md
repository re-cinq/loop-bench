# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage` is the real entry point and accepts hooks, so the test calls it with a throwing `beforeSession` and fails on behaviour today.

## Done when these pass

- [ ] **beforeSession that throws (HALEngine#94) rejects to the caller, calls onError with the thrown error and the session, then calls afterSession** — the throw still rejects unchanged, `onError` receives `(session, error)`, and `afterSession` fires after it.
  `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`

## Facets

- [ ] Move the `beforeSession` call inside the `try` in `src/orchestration/chatOrchestrator.ts`
- [ ] Replace the recorded-flaw line in `specs/hal-engine-config-hooks/spec.md` with the new guarantee (what a hook can assume about how much of the turn happened), linking the test
- [ ] Add a CHANGELOG entry for existing consumers

## Out of scope

- The `instanceof Error` gate on `onError`
- Usage accounting across tool rounds (HALEngine#93)