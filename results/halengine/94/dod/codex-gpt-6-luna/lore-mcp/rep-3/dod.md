# Definition of Done

> Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator` exposes the real `processMessage` entry point with configurable lifecycle hooks. A test can throw from `beforeSession` and observe the caller rejection and both callbacks without doubles.

## Done when these pass

- [ ] **beforeSession failure still reaches the error and cleanup hooks** — the original error rejects to the caller, `onError` receives the same session and error, and `afterSession` receives the session after `onError`.
  `src/orchestration/beforeSessionFailure.acceptance.test.ts`

## Facets

- [ ] Pin the `beforeSession` failure path at the orchestrator entry point.
- [ ] Update the spec to state what ran before `afterSession` on this failure path.

## Out of scope

- Non-`Error` rejections bypassing `onError`.
- Usage accounting across tool rounds.