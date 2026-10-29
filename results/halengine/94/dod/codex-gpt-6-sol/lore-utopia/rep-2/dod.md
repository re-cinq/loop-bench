# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator` accepts hooks, and its `processMessage` entry point exposes the failure. The repository's mock provider supplies a real provider without network setup.

## Done when these pass

- [ ] **rejects with the setup error after onError and afterSession receive the unfinished session** — the original error reaches the caller after both hooks receive the same session, with no turn processing between setup and cleanup.
      `src/orchestration/beforeSessionFailure.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` inside the orchestrator's `try`, preserving rejection identity and hook order.
- [x] Record in the spec that `afterSession` runs even when `beforeSession` fails, so cleanup must tolerate incomplete setup.
- [ ] Add a CHANGELOG entry describing the new error and cleanup callbacks for existing consumers.
- [ ] Keep existing successful-session hook tests green and pass the CI gates.

## Out of scope

- Non-`Error` throws and usage accounting across tool rounds.