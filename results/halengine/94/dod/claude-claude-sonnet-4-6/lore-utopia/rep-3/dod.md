# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — The seam already exists: `createChatOrchestrator` returns a `ChatOrchestrator` whose `processMessage` accepts hooks. The two broken behaviours (`onError` and `afterSession` not firing when `beforeSession` throws) are directly observable by calling `processMessage` with a throwing `beforeSession` hook and asserting what else fired.

## Done when these pass

- [ ] **onError fires when beforeSession throws** — `onError` receives the thrown error when `beforeSession` rejects
  `src/orchestration/beforeSession-error.acceptance.test.ts`

- [ ] **afterSession fires when beforeSession throws** — `afterSession` is called even when `beforeSession` threw
  `src/orchestration/beforeSession-error.acceptance.test.ts`

## Facets

- [ ] Move `await hooks.beforeSession(session)` from line 91 (before `try`) to inside the `try` block in `src/orchestration/chatOrchestrator.ts`
- [ ] Confirm both acceptance tests go green
- [ ] Update the "Measured semantics" paragraph in `specs/hal-engine-config-hooks/spec.md` to replace the recorded flaw with the new guarantee
- [ ] Add a CHANGELOG entry describing what changes for a consumer who relied on `afterSession` or `onError` not firing on `beforeSession` failure
- [ ] Confirm the full test suite (`npm test`) stays green

## Out of scope

- The `instanceof Error` gate on `onError` (its own issue per the ticket)
- Usage accounting across tool rounds (HALEngine#93)
- What arguments `afterSession` receives when `beforeSession` threw (the spec must state this, but the choice is for the implementation round)