# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — Call the real orchestrator's `processMessage` with deployer hooks and the shipped local provider. One test observes the original rejection, error-hook arguments, hook order, and release of a resource allocated before setup failed.

## Done when these pass

- [ ] **reports and cleans up a failed beforeSession before rejecting with the original error** — Await error reporting and cleanup on the same session before propagating the same Error; skip user-input processing after failed setup.
      `src/orchestration/beforeSession.acceptance.test.ts`

## Facets

- [ ] Move session setup inside the lifecycle error-handling boundary so the acceptance test passes.
- [ ] Preserve the existing successful-session tests without editing them.
- [ ] Implement the spec's cleanup guarantee: afterSession tolerates incomplete setup and deployers track which resources were allocated.
- [ ] Add a CHANGELOG entry explaining that existing consumers now receive onError and afterSession after failed beforeSession.
- [ ] Pass the repository's required CI checks.

## Out of scope

- Non-Error rejection handling and the instanceof Error gate.
- Usage accounting across tool rounds (#93).
- Changing hook signatures or adding a session-started flag; allocation state belongs to the deployer's hooks.