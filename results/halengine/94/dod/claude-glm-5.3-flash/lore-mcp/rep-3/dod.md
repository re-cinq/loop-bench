# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator` is the real entry point and `OrchestratorHooks` is installable today, so the acceptance test drives `processMessage` with a throwing `beforeSession` and observes `onError`/`afterSession` directly. It fails now because both hooks are missing from the observed order while the rejection itself reaches the caller.

## Done when these pass

- [ ] **runs onError then afterSession when it throws, and still rejects to the caller** — a throwing `beforeSession` still rejects `processMessage` with the thrown error, `onError` fires with the session and that error, and `afterSession` fires after it; every other lifecycle hook stays silent, so a cleanup hook can infer the session never advanced past `beforeSession`. Pins the new guarantee recorded in `specs/hal-engine-config-hooks/spec.md`, replacing the recorded-flaw line.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move the `beforeSession` call inside the `try` in `src/orchestration/chatOrchestrator.ts`, so the throw reaches the existing `catch`/`finally` as any other turn failure — this alone turns the acceptance test green.
- [ ] Add the CHANGELOG `Fixed` entry saying what changes for an existing consumer: `afterSession` now also runs when `beforeSession` fails.
- [ ] Existing hook tests stay unedited and green (`src/orchestration/chatOrchestrator.test.ts`, `src/config.test.ts`) — the non-throwing `beforeSession` path is theirs to pin, and no new test is written for it.

## Out of scope

- The `instanceof Error` gate on `onError` (its own issue; remains a recorded measured-semantics line in the spec).
- Usage accounting across tool rounds (HALEngine#93).