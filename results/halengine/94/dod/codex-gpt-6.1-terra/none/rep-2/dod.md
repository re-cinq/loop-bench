# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator` exposes the real message-processing and hook seam, so the failure can be observed directly.

## Done when these pass

- [ ] **reports and cleans up a failed beforeSession while preserving its rejection** — An Error thrown by `beforeSession` reaches `onError` with the session, then `afterSession`, and remains the caller's rejection; no user input hook runs.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Bring `beforeSession` into the existing error and cleanup path while preserving the rejection and successful lifecycle.
- [ ] Update the spec's measured-semantics context and explain what cleanup can assume; describe the consumer-facing change in the CHANGELOG.
- [ ] Keep the existing non-throwing hook tests unedited and passing, and pass the repository's CI checks.

## Out of scope

- Non-Error throws bypassing `onError`, and usage accounting across tool rounds.