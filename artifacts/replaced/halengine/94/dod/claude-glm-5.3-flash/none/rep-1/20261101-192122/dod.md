# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator` takes `hooks` and a provider, and `processMessage` is the real caller path, so the acceptance tests call it with a throwing `beforeSession` and a provider that fails the turn if it is ever reached. No replacement module, no characterization needed.

## Done when these pass

- [ ] **runs onError and afterSession for a throwing beforeSession and still rejects to the caller** — a throw from `beforeSession` fires `onError` with the same session and the same `Error` the caller receives, then `afterSession` (the order of any other failed turn), while the caller's rejection keeps the original error unchanged from today
      `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`
- [ ] **hands afterSession a session the failed turn never touched** — the recorded decision's second half: `afterSession` fires even when `beforeSession` threw, and what a cleanup hook can assume is the session, not the call — entries exactly as before, nothing streaming
      `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`

Run only these with:
`node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`

## Facets

- [x] Two red acceptance tests, both failing because `onError` and `afterSession` never run on a failed `beforeSession` (this round)
- [x] Decision recorded in the spec, as the ticket asks: `afterSession` DOES run after a failed `beforeSession`, and a hook tells "never allocated" from "allocated and finished" by reading the session, not from its own invocation. The recorded-flaw bullet in `specs/hal-engine-config-hooks/spec.md` is replaced by the new "Error paths in the session lifecycle" section citing both tests, and the remaining two bullets keep the "Measured semantics — out of scope" section (this round)
- [ ] Move the `beforeSession` call inside the `try` in `src/orchestration/chatOrchestrator.ts` (`processMessageStream`). Nothing else changes: the same `catch` and `finally` then cover it, so `commitStreamingEntries` and `saveSession` run on this path as on any failed turn
- [ ] CHANGELOG: one entry under `[Unreleased]` → `Changed` saying what changes for an existing consumer — `onError` and `afterSession` (and the save) now run when `beforeSession` throws, where previously neither ran
- [ ] Green bar: both acceptance tests pass, and the existing tests stay green and unedited — `src/orchestration/chatOrchestrator.test.ts` (`full lifecycle order` in particular pins the non-throwing `beforeSession` path) and `src/config.test.ts`

## Out of scope

- The `instanceof Error` gate on `onError` (its own issue) — the tests throw a real `Error`
- Usage accounting across tool rounds (HALEngine#93)
- Any change to what the caller sees: the rejection is unchanged from today and pinned by the first test