# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator` is the real entry point and can be called with arbitrary hooks in tests. The seam already exists; the tests call `processMessage` with a throwing `beforeSession` and observe whether `onError` and `afterSession` fire.

## Done when these pass

- [ ] **onError fires when beforeSession throws** — `onError` receives the error and the rejection still reaches the caller
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **afterSession fires when beforeSession throws** — `afterSession` runs in the `finally` path even when `beforeSession` is what threw
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move `await hooks.beforeSession(session)` from line 91 (before `try`) to inside the `try` block in `src/orchestration/chatOrchestrator.ts`
- [ ] Decide and document in `specs/hal-engine-config-hooks/spec.md` what `afterSession` can assume about session state when `beforeSession` threw (the hook fires but the session was never fully started)
- [ ] Replace the recorded-flaw bullet in `specs/hal-engine-config-hooks/spec.md § Measured semantics` with the new guarantee and add `([validated by ...])` traceability parentheticals pointing to the two acceptance tests
- [ ] Add a CHANGELOG entry describing what changes for an existing consumer
- [ ] Verify the existing passing tests (full lifecycle order, hook fire order, non-throwing path) remain green

## Out of scope

- The `instanceof Error` gate on `onError` (its own issue, noted in ticket Tech notes)
- Usage accounting across tool rounds (HALEngine#93)
- Any change to `afterSession` semantics for the non-error path