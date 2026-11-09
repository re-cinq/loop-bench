# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator` accepts real lifecycle hooks and exposes `processMessage`, allowing the failure path to be observed directly.

## Done when these pass

- [ ] **reports and cleans up a failed beforeSession while preserving its rejection** — The same error reaches the caller, `onError` receives the session and error, and `afterSession` receives the session afterward.
      `src/orchestration/beforeSession.acceptance.test.ts`

## Facets

- [ ] Handle a failed `beforeSession` through the existing catch and finally, preserving the rejection.
- [ ] Replace the spec's recorded flaw with the guarantee and state what `afterSession` can assume about the turn.
- [ ] Document the observable change for consumers in the changelog; keep existing non-throwing behavior tests unedited and green.
- [ ] Pass the ticket's build, test, typecheck, eslint, and formatting checks in CI.

## Out of scope

- Non-`Error` rejections and usage accounting across tool rounds.