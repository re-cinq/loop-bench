# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator(provider, promptBuilder, registry, {hooks})` is the real entry point and a throwing `beforeSession` is a plain option on it, so the acceptance tests call it and today observe `onError` and `afterSession` never firing while the rejection still reaches the caller.

## Done when these pass

- [ ] **hands a throwing beforeSession to onError and still rejects the caller with the same error** — the rejection still reaches the caller unchanged and `onError` fires with (session, the thrown error), the same argument shape as any other orchestrator failure (ticket criteria 1 and 2)
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **runs onError then afterSession for a throwing beforeSession, with a turn that never started** — `afterSession` fires after `onError` and sees the session with no provider call and no committed entry, which is the answer the spec's new statement records for "how much of the turn happened" (ticket criterion 3)
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

Ticket criterion 4 (a non-throwing `beforeSession` behaves exactly as today) is pinned by the existing tests in `src/orchestration/chatOrchestrator.test.ts` staying unedited and green — no new test for it.

## Facets

- [x] Write the acceptance tests; both red against `src/orchestration/chatOrchestrator.ts:91` — `received: undefined` and `order: []` while `outcome` is still `'beforeSession failed'`
- [x] Replace the spec's recorded-flaw line with the new guarantee, cited to these tests (`specs/hal-engine-config-hooks/spec.md`, new section "When `beforeSession` throws"); the "Measured semantics — out of scope" list drops to two
- [ ] Move the `beforeSession` call at `src/orchestration/chatOrchestrator.ts:91` inside the `try` — both tests go green and nothing else changes
- [ ] Write the CHANGELOG entry saying what changes for an existing consumer, and adjust the second spec bullet's wording only if the round records the "how much of the turn happened" answer more sharply (ticket criterion 5)
- [ ] CI green on the full gates: build, test, typecheck, eslint, prettier (ticket criterion 6)

## Out of scope

- The `instanceof Error` gate on `onError` — its own issue; a thrown non-`Error` still skips `onError`
- Usage accounting across tool rounds (`lastUsage`) — HALEngine#93
- The other two recorded-flaw bullets in `specs/hal-engine-config-hooks/spec.md`
- That the `finally`'s `saveSession` also starts running after a failed `beforeSession` once the call moves into the `try` — it follows from the fix; no test pins it here