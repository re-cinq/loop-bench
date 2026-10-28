# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — The real `createChatOrchestrator` exposes collected and streamed entry points and accepts lifecycle hooks. One acceptance test exercises both using the shipped local provider and real hooks, without test doubles.

## Done when these pass

- [ ] **reports and cleans up a failed beforeSession before rejecting the caller with the original error** — Both entry points report the identical error and session, await cleanup of partial initialization, skip the rest of the turn, and preserve the caller rejection.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move session initialization under the existing error and cleanup handling so the acceptance test passes.
- [ ] Keep existing successful-session tests unedited and green in CI.
- [ ] Confirm the spec guarantee for partial initialization and add a consumer-facing CHANGELOG entry for the new error and cleanup calls.

## Out of scope

- Non-Error rejections and the instanceof Error gate.
- Usage accounting across tool rounds (HALEngine#93).
- New lifecycle arguments or a separate initialization-status API; cleanup tracks its own allocations.