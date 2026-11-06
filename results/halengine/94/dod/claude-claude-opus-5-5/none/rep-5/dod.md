# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage` is the real entry point and takes real hooks, so the test drives a throwing `beforeSession` through it today and fails on behaviour: the rejection arrives, but `onError` and `afterSession` never fire.

## Done when these pass

- [ ] **beforeSession failure › rejects to the caller and still fires onError with the thrown error, then afterSession** — a throwing `beforeSession` rejects with the same error, `onError` receives that session and that error, and `afterSession` fires after it
      `src/orchestration/beforeSessionThrow.acceptance.test.ts`

## Facets

- [ ] Move the `beforeSession` call inside the `try` in `src/orchestration/chatOrchestrator.ts` so its throw reaches `catch` and `finally`
- [ ] Decide whether `afterSession` must be able to tell "session never started" from "session finished", and record the answer in `specs/hal-engine-config-hooks/spec.md` under "A failing `beforeSession`"
- [ ] Remove the first "Measured semantics" bullet (the recorded flaw) from `specs/hal-engine-config-hooks/spec.md` and fix that section's "three properties" count
- [ ] Add a CHANGELOG entry saying what changes for an existing consumer: `onError` and `afterSession` now fire when `beforeSession` throws
- [ ] Existing tests in `src/orchestration/chatOrchestrator.test.ts` and `src/config.test.ts` stay green, unedited

## Out of scope

- The `instanceof Error` gate on `onError` (its own issue)
- Usage accounting across tool rounds (HALEngine#93)