# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator` is a real entry point and the hooks are plain options, so the test calls it today and fails on behaviour.

## Done when these pass

- [ ] **rejects with the original error and still fires onError and afterSession for it** — a throwing `beforeSession` still rejects with the same error, `onError(session, error)` fires, then `afterSession` fires.
  `src/orchestration/beforeSessionFailure.acceptance.test.ts`

## Facets

- [ ] Move the `beforeSession` call inside the `try` in `chatOrchestrator.ts`.
- [ ] Replace the recorded-flaw line in `specs/hal-engine-config-hooks/spec.md` with the new guarantee (what `afterSession` can assume), linking this test; add a CHANGELOG entry.

## Out of scope

- The `instanceof Error` gate on `onError`, and usage accounting across tool rounds (HALEngine#93).