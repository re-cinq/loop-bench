# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` exposes the real lifecycle through installed hooks. One test uses a real Bedrock provider (never reached on this path), a real prompt builder, and consumer hooks to observe rejection identity, callback arguments, and cleanup order.

## Done when these pass

- [ ] **reports and cleans up a failed beforeSession before rejecting with the original error** — The original Error rejects the caller after onError and afterSession each run once with the original session; later turn hooks never run.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move beforeSession into the existing error-handling boundary and make the acceptance test green.
- [ ] Preserve the existing successful-session tests unedited; CI runs the regression suite and required checks.
- [ ] Retain the spec's explicit partial-initialization cleanup contract and add a consumer-facing CHANGELOG entry for the new callback behavior.

## Out of scope

- Non-Error rejection handling, exceptions thrown by onError or afterSession, and tool-round usage accounting (#93).
- New lifecycle arguments or initialization-status flags; cleanup tracks its own allocations.