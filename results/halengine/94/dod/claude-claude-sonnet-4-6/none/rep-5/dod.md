# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator` accepts an `OrchestratorHooks` object; installing a throwing `beforeSession` alongside `onError` and `afterSession` hooks and calling `processMessage` through the real orchestrator is a seam that already exists. The test drives the real entry point and the hooks fire (or fail to fire) based on actual code paths.

## Done when these pass

- [ ] **onError and afterSession both fire when beforeSession throws, and the error still reaches the caller** — asserts that a throwing `beforeSession` reaches `onError` with the thrown error and fires `afterSession`, while still rejecting the caller with the original error; currently fails because `beforeSession` is awaited before the `try` block at line 91 of `chatOrchestrator.ts`, so both `catch` and `finally` are skipped.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move the `beforeSession` call from line 91 of `chatOrchestrator.ts` into the `try` block so it shares the same `catch`/`finally`
- [ ] Confirm `onError` now receives the error (acceptance test goes green on that assertion)
- [ ] Confirm `afterSession` fires (acceptance test goes green on that assertion)
- [ ] Update the "Measured semantics — out of scope" section of `specs/hal-engine-config-hooks/spec.md` to remove the now-fixed flaw bullet
- [ ] Add a CHANGELOG entry describing what changes for an existing consumer

## Out of scope

- The `instanceof Error` gate on `onError` (HALEngine issue, separate ticket)
- Usage accounting across tool rounds (HALEngine#93)
- Any behaviour of `onError` or `afterSession` when hooks OTHER than `beforeSession` throw