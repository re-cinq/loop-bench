# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — The orchestrator lifecycle hooks seam already exists in `createChatOrchestrator`; invoking `processMessage` with a throwing `beforeSession` hook exercises the real entry point and directly observes whether `onError` and `afterSession` run.

## Done when these pass

- [ ] **runs onError then afterSession when beforeSession throws and propagates the rejection** — When `beforeSession` throws, the error propagates to the caller as a rejection, `onError` fires with the session and the error, and `afterSession` fires with the session.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move the `await hooks.beforeSession(session)` call inside the `try` block in `src/orchestration/chatOrchestrator.ts`.
- [ ] Add an entry in `CHANGELOG.md` describing the new guarantee when `beforeSession` throws.

## Out of scope

- The `instanceof Error` gate on `onError` (its own issue).
- Usage accounting across tool rounds (HALEngine#93).