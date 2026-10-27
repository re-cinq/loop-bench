# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` is the real lifecycle entry point and already exposes all three hooks. One acceptance test observes the rejection and hook arguments/order without changing production code.

## Done when these pass

- [ ] **runs onError then afterSession when beforeSession throws, and still rejects to the caller** — a failed `beforeSession` preserves the rejection, sends the same error to `onError`, then invokes `afterSession` with the session
      `src/orchestration/beforeSessionFailure.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` into the existing `try` so its failure reaches the existing `catch` and `finally`.
- [ ] Keep the rejection unchanged and run `onError` before `afterSession` for a failed `beforeSession`.
- [ ] Update `specs/hal-engine-config-hooks/spec.md` to state that `afterSession` runs after a failed `beforeSession` and receives the session even though the turn did not reach user or model hooks.
- [ ] Add a CHANGELOG entry describing the lifecycle-hook behavior change for existing consumers.
- [ ] Leave the existing non-throwing `beforeSession` tests unedited and passing.

## Out of scope

- The `instanceof Error` gate on `onError`.
- Usage accounting across tool rounds (HALEngine#93).
- Build, typecheck, lint, formatter checks, and the full test suite in this pod.