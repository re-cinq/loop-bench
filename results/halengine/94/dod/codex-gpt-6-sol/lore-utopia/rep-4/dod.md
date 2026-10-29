# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` exposes the failure through the real hook and caller path. A single acceptance test observes rejection identity, hook arguments and order, and that processing stops before user input.

## Done when these pass

- [ ] **rejects with the original error after onError and afterSession receive the session** — a failed `beforeSession` reaches both hooks with the original values, then rejects with the same error before later turn hooks run.
      `src/orchestration/beforeSessionFailure.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` inside the orchestrator's `try` so its failure reaches `onError` and `afterSession`.
- [ ] Keep the existing successful-session behavior and tests intact.
- [ ] Update the spec's recorded flaw to state that `afterSession` may run before setup completes, and document what cleanup hooks may assume.
- [ ] Add a CHANGELOG entry explaining the changed failure path to existing consumers.
- [ ] Pass the repository's CI checks for build, tests, typecheck, lint, and formatting.

## Out of scope

- Non-`Error` rejections bypassing `onError`, and usage accounting across tool rounds.