# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` is the real lifecycle entry point and accepts `OrchestratorHooks` directly, so the failure path can be observed without a new seam or test double.

## Done when these pass

- [ ] **rejects unchanged and runs onError before afterSession when beforeSession throws** — a setup failure rejects with the original error, invokes `onError` with the same session and error, and invokes cleanup afterward.
      `src/orchestration/beforeSessionError.acceptance.test.ts`

## Facets

- [ ] Make the acceptance test green by moving `beforeSession` inside the existing `try` boundary.
- [ ] Preserve the existing non-throwing lifecycle behavior covered by `fires the lifecycle hooks in documented order for a session that completes without error` in `src/config.test.ts`.
- [ ] Keep the spec guarantee and its test citation aligned with the cleanup assumption for a partially started session.
- [ ] Update the CHANGELOG with the behavior change for existing consumers.

## Out of scope

- Non-`Error` values bypassing `onError`.
- Usage accounting across tool rounds.
- Changes to the existing successful-session hook order.