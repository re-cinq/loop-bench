# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator` accepts lifecycle hooks and exposes the real message processing entry point. The built-in provider supplies a real implementation without a test double.

## Done when these pass

- [ ] **reports and cleans up a failed beforeSession before rejecting with the same error** — A thrown Error reaches `onError` with the session, then `afterSession` with the session, and propagates unchanged before the rest of the turn runs.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` into the existing error and cleanup path while preserving the rejection and successful lifecycle.
- [ ] Document that cleanup may run before user input or provider processing, and add a CHANGELOG entry explaining the consumer-visible change.
- [ ] Keep the existing non-throwing lifecycle tests unedited and green; CI runs the full checks.

## Out of scope

- Non-Error throws bypassing `onError` and usage accounting across tool rounds.