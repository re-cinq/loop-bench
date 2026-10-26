# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage(...)` is the real lifecycle entry point and is already directly callable. The acceptance test exercises the existing hook seam without mocks or production changes.

## Done when these pass

- [ ] **runs onError and afterSession when beforeSession throws** — a throwing `beforeSession` still rejects with the same error, invokes `onError` with the session and error, and invokes `afterSession` afterward
      `src/orchestration/beforeSessionFailure.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` inside the existing `try` so its failure enters the shared `catch` and `finally`.
- [ ] Preserve the thrown error and invoke `onError` before `afterSession` for a failed `beforeSession`.
- [ ] State in the spec that `afterSession` knows the session hook began but cannot assume user input or model work ran.
- [ ] Record the changed lifecycle guarantee in the CHANGELOG.

## Out of scope

- The `instanceof Error` gate on `onError`.
- Usage accounting across tool rounds.
- Changing the existing non-throwing `beforeSession` lifecycle.