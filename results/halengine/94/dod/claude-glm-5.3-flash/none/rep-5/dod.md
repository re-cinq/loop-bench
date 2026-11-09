# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator(...).processMessage(session)` is the real entry point and the hooks are a public option on it, so the failure is observable today by calling it with a throwing `beforeSession`. No new module, no characterization pass; the acceptance tests call the orchestrator directly and fail on the missing hook firings.

## Done when these pass

- [ ] **runs onError then afterSession and still rejects when beforeSession throws** — a throw from `beforeSession` reaches the same `catch` as any other turn failure: `onError` fires with the session and the thrown error, `afterSession` fires after it, and the original error still rejects the caller (the rejection itself is today's behaviour, asserted unchanged)
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **hands afterSession a session the turn never started** — the answer the ticket asks to be decided and recorded: `afterSession` DOES run after a failed `beforeSession`, and it sees a turn that never started — the provider was never consulted and the session holds only the caller's entries — so a cleanup hook must tolerate a session it never set up
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [x] Write the acceptance tests in `src/orchestration/chatOrchestrator.acceptance.test.ts` (red today: `onError`/`afterSession` never fire because the `beforeSession` call at `src/orchestration/chatOrchestrator.ts:91` sits above the `try`)
- [x] Spec: `specs/hal-engine-config-hooks/spec.md` gains a "When beforeSession throws" section stating the new guarantee and the cleanup-hook assumption, citing the two tests; the recorded-flaw bullet is removed from "Measured semantics — out of scope" (the intro now reads "These two properties")
- [ ] Move the `beforeSession` call at `src/orchestration/chatOrchestrator.ts:91` inside the `try` block — no other production edit is owed
- [ ] CHANGELOG entry saying what changes for an existing consumer: a throwing `beforeSession` now also runs `onError` and `afterSession` (and the `finally`'s session save) where today it skips them
- [ ] Existing hook tests stay green and unedited (they pin the non-throwing `beforeSession` path — acceptance criterion 4): `src/orchestration/chatOrchestrator.test.ts`, `src/config.test.ts`

## Out of scope

- The `error instanceof Error` gate in the `catch` (a thrown non-`Error` still bypasses `onError`) — its own issue, per the ticket's tech notes
- Usage accounting across tool rounds (`afterModelResponse` receiving per-round `lastUsage`) — HALEngine#93
- Whether `afterSession` should receive a "did the session start" flag: decided no — the hook is told nothing new and must tolerate an untouched session, which the second spec statement records