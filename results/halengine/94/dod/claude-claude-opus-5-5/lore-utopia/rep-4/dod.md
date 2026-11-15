# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage(session)` is the seam: a `beforeSession` hook that throws can be driven through it today with a real provider and real hooks, and the tests fail only because `onError`/`afterSession` never fire.

## Done when these pass

- [ ] **rejects with the beforeSession error and hands onError that same session and error** — the rejection reaches the caller unchanged, and `onError(session, error)` gets the same session and error object as any other failure
      `src/orchestration/beforeSessionFailure.acceptance.test.ts`
- [ ] **runs onError then afterSession, and no turn hook, when beforeSession throws** — fire order is exactly `beforeSession → onError → afterSession`; no `beforeUserInput`/`afterUserInput`/`beforeModelResponse`/`afterModelResponse`
      `src/orchestration/beforeSessionFailure.acceptance.test.ts`
- [ ] The existing `src/orchestration/chatOrchestrator.test.ts` and `src/config.test.ts` stay green and UNEDITED (non-throwing `beforeSession` unchanged)

## Facets

- [ ] Move the `beforeSession` call in `src/orchestration/chatOrchestrator.ts` inside the `try` (both tests go green)
- [ ] Delete the first bullet of "Measured semantics — out of scope" in `specs/hal-engine-config-hooks/spec.md` (the recorded flaw), now superseded by "Failure in beforeSession"; update the section's "three properties" count
- [ ] Decision recorded in the spec: `afterSession` DOES run after a failed `beforeSession`; the hook can assume nothing past `beforeSession` ran. Keep the CLAUDE.md "afterSession always fires" line accurate
- [ ] CHANGELOG `[Unreleased]` → `### Fixed`: a throwing `beforeSession` now fires `onError` and `afterSession` (and saves the session); a deployer's `afterSession` must tolerate a session whose `beforeSession` failed
- [ ] Run `node scripts/repoint-spec-anchors.mjs` if the acceptance file's line numbers move

## Out of scope

- The `instanceof Error` gate on `onError` (its own issue)
- Usage accounting across tool rounds (HALEngine#93)