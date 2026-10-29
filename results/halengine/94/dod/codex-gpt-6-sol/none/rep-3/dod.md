# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` is the existing entry point, and its hooks accept real functions that expose the failure path without a test double.

## Done when these pass

- [ ] **rejects with the original error and runs onError before afterSession for a partial session** — a failed `beforeSession` rejects with the same error, gives `onError` the session and error, runs cleanup afterward, and starts no later turn phase.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` inside the orchestrator's `try` so its error reaches `catch` and `finally`.
- [ ] Keep the original rejection and hook argument identities while running `onError` before `afterSession`.
- [ ] Preserve the existing successful lifecycle behavior; leave its tests unedited.
- [ ] Document the partial-setup cleanup contract in the spec and the consumer-visible change in `CHANGELOG.md`.
- [ ] Pass the repository's CI build, test, typecheck, lint, and format gates.

## Out of scope

- Non-`Error` rejections and the `onError` `instanceof Error` gate.
- Usage accounting across tool rounds.