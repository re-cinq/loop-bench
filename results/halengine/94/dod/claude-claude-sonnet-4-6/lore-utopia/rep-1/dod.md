# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator` accepts hooks and returns an orchestrator whose `processMessage` is callable directly; the broken behaviour (hooks not firing on a `beforeSession` throw) is observable by passing hooks and catching the rejection.

## Done when these pass

- [ ] **onError fires with the error when beforeSession throws** — `onError` is called with the thrown `Error` instance when `beforeSession` rejects, same argument shape as any other orchestrator failure
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **afterSession fires when beforeSession throws** — `afterSession` is called even when `beforeSession` rejects, confirming the finally path runs
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **the throw still propagates to the caller as a rejection** — the original error reaches the caller unchanged (this test passes today and must keep passing)
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move the `beforeSession` await inside the `try` block in `src/orchestration/chatOrchestrator.ts` (line 91 → inside try at line 93)
- [ ] Decide and record in `specs/hal-engine-config-hooks/spec.md` what `afterSession` can assume when `beforeSession` threw (session was never entered; no user input, no model call, no entries appended)
- [ ] Replace the recorded-flaw bullet in the spec's "Measured semantics — out of scope" section with the new guarantee, and add a CHANGELOG entry for existing consumers
- [ ] Confirm coverage floors still pass (`npm run test:coverage`) once green

## Out of scope

- The `instanceof Error` gate on `onError` (its own issue, noted in ticket tech notes)
- Usage accounting across tool rounds (HALEngine#93)
- Any behaviour changes to a non-throwing `beforeSession` (pinned by existing tests)