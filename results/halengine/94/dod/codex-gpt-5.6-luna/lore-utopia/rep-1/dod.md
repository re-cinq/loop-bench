# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage(...)` is the real lifecycle entry point and already accepts the hooks directly. The acceptance test drives that seam with a real session and provider.

## Done when these pass

- [ ] **runs onError and afterSession when beforeSession throws** — the original error still rejects to the caller, `onError` receives the same session and error, and `afterSession` runs afterward.
      `src/orchestration/beforeSessionFailure.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` into the existing `try`/`catch`/`finally` lifecycle boundary.
- [ ] Record in the hook spec that cleanup runs after a failed `beforeSession`, after `onError`, and receives the session even though the turn did not proceed.
- [ ] Add a changelog note describing the new cleanup and error-hook behavior for existing consumers.

## Out of scope

- The `instanceof Error` gate on `onError`.
- Usage accounting across tool rounds.
- Changing the established behavior of a non-throwing `beforeSession`.
- Running the repository’s full CI checklist in this pod.