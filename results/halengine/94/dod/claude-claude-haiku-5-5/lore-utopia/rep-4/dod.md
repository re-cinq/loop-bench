# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage` is the real entry point and already accepts the hooks through `ChatOrchestratorOptions`, so the tests reach the bug today without a new seam.

## Done when these pass

- [ ] **still runs onError with the thrown error, and the caller still gets the rejection** — a `beforeSession` that throws reaches `onError` with the same `Error` instance and the same session, and `processMessage` still rejects with that message.
      `src/orchestration/beforeSessionThrow.acceptance.test.ts`
- [ ] **still runs afterSession, so a hook that releases what beforeSession allocated is called** — a `beforeSession` that throws still runs `afterSession`.
      `src/orchestration/beforeSessionThrow.acceptance.test.ts`

## Facets

- [ ] Move the `beforeSession` call inside the `try` in `src/orchestration/chatOrchestrator.ts`, so the throw reaches the existing `catch` (`onError`) and `finally` (`afterSession`).
- [ ] Decide, and record in `specs/hal-engine-config-hooks/spec.md`, what a hook can assume about how much of the turn happened when `afterSession` runs after a failed `beforeSession`. Replace the recorded-flaw line with the new guarantee.
- [ ] Add the CHANGELOG entry under Unreleased saying what changes for an existing consumer: `onError` and `afterSession` now fire when `beforeSession` throws.

## Out of scope

- The `instanceof Error` gate on `onError` (its own issue).
- Usage accounting across tool rounds (HALEngine#93).
- Any change to the existing tests in `src/orchestration/chatOrchestrator.test.ts`, which must stay unedited.
- A spec traceability link for the new guarantee: the statement does not exist in the spec yet, and it is written with the fix.