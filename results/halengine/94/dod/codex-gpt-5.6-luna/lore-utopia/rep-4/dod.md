# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator` exposes the real `processMessage` entry point and accepts `OrchestratorHooks`, so the failure path can be observed without mocks or a new seam.

## Done when these pass

- [ ] **runs error and cleanup hooks when beforeSession throws, then rethrows the same error** — a `beforeSession` rejection is returned unchanged, `onError` receives the same error and session, and `afterSession` runs afterward for the session whose turn never reached the provider.
      `src/orchestration/beforeSessionFailure.acceptance.test.ts`

## Facets

- [ ] Make the acceptance test pass by moving `beforeSession` inside the existing `try`/`catch`/`finally` boundary.
- [ ] Document in the config-hooks spec that `afterSession` runs after a failed `beforeSession` and may assume the turn never reached the provider.
- [ ] Add the consumer-visible lifecycle change to the changelog.
- [ ] Leave the existing non-throwing lifecycle behavior and tests unchanged.

## Out of scope

- The `instanceof Error` gate on `onError`.
- Usage accounting across tool rounds.
- Build, typecheck, lint, formatter-check, and full-suite verification; CI owns those checks.