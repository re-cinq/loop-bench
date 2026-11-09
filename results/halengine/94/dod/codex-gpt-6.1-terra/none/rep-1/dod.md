# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator` accepts real hooks and exposes `processMessage`, so the failing lifecycle can be observed directly.

## Done when these pass

- [ ] **specs/hal-engine-config-hooks/spec.md#7 runs error and cleanup hooks and propagates the original error** — a failed `beforeSession` reaches `onError` with the session and original error, then `afterSession`, and rejects with that same error before later turn hooks run.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` into the existing error and cleanup boundary and make the acceptance test green.
- [ ] Document what cleanup can assume after failed setup, and add the consumer-facing CHANGELOG entry.
- [ ] Keep the existing successful-session tests unchanged and passing; CI checks the full suite and build.

## Out of scope

- Non-Error throws bypassing `onError` and usage accounting across tool rounds.