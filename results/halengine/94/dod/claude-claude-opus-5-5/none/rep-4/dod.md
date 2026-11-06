# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage` is the real entry point and already accepts hooks; a throwing `beforeSession` and a plain in-file `AIProvider` exercise the failure path with no doubles.

## Done when these pass

- [ ] **fires onError with the session and the thrown error, and still rejects the caller with it** — `onError` receives `(session, error)` for a `beforeSession` throw, and the caller's rejection is that same error
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **fires afterSession after onError, and still rejects the caller with the thrown error** — `afterSession` runs after `onError` on the same path, and the rejection is unchanged
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move the `beforeSession` call in `src/orchestration/chatOrchestrator.ts` inside the `try`, so both tests go green
- [ ] Keep `src/orchestration/chatOrchestrator.test.ts` and `src/config.test.ts` green and unedited (non-throwing `beforeSession` unchanged)
- [ ] Decide whether `afterSession` needs to tell "never started" from "finished", and record what a hook can assume about how much of the turn happened in `specs/hal-engine-config-hooks/spec.md` under "When `beforeSession` throws"
- [ ] Remove the first bullet of "Measured semantics" in that spec (the recorded flaw) and update its intro to say two properties remain
- [ ] Add a CHANGELOG entry saying what changes for an existing consumer (`onError`/`afterSession` now fire when `beforeSession` throws)
- [ ] Update the CLAUDE.md/README hook notes if they state the old behaviour

## Out of scope

- The `instanceof Error` gate on `onError` (its own issue)
- Usage accounting across tool rounds in `afterModelResponse` (HALEngine#93)