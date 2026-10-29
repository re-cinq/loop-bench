# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` already exposes the failing session path. The test uses the real mock provider and records the three hook calls and their arguments.

## Done when these pass

- [ ] **reports and cleans up when beforeSession throws, then rejects with the original error** — the original rejection reaches the caller; `onError` sees that error and session; `afterSession` runs after it even though the turn never began.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` inside the orchestrator's `try` so its throw reaches `catch` and `finally`.
- [ ] Keep the existing non-throwing hook behavior and ordering pinned by the existing tests.
- [x] Replace the spec's recorded flaw with the cleanup guarantee and explain that `afterSession` can run after partial setup.
- [ ] Add a CHANGELOG entry describing the new calls for existing consumers.
- [ ] Pass the repository's CI build, test, typecheck, lint, and format gates.

## Out of scope

- The `instanceof Error` gate for non-Error throws and usage accounting across tool rounds.