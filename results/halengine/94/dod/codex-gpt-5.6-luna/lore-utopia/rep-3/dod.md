# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage(...)` is the real entry point and accepts lifecycle hooks directly, so one acceptance test can exercise the failure path without a new seam.

## Done when these pass

- [ ] **runs onError then afterSession when beforeSession throws, and still rejects to the caller** — preserves the thrown rejection, passes the same session and error to `onError`, invokes `afterSession` afterward, and proves no later turn work occurred.
      `src/orchestration/beforeSessionFailure.acceptance.test.ts`

## Facets

- [ ] Add the red acceptance test through the chat orchestrator entry point.
- [ ] Move `beforeSession` into the existing `try`/`catch`/`finally` path and preserve the original rejection.
- [ ] Document the post-failure `afterSession` guarantee in the config-hooks spec and record the consumer migration note in the changelog.

## Out of scope

- The `instanceof Error` gate on `onError`.
- Usage accounting across tool rounds.
- Changes to the existing non-throwing lifecycle behavior.