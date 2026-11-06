# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage` with `hooks` is the real entry point and already takes all three hooks; the acceptance tests drive it with a throwing `beforeSession` and fail today because neither `onError` nor `afterSession` fires.

## Done when these pass

- [ ] **reaches onError with the session and the thrown error, then afterSession, and still rejects the caller** — a throwing `beforeSession` still rejects with the same error, and `onError(session, error)` then `afterSession(session)` run first, in that order
  `src/orchestration/beforeSessionFailure.acceptance.test.ts`
- [ ] **lets afterSession release what beforeSession allocated before it threw** — a resource allocated in `beforeSession` and released in `afterSession` is not leaked when `beforeSession` throws
  `src/orchestration/beforeSessionFailure.acceptance.test.ts`

## Facets

- [ ] Move the `beforeSession` call inside the `try` in `src/orchestration/chatOrchestrator.ts`; both acceptance tests go green
- [ ] Existing `src/orchestration/chatOrchestrator.test.ts` and `src/config.test.ts` stay green, unedited (non-throwing `beforeSession` unchanged)
- [ ] Decide and state in `specs/hal-engine-config-hooks/spec.md` what `afterSession` can assume about how much of the turn ran (it now fires after a failed `beforeSession`, e.g. no user input processed, no provider call)
- [ ] Delete the first bullet under "Measured semantics — out of scope" in that spec (the recorded flaw), and fix the "These three properties" count
- [ ] CHANGELOG entry: `onError` and `afterSession` now fire when `beforeSession` throws
- [ ] Update the CLAUDE.md/docs hook fire-order note if it claims otherwise

## Out of scope

- The `instanceof Error` gate on `onError` (its own issue)
- Usage accounting across tool rounds (HALEngine#93)