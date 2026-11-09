# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator(...).processMessage` is the real entry point, and the acceptance tests drive it with a `beforeSession` that throws, observing `onError`, `afterSession`, the provider, the store write and the caller's rejection. No new module and no characterization needed; the fix is moving one awaited call inside the existing `try`.

## Done when these pass

- [ ] **calls onError with the session and the error beforeSession threw, and still rejects the caller** — the throw reaches `onError` with the session and the exact `Error` thrown, and the caller still receives the rejection (acceptance criteria 1 and 2). Red today: `receivedError` is `undefined` because `beforeSession` is awaited above the `try`
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **runs afterSession after onError over a turn that never started when beforeSession throws** — `afterSession` fires after `onError`, the provider was never called, the session still holds only the caller's message, and `SessionStore.save` ran (acceptance criterion 3 plus the "same `finally`" the ticket asks for). Red today: `callOrder` stops at `beforeSession` and nothing is saved
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [x] Acceptance tests written and red for the ticket's stated reason (both hooks skip on a `beforeSession` throw), in their own file
- [x] `specs/hal-engine-config-hooks/spec.md` replaces the recorded-flaw bullet with the two cited guarantee statements under a new "Error-path semantics" section; the other two recorded flaws stay under "Measured semantics — out of scope" with the intro reworded from three properties to two
- [x] CHANGELOG `Unreleased → Changed` entry recording what changes for an existing consumer, with the `afterSession`-now-runs-on-a-never-started-turn migration note
- [ ] Move the `beforeSession` call at the top of `processMessageStream` inside the `try` in `src/orchestration/chatOrchestrator.ts` — that is the whole production change; `catch` already rethrows and `finally` already runs `afterSession` then `saveSession`
- [ ] After the move, re-verify the `chatOrchestrator.ts#L…` prose links in the two remaining "Measured semantics" bullets — they cite source line numbers the move can shift (and `npm run spec:names` if any test moves)

## Out of scope

- The `instanceof Error` gate on `onError` (its own issue, per the ticket)
- Usage accounting across tool rounds — `afterModelResponse` receives the last round's usage, not a sum (HALEngine#93)
- Changing what `afterSession` receives or adding a "did the session start" flag: the ticket asks that the spec states what a hook can assume, which the new spec statement now does
- Config-layer forwarding of hooks (already pinned by `src/config.test.ts`; the flaw is in the orchestrator)