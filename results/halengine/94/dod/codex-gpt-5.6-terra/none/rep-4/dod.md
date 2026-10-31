# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage()` is the lifecycle entry point and accepts the installed hooks directly. The acceptance test drives that entry point with the built-in provider and observes the rejection and hook calls.

## Done when these pass

- [ ] **rejects unchanged and runs onError before afterSession when beforeSession throws** — a `beforeSession` rejection reaches its caller unchanged while `onError` receives the same session and error before `afterSession`, which sees the unadvanced session.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` inside the existing `try` so its failure enters the existing `catch` and `finally`.
- [ ] Preserve the existing successful-session lifecycle behaviour without editing its tests.
- [ ] Add the consumer-facing CHANGELOG entry for the newly guaranteed error-path hooks.

## Out of scope

- The `instanceof Error` gate on `onError`.
- Usage accounting across tool rounds (HALEngine#93).