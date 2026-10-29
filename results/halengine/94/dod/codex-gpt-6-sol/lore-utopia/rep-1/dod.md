# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` already exposes the failure path. A real provider and session exercise it through the orchestrator without adding a seam.

## Done when these pass

- [ ] **reports and cleans up a failed beforeSession without starting the turn** — The original error rejects the caller, `onError` receives that session and error, and `afterSession` runs after it despite partial setup.
      `src/orchestration/beforeSessionFailure.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` inside the orchestrator's `try` so the existing catch and finally process its failure.
- [ ] Preserve the original rejection and hook argument shape and order while keeping the successful path unchanged.
- [ ] Document in the spec that `afterSession` may see partial setup and no later turn work, and add a CHANGELOG entry for consumers.
- [ ] Pass the repository's CI build, tests, typecheck, lint, and format gates.

## Out of scope

- Non-`Error` rejections bypassing `onError` and usage accounting across tool rounds.