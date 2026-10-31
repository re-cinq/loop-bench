# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage(session)` is the real lifecycle entry point, and its hooks expose the failed-before-session path without a new seam.

## Done when these pass

- [ ] **runs onError then afterSession when beforeSession throws and preserves the rejection** — a failing `beforeSession` reaches the caller unchanged and invokes `onError` followed by `afterSession`, without advancing to user-input handling.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` inside the orchestrator's existing `try` so its failures reach the existing `catch` and `finally`.
- [ ] Keep the caller's original rejection and give `onError` the same session and error it receives for other turn failures.
- [ ] Replace the recorded-flaw statement in the config-hooks spec with the guarantee and state that `afterSession` can infer no turn work followed a failed `beforeSession`.
- [ ] Add an Unreleased CHANGELOG entry explaining that `afterSession` now also fires when `beforeSession` fails and that cleanup must tolerate a session that did not advance.

## Out of scope

- The `instanceof Error` gate on `onError` and usage accounting across tool rounds.