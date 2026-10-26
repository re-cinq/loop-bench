# Definition of Done

> Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` is the real entry point, and its lifecycle hooks expose the failure and cleanup behavior directly.

## Done when these pass

- [ ] **beforeSession failure runs error and cleanup hooks** — a thrown error reaches the caller unchanged, reaches `onError` with the same session and error, and still runs `afterSession` even though the turn did not proceed beyond `beforeSession`.
      `src/orchestration/beforeSessionFailure.acceptance.test.ts`

## Facets

- [ ] Route a `beforeSession` rejection through the orchestrator's error and finalization paths while preserving the caller rejection.

## Out of scope

- Non-`Error` rejections, usage accounting, and other lifecycle hook failure semantics.