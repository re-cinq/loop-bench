# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator` and its `processMessage` are already the real entry point, and the throw is reachable through `OrchestratorHooks.beforeSession`. No seam is missing.

## Done when these pass

- [ ] **runs onError with the same session and error, and the caller still gets the rejection** — a throwing `beforeSession` reaches `onError` with the session and the thrown `Error` instance, and `processMessage` still rejects with the same message.
      `src/orchestration/chatOrchestrator.beforeSessionThrows.acceptance.test.ts`
- [ ] **runs afterSession after onError, so a deployer can release what beforeSession allocated** — after a throwing `beforeSession` the order is `beforeSession`, `onError`, `afterSession`.
      `src/orchestration/chatOrchestrator.beforeSessionThrows.acceptance.test.ts`

## Facets

- [ ] Move the `beforeSession` call inside the `try` in `processMessageStream` so its throw reaches the existing `catch` and `finally` (`src/orchestration/chatOrchestrator.ts`).
- [ ] Record in `specs/hal-engine-config-hooks/spec.md` what a hook can assume after a failed `beforeSession` (whether the session started), replacing the recorded-flaw line.
- [ ] Add a CHANGELOG entry saying what changes for an existing consumer (`afterSession` and `onError` now run on a `beforeSession` throw).

## Out of scope

- The `instanceof Error` gate on `onError` (its own issue).
- Usage accounting across tool rounds (HALEngine#93).
- The spec and CHANGELOG wording itself: no spec statement exists yet to carry a `validated by` link, so the implementing round adds it.

## Red bar

The red bar for these tests was run locally with `NODE_OPTIONS=--experimental-vm-modules npx jest --runTestsByPath src/orchestration/chatOrchestrator.beforeSessionThrows.acceptance.test.ts`, and both fail for the reason in the claim. CI's `Test` step in `.github/workflows/ci.yml` (`npm test`) runs the same file on every push.