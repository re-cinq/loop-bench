# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` is the real entry point and existing lifecycle hooks expose both callbacks and the propagated rejection. The acceptance test uses the real mock provider implementation; provider work is not reached on this failure path.

## Done when these pass

- [ ] **rejects with the original error and runs onError then afterSession** — a `beforeSession` failure remains the caller's rejection, reaches `onError` with the same session and error, and runs `afterSession` afterward.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` into the protected lifecycle so its failure reaches `onError` and `afterSession`.
- [ ] Record the cleanup hook's assumption for a turn whose `beforeSession` failed.

## Out of scope

- Non-`Error` rejections bypassing `onError`.
- Usage accounting across tool rounds.