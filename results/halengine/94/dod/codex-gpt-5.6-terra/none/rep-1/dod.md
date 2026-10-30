# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage()` is the lifecycle entry point, and its hooks can observe the reported throw without a test double.

## Done when these pass

- [ ] **notifies onError and runs afterSession when beforeSession throws** — a `beforeSession` failure reaches the caller unchanged, calls `onError` with the original session and error, then runs `afterSession`.
      `src/orchestration/beforeSessionFailure.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` into the orchestrator's `try` so its failure follows the existing `catch` and `finally` path.
- [ ] Replace the recorded flaw in the hooks spec with the partial-start cleanup guarantee and add the consumer-visible change to `CHANGELOG.md`.

## Out of scope

- Non-`Error` rejections reaching `onError` and tool-round usage accounting.