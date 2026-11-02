# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — The seam exists: `createChatOrchestrator` takes `hooks` and `processMessage` is the real entry point, so the acceptance test calls it and observes the hook order today.

The red bar is CI's to show: the pod's Node toolchain runs Jest here, so the failure output in the final message comes from a local run. CI runs the test as the "Test" step of `.github/workflows/ci.yml` (job `hal-engine-jest`, selector `src/orchestration/chatOrchestrator.acceptance.test.ts`).

## Done when these pass

- [ ] **runs onError and afterSession, and rejects the caller with the same error, when beforeSession throws** — the hook order is `beforeSession`, `onError`, `afterSession`, `onError` receives the session and the thrown error, and the caller still gets that same error.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move the `beforeSession` call inside the `try` in `processMessageStream` so its throw reaches `catch` and `finally`.
- [ ] Record in `specs/hal-engine-config-hooks/spec.md` that `afterSession` runs after a failed `beforeSession`, and what a hook can assume about how much of the turn happened. Replace the recorded-flaw bullet with this guarantee and link the test to it.
- [ ] Add a CHANGELOG entry saying that an existing consumer's `afterSession` and `onError` now fire when `beforeSession` throws.

## Out of scope

- The `instanceof Error` gate on `onError` (its own issue).
- Usage accounting across tool rounds (HALEngine#93).
- Changing what a non-throwing `beforeSession` does; the existing tests in `chatOrchestrator.test.ts` pin that and must stay unedited.