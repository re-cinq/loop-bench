# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator` is the existing seam. The acceptance tests call it with a throwing `beforeSession` and observe whether `onError` and `afterSession` fire before the rejection propagates, exercising the fix without any double.

## Done when these pass

- [ ] **onError fires when beforeSession throws** — `onError` receives the error thrown by `beforeSession`, proving the throw enters the `catch` branch.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **afterSession fires when beforeSession throws** — `afterSession` is called even when `beforeSession` throws, proving the throw enters the `finally` branch.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move `await hooks.beforeSession(session)` from line 91 of `chatOrchestrator.ts` to inside the `try` block, so its throw reaches the existing `catch`/`finally`.
- [ ] Decide and record in `specs/hal-engine-config-hooks/spec.md` what `afterSession` can assume about the turn state when `beforeSession` threw (nothing was allocated; the fix is to record that in the spec).
- [ ] Confirm the rejection still propagates to the caller unchanged.
- [ ] Confirm non-throwing `beforeSession` behaviour is unchanged (existing tests stay green).

## Out of scope

- The `instanceof Error` gate on `onError` (HALEngine ticket, explicitly excluded by the ticket).
- Usage accounting across tool rounds (HALEngine#93).
- Any other measured-semantics items in the spec (`afterModelResponse` usage under-count, `instanceof Error` gate).