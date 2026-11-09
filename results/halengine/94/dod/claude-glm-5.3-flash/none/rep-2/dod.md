# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator(...).processMessage(session)` is the real entry point the hooks run through, and a `beforeSession` that throws can be pointed at it today. The tests call it and fail on behaviour — `onError` and `afterSession` not firing — with no doubles anywhere: the provider is a real `AIProvider` that only records whether the turn reached it.

## Done when these pass

- [ ] **rejects with the thrown error and hands it to onError like any other failure** — a `beforeSession` that throws still rejects the caller with that exact error, and `onError` received the same session and the same error object any other orchestrator failure delivers
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **still runs afterSession, after onError, though no part of the turn happened** — `afterSession` fires after `onError` on that path, receives the caller's session, and the turn reached nothing: no provider call, no other hook, no entry committed
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move the `hooks.beforeSession` call in `src/orchestration/chatOrchestrator.ts` inside the `try` of `processMessageStream`, so its throw reaches the existing `catch` and `finally`
- [ ] Both acceptance tests above go green; the rejection message must not change (`before session failed` already passes today and must keep passing)
- [ ] The spec statement "what a hook can assume" is written (`specs/hal-engine-config-hooks/spec.md` § A beforeSession that throws — done, it states: only that the turn began and ended, no provider call, no other hook, no entry committed); adjust the wording if the implementation lands different semantics, and keep the tests the source of truth
- [ ] The recorded-flaw line about `beforeSession` is already replaced in the spec by that guarantee section; the "Measured semantics — out of scope" lead now reads "These two properties"
- [ ] CHANGELOG `## [Unreleased]` gains an entry saying what changes for an existing consumer: a `beforeSession` that throws now runs `onError`, `afterSession`, the shared `finally`'s entry commit, and the session `save` that follows it — a deployer whose `afterSession` assumes the turn ran must now guard
- [ ] Existing tests stay unedited and green — they pin the non-throwing path (criterion 4): `src/config.test.ts` "fires the lifecycle hooks in documented order for a session that completes without error" and `src/orchestration/chatOrchestrator.test.ts` "called before anything else"

## Out of scope

- The `instanceof Error` gate on `onError` (its own issue; still recorded in the spec's Measured semantics section)
- Usage accounting across tool rounds (HALEngine#93)
- Whether `beforeToolCall`/`onToolBudgetExhausted` interact with this path (they cannot fire: the turn never reaches a provider call)