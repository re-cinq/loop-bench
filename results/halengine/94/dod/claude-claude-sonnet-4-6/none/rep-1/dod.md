# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator` in `src/orchestration/chatOrchestrator.ts` is the real entry point; `processMessage` can be called directly in a test with hooks that observe whether `onError` and `afterSession` fire after a `beforeSession` throw.

## Done when these pass

- [ ] **onError fires with the thrown error** — asserts that when `beforeSession` throws, `onError` receives the thrown error as its argument (currently receives `undefined` because the throw escapes before the `catch`)
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **afterSession fires even when beforeSession throws** — asserts that when `beforeSession` throws, `afterSession` still fires (currently does not because the throw escapes before the `finally`)
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move the `await hooks.beforeSession(session)` call from line 91 of `chatOrchestrator.ts` to inside the `try` block so throws reach the `catch` and `finally`
- [ ] Decide and document whether `afterSession` receives a session that never completed `beforeUserInput` — record the answer in `specs/hal-engine-config-hooks/spec.md` by replacing the "measured semantics" flaw note with the new guarantee
- [ ] Add a CHANGELOG entry for existing consumers who relied on `afterSession` not firing after a `beforeSession` throw

## Out of scope

- The `instanceof Error` gate on `onError` (its own issue per the ticket)
- Usage accounting across tool rounds (HALEngine#93)
- Any behaviour of `beforeSession` when it succeeds — the existing tests pin that path