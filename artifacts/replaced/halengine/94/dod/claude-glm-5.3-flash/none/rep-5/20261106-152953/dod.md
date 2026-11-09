# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator` takes `OrchestratorHooks`, and `processMessage` on a session whose `beforeSession` throws is observable end to end with real objects only (a counting provider, recording hooks). The tests fail today on exactly the reported behaviour: the rejection still arrives, but `onError` and `afterSession` never fire.

## Done when these pass

- [ ] **routes a beforeSession throw through onError and afterSession and still rejects** — a throw from `beforeSession` reaches the caller as the original rejection and runs `onError` (with the same session and the same error instance as any other failure) and then `afterSession`
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **hands afterSession a session the failed turn never started** — `afterSession` runs after a failed `beforeSession` on a turn that never started: no provider call was made and the session holds exactly the entries it carried in, so a cleanup hook can tell "never allocated" from "allocated and finished"
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move the `beforeSession` await inside the `try` in `src/orchestration/chatOrchestrator.ts` (`processMessageStream`); nothing else in the method changes shape
- [ ] The two statements under "The failure path of a session" in `specs/hal-engine-config-hooks/spec.md` are already written and cited (committed with these tests); the old recorded-flaw line is gone and the "Measured semantics" section now says two, not three
- [ ] CHANGELOG entry under `## [Unreleased]` written for an existing consumer: `onError`/`afterSession` now fire for a `beforeSession` throw, and what `afterSession` may assume on that path (`scripts/check-changelog.sh` gates this once src/ changes)
- [ ] The existing hook tests stay unedited and green — `beforeSession`/`afterSession`/`onError` cases in `src/orchestration/chatOrchestrator.test.ts` and the lifecycle-order cases in `src/config.test.ts` pin the non-throwing path, so acceptance criterion "a non-throwing `beforeSession` behaves exactly as today" is their job, not this file's

## Out of scope

- The `instanceof Error` gate on `onError` (its own issue; still recorded under "Measured semantics — out of scope")
- Usage accounting across tool rounds (HALEngine#93)
- Giving a deployer a distinct "session never started" signal (a new hook or argument): the recorded decision is that `afterSession` fires either way and infers it from the untouched session, per the spec statement above