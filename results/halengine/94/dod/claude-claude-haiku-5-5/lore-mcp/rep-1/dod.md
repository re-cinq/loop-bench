# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — The entry point `createChatOrchestrator(...).processMessage` is already callable with a `beforeSession` hook that throws, so the tests observe `onError` and `afterSession` directly. No seam is missing.

## Done when these pass

- [ ] **a beforeSession that throws reaches the caller as the same rejection, and onError receives that error for the same session** — the rejection is unchanged from today, and `onError` fires once with the same session and error instance.
  `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`
- [ ] **still runs afterSession, so a deployer can release what beforeSession allocated** — `afterSession` fires after a `beforeSession` throw.
  `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`

## Facets

- [ ] Move the `beforeSession` call inside the `try` in `src/orchestration/chatOrchestrator.ts`, so its throw reaches `catch` (`onError`) and `finally` (`afterSession`).
- [ ] Record in `specs/hal-engine-config-hooks/spec.md` what a hook can assume about how much of the turn happened after a failed `beforeSession`, replacing the recorded-flaw line.
- [ ] Add a CHANGELOG entry saying what changes for an existing consumer whose `onError` / `afterSession` now run on a `beforeSession` throw.

## Out of scope

- The `instanceof Error` gate on `onError` (its own issue).
- Usage accounting across tool rounds (HALEngine#93).
- Any change to the behaviour of a `beforeSession` that does not throw.