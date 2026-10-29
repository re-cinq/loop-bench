# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage(session)` is the real entry point and already exposes the failing hook path. The acceptance test uses an actual provider and checks the original rejection, hook arguments, and hook order.

## Done when these pass

- [ ] **rejects with the beforeSession error after onError and afterSession receive the session** — the caller receives the original error, `onError` gets the same session and error, and `afterSession` gets the session after it; later turn hooks do not run.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move the `beforeSession` call inside the orchestrator's `try` so its `catch` and `finally` run on failure.
- [ ] Keep the original rejection after `onError` and `afterSession`, with their existing argument shapes and order.
- [x] Replace the recorded flaw in the config-hooks spec with the failed-setup guarantee and its cleanup assumption.
- [ ] Add a CHANGELOG entry explaining that existing consumers now receive `onError` and `afterSession` after a failed `beforeSession`.
- [ ] Keep the existing non-throwing `beforeSession` tests unchanged and green.

## Out of scope

- `onError` for non-`Error` throws, usage accounting across tool rounds, and changes to successful session hook behavior.