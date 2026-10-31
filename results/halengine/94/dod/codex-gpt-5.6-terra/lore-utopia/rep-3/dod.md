# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createHalEngine` installs configured `OrchestratorHooks` on the running orchestrator, and the built-in mock provider lets the test call `processMessage` through the public factory without a test double. The failure happens before the provider is used.

## Done when these pass

- [ ] **notifies onError then afterSession, leaves later phases unstarted, and rejects with the same error** — a throwing `beforeSession` still rejects to its caller, invokes `onError` with the original session and error, then invokes `afterSession` without beginning another turn phase.
      `src/orchestration/beforeSessionFailure.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` inside the existing `try` so its failure reaches the existing `catch` and `finally`.
- [ ] Add an Unreleased CHANGELOG entry explaining that cleanup and error hooks now run when `beforeSession` fails.
- [ ] Preserve the existing non-throwing `beforeSession` tests without editing them.

## Out of scope

- Calling `onError` for non-`Error` rejections.
- Usage accounting across tool rounds.