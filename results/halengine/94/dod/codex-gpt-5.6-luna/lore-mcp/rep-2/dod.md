# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage()` is the real lifecycle entry point and exposes the existing hooks directly. The acceptance test exercises that seam without changing production code.

## Done when these pass

- [ ] **runs onError then afterSession when beforeSession throws, and still rejects to the caller** — a failed `beforeSession` preserves the caller's rejection, passes the same `Error` to `onError`, then invokes `afterSession` while no later turn hooks ran.
      `src/orchestration/beforeSession.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` into the existing `try` so the rejection reaches the shared `catch` and `finally`.
- [ ] Replace the recorded flaw in the config-hooks spec with the cleanup guarantee and its acceptance-test link.
- [ ] Add a consumer-facing Unreleased CHANGELOG entry describing the new hook behavior.

## Out of scope

- The `instanceof Error` gate for non-Error rejections.
- Usage accounting across tool rounds (HALEngine#93).