# Definition of Done

> Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` is the real lifecycle entry point and already accepts `beforeSession`, `onError`, and `afterSession` hooks, so the missing behavior can be observed without adding a seam.

## Done when these pass

- [ ] **calls onError and afterSession, then rejects with the beforeSession error** — a throwing `beforeSession` preserves the exact rejection, invokes `onError` with the same session and error, and invokes `afterSession` after it.
      `src/orchestration/beforeSessionThrow.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` into the orchestrator's `try` so the acceptance test turns green.
- [ ] Keep the unchanged rejection and the `onError`/`afterSession` ordering covered by the acceptance test.
- [ ] Replace the recorded flaw in `specs/hal-engine-config-hooks/spec.md` with the guarantee and state that `afterSession` only knows setup began, not that the turn completed.
- [ ] Add a CHANGELOG entry describing the new cleanup and error-hook behavior for existing consumers.
- [ ] Run the repository's required CI checks and keep the existing non-throwing `beforeSession` tests unedited.

## Out of scope

- The `instanceof Error` gate on `onError`.
- Usage accounting across tool rounds.
- Changing the existing successful-session lifecycle order.